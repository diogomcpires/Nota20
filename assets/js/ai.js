/* ============================================================
   Nota20 · camada de IA
   1) Dentro do Claude: usa a capacidade "sample" do artifact.
   2) No teu site: usa CONFIG.AI_ENDPOINT (proxy em worker/ai-proxy.js).
   3) Sem nenhum dos dois: as funções de IA ficam escondidas.
   ============================================================ */
(function () {
  const C = window.N20_CONFIG || {};
  let samplePromise = null;
  let transporte = null; /* no site: a app liga aqui a função do Supabase (só com conta) */
  const viaConta = () => !!(transporte && C.IA_CONTA);

  function getSample() {
    if (!samplePromise) {
      samplePromise = (window.claude && typeof window.claude.use === "function")
        ? window.claude.use("sample").catch(() => null)
        : Promise.resolve(null);
    }
    return samplePromise;
  }

  const SISTEMA_EXPLICADOR = [
    "És o explicador de Português da Nota20, especialista no Exame Nacional de Português (prova 639, 12.º ano, Portugal).",
    "Responde sempre em português europeu, com o Acordo Ortográfico de 1990, de forma clara, rigorosa e concisa (até cerca de 180 palavras, salvo se o aluno pedir mais).",
    "Usa a terminologia do Dicionário Terminológico e das Aprendizagens Essenciais do secundário (funções sintáticas, orações, valor aspetual e modal, deíxis, coesão, atos ilocutórios).",
    "Para as obras (poesia trovadoresca, Fernão Lopes, Gil Vicente, Camões, Vieira, Garrett, Camilo, Eça, Antero, Cesário, Pessoa e heterónimos, Mensagem, contos, poetas contemporâneos, Saramago), refere personagens, episódios e temas concretos.",
    "Dá exemplos curtos. Não inventes citações: se não tiveres a certeza de um verso, parafraseia.",
    "Se o aluno pedir um texto completo para entregar, ajuda-o a planear e dá frases de exemplo, mas incentiva-o a escrever ele próprio.",
    "Se a pergunta não tiver relação com o estudo, responde numa frase e volta ao Português.",
    "Formato: parágrafos curtos; podes usar listas com '- ' e **negrito**. Sem títulos."
  ].join(" ");

  /* O proxy usa as suas próprias instruções (worker/ai-proxy.js): aqui só se envia o modo. */
  async function viaEndpoint(mode, messages) {
    const res = await fetch(C.AI_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ mode, messages })
    });
    if (!res.ok) throw { code: "unavailable", message: "HTTP " + res.status };
    const data = await res.json();
    return data.text || "";
  }

  function extrairJSON(texto) {
    const a = texto.indexOf("{"), b = texto.lastIndexOf("}");
    if (a < 0 || b < a) throw { code: "bad_json", message: "Resposta sem JSON" };
    return JSON.parse(texto.slice(a, b + 1));
  }

  window.N20AI = {
    /** "claude" | "endpoint" | null */
    usar(fn) { transporte = fn; },
    async modo() {
      const s = await getSample();
      if (s) return "claude";
      if (viaConta()) return "conta";
      if (C.AI_ENDPOINT) return "endpoint";
      return null;
    },

    /** Conversa com o explicador. historico = [{role:"user"|"assistant", content}] */
    async conversar(historico, { onText, signal } = {}) {
      const s = await getSample();
      if (s) {
        const msgs = historico.map((m, i) => (i === 0 && m.role === "user")
          ? { role: "user", content: "[Instruções]\n" + SISTEMA_EXPLICADOR + "\n\n[Pergunta do aluno]\n" + m.content }
          : m);
        const r = await s(msgs, { onText, signal, cache: false, modelTier: "default" });
        return r.text;
      }
      if (viaConta()) {
        const t = await transporte("explicador", historico);
        if (onText) onText({ text: t, delta: t });
        return t;
      }
      if (C.AI_ENDPOINT) {
        const t = await viaEndpoint("explicador", historico);
        if (onText) onText({ text: t, delta: t });
        return t;
      }
      throw { code: "not_granted", message: "IA indisponível" };
    },

    /** Pede um objeto JSON (correções). */
    async json(prompt) {
      const s = await getSample();
      if (s) {
        try {
          if (typeof s.json === "function") return await s.json(prompt, { modelTier: "default" });
        } catch (e) {
          if (e && (e.code === "not_granted" || e.code === "rate_limited")) throw e;
        }
        const r = await s(prompt, { modelTier: "default", cache: false });
        return extrairJSON(r.text);
      }
      if (viaConta()) return extrairJSON(await transporte("correcao", [{ role: "user", content: prompt }]));
      if (C.AI_ENDPOINT) {
        const t = await viaEndpoint("correcao", [{ role: "user", content: prompt }]);
        return extrairJSON(t);
      }
      throw { code: "not_granted", message: "IA indisponível" };
    }
  };
})();
