/* ============================================================
   Nota20 · aplicação (JavaScript simples, sem dependências)
   ============================================================ */
(function () {
  "use strict";

  const C = window.N20_CONFIG;
  const D = window.N20;
  const AI = window.N20AI;
  const TOPICS = D.topics;
  const EXAMS = D.exames;
  const SIMS = D.simulados || [D.simulado];

  /* ---------- estatísticas anónimas (GoatCounter, sem cookies) ---------- */
  const GC = (() => {
    const code = String(C.GOATCOUNTER || "").trim();
    const on = !!code && !C.MODO_DEMO && /^https?:$/.test(location.protocol) && !/claude|localhost|127\.0\.0\.1/.test(location.hostname);
    const q = [];
    const flush = () => { if (window.goatcounter && window.goatcounter.count) while (q.length) window.goatcounter.count(q.shift()); };
    if (on) {
      window.goatcounter = { no_onload: true };
      const s = document.createElement("script");
      s.async = true; s.src = "https://gc.zgo.at/count.js"; s.dataset.goatcounter = `https://${code}.goatcounter.com/count`;
      s.onload = flush; document.head.appendChild(s);
    }
    const send = (o) => { if (!on) return; q.push(o); flush(); };
    return {
      page: (h) => send({ path: "/" + (String(h || "inicio").split("/")[0] || "inicio") }),
      event: (name) => send({ path: name, title: name, event: true })
    };
  })();
  let SIM = SIMS[0];
  const app = document.getElementById("app");
  const modalRoot = document.getElementById("modal-root");
  const L = ["A", "B", "C", "D", "E"];
  const REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- utilitários ---------- */
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const strip = (html) => String(html || "").replace(/<br\s*\/?>/gi, "\n").replace(/<\/p>/gi, "\n").replace(/<[^>]+>/g, "").replace(/\n{3,}/g, "\n\n").trim();
  const wordCount = (t) => (String(t).trim().match(/\S+/g) || []).length;
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));
  const today = () => new Date().toISOString().slice(0, 10);

  const store = {
    get(k, d) { try { const v = localStorage.getItem("n20:" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("n20:" + k, JSON.stringify(v)); } catch (e) { /* sem armazenamento */ } }
  };

  const st = {
    studied: new Set(store.get("studied", [])),
    res: store.get("res", {}),
    drafts: store.get("drafts", {}),
    unlocked: store.get("unlocked", false),
    chat: store.get("chat", []),
    sim: store.get("sim", null),
    xp: store.get("xp", 0),
    days: store.get("days", []),
    awarded: new Set(store.get("awarded", [])),
    simHist: store.get("simHist", {}),
    g3: store.get("g3", []),
    plano: store.get("plano", null),
    planDone: (() => { const v = store.get("planDone", {}); return Array.isArray(v) ? {} : v; })(),
    fixed: store.get("fixed", 0),
    treino: null,
    filter: "todos"
  };
  if (st.sim) SIM = SIMS.find((x) => x.id === st.sim.id) || SIMS[0];
  const wasWrong = new Set();
  const saveStudied = () => store.set("studied", [...st.studied]);
  const saveRes = () => store.set("res", st.res);
  const saveSim = () => store.set("sim", st.sim);
  let draftT;
  const saveDraft = (k, v) => { st.drafts[k] = v; clearTimeout(draftT); draftT = setTimeout(() => store.set("drafts", st.drafts), 350); };

  const G = +C.GARANTIA_DIAS || 0;
  const LIM = Object.assign({ exercicios: 10, explicador: 3, correcao: 1 }, C.LIMITES_GRATIS || {});
  let previewFree = !!(C.MODO_DEMO && store.get("previewFree", false));
  const used = Object.assign({ ex: 0, chat: 0, fix: 0 }, store.get("used", {}));
  const counted = new Set(store.get("counted", []));
  const unlocked = () => !previewFree && !!(C.MODO_DEMO || st.unlocked);
  /* convida amigos: ao fim de CONV partilhas, o aluno escolhe 1 tópico do plano Completo */
  const CONV = Math.max(1, +C.CONVITES_PARA_TOPICO || 3);
  const extraId = () => store.get("extra", null);
  const isExtra = (id) => !!id && id === extraId() && TOPICS.some((t) => t.id === id);
  const canOpen = (x) => !!(x && (x.free || unlocked() || (x.titulo && isExtra(x.id) && x.resumo)));

  /* ---------- contas (Supabase): código por email, progresso na nuvem, plano pago ---------- */
  const CONTA = (() => {
    const on = !!(C.SUPABASE_URL && C.SUPABASE_KEY);
    const REF = on ? ((String(C.SUPABASE_URL).match(/https:\/\/([^.]+)/) || [])[1] || "") : "";
    const NAO_SINC = new Set(["unlocked", "unlockedConta", "previewFree", "used", "counted", "tema"]);
    let sb = null, user = null, perfil = null, carregar = null, timer = null, ultima = null, voltouGoogle = false;
    const temSessao = () => { try { return !!localStorage.getItem(`sb-${REF}-auth-token`); } catch (e) { return false; } };
    const lib = () => window.supabase && window.supabase.createClient ? Promise.resolve() : (carregar = carregar || new Promise((ok, falha) => {
      const s = document.createElement("script"); s.src = "assets/js/vendor/supabase.js"; s.onload = ok; s.onerror = () => { carregar = null; falha(new Error("lib")); }; document.head.appendChild(s);
    }));
    async function cliente() {
      if (!on) throw new Error("off");
      if (sb) return sb;
      await lib();
      sb = window.supabase.createClient(C.SUPABASE_URL, C.SUPABASE_KEY, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: !!C.GOOGLE_LOGIN, flowType: C.GOOGLE_LOGIN ? "pkce" : "implicit" } });
      return sb;
    }
    function local() {
      const o = {};
      try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && k.startsWith("n20:") && !NAO_SINC.has(k.slice(4))) o[k.slice(4)] = localStorage.getItem(k); } } catch (e) { /* sem armazenamento */ }
      return o;
    }
    const xpDe = (o) => { try { return +JSON.parse(o.xp || "0") || 0; } catch (e) { return 0; } };
    async function enviar() {
      if (!sb || !user) return;
      const { error } = await sb.from("progresso").upsert({ user_id: user.id, dados: local(), atualizado_em: new Date().toISOString() });
      if (!error) ultima = new Date();
    }
    function agendar(k) { if (!user || NAO_SINC.has(k)) return; clearTimeout(timer); timer = setTimeout(() => enviar().catch(() => {}), 4000); }
    async function perfilEPlano() {
      const { data } = await sb.from("perfis").select("plano,email").eq("id", user.id).maybeSingle();
      perfil = data || null;
      if (perfil && perfil.plano === "completo" && !st.unlocked) { st.unlocked = true; store.set("unlocked", true); store.set("unlockedConta", true); }
      if (perfil && perfil.plano !== "completo") retirarAcessoConta(); /* reembolso ou plano grátis */
    }
    /* devolve true se trouxe da nuvem um progresso maior (a página tem de recarregar) */
    async function sincronizar() {
      const { data } = await sb.from("progresso").select("dados").eq("user_id", user.id).maybeSingle();
      const nuvem = (data && data.dados) || {}, loc = local();
      if (Object.keys(nuvem).length && xpDe(nuvem) > xpDe(loc)) {
        for (const [k, v] of Object.entries(nuvem)) if (!NAO_SINC.has(k) && typeof v === "string") { try { localStorage.setItem("n20:" + k, v); } catch (e) { /* cheio */ } }
        ultima = new Date(); return true;
      }
      await enviar(); return false;
    }
    async function depoisDeEntrar() {
      await perfilEPlano();
      const recarregar = await sincronizar();
      return recarregar;
    }
    function retirarAcessoConta() { const tinha = st.unlocked; if (store.get("unlockedConta", false)) { st.unlocked = false; store.set("unlocked", false); store.set("unlockedConta", false); } return tinha && !st.unlocked; }
    async function arranque() {
      if (!on) return;
      /* o acesso pago vive na conta: sem sessão válida, este aparelho deixa de o ter */
      const q = new URLSearchParams(location.search), doGoogle = !!C.GOOGLE_LOGIN && (q.has("code") || q.has("error_description"));
      if (!temSessao() && !doGoogle) { if (retirarAcessoConta()) route(); return; }
      try {
        await cliente();
        const { data } = await sb.auth.getSession();
        user = data && data.session ? data.session.user : null;
        if (doGoogle) {
          const falhou = q.has("error_description");
          ["code", "error", "error_code", "error_description"].forEach((k) => q.delete(k));
          history.replaceState(history.state, "", location.pathname + (q.toString() ? "?" + q : "") + location.hash);
          if (user) { GC.event("conta-entrou-google"); voltouGoogle = true; } else if (falhou) voltouGoogle = "erro";
        }
        if (!user) { if (retirarAcessoConta()) route(); return; }
        const antes = unlocked();
        if (await depoisDeEntrar()) { if (voltouGoogle === true) ssSet("n20:google-ok", "1"); location.reload(); return; }
        if (unlocked() !== antes) route(); else { chipConta(); refreshReviews(); }
      } catch (e) { /* sem rede: continua com o que está no navegador */ }
    }
    async function pedirCodigo(email) {
      await cliente();
      const { error } = await sb.auth.signInWithOtp({ email, options: { shouldCreateUser: true } });
      if (error) throw error;
      GC.event("conta-codigo-pedido");
    }
    async function entrarGoogle() {
      await cliente();
      GC.event("conta-google-clique");
      const { error } = await sb.auth.signInWithOAuth({ provider: "google", options: { redirectTo: location.origin + location.pathname } });
      if (error) throw error;
    }
    async function confirmarCodigo(email, token) {
      await cliente();
      const { data, error } = await sb.auth.verifyOtp({ email, token, type: "email" });
      if (error) throw error;
      user = data.user || (data.session && data.session.user) || null;
      GC.event("conta-entrou");
      return depoisDeEntrar();
    }
    /* depois do Stripe: o webhook pode chegar uns segundos depois do regresso */
    async function verificarPagamento(tentativas = 10) {
      if (!user) return false;
      for (let i = 0; i < tentativas; i++) {
        try { await perfilEPlano(); } catch (e) { /* tenta outra vez */ }
        if (perfil && perfil.plano === "completo") return true;
        await new Promise((r) => setTimeout(r, 3000));
      }
      return false;
    }
    async function sair() {
      try { await enviar(); } catch (e) { /* segue */ }
      if (sb) await sb.auth.signOut().catch(() => {});
      user = null; perfil = null;
      if (store.get("unlockedConta", false)) { st.unlocked = false; store.set("unlocked", false); store.set("unlockedConta", false); }
    }
    async function ia(mode, messages) {
      await cliente();
      const { data, error } = await sb.functions.invoke("ia", { body: { mode, messages } });
      if (error) {
        let code = "indisponivel", lim = null;
        try { const j = await error.context.json(); code = j.error || code; lim = j.limite || null; } catch (e) { /* sem corpo */ }
        throw { code, lim };
      }
      return (data && data.text) || "";
    }
    async function lead(d) {
      await cliente();
      const { error } = await sb.from("leads").insert({ email: d.email, origem: String(d.origem || "").slice(0, 40), tester: !!d.tester });
      if (error) throw error;
    }
    async function rpc(nome, args) { await cliente(); const { data, error } = await sb.rpc(nome, args || {}); if (error) throw error; return data; }
    async function avaliar(a) {
      await cliente();
      const { error } = await sb.from("avaliacoes").upsert({ user_id: user.id, estrelas: a.estrelas, texto: a.texto, nome: a.nome || null }, { onConflict: "user_id" });
      if (error) throw error;
    }
    async function apagar() {
      await cliente();
      const { error } = await sb.functions.invoke("apagar-conta", { method: "POST" });
      if (error) throw error;
      await sb.auth.signOut().catch(() => {});
      user = null; perfil = null;
      if (store.get("unlockedConta", false)) { st.unlocked = false; store.set("unlocked", false); store.set("unlockedConta", false); }
    }
    window.addEventListener("pagehide", () => { if (user) enviar().catch(() => {}); });
    return { on, ia, lead, avaliar, rpc, arranque, verificarPagamento, pedirCodigo, confirmarCodigo, entrarGoogle, sair, apagar, agendar, enviar,
      get voltouGoogle() { return voltouGoogle; },
      get user() { return user; }, get perfil() { return perfil; }, get ultima() { return ultima; } };
  })();
  { const set0 = store.set; store.set = (k, v) => { set0(k, v); CONTA.agendar(k); }; }
  if (CONTA.on && st.unlocked && !store.get("unlockedConta", false) && !(C.ACCESS_CODE_HASHES || []).length) { st.unlocked = false; store.set("unlocked", false); }
  AI.usar(async (mode, messages) => { if (!CONTA.user) throw { code: "login" }; return CONTA.ia(mode, messages); });
  /* IA no site precisa de conta: devolve true se teve de pedir login */
  const precisaLoginIA = (depois) => { if (aiMode === "conta" && !CONTA.user) { openLogin("ia", depois); return true; } return false; };
  const erroIA = (e, tipo) => {
    if (e && e.code === "login") { openLogin("ia"); return "Entra com o teu email para usar a IA. É grátis."; }
    if (e && e.code === "limite") {
      if (!unlocked()) { openPaywall(tipo); return "Chegaste ao limite do plano grátis."; }
      if (C.PACK_LINK) openPack(tipo, e.lim);
      return tipo === "correcao" ? `Chegaste às ${e.lim || 10} correções de hoje. Amanhã há mais, ou compra um pack de IA.` : `Chegaste às ${e.lim || 40} perguntas de hoje. Amanhã há mais, ou compra um pack de IA.`;
    }
    if (e && e.code === "rate_limited") return "Muitos pedidos seguidos. Tenta dentro de um minuto.";
    return null;
  };

  /* pack de IA: mesmo esquema do plano (id e email da conta vão para o webhook) */
  function packHref() {
    try {
      const u = new URL(C.PACK_LINK);
      if (CONTA.user) { u.searchParams.set("client_reference_id", CONTA.user.id); if (CONTA.user.email) u.searchParams.set("prefilled_email", CONTA.user.email); }
      return u.toString();
    } catch (e) { return C.PACK_LINK; }
  }
  function openPack(tipo, lim) {
    GC.event("pack-oferta");
    openModal(`<div class="pw-head">${lince()}<div><h3>Queres continuar hoje?</h3><p class="muted" style="margin:6px 0 0;font-weight:600">Usaste ${tipo === "correcao" ? `as ${lim || ""} correções` : `as ${lim || ""} perguntas`} de hoje. Amanhã o limite volta a zero, ou continuas já com um pack de IA.</p></div></div>
      <div class="card" style="margin:14px 0"><b>Pack de IA · ${esc(C.PACK_PRECO || "4,99 €")}</b><p class="muted" style="margin:6px 0 0;font-weight:600">+100 perguntas ao explicador e +20 correções, sem prazo. Podes escolher mais do que um pack no pagamento.</p></div>
      <a class="btn btn-primary btn-shine" href="${esc(packHref())}" rel="noopener" data-pack>Comprar pack de IA · ${esc(C.PACK_PRECO || "4,99 €")}</a>`);
  }
  /* link de pagamento com a conta: a Stripe devolve o id e o email no webhook */
  function payHref() {
    if (!C.PAYMENT_LINK) return "#precos";
    try {
      const u = new URL(C.PAYMENT_LINK);
      const pc = parceiroAtivo(); if (pc) u.searchParams.set("prefilled_promo_code", pc.codigo);
      if (CONTA.user) { u.searchParams.set("client_reference_id", CONTA.user.id + (pc ? "_" + pc.codigo : "")); if (CONTA.user.email) u.searchParams.set("prefilled_email", CONTA.user.email); }
      return u.toString();
    } catch (e) { return C.PAYMENT_LINK; }
  }

  function chipConta() {
    const el = document.getElementById("acc-chip");
    if (!el) return;
    if (!CONTA.on) { el.hidden = true; return; }
    el.hidden = false;
    const u = CONTA.user;
    el.innerHTML = u ? `<span class="av">${esc((u.email || "?").slice(0, 1).toUpperCase())}</span>` : `${ic("user")}<span class="t">Entrar</span>`;
    el.setAttribute("aria-label", u ? "A minha conta" : "Entrar ou criar conta");
  }

  /* janela de entrada: email → código de 6 dígitos (sem palavra-passe) */
  let depoisLogin = null;
  function openLogin(motivo, depois) {
    if (!CONTA.on) return;
    depoisLogin = depois || null;
    const txt = {
      comprar: "Para a compra ficar guardada na tua conta e funcionar em qualquer dispositivo.",
      guardar: "Guarda o teu progresso e continua no telemóvel ou no computador.",
      avaliar: "Para deixares a tua avaliação. Só alunos com conta podem avaliar.",
      ia: "Para usares o explicador e a correção com IA. É grátis e não precisa de palavra-passe.",
      comprei: "Entra com o email que usaste na compra e o plano Completo abre logo."
    }[motivo] || "Guarda o teu progresso e usa a Nota20 em qualquer dispositivo.";
    const emApp = /Instagram|FBAN|FBAV|TikTok|musical_ly|Bytedance|Line\//i.test(navigator.userAgent);
    const g = C.GOOGLE_LOGIN && !emApp && !inFrame;
    if (motivo === "comprar") ssSet("n20:pos-login", "comprar"); else ssSet("n20:pos-login", "");
    openModal(`<h3>Entrar ou criar conta</h3>
      <p class="small muted" style="font-weight:600;margin:0 0 12px">${txt} Não precisas de palavra-passe${g ? "." : ": enviamos-te um código por email."}</p>
      ${g ? `<button class="btn btn-google" type="button" data-act="login-google"><svg class="gg" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>Continuar com Google</button><div class="ou"><span>ou com um código por email</span></div>` : ""}
      <form id="login-form" class="form">
        <label class="lbl" for="login-email">Email</label>
        <input type="email" id="login-email" autocomplete="email" inputmode="email" required maxlength="120" placeholder="o.teu@email.pt">
        <div class="login-codigo" hidden>
          <label class="lbl" for="login-token">Código que recebeste no email</label>
          <input type="text" id="login-token" autocomplete="one-time-code" inputmode="numeric" pattern="[0-9]*" maxlength="10" placeholder="123456">
        </div>
        <div class="row"><button class="btn btn-primary" type="submit" data-step="email">Enviar código</button><button class="btn btn-ghost" type="button" data-act="modal-close">Agora não</button></div>
        <p class="small muted" id="login-msg" aria-live="polite" style="font-weight:700;margin:6px 0 0"></p>
        <p class="small muted" style="margin:6px 0 0">Ao continuar, aceitas os <a href="#termos" data-act="modal-close">Termos e a Política de privacidade</a>.</p>
      </form>`);
    setTimeout(() => { const i = document.getElementById("login-email"); if (i) i.focus(); }, 50);
  }
  const erroConta = (e) => {
    const c = (e && (e.code || e.error_code)) || "", m = String((e && e.message) || "");
    if (c === "over_email_send_rate_limit" || /rate limit|429/i.test(m)) return "Foram pedidos muitos códigos. Espera uns minutos e tenta outra vez.";
    if (c === "email_address_not_authorized") return "Os emails de entrada ainda não estão ativos. Tenta mais tarde.";
    if (c === "otp_expired" || /expired|invalid/i.test(m)) return "Código errado ou expirado. Confirma ou pede um novo.";
    if (c === "email_address_invalid" || /invalid email/i.test(m)) return "Esse email não parece válido.";
    return "Não foi possível agora. Verifica a ligação e tenta outra vez.";
  };
  async function submitLogin(f) {
    const msg = $("#login-msg", f), btn = $("button[type=submit]", f), email = $("#login-email", f).value.trim().toLowerCase();
    if (!email) return;
    if (btn.dataset.step === "email") {
      btn.disabled = true; msg.textContent = "A enviar…";
      try {
        await CONTA.pedirCodigo(email);
        $(".login-codigo", f).hidden = false; $("#login-email", f).readOnly = true;
        btn.dataset.step = "codigo"; btn.textContent = "Entrar";
        msg.innerHTML = `Enviámos um código para <b>${esc(email)}</b>. Vê também o spam. <button type="button" class="linklike" data-act="login-reenviar">Reenviar</button>`;
        setTimeout(() => { const t = document.getElementById("login-token"); if (t) t.focus(); }, 50);
      } catch (e) { msg.textContent = erroConta(e); }
      btn.disabled = false; return;
    }
    const token = $("#login-token", f).value.replace(/\D/g, "");
    if (token.length < 6) { msg.textContent = "Escreve o código de 6 dígitos."; return; }
    btn.disabled = true; msg.textContent = "A confirmar…";
    try {
      const recarregar = await CONTA.confirmarCodigo(email, token);
      closeModal(); chipConta();
      const depois = depoisLogin; depoisLogin = null;
      if (recarregar) { location.reload(); return; }
      toast(`<span class="tl">${lince()}</span><div><b>Sessão iniciada</b><span>${CONTA.perfil && CONTA.perfil.plano === "completo" ? "O teu plano Completo está ativo." : "O teu progresso fica guardado na tua conta."}</span></div>`);
      if (depois) depois(); else route();
    } catch (e) { msg.textContent = erroConta(e); btn.disabled = false; }
  }

  /* código de oferta (professores, explicadores): só por link, ex.: …/?codigo=ABC123 */
  /* regresso do Stripe: o Payment Link volta para /?pago=1 */
  async function regressoPagamento() {
    const q = new URLSearchParams(location.search);
    if (q.get("pack") === "1") {
      q.delete("pack");
      history.replaceState(history.state, "", location.pathname + (q.toString() ? "?" + q : "") + location.hash);
      GC.event("pack-regresso");
      toast(`<span class="tl">${lince()}</span><div><b>Pack de IA comprado!</b><span>Os créditos ficam ativos em segundos e são usados quando acabar o limite do dia.</span></div>`);
      return;
    }
    if (q.get("pago") !== "1") return;
    q.delete("pago");
    history.replaceState(history.state, "", location.pathname + (q.toString() ? "?" + q : "") + location.hash);
    GC.event("pagamento-regresso");
    if (unlocked()) { toast(`<span class="tl">${lince()}</span><div><b>Plano Completo ativo!</b><span>Obrigado pela confiança. Bom estudo!</span></div>`); return; }
    if (!CONTA.on || !CONTA.user) { openLogin("comprei"); return; }
    openModal(`<h3>Pagamento recebido</h3><p class="muted" style="font-weight:600" id="pago-msg">A ativar o plano Completo na tua conta…</p>`);
    const ok = await CONTA.verificarPagamento();
    if (ok) { closeModal(); route(); toast(`<span class="tl">${lince()}</span><div><b>Plano Completo ativo!</b><span>Já tens acesso a tudo. Bom estudo!</span></div>`); GC.event("pagamento-ativo"); }
    else { const m = document.getElementById("pago-msg"); if (m) m.innerHTML = `Ainda não recebemos a confirmação. Se pagaste por Multibanco, o acesso abre sozinho quando o pagamento for confirmado (normalmente em poucas horas). Se pagaste com cartão ou MB WAY e isto não mudar em 5 minutos, recarrega a página ou escreve-nos.`; }
  }

  function abrirCodigo(v) {
    openModal(`<h3>Ativar código de acesso</h3><form id="code-form" class="form"><label class="lbl" for="code-in">Código</label><input type="text" id="code-in" autocomplete="off" required><div class="row"><button class="btn btn-primary" type="submit">Ativar</button><button class="btn btn-ghost" data-act="modal-close" type="button">Fechar</button></div><p class="small muted" id="code-msg" aria-live="polite" style="font-weight:700"></p></form>`);
    if (v) { const i = document.getElementById("code-in"); if (i) i.value = v; }
  }

  /* página da conta */
  function renderConta() {
    const u = CONTA.user, p = CONTA.perfil;
    const fmtData = (d) => d ? d.toLocaleString("pt-PT", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }) : "";
    app.innerHTML = `<div class="wrap" style="padding-bottom:60px;max-width:720px">
      <div class="page-head"><span class="eyebrow">${ic("user", 'width="18" height="18"')} A minha conta</span><h1>${u ? "A tua conta" : "Entrar ou criar conta"}</h1>
      <p>${u ? "O teu progresso fica guardado aqui e acompanha-te em qualquer dispositivo." : "Com uma conta, o teu progresso fica guardado e podes continuar no telemóvel ou no computador. É grátis e não precisa de palavra-passe."}</p></div>
      ${!CONTA.on ? `<div class="card"><p style="margin:0">As contas ainda não estão disponíveis.</p></div>`
        : u ? `<div class="card conta-card">
            <p><b>Email</b><span>${esc(u.email || "")}</span></p>
            <p><b>Plano</b><span>${p && p.plano === "completo" ? '<span class="chip free">Completo</span>' : `Grátis · <a href="#precos">ver o plano Completo</a>`}</span></p>
            <p><b>Progresso</b><span>${CONTA.ultima ? `guardado às ${esc(fmtData(CONTA.ultima))}` : "guardado automaticamente"} · ${st.xp} XP</span></p>
            <div class="row mt"><button class="btn btn-ghost btn-sm" type="button" data-act="conta-guardar">Guardar agora</button><button class="btn btn-soft btn-sm" type="button" data-act="conta-sair">Sair</button></div>
            <div class="row mt"><button class="btn btn-yellow btn-sm" type="button" data-act="ir-avaliar">⭐ Avaliar a Nota20</button></div>
          </div>
          <details class="card mt"><summary style="font-weight:800;cursor:pointer">Apagar a conta</summary>
            <p class="small muted" style="font-weight:600">Apaga o teu email, o progresso guardado e o acesso ligado à conta. Os registos de compras são guardados durante o prazo legal das faturas. Não dá para desfazer.</p>
            <button class="btn btn-ghost btn-sm" type="button" data-act="conta-apagar" style="color:var(--coral-d)">Apagar a minha conta</button></details>`
        : `<div class="card"><button class="btn btn-primary" type="button" data-act="login" data-m="guardar">${ic("user")} Entrar ou criar conta</button>
            <p class="small muted" style="font-weight:600;margin:12px 0 0">Já compraste? Entra com o mesmo email da compra e o plano Completo abre logo.</p></div>`}
      ${CONTA.user && ["diogomcpires2007@gmail.com", "nota20en@gmail.com"].includes(String(CONTA.user.email || "").toLowerCase()) ? `<a class="btn btn-soft mt" href="#parcerias-admin">${ic("star")} Comissões dos parceiros</a>` : ""}
      <div class="card mt conta-tema"><span><b>Aparência</b><span class="small muted" style="font-weight:600">Tema escuro para estudar à noite.</span></span><button class="btn btn-soft btn-sm" type="button" data-act="tema">${ic("moon")}<span data-tema-lab>${temaEscuro() ? "Tema claro" : "Tema escuro"}</span></button></div>
    </div>`;
  }

  const GRUPOS = {
    I: { nome: "Grupo I", desc: "Educação Literária", icon: "book" },
    II: { nome: "Grupo II", desc: "Leitura e Gramática", icon: "type" },
    III: { nome: "Grupo III", desc: "Escrita", icon: "pen" }
  };

  const nExercicios = TOPICS.reduce((a, t) => a + t.exercicios.length, 0);
  const nItensExame = EXAMS.reduce((a, e) => a + e.grupos.reduce((b, g) => b + g.partes.reduce((c, p) => c + p.itens.length, 0), 0), 0);
  const nFree = TOPICS.filter((t) => t.free).length;

  /* ---------- exames, histórico e previsão ---------- */
  const H = D.historico || { provas: [], previsao: [] };
  const topicById = (id) => TOPICS.find((t) => t.id === id);
  const REAL = EXAMS.filter((e) => !e.previsto).sort((a, b) => (b.ano - a.ano) || String(a.fase).localeCompare(String(b.fase)));
  const PREV = EXAMS.find((e) => e.previsto);
  const anosReais = REAL.map((e) => e.ano);
  const anosTxt = anosReais.length ? `${Math.min(...anosReais)} a ${Math.max(...anosReais)}` : "";
  const anosProvas = H.provas.map((p) => p.ano);
  const anosProvasTxt = anosProvas.length ? `${Math.min(...anosProvas)} a ${Math.max(...anosProvas)}` : "";
  const NIVEL = { 3: ["Muito provável", "n3"], 2: ["Provável", "n2"], 1: ["Possível", "n1"], 0: ["Pouco provável", "n0"] };
  const G3 = { "texto-opiniao": "texto de opinião", "apreciacao-critica": "apreciação crítica" };
  const FREE_PREV = 3;
  /* nos exames saem por vezes outras obras do mesmo autor: no mapa, estas linhas mostram o autor */
  const CRIADOR = C.CRIADOR || "";
  const madeBy = (cls = "") => CRIADOR ? `<p class="made-by ${cls}">${ic("grad")}<span>${esc(CRIADOR).replace(/(19,5|\b18\b)/, "<b>$1</b>")}</span></p>` : "";
  const AUTOR = { "os-maias": "Eça de Queirós", "amor-perdicao": "Camilo Castelo Branco", "frei-luis": "Almeida Garrett" };
  const prevIdx = (id) => H.previsao.findIndex((p) => p.topico === id);
  const saiuEm = (id) => H.provas.filter((p) => (p.lit && p.lit[id]) || (p.gram || []).includes(id) || (G3[id] && p.g3 === G3[id]));
  const ondeSaiu = (p, id) => (p.lit && p.lit[id]) ? "Grupo I · Parte " + p.lit[id] : (p.gram || []).includes(id) ? "Grupo II" : "Grupo III";
  const provaLabel = (p) => `${p.ano} · ${p.fase} fase`;
  function itensDoTopico(id) {
    const out = [];
    EXAMS.forEach((e) => e.grupos.forEach((g, gi) => g.partes.forEach((pt, pi) => pt.itens.forEach((it, ii) => { if (it.topico === id) out.push({ e, it, gi, key: `${e.id}-${gi}-${pi}-${ii}` }); }))));
    return out;
  }

  /* ---------- datas: exame e preço de lançamento ---------- */
  const exameDate = C.EXAME_DATA ? new Date(C.EXAME_DATA) : null;
  const diasExame = () => (exameDate && !isNaN(exameDate)) ? Math.max(0, Math.ceil((exameDate - Date.now()) / 864e5)) : 0;
  const dataEstimada = C.EXAME_DATA_OFICIAL ? "" : " (data estimada)";
  const precoNum = parseFloat(String(C.PRECO).replace(/[^\d,]/g, "").replace(",", ".")) || 0;
  function porDia() {
    const d = diasExame();
    if (!d || !precoNum) return "";
    const c = Math.floor((precoNum / d) * 100) + 1;
    return c < 100 ? `${c} cêntimos` : (c / 100).toFixed(2).replace(".", ",") + " €";
  }
  const promoEnd = C.PROMO_FIM ? new Date(C.PROMO_FIM) : null;
  const promoOn = () => !!(promoEnd && !isNaN(promoEnd) && promoEnd > Date.now());
  function cdText() {
    const ms = promoEnd - Date.now();
    if (ms <= 0) return "0 s";
    const s = Math.floor(ms / 1000), d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60), x = s % 60;
    return (d ? d + "d " : "") + String(h).padStart(2, "0") + "h " + String(m).padStart(2, "0") + "m " + String(x).padStart(2, "0") + "s";
  }

  /* ---------- ícones ---------- */
  const P = {
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
    book: '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 21.5A2.5 2.5 0 0 1 6.5 19H20v3H6.5"/>',
    type: '<path d="M4 7V5h16v2"/><path d="M9 19h6"/><path d="M12 5v14"/>',
    pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 15l2 2 4-4"/>',
    timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9 2h6"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.4A8 8 0 1 1 21 12z"/>',
    lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    flame: '<path d="M12 22c4 0 7-3 7-7 0-4-3-6-4-9-1 2-2 3-3 3 0-3-1-5-3-7 0 4-4 7-4 12 0 4 3 8 7 8z"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
    sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
    trophy: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a4 4 0 0 1-4 4M7 5H4v2a4 4 0 0 0 4 4"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
    bulb: '<path d="M9 18h6M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    quote: '<path d="M7 7h4v4c0 3-2 5-4 6M14 7h4v4c0 3-2 5-4 6"/>',
    feather: '<path d="M20 4c-6 0-12 4-14 12l-2 4"/><path d="M20 4c0 7-5 12-12 12"/><path d="M8 16h6"/>',
    layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 12 10 5 10-5M2 17l10 5 10-5"/>',
    crown: '<path d="m3 7 4 4 5-7 5 7 4-4-2 12H5z"/>',
    grad: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5M22 9v6"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
    print: '<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
    volume: '<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>'
  };
  const ic = (name, extra = "") => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${P[name] || ""}</svg>`;
  const icFill = (name) => `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true">${P[name] || ""}</svg>`;

  /* ---------- mascote: o Lince (original) ---------- */
  function lince(cls = "") {
    return `<svg class="lince ${cls}" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Lince, a mascote da Nota20">
      <path d="M78 128 L92 34 Q96 26 102 32 L146 100 Z" fill="#D9893F"/><path d="M90 116 L99 52 L132 100 Z" fill="#FFB9A8"/>
      <path d="M97 34 Q94 14 88 4" stroke="#2A1A10" stroke-width="7" stroke-linecap="round" fill="none"/>
      <path d="M222 128 L208 34 Q204 26 198 32 L154 100 Z" fill="#D9893F"/><path d="M210 116 L201 52 L168 100 Z" fill="#FFB9A8"/>
      <path d="M203 34 Q206 14 212 4" stroke="#2A1A10" stroke-width="7" stroke-linecap="round" fill="none"/>
      <path d="M56 168 L26 214 L70 210 L52 250 L104 230 L150 256 L196 230 L248 250 L230 210 L274 214 L244 168 Z" fill="#F4CC97"/>
      <ellipse cx="150" cy="166" rx="96" ry="84" fill="#EBA35A"/>
      <path d="M138 96 L141 116 M150 92 L150 114 M162 96 L159 116" stroke="#9A5524" stroke-width="5" stroke-linecap="round"/>
      <ellipse cx="150" cy="204" rx="54" ry="38" fill="#FFF3E2"/>
      <circle cx="86" cy="186" r="4" fill="#9A5524"/><circle cx="76" cy="172" r="3.2" fill="#9A5524"/><circle cx="214" cy="186" r="4" fill="#9A5524"/><circle cx="224" cy="172" r="3.2" fill="#9A5524"/>
      <ellipse cx="96" cy="206" rx="15" ry="9" fill="#FF8C8C" opacity=".45"/><ellipse cx="204" cy="206" rx="15" ry="9" fill="#FF8C8C" opacity=".45"/>
      <g class="eyes"><ellipse cx="116" cy="162" rx="22" ry="25" fill="#fff" stroke="#2A1A10" stroke-width="4"/><ellipse cx="184" cy="162" rx="22" ry="25" fill="#fff" stroke="#2A1A10" stroke-width="4"/>
      <circle cx="120" cy="166" r="12" fill="#2A1A10"/><circle cx="188" cy="166" r="12" fill="#2A1A10"/><circle cx="124" cy="161" r="4.5" fill="#fff"/><circle cx="192" cy="161" r="4.5" fill="#fff"/></g>
      <path d="M137 188 Q150 180 163 188 Q157 199 150 201 Q143 199 137 188 Z" fill="#E0605C"/>
      <path d="M150 201 L150 209 M150 209 Q140 220 129 211 M150 209 Q160 220 171 211" stroke="#2A1A10" stroke-width="4" stroke-linecap="round" fill="none"/>
      <path d="M118 84 L182 84 L180 100 Q150 108 120 100 Z" fill="#1E2A6B"/>
      <path d="M150 52 L214 76 L150 98 L86 76 Z" fill="#2D3FA0" stroke="#1E2A6B" stroke-width="3"/>
      <g class="tassel"><path d="M150 76 L200 82 L202 112" stroke="#FFC72C" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="202" cy="116" r="7" fill="#FFC72C"/></g>
      <circle cx="150" cy="76" r="5" fill="#FFC72C"/>
    </svg>`;
  }

  /* ---------- gamificação: XP, nível e dias seguidos ---------- */
  function streak() {
    const set = new Set(st.days);
    let n = 0;
    const d = new Date();
    if (!set.has(d.toISOString().slice(0, 10))) d.setDate(d.getDate() - 1);
    while (set.has(d.toISOString().slice(0, 10))) { n += 1; d.setDate(d.getDate() - 1); }
    return n;
  }
  const level = () => Math.floor(st.xp / 100) + 1;
  function renderXpChip(bump) {
    const el = document.getElementById("xp-chip");
    el.innerHTML = `<span class="fl">${icFill("flame")}${streak()}</span><span class="xp">${icFill("bolt")}${st.xp} XP</span>`;
    el.title = `Nível ${level()} · ${streak()} ${streak() === 1 ? "dia seguido" : "dias seguidos"}`;
    if (bump && !REDUCED) { el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); }
  }
  function addXP(n, key, x, y) {
    if (key) { if (st.awarded.has(key)) return; st.awarded.add(key); store.set("awarded", [...st.awarded]); }
    st.xp += n; store.set("xp", st.xp);
    if (!st.days.includes(today())) { st.days.push(today()); st.days = st.days.slice(-120); store.set("days", st.days); }
    renderXpChip(true);
    checkBadges();
    if (x != null && !REDUCED) {
      const s = document.createElement("div");
      s.className = "xp-pop"; s.textContent = `+${n} XP`;
      s.style.left = x + "px"; s.style.top = y + "px";
      document.body.appendChild(s); setTimeout(() => s.remove(), 1300);
    }
  }
  function confetti(x, y, n = 16) {
    if (REDUCED) return;
    const colors = ["#2d6bff", "#ffc72c", "#ff6b5b", "#8a5cff", "#14b877", "#ff5fa2"];
    for (let i = 0; i < n; i++) {
      const c = document.createElement("i");
      c.className = "confetti";
      const ang = Math.random() * Math.PI * 2, dist = 70 + Math.random() * 140;
      c.style.left = x + "px"; c.style.top = y + "px";
      c.style.background = colors[i % colors.length];
      c.style.setProperty("--dx", Math.cos(ang) * dist + "px");
      c.style.setProperty("--dy", Math.sin(ang) * dist + 60 + "px");
      c.style.setProperty("--rot", (Math.random() * 720 - 360) + "deg");
      document.body.appendChild(c); setTimeout(() => c.remove(), 1200);
    }
  }
  const centerOf = (el) => { const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };

  /* ---------- IA: estado ---------- */
  let aiMode; // undefined = a verificar; null = sem IA
  AI.modo().then((m) => { aiMode = m; document.body.classList.toggle("has-ai", !!m); if (currentView === "duvidas") renderTutor(); });
  /* ---------- plano grátis: limites e ecrã de desbloqueio ---------- */
  const USE_KEY = { exercicios: "ex", explicador: "chat", correcao: "fix" };
  const left = (kind) => Math.max(0, LIM[kind] - used[USE_KEY[kind]]);
  const canUse = (kind) => unlocked() || left(kind) > 0;
  function consume(kind) { if (unlocked()) return; used[USE_KEY[kind]] += 1; store.set("used", used); refreshMeters(); }
  const FREE_IDS = new Set(TOPICS.filter((t) => t.free).map((t) => t.id));
  const isFreeKey = (key) => { const m = /^t-(.+)-\d+$/.exec(key || ""); return !!(m && (FREE_IDS.has(m[1]) || isExtra(m[1]))); };
  function gateEx(key) {
    if (unlocked() || counted.has(key) || isFreeKey(key) || /^zq-/.test(key || "")) return true;
    if (left("exercicios") <= 0) { openPaywall("exercicios"); return false; }
    counted.add(key); store.set("counted", [...counted]); consume("exercicios");
    if (left("exercicios") === 0) setTimeout(() => openPaywall("ultimo"), 1700);
    return true;
  }
  function meterHTML() {
    if (unlocked()) return "";
    const m = (k, label) => { const max = LIM[k], u = Math.min(max, used[USE_KEY[k]]); return `<div class="meter"><div class="lab"><span>${label}</span><span class="num">${u}/${max}</span></div><div class="bar"><i style="width:${(u / max) * 100}%"></i></div></div>`; };
    return `<div class="card meters"><span class="eyebrow">${ic("lock")} Plano grátis</span>${m("exercicios", "Exercícios")}${m("explicador", "Perguntas ao explicador")}${m("correcao", "Correções com IA")}<button class="btn btn-primary btn-sm btn-shine" type="button" data-act="paywall" data-r="topico">Desbloquear tudo</button></div>`;
  }
  function refreshMeters() { $$("[data-meters]").forEach((el) => { el.innerHTML = meterHTML(); }); }
  function openPaywall(reason) {
    GC.event("paywall-" + reason);
    const M = {
      ultimo: ["Foi o teu último exercício grátis!", `Já fizeste ${LIM.exercicios} exercícios e estás a ganhar ritmo. Não pares agora.`],
      exercicios: ["Chegaste ao limite do plano grátis", `Já fizeste os ${LIM.exercicios} exercícios grátis. Para continuares a treinar, desbloqueia o plano Completo.`],
      explicador: ["O Lince quer continuar a ajudar-te", `Já usaste as ${LIM.explicador} perguntas grátis ao explicador. Desbloqueia para perguntares tudo o que precisares.`],
      correcao: ["Gostaste da correção?", "Já usaste a correção grátis. No plano Completo, a IA corrige todas as tuas respostas e textos."],
      topico: ["Continua no plano Completo", "Viste o início. O resumo completo, os pontos-chave e todos os exercícios estão no plano Completo."],
      exame: ["Queres ver o resto do exame?", `O Grupo I de 2025 é grátis. Os outros grupos, os ${REAL.length} exames resolvidos e o simulado estão no plano Completo.`],
      provaveis: ["Vê a previsão completa", `Os ${FREE_PREV} primeiros tópicos são grátis. A lista completa, com o motivo de cada um, e o Exame Previsto 2027 estão no plano Completo.`],
      previsto: ["O Exame Previsto 2027 é do plano Completo", "Um exame completo no formato oficial, feito com os temas mais prováveis, com todos os itens resolvidos e ligados à matéria."],
      embalo: ["Estás em grande!", `Acertaste 3 seguidas. No plano Completo tens ${nExercicios} exercícios, ${REAL.length} exames resolvidos e o Exame Previsto 2027 para continuares neste ritmo.`],
      simulado: ["Os simulados são do plano Completo", "Provas completas com tempo e nota final, como no dia do exame."],
      cabula: ["A cábula completa é do plano Completo", `Os pontos-chave dos ${TOPICS.length} tópicos numa só página, para imprimir e rever antes do exame.`]
    }[reason] || ["Desbloqueia o plano Completo", ""];
    const s = streak(), certas = Object.values(st.res).filter((r) => r.ok).length;
    const pay = C.PAYMENT_LINK
      ? `<a class="btn btn-primary btn-shine" href="${esc(payHref())}" rel="noopener" data-buy>Desbloquear tudo · ${esc(C.PRECO)}</a>`
      : `<a class="btn btn-primary btn-shine" href="#precos" data-act="modal-close">Desbloquear tudo · ${esc(C.PRECO)}</a>`;
    openModal(`<div class="pw-head">${lince()}<div><h3>${M[0]}</h3><p class="muted" style="margin:6px 0 0;font-weight:600">${M[1]}</p></div></div>
      <div class="pw-stats"><div><b>${st.xp}</b><span>XP</span></div><div><b>${s}</b><span>dias seguidos</span></div><div><b>${certas}</b><span>respostas certas</span></div></div>
      ${s > 0 ? `<p class="pw-loss">${icFill("flame")} Não percas a tua sequência de ${s} ${s === 1 ? "dia" : "dias"}.</p>` : ""}
      <ul class="pw-list"><li>Todos os ${TOPICS.length} tópicos e ${nExercicios} exercícios</li><li>${REAL.length} exames nacionais resolvidos (${anosTxt}) e ${SIMS.length} simulados</li><li>Exame Previsto 2027 e previsão completa dos tópicos</li><li>Explicador e correção com IA, sem os limites do plano grátis</li></ul>
      ${priceLine()}
      ${pay}
      <p class="small muted buy-terms">Pagamento único. Ao comprar, aceitas os <a href="#termos" data-act="modal-close">Termos e condições</a>.</p>
      ${G ? `<div class="guarantee">${ic("shield")}<span><b>Garantia de ${G} dias</b>Se não gostares, devolvemos o dinheiro.</span></div>` : ""}
      ${conviteHTML()}
      <button class="btn btn-soft btn-sm" type="button" data-act="modal-close">Agora não</button>`);
  }

  /* ---------- convida amigos ---------- */
  function conviteHTML() {
    if (unlocked()) return "";
    const ex = isExtra(extraId()) ? topicById(extraId()) : null;
    if (ex) return `<div class="convite done">${ic("star")}<span>Desbloqueaste <a href="#t-${ex.id}" data-act="modal-close">${esc(ex.titulo)}</a> por convidares amigos.</span></div>`;
    const n = Math.min(CONV, +store.get("convites", 0) || 0);
    if (n >= CONV) return `<div class="convite"><div><b>Escolhe o teu tópico grátis</b><span>Já partilhaste com ${CONV} amigos. Obrigado!</span></div>
      <div class="row"><select class="extra-sel" aria-label="Tópico a desbloquear">${TOPICS.filter((t) => !t.free).map((t) => `<option value="${t.id}">${esc(t.titulo)}</option>`).join("")}</select><button class="btn btn-primary btn-sm" type="button" data-act="escolher-extra">Desbloquear</button></div></div>`;
    return `<div class="convite"><div><b>Ganha 1 tópico grátis</b><span>Partilha a Nota20 com ${CONV} amigos e escolhe um tópico do plano Completo.</span><span class="conv-dots">${Array.from({ length: CONV }, (_, i) => `<i class="${i < n ? "on" : ""}"></i>`).join("")} ${n}/${CONV}</span></div>
      <button class="btn btn-yellow btn-sm" type="button" data-act="convidar">Partilhar</button></div>`;
  }
  const conviteTexto = () => `Estou a preparar o exame de Português com a Nota20: plano de estudo grátis, resumos e exames resolvidos. Experimenta: ${SITE().split("?")[0]}?ref=convite`;
  let convPendente = false;
  function conviteConta() {
    const n = Math.min(CONV, (+store.get("convites", 0) || 0) + 1);
    store.set("convites", n);
    GC.event("convite-partilha");
    closeModal();
    if (n >= CONV) { toast(`<span class="tl">${lince()}</span><div><b>Partilhaste com ${CONV} amigos!</b><span>Escolhe o tópico que queres desbloquear.</span></div>`); openModal(`<h3>Obrigado por partilhares!</h3>${conviteHTML()}<button class="btn btn-soft btn-sm" type="button" data-act="modal-close">Escolher depois</button>`); }
    else toast(`<span class="tl">${lince()}</span><div><b>Partilhaste ${n} de ${CONV}</b><span>Mais ${CONV - n} e escolhes um tópico grátis.</span></div>`);
    route();
  }
  async function convidar() {
    const txt = conviteTexto();
    if (navigator.share && !inFrame) { try { await navigator.share({ title: "Nota20", text: txt }); conviteConta(); return; } catch (e) { if (e && e.name === "AbortError") return; } }
    convPendente = true;
    openModal(`<h3>Convida um amigo</h3>
      <p class="small muted" style="font-weight:600;margin:0">Envia a um amigo que também tenha o exame. Ao fim de ${CONV} envios, escolhes um tópico grátis.</p>
      <pre class="share-pre">${esc(txt)}</pre>
      <div class="row"><a class="btn btn-primary btn-sm" href="https://wa.me/?text=${encodeURIComponent(txt)}" target="_blank" rel="noopener" data-act="convite-wa">${ic("chat")} Enviar por WhatsApp</a>
        <button class="btn btn-ghost btn-sm" type="button" data-act="convite-copiar">Copiar mensagem</button></div>
      <button class="btn btn-soft btn-sm" type="button" data-act="modal-close">Fechar</button>`);
  }

  function priceLine() {
    const pd = porDia();
    return `<div class="pw-price">${promoOn() ? `<span><b>${esc(C.PRECO)}</b> até ao fim do lançamento (depois ${esc(C.PRECO_DEPOIS)}) · acaba em <b data-cd>${cdText()}</b></span>` : `<span><b>${esc(C.PRECO)}</b> · pagamento único</span>`}${pd ? `<span class="small">Menos de ${pd} por dia até ao exame.</span>` : ""}</div>${parcAvisoHTML()}`;
  }

  /* ---------- incentivos: faixa de lançamento e aviso de embalo ---------- */
  let promoInt = null;
  function tickCd() { const t = cdText(); $$("[data-cd]").forEach((el) => { el.textContent = t; }); if (!promoOn()) renderPromo(); }
  function renderPromo() {
    let bar = document.getElementById("promo-bar");
    const hv = (location.hash || "#inicio").slice(1).split("/")[0] || "inicio";
    const tp = /^[tm]-/.test(hv) ? topicById(hv.slice(2)) : null;
    const onde = hv === "inicio" || hv === "precos" || hv === "provaveis" || hv === "exames" || hv === "simulado" || /^e-/.test(hv) || (tp && !canOpen(tp));
    const show = !unlocked() && promoOn() && ssGet("n20:promo-x") !== "1" && onde;
    document.body.classList.toggle("promo-home", hv === "inicio" || hv === "precos");
    document.body.classList.toggle("is-pro", unlocked());
    clearInterval(promoInt);
    if (promoOn()) promoInt = setInterval(tickCd, 1000);
    if (!show) { if (bar) bar.remove(); document.body.classList.remove("has-promo"); return; }
    if (!bar) { bar = document.createElement("div"); bar.id = "promo-bar"; bar.className = "promo-bar"; bar.setAttribute("role", "region"); bar.setAttribute("aria-label", "Preço de lançamento"); document.body.appendChild(bar); }
    document.body.classList.add("has-promo");
    bar.innerHTML = `<span class="pb-fire">${icFill("flame")}</span>
      <span class="pb-txt"><span class="pb-price"><span class="pb-lab">Preço de lançamento: </span><b>${esc(C.PRECO)}</b> <span class="pb-after">depois ${esc(C.PRECO_DEPOIS)}</span></span><span class="pb-cd">acaba em <b data-cd>${cdText()}</b></span></span>
      <a class="btn btn-yellow btn-sm" href="#precos">Ver plano</a>
      <button class="pb-x" type="button" data-act="promo-x" aria-label="Fechar">${ic("x")}</button>`;
  }
  let okRow = 0, embaloShown = false;
  function toast(html, ms = 7000) {
    const old = document.getElementById("toast"); if (old) old.remove();
    const t = document.createElement("div");
    t.id = "toast"; t.className = "toast"; t.setAttribute("role", "status");
    t.innerHTML = html;
    document.body.appendChild(t);
    setTimeout(() => { t.classList.add("out"); setTimeout(() => t.remove(), 400); }, ms);
  }

  /* ---------- poemas com numeração de versos ---------- */
  function formatPoems(root) {
    $$(".poem:not([data-done])", root).forEach((el) => {
      const parts = el.innerHTML.split(/<br\s*\/?>/i);
      let n = 0;
      el.innerHTML = parts.map((p) => { if (!p.trim()) return '<span class="gap"></span>'; n += 1; return `<span class="ln"${n % 5 === 0 ? ` data-n="${n}"` : ""}>${p}</span>`; }).join("");
      el.setAttribute("data-done", "1");
    });
  }

  /* ---------- markdown mínimo (respostas da IA) ---------- */
  function md(text) {
    return esc(text).split(/\n{2,}/).map((b) => {
      const lines = b.split("\n");
      if (lines.every((l) => /^\s*[-•*]\s+/.test(l))) return "<ul>" + lines.map((l) => "<li>" + l.replace(/^\s*[-•*]\s+/, "") + "</li>").join("") + "</ul>";
      return "<p>" + lines.join("<br>") + "</p>";
    }).join("").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  }

  /* ---------- animações ao aparecer e contadores ---------- */
  let io = null;
  function enhance(root) {
    formatPoems(root);
    if (REDUCED || !("IntersectionObserver" in window)) return;
    if (!io) io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target; io.unobserve(el);
        if (el.classList.contains("rv")) el.classList.add("in");
        if (el.dataset.count) countUp(el);
      });
    }, { threshold: 0.15 });
    $$(".rv, [data-count]", root).forEach((el, i) => { if (el.classList.contains("rv")) el.style.animationDelay = (i % 6) * 70 + "ms"; io.observe(el); });
  }
  function countUp(el) {
    const target = +el.dataset.count, t0 = performance.now(), dur = 1000;
    const step = (t) => { const p = Math.min(1, (t - t0) / dur); el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }

  /* ============================================================
     ITENS (exercícios, itens de exame, simulado)
     ============================================================ */
  function chipsFor(item, ctx) {
    const c = [];
    if (ctx.exam) c.push(item.obrigatorio ? '<span class="chip req">Obrigatório</span>' : '<span class="chip opt">Opcional</span>');
    const cot = item.cotacao || 13;
    if (ctx.exam || item.tipo === "aberta" || item.tipo === "texto") c.push(`<span class="chip num">${cot} pontos</span>`);
    const tipo = { mc: "Escolha múltipla", multi: "Seleção", completar: "Completamento", aberta: "Resposta restrita", texto: "Resposta extensa" }[item.tipo];
    if (tipo) c.push(`<span class="chip">${tipo}</span>`);
    if (!ctx.exam && ["mc", "multi", "completar"].includes(item.tipo)) c.push(`<span class="chip pro">${icFill("bolt")}+10 XP</span>`);
    return c.join("");
  }

  function renderItem(item, key, num, ctx = {}) {
    const mode = ctx.mode || "practice";
    let body = "";
    if (item.texto) body += `<div class="textbox">${item.texto}</div>`;
    body += `<p class="q-text">${item.enunciado}</p>`;
    if (item.tipo === "mc") {
      body += `<div class="opts">${item.opcoes.map((o, i) => `<button type="button" class="opt" data-act="mc" data-i="${i}"><span class="l">${L[i]}</span><span>${o}</span></button>`).join("")}</div>`;
    } else if (item.tipo === "multi") {
      body += `<p class="small muted" style="font-weight:700">Escolhe ${item.certas.length} opções.</p><div class="opts">${item.opcoes.map((o, i) => `<button type="button" class="opt" data-act="multi" data-i="${i}" aria-pressed="false"><span class="l">${L[i]}</span><span>${o}</span></button>`).join("")}</div>`;
      if (mode === "practice") body += `<div class="actions"><button type="button" class="btn btn-primary btn-sm" data-act="check-multi">Verificar</button></div>`;
    } else if (item.tipo === "completar") {
      body += item.sub.map((s, si) => `<p class="sub-q">${s.label}</p><div class="opts">${s.opcoes.map((o, i) => `<button type="button" class="opt" data-act="comp" data-s="${si}" data-i="${i}"><span class="l">${i + 1}</span><span>${o}</span></button>`).join("")}</div>`).join("");
      if (mode === "practice") body += `<div class="actions"><button type="button" class="btn btn-primary btn-sm" data-act="check-comp">Verificar</button></div>`;
    } else if (item.tipo === "aberta" || item.tipo === "texto") {
      const isTexto = item.tipo === "texto";
      const val = mode === "exam" ? (simAns(key).text || "") : (st.drafts[key] || "");
      body += `<label class="sr" for="ta-${key}">A tua resposta</label><textarea id="ta-${key}" data-act="draft" rows="${isTexto ? 12 : 6}" placeholder="${isTexto ? "Escreve aqui o teu texto (200 a 350 palavras)…" : "Escreve aqui a tua resposta…"}">${esc(val)}</textarea>`;
      body += `<div style="margin-top:6px"><span data-wc>${wcLabel(val, isTexto)}</span></div>`;
      if (mode === "practice") {
        body += `<div class="actions">
          <button type="button" class="btn btn-soft btn-sm" data-act="show-sol">${ic("bulb")} Ver resolução</button>
          <button type="button" class="btn btn-primary btn-sm ai-only" data-act="ai-fix">${ic("sparkle")} Corrigir com IA</button>
        </div><div class="ai-slot"></div><div class="solution" hidden>${solutionHTML(item)}</div>`;
      }
    }
    if (mode === "practice") body += `<div class="fbwrap" aria-live="polite"></div>`;
    if (mode === "practice" && item.topico && topicById(item.topico)) body += `<a class="rev-link" href="#t-${item.topico}">${ic("book")}<span>Rever a matéria: <b>${esc(topicById(item.topico).titulo)}</b></span>${ic("arrow")}</a>`;
    return `<article class="q" id="q-${key}" data-key="${key}" data-type="${item.tipo}">
      <div class="q-head"><div class="q-num">${esc(num)}</div><div class="q-body"><div class="q-meta">${chipsFor(item, ctx)}</div>${body}</div></div>
    </article>`;
  }

  function wcLabel(text, isTexto) {
    const n = wordCount(text);
    if (!isTexto) return n ? `<span class="wc">${n} palavras</span>` : "";
    const cls = n === 0 ? "" : (n >= 200 && n <= 350 ? "good" : "badc");
    return `<span class="wc ${cls}">${n} palavras · limite 200 a 350</span>`;
  }
  function solutionHTML(item) {
    let s = `<p class="eyebrow">${ic("bulb", 'width="16" height="16"')} Proposta de resolução</p><div class="model">${item.resolucao || ""}</div>`;
    if (item.criterios && item.criterios.length) s += `<p class="eyebrow" style="margin-top:16px">${ic("target", 'width="16" height="16"')} O que os critérios valorizam</p><ul class="crit">${item.criterios.map((c) => `<li>${c}</li>`).join("")}</ul>`;
    return s;
  }
  const fbHTML = (ok, title, text) => `<div class="fb ${ok ? "ok" : "no"}"><span class="fi">${ic(ok ? "check" : "x")}</span><div><b>${title}</b>${text || ""}</div></div>`;

  const ITEMS = new Map();
  function reg(key, item, ctx) { ITEMS.set(key, { item, ctx }); }

  function restorePractice(key) {
    const r = st.res[key];
    const el = document.getElementById("q-" + key);
    if (!r || !el || !ITEMS.has(key)) return;
    const { item } = ITEMS.get(key);
    if (item.tipo === "mc") showMc(el, item, r.sel, key, false);
    if (item.tipo === "multi") { r.sel.forEach((i) => { const b = $(`.opt[data-i="${i}"]`, el); if (b) b.classList.add("sel"); }); checkMulti(el, item, key, false); }
    if (item.tipo === "completar") { Object.entries(r.sel).forEach(([s, i]) => { const b = $(`.opt[data-s="${s}"][data-i="${i}"]`, el); if (b) b.classList.add("sel"); }); checkComp(el, item, key, false); }
  }
  const retryBtn = () => `<button type="button" class="btn btn-ghost btn-sm" data-act="retry" style="margin-top:12px">Tentar de novo</button>`;
  const PRAISE = ["Certo!", "Muito bem.", "Exatamente.", "Correto.", "Boa resposta."];
  const praise = () => PRAISE[Math.floor(Math.random() * PRAISE.length)];

  function celebrate(el, ok, key, anchor) {
    el.classList.remove("good", "bad"); void el.offsetWidth;
    el.classList.add(ok ? "good" : "bad");
    if (ok) { const [x, y] = centerOf(anchor || el); confetti(x, y); addXP(10, "ok:" + key, x, y - 20); }
    okRow = ok ? okRow + 1 : 0;
    if (okRow >= 3 && !unlocked() && !embaloShown) {
      embaloShown = true;
      setTimeout(() => toast(`<span class="tl">${lince()}</span><div><b>3 certas seguidas!</b><span>Estás em forma. No plano Completo tens mais ${nExercicios - LIM.exercicios} exercícios assim.</span></div><button class="btn btn-primary btn-sm" type="button" data-act="paywall" data-r="embalo">Ver plano</button>`), 900);
    }
  }

  function showMc(el, item, sel, key, live = true) {
    $$(".opt", el).forEach((b, i) => { b.disabled = true; if (i === item.certa) b.classList.add("right"); if (i === sel && sel !== item.certa) b.classList.add("wrong"); });
    const ok = sel === item.certa;
    $(".fbwrap", el).innerHTML = fbHTML(ok, ok ? praise() : `A certa é a ${L[item.certa]}`, item.explicacao) + retryBtn();
    if (live) { st.res[key] = { sel, ok }; saveRes(); celebrate(el, ok, key, $(`.opt[data-i="${sel}"]`, el)); afterAnswer(key, ok); }
  }
  function checkMulti(el, item, key, live = true) {
    const sel = $$(".opt.sel", el).map((b) => +b.dataset.i);
    const fb = $(".fbwrap", el);
    if (sel.length !== item.certas.length) { fb.innerHTML = `<div class="fb info">Escolhe exatamente ${item.certas.length} opções.</div>`; return; }
    $$(".opt", el).forEach((b, i) => { b.disabled = true; if (item.certas.includes(i)) b.classList.add("right"); else if (b.classList.contains("sel")) b.classList.add("wrong"); b.classList.remove("sel"); });
    const ok = sameSet(sel, item.certas);
    fb.innerHTML = fbHTML(ok, ok ? praise() : "Ainda não", item.explicacao) + retryBtn();
    const c = $('[data-act="check-multi"]', el); if (c) c.hidden = true;
    if (live) { st.res[key] = { sel, ok }; saveRes(); celebrate(el, ok, key, c); afterAnswer(key, ok); }
  }
  function checkComp(el, item, key, live = true) {
    const sel = {};
    $$(".opt.sel", el).forEach((b) => { sel[b.dataset.s] = +b.dataset.i; });
    const fb = $(".fbwrap", el);
    if (Object.keys(sel).length !== item.sub.length) { fb.innerHTML = `<div class="fb info">Escolhe uma opção em cada alínea.</div>`; return; }
    let ok = true;
    item.sub.forEach((s, si) => { $$(`.opt[data-s="${si}"]`, el).forEach((b) => { const i = +b.dataset.i; b.disabled = true; if (i === s.certa) b.classList.add("right"); else if (i === sel[si]) { b.classList.add("wrong"); ok = false; } b.classList.remove("sel"); }); });
    fb.innerHTML = fbHTML(ok, ok ? praise() : "Ainda não", item.explicacao) + retryBtn();
    const c = $('[data-act="check-comp"]', el); if (c) c.hidden = true;
    if (live) { st.res[key] = { sel, ok }; saveRes(); celebrate(el, ok, key, c); afterAnswer(key, ok); }
  }
  const sameSet = (a, b) => a.length === b.length && [...a].sort().join() === [...b].sort().join();

  /* depois de cada resposta: erros corrigidos, treino rápido */

  /* pedido de avaliação: uma só vez, quando o aluno já viu valor */
  function pedirAvaliacao() {
    if (store.get("avalPedido", false)) return;
    store.set("avalPedido", true); GC.event("avaliar-pedido");
    setTimeout(() => toast(`<span class="tl">${lince()}</span><div><b>Estás a gostar da Nota20?</b><span>Deixa uma avaliação, ajuda outros alunos a encontrar-nos. <button type="button" class="linklike" data-act="ir-avaliar">Avaliar ⭐</button></span></div>`, 12000), 1800);
  }

  function afterAnswer(key, ok) {
    if (QZ && key === qzKey()) { qzAnswered(key, ok); return; }
    srsUpdate(key, ok);
    if (Object.keys(st.res).length >= 20) pedirAvaliacao();
    if (ok && wasWrong.has(key)) {
      wasWrong.delete(key); st.fixed += 1; store.set("fixed", st.fixed);
      const el = document.getElementById("q-" + key);
      if (el) { const f = $(".fbwrap", el); if (f) f.insertAdjacentHTML("afterbegin", `<div class="fb ok fixed-note"><span class="fi">${ic("check")}</span><div><b>Erro corrigido!</b>Já corrigiste ${st.fixed} ${st.fixed === 1 ? "erro" : "erros"}.</div></div>`); }
    }
    if (currentView === "treino" && st.treino && st.treino.keys.includes(key)) { st.treino.done[key] = ok; updateTreino(); }
    if (currentView === "erros") updateErrosCount();
  }

  /* ---------- correção com IA ---------- */
  function promptAberta(item, answer) {
    const max = item.cotacao || 13;
    return [
      "És professor classificador do Exame Nacional de Português (prova 639, IAVE, Portugal). Classifica a resposta do aluno com o rigor de um classificador oficial.",
      `Cotação do item: ${max} pontos (conteúdo e estruturação do discurso: ${max - 3}; correção linguística: 3).`,
      "Item: " + strip(item.enunciado),
      item.texto ? "Texto de apoio:\n" + strip(item.texto) : "",
      "Tópicos que os critérios valorizam:\n- " + (item.criterios || []).map(strip).join("\n- "),
      "Proposta de resolução (referência; não exijas as mesmas palavras):\n" + strip(item.resolucao),
      'Resposta do aluno:\n"""\n' + answer + '\n"""',
      `Responde APENAS com JSON válido, em português europeu: {"pontos": inteiro de 0 a ${max}, "comentario": "duas frases", "bem": ["até 3 pontos fortes"], "melhorar": ["até 3 sugestões concretas"], "erros": [{"erro": "excerto com erro", "correcao": "forma correta"}]}`,
      "Se a resposta não tiver relação com o item, dá 0. Não inventes erros linguísticos."
    ].filter(Boolean).join("\n\n");
  }
  function promptTexto(item, answer, n) {
    const genero = item.generoAlvo || "texto";
    return [
      `És professor classificador do Exame Nacional de Português (prova 639, IAVE). Classifica este ${genero} do Grupo III (44 pontos).`,
      "Parâmetros (usa só os níveis 0, 3, 5, 8 ou 10 em A, B e C):",
      `A Género/formato (10): ${genero === "apreciação crítica" ? "descrição do objeto com elementos significativos; comentário crítico com pelo menos três aspetos e discurso valorativo; conclusão" : "ponto de vista claro; pelo menos dois argumentos distintos, cada um com um exemplo; juízos de valor; conclusão que decorre da argumentação"}.`,
      "B Tema e pertinência da informação (10): sem desvios ao tema; informação relevante e variada; argumentação eficaz; registo adequado.",
      "C Organização e coesão (10): partes equilibradas, parágrafos, conectores adequados, cadeias de referência, coerência de pessoa e tempo.",
      "CL Correção linguística (0 a 14): desconta erros de tipo A (pontuação, ortografia, morfologia) e de tipo B (sintaxe, impropriedade lexical).",
      `O texto tem ${n} palavras (limite 200 a 350; o desconto por extensão é calculado à parte).`,
      "Instrução do item: " + strip(item.enunciado),
      'Texto do aluno:\n"""\n' + answer + '\n"""',
      'Responde APENAS com JSON válido, em português europeu: {"A": 0-10, "B": 0-10, "C": 0-10, "CL": 0-14, "comentario": "duas frases", "bem": ["até 3"], "melhorar": ["até 3 sugestões concretas"], "erros": [{"erro": "excerto", "correcao": "forma correta"}]}'
    ].join("\n\n");
  }
  const clampN = (v, a, b) => Math.max(a, Math.min(b, Math.round(Number(v) || 0)));
  function scoreTexto(r, n) {
    const A = clampN(r.A, 0, 10), B = clampN(r.B, 0, 10), Cc = clampN(r.C, 0, 10), CL = clampN(r.CL, 0, 14);
    const desconto = n < 200 ? Math.min(5, 200 - n) : n > 350 ? Math.min(5, n - 350) : 0;
    const total = (n < 80 || A === 0 || B === 0) ? 0 : Math.max(0, A + B + Cc + CL - desconto);
    return { A, B, C: Cc, CL, desconto, total };
  }
  function aiResultHTML(r, item, n) {
    const lists = (t, arr) => (arr && arr.length) ? `<p class="small" style="margin:10px 0 0"><b>${t}</b></p><ul>${arr.slice(0, 3).map((x) => `<li>${esc(typeof x === "string" ? x : (x.erro + " → " + x.correcao))}</li>`).join("")}</ul>` : "";
    let head;
    if (item.tipo === "texto") {
      const s = scoreTexto(r, n);
      head = `<div class="score">${s.total}<span class="small muted"> / 44</span></div>
        <div class="params"><div>A<b>${s.A}</b></div><div>B<b>${s.B}</b></div><div>C<b>${s.C}</b></div><div>CL<b>${s.CL}</b></div></div>
        ${s.desconto ? `<p class="small">Desconto por extensão: −${s.desconto}</p>` : ""}${n < 80 ? '<p class="small">Menos de 80 palavras: classificação zero.</p>' : ""}`;
    } else {
      const max = item.cotacao || 13;
      head = `<div class="score">${clampN(r.pontos, 0, max)}<span class="small muted"> / ${max}</span></div>`;
    }
    return `<div class="ai-box"><p class="eyebrow" style="color:var(--violet-d)">${ic("sparkle", 'width="16" height="16"')} Correção estimada pela IA</p>${head}
      ${r.comentario ? `<p style="margin:8px 0 0;font-weight:600">${esc(r.comentario)}</p>` : ""}
      ${lists("Está bem", r.bem)}${lists("A melhorar", r.melhorar)}${lists("Erros de língua", r.erros)}
      <p class="small muted" style="margin:10px 0 0">Estimativa orientadora: compara sempre com a proposta de resolução.</p></div>`;
  }
  async function aiFix(el, key) {
    const { item } = ITEMS.get(key);
    const answer = ($("textarea", el).value || "").trim();
    const slot = $(".ai-slot", el);
    const n = wordCount(answer);
    if (n < 5) { slot.innerHTML = `<div class="fb info">Escreve primeiro a tua resposta.</div>`; return; }
    if (!canUse("correcao")) { openPaywall("correcao"); return; }
    if (precisaLoginIA()) return;
    const btn = $('[data-act="ai-fix"]', el);
    btn.disabled = true;
    slot.innerHTML = `<div class="fb info"><span class="typing"><i></i><i></i><i></i></span> A corrigir com os critérios oficiais…</div>`;
    try {
      const r = await AI.json(item.tipo === "texto" ? promptTexto(item, answer, n) : promptAberta(item, answer));
      slot.innerHTML = aiResultHTML(r || {}, item, n);
      if (item.tipo === "texto" && r) { st.g3 = st.g3.concat(scoreTexto(r, n).total / 44).slice(-5); store.set("g3", st.g3); }
      consume("correcao");
      const [x, y] = centerOf(btn); addXP(5, "ai:" + key, x, y - 20);
    } catch (e) {
      slot.innerHTML = `<div class="fb info">${erroIA(e, "correcao") || "Não foi possível corrigir agora. Tenta de novo ou vê a proposta de resolução."}</div>`;
    } finally { btn.disabled = false; }
  }

  /* ============================================================
     VISTAS
     ============================================================ */
  let currentView = "inicio";
  let timerInt = null;
  function setNav(v) { $$("[data-nav]").forEach((a) => { if (a.dataset.nav === v) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); }); }


  /* ---------- setas recuar / avançar (como no navegador; úteis na app instalada) ---------- */
  const HIST = (() => {
    const K = "n20h:max";
    let cur = 0, max = 0;
    const lerMax = () => { try { return +sessionStorage.getItem(K) || 0; } catch (e) { return 0; } };
    const gravarMax = () => { try { sessionStorage.setItem(K, String(max)); } catch (e) { /* sem armazenamento */ } };
    function pintar() {
      const b = document.getElementById("hist-back"), f = document.getElementById("hist-fwd");
      if (b) b.disabled = cur <= 0;
      if (f) f.disabled = cur >= max;
    }
    function marcar(i) { try { history.replaceState({ ...(history.state || {}), n20i: i }, "", location.href); } catch (e) { /* segue */ } }
    function iniciar() {
      const s = history.state;
      if (s && typeof s.n20i === "number") { cur = s.n20i; max = Math.max(lerMax(), cur); }
      else { cur = 0; max = 0; marcar(0); }
      gravarMax(); pintar();
      window.addEventListener("hashchange", () => {
        const st2 = history.state;
        if (st2 && typeof st2.n20i === "number") cur = st2.n20i;          /* recuou/avançou */
        else { cur = cur + 1; max = cur; marcar(cur); }                    /* página nova */
        gravarMax(); pintar();
      });
      window.addEventListener("popstate", () => { const st2 = history.state; if (st2 && typeof st2.n20i === "number") { cur = st2.n20i; pintar(); } });
      document.getElementById("hist-back")?.addEventListener("click", () => { if (cur > 0) history.back(); });
      document.getElementById("hist-fwd")?.addEventListener("click", () => { if (cur < max) history.forward(); });
    }
    return { iniciar };
  })();

  function route() {
    const h = decodeURIComponent(location.hash.slice(1)) || "inicio";
    GC.page(h);
    clearInterval(timerInt);
    ITEMS.clear();
    let view = h, scrollTo = null, anchor = null;
    if (["precos", "avaliacoes", "faq", "como-funciona", "comecar", "previsao"].includes(h)) { view = "inicio"; scrollTo = h; }
    if (view.includes("/")) { anchor = view.slice(view.indexOf("/") + 1); view = view.slice(0, view.indexOf("/")); }
    currentView = (view.startsWith("t-") || view.startsWith("m-")) ? "estudar" : view.startsWith("e-") ? "exames" : view;
    const navOf = { treino: "estudar", erros: "estudar", cabula: "estudar", simulado: "exames", desafio: "estudar", revisao: "estudar" };
    ttsStop();
    if (QZ && currentView !== QZ.kind) QZ = null;
    setNav(h === "precos" ? "precos" : (navOf[currentView] || currentView));
    if (view.startsWith("m-")) renderMateria(view.slice(2));
    else if (view.startsWith("t-")) renderTopic(view.slice(2));
    else if (view.startsWith("e-")) renderExam(view.slice(2));
    else ({ inicio: renderHome, estudar: renderStudy, exames: renderExams, provaveis: renderProvaveis, simulado: renderSim, duvidas: renderTutor, plano: renderPlano, treino: renderTreino, erros: renderErros, cabula: renderCabula, pais: renderPais, termos: renderTermos, conta: renderConta, desafio: renderDesafio, revisao: renderRevisao, parcerias: renderParcerias, "parcerias-admin": renderParcAdmin }[view] || renderHome)();
    enhance(app);
    renderPromo();
    if (anchor) {
      requestAnimationFrame(() => {
        const t = document.getElementById("q-" + anchor) || document.getElementById(anchor) || document.getElementById("gs-" + anchor.split("-").slice(0, -2).join("-"));
        if (t) { t.scrollIntoView({ block: "start" }); t.classList.add("flash"); setTimeout(() => t.classList.remove("flash"), 2200); }
        else window.scrollTo({ top: 0, behavior: "instant" });
      });
    } else if (scrollTo) requestAnimationFrame(() => { const t = document.getElementById(scrollTo); if (t) t.scrollIntoView(); });
    else window.scrollTo({ top: 0, behavior: "instant" });
  }

  /* ---------- Início ---------- */
  const groupColor = { I: "bg-violet", II: "bg-blue", III: "bg-coral" };

  function renderHome() {
    const free = TOPICS.filter((t) => t.free);
    const sample = TOPICS.find((t) => t.id === "funcoes-sintaticas").exercicios[1];
    const syms = [["«»", 8, 12, 2.2, 0], ["Aa", 46, 6, 1.6, -2], ["¶", 90, 20, 2.4, -4], ["?", 4, 70, 2.6, -1], ["§", 52, 86, 1.8, -5], ["!", 94, 72, 2.2, -3], ["“ ”", 70, 4, 1.8, -6]];
    const marq = TOPICS.map((t) => `<a href="#t-${t.id}"><span class="ti ${groupColor[t.grupo]}">${ic(GRUPOS[t.grupo].icon)}</span>${esc(t.titulo)}</a>`).join("");
    app.innerHTML = `
    <section class="hero">
      ${syms.map(([s, x, y, sz, d]) => `<span class="sym" aria-hidden="true" style="left:${x}%;top:${y}%;font-size:${sz}rem;animation-delay:${d}s">${s}</span>`).join("")}
      <div class="wrap">
        <div>
          <span class="pill"><span class="dot"></span>Exame Nacional de Português · Prova ${C.PROVA}</span>
          <h1>Não sabes por onde <span class="grad-text">começar</span>?<span class="l2">Aqui tens tudo organizado.</span>
            <svg class="squiggle" viewBox="0 0 420 18" preserveAspectRatio="none" aria-hidden="true"><path d="M4 12 C 60 2, 110 18, 170 9 S 290 2, 416 10"/></svg></h1>
          <p class="lead">Diz-nos quanto tempo tens e recebes um <b>plano de estudo dia a dia</b> até ao exame: resumos, ${nExercicios} exercícios com resolução, <b>${REAL.length} exames nacionais resolvidos</b>, simulados com tempo e um explicador para as dúvidas.</p>
          ${madeBy("hero-made")}
          <div class="row">
            <a class="btn btn-primary btn-shine" href="#plano">Cria o teu plano de estudo ${ic("arrow")}</a>
            <a class="btn btn-ghost" href="#provaveis"><span style="color:var(--coral)">${icFill("flame")}</span> Tópicos prováveis 2027</a>
          </div>
          <div class="facts">
            <span><span style="color:var(--violet)">${ic("book")}</span>${TOPICS.length} tópicos</span>
            <span><span style="color:var(--mint)">${ic("check")}</span>${nExercicios} exercícios</span>
            <span><span style="color:var(--coral)">${ic("file")}</span>${REAL.length} exames resolvidos</span>
            <span><span style="color:var(--pink)">${icFill("flame")}</span>Previsão 2027</span>
            <span><span style="color:var(--yellow-d)">${ic("timer")}</span>${SIMS.length} simulados com tempo</span>
            ${G ? `<span><span style="color:var(--mint)">${ic("shield")}</span>Garantia de ${G} dias</span>` : ""}
          </div>
        </div>
        <div class="stage" aria-hidden="true">
          <div class="orbit"><i>${ic("book")}</i><i>${ic("pen")}</i><i>${ic("trophy")}</i><i>${ic("star")}</i></div>
          <div class="blob"></div>
          ${lince()}
          <div class="fcard blue a"><span class="ic bg-yellow" style="color:#3a2a00">${icFill("bolt")}</span><div>+13 pontos<small>resposta certa</small></div></div>
          <div class="fcard b"><span class="ic bg-violet">${ic("sparkle")}</span><div>Explicador IA<small>tira dúvidas já</small></div></div>
          <div class="fcard c"><span class="ic bg-coral">${icFill("flame")}</span><div>Dias seguidos<small>não quebres a sequência</small></div></div>
        </div>
      </div>
    </section>

    <div class="marquee" aria-label="Tópicos"><div class="track">${marq}${marq.replace(/<a /g, '<a tabindex="-1" aria-hidden="true" ')}</div></div>

    <section class="section" id="comecar">
      <div class="wrap">
        <div class="section-head center rv"><span class="eyebrow">${ic("compass", 'width="18" height="18"')} Começa aqui</span>
          <h2>Nós organizamos. Tu só tens de seguir.</h2>
          <p>Quatro passos, pela ordem certa. Cada um leva-te diretamente ao que tens de fazer.</p></div>
        <div class="steps">
          ${[
            ["bg-violet", "target", "Percebe o exame", "3 grupos, 200 pontos e os tópicos de cada um.", "#estudar", "Ver os grupos"],
            ["bg-blue", "book", "Estuda por tópicos", `${TOPICS.length} tópicos com resumo, pontos-chave e exercícios.`, "#estudar", "Abrir os tópicos"],
            ["bg-coral", "file", "Treina com exames reais", `${REAL.length} exames (${anosTxt}) resolvidos item a item e o Exame Previsto 2027.`, "#exames", "Ver exames"],
            ["bg-yellow", "timer", "Faz o simulado", "120 minutos, como no dia, com nota no fim.", "#simulado", "Fazer simulado"]
          ].map(([c, i, t, d, href, cta], n) => `<a class="step rv" href="${href}"><span class="sn">${n + 1}</span><span class="tile ${c}">${ic(i)}</span><h3>${t}</h3><p>${d}</p><span class="go">${cta} ${ic("arrow")}</span></a>`).join("")}
        </div>
      </div>
    </section>

    ${previsaoTeaser()}

    <section class="section" style="padding:0 0 10px">
      <div class="wrap">${tempoHTML()}<a class="pais-band rv" href="#pais"><span class="tile bg-violet">${ic("shield")}</span><span><b>É pai ou mãe?</b><span>O exame de Português é o único obrigatório para todos. Veja como a Nota20 ajuda o seu filho a preparar-se.</span></span>${ic("arrow")}</a></div>
    </section>

    <section class="section alt" id="como-funciona">
      <div class="wrap">
        <div class="section-head center rv"><span class="eyebrow">${ic("sparkle", 'width="18" height="18"')} O que tens</span><h2>Tudo para chegares ao 20.</h2></div>
        <div class="grid grid-3 feats">
          ${[
            ["bg-violet", "book", "Resumos e pontos-chave", "Cada obra e cada conteúdo de gramática explicado de forma simples, com o essencial marcado."],
            ["bg-mint", "check", "Exercícios com resolução", "Acertas, ganhas XP. Erras, vês logo porquê. Respostas abertas com proposta de resolução."],
            ["bg-coral", "file", "Exames nacionais resolvidos", `${REAL.length} exames (${anosTxt}), item a item, cada item ligado à matéria que tens de rever.`],
            ["bg-pink", "flame", "Tópicos prováveis 2027", `O que saiu nas últimas ${H.provas.length} provas, o que falta sair e um Exame Previsto feito com isso.`],
            ["bg-yellow", "timer", "Simulado cronometrado", "120 minutos + 30 de tolerância e nota final com a regra dos 3 melhores opcionais."],
            ["bg-blue", "chat", "Explicador a qualquer hora", "Pergunta o que não percebeste e recebe uma explicação com exemplos, na hora."],
            ["bg-violet", "sparkle", "Correção das tuas respostas", "Escreve, carrega em «Corrigir com IA» e vê a cotação estimada e o que falta."],
            ["bg-yellow", "bolt", "Desafio do dia", "5 perguntas novas todos os dias, iguais para todos. Dois minutos para manter a matéria fresca e desafiar os amigos."],
            ["bg-mint", "layers", "Revisão inteligente", "Cada pergunta volta no dia certo, mesmo antes de a esqueceres. As que erras voltam mais cedo."]
          ].map(([c, i, t, d]) => `<div class="card feat rv"><div class="tile ${c}">${ic(i)}</div><h3>${t}</h3><p class="muted" style="font-weight:600">${d}</p></div>`).join("")}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap demo-wrap">
        <div class="rv">
          <div class="speech">Experimenta um item de gramática como os do exame. Cada resposta certa vale <span style="color:var(--yellow-d)">+10 XP</span>.</div>
          <div style="width:170px;margin:22px 0 0 10px">${lince()}</div>
        </div>
        <div class="rv">${(() => { reg("home-demo", sample, {}); return renderItem(sample, "home-demo", "1"); })()}
          <p class="muted" style="font-weight:600">Grátis: ${free.map((t) => `<a href="#t-${t.id}">${esc(t.titulo)}</a>`).join(" e ")} ${free.length === 1 ? "completo" : "completos"}, e ${LIM.exercicios} exercícios para experimentares.</p></div>
      </div>
    </section>

    <section class="section alt" id="avaliacoes">
      <div class="wrap">
        <div class="section-head rv"><span class="eyebrow">${icFill("star")} Avaliações</span><h2>O que dizem os alunos</h2></div>
        <div id="reviews-slot">${reviewsHTML()}</div>
      </div>
    </section>

    <section class="section" id="precos">
      <div class="wrap">
        <div class="section-head center rv"><span class="eyebrow">${ic("crown", 'width="18" height="18"')} Preços</span><h2>Um pagamento. Acesso até ao exame.</h2><p>Sem subscrição e sem renovação automática.</p>${madeBy("center")}</div>
        ${plansHTML()}
      </div>
    </section>

    <section class="section" data-lead-wrap ${leadsOn() || store.get("lead", false) ? "" : "hidden"}>
      <div class="wrap">
        <div class="lead-band rv">
          <div><span class="eyebrow">${ic("mail", 'width="18" height="18"')} Dicas por email</span><h2>Uma dica por semana até ao exame</h2>
            <p>O que estudar em cada fase, os erros que mais tiram pontos e os avisos importantes (calendário, critérios). No máximo um email por semana.</p></div>
          <div data-lead-slot="home">${leadHTML("home")}</div>
        </div>
      </div>
    </section>

    <section class="section alt" id="faq">
      <div class="wrap" style="max-width:840px">
        <div class="section-head center rv"><span class="eyebrow">${ic("chat", 'width="18" height="18"')} Perguntas frequentes</span><h2>Antes de começares</h2></div>
        ${FAQ.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("")}
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="cta-band rv">
          <div><h2>Não sabes por onde começar? Começa pelo passo 1.</h2><p>${nFree} tópicos grátis, sem criar conta.</p>
            <div class="row" style="margin-top:20px"><a class="btn btn-yellow btn-shine" href="#comecar">Começar pelo passo 1 ${ic("arrow")}</a></div></div>
          ${lince()}
        </div>
      </div>
    </section>`;
    restorePractice("home-demo");
  }

  function previsaoTeaser() {
    if (!H.previsao.length) return "";
    const full = unlocked();
    const top = H.previsao.slice(0, FREE_PREV + 2);
    return `<section class="section" id="previsao" style="padding-top:10px">
      <div class="wrap">
        <div class="prev-band rv">
          <div class="pb-text">
            <span class="pill hot-pill">${icFill("flame")} Novo · Previsão 2027</span>
            <h2>O que tem mais probabilidade de sair em 2027?</h2>
            <p>Analisámos as ${H.provas.length} provas de ${anosProvasTxt}: o que saiu, o que alterna e o que ainda não saiu. O resultado é uma lista de prioridades e um exame completo feito com esses temas.</p>
            <div class="row"><a class="btn btn-yellow btn-shine" href="#provaveis">Ver tópicos prováveis ${ic("arrow")}</a>
              ${PREV ? `<a class="btn btn-glass" href="#e-${PREV.id}">${full ? "" : ic("lock", 'width="18" height="18"')} Exame Previsto 2027</a>` : ""}</div>
            <p class="small" style="opacity:.85;margin:14px 0 0">Estimativa feita a partir das provas anteriores, não uma garantia.</p>
          </div>
          <ol class="pb-list">${top.map((p, i) => {
            const t = topicById(p.topico); if (!t) return "";
            const open = full || i < FREE_PREV;
            return open
              ? `<li><span class="rk">${i + 1}</span><a href="#t-${t.id}"><b>${esc(t.titulo)}</b><span class="nivel ${NIVEL[p.nivel][1]}">${NIVEL[p.nivel][0]}</span></a></li>`
              : `<li class="lk"><span class="rk">${i + 1}</span><a href="#provaveis"><b aria-hidden="true">Tópico do plano Completo</b><span class="nivel ${NIVEL[p.nivel][1]}">${NIVEL[p.nivel][0]}</span>${ic("lock", 'width="18" height="18"')}</a></li>`;
          }).join("")}
            <li class="more"><a href="#provaveis">+ ${H.previsao.length - top.length} tópicos ordenados por probabilidade ${ic("arrow")}</a></li></ol>
        </div>
      </div>
    </section>`;
  }

  const FAQ = [
    ["O que inclui o plano grátis?", `${nFree} tópicos completos, o início de todos os outros, ${LIM.exercicios} exercícios com correção, ${LIM.explicador} perguntas ao explicador, o Grupo I do exame de 2025 resolvido e os ${FREE_PREV} tópicos mais prováveis de 2027. Chega para veres como funciona; para estudares tudo até ao exame, há o plano Completo.`],
    ["Os tópicos prováveis vão mesmo sair?", `Ninguém sabe ao certo: o EduQA (que substituiu o IAVE) pode escolher qualquer conteúdo das Aprendizagens Essenciais. A previsão ordena os tópicos a partir do que saiu nas últimas ${H.provas.length} provas, para saberes por onde começar. Usa-a para definir prioridades, não para deixares matéria de fora.`],
    ...(CRIADOR ? [["Quem fez a Nota20?", "Um aluno do Instituto Superior Técnico (Universidade de Lisboa) que teve 19,5 no exame nacional de Português. A Nota20 junta num só sítio a preparação para o exame: plano, matéria, exames resolvidos e simulados."]] : []),
    ...(G ? [["E se eu não gostar?", `Tens ${G} dias de garantia: se a Nota20 não for para ti, devolvemos o dinheiro.`]] : []),
    ["O conteúdo serve para o exame de 2027?", "Segue as Aprendizagens Essenciais de Português do ensino secundário e o formato da prova 639 usado em 2025 e 2026. Quando o EduQA publicar a informação-prova de 2027, o conteúdo é revisto."],
    ["Os exames resolvidos são oficiais?", "Os enunciados e os critérios são oficiais (do IAVE até 2025 e do EduQA, que o substituiu, desde 2026) e tens ligação aos PDF. As resoluções e explicações são propostas da Nota20, feitas a partir dos critérios oficiais."],
    ["A correção com IA substitui um professor?", "Não. É uma estimativa útil para treinar e perceber o que falta, mas pode errar. Compara sempre com a proposta de resolução e, se puderes, mostra os teus textos ao teu professor."],
    ["Como funciona o plano de estudo?", "Escolhes os dias e o tempo que tens por dia. A Nota20 distribui os tópicos pela ordem dos mais prováveis, com treinos, textos do Grupo III, exames e simulados. Se falhares um dia, o plano reorganiza-se. Podes adicionar as sessões ao calendário do telemóvel."],
    ["Dá para usar como app no telemóvel?", "Sim. No Android, abre a Nota20 no Chrome e escolhe «Instalar app». No iPhone, abre no Safari, toca em Partilhar e depois em «Adicionar ao ecrã principal»."],
    ["Preciso de criar conta?", CONTA.on ? "Não, o plano grátis funciona sem conta e o progresso fica guardado neste navegador. Se criares conta (grátis, só com o email, sem palavra-passe), o progresso fica guardado e continuas em qualquer dispositivo. Para comprar o plano Completo, a conta é necessária: assim o acesso fica sempre contigo." : "Não. O teu progresso, o XP e os dias seguidos ficam guardados neste navegador. Se mudares de telemóvel ou apagares os dados do navegador, não passam contigo."],
    ["Como funciona o pagamento?", `Pagamento único de ${C.PRECO}, sem subscrição. O acesso dura até ${C.ACESSO_ATE}.`],
    ["Serve para Português Língua Não Materna?", "Não. A Nota20 está pensada para a prova 639 (Português, 12.º ano)."]
  ];

  function plansHTML() {
    const pay = C.PAYMENT_LINK
      ? `<a class="btn btn-primary btn-shine" href="${esc(payHref())}" rel="noopener" data-buy>Comprar por ${esc(C.PRECO)} ${ic("arrow")}</a>`
      : `<button class="btn btn-primary" type="button" disabled>Pagamentos disponíveis brevemente</button>`;
    return `<div class="plans">
      <div class="plan rv">
        <h3>Grátis</h3>
        <div class="price">0 €<small>para sempre</small></div>
        <ul>
          <li>${nFree} ${nFree === 1 ? "tópico completo" : "tópicos completos"}</li>
          <li>Início de todos os outros tópicos</li>
          <li>${LIM.exercicios} exercícios com correção</li>
          <li>${LIM.explicador} perguntas ao explicador</li>
          <li>Grupo I do exame de 2025 resolvido</li>
          <li>Os ${FREE_PREV} tópicos mais prováveis de 2027</li>
          <li>Plano de estudo personalizado</li>
          <li class="no">Exames completos, Exame Previsto 2027 e simulados</li>
        </ul>
        <a class="btn btn-ghost" href="#estudar">Começar grátis</a>
      </div>
      <div class="plan main rv">
        <span class="flag">Preço de lançamento até ${esc(C.PROMO_ATE)}</span>
        <h3>Completo</h3>
        <div class="price">${esc(C.PRECO)}<small>pagamento único · depois ${esc(C.PRECO_DEPOIS)}</small></div>
        ${porDia() ? `<p class="per-day">${icFill("bolt")} Menos de ${porDia()} por dia até ao exame</p>` : ""}
        ${promoOn() ? `<div class="cd-box">${ic("timer")}<span>O preço de lançamento acaba em <b data-cd>${cdText()}</b></span></div>` : ""}
        <ul>
          <li>Todos os ${TOPICS.length} tópicos e ${nExercicios} exercícios</li>
          <li>${REAL.length} exames nacionais (${anosTxt}) resolvidos item a item</li>
          <li>Exame Previsto 2027 e previsão completa dos tópicos</li>
          <li>${SIMS.length} simulados cronometrados com nota final</li>
          <li>Plano de estudo, treino sem limites e cábula completa</li>
          <li>Explicador e correção com IA, sem os limites do plano grátis</li>
          <li>Acesso até ${esc(C.ACESSO_ATE)}</li>
        </ul>
        ${pay}
        ${PARC.length && !parceiroAtivo() ? `<a class="tem-cod" href="#parcerias">${ic("star")}<span>Tens um código de parceiro? <b>Aplica-o aqui</b> e poupas ${esc(PARC_DESC || "no preço")}.</span></a>` : ""}
        <p class="small muted buy-terms">Pagamento único${C.IVA === "incluido" ? ", IVA incluído" : ""}. Ao comprar, aceitas os <a href="#termos">Termos e condições</a>.</p>
        ${G ? `<div class="guarantee">${ic("shield")}<span><b>Garantia de ${G} dias</b>Se não gostares, devolvemos o dinheiro.</span></div>` : ""}
        ${CONTA.on ? (CONTA.user ? "" : `<button class="btn btn-soft btn-sm" type="button" data-act="login" data-m="comprei">Já compraste? Entra com o teu email</button>`) : `<button class="btn btn-soft btn-sm" type="button" data-act="code">Já tenho um código de acesso</button>`}
      </div>
    </div>
    ${G ? `<div class="seal-band rv"><div class="seal"><svg viewBox="0 0 120 120" aria-hidden="true"><defs><path id="sealc" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0"/></defs><text><textPath href="#sealc" textLength="286" lengthAdjust="spacingAndGlyphs">GARANTIA · SEM RISCO · GARANTIA · SEM RISCO · </textPath></text></svg><b>${G}</b><span>dias</span></div>
      <div><h3>Experimenta sem risco</h3><p>Compra o plano Completo e usa à vontade. Se nos primeiros ${G} dias achares que não é para ti, devolvemos o teu dinheiro.</p></div></div>` : ""}
    <details class="cmp-det"><summary>Comparar os dois planos em detalhe ${ic("arrow")}</summary>${compareHTML()}</details>`;
  }
  function compareHTML() {
    const Y = `<span class="yes">${ic("check")}</span>`, N = `<span class="nope">${ic("x")}</span>`;
    const rows = [
      ["Tópicos com resumo completo", `${nFree} de ${TOPICS.length}`, `Todos (${TOPICS.length})`],
      ["Exercícios com correção", String(LIM.exercicios), `Todos (${nExercicios})`],
      ["Exames nacionais resolvidos", "Grupo I de 2025", `${REAL.length} exames completos`],
      ["Itens ligados à matéria a rever", Y, Y],
      ["Tópicos prováveis 2027", `Top ${FREE_PREV}`, `Todos (${H.previsao.length})`],
      ["Exame Previsto 2027", N, Y],
      ["Plano de estudo dia a dia", Y, Y],
      ["Desafio do dia e revisão inteligente", Y, Y],
      ["Os meus erros e nota prevista", Y, Y],
      ["Simulados cronometrados", N, String(SIMS.length)],
      ["Cábula para imprimir", "Tópicos grátis", "Completa"],
      ["Perguntas ao explicador", String(LIM.explicador), "Sem limite fixo"],
      ["Correção com IA", String(LIM.correcao), "Sem limite fixo"],
      ...(G ? [["Garantia de reembolso", "–", `${G} dias`]] : [])
    ];
    return `<div class="compare rv"><table><caption class="sr">Comparação entre o plano Grátis e o plano Completo</caption>
      <thead><tr><th scope="col"></th><th scope="col">Grátis</th><th scope="col" class="c">Completo</th></tr></thead>
      <tbody>${rows.map(([a, b, c]) => `<tr><th scope="row">${a}</th><td>${b}</td><td class="c">${c}</td></tr>`).join("")}</tbody></table></div>`;
  }

  /* ---------- Avaliações (reais) ---------- */
  const RV = { state: "loading", list: [], uid: null, canWrite: null, isOwner: false, db: null };
  const starStr = (n) => "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n);
  function reviewsHTML() {
    if (RV.state === "loading") return `<div class="empty"><span class="spin"></span> A carregar avaliações…</div>`;
    const list = RV.list.filter((r) => r && r.estrelas >= 1 && r.estrelas <= 5 && typeof r.texto === "string");
    let html = "";
    if (list.length) {
      const avg = list.reduce((a, r) => a + r.estrelas, 0) / list.length;
      html += `<div class="reviews-sum"><span style="font-family:var(--f-display);font-size:2.8rem;font-weight:700" class="num">${avg.toFixed(1).replace(".", ",")}</span><span class="stars" aria-label="${avg.toFixed(1)} em 5">${starStr(Math.round(avg))}</span><span class="muted" style="font-weight:700">${list.length} ${list.length === 1 ? "avaliação" : "avaliações"}</span></div>
        <div class="grid grid-3 mt">${list.slice(0, 12).map((r) => `<div class="card review"><span class="stars">${starStr(r.estrelas)}</span><p style="margin:0;font-weight:600">${esc(r.texto.slice(0, 500))}</p><span class="who small">${esc((r.nome || "Aluno").slice(0, 40))}</span>${RV.isOwner ? `<button class="btn btn-soft btn-sm" data-act="del-review" data-id="${esc(r.id)}" type="button">Apagar</button>` : ""}</div>`).join("")}</div>`;
    } else {
      html += `<div class="empty">${lince()}<span>Ainda não há avaliações. As primeiras aparecem aqui assim que os alunos as deixarem.</span></div>`;
    }
    const uidRV = RV.mode === "sb" ? (CONTA.user && CONTA.user.id) : RV.uid;
    if (RV.mode === "sb" && RV.state === "ready" && !uidRV) {
      html += `<p class="muted mt" style="font-weight:600">Usaste a Nota20? <button type="button" class="linklike" data-act="login" data-m="avaliar">Entra com o teu email</button> e deixa a tua avaliação. Só alunos com conta podem avaliar, para as avaliações serem reais.</p>`;
    } else if (RV.state === "ready" && uidRV && RV.canWrite !== false) {
      const mine = RV.list.find((r) => r.id === uidRV);
      html += `<form class="card form mt" id="review-form" style="max-width:640px">
        <h3>${mine ? "Editar a tua avaliação" : "Deixa a tua avaliação"}</h3>
        <fieldset style="border:0;padding:0;margin:0"><legend class="lbl">Nota</legend>
          <div class="star-input">${[5, 4, 3, 2, 1].map((n) => `<input type="radio" name="estrelas" id="st-${n}" value="${n}" ${mine && mine.estrelas === n ? "checked" : ""}><label for="st-${n}" title="${n} estrelas">★</label>`).join("")}</div></fieldset>
        <label class="lbl" for="rv-texto">Comentário</label>
        <textarea id="rv-texto" maxlength="500" rows="3" required placeholder="O que te ajudou mais?">${mine ? esc(mine.texto) : ""}</textarea>
        <label class="lbl" for="rv-nome">Nome a mostrar (opcional)</label>
        <input type="text" id="rv-nome" maxlength="40" placeholder="Ex.: Inês, 12.º ano" value="${mine ? esc(mine.nome || "") : ""}">
        <div class="row"><button class="btn btn-primary btn-sm" type="submit">Publicar</button><span class="small muted" id="rv-msg" aria-live="polite" style="font-weight:700"></span></div>
      </form>`;
    } else if (RV.state === "off" && (C.CONTACTO_EMAIL || C.CONTACTO_INSTAGRAM)) {
      html += `<p class="muted mt" style="font-weight:600">Usaste a Nota20? Conta-nos o que achaste: ${esc(C.CONTACTO_EMAIL)}${C.CONTACTO_EMAIL && C.CONTACTO_INSTAGRAM ? " · " : ""}${esc(C.CONTACTO_INSTAGRAM)}</p>`;
    }
    return html;
  }
  function refreshReviews() { const s = document.getElementById("reviews-slot"); if (s) s.innerHTML = reviewsHTML(); }
  const SB_REST = (q) => fetch(`${C.SUPABASE_URL}/rest/v1/${q}`, { headers: { apikey: C.SUPABASE_KEY } }).then((r) => { if (!r.ok) throw new Error("http " + r.status); return r.json(); });
  async function initReviews() {
    if (CONTA.on) {
      RV.mode = "sb";
      try {
        const rows = await SB_REST("avaliacoes?select=user_id,estrelas,texto,nome,criado_em&order=criado_em.desc&limit=100");
        RV.list = rows.map((r) => ({ id: r.user_id, estrelas: r.estrelas, texto: r.texto, nome: r.nome, at: Date.parse(r.criado_em) }));
        RV.state = "ready";
      } catch (e) { RV.state = "off"; }
      refreshReviews(); return;
    }
    if (!(window.claude && typeof window.claude.use === "function")) { RV.state = "off"; refreshReviews(); return; }
    const db = await window.claude.use("db").catch(() => null);
    if (!db) { RV.state = "off"; refreshReviews(); return; }
    RV.db = db;
    const user = await window.claude.use("user").catch(() => null);
    if (user) {
      try { RV.uid = await user.id(); } catch (e) { RV.uid = null; }
      try { RV.canWrite = await user.can("data.write"); } catch (e) { RV.canWrite = null; }
      try { RV.isOwner = !!(await user.isOwner()); } catch (e) { RV.isOwner = false; }
    }
    refreshLeads();
    const t = setTimeout(() => { if (RV.state === "loading") { RV.state = "off"; refreshReviews(); } }, 10000);
    db.collection("reviews").orderBy("at", "desc").limit(100).onSnapshot((snap) => {
      clearTimeout(t);
      RV.list = snap.docs.map((d) => Object.assign({ id: d.id }, d.data()));
      RV.state = "ready";
      if (!document.activeElement || !document.activeElement.closest("#review-form")) refreshReviews();
    }, () => { clearTimeout(t); RV.state = "off"; refreshReviews(); });
  }
  async function submitReview(form) {
    const msg = $("#rv-msg", form);
    const est = +((form.querySelector('input[name="estrelas"]:checked') || {}).value || 0);
    const texto = $("#rv-texto", form).value.trim().slice(0, 500);
    const nome = $("#rv-nome", form).value.trim().slice(0, 40);
    if (!est) { msg.textContent = "Escolhe uma nota de 1 a 5."; return; }
    if (texto.length < 3) { msg.textContent = "Escreve um comentário curto."; return; }
    msg.textContent = "A publicar…";
    if (RV.mode === "sb") {
      try {
        await CONTA.avaliar({ estrelas: est, texto, nome });
        const r = { id: CONTA.user.id, estrelas: est, texto, nome, at: Date.now() };
        RV.list = [r, ...RV.list.filter((x) => x.id !== r.id)];
        refreshReviews(); GC.event("avaliacao");
        const m2 = document.getElementById("rv-msg"); if (m2) m2.textContent = "Obrigado! A tua avaliação foi publicada.";
      } catch (e) { msg.textContent = "Não foi possível publicar agora. Tenta outra vez."; }
      return;
    }
    try { await RV.db.doc("reviews/" + RV.uid).set({ estrelas: est, texto, nome, at: Date.now() }); msg.textContent = "Obrigado! A tua avaliação foi publicada."; }
    catch (e) { RV.canWrite = false; msg.textContent = "Não foi possível publicar com esta conta."; }
  }

  /* ---------- Estudar ---------- */
  function dashHTML() {
    const lv = level(), pct = st.xp % 100, np = notaPrevista();
    return `<div class="dash rv">
      <div style="position:relative"><span class="eyebrow" style="color:#fff;opacity:.9">O teu painel</span><h2>Nível ${lv}</h2>
        ${diasExame() ? `<span class="cd-exam">${ic("timer")}<span>Faltam <b>${diasExame()}</b> dias para o exame${dataEstimada}</span></span>` : ""}</div>
      <div class="lvl"><div class="lab"><span>${st.xp} XP</span><span>${100 - pct} XP para o nível ${lv + 1}</span></div><div class="bar"><i style="width:${pct}%"></i></div></div>
      <div class="kpis">
        <div class="kpi" title="${np.ok ? `Estimativa com base em ${np.n} respostas de escolha${np.g3 ? " e nas correções do Grupo III" : ""}.` : "Precisas de mais respostas para a estimativa."}"><b>${np.ok ? v1(np.valores) : "—"}</b><span>${np.ok ? "nota prevista (estimativa)" : `nota prevista: faltam ${np.falta} respostas`}</span></div>
        <div class="kpi"><b>${streak()}</b><span>dias seguidos</span></div>
        <div class="kpi"><b>${st.studied.size}/${TOPICS.length}</b><span>tópicos estudados</span></div>
        <div class="kpi"><b>${Object.values(st.res).filter((r) => r.ok).length}</b><span>respostas certas</span></div>
      </div>
      <button class="btn btn-glass btn-sm dash-share" type="button" data-act="share-progress">${ic("chat")} Enviar o progresso aos pais</button>
    </div>`;
  }
  function hubHTML() {
    const ne = errosKeys().length, nr = srsDue().length;
    let hoje = "Cria o teu em 30 segundos";
    if (st.plano) { const P = planSchedule(st.plano); hoje = P.sessions[0] ? `${dkey(P.sessions[0].date) === dkey(new Date()) ? "Hoje" : "Próxima sessão"}: ${P.sessions[0].tasks.length} ${P.sessions[0].tasks.length === 1 ? "tarefa" : "tarefas"}` : "Plano concluído"; }
    return `<div class="hub">
      ${[["bg-blue", "compass", "Plano de estudo", hoje, "#plano"], ["bg-pink", "bolt", "Treino rápido", "10 perguntas ao acaso", "#treino"], ["bg-coral", "target", "Os meus erros", ne ? `${ne} por corrigir` : "Ainda sem erros", "#erros"], ["bg-violet", "layers", "Cábula", "Pontos-chave para imprimir", "#cabula"], ["bg-mint", "timer", "Simulados", `${SIMS.length} provas com tempo`, "#simulado"]]
        .map(([c, i, t, d, h, f]) => `<a class="hub-card rv ${f ? "hub-novo" : ""}" href="${h}"><span class="tile ${c}">${i === "bolt" ? icFill(i) : ic(i)}</span><span><b>${t}</b><span>${d}</span></span></a>`).join("")}
    </div>`;
  }
  function renderStudy() {
    const f = st.filter;
    const groups = ["I", "II", "III"].filter((g) => f === "todos" || f === g);
    app.innerHTML = `<div class="wrap" style="padding-bottom:60px">
      <div class="page-head"><span class="eyebrow">${ic("book", 'width="18" height="18"')} Estudar</span><h1>Todos os tópicos do exame</h1>
      <p>Organizados pelos grupos da prova ${C.PROVA}.</p></div>
      ${streakWarnHTML()}
      ${continuaHTML()}
      ${fracoHTML()}
      <div class="filters" role="group" aria-label="Filtrar por grupo">
        ${[["todos", "Todos"], ["I", "Grupo I · Literária"], ["II", "Grupo II · Gramática"], ["III", "Grupo III · Escrita"]].map(([v, t]) => `<button type="button" data-act="filter" data-v="${v}" aria-pressed="${f === v}">${t}</button>`).join("")}
      </div>
      ${groups.map((g) => {
        const ts = TOPICS.filter((t) => t.grupo === g);
        const done = ts.filter((t) => st.studied.has(t.id)).length;
        const pct = Math.round((done / ts.length) * 100);
        const inner = g === "I"
          ? ["10.º", "11.º", "12.º"].map((a) => `<span class="year-label">${a} ano</span><div class="grid grid-3">${ts.filter((t) => t.ano === a).map(topicCard).join("")}</div>`).join("")
          : `<div class="grid grid-3">${ts.map(topicCard).join("")}</div>`;
        return `<section class="group-block g-${g}">
          <div class="group-title"><div class="gt"><span class="gi">${ic(GRUPOS[g].icon)}</span><div><h2>${GRUPOS[g].nome}</h2><span class="muted" style="font-weight:700">${GRUPOS[g].desc}</span></div></div>
            <div class="ring" style="--p:${pct}" title="${done} de ${ts.length} estudados"><span>${pct}%</span></div></div>
          ${inner}</section>${g === "I" && f === "todos" ? upsellHTML("estudar") : ""}`;
      }).join("")}
      <h2 class="mais-h">O teu progresso e mais ferramentas</h2>
      ${dashHTML()}
      ${hubHTML()}
      ${badgesHTML()}
      <div data-meters class="mt">${meterHTML()}</div>
      ${conviteHTML()}
    </div>`;
  }
  function streakWarnHTML() {
    return streak() > 0 && !st.days.includes(today()) ? `<a class="streak-warn rv" href="#treino">${icFill("flame")}<span>Ainda não estudaste hoje. A tua sequência de ${streak()} ${streak() === 1 ? "dia" : "dias"} acaba à meia-noite. <b>Faz um treino de 5 minutos</b></span>${ic("arrow")}</a>` : "";
  }
  /* o próximo passo do aluno, no topo de Estudar */
  function continuaHTML() {
    const ord = (t) => { const i = prevIdx(t.id); return i < 0 ? 999 : i; };
    const abertos = TOPICS.filter(canOpen).slice().sort((a, b) => (unlocked() ? ord(a) - ord(b) : 0));
    const prox = abertos.find((t) => !st.studied.has(t.id));
    const nr = srsDue().length, feito = desFeito();
    let main;
    if (prox) main = `<a class="cont-main" href="#t-${prox.id}"><span class="lab">${st.studied.size ? "Continua aqui" : "Começa aqui"}</span><b>${esc(prox.titulo)}</b><span class="sub">${esc(prox.subtitulo)} · ${prox.exercicios.length} exercícios</span><span class="btn btn-yellow btn-sm">Estudar ${ic("arrow")}</span></a>`;
    else if (!unlocked()) main = `<a class="cont-main" href="#precos"><span class="lab">Já fizeste os tópicos grátis</span><b>Faltam-te ${TOPICS.length - abertos.length} tópicos</b><span class="sub">Desbloqueia tudo com o plano Completo: ${esc(C.PRECO)}, pagamento único.</span><span class="btn btn-yellow btn-sm">Ver plano Completo ${ic("arrow")}</span></a>`;
    else main = `<a class="cont-main" href="#treino"><span class="lab">Programa completo</span><b>Já estudaste todos os tópicos</b><span class="sub">Mantém a matéria fresca com um treino rápido.</span><span class="btn btn-yellow btn-sm">Treinar ${ic("arrow")}</span></a>`;
    return `<div class="cont rv">${main}
      <div class="cont-side">
        <a class="${feito ? "" : "novo"}" href="#desafio"><span class="tile bg-yellow">${icFill("bolt")}</span><span><b>Desafio do dia</b><span>${feito ? `Feito: ${desHoje().res.filter(Boolean).length}/${DES_N}` : "5 perguntas · 2 min"}</span></span></a>
        <a class="${nr ? "novo" : ""}" href="#revisao"><span class="tile bg-violet">${ic("layers")}</span><span><b>Revisão de hoje</b><span>${nr ? `${nr} para rever` : "Tudo em dia"}</span></span></a>
      </div></div>`;
  }
  /* convite à compra, nos sítios onde o aluno acabou de ver valor */
  function upsellHTML(onde) {
    if (unlocked() || !C.PAYMENT_LINK) return "";
    const nF = TOPICS.filter((t) => !canOpen(t)).length;
    const txt = {
      estudar: [`Desbloqueia os outros ${nF} tópicos`, `Todos os resumos, ${nExercicios} exercícios, ${REAL.length} exames resolvidos e os simulados.`],
      topico: ["Gostaste deste tópico?", `Os outros ${nF} têm o mesmo: resumo, pontos-chave, como sai no exame e exercícios resolvidos.`],
      desafio: ["Queres treinar mais do que 5 por dia?", `O plano Completo tem ${nExercicios} exercícios, treino sem limites e ${REAL.length} exames nacionais resolvidos.`],
      plano: ["O teu plano inclui tópicos do plano Completo", `Para o seguires até ao fim precisas de todos os ${TOPICS.length} tópicos, exames e simulados.`]
    }[onde];
    return `<div class="upsell rv"><span class="tile bg-yellow">${icFill("crown")}</span>
      <div><b>${txt[0]}</b><span>${txt[1]}</span><span class="up-p"><b>${esc(C.PRECO)}</b> · pagamento único${G ? ` · garantia de ${G} dias` : ""}</span></div>
      <a class="btn btn-primary btn-sm" href="#precos" data-up="${onde}">Ver plano Completo ${ic("arrow")}</a></div>`;
  }
  function topicCard(t) {
    const done = st.studied.has(t.id);
    return `<a class="topic-card g-${t.grupo} rv ${done ? "done" : ""}" href="#t-${t.id}">
      ${done ? `<span class="tick">${ic("check")}</span>` : ""}
      ${canOpen(t) ? "" : `<span class="lock" title="Plano Completo">${ic("lock", 'width="18" height="18"')}</span>`}
      <span class="ti">${ic(GRUPOS[t.grupo].icon)}</span>
      <span><h3>${esc(t.titulo)}</h3><span class="sub">${esc(t.subtitulo)}</span>
      <span class="meta">${hotChip(t)}${t.free ? '<span class="chip free">Grátis</span>' : (canOpen(t) ? "" : '<span class="chip pro">Pré-visualização</span>')}<span class="chip">${t.exercicios.length} exercícios</span></span>${domHTML(t)}</span>
      <span class="go" aria-hidden="true">${ic("arrow")}</span>
    </a>`;
  }

  function hotChip(t) {
    const i = prevIdx(t.id), p = H.previsao[i];
    if (!p || p.nivel < 2 || !(unlocked() || i < FREE_PREV)) return "";
    return `<span class="chip hot">${icFill("flame")} ${NIVEL[p.nivel][0]} em 2027</span>`;
  }
  function historicoHTML(t) {
    const provas = saiuEm(t.id);
    const itens = itensDoTopico(t.id);
    const i = prevIdx(t.id), p = H.previsao[i];
    if (!provas.length && !itens.length && !p) return "";
    const open = unlocked() || i < FREE_PREV;
    let h = `<div class="hist-box rv">`;
    if (p) h += open
      ? `<div class="hist-prev"><span class="nivel ${NIVEL[p.nivel][1]}">${icFill("flame")} ${NIVEL[p.nivel][0]} em 2027</span><span>${esc(p.motivo)}</span><a href="#provaveis">Ver previsão ${ic("arrow")}</a></div>`
      : `<div class="hist-prev lk"><span class="nivel n-lock">${ic("lock")} Probabilidade em 2027</span><span>A previsão para este tópico está no plano Completo.</span><button class="btn btn-ghost btn-sm" type="button" data-act="paywall" data-r="provaveis">Ver previsão</button></div>`;
    if (H.provas.length && t.id !== "leitura" && (G3[t.id] || t.grupo !== "III")) {
      h += `<p class="hist-sum"><b>${AUTOR[t.id] ? `${AUTOR[t.id]}: ` : ""}${provas.length === 0 ? `Ainda não saiu nas ${H.provas.length} provas` : `saiu em ${provas.length} de ${H.provas.length} provas`}</b> (${anosProvasTxt})</p>
        <div class="hist-years">${H.provas.map((pr) => { const on = provas.includes(pr); return `<span class="hy ${on ? "on" : ""}" title="${provaLabel(pr)}${on ? " · " + ondeSaiu(pr, t.id) + " · " + esc(pr.obras) : ""}"><b>${pr.ano}</b><small>${pr.fase}</small>${on ? `<i>${pr.lit && pr.lit[t.id] ? pr.lit[t.id] : ic("check")}</i>` : ""}</span>`; }).join("")}</div>`;
    }
    if (AUTOR[t.id] && provas.length) h += `<p class="small muted" style="font-weight:600;margin:10px 0 0">Nem sempre sai a obra estudada: ${provas.map((pr) => `<b>${pr.ano} ${pr.fase}</b> ${esc(pr.obras)}`).join(" · ")}.</p>`;
    if (itens.length) h += `<p class="hist-sum" style="margin-top:14px"><b>Itens resolvidos na Nota20 sobre este tópico</b></p>
      <ul class="hist-items">${itens.slice(0, 10).map(({ e, it, gi, key }) => `<li><a href="#e-${e.id}/${key}"><span class="hi-ex ${e.previsto ? "prev" : ""}">${e.previsto ? "Previsto 2027" : `${e.ano} · ${esc(e.fase)}`}</span><span>Grupo ${["I", "II", "III"][gi]} · item ${esc(it.n)}</span>${canOpen(e) || (e.free && gi === 0) ? "" : ic("lock", 'width="16" height="16"')}${ic("arrow")}</a></li>`).join("")}</ul>`;
    return h + `</div>`;
  }

  /* ---------- Página de tópico ---------- */

  /* ---------- matéria completa (estudo aprofundado de um tópico) ---------- */
  const MAT = (t) => (window.N20 && N20.materia && N20.materia[t.id]) || null;
  function renderMateria(id) {
    const t = TOPICS.find((x) => x.id === id);
    if (!t || !MAT(t)) return renderTopic(id);
    const g = GRUPOS[t.grupo], secs = MAT(t), full = canOpen(t);
    app.innerHTML = `<div class="wrap g-${t.grupo}" style="padding-bottom:60px">
      <div class="banner g-${t.grupo}"><span class="big-ico">${ic(g.icon)}</span>
        <span class="crumbs"><a href="#estudar">Estudar</a> / <a href="#t-${t.id}">${esc(t.titulo)}</a> / Matéria completa</span>
        <h1>${esc(t.titulo)}</h1><p>Matéria completa · ${secs.length} secções para estudar a fundo</p>
        <div class="toc"><a class="btn btn-glass btn-sm" href="#t-${t.id}">← Resumo e exercícios</a></div></div>
      <div class="mat-list">${secs.map((s, i) => {
        const aberto = full || i === 0;
        return `<details class="mat-sec rv" ${i === 0 ? "open" : ""}><summary><span class="n">${i + 1}</span><b>${esc(s.titulo)}</b>${aberto ? "" : ic("lock", 'width="16" height="16"')}</summary>
          <div class="prose-block">${aberto ? s.html : `<p class="muted">Esta secção faz parte do plano Completo.</p><button class="btn btn-primary btn-sm btn-shine" type="button" data-act="paywall" data-r="topico">Desbloquear</button>`}</div></details>`;
      }).join("")}</div>
      <div class="row mt" style="justify-content:space-between"><a class="btn btn-ghost btn-sm" href="#t-${t.id}">← Voltar ao tópico</a><a class="btn btn-primary btn-sm" href="#t-${t.id}" data-jump="exercicios">Fazer os exercícios →</a></div>
    </div>`;
    window.scrollTo(0, 0);
  }

  /* amostra grátis do resumo: só o 1.º parágrafo, no máximo ~60 palavras */
  function amostraResumo(html) {
    const p1 = (html.split("</p>")[0] || "") + "</p>";
    const txt = p1.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(), w = txt.split(" ");
    return w.length <= 60 ? p1 : `<p>${esc(w.slice(0, 55).join(" ").replace(/[,;:.]+$/, ""))}…</p>`;
  }
  function renderTopic(id) {
    const t = TOPICS.find((x) => x.id === id);
    if (!t) return renderStudy();
    const g = GRUPOS[t.grupo];
    const idx = TOPICS.indexOf(t), prev = TOPICS[idx - 1], next = TOPICS[idx + 1];
    const head = `<div class="banner g-${t.grupo}">
      <span class="big-ico">${ic(g.icon)}</span>
      <span class="crumbs"><a href="#estudar">Estudar</a> / ${g.nome} · ${g.desc}${t.ano ? " · " + t.ano + " ano" : ""}</span>
      <h1>${esc(t.titulo)}</h1><p>${esc(t.subtitulo)}</p>
      <div class="toc">${t.free ? '<span class="chip free">Grátis</span>' : ""}${hotChip(t)}<a href="#t-${t.id}" data-jump="resumo">Resumo</a><a href="#t-${t.id}" data-jump="pontos">Pontos-chave</a><a href="#t-${t.id}" data-jump="no-exame">No exame</a><a href="#t-${t.id}" data-jump="exercicios">${t.exercicios.length} exercícios</a></div>
      <div class="banner-btns">${MAT(t) ? `<a class="btn btn-yellow btn-sm mat-btn" href="#m-${t.id}">📚 Matéria completa</a>` : ""}${TTS_OK && canOpen(t) ? `<button class="btn btn-glass btn-sm tts-btn" type="button" data-act="tts" data-id="${t.id}">${ic("volume")}<span>Ouvir o resumo</span></button>` : ""}</div>
    </div>`;
    const full = canOpen(t);
    const done = st.studied.has(t.id);
    const lockCard = (txt) => `<div class="lock-card rv"><span class="lk">${ic("lock")}</span><div><b>${txt}</b><span>Continua no plano Completo${G ? ` · garantia de ${G} dias` : ""}.</span></div><button class="btn btn-primary btn-sm btn-shine" type="button" data-act="paywall" data-r="topico">Desbloquear</button></div>`;
    const resumo = full ? t.resumo : amostraResumo(t.resumo);
    const pontos = full ? t.pontos : t.pontos.slice(0, 1);
    const tipoTxt = { mc: "Escolha múltipla", multi: "Seleção", completar: "Completamento", aberta: "Resposta restrita", texto: "Resposta extensa" };
    app.innerHTML = `<div class="wrap g-${t.grupo}">${head}
      <div class="topic-layout">
        <div>
          <div class="block-title" id="resumo"><span class="n">1</span><h2>Resumo</h2></div>
          <div class="prose-block rv ${full ? "" : "fade-out"}">${resumo}</div>
          ${full ? "" : lockCard("Resumo completo, com todos os temas e exemplos")}
          <div class="block-title" id="pontos"><span class="n">2</span><h2>Pontos-chave</h2></div>
          <ul class="keypoints">${pontos.map((p) => `<li class="rv"><span class="ck">${ic("check")}</span><span>${p}</span></li>`).join("")}
            ${full ? "" : t.pontos.slice(pontos.length).map(() => `<li class="blurred" aria-hidden="true"><span class="ck">${ic("lock")}</span><span>Ponto-chave do plano Completo para memorizar antes do exame.</span></li>`).join("")}</ul>
          <div class="block-title" id="no-exame"><span class="n">3</span><h2>Como sai no exame</h2></div>
          <div class="exam-note rv"><span class="ic">${ic("target")}</span><span>${t.noExame}</span></div>
          ${historicoHTML(t)}
          <div class="block-title" id="exercicios"><span class="n">4</span><h2>Exercícios</h2></div>
          ${t.exercicios.map((ex, i) => {
            const k = `t-${t.id}-${i}`;
            if (!full && i > 0) return `<article class="q locked-q"><div class="q-head"><div class="q-num">${i + 1}</div><div class="q-body"><div class="q-meta"><span class="chip">${tipoTxt[ex.tipo] || ""}</span><span class="chip pro">${ic("lock")} Completo</span></div><p class="q-text">${esc(strip(ex.enunciado)).slice(0, 90)}…</p><button class="btn btn-ghost btn-sm" type="button" data-act="paywall" data-r="topico">Desbloquear este exercício</button></div></div></article>`;
            reg(k, ex, {}); return renderItem(ex, k, String(i + 1));
          }).join("")}
          <div class="row mt topic-nav" style="justify-content:space-between">
            ${prev ? `<a class="btn btn-ghost btn-sm" href="#t-${prev.id}">← ${esc(prev.titulo)}</a>` : "<span></span>"}
            ${next ? `<a class="btn btn-primary btn-sm" href="#t-${next.id}">${esc(next.titulo)} →</a>` : ""}
          </div>
        </div>
        <aside class="aside">
          <div data-meters>${meterHTML()}</div>
          ${full && t.free ? upsellHTML("topico") : ""}
          ${MAT(t) ? `<a class="card mat-card" href="#m-${t.id}"><span class="mi">📚</span><span><b>Matéria completa</b><span>Tudo sobre ${esc(t.titulo)}, organizado em ${MAT(t).length} secções.</span></span>${ic("arrow")}</a>` : ""}
          <div class="card">
            <h3>Já dominas este tópico?</h3>
            <p class="small muted" style="font-weight:600">Marca-o como estudado e ganha +20 XP.</p>
            <button type="button" class="btn ${done ? "btn-soft" : "btn-primary"} btn-sm" data-act="studied" data-id="${t.id}" aria-pressed="${done}">${done ? "✓ Estudado" : "Marcar como estudado"}</button>
          </div>
          <div class="card">
            <h3>Tens uma dúvida?</h3>
            <p class="small muted" style="font-weight:600">Pergunta ao explicador sobre ${esc(t.titulo)}.</p>
            <a class="btn btn-ghost btn-sm" href="#duvidas" data-act="ask-about" data-topic="${esc(t.titulo)}">${ic("chat")} Perguntar</a>
          </div>
          <div class="card">
            <h3>Rever no papel</h3>
            <p class="small muted" style="font-weight:600">Imprime ou guarda em PDF o resumo e os pontos-chave.</p>
            <button class="btn btn-soft btn-sm" type="button" data-act="print">${ic("print")} Imprimir resumo</button>
          </div>
        </aside>
      </div>
    </div>`;
    t.exercicios.forEach((_, i) => { if (full || i === 0) restorePractice(`t-${t.id}-${i}`); });
  }

  /* ---------- Exames ---------- */
  function examCard(e) {
    const lockd = !canOpen(e) && !e.free;
    return `<a class="card exam-card rv" href="#e-${e.id}">
      <span class="year">${e.ano}</span>
      ${lockd ? `<span class="lock">${ic("lock", 'width="18" height="18"')}</span>` : ""}
      <span class="eyebrow">${esc(e.fase)} · ${esc(e.versao)}</span>
      <h3 style="font-size:1.5rem">${esc(e.titulo)}</h3>
      <div class="temas">${e.temas.map((x) => `<span class="chip">${esc(x)}</span>`).join("")}</div>
      <span class="row" style="justify-content:space-between">${e.free ? `<span class="chip free">${unlocked() ? "Grátis" : "Grupo I grátis"}</span>` : '<span class="chip pro">Completo</span>'}<span class="btn btn-primary btn-sm">Ver resolução ${ic("arrow")}</span></span>
    </a>`;
  }
  function renderExams() {
    const nIt = (e) => e.grupos.reduce((b, g) => b + g.partes.reduce((c, p) => c + p.itens.length, 0), 0);
    app.innerHTML = `<div class="wrap" style="padding-bottom:60px">
      <div class="page-head"><span class="eyebrow">${ic("file", 'width="18" height="18"')} Exames</span><h1>Exames resolvidos</h1>
      <p>${REAL.length} exames nacionais (${anosTxt}) resolvidos item a item, cada item ligado à matéria que tens de rever, e um Exame Previsto para 2027.</p></div>
      ${PREV ? `<a class="prev-card rv" href="#e-${PREV.id}">
        <span class="flag">${icFill("flame")} Novo</span>
        ${unlocked() ? "" : `<span class="lock">${ic("lock", 'width="20" height="20"')}</span>`}
        <div class="pc-main">
          <span class="eyebrow" style="color:#fff;opacity:.92">Previsão Nota20 · formato oficial</span>
          <h2>${esc(PREV.titulo)}</h2>
          <p>Um exame original com os temas que as últimas ${H.provas.length} provas apontam como mais prováveis. ${nIt(PREV)} itens resolvidos e ligados à matéria.</p>
          <div class="temas">${PREV.temas.map((x) => `<span class="chip">${esc(x)}</span>`).join("")}</div>
          <span class="row"><span class="btn btn-yellow btn-sm">Fazer o Exame Previsto ${ic("arrow")}</span><span class="pc-why">Porque estes temas? Vê em Prováveis</span></span>
        </div>
        <div class="pc-art" aria-hidden="true"><b>2027</b>${lince()}</div>
      </a>` : ""}
      <div class="section-head" style="margin:34px 0 16px"><h2 style="font-size:1.7rem">Exames nacionais oficiais</h2></div>
      <div class="grid grid-2">
        ${REAL.map(examCard).join("")}
        <a class="card exam-card rv" href="#simulado" style="background:linear-gradient(135deg,#fff,#fff6d6)">
          <span class="year" style="color:#ffe9a6">200</span>
          ${unlocked() ? "" : `<span class="lock">${ic("lock", 'width="18" height="18"')}</span>`}
          <span class="eyebrow">Simulados · formato oficial</span>
          <h3 style="font-size:1.5rem">${SIMS.length} simulados Nota20</h3>
          <div class="temas"><span class="chip">Camões</span><span class="chip">Pessoa e heterónimos</span><span class="chip">Antero</span><span class="chip">Texto de opinião</span></div>
          <span class="row" style="justify-content:space-between"><span class="chip pro">${ic("timer")} Cronometrados</span><span class="btn btn-yellow btn-sm">Ver simulados ${ic("arrow")}</span></span>
        </a>
      </div>
      <a class="map-link rv" href="#provaveis"><span class="tile bg-pink">${icFill("flame")}</span><span><b>O que saiu em cada ano?</b><span>Vê o mapa das ${H.provas.length} provas de ${anosProvasTxt} e os tópicos mais prováveis de 2027.</span></span>${ic("arrow")}</a>
    </div>`;
  }
  function renderExam(id) {
    const e = EXAMS.find((x) => x.id === id);
    if (!e) return renderExams();
    const head = `<div class="banner ${e.previsto ? "g-I prev-banner" : "g-II"}">
      <span class="big-ico">${e.previsto ? icFill("flame") : ic("file")}</span>
      <span class="crumbs"><a href="#exames">Exames</a> / ${e.previsto ? "Previsão Nota20" : `${e.ano} · ${esc(e.fase)}`}</span>
      <h1>${esc(e.titulo)}</h1>
      <div class="toc"><span class="chip free">${esc(e.versao)}</span>${e.temas.map((x) => `<span class="tm">${esc(x)}</span>`).join("")}</div>
      ${e.links ? `<div class="links"><a class="btn btn-sm" href="${e.links.enunciado}" rel="noopener">Enunciado oficial (PDF)</a><a class="btn btn-sm" href="${e.links.criterios}" rel="noopener">Critérios oficiais (PDF)</a></div>` : ""}
      ${e.previsto ? `<div class="links"><a class="btn btn-sm" href="#provaveis">${icFill("flame")} Porque estes temas?</a></div>` : ""}
    </div><p class="notice">${esc(e.nota)}</p>`;
    if (!canOpen(e)) {
      const nIt = e.grupos.reduce((b, g) => b + g.partes.reduce((c, p) => c + p.itens.length, 0), 0);
      app.innerHTML = `<div class="wrap" style="padding-bottom:60px">${head}
        <div class="block-title" style="margin-top:28px"><span class="n">${ic("layers", 'width="20" height="20"')}</span><h2>O que tem este exame</h2></div>
        <div class="teaser-grid">${e.grupos.map((g, gi) => `<div class="card teaser g-${gk[gi]} rv"><h3><span class="gi">${ic(GRUPOS[gk[gi]].icon)}</span>${esc(g.nome)}</h3>
          <ul>${g.partes.flatMap((p) => p.itens).map((it) => { const t = it.topico && topicById(it.topico); return `<li><span class="q-n">${esc(it.n)}</span><span class="chip ${it.obrigatorio ? "req" : "t-opt"}">${it.obrigatorio ? "Obrig." : "Opc."}</span>${t ? `<a href="#t-${t.id}">${esc(t.titulo)}</a>` : `<span>${esc({ mc: "Escolha múltipla", multi: "Seleção", completar: "Completamento", aberta: "Resposta restrita", texto: "Texto" }[it.tipo] || "")}</span>`}${ic("lock", 'width="15" height="15"')}</li>`; }).join("")}</ul></div>`).join("")}</div>
        <div class="cta-band mt"><div><h2>${nIt} itens resolvidos no plano Completo</h2><p>Proposta de resolução, explicação de cada opção, o que os critérios valorizam e a ligação à matéria de cada item.</p>${priceLine()}<div class="row" style="margin-top:18px"><button class="btn btn-yellow btn-shine" type="button" data-act="paywall" data-r="${e.previsto ? "previsto" : "exame"}">Desbloquear · ${esc(C.PRECO)}</button>${G ? `<span style="font-weight:800;opacity:.92">${ic("shield", 'width="18" height="18" style="vertical-align:-3px"')} Garantia de ${G} dias</span>` : ""}</div></div>${lince()}</div></div>`;
      return;
    }
    const keys = [];
    app.innerHTML = `<div class="wrap" style="padding-bottom:60px">${head}
      ${e.grupos.map((g, gi) => (gi > 0 && !unlocked()) ? `<section class="group-sec g-${gk[gi]}" id="gs-${e.id}-${gi}"><h2><span class="gi">${ic(GRUPOS[gk[gi]].icon)}</span>${esc(g.nome)}</h2>
        <div class="lock-card"><span class="lk">${ic("lock")}</span><div><b>${g.partes.reduce((n, p) => n + p.itens.length, 0)} itens resolvidos e explicados</b><span>Continua no plano Completo${G ? ` · garantia de ${G} dias` : ""}.</span></div><button class="btn btn-primary btn-sm btn-shine" type="button" data-act="paywall" data-r="exame">Desbloquear</button></div></section>` : `<section class="group-sec g-${gk[gi]}" id="gs-${e.id}-${gi}"><h2><span class="gi">${ic(GRUPOS[gk[gi]].icon)}</span>${esc(g.nome)}</h2>
        ${g.partes.map((p, pi) => `<h3 class="part-title">${esc(p.nome)}</h3>
          ${p.intro ? `<p class="muted" style="font-weight:600">${esc(p.intro)}</p>` : ""}
          ${p.texto ? `<div class="textbox">${p.texto}</div>` : ""}
          ${p.itens.map((it, ii) => { const k = `${e.id}-${gi}-${pi}-${ii}`; keys.push(k); reg(k, it, { exam: true }); return renderItem(it, k, it.n, { exam: true }); }).join("")}`).join("")}
      </section>`).join("")}
    </div>`;
    keys.forEach(restorePractice);
  }

  /* ---------- Tópicos prováveis 2027 ---------- */
  function renderProvaveis() {
    const N = H.provas.length;
    const full = unlocked();
    const lit = TOPICS.filter((t) => t.grupo === "I");
    const gram = TOPICS.filter((t) => t.grupo === "II" && t.id !== "leitura");
    const esc3 = TOPICS.filter((t) => G3[t.id]);
    const cell = (pr, t) => {
      if (pr.lit && pr.lit[t.id]) return `<td class="on l"><span title="${provaLabel(pr)} · Parte ${pr.lit[t.id]} · ${esc(pr.obras)}">${pr.lit[t.id]}</span></td>`;
      if ((pr.gram || []).includes(t.id) || (G3[t.id] && pr.g3 === G3[t.id])) return `<td class="on"><span title="${provaLabel(pr)}">${ic("check")}</span></td>`;
      return `<td></td>`;
    };
    const row = (t) => { const n = saiuEm(t.id).length; return `<tr><th scope="row"><a href="#t-${t.id}">${AUTOR[t.id] ? `${AUTOR[t.id]} <small class="muted">(${esc(t.titulo)})</small>` : esc(t.titulo)}</a></th>${H.provas.map((pr) => cell(pr, t)).join("")}<td class="tot ${n === 0 ? "zero" : ""}">${n}/${N}</td></tr>`; };
    const sec = (titulo, ts) => `<tr class="sec"><th scope="rowgroup" colspan="${N + 2}">${titulo}</th></tr>${ts.map(row).join("")}`;
    const gramSorted = gram.map((t) => [t, saiuEm(t.id).length]).sort((a, b) => b[1] - a[1]);
    const op = H.provas.filter((p) => p.g3 === "texto de opinião").length, ap = H.provas.filter((p) => p.g3 === "apreciação crítica").length;
    const pessoa = H.provas.filter((p) => p.lit && (p.lit["heteronimos"] || p.lit["pessoa-ortonimo"] || p.lit["mensagem"])).length;
    const fs = saiuEm("funcoes-sintaticas").length;
    const cards = H.previsao.map((p, i) => {
      const t = topicById(p.topico); if (!t) return "";
      const [lab, cls] = NIVEL[p.nivel];
      if (!(full || i < FREE_PREV)) return `<div class="pred locked rv"><span class="rk">${i + 1}</span><div class="pb"><div class="pm"><span class="nivel ${cls}">${lab}</span><span class="chip">Grupo ${p.grupo}</span></div><h3 aria-hidden="true">Tópico do plano Completo</h3><p aria-hidden="true">O motivo e as provas em que saiu ficam visíveis no plano Completo.</p></div><button class="btn btn-ghost btn-sm" type="button" data-act="paywall" data-r="provaveis">${ic("lock")} Ver</button></div>`;
      const sa = saiuEm(t.id);
      return `<div class="pred rv g-${t.grupo}"><span class="rk">${i + 1}</span><div class="pb"><div class="pm"><span class="nivel ${cls}">${p.nivel === 3 ? icFill("flame") : ""}${lab}</span><span class="chip">Grupo ${p.grupo}</span>${t.id !== "leitura" ? `<span class="chip">${sa.length ? `Saiu em ${sa.length}/${N}` : "Nunca saiu"}</span>` : ""}</div>
        <h3><a href="#t-${t.id}">${esc(t.titulo)}</a></h3><p>${esc(p.motivo)}</p>
        <div class="row"><a class="btn btn-primary btn-sm" href="#t-${t.id}">Estudar ${ic("arrow")}</a>${itensDoTopico(t.id).length ? `<a class="btn btn-soft btn-sm" href="#t-${t.id}/no-exame">${itensDoTopico(t.id).length} itens de exame</a>` : ""}</div></div></div>`;
    }).join("");
    app.innerHTML = `<div class="wrap" style="padding-bottom:60px">
      <div class="page-head"><span class="eyebrow">${icFill("flame")} Previsão 2027</span><h1>Tópicos mais prováveis de sair em 2027</h1>
        <p>Analisámos as ${N} provas de ${anosProvasTxt} (1.ª fase de todos os anos e 2.ª fase de 2024, 2025 e 2026) e ordenámos a matéria pela probabilidade de sair. Começa pelo topo.</p></div>
      <p class="notice">${ic("shield", 'width="18" height="18" style="vertical-align:-4px"')} É uma estimativa feita a partir das provas anteriores, não uma garantia: o EduQA pode escolher qualquer conteúdo das Aprendizagens Essenciais. Usa-a para decidir por onde começar, não para deixares matéria de fora.</p>
      <div class="kpi-row">
        ${[["bg-blue", "type", `${fs}/${N}`, "provas com funções sintáticas"], ["bg-violet", "feather", `${pessoa}/${N}`, "provas com Fernando Pessoa"], ["bg-coral", "pen", `${op}/${N}`, "textos de opinião no Grupo III"], ["bg-yellow", "target", String(N), "provas analisadas"]]
          .map(([c, i, n, t]) => `<div class="stat rv"><div class="top-row"><span class="tile ${c}">${ic(i)}</span><b>${n}</b></div><span>${t}</span></div>`).join("")}
      </div>

      <div class="block-title" style="margin-top:34px"><span class="n">1</span><h2>A nossa aposta para 2027</h2></div>
      <div class="preds">${cards}</div>
      ${full ? "" : `<div class="lock-card rv" style="margin-top:16px"><span class="lk">${ic("lock")}</span><div><b>Mais ${H.previsao.length - FREE_PREV} tópicos ordenados, com o motivo de cada um</b><span>E o Exame Previsto 2027, com todos os itens resolvidos${G ? ` · garantia de ${G} dias` : ""}.</span></div><button class="btn btn-primary btn-sm btn-shine" type="button" data-act="paywall" data-r="provaveis">Desbloquear</button></div>`}

      ${PREV ? `<a class="prev-card rv" href="#e-${PREV.id}" style="margin-top:30px">
        <span class="flag">${icFill("flame")} Feito com esta previsão</span>
        ${full ? "" : `<span class="lock">${ic("lock", 'width="20" height="20"')}</span>`}
        <div class="pc-main"><span class="eyebrow" style="color:#fff;opacity:.92">Formato oficial · 200 pontos</span><h2>${esc(PREV.titulo)}</h2>
          <p>Treina já com os temas mais prováveis: ${PREV.temas.map(esc).join(", ")}.</p>
          <span class="row"><span class="btn btn-yellow btn-sm">Fazer o Exame Previsto ${ic("arrow")}</span></span></div>
        <div class="pc-art" aria-hidden="true"><b>2027</b>${lince()}</div></a>` : ""}

      <div class="block-title" style="margin-top:40px"><span class="n">2</span><h2>O que saiu em cada prova</h2></div>
      <p class="muted" style="font-weight:600;margin-top:-6px">No Grupo I, a letra indica a parte (A, B ou C). Toca num tópico para o estudar.</p>
      <p class="swipe-hint">Desliza a tabela para o lado →</p>
      <div class="heat rv"><table>
        <thead><tr><th scope="col">Tópico</th>${H.provas.map((pr) => `<th scope="col"><b>${pr.ano}</b><small>${pr.fase}</small></th>`).join("")}<th scope="col">Total</th></tr></thead>
        <tbody>${sec("Grupo I · Educação Literária", lit)}${sec("Grupo II · Gramática", gram)}${sec("Grupo III · Escrita", esc3)}</tbody>
      </table></div>
      <p class="small muted" style="font-weight:600">Obras de cada prova: ${H.provas.map((pr) => `<b>${pr.ano} ${pr.fase}</b> ${esc(pr.obras)}`).join(" · ")}.</p>

      <div class="grid grid-2" style="margin-top:30px">
        <div class="card rv"><h3 style="margin-bottom:14px">Gramática: o que mais sai</h3>
          <div class="bars">${gramSorted.map(([t, n]) => `<a class="bar-row" href="#t-${t.id}"><span>${esc(t.titulo)}</span><span class="bt"><i style="width:${Math.max(4, (n / N) * 100)}%"></i></span><b>${n}/${N}</b></a>`).join("")}</div></div>
        <div class="card rv"><h3 style="margin-bottom:14px">Grupo III: que texto vais escrever?</h3>
          <div class="g3">${esc3.map((t) => { const n = H.provas.filter((p) => p.g3 === G3[t.id]).length; return `<a href="#t-${t.id}"><b>${n}/${N}</b><span>${esc(t.titulo)}</span></a>`; }).join("")}</div>
          <p class="small muted" style="font-weight:600;margin:14px 0 0">Últimas provas: ${H.provas.slice(-4).map((p) => `${p.ano} ${p.fase} · ${esc(p.g3)}`).join(" → ")}. Treina os dois géneros.</p></div>
      </div>

      <div class="card rv" style="margin-top:22px"><h3>Como fizemos a previsão</h3>
        <ul class="how">
          <li><b>Frequência.</b> O que sai quase sempre (funções sintáticas, orações, Pessoa) sobe na lista.</li>
          <li><b>Alternância.</b> Obras que saíram há pouco tempo tendem a descansar; as que não saem há anos sobem.</li>
          <li><b>Lacunas.</b> Conteúdos do programa que ainda não saíram ficam como possíveis surpresas.</li>
        </ul>
        <p class="small muted" style="font-weight:600;margin:10px 0 0">Análise da Nota20 feita a partir dos enunciados oficiais. Atualizamos a previsão quando sair a informação-prova de 2027.</p></div>
    </div>`;
  }

  /* ============================================================
     ÍNDICE DE ITENS (erros, treino e nota prevista)
     ============================================================ */
  let IDX = null;
  const AUTO = ["mc", "multi", "completar"];
  function itemIndex() {
    if (IDX) return IDX;
    IDX = new Map();
    TOPICS.forEach((t) => t.exercicios.forEach((ex, i) => IDX.set(`t-${t.id}-${i}`, { item: ex, ctx: {}, grupo: t.grupo, label: t.titulo, href: `#t-${t.id}` })));
    EXAMS.forEach((e) => e.grupos.forEach((g, gi) => g.partes.forEach((p, pi) => p.itens.forEach((it, ii) => {
      const k = `${e.id}-${gi}-${pi}-${ii}`;
      IDX.set(k, { item: it, ctx: { exam: true }, grupo: ["I", "II", "III"][gi], label: `${e.titulo} · item ${it.n}`, href: `#e-${e.id}/${k}` });
    }))));
    return IDX;
  }
  const v1 = (x) => x.toFixed(1).replace(".", ",");

  /* ---------- nota prevista ---------- */
  function notaPrevista() {
    const idx = itemIndex();
    const a = { I: [0, 0], II: [0, 0] };
    Object.entries(st.res).forEach(([k, r]) => {
      const e = idx.get(k);
      if (!e || !r || typeof r.ok !== "boolean" || !a[e.grupo]) return;
      a[e.grupo][1] += 1; if (r.ok) a[e.grupo][0] += 1;
    });
    const n = a.I[1] + a.II[1];
    const sims = Object.values(st.simHist).sort((x, y) => y.at - x.at);
    const ultimoSim = sims.length ? sims[0].total : null;
    if (n < 12) return { ok: false, n, falta: 12 - n, ultimoSim };
    const all = (a.I[0] + a.II[0]) / n;
    const acc = (g) => (a[g][1] >= 4 ? a[g][0] / a[g][1] : all);
    const g3 = st.g3.length ? st.g3.reduce((x, y) => x + y, 0) / st.g3.length : null;
    const total = 156 * (acc("I") + acc("II")) / 2 + 44 * (g3 != null ? g3 : all * 0.9);
    return { ok: true, n, valores: Math.round(total) / 10, accI: acc("I"), accII: acc("II"), g3: g3 != null, ultimoSim };
  }

  /* ---------- Os meus erros ---------- */
  function errosKeys() {
    const idx = itemIndex();
    return Object.keys(st.res).filter((k) => st.res[k] && st.res[k].ok === false && idx.has(k));
  }
  function renderErros() {
    const idx = itemIndex();
    const keys = errosKeys();
    const f = st.errosFiltro || "todos";
    const shown = keys.filter((k) => f === "todos" || idx.get(k).grupo === f);
    shown.forEach((k) => wasWrong.add(k));
    app.innerHTML = `<div class="wrap" style="max-width:900px;padding-bottom:60px">
      <div class="page-head"><span class="eyebrow">${ic("target", 'width="18" height="18"')} Revisão</span><h1>Os meus erros</h1>
        <p>Todas as perguntas que erraste, num só sítio. Volta a responder: quando acertares, a pergunta sai da lista.</p></div>
      <div class="err-stats rv"><div><b id="err-n">${keys.length}</b><span>por corrigir</span></div><div><b id="err-fixed">${st.fixed}</b><span>já corrigidos</span></div>
        <a class="btn btn-ghost btn-sm" href="#treino" data-act="tr-erros">${icFill("bolt")} Treinar só os erros</a></div>
      ${keys.length ? `<div class="filters" role="group" aria-label="Filtrar por grupo">${[["todos", "Todos"], ["I", "Grupo I"], ["II", "Grupo II"], ["III", "Grupo III"]].map(([v, t]) => `<button type="button" data-act="err-filter" data-v="${v}" aria-pressed="${f === v}">${t}</button>`).join("")}</div>` : ""}
      ${shown.length ? shown.map((k, i) => { const e = idx.get(k); reg(k, e.item, e.ctx); return `<div class="err-src"><span class="chip">${esc(e.label)}</span><a href="${e.href}">Ver no contexto ${ic("arrow")}</a></div>${renderItem(e.item, k, String(i + 1), e.ctx)}`; }).join("")
        : `<div class="empty">${lince()}<span>${keys.length ? "Não tens erros neste grupo." : "Ainda não tens erros guardados. Responde a exercícios: os que errares aparecem aqui para os corrigires."}</span><a class="btn btn-primary btn-sm" href="#treino">Fazer um treino rápido</a></div>`}
    </div>`;
  }
  function updateErrosCount() {
    const a = document.getElementById("err-n"), b = document.getElementById("err-fixed");
    if (a) a.textContent = errosKeys().length;
    if (b) b.textContent = st.fixed;
  }

  /* ---------- Treino rápido ---------- */
  const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  function treinoPool(sel) {
    const idx = itemIndex();
    if (sel.foco === "erros") return errosKeys().filter((k) => AUTO.includes(idx.get(k).item.tipo) && (sel.grupo === "todos" || idx.get(k).grupo === sel.grupo));
    const out = [];
    TOPICS.forEach((t) => {
      if (sel.grupo !== "todos" && t.grupo !== sel.grupo) return;
      if (sel.foco === "provaveis") { const i = prevIdx(t.id); if (i < 0 || H.previsao[i].nivel < 2) return; }
      t.exercicios.forEach((ex, i) => { if (AUTO.includes(ex.tipo)) out.push(`t-${t.id}-${i}`); });
    });
    return out;
  }
  function renderTreino() {
    const sel = st.treinoSel || (st.treinoSel = { grupo: "todos", foco: "tudo", n: 10 });
    const T = st.treino, idx = itemIndex();
    const pick = (k, v, label) => `<button type="button" data-act="tr-sel" data-k="${k}" data-v="${v}" aria-pressed="${String(sel[k]) === String(v)}">${label}</button>`;
    let body;
    if (!T) {
      const pool = treinoPool(sel).length;
      body = `<div class="card tr-setup rv">
        <h3>Escolhe o teu treino</h3>
        <span class="lbl">Grupo</span><div class="filters">${pick("grupo", "todos", "Todos")}${pick("grupo", "I", "Grupo I")}${pick("grupo", "II", "Grupo II")}${pick("grupo", "III", "Grupo III")}</div>
        <span class="lbl">Foco</span><div class="filters">${pick("foco", "tudo", "Toda a matéria")}${pick("foco", "provaveis", "Prováveis 2027")}${pick("foco", "erros", "Só os meus erros")}</div>
        <span class="lbl">Número de perguntas</span><div class="filters">${pick("n", 5, "5")}${pick("n", 10, "10")}${pick("n", 20, "20")}</div>
        <p class="small muted" style="font-weight:700;margin:0">${pool} ${pool === 1 ? "pergunta disponível" : "perguntas disponíveis"} com esta escolha.</p>
        <button class="btn btn-primary" type="button" data-act="tr-start" ${pool ? "" : "disabled"}>${icFill("bolt")} Começar treino</button>
      </div>`;
    } else {
      body = `<div class="tr-bar" id="tr-bar"></div>` + T.keys.map((k, i) => { const e = idx.get(k); reg(k, e.item, {}); return `<div class="err-src"><span class="chip">${esc(e.label)}</span><a href="${e.href}">Rever a matéria ${ic("arrow")}</a></div>${renderItem(e.item, k, String(i + 1), {})}`; }).join("") +
        `<div id="tr-end"></div><div class="row" style="margin-top:14px"><button class="btn btn-soft btn-sm" type="button" data-act="tr-new">Mudar o treino</button></div>`;
    }
    app.innerHTML = `<div class="wrap" style="max-width:900px;padding-bottom:60px">
      <div class="page-head"><span class="eyebrow">${icFill("bolt")} Treino</span><h1>Treino rápido</h1><p>Perguntas ao acaso, corrigidas na hora, com ligação à matéria. Bastam 10 minutos por dia.</p></div>
      ${unlocked() ? "" : `<div data-meters>${meterHTML()}</div>`}
      ${body}</div>`;
    if (T) updateTreino();
  }
  function startTreino() {
    const keys = shuffle(treinoPool(st.treinoSel)).slice(0, st.treinoSel.n);
    keys.forEach((k) => { if (st.res[k] && st.res[k].ok === false) wasWrong.add(k); });
    st.treino = { keys, done: {}, at: Date.now() };
    renderTreino(); enhance(app); window.scrollTo({ top: 0, behavior: "instant" });
  }
  function updateTreino() {
    const T = st.treino; if (!T) return;
    const n = T.keys.length, d = Object.keys(T.done).length, ok = Object.values(T.done).filter(Boolean).length;
    const bar = document.getElementById("tr-bar");
    if (bar) bar.innerHTML = `<div class="lab"><span>${d}/${n} respondidas</span><span>${ok} ${ok === 1 ? "certa" : "certas"}</span></div><div class="bar"><i style="width:${(d / n) * 100}%"></i></div>`;
    const end = document.getElementById("tr-end");
    if (end && d === n && !end.innerHTML) {
      const pct = ok / n;
      end.innerHTML = `<div class="card tr-result"><span class="eyebrow">${icFill("trophy")} Fim do treino</span><h2>${ok}/${n} certas</h2>
        <p class="muted" style="font-weight:700;margin:0">${pct >= 0.8 ? "Excelente. Estás pronto para perguntas mais difíceis." : pct >= 0.5 ? "Bom treino. Revê os erros e repete amanhã." : "Ainda há matéria para rever. Abre os tópicos dos erros e tenta de novo."}</p>
        <div class="row"><button class="btn btn-primary btn-sm" type="button" data-act="tr-again">Nova ronda</button><a class="btn btn-ghost btn-sm" href="#erros">Rever os meus erros</a></div></div>`;
      const [x, y] = centerOf(end); addXP(15, "treino:" + T.at, x, y - 20); if (pct >= 0.8) confetti(x, y, 24);
    }
  }

  /* ---------- Plano de estudo ---------- */
  const DIAS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const DIAS_L = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
  const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  const fdata = (d) => `${DIAS_L[d.getDay()]}, ${d.getDate()} ${MESES[d.getMonth()]}`;
  const cap = (x) => x.charAt(0).toUpperCase() + x.slice(1);
  const dkey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const TIPO = { topico: "Estudo", treino: "Treino", escrita: "Escrita", exame: "Exame", simulado: "Simulado", revisao: "Revisão" };
  function planTasks(cfg) {
    const seen = new Set(), ordem = [];
    const push = (id) => { const t = topicById(id); if (t && !seen.has(id) && id !== "leitura" && id !== "correcao-linguistica") { seen.add(id); ordem.push(t); } };
    H.previsao.forEach((p) => push(p.topico));
    TOPICS.forEach((t) => push(t.id));
    if (cfg.fraco && cfg.fraco !== "nenhum") {
      const rank = new Map(ordem.map((t, i) => [t.id, i - (t.grupo === cfg.fraco ? 6 : 0)]));
      ordem.sort((a, b) => rank.get(a.id) - rank.get(b.id));
    }
    const exames = REAL.slice().sort((a, b) => (b.free ? 1 : 0) - (a.free ? 1 : 0));
    const exT = (e) => ({ id: "e:" + e.id, tipo: "exame", min: 120, titulo: `Resolver o ${e.titulo}`, sub: "Com tempo e depois corrigir", href: `#e-${e.id}`, lock: !canOpen(e) });
    const tasks = [];
    let w = 0;
    ordem.forEach((t, i) => {
      tasks.push({ id: "t:" + t.id, tipo: "topico", ref: t.id, min: t.grupo === "III" ? 40 : 35, titulo: `Estudar «${t.titulo}»`, sub: "Resumo, pontos-chave e exercícios", href: `#t-${t.id}`, lock: !canOpen(t) });
      if (i % 3 === 2) tasks.push({ id: "q:" + i, tipo: "treino", min: 15, titulo: "Treino rápido de 10 perguntas", sub: "E corrigir os erros", href: "#treino" });
      if (i % 5 === 4) { w += 1; const ap = w % 3 === 0; tasks.push({ id: "w:" + w, tipo: "escrita", min: 45, titulo: ap ? "Escrever uma apreciação crítica" : "Escrever um texto de opinião", sub: "200 a 350 palavras e comparar com o modelo", href: ap ? "#t-apreciacao-critica" : "#t-texto-opiniao", lock: !unlocked() }); }
      if (i % 4 === 3 && exames.length) tasks.push(exT(exames.shift()));
    });
    exames.forEach((e) => tasks.push(exT(e)));
    if (PREV) tasks.push({ id: "e:" + PREV.id, tipo: "exame", min: 120, titulo: "Resolver o Exame Previsto 2027", sub: "Os temas mais prováveis", href: `#e-${PREV.id}`, lock: !unlocked() });
    SIMS.forEach((sm) => tasks.push({ id: "s:" + sm.id, tipo: "simulado", ref: sm.id, min: 150, titulo: `Fazer o ${sm.titulo}`, sub: "120 minutos + 30 de tolerância", href: "#simulado", lock: !unlocked() }));
    tasks.push({ id: "r:final", tipo: "revisao", min: 45, titulo: "Revisão final com a cábula", sub: "Pontos-chave de todos os tópicos", href: "#cabula" });
    return tasks;
  }
  const taskDone = (t) => !!st.planDone[t.id] || (t.tipo === "topico" && st.studied.has(t.ref)) || (t.tipo === "simulado" && !!st.simHist[t.ref]);
  function planSchedule(cfg) {
    const tasks = planTasks(cfg), pending = tasks.filter((t) => !taskDone(t));
    const sessions = [];
    const d = new Date(); d.setHours(0, 0, 0, 0);
    let i = 0, guard = 0;
    while (i < pending.length && guard++ < 900) {
      if (cfg.dias.includes(d.getDay())) {
        const sess = { date: new Date(d), tasks: [] };
        let used = 0;
        while (i < pending.length) {
          const t = pending[i];
          if (sess.tasks.length && used + t.min > cfg.min) break;
          sess.tasks.push(t); used += t.min; i += 1;
          if (used >= cfg.min) break;
        }
        sessions.push(sess);
      }
      d.setDate(d.getDate() + 1);
    }
    const last = sessions.length ? sessions[sessions.length - 1].date : null;
    return { tasks, sessions, last, cabe: !exameDate || !last || last < exameDate };
  }
  function planFormHTML(c) {
    const dias = c ? c.dias : [1, 2, 3, 4, 5];
    return `<form id="plan-form" class="card plan-form rv">
      <h3>${c ? "Ajustar o plano" : "Cria o teu plano em 30 segundos"}</h3>
      <span class="lbl">Em que dias podes estudar?</span>
      <div class="days">${[1, 2, 3, 4, 5, 6, 0].map((d) => `<label class="day"><input type="checkbox" name="dias" value="${d}" ${dias.includes(d) ? "checked" : ""}><span>${DIAS[d]}</span></label>`).join("")}</div>
      <label class="lbl" for="pl-min">Quanto tempo por dia?</label>
      <select id="pl-min" name="min">${[20, 30, 45, 60, 90].map((m) => `<option value="${m}" ${(c ? c.min : 45) === m ? "selected" : ""}>${m} minutos</option>`).join("")}</select>
      <label class="lbl" for="pl-fraco">O que te custa mais?</label>
      <select id="pl-fraco" name="fraco">${[["nenhum", "Não sei / tudo igual"], ["I", "Grupo I · Educação Literária"], ["II", "Grupo II · Gramática"], ["III", "Grupo III · Escrita"]].map(([v, t]) => `<option value="${v}" ${(c ? c.fraco : "nenhum") === v ? "selected" : ""}>${t}</option>`).join("")}</select>
      <button class="btn btn-primary" type="submit">${c ? "Atualizar o plano" : "Criar o meu plano"} ${ic("arrow")}</button>
      <p class="small muted plan-msg" aria-live="polite" style="margin:0;font-weight:700"></p>
    </form>`;
  }
  const taskRow = (t, hoje) => `<li class="task ${taskDone(t) ? "done" : ""}">
      <button type="button" class="tk" data-act="plan-done" data-id="${esc(t.id)}" aria-pressed="${taskDone(t)}" aria-label="Marcar «${esc(t.titulo)}» como feito">${ic("check")}</button>
      <a href="${t.href}"><b>${esc(t.titulo)}</b><span>${esc(t.sub || "")} · ${t.min} min</span></a>
      ${t.lock ? `<span class="tl" title="Plano Completo">${ic("lock", 'width="16" height="16"')}</span>` : ""}<span class="tt ${t.tipo}">${TIPO[t.tipo]}</span>${hoje ? "" : ""}</li>`;
  function renderPlano() {
    const cfg = st.plano;
    const head = `<div class="page-head"><span class="eyebrow">${ic("compass", 'width="18" height="18"')} Plano de estudo</span><h1>O teu plano até ao exame</h1>
      <p>Dizes quanto tempo tens e a Nota20 organiza tudo: o que estudar em cada dia, pela ordem dos tópicos mais prováveis, com treinos, textos, exames e simulados nas alturas certas.</p></div>`;
    if (!cfg) {
      app.innerHTML = `<div class="wrap" style="padding-bottom:60px">${head}
        <div class="plan-intro">${planFormHTML(null)}
          <div class="card plan-why rv"><h3>Como funciona</h3><ul class="how">
            <li><b>Ordem certa:</b> começas pelos tópicos mais prováveis de 2027 e pelo grupo que te custa mais.</li>
            <li><b>Sessões à medida:</b> cada dia tem só o que cabe no tempo que escolheste.</li>
            <li><b>Adapta-se:</b> se falhares um dia, o plano reorganiza-se sozinho.</li>
            <li><b>Lembretes:</b> adicionas as sessões ao calendário do telemóvel.</li></ul>
            ${diasExame() ? `<p class="cd-line">${ic("timer")}<span>Faltam <b>${diasExame()}</b> dias para o exame${dataEstimada}. Com 30 minutos por dia útil, cada semana adiada são menos 2,5 horas de estudo.</span></p>` : ""}</div>
        </div></div>`;
      return;
    }
    const P = planSchedule(cfg);
    const total = P.tasks.length, feitas = P.tasks.filter(taskDone).length, pct = Math.round((feitas / total) * 100);
    const hojeK = dkey(new Date());
    const doneToday = P.tasks.filter((t) => st.planDone[t.id] === hojeK);
    const first = P.sessions[0];
    const isToday = first && dkey(first.date) === hojeK;
    const hojeTasks = doneToday.concat(isToday ? first.tasks : []);
    const rest = P.sessions.slice(isToday ? 1 : 0);
    const semana = (d) => { const x = new Date(d); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return dkey(x); };
    const weeks = [];
    rest.forEach((s) => { const k = semana(s.date); let w = weeks.find((x) => x.k === k); if (!w) { w = { k, start: new Date(k + "T12:00:00"), sess: [] }; weeks.push(w); } w.sess.push(s); });
    const thisW = semana(new Date());
    const nextW = semana(new Date(Date.now() + 7 * 864e5));
    const wLabel = (w) => w.k === thisW ? "Esta semana" : w.k === nextW ? "Próxima semana" : `Semana de ${w.start.getDate()} ${MESES[w.start.getMonth()]}`;
    const sessHTML = (s) => `<div class="sess"><div class="sd">${fdata(s.date)}</div><ul class="tasks">${s.tasks.map((t) => taskRow(t)).join("")}</ul></div>`;
    const weekHTML = (w, i) => `<div class="week"><h3>${wLabel(w, i)}</h3>${w.sess.map(sessHTML).join("")}</div>`;
    app.innerHTML = `<div class="wrap" style="padding-bottom:60px">${head}
      <div class="plan-top rv">
        <div class="plan-prog"><div class="ring" style="--p:${pct}"><span>${pct}%</span></div>
          <div><b>${feitas} de ${total} tarefas feitas</b>
            <span>${P.last ? `Ao teu ritmo, terminas a ${fdata(P.last)}.` : "Plano concluído. Agora é rever e treinar."}</span>
            ${diasExame() ? `<span>Faltam ${diasExame()} dias para o exame${dataEstimada}.</span>` : ""}</div></div>
        ${P.cabe ? "" : `<p class="plan-warn">${ic("timer")} Com este ritmo não terminas antes do exame. Aumenta o tempo por dia ou os dias de estudo.</p>`}
      </div>
      <div class="plan-layout">
        <div>
          <div class="card today rv"><span class="eyebrow">${ic("calendar", 'width="18" height="18"')} ${isToday || doneToday.length ? "Hoje" : "Próxima sessão"}</span>
            <h2>${cap(isToday || doneToday.length ? fdata(new Date()) : (first ? fdata(first.date) : "sem sessões"))}</h2>
            ${(isToday || doneToday.length ? hojeTasks : (first ? first.tasks : [])).length ? `<ul class="tasks">${(isToday || doneToday.length ? hojeTasks : first.tasks).map((t) => taskRow(t, true)).join("")}</ul>` : `<p class="muted" style="font-weight:700">Não há tarefas por fazer.</p>`}
            ${!isToday && !doneToday.length && first ? `<p class="small muted" style="font-weight:700;margin:10px 0 0">Hoje não é dia de estudo no teu plano. Se quiseres adiantar, começa já ou faz um <a href="#treino">treino rápido</a>.</p>` : ""}
          </div>
          ${weeks.slice(0, 2).map(weekHTML).join("")}
          ${weeks.length > 2 ? `<details class="all-weeks"><summary>Ver o plano completo (${weeks.length - 2} semanas)</summary>${weeks.slice(2).map((w, i) => weekHTML(w, i + 2)).join("")}</details>` : ""}
        </div>
        <aside class="aside">
          ${planFormHTML(cfg)}
          <div class="card rv"><h3>${ic("bell", 'width="20" height="20" style="vertical-align:-4px"')} Lembretes</h3>
            <p class="small muted" style="font-weight:600">Adiciona as tuas sessões ao calendário do telemóvel, com aviso 10 minutos antes.</p>
            <label class="lbl" for="pl-hora">A que horas?</label>
            <select id="pl-hora">${["07:30", "13:00", "15:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"].map((h) => `<option ${(cfg.hora || "18:00") === h ? "selected" : ""}>${h}</option>`).join("")}</select>
            <button class="btn btn-ghost btn-sm" type="button" data-act="ics" style="margin-top:10px">${ic("calendar")} Adicionar ao calendário</button>
            <p class="small muted" style="margin:8px 0 0">Funciona com o Google Calendar, o Calendário do iPhone e o Outlook.</p></div>
          <div class="card rv" data-lead-wrap ${leadsOn() || store.get("lead", false) ? "" : "hidden"}><h3>${ic("mail", 'width="20" height="20" style="vertical-align:-4px"')} Dicas por email</h3>
            <p class="small muted" style="font-weight:600">Uma dica por semana, até ao exame.</p><div data-lead-slot="plano">${leadHTML("plano")}</div></div>
          <div class="card rv"><h3>${ic("chat", 'width="20" height="20" style="vertical-align:-4px"')} Pais</h3>
            <p class="small muted" style="font-weight:600">Envia aos teus pais o que já fizeste, por WhatsApp.</p>
            <button class="btn btn-ghost btn-sm" type="button" data-act="share-progress">Enviar o progresso</button></div>
          ${installHTML()}
        </aside>
      </div>
    </div>`;
  }
  function downloadICS() {
    const cfg = st.plano; if (!cfg) return;
    const hora = ($("#pl-hora") || {}).value || cfg.hora || "18:00";
    cfg.hora = hora; store.set("plano", cfg);
    const [hh, mm] = hora.split(":").map(Number);
    const d = new Date(); d.setHours(hh, mm, 0, 0);
    let g = 0; while (!cfg.dias.includes(d.getDay()) && g++ < 8) d.setDate(d.getDate() + 1);
    const pad = (n) => String(n).padStart(2, "0");
    const loc = (x, end) => `${x.getFullYear()}${pad(x.getMonth() + 1)}${pad(x.getDate())}T${end ? "235900" : pad(x.getHours()) + pad(x.getMinutes()) + "00"}`;
    const utc = (x) => x.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const by = cfg.dias.map((x) => ["SU", "MO", "TU", "WE", "TH", "FR", "SA"][x]).join(",");
    const url = location.href.split("#")[0] + "#plano";
    const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Nota20//Plano de estudo//PT", "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
      "BEGIN:VEVENT", `UID:nota20-${Date.now()}@nota20`, `DTSTAMP:${utc(new Date())}`, `DTSTART:${loc(d)}`, `DURATION:PT${cfg.min}M`,
      `RRULE:FREQ=WEEKLY;BYDAY=${by}${exameDate ? ";UNTIL=" + loc(exameDate, true) : ""}`,
      "SUMMARY:Estudar Português (Nota20)", "DESCRIPTION:Abre a Nota20 e faz a sessão de hoje do teu plano.", `URL:${url}`,
      "BEGIN:VALARM", "TRIGGER:-PT10M", "ACTION:DISPLAY", "DESCRIPTION:Sessão de estudo de Português", "END:VALARM", "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    try {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
      a.download = "nota20-lembretes.ics"; document.body.appendChild(a); a.click();
      setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 2000);
      toast(`<span class="tl">${lince()}</span><div><b>Ficheiro de lembretes criado</b><span>Abre «nota20-lembretes.ics» para o adicionar ao teu calendário.</span></div>`, 6000);
    } catch (e) { toast(`<div><b>Não foi possível criar o ficheiro</b><span>Abre a Nota20 no navegador do telemóvel e tenta de novo.</span></div>`, 6000); }
  }

  /* ---------- Email e testadores ---------- */
  const leadsOn = () => !!(C.LEADS_ENDPOINT || CONTA.on || (RV.db && RV.uid && RV.canWrite !== false));
  function leadHTML(origem, tester) {
    if (store.get(tester ? "leadTester" : "lead", false)) return `<div class="lead-done">${ic("check")} ${tester ? "Já estás inscrito como testador. Obrigado!" : "Já estás inscrito. Obrigado!"}</div>`;
    if (!leadsOn()) return "";
    return `<form class="lead-form" data-origem="${origem}">
      <div class="lead-row"><label class="sr" for="lead-${origem}">Email</label><input type="email" id="lead-${origem}" name="email" required maxlength="120" placeholder="o.teu@email.com" autocomplete="email">
        <button class="btn btn-primary btn-sm" type="submit">${tester ? "Quero testar" : "Inscrever"}</button></div>
      ${tester ? `<input type="hidden" name="tester" value="1">` : ""}
      <label class="consent"><input type="checkbox" name="ok"><span>Aceito receber emails da Nota20 sobre a preparação para o exame e posso cancelar quando quiser. <button type="button" class="linklike" data-act="privacidade">Como tratamos os teus dados</button></span></label>
      <p class="small lead-msg" aria-live="polite"></p></form>`;
  }
  function refreshLeads() {
    $$("[data-lead-slot]").forEach((el) => { el.innerHTML = leadHTML(el.dataset.leadSlot, el.dataset.tester === "1"); });
    $$("[data-lead-wrap]").forEach((el) => { el.hidden = !(leadsOn() || store.get("lead", false)); });
  }
  async function submitLead(form) {
    const msg = $(".lead-msg", form);
    const email = form.email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { msg.textContent = "Confirma o email."; return; }
    if (!form.ok.checked) { msg.textContent = "Para te inscreveres, tens de aceitar receber os emails."; return; }
    const data = { email: email.slice(0, 120), origem: form.dataset.origem, tester: !!form.tester, at: Date.now() };
    msg.textContent = "A enviar…";
    try {
      if (C.LEADS_ENDPOINT) { const r = await fetch(C.LEADS_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }); if (!r.ok) throw new Error("http"); }
      else if (CONTA.on) await CONTA.lead(data);
      else if (RV.db && RV.uid) await RV.db.doc("leads/" + RV.uid).set(data);
      else throw new Error("sem destino");
      store.set(data.tester ? "leadTester" : "lead", true);
      GC.event(data.tester ? "email-testador" : "email-dicas");
      form.outerHTML = `<div class="lead-done">${ic("check")} ${data.tester ? "Inscrição recebida! Vamos contactar-te por email." : "Feito! A primeira dica chega ao teu email."}</div>`;
    } catch (e) { msg.textContent = "Não foi possível enviar agora. Tenta mais tarde."; }
  }
  function openPrivacy() {
    openModal(`<h3>Como tratamos os teus dados</h3>
      <p style="font-weight:600;margin:0">O teu progresso (respostas, XP, plano de estudo) fica guardado só neste navegador: não o recebemos.</p>
      <p style="font-weight:600;margin:0">Se deixares o email, usamo-lo apenas para te enviar dicas e avisos sobre o exame Não o partilhamos nem o vendemos.</p>
      <p style="font-weight:600;margin:0">Podes cancelar a qualquer momento e pedir que apaguemos o teu email${C.CONTACTO_EMAIL ? `: escreve para ${esc(C.CONTACTO_EMAIL)}` : ", respondendo a qualquer email nosso"}.</p>
      <a class="btn btn-ghost btn-sm" href="#termos/privacidade" data-act="modal-close">Ler a política completa</a>
      <button class="btn btn-soft btn-sm" type="button" data-act="modal-close">Fechar</button>`);
  }

  /* ---------- Tempo até ao exame ---------- */
  function diasUteis(a, b) { let n = 0; const d = new Date(a); d.setHours(0, 0, 0, 0); while (d < b) { const w = d.getDay(); if (w > 0 && w < 6) n += 1; d.setDate(d.getDate() + 1); } return n; }
  function tempoHTML() {
    if (!exameDate || exameDate <= new Date()) return "";
    const h = (n) => String(Math.round(n * 0.5 * 10) / 10).replace(".", ",");
    const hoje = diasUteis(new Date(), exameDate);
    const marco = new Date(exameDate.getFullYear(), 2, 1);
    const antesMarco = new Date() < marco;
    return `<div class="tempo rv">
      <div><span class="eyebrow">${ic("timer", 'width="18" height="18"')} O tempo que ainda tens</span>
        <h2>${antesMarco ? "Começar hoje ou em março faz diferença" : "Ainda dá, se começares hoje"}</h2>
        <p>Com 30 minutos por dia, de segunda a sexta, até ao exame${dataEstimada}. Cada semana adiada são menos 2,5 horas de estudo.</p>
        <a class="btn btn-primary" href="#plano">${ic("compass")} Criar o meu plano</a></div>
      <div class="tempo-cols">
        <div class="tc now"><b>${h(hoje)} h</b><span>se começares hoje</span></div>
        ${antesMarco ? `<div class="tc late"><b>${h(diasUteis(marco, exameDate))} h</b><span>se começares a 1 de março</span></div>` : ""}
      </div>
    </div>`;
  }


  /* ---------- Contactos e redes ---------- */
  const handle = (h) => String(h || "").replace(/^@/, "");
  function contactosHTML() {
    const bits = [];
    if (C.CONTACTO_EMAIL) bits.push(`<a href="mailto:${esc(C.CONTACTO_EMAIL)}">${esc(C.CONTACTO_EMAIL)}</a>`);
    if (C.CONTACTO_INSTAGRAM) bits.push(`<a href="https://www.instagram.com/${encodeURIComponent(handle(C.CONTACTO_INSTAGRAM))}/" target="_blank" rel="noopener">Instagram ${esc(C.CONTACTO_INSTAGRAM)}</a>`);
    if (C.CONTACTO_TIKTOK) bits.push(`<a href="https://www.tiktok.com/@${encodeURIComponent(handle(C.CONTACTO_TIKTOK))}" target="_blank" rel="noopener">TikTok ${esc(C.CONTACTO_TIKTOK)}</a>`);
    return bits.length ? `<p class="small foot-contact" style="margin:0">Contacto: ${bits.join(" · ")}</p>` : "";
  }

  /* ---------- Termos, privacidade e reclamações ---------- */
  const V = C.VENDEDOR || {};
  const vendedorOk = !!(V.NOME && V.NIF && (C.CONTACTO_EMAIL || V.TELEFONE));
  const LRE = "https://www.livroreclamacoes.pt/Inicio/";
  function renderTermos() {
    const falta = (x) => x ? esc(x) : `<span class="miss">por preencher</span>`;
    const iva = C.IVA === "incluido" ? "IVA incluído à taxa legal." : "Isento de IVA ao abrigo do artigo 53.º do Código do IVA.";
    app.innerHTML = `<div class="wrap legal" style="max-width:820px;padding-bottom:60px">
      <div class="page-head"><span class="eyebrow">${ic("shield", 'width="18" height="18"')} Informação legal</span><h1>Termos, privacidade e reclamações</h1>
        <p>Última atualização: ${esc(C.TERMOS_DATA || "")}.</p></div>
      ${!vendedorOk && C.MODO_DEMO ? `<div class="legal-warn">Antes de vender, preenche <b>VENDEDOR</b> e <b>CONTACTO_EMAIL</b> em <code>config.js</code>. Estes dados são obrigatórios.</div>` : ""}
      <section id="vendedor"><h2>1. Quem vende</h2>
        <ul><li>Nome: ${falta(V.NOME)}</li><li>NIF: ${falta(V.NIF)}</li><li>Morada: ${falta(V.MORADA)}</li><li>Email: ${falta(C.CONTACTO_EMAIL)}</li>${V.TELEFONE ? `<li>Telefone: ${esc(V.TELEFONE)}</li>` : ""}</ul></section>
      <section><h2>2. O que compras</h2>
        <p>O plano Completo da Nota20: acesso a todos os tópicos, exercícios, exames resolvidos, simulados, previsão de tópicos e ao explicador, para preparar o Exame Nacional de Português (prova ${esc(C.PROVA)}). O acesso dura ${esc(C.ACESSO_ATE)}.</p>
        <p>A Nota20 é um material de estudo. Não tem ligação ao EduQA (antigo IAVE), ao Ministério da Educação nem a nenhuma escola, e não garante nenhuma nota no exame.</p></section>
      <section><h2>3. Preço e pagamento</h2>
        <p>${esc(C.PRECO)}, pagamento único, sem subscrição e sem renovação automática. ${iva}</p>
        <p>Pagas por ${esc(C.METODOS_PAGAMENTO || "MB WAY ou cartão")}. O pagamento é processado pela Stripe: a Nota20 não recebe nem guarda os dados do teu cartão. Recebes a fatura por email.</p></section>
      <section><h2>4. Acesso</h2>
        <p>${CONTA.on ? "O acesso fica ativo na tua conta logo que o pagamento é confirmado. A Nota20 funciona no navegador do telemóvel ou do computador: entra com o mesmo email em qualquer dispositivo e o plano Completo e o progresso acompanham-te." : "O acesso fica ativo logo que o pagamento é confirmado. A Nota20 funciona no navegador do telemóvel ou do computador. O teu progresso fica guardado nesse dispositivo: se apagares os dados do navegador, o progresso perde-se. Para voltares a ativar o acesso, usa o código que recebes por email depois da compra."}</p></section>
      <section id="garantia"><h2>5. Garantia de reembolso e livre resolução</h2>
        <p>Tens ${G || 14} dias a contar da compra para pedir o reembolso total, sem teres de dar justificação, mesmo que já tenhas começado a usar a Nota20. Basta escreveres para ${falta(C.CONTACTO_EMAIL)}. Devolvemos o valor pelo mesmo meio de pagamento, no prazo máximo de 14 dias.</p></section>
      <section><h2>6. Utilização</h2>
        <p>O acesso é pessoal: não o partilhes nem revendas. Os resumos, exercícios, resoluções e simulados são da Nota20. Os enunciados e critérios oficiais dos exames pertencem ao EduQA (antigo IAVE) e são apresentados por ligação.</p>
        <p>As respostas do explicador são geradas automaticamente e podem ter erros: confirma sempre com os resumos ou com o teu professor. Não escrevas dados pessoais nas perguntas.</p></section>
      <section id="reclamacoes"><h2>7. Reclamações e litígios</h2>
        <p>Se alguma coisa correr mal, escreve primeiro para ${falta(C.CONTACTO_EMAIL)}: respondemos em até 15 dias úteis. Podes também usar o <a href="${LRE}" target="_blank" rel="noopener">Livro de Reclamações Eletrónico</a>.</p>
        <p>Em caso de litígio, podes recorrer a uma entidade de resolução alternativa de litígios de consumo: o <a href="https://www.cniacc.pt" target="_blank" rel="noopener">CNIACC – Centro Nacional de Informação e Arbitragem de Conflitos de Consumo</a>. Mais informações no <a href="https://www.consumidor.gov.pt" target="_blank" rel="noopener">Portal do Consumidor</a>. Aplica-se a lei portuguesa.</p></section>
      <section id="privacidade"><h2>8. Privacidade</h2>
        <p>Responsável pelo tratamento dos dados: ${falta(V.NOME)}${C.CONTACTO_EMAIL ? ` (${esc(C.CONTACTO_EMAIL)})` : ""}.</p>
        <ul>
          ${CONTA.on ? `<li><b>Conta</b> (opcional no plano grátis, necessária para comprar): guardamos o teu email, o plano que tens e o teu progresso de estudo (respostas, XP, plano de estudo), para os teres em qualquer dispositivo. Os dados ficam no Supabase, em servidores na União Europeia (Irlanda). Guardamo-los até apagares a conta, o que podes fazer a qualquer momento em «A minha conta».</li>
          <li><b>Progresso sem conta</b>: fica guardado só no teu navegador. Não o recebemos.</li>
          <li><b>Avaliações</b>: se deixares uma avaliação, a nota, o comentário e o nome que escolheres ficam visíveis no site. Podes editá-la, e ela é apagada se apagares a conta.</li>` : `<li><b>Progresso de estudo</b> (respostas, XP, plano): fica guardado só no teu navegador. Não o recebemos.</li>`}
          <li><b>Email para dicas</b>: só se o deixares, com o teu consentimento. Usamo-lo para te enviar dicas e avisos sobre o exame. Guardamo-lo até cancelares.</li>
          <li><b>Compra</b>: nome, email e dados do pagamento são tratados pela Stripe e por nós para ativar o acesso e emitir a fatura (obrigação legal). As faturas são guardadas durante o prazo legal.</li>
          <li><b>Perguntas ao explicador</b>: são enviadas a um fornecedor de inteligência artificial só para gerar a resposta.</li>
          ${C.GOATCOUNTER ? `<li><b>Estatísticas de visitas</b>: contamos as visitas e algumas ações (por exemplo, criar um plano) de forma anónima, com o GoatCounter. Não usamos cookies nem guardamos o teu IP.</li>` : ""}
        </ul>
        <p>Versão completa e atualizada: <a href="privacidade/">nota20app.pt/privacidade</a>. Se entrares com a Google, recebemos só o teu nome, email e fotografia de perfil.</p>
        <p>Não usamos cookies de publicidade nem de análise. Não vendemos nem partilhamos os teus dados para marketing. Podes pedir acesso, correção ou apagamento dos teus dados por email, e apresentar queixa à <a href="https://www.cnpd.pt" target="_blank" rel="noopener">CNPD</a>.</p></section>
    </div>`;
  }

  /* ---------- Para pais ---------- */
  const SITE = () => location.href.split("#")[0];
  function progressoTexto() {
    const np = notaPrevista();
    const linhas = [
      "O meu progresso na Nota20 (Exame Nacional de Português)",
      `- Dias seguidos a estudar: ${streak()}`,
      `- Tópicos estudados: ${st.studied.size} de ${TOPICS.length}`,
      `- Respostas certas: ${Object.values(st.res).filter((r) => r.ok).length}`
    ];
    if (np.ok) linhas.push(`- Nota prevista: ${String(np.valores).replace(".", ",")} valores (estimativa)`);
    if (st.plano) {
      const P = planSchedule(st.plano);
      const feitas = P.tasks.filter(taskDone).length;
      linhas.push(`- Plano de estudo: ${feitas} de ${P.tasks.length} tarefas feitas`);
      if (P.sessions[0]) linhas.push(`- Próxima sessão: ${P.sessions[0].date.toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "short" })}`);
    }
    const sims = Object.keys(st.simHist).length;
    if (sims) linhas.push(`- Simulados feitos: ${sims}`);
    if (diasExame()) linhas.push(`Faltam ${diasExame()} dias para o exame${dataEstimada}.`);
    return linhas.join("\n");
  }
  async function shareProgress() {
    GC.event("partilha-progresso");
    const txt = progressoTexto();
    if (navigator.share && !inFrame) { try { await navigator.share({ title: "O meu progresso na Nota20", text: txt }); return; } catch (e) { if (e && e.name === "AbortError") return; } }
    openModal(`<h3>Enviar o progresso aos pais</h3>
      <p class="small muted" style="font-weight:600;margin:0">Assim os teus pais veem o que já fizeste, sem terem de perguntar.</p>
      <pre class="share-pre">${esc(txt)}</pre>
      <div class="row"><a class="btn btn-primary btn-sm" href="https://wa.me/?text=${encodeURIComponent(txt)}" target="_blank" rel="noopener">${ic("chat")} Enviar por WhatsApp</a>
        <button class="btn btn-ghost btn-sm" type="button" data-act="copy-share">Copiar texto</button></div>
      <button class="btn btn-soft btn-sm" type="button" data-act="modal-close">Fechar</button>`);
  }
  function renderPais() {
    const msg = `Olá! Encontrei uma app para preparar o exame nacional de Português, com um plano de estudo dia a dia, exames resolvidos e simulados. Experimenta: ${SITE()}`;
    app.innerHTML = `<div class="wrap pais" style="padding-bottom:60px">
      <section class="pais-hero rv">
        <span class="eyebrow">${ic("shield", 'width="18" height="18"')} Para pais e encarregados de educação</span>
        <h1>O exame de Português é o único que <span class="hl-y">todos os alunos</span> fazem.</h1>
        <p>Conta para a média do secundário e, em muitos cursos do ensino superior, é prova de ingresso. A Nota20 organiza a preparação do seu filho, do primeiro dia até ao exame.</p>
        <div class="row"><a class="btn btn-primary btn-shine" href="https://wa.me/?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener">${ic("chat")} Enviar a Nota20 ao meu filho</a><a class="btn btn-ghost" href="#precos">Ver preços</a></div>
        ${madeBy()}
      </section>
      <div class="pais-facts">
        ${[["bg-coral", "target", "Obrigatório para todos", "É o único exame obrigatório para concluir o ensino secundário. Em 2026, mais de 81 mil alunos inscreveram-se."],
           ["bg-violet", "trophy", "Média de 11,4 em 2026", "A média nacional na 1.ª fase desceu de 12,6 para 11,4 valores. Não é um exame para fazer sem preparação."],
           ["bg-blue", "grad", "Conta para entrar na universidade", "Vale 25% da nota final da disciplina e, em muitos cursos, é uma das provas de ingresso."]]
          .map(([c, i, t, d]) => `<div class="card pais-fact rv"><span class="tile ${c}">${ic(i)}</span><h3>${t}</h3><p>${d}</p></div>`).join("")}
      </div>
      <p class="small muted" style="font-weight:600">Fontes: Júri Nacional de Exames (resultados da 1.ª fase de 2026) e Decreto-Lei n.º 62/2023.</p>

      <section class="section" style="padding:30px 0 10px">
        <div class="section-head rv"><h2>O que o seu filho tem na Nota20</h2><p>Tudo organizado pela ordem certa, para estudar um pouco todos os dias em vez de tudo na última semana.</p></div>
        <div class="grid grid-3">
          ${[["bg-blue", "compass", "Plano de estudo dia a dia", "Escolhe os dias e o tempo que tem; a app diz o que estudar em cada sessão até ao exame."],
             ["bg-mint", "check", `${nExercicios} exercícios com resolução`, "Corrigidos na hora, com a explicação de cada resposta."],
             ["bg-coral", "file", `${REAL.length} exames nacionais resolvidos`, "De 2020 a 2026, item a item, ligados à matéria que é preciso rever."],
             ["bg-yellow", "timer", `${SIMS.length} simulados com tempo`, "Provas completas de 120 minutos, com nota final como no dia do exame."],
             ["bg-violet", "target", "Os erros num só sítio", "Tudo o que errou fica guardado para voltar a treinar até acertar."],
             ["bg-pink", "chat", "Explicador a qualquer hora", "Para as dúvidas que surgem à noite, antes de um teste."]]
            .map(([c, i, t, d]) => `<div class="card feat rv"><div class="tile ${c}">${ic(i)}</div><h3>${t}</h3><p class="muted" style="font-weight:600">${d}</p></div>`).join("")}
        </div>
      </section>

      <section class="pais-split rv">
        <div><span class="eyebrow">${ic("chat", 'width="18" height="18"')} Acompanhe sem ter de perguntar</span>
          <h2>O seu filho envia-lhe o progresso com um toque</h2>
          <p>Na app há um botão «Enviar o progresso aos pais». Recebe por WhatsApp os dias seguidos de estudo, os tópicos já estudados, as respostas certas, a nota prevista e as tarefas do plano.</p></div>
        <pre class="share-pre sample">${esc("O meu progresso na Nota20 (Exame Nacional de Português)\n- Dias seguidos a estudar: 12\n- Tópicos estudados: 9 de " + TOPICS.length + "\n- Respostas certas: 146\n- Nota prevista: 14,6 valores (estimativa)\n- Plano de estudo: 18 de 60 tarefas feitas\n- Próxima sessão: quinta, 12 nov")}</pre>
      </section>
      <p class="small muted" style="font-weight:600;margin-top:-8px">Exemplo ilustrativo.</p>

      <section class="pais-price rv">
        <div><span class="eyebrow">${ic("crown", 'width="18" height="18"')} Quanto custa</span>
          <h2>Menos do que uma hora de explicação</h2>
          <p>Uma hora de explicação no secundário custa, em média, entre 15 € e 30 €. A Nota20 custa <b>${esc(C.PRECO)}</b>, num pagamento único, com acesso ${esc(C.ACESSO_ATE)}. Não substitui um bom professor, mas está disponível todos os dias.</p>
          ${G ? `<div class="guarantee">${ic("shield")}<span><b>Garantia de ${G} dias</b>Se não for útil para o seu filho, devolvemos o dinheiro.</span></div>` : ""}
          <div class="row" style="margin-top:14px"><a class="btn btn-primary" href="#precos">Ver o plano Completo</a><a class="btn btn-ghost" href="#plano">Experimentar grátis</a></div></div>
      </section>

      <section class="section" style="padding:30px 0 0">
        <div class="section-head rv"><h2>Perguntas dos pais</h2></div>
        ${[...(CRIADOR ? [["Quem fez a Nota20?", "Um aluno do Instituto Superior Técnico (Universidade de Lisboa) que teve 19,5 no exame nacional de Português."]] : []),
           ["Substitui um professor ou um explicador?", "Não. A Nota20 é um complemento: dá estrutura e treino diário. Se o seu filho tem explicações, ajuda-o a aproveitá-las melhor."],
           ["É preciso criar conta ou dar dados pessoais?", "Não. O progresso fica guardado no próprio telemóvel ou computador do aluno."],
           ["Funciona no telemóvel?", "Sim, e pode ser instalada como uma app no ecrã principal."],
           ["E se não resultar?", G ? `Tem ${G} dias de garantia: se não for útil, devolvemos o dinheiro.` : "Pode começar pelo plano grátis e decidir depois."],
           ["Serve para o exame de 2027?", "Segue o programa e o formato da prova 639 de 2025 e 2026, e é revista quando o EduQA publicar a informação-prova de 2027."]]
          .map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("")}
      </section>
      <div class="cta-band mt rv"><div><h2>Comece por enviar a Nota20 ao seu filho</h2><p>O plano grátis chega para ver se funciona para ele.</p>
        <div class="row" style="margin-top:18px"><a class="btn btn-yellow" href="https://wa.me/?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener">${ic("chat")} Enviar por WhatsApp</a></div></div>${lince()}</div>
    </div>`;
  }

  /* ---------- Cábula e impressão ---------- */
  function renderCabula() {
    app.innerHTML = `<div class="wrap cabula" style="padding-bottom:60px">
      <div class="page-head"><span class="eyebrow">${ic("layers", 'width="18" height="18"')} Revisão</span><h1>Cábula de revisão</h1>
        <p>Os pontos-chave de todos os tópicos, numa só página. Imprime ou guarda em PDF para rever nas últimas semanas.</p>
        <div class="row no-print"><button class="btn btn-primary" type="button" data-act="print">${ic("print")} Imprimir ou guardar PDF</button></div></div>
      ${unlocked() ? "" : `<div class="lock-card rv no-print"><span class="lk">${ic("lock")}</span><div><b>A cábula completa tem ${TOPICS.length} tópicos</b><span>No plano grátis vês os tópicos grátis${G ? ` · garantia de ${G} dias` : ""}.</span></div><button class="btn btn-primary btn-sm btn-shine" type="button" data-act="paywall" data-r="cabula">Desbloquear</button></div>`}
      ${["I", "II", "III"].map((g) => `<section class="cab-group"><h2>${GRUPOS[g].nome} · ${GRUPOS[g].desc}</h2><div class="cab-grid">${TOPICS.filter((t) => t.grupo === g).map((t) => canOpen(t)
        ? `<div class="cab-card g-${g}"><h3><a href="#t-${t.id}">${esc(t.titulo)}</a></h3><ul>${t.pontos.map((p) => `<li>${p}</li>`).join("")}</ul></div>`
        : `<div class="cab-card g-${g} locked no-print"><h3>${esc(t.titulo)}</h3><ul><li>${t.pontos[0] || ""}</li>${t.pontos.slice(1, 3).map(() => `<li class="blurred" aria-hidden="true">Ponto-chave do plano Completo.</li>`).join("")}</ul></div>`).join("")}</div></section>`).join("")}
    </div>`;
  }

  /* ---------- App instalável ---------- */
  let installEvt = null;
  const inFrame = (() => { try { return window.self !== window.top; } catch (e) { return true; } })();
  window.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); installEvt = e; $$("[data-install]").forEach((b) => { b.hidden = false; }); chipInstalar(); });
  const instalada = () => { try { return matchMedia("(display-mode: standalone)").matches || navigator.standalone === true; } catch (e) { return false; } };
  const ehIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  function chipInstalar() {
    const el = document.getElementById("inst-chip");
    if (!el) return;
    const mostrar = !inFrame && !instalada() && (installEvt || ehIOS());
    el.hidden = !mostrar;
    if (mostrar) el.innerHTML = `${ic("phone")}<span class="t">Instalar app</span>`;
  }
  window.addEventListener("appinstalled", () => { installEvt = null; GC.event("app-instalada"); chipInstalar(); $$("[data-install]").forEach((b) => { b.hidden = true; }); });
  function instalarTopo() {
    GC.event("instalar-clique");
    if (installEvt) { installEvt.prompt(); installEvt.userChoice.finally(() => { installEvt = null; chipInstalar(); }); return; }
    const ua = navigator.userAgent, naApp = /Instagram|FBAN|FBAV|TikTok|musical_ly|Bytedance|Line\/|GSA\//i.test(ua), chromeIOS = /CriOS/i.test(ua);
    openModal(`<h3>Instala a Nota20 no iPhone</h3>
      ${naApp ? `<p style="font-weight:700;margin:0">Estás a abrir o site dentro de outra app (Google, TikTok, Instagram…). Daqui não dá para instalar: copia o endereço <b>nota20app.pt</b> e abre-o no <b>Safari</b>.</p>` : ""}
      ${chromeIOS ? `<p style="font-weight:700;margin:0">No Chrome: carrega no ícone <b>Partilhar</b> ao lado do endereço, em cima, e escolhe <b>Adicionar ao ecrã principal</b>. Se não aparecer, abre no Safari.</p>` : ""}
      <ol class="inst-passos"><li>Abre este site no <b>Safari</b>.</li><li>Carrega em <b>Partilhar</b> (o quadrado com a seta para cima), em baixo.</li><li>Escolhe <b>Adicionar ao ecrã principal</b> e depois <b>Adicionar</b>.</li></ol>
      <p class="small muted" style="font-weight:600;margin:0">A Nota20 fica com o ícone do lince no ecrã principal e abre como uma app.</p>
      <button class="btn btn-soft btn-sm" type="button" data-act="modal-close">Percebi</button>`);
  }
  function installHTML() {
    return `<div class="card install rv"><h3>${ic("phone", 'width="20" height="20" style="vertical-align:-4px"')} Instala a app</h3>
      <p class="small muted" style="font-weight:600">Abre a Nota20 como uma app, a partir do ecrã principal do telemóvel.</p>
      <button class="btn btn-ghost btn-sm" type="button" data-act="install" data-install ${installEvt ? "" : "hidden"}>Instalar</button>
      <p class="small muted" style="margin:8px 0 0">No iPhone: botão Partilhar e depois «Adicionar ao ecrã principal».</p></div>`;
  }
  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol) && !inFrame) {
    window.addEventListener("load", () => { navigator.serviceWorker.register("sw.js").catch(() => {}); });
  }

  /* ---------- Simulado ---------- */
  function simItems() {
    const out = [];
    SIM.grupos.forEach((g, gi) => g.partes.forEach((p, pi) => p.itens.forEach((it, ii) => out.push({ key: `s-${gi}-${pi}-${ii}`, it, g, gi, p }))));
    return out;
  }
  function simAns(key) { return (st.sim && st.sim.answers && st.sim.answers[key]) || {}; }
  function setSimAns(key, patch) { st.sim.answers[key] = Object.assign({}, st.sim.answers[key], patch); saveSim(); }

  function renderSim() {
    if (!unlocked()) {
      app.innerHTML = `<div class="wrap" style="padding-bottom:60px"><div class="page-head"><span class="eyebrow">${ic("timer", 'width="18" height="18"')} Simulados</span><h1>${SIMS.length} simulados com tempo</h1><p>Provas originais no formato oficial: 120 minutos, 200 pontos e a regra dos 3 melhores opcionais.</p></div>
        <div class="grid grid-3" style="margin-bottom:22px">${SIMS.map((sm) => `<div class="card sim-card locked"><span class="lock">${ic("lock", 'width="18" height="18"')}</span><span class="eyebrow">Formato oficial</span><h3>${esc(sm.titulo)}</h3><p class="small muted" style="font-weight:600;margin:0">${esc(sm.descricao)}</p></div>`).join("")}</div>
        <div class="cta-band"><div><h2>Os simulados fazem parte do plano Completo</h2><p>Prova completa cronometrada, com nota automática nos itens de escolha e correção das respostas abertas.</p><div class="row" style="margin-top:18px"><a class="btn btn-yellow" href="#precos">Ver plano Completo · ${esc(C.PRECO)}</a>${G ? `<span style="font-weight:800;opacity:.92">${ic("shield", 'width="18" height="18" style="vertical-align:-3px"')} Garantia de ${G} dias</span>` : ""}</div></div>${lince()}</div></div>`;
      return;
    }
    if (!st.sim) return renderSimIntro();
    if (st.sim.submitted) return renderSimResults();
    renderSimRunning();
  }
  function renderSimIntro() {
    app.innerHTML = `<div class="wrap" style="padding-bottom:60px">
      <div class="page-head"><span class="eyebrow">${ic("timer", 'width="18" height="18"')} Simulados</span><h1>Escolhe um simulado</h1><p>Provas originais no formato oficial, com tempo, nota final e correção. Faz um por semana nas últimas semanas.</p></div>
      <div class="grid grid-3">${SIMS.map((sm) => { const h = st.simHist[sm.id]; return `<div class="card sim-card rv"><span class="eyebrow">${h ? `Feito · ${v1(h.total / 10)} valores` : "Por fazer"}</span><h3>${esc(sm.titulo)}</h3><p class="small muted" style="font-weight:600;margin:0">${esc(sm.descricao)}</p><button class="btn ${h ? "btn-ghost" : "btn-primary"} btn-sm" type="button" data-act="sim-start" data-id="${sm.id}">${ic("timer")} ${h ? "Repetir" : "Começar"}</button></div>`; }).join("")}</div>
      <div class="card rv mt">
        <h3 style="margin-bottom:14px">Como funciona</h3>
        <ul class="rules">
          <li><span class="n">1</span><span>Tens <b>120 minutos</b> e mais <b>30 de tolerância</b>, como no exame.</span></li>
          <li><span class="n">2</span><span>Os itens de escolha só são corrigidos quando entregares.</span></li>
          <li><span class="n">3</span><span>Nas respostas abertas vês a resolução e dás a tua cotação (ou pedes à IA).</span></li>
          <li><span class="n">4</span><span>Nota final com a regra oficial: 10 obrigatórios + os 3 melhores de 5 opcionais.</span></li>
          <li><span class="n">5</span><span>Ao entregar ganhas <b>+50 XP</b>.</span></li>
        </ul>
      </div>
    </div>`;
  }
  function fmt(ms) {
    const s = Math.max(0, Math.floor(ms / 1000));
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60;
    return (h ? h + ":" + String(m).padStart(2, "0") : String(m)) + ":" + String(x).padStart(2, "0");
  }
  const gk = ["I", "II", "III"];
  function renderSimRunning() {
    const items = simItems();
    let lastG = null, lastP = null;
    app.innerHTML = `<div class="wrap" style="max-width:880px;padding-bottom:60px">
      <div class="timer" id="timer"><span>Tempo restante</span><span class="t">${ic("timer")}<span id="timer-t">--:--</span></span></div>
      <div class="page-head" style="padding-top:6px"><h1 style="font-size:clamp(1.7rem,3.6vw,2.3rem)">${esc(SIM.titulo)}</h1></div>
      ${items.map(({ key, it, g, gi, p }) => {
        let pre = "";
        if (g !== lastG) { pre += `<section class="group-sec g-${gk[gi]}" style="margin-top:20px"><h2><span class="gi">${ic(GRUPOS[gk[gi]].icon)}</span>${esc(g.nome)}</h2></section>`; lastG = g; lastP = null; }
        if (p !== lastP) { pre += `<h3 class="part-title">${esc(p.nome)}</h3>${p.texto ? `<div class="textbox">${p.texto}</div>` : ""}`; lastP = p; }
        reg(key, it, { exam: true, mode: "exam" });
        return pre + renderItem(it, key, it.n, { exam: true, mode: "exam" });
      }).join("")}
      <div class="cta-band mt"><div><h2>Terminaste?</h2><p>Entrega a prova para veres a tua nota e as correções.</p><div class="row" style="margin-top:18px"><button class="btn btn-yellow" type="button" data-act="sim-submit">Entregar prova</button></div></div>${lince()}</div>
    </div>`;
    items.forEach(({ key, it }) => {
      const a = simAns(key), el = document.getElementById("q-" + key);
      if (!el) return;
      const mark = (sel) => { const b = $(sel, el); if (b) b.classList.add("sel"); };
      if (it.tipo === "mc" && a.sel != null) mark(`.opt[data-i="${a.sel}"]`);
      if (it.tipo === "multi" && a.sel) a.sel.forEach((i) => mark(`.opt[data-i="${i}"]`));
      if (it.tipo === "completar" && a.sel) Object.entries(a.sel).forEach(([s, i]) => mark(`.opt[data-s="${s}"][data-i="${i}"]`));
    });
    const tick = () => {
      const el = document.getElementById("timer-t"), box = document.getElementById("timer");
      if (!el) return clearInterval(timerInt);
      const elapsed = Date.now() - st.sim.startedAt, main = SIM.duracao * 60000, tol = SIM.tolerancia * 60000;
      if (elapsed < main) { el.textContent = fmt(main - elapsed); box.classList.remove("tol"); }
      else if (elapsed < main + tol) { el.textContent = "Tolerância " + fmt(main + tol - elapsed); box.classList.add("tol"); }
      else { el.textContent = "Tempo terminado"; box.classList.add("tol"); }
    };
    tick(); timerInt = setInterval(tick, 1000);
  }
  function autoScore(it, a) {
    const max = it.cotacao || 13;
    if (it.tipo === "mc") return a.sel === it.certa ? max : 0;
    if (it.tipo === "multi") return a.sel && sameSet(a.sel, it.certas) ? max : 0;
    if (it.tipo === "completar") return a.sel && it.sub.every((s, si) => a.sel[si] === s.certa) ? max : 0;
    return null;
  }
  function simTotal() {
    let obrig = 0; const opc = [];
    simItems().forEach(({ key, it }) => {
      let pts = autoScore(it, simAns(key));
      if (pts == null) pts = (st.sim.scores && st.sim.scores[key]) || 0;
      if (it.obrigatorio) obrig += pts; else opc.push(pts);
    });
    opc.sort((x, y) => y - x);
    const best3 = opc.slice(0, 3).reduce((s, v) => s + v, 0);
    return { obrig, best3, total: obrig + best3 };
  }
  const RING_C = 2 * Math.PI * 80;
  function ringHTML(total) {
    return `<div class="score-ring"><svg viewBox="0 0 190 190"><defs><linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2d6bff"/><stop offset="1" stop-color="#8a5cff"/></linearGradient></defs>
      <circle class="bgc" cx="95" cy="95" r="80"/><circle class="fgc" id="ring-fg" cx="95" cy="95" r="80" stroke-dasharray="${RING_C}" stroke-dashoffset="${RING_C * (1 - total / 200)}"/></svg>
      <div class="val"><div><b id="sim-total">${total}</b><span>/ 200 pontos</span></div></div></div>`;
  }
  function renderSimResults() {
    const items = simItems(), tot = simTotal();
    let lastG = null;
    app.innerHTML = `<div class="wrap" style="max-width:880px;padding-bottom:60px">
      <div class="result" id="result-card">
        ${ringHTML(tot.total)}
        <div><span class="eyebrow">${icFill("trophy")} Resultado do simulado</span><h2 style="margin:6px 0 8px" id="sim-grade">${(tot.total / 10).toFixed(1).replace(".", ",")} valores</h2>
          <p class="muted" id="sim-detail" style="font-weight:700">Obrigatórios: ${tot.obrig} · 3 melhores opcionais: ${tot.best3}</p>
          <p style="font-weight:600">Nas respostas abertas, lê a proposta de resolução e dá a tua cotação (ou usa a IA). A nota atualiza-se.</p>
          <div class="row"><button class="btn btn-ghost btn-sm" type="button" data-act="sim-reset">Repetir este simulado</button><button class="btn btn-soft btn-sm" type="button" data-act="sim-other">Escolher outro simulado</button></div></div>
      </div>
      ${items.map(({ key, it, g, gi }) => {
        let pre = "";
        if (g !== lastG) { pre = `<section class="group-sec g-${gk[gi]}"><h2><span class="gi">${ic(GRUPOS[gk[gi]].icon)}</span>${esc(g.nome)}</h2></section>`; lastG = g; }
        const a = simAns(key), auto = autoScore(it, a), max = it.cotacao || 13;
        let body = `<p class="q-text">${it.enunciado}</p>`;
        if (it.tipo === "mc") body += `<div class="opts">${it.opcoes.map((o, i) => `<div class="opt ${i === it.certa ? "right" : (i === a.sel ? "wrong" : "")}"><span class="l">${L[i]}</span><span>${o}</span></div>`).join("")}</div>`;
        if (it.tipo === "multi") body += `<div class="opts">${it.opcoes.map((o, i) => `<div class="opt ${it.certas.includes(i) ? "right" : ((a.sel || []).includes(i) ? "wrong" : "")}"><span class="l">${L[i]}</span><span>${o}</span></div>`).join("")}</div>`;
        if (it.tipo === "completar") body += it.sub.map((s, si) => `<p class="sub-q">${s.label}</p><div class="opts">${s.opcoes.map((o, i) => `<div class="opt ${i === s.certa ? "right" : (a.sel && a.sel[si] === i ? "wrong" : "")}"><span class="l">${i + 1}</span><span>${o}</span></div>`).join("")}</div>`).join("");
        if (auto != null) body += fbHTML(!!auto, `${auto}/${max} pontos`, it.explicacao);
        else {
          const sc = (st.sim.scores && st.sim.scores[key]) || 0;
          body += `<p class="eyebrow" style="margin-top:6px">A tua resposta</p><div class="textbox" style="white-space:pre-wrap;font-weight:600">${a.text ? esc(a.text) : '<span class="muted">Sem resposta.</span>'}</div>
            <div class="solution">${solutionHTML(it)}</div>
            <div class="score-row"><label for="sc-${key}">A tua cotação:</label><input type="range" id="sc-${key}" min="0" max="${max}" step="1" value="${sc}" data-act="sim-score" data-key="${key}"><span class="num" id="scv-${key}"><b>${sc}</b>/${max}</span>
            ${a.text ? `<button type="button" class="btn btn-primary btn-sm ai-only" data-act="sim-ai" data-key="${key}">${ic("sparkle")} Corrigir com IA</button>` : ""}</div><div class="ai-slot"></div>`;
        }
        return pre + `<article class="q" id="q-${key}"><div class="q-head"><div class="q-num">${esc(it.n)}</div><div class="q-body"><div class="q-meta">${chipsFor(it, { exam: true })}</div>${body}</div></div></article>`;
      }).join("")}
    </div>`;
  }
  function updateSimTotal() {
    const tot = simTotal();
    const a = document.getElementById("sim-total"), b = document.getElementById("sim-detail"), r = document.getElementById("ring-fg"), gd = document.getElementById("sim-grade");
    if (a) a.textContent = tot.total;
    if (gd) gd.textContent = (tot.total / 10).toFixed(1).replace(".", ",") + " valores";
    if (b) b.textContent = `Obrigatórios: ${tot.obrig} · 3 melhores opcionais: ${tot.best3}`;
    if (r) r.setAttribute("stroke-dashoffset", RING_C * (1 - tot.total / 200));
    saveSimHist();
  }
  function saveSimHist() {
    if (!st.sim || !st.sim.submitted) return;
    st.simHist[SIM.id] = { total: simTotal().total, at: st.sim.submittedAt || Date.now() };
    store.set("simHist", st.simHist);
  }
  async function simAI(key) {
    const it = simItems().find((x) => x.key === key).it;
    const el = document.getElementById("q-" + key), slot = $(".ai-slot", el);
    const answer = (simAns(key).text || "").trim(), n = wordCount(answer);
    const btn = $('[data-act="sim-ai"]', el);
    btn.disabled = true;
    slot.innerHTML = `<div class="fb info"><span class="typing"><i></i><i></i><i></i></span> A corrigir…</div>`;
    try {
      const r = await AI.json(it.tipo === "texto" ? promptTexto(it, answer, n) : promptAberta(it, answer));
      slot.innerHTML = aiResultHTML(r || {}, it, n);
      const pts = it.tipo === "texto" ? scoreTexto(r, n).total : clampN(r.pontos, 0, it.cotacao || 13);
      if (it.tipo === "texto") { st.g3 = st.g3.concat(pts / 44).slice(-5); store.set("g3", st.g3); }
      st.sim.scores = st.sim.scores || {}; st.sim.scores[key] = pts; saveSim();
      const range = document.getElementById("sc-" + key); if (range) range.value = pts;
      const v = document.getElementById("scv-" + key); if (v) v.innerHTML = `<b>${pts}</b>/${it.cotacao || 13}`;
      updateSimTotal();
    } catch (e) { slot.innerHTML = `<div class="fb info">Não foi possível corrigir agora. Dá a tua cotação com base na proposta de resolução.</div>`; }
    finally { btn.disabled = false; }
  }

  /* ---------- Explicador ---------- */
  const SUGESTOES = [
    ["bg-blue", "type", "Qual é a diferença entre complemento oblíquo e complemento indireto?"],
    ["bg-violet", "feather", "Explica-me o fingimento poético de Pessoa em poucas linhas."],
    ["bg-coral", "pen", "Como devo estruturar um texto de opinião para ter nota máxima?"],
    ["bg-mint", "book", "Que traços épicos e líricos distinguem Os Lusíadas da Mensagem?"],
    ["bg-yellow", "bulb", "Dá-me 3 exemplos de valor modal epistémico."],
    ["bg-pink", "layers", "Quais são os episódios mais importantes de Os Maias?"]
  ];
  let chatBusy = false;
  function renderTutor() {
    const ready = aiMode === "claude" || aiMode === "endpoint" || aiMode === "conta";
    const pending = aiMode === undefined;
    const msgs = st.chat;
    app.innerHTML = `<div class="wrap" style="max-width:860px;padding-bottom:30px">
      <div class="page-head"><span class="eyebrow">${ic("chat", 'width="18" height="18"')} Dúvidas</span><h1>Pergunta ao explicador</h1></div>
      <div class="tutor-head">${lince()}<div><h3 style="margin:0">Lince, o teu explicador</h3>
        <span class="${ready ? "on" : "muted"}" style="font-weight:700">${ready ? "Online · responde na hora" : (pending ? "A ligar…" : "Indisponível nesta versão")}</span>
        <p class="small muted" style="margin:4px 0 0;font-weight:600">Gramática, obras, escrita ou como responder a um item. Confirma sempre com os resumos.</p></div></div>
      ${pending ? `<div class="empty"><span class="typing"><i></i><i></i><i></i></span> A ligar o explicador…</div>` : ""}
      ${!pending && !ready ? `<div class="empty"><span>O explicador ainda não está ligado nesta versão. Enquanto isso, encontras as respostas mais pedidas nos <a href="#estudar">tópicos</a>.</span></div>` : ""}
      ${ready ? `<div class="chat">
        <div class="suggest" ${msgs.length ? "hidden" : ""}>${SUGESTOES.map(([c, i, s]) => `<button type="button" data-act="suggest" data-q="${esc(s)}"><span class="ti ${c}">${ic(i)}</span><span>${esc(s)}</span></button>`).join("")}</div>
        <div class="msgs" id="msgs">${msgs.map((m) => `<div class="msg ${m.role === "user" ? "me" : "bot"}">${m.role === "user" ? esc(m.content) : md(m.content)}</div>`).join("")}</div>
        <form class="composer" id="composer"><label class="sr" for="ask">A tua pergunta</label>
          <textarea id="ask" rows="1" placeholder="Escreve a tua dúvida…" required></textarea>
          <button class="btn btn-primary btn-sm" type="submit">Enviar ${ic("arrow")}</button></form>
        ${msgs.length ? `<button class="btn btn-soft btn-sm" type="button" data-act="chat-clear" style="justify-self:start">Nova conversa</button>` : ""}
      </div>` : ""}
    </div>`;
    const pre = ssGet("n20:ask");
    if (pre && ready) { $("#ask").value = pre; ssSet("n20:ask", ""); $("#ask").focus(); }
  }
  function ssGet(k) { try { return sessionStorage.getItem(k) || ""; } catch (e) { return ""; } }
  function ssSet(k, v) { try { sessionStorage.setItem(k, v); } catch (e) { /* nada */ } }
  async function sendChat(text) {
    if (chatBusy || !text.trim()) return;
    if (!canUse("explicador")) { openPaywall("explicador"); return; }
    if (precisaLoginIA(() => sendChat(text))) return;
    chatBusy = true;
    st.chat.push({ role: "user", content: text.trim() });
    renderTutor();
    const box = $("#msgs");
    const bubble = document.createElement("div");
    bubble.className = "msg bot";
    bubble.innerHTML = '<span class="typing"><i></i><i></i><i></i></span>';
    box.appendChild(bubble);
    bubble.scrollIntoView({ block: "end", behavior: "smooth" });
    try {
      const full = await AI.conversar(st.chat.slice(-12), { onText: ({ text: t }) => { bubble.innerHTML = md(t); } });
      st.chat.push({ role: "assistant", content: full });
      consume("explicador");
      addXP(2, null);
    } catch (e) {
      st.chat.push({ role: "assistant", content: erroIA(e, "explicador") || "Não consegui responder agora. Tenta de novo." });
    }
    store.set("chat", st.chat.slice(-40));
    chatBusy = false;
    renderTutor();
    const last = $("#msgs .msg:last-child"); if (last) last.scrollIntoView({ block: "end" });
  }

  /* ---------- modal ---------- */
  function openModal(html) {
    modalRoot.innerHTML = `<div class="modal-bg" data-act="modal-close-bg"><div class="modal" role="dialog" aria-modal="true">${html}</div></div>`;
    const f = $("input, button", modalRoot); if (f) f.focus();
  }
  function closeModal() { modalRoot.innerHTML = ""; }
  async function sha256(t) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t));
    return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  /* ============================================================
     REVISÃO INTELIGENTE, DESAFIO DO DIA, DOMÍNIO, CONQUISTAS,
     PESQUISA, OUVIR O RESUMO E TEMA ESCURO
     ============================================================ */
  const addDias = (iso, n) => { const d = new Date(iso + "T12:00:00Z"); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
  const dataCurta = (iso) => { const d = new Date(iso + "T12:00:00Z"); return `${d.getUTCDate()} ${MESES[d.getUTCMonth()]}`; };

  /* ---------- revisão espaçada: cada pergunta volta ao fim de 1, 3, 7, 14, 30 e 60 dias ---------- */
  const SRS_INT = [1, 3, 7, 14, 30, 60];
  st.srs = store.get("srs", null);
  if (!st.srs) {
    /* quem já tinha respostas: os erros ficam para hoje, as certas para daqui a 3 dias */
    st.srs = {};
    const idx0 = itemIndex();
    Object.entries(st.res).forEach(([k, r]) => { const e = idx0.get(k); if (e && r && typeof r.ok === "boolean" && AUTO.includes(e.item.tipo)) st.srs[k] = r.ok ? [1, addDias(today(), 3)] : [0, today()]; });
    if (Object.keys(st.srs).length) store.set("srs", st.srs);
  }
  function srsUpdate(key, ok) {
    const e = itemIndex().get(key);
    if (!e || !AUTO.includes(e.item.tipo)) return;
    const prev = st.srs[key];
    const stage = ok ? Math.min(SRS_INT.length - 1, prev ? prev[0] + 1 : 1) : 0;
    st.srs[key] = [stage, addDias(today(), SRS_INT[stage])];
    store.set("srs", st.srs);
  }
  function srsDue() {
    const t = today(), idx = itemIndex();
    return Object.keys(st.srs).filter((k) => st.srs[k][1] <= t && idx.has(k)).sort((a, b) => (st.srs[a][1] < st.srs[b][1] ? -1 : st.srs[a][1] > st.srs[b][1] ? 1 : 0));
  }
  function srsProximas() {
    const t = today(), prox = {};
    Object.values(st.srs).forEach(([, d]) => { if (d > t) prox[d] = (prox[d] || 0) + 1; });
    return Object.entries(prox).sort((a, b) => (a[0] < b[0] ? -1 : 1)).slice(0, 4);
  }

  /* ---------- domínio de cada tópico ---------- */
  function dominio(t) {
    let n = 0, ok = 0, tot = 0;
    t.exercicios.forEach((ex, i) => {
      if (!AUTO.includes(ex.tipo)) return;
      tot += 1;
      const r = st.res[`t-${t.id}-${i}`];
      if (r && typeof r.ok === "boolean") { n += 1; if (r.ok) ok += 1; }
    });
    return { n, ok, tot };
  }
  function domHTML(t) {
    const d = dominio(t);
    if (!d.n || !d.tot) return "";
    const p = Math.round((d.ok / d.tot) * 100);
    return `<span class="dom" title="${d.ok} de ${d.tot} perguntas certas"><span class="dom-bar"><i style="width:${p}%"></i></span><span class="dom-n">${d.ok}/${d.tot} certas</span></span>`;
  }
  function pontoFraco() {
    let pior = null;
    TOPICS.forEach((t) => {
      const d = dominio(t);
      if (d.n < 3) return;
      const a = d.ok / d.n;
      if (a < 0.7 && (!pior || a < pior.a)) pior = { t, a, d };
    });
    return pior;
  }
  function fracoHTML() {
    const f = pontoFraco();
    if (!f) return "";
    return `<a class="fraco rv" href="#t-${f.t.id}"><span class="tile bg-coral">${ic("target")}</span><span><b>O teu ponto fraco: ${esc(f.t.titulo)}</b><span>Acertaste ${f.d.ok} de ${f.d.n} perguntas (${Math.round(f.a * 100)}%). Revê o resumo e repete os exercícios.</span></span>${ic("arrow")}</a>`;
  }

  /* ---------- desafio do dia: 5 perguntas, iguais para todos ---------- */
  const DES_N = 5;
  function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function desafioKeys(d) {
    const r = rng(+d.replace(/-/g, "")), idx = itemIndex();
    const todas = [...idx.keys()].filter((k) => k.startsWith("t-") && idx.get(k).item.tipo === "mc" && !idx.get(k).item.texto);
    const pick = (arr, n) => { const a = arr.slice(), out = []; while (out.length < n && a.length) out.push(a.splice(Math.floor(r() * a.length), 1)[0]); return out; };
    const g = (x) => todas.filter((k) => idx.get(k).grupo === x);
    let ks = [...pick(g("I"), 2), ...pick(g("II"), 2), ...pick(g("III"), 1)];
    if (ks.length < DES_N) ks = ks.concat(pick(todas.filter((k) => !ks.includes(k)), DES_N - ks.length));
    return ks;
  }
  const desHist = () => store.get("desafioHist", {});
  function desStreak() {
    const h = desHist();
    let n = 0, d = today();
    if (h[d] == null) d = addDias(d, -1);
    while (h[d] != null) { n += 1; d = addDias(d, -1); }
    return n;
  }
  function desHoje() { const s = store.get("desafio", null); return s && s.d === today() ? s : null; }
  const desFeito = () => { const s = desHoje(); return !!(s && s.res.length >= DES_N); };
  const quad = (res) => res.map((x) => (x ? "🟩" : "🟥")).join("");
  const fmtSeg = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  function desTexto() {
    const s = desHoje(); if (!s) return "";
    const ok = s.res.filter(Boolean).length, sk = desStreak();
    return `Nota20 · Desafio do dia (${dataCurta(s.d)})\n${ok}/${DES_N} ${quad(s.res)}${s.seg ? ` em ${fmtSeg(s.seg)}` : ""}${sk > 1 ? `\n🔥 ${sk} dias seguidos` : ""}\nConsegues melhor? ${SITE()}#desafio`;
  }

  /* ---------- leitor de perguntas, uma de cada vez (desafio e revisão) ---------- */
  let QZ = null;
  const qzKey = () => `zq-${QZ.kind}-${QZ.i}`;
  function qzStart(kind) {
    if (kind === "desafio") {
      const s = desHoje() || { d: today(), res: [], t0: Date.now() };
      store.set("desafio", s);
      QZ = { kind, d: s.d, keys: desafioKeys(s.d), i: s.res.length, res: s.res.slice(), t0: s.t0 };
      GC.event("desafio-comecar");
    } else {
      const keys = srsDue().slice(0, 10);
      if (!keys.length) return;
      QZ = { kind, keys, i: 0, res: [], t0: Date.now() };
      GC.event("revisao-comecar");
    }
    QZ.answered = false;
    qzRender();
  }
  function qzRender() {
    ITEMS.clear();
    const idx = itemIndex(), n = QZ.keys.length, orig = QZ.keys[QZ.i], e = idx.get(orig), key = qzKey();
    delete st.res[key];
    reg(key, e.item, {});
    const isD = QZ.kind === "desafio";
    const dots = QZ.keys.map((_, i) => `<i class="${i < QZ.res.length ? (QZ.res[i] ? "ok" : "no") : (i === QZ.i ? "cur" : "")}"></i>`).join("");
    app.innerHTML = `<div class="wrap qz" style="max-width:820px;padding-bottom:60px">
      <div class="qz-top"><a class="qz-x" href="#estudar" aria-label="Sair">${ic("x")}</a>
        <div class="qz-dots" role="img" aria-label="Pergunta ${QZ.i + 1} de ${n}">${dots}</div>
        <span class="qz-n">${QZ.i + 1}/${n}</span></div>
      <div class="qz-lab"><span class="eyebrow">${isD ? icFill("bolt") + " Desafio do dia" : ic("layers", 'width="18" height="18"') + " Revisão"}</span><span class="chip">${isD ? `${GRUPOS[e.grupo].nome} · ${GRUPOS[e.grupo].desc}` : esc(e.label)}</span></div>
      ${renderItem(e.item, key, String(QZ.i + 1), {})}
      <div id="qz-next" class="qz-next"></div>
    </div>`;
    enhance(app);
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  function qzAnswered(key, ok) {
    const orig = QZ.keys[QZ.i], r = st.res[key];
    const antes = st.res[orig];
    /* a resposta conta para o tópico de origem: erros, domínio e nota prevista */
    if (r) { st.res[orig] = { sel: r.sel, ok }; }
    delete st.res[key]; saveRes();
    st.awarded.delete("ok:" + key); store.set("awarded", [...st.awarded]);
    if (ok && antes && antes.ok === false) { st.fixed += 1; store.set("fixed", st.fixed); }
    srsUpdate(orig, ok);
    QZ.res.push(ok); QZ.answered = true;
    if (QZ.kind === "desafio") { const s = desHoje(); if (s) { s.res = QZ.res.slice(); store.set("desafio", s); } }
    const last = QZ.i === QZ.keys.length - 1;
    const nx = document.getElementById("qz-next");
    if (nx) { nx.innerHTML = `<button class="btn btn-primary" type="button" data-act="qz-next">${last ? "Ver resultado" : "Seguinte"} ${ic("arrow")}</button>`; const b = $("button", nx); if (b) b.focus({ preventScroll: true }); }
  }
  function qzNext() {
    if (!QZ || !QZ.answered) return;
    if (QZ.i < QZ.keys.length - 1) { QZ.i += 1; QZ.answered = false; qzRender(); return; }
    const kind = QZ.kind, res = QZ.res.slice(), seg = Math.max(1, Math.round((Date.now() - QZ.t0) / 1000));
    QZ = null;
    if (kind === "desafio") {
      const s = desHoje();
      if (s) { s.seg = Math.min(seg, 3599); store.set("desafio", s); const h = desHist(); h[s.d] = res.filter(Boolean).length; const ks = Object.keys(h).sort().slice(-90); const h2 = {}; ks.forEach((k) => { h2[k] = h[k]; }); store.set("desafioHist", h2); }
      GC.event("desafio-fim");
      renderDesafio(true);
    } else {
      GC.event("revisao-fim");
      renderRevisao(res);
    }
    enhance(app); window.scrollTo({ top: 0, behavior: "instant" });
  }

  function renderDesafio(agora) {
    const s = desHoje(), sk = desStreak();
    if (QZ && QZ.kind === "desafio" && QZ.d === today() && !desFeito()) { QZ.answered = false; QZ.i = QZ.res.length; return qzRender(); }
    if (QZ && QZ.kind === "desafio") QZ = null;
    const head = `<div class="page-head"><span class="eyebrow">${icFill("bolt")} Desafio do dia</span><h1>${dataCurta(today())}: 5 perguntas</h1>
      <p>Todos os dias há um desafio novo, igual para todos os alunos. Demora 2 minutos e mantém a matéria fresca.</p></div>`;
    if (!s || s.res.length < DES_N) {
      const meio = s && s.res.length;
      app.innerHTML = `<div class="wrap" style="max-width:820px;padding-bottom:60px">${head}
        <div class="card des-intro rv">${lince("des-l")}
          <div class="des-facts"><div><b>${DES_N}</b><span>perguntas</span></div><div><b>2 min</b><span>em média</span></div><div><b>${sk}</b><span>${sk === 1 ? "dia seguido" : "dias seguidos"}</span></div></div>
          <p class="muted" style="font-weight:700;margin:0">2 de Educação Literária, 2 de Gramática e 1 de Escrita. As que errares entram na tua revisão.</p>
          <button class="btn btn-primary btn-shine" type="button" data-act="qz-start" data-k="desafio">${icFill("bolt")} ${meio ? "Continuar o desafio" : "Começar o desafio"}</button>
        </div>
        ${desSemanaHTML()}</div>`;
      return;
    }
    const ok = s.res.filter(Boolean).length, idx = itemIndex(), keys = desafioKeys(s.d);
    const frase = ok === DES_N ? "Perfeito. Nem uma falhou." : ok >= 4 ? "Muito bom. Quase perfeito." : ok >= 3 ? "Bom ritmo. Amanhã há mais." : "Hoje custou. As que erraste já estão na tua revisão.";
    const amanha = new Date(); amanha.setHours(24, 0, 0, 0);
    const falta = Math.max(0, amanha - Date.now()), fh = Math.floor(falta / 36e5), fm = Math.floor((falta % 36e5) / 6e4);
    app.innerHTML = `<div class="wrap" style="max-width:820px;padding-bottom:60px">${head}
      <div class="card des-res rv" id="des-res">
        <span class="eyebrow">${icFill("trophy")} Desafio concluído</span>
        <div class="des-score"><b>${ok}</b><span>/${DES_N}</span></div>
        <div class="des-quad" aria-hidden="true">${s.res.map((x) => `<i class="${x ? "ok" : "no"}"></i>`).join("")}</div>
        <p class="des-frase">${frase}</p>
        <div class="des-facts"><div><b>${s.seg ? fmtSeg(s.seg) : "—"}</b><span>tempo</span></div><div><b>${sk}</b><span>${sk === 1 ? "dia seguido" : "dias seguidos"}</span></div><div><b>${fh}h ${String(fm).padStart(2, "0")}m</b><span>para o próximo</span></div></div>
        <div class="row" style="justify-content:center"><button class="btn btn-primary" type="button" data-act="des-share">${ic("chat")} Desafiar um amigo</button><button class="btn btn-ghost" type="button" data-act="des-img">Guardar imagem</button></div>
      </div>
      <h2 class="des-h">As perguntas de hoje</h2>
      <div class="des-list">${keys.map((k, i) => { const e = idx.get(k); if (!e) return ""; return `<div class="des-it ${s.res[i] ? "ok" : "no"}"><span class="fi">${ic(s.res[i] ? "check" : "x")}</span><div><b>${esc(strip(e.item.enunciado))}</b><span>Resposta certa: ${esc(strip(e.item.opcoes[e.item.certa]))}</span><a href="${e.href}">Rever a matéria: ${esc(e.label)} ${ic("arrow")}</a></div></div>`; }).join("")}</div>
      ${upsellHTML("desafio")}
      ${desSemanaHTML()}
      <div class="row mt"><a class="btn btn-soft btn-sm" href="#revisao">${ic("layers")} Fazer a revisão de hoje</a><a class="btn btn-ghost btn-sm" href="#treino">${icFill("bolt")} Treino rápido</a></div>
    </div>`;
    if (agora) {
      const el = document.getElementById("des-res"), [x, y] = centerOf(el);
      addXP(20, "desafio:" + s.d, x, Math.min(y, 300));
      if (ok >= 4) confetti(x, Math.min(y, 320), ok === DES_N ? 40 : 22);
    }
  }
  function desSemanaHTML() {
    const h = desHist(), hoje = today(), dias = [];
    for (let i = 6; i >= 0; i--) dias.push(addDias(hoje, -i));
    return `<div class="card des-week rv"><h3>Os teus últimos 7 dias</h3><div class="des-days">${dias.map((d) => { const v = h[d]; const dd = new Date(d + "T12:00:00Z"); return `<div class="${v != null ? "on" : ""} ${d === hoje ? "hoje" : ""}"><span>${DIAS[dd.getUTCDay()]}</span><b>${v != null ? v : "·"}</b></div>`; }).join("")}</div></div>`;
  }
  async function desPartilhar() {
    GC.event("desafio-partilha");
    const txt = desTexto();
    if (navigator.share && !inFrame) { try { await navigator.share({ text: txt }); return; } catch (e) { if (e && e.name === "AbortError") return; } }
    openModal(`<h3>Desafiar um amigo</h3><pre class="share-pre">${esc(txt)}</pre>
      <div class="row"><a class="btn btn-primary btn-sm" href="https://wa.me/?text=${encodeURIComponent(txt)}" target="_blank" rel="noopener">${ic("chat")} Enviar por WhatsApp</a>
      <button class="btn btn-ghost btn-sm" type="button" data-act="des-copy">Copiar texto</button></div>
      <button class="btn btn-soft btn-sm" type="button" data-act="modal-close">Fechar</button>`);
  }

  /* imagem para partilhar (1080 x 1350), desenhada no navegador */
  function cartao({ etiqueta, grande, pequeno, frase, quadrados, rodape }) {
    return new Promise((done) => {
      const W = 1080, Hh = 1350, c = document.createElement("canvas");
      c.width = W; c.height = Hh;
      const x = c.getContext("2d");
      const g = x.createLinearGradient(0, 0, W, Hh); g.addColorStop(0, "#2d6bff"); g.addColorStop(1, "#8a5cff");
      x.fillStyle = g; x.fillRect(0, 0, W, Hh);
      x.globalAlpha = 0.1; x.fillStyle = "#fff";
      [[930, 170, 260], [120, 1210, 300], [1010, 980, 140]].forEach(([cx, cy, r]) => { x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); });
      x.globalAlpha = 1;
      const rr = (px, py, w, h, r) => { x.beginPath(); x.moveTo(px + r, py); x.arcTo(px + w, py, px + w, py + h, r); x.arcTo(px + w, py + h, px, py + h, r); x.arcTo(px, py + h, px, py, r); x.arcTo(px, py, px + w, py, r); x.closePath(); };
      x.fillStyle = "#fff"; rr(90, 330, 900, 800, 56); x.fill();
      const D = '"Bricolage Grotesque", "Segoe UI", system-ui, sans-serif', B = '"Figtree", "Segoe UI", system-ui, sans-serif';
      x.textAlign = "center";
      x.fillStyle = "#fff"; x.font = `800 76px ${D}`; x.fillText("Nota20", W / 2 + 60, 215);
      x.font = `700 34px ${B}`; x.globalAlpha = 0.9; x.fillText("Exame Nacional de Português", W / 2, 285); x.globalAlpha = 1;
      x.fillStyle = "#2d6bff"; x.font = `800 40px ${B}`; x.fillText(etiqueta.toUpperCase(), W / 2, 440);
      x.fillStyle = "#141a3c"; x.font = `800 300px ${D}`;
      const wg = x.measureText(grande).width; x.font = `700 110px ${D}`; const wp = pequeno ? x.measureText(pequeno).width : 0;
      const x0 = W / 2 - (wg + wp) / 2;
      x.textAlign = "left"; x.font = `800 300px ${D}`; x.fillText(grande, x0, 730);
      if (pequeno) { x.fillStyle = "#5c6489"; x.font = `700 110px ${D}`; x.fillText(pequeno, x0 + wg + 6, 730); }
      x.textAlign = "center";
      if (quadrados && quadrados.length) {
        const s = 96, gap = 22, tw = quadrados.length * s + (quadrados.length - 1) * gap; let qx = W / 2 - tw / 2;
        quadrados.forEach((okq) => { x.fillStyle = okq ? "#14b877" : "#ff6b5b"; rr(qx, 800, s, s, 24); x.fill(); qx += s + gap; });
      }
      x.fillStyle = "#141a3c"; x.font = `700 46px ${B}`; x.fillText(frase, W / 2, quadrados && quadrados.length ? 990 : 880);
      if (rodape) { x.fillStyle = "#5c6489"; x.font = `700 36px ${B}`; x.fillText(rodape, W / 2, 1060); }
      x.fillStyle = "#fff"; x.font = `800 50px ${D}`; x.fillText("nota20app.pt", W / 2, 1245);
      const img = new Image();
      const fim = () => c.toBlob((b) => done(b), "image/png");
      img.onload = () => { try { x.drawImage(img, W / 2 - 250, 110, 140, 140); } catch (e) { /* sem mascote */ } fim(); };
      img.onerror = fim;
      img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(lince().replace("<svg ", '<svg width="300" height="300" '));
    });
  }
  async function partilharImagem(dados, nome, texto) {
    try { if (document.fonts && document.fonts.load) await Promise.all([document.fonts.load('800 80px "Bricolage Grotesque"'), document.fonts.load('700 40px "Figtree"')]); } catch (e) { /* segue com a fonte do sistema */ }
    const blob = await cartao(dados);
    if (!blob) return;
    const file = new File([blob], nome, { type: "image/png" });
    if (!inFrame && navigator.canShare && navigator.canShare({ files: [file] })) { try { await navigator.share({ files: [file], text: texto || "" }); return; } catch (e) { if (e && e.name === "AbortError") return; } }
    const a = document.createElement("a"), u = URL.createObjectURL(blob);
    a.href = u; a.download = nome; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(u), 4000);
  }
  function desImagem() {
    const s = desHoje(); if (!s) return;
    GC.event("desafio-imagem");
    const ok = s.res.filter(Boolean).length, sk = desStreak();
    return partilharImagem({ etiqueta: `Desafio do dia · ${dataCurta(s.d)}`, grande: String(ok), pequeno: `/${DES_N}`, quadrados: s.res, frase: s.seg ? `em ${fmtSeg(s.seg)}${sk > 1 ? ` · ${sk} dias seguidos` : ""}` : "Consegues melhor?", rodape: "Consegues melhor? Faz o desafio de hoje." }, `nota20-desafio-${s.d}.png`, desTexto());
  }

  function renderRevisao(res) {
    if (QZ && QZ.kind === "revisao" && !res) { if (QZ.answered) { return qzNext(); } return qzRender(); }
    const due = srsDue(), prox = srsProximas(), total = Object.keys(st.srs).length;
    const head = `<div class="page-head"><span class="eyebrow">${ic("layers", 'width="18" height="18"')} Revisão inteligente</span><h1>Rever no dia certo</h1>
      <p>A Nota20 guarda cada pergunta que respondes e trá-la de volta mesmo antes de a esqueceres: ao fim de 1, 3, 7, 14, 30 e 60 dias. Se errares, volta no dia seguinte.</p></div>`;
    let body;
    if (res) {
      const ok = res.filter(Boolean).length;
      body = `<div class="card des-res rv" id="rev-res"><span class="eyebrow">${icFill("trophy")} Revisão feita</span>
        <div class="des-score"><b>${ok}</b><span>/${res.length}</span></div>
        <div class="des-quad" aria-hidden="true">${res.map((x) => `<i class="${x ? "ok" : "no"}"></i>`).join("")}</div>
        <p class="des-frase">${due.length ? `Ainda tens ${due.length} ${due.length === 1 ? "pergunta" : "perguntas"} para hoje.` : "Está tudo em dia. Volta amanhã."}</p>
        <div class="row" style="justify-content:center">${due.length ? `<button class="btn btn-primary" type="button" data-act="qz-start" data-k="revisao">Continuar a rever</button>` : `<a class="btn btn-primary" href="#estudar">Voltar ao estudo</a>`}<a class="btn btn-ghost" href="#erros">Ver os meus erros</a></div></div>`;
    } else if (due.length) {
      body = `<div class="card des-intro rv">${lince("des-l")}
        <div class="des-facts"><div><b>${due.length}</b><span>para rever hoje</span></div><div><b>${total}</b><span>perguntas guardadas</span></div><div><b>${Math.min(10, due.length)}</b><span>nesta sessão</span></div></div>
        <button class="btn btn-primary btn-shine" type="button" data-act="qz-start" data-k="revisao">${ic("layers")} Começar a revisão</button></div>`;
    } else {
      body = `<div class="empty">${lince()}<span>${total ? "Está tudo em dia. Não tens perguntas para rever hoje." : "Ainda não tens perguntas guardadas. Responde a exercícios ou faz o desafio do dia: a revisão começa sozinha."}</span><a class="btn btn-primary btn-sm" href="#desafio">${icFill("bolt")} Fazer o desafio do dia</a></div>`;
    }
    app.innerHTML = `<div class="wrap" style="max-width:820px;padding-bottom:60px">${head}${body}
      ${prox.length ? `<div class="card des-week rv"><h3>Próximas revisões</h3><div class="rev-prox">${prox.map(([d, n]) => `<div><b>${n}</b><span>${d === addDias(today(), 1) ? "amanhã" : dataCurta(d)}</span></div>`).join("")}</div></div>` : ""}
    </div>`;
    if (res) { const el = document.getElementById("rev-res"), [x, y] = centerOf(el); addXP(15, null, x, Math.min(y, 300)); if (res.every(Boolean)) confetti(x, Math.min(y, 320), 24); }
  }

  /* ---------- conquistas ---------- */
  const nCertas = () => Object.values(st.res).filter((r) => r && r.ok).length;
  const melhorSeq = () => { const ds = [...new Set(st.days)].sort(); let best = 0, cur = 0, prev = null; ds.forEach((d) => { cur = prev && addDias(prev, 1) === d ? cur + 1 : 1; best = Math.max(best, cur); prev = d; }); return best; };
  const BADGES = [
    ["primeira", "check", "Primeira certa", "Acerta numa pergunta", () => nCertas() >= 1],
    ["c25", "target", "Pontaria", "25 respostas certas", () => nCertas() >= 25],
    ["c100", "star", "Centena", "100 respostas certas", () => nCertas() >= 100],
    ["c200", "crown", "Imparável", "200 respostas certas", () => nCertas() >= 200],
    ["s3", "flame", "A aquecer", "3 dias seguidos", () => melhorSeq() >= 3],
    ["s7", "flame", "Semana completa", "7 dias seguidos", () => melhorSeq() >= 7],
    ["s30", "flame", "Um mês a fundo", "30 dias seguidos", () => melhorSeq() >= 30],
    ["t5", "book", "Bom começo", "5 tópicos estudados", () => st.studied.size >= 5],
    ["t15", "book", "Meio caminho", "15 tópicos estudados", () => st.studied.size >= 15],
    ["tall", "grad", "Programa completo", "Todos os tópicos estudados", () => st.studied.size >= TOPICS.length],
    ["d1", "bolt", "Desafiado", "Faz um desafio do dia", () => Object.keys(desHist()).length >= 1],
    ["d5", "trophy", "5 em 5", "Desafio do dia perfeito", () => Object.values(desHist()).some((v) => v >= DES_N)],
    ["d7", "bolt", "Hábito", "7 desafios do dia", () => Object.keys(desHist()).length >= 7],
    ["e10", "shield", "Corretor", "Corrige 10 erros", () => st.fixed >= 10],
    ["sim", "timer", "Prova de fogo", "Termina um simulado", () => Object.keys(st.simHist).length >= 1],
    ["g3", "pen", "Escritor", "Texto corrigido com IA", () => st.g3.length >= 1]
  ];
  const badgesGanhas = () => BADGES.filter((b) => { try { return b[4](); } catch (e) { return false; } }).map((b) => b[0]);
  let badgesVistas = store.get("badges", null);
  if (!badgesVistas) { badgesVistas = badgesGanhas(); store.set("badges", badgesVistas); }
  let badgeT = null;
  function checkBadges() {
    clearTimeout(badgeT);
    badgeT = setTimeout(() => {
      const novas = badgesGanhas().filter((id) => !badgesVistas.includes(id));
      if (!novas.length) return;
      badgesVistas = badgesVistas.concat(novas); store.set("badges", badgesVistas);
      const b = BADGES.find((z) => z[0] === novas[0]);
      GC.event("conquista");
      toast(`<span class="tl badge-t">${icFill(b[1])}</span><div><b>Conquista: ${esc(b[2])}</b><span>${esc(b[3])}${novas.length > 1 ? ` · e mais ${novas.length - 1}` : ""}. <a href="#estudar/conquistas">Ver todas</a></span></div>`, 6000);
    }, 1600);
  }
  function badgesHTML() {
    const g = new Set(badgesGanhas());
    return `<section class="badges rv" id="conquistas"><div class="badges-h"><h2>Conquistas</h2><span>${g.size}/${BADGES.length}</span></div>
      <div class="badges-row">${BADGES.map(([id, i, n, d]) => `<div class="badge ${g.has(id) ? "on" : ""}" title="${esc(d)}"><span class="bi">${g.has(id) ? (["bolt", "flame", "star", "trophy", "crown"].includes(i) ? icFill(i) : ic(i)) : ic("lock")}</span><b>${esc(n)}</b><span>${esc(d)}</span></div>`).join("")}</div></section>`;
  }

  /* ---------- pesquisa em toda a matéria ---------- */
  const semAcento = (s) => String(s).normalize("NFC").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  let SIDX = null;
  function searchIndex() {
    if (SIDX) return SIDX;
    SIDX = [];
    const add = (t, s, href, raw, topico, peso) => { const r = String(raw || "").replace(/\s+/g, " ").normalize("NFC"); SIDX.push({ t, s, href, raw: r, nt: semAcento(t + " " + s), nb: semAcento(r), topico, peso: peso || 0 }); };
    [["Plano de estudo", "O teu plano dia a dia até ao exame", "#plano"], ["Desafio do dia", "5 perguntas novas todos os dias", "#desafio"], ["Revisão inteligente", "Rever cada pergunta no dia certo", "#revisao"], ["Treino rápido", "Perguntas ao acaso corrigidas na hora", "#treino"], ["Os meus erros", "As perguntas que erraste", "#erros"], ["Cábula", "Pontos-chave para imprimir", "#cabula"], ["Simulados", "Provas completas com tempo", "#simulado"], ["Tópicos prováveis 2027", "O que tem mais probabilidade de sair", "#provaveis"], ["Explicador", "Tira dúvidas com IA", "#duvidas"], ["Exames nacionais resolvidos", "Provas do IAVE de 2020 a 2026", "#exames"]]
      .forEach(([t, s, h]) => add(t, s, h, "", null, 2));
    TOPICS.forEach((t) => {
      add(t.titulo, t.subtitulo, `#t-${t.id}`, strip(t.resumo) + " " + t.pontos.map(strip).join(" "), t, 3);
      (MAT(t) || []).forEach((sec) => add(sec.titulo, `${t.titulo} · matéria completa`, `#m-${t.id}`, strip(sec.html), t, 1));
    });
    EXAMS.forEach((e) => add(e.titulo, e.previsto ? "Exame previsto" : "Exame nacional resolvido", `#e-${e.id}`, "", null, 1));
    return SIDX;
  }
  function searchRun(q) {
    const toks = semAcento(q).split(/\s+/).filter((x) => x.length > 1).slice(0, 5);
    if (!toks.length) return [];
    const out = [];
    searchIndex().forEach((e) => {
      const aberto = !e.topico || canOpen(e.topico);
      let sc = e.peso, pos = -1;
      for (const tk of toks) {
        const it = e.nt.indexOf(tk), ib = aberto ? e.nb.indexOf(tk) : -1;
        if (it < 0 && ib < 0) return;
        if (it >= 0) sc += it === 0 ? 30 : 20; else sc += 4;
        if (ib >= 0 && pos < 0) pos = ib;
      }
      out.push({ e, sc, pos, aberto });
    });
    out.sort((a, b) => b.sc - a.sc);
    const marca = (txt) => { const n = semAcento(txt); const marks = []; toks.forEach((tk) => { let i = n.indexOf(tk); while (i >= 0 && marks.length < 12) { marks.push([i, i + tk.length]); i = n.indexOf(tk, i + tk.length); } }); marks.sort((a, b) => a[0] - b[0]); let r = "", p = 0; marks.forEach(([a, b]) => { if (a < p) return; r += esc(txt.slice(p, a)) + "<mark>" + esc(txt.slice(a, b)) + "</mark>"; p = b; }); return r + esc(txt.slice(p)); };
    return out.slice(0, 12).map(({ e, pos, aberto }) => {
      let snip = "";
      if (aberto && pos >= 0 && e.nb.length === e.raw.length) { const a = Math.max(0, pos - 50), b = Math.min(e.raw.length, pos + 110); snip = (a > 0 ? "…" : "") + e.raw.slice(a, b).trim() + (b < e.raw.length ? "…" : ""); }
      return `<a class="sr-it" href="${e.href}" data-act="modal-close"><b>${marca(e.t)}${aberto ? "" : ` <span class="chip pro">${ic("lock")} Completo</span>`}</b><span class="sr-s">${marca(e.s)}</span>${snip ? `<span class="sr-snip">${marca(snip)}</span>` : ""}</a>`;
    });
  }
  function openSearch() {
    GC.event("pesquisa");
    const sug = ["Mensagem", "predicativo", "Ricardo Reis", "texto de opinião", "deíticos", "Os Maias"];
    openModal(`<div class="srch"><label class="sr" for="srch-in">Pesquisar na matéria</label>
      <div class="srch-box">${ic("search")}<input type="search" id="srch-in" placeholder="Pesquisar: obra, autor, conceito…" autocomplete="off" enterkeyhint="search"><button type="button" class="srch-x" data-act="modal-close" aria-label="Fechar">${ic("x")}</button></div>
      <div id="srch-res" class="srch-res"><p class="small muted" style="font-weight:700;margin:4px 0">Experimenta:</p><div class="filters">${sug.map((x) => `<button type="button" data-act="srch-sug" data-v="${esc(x)}">${esc(x)}</button>`).join("")}</div></div></div>`);
    const m = $(".modal", modalRoot); if (m) m.classList.add("modal-search");
    const i = document.getElementById("srch-in"); if (i) i.focus();
  }
  function searchUpdate(v) {
    const box = document.getElementById("srch-res"); if (!box) return;
    if (v.trim().length < 2) { box.innerHTML = `<p class="small muted" style="font-weight:700;margin:4px 0">Escreve pelo menos 2 letras.</p>`; return; }
    const r = searchRun(v);
    box.innerHTML = r.length ? r.join("") : `<p class="muted" style="font-weight:700;margin:8px 0">Sem resultados para «${esc(v.trim())}». Tenta outra palavra ou <a href="#duvidas" data-act="modal-close">pergunta ao explicador</a>.</p>`;
  }

  /* ---------- ouvir o resumo (voz do próprio dispositivo) ---------- */
  const TTS_OK = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
  let ttsId = 0;
  function ttsStop() { ttsId += 1; if (TTS_OK) { try { speechSynthesis.cancel(); } catch (e) { /* nada */ } } $$('[data-act="tts"]').forEach((b) => { b.classList.remove("on"); const s = $("span", b); if (s) s.textContent = "Ouvir o resumo"; }); }
  function ttsToggle(btn) {
    if (!TTS_OK) return;
    if (btn.classList.contains("on")) { ttsStop(); return; }
    const t = topicById(btn.dataset.id); if (!t || !canOpen(t)) return;
    ttsStop();
    GC.event("ouvir-resumo");
    const texto = `${t.titulo}. ${strip(t.resumo)} Pontos-chave. ${t.pontos.map(strip).join(". ")}`;
    const partes = (texto.replace(/\s+/g, " ").match(/[^.!?;:]+[.!?;:]*/g) || [texto]).map((x) => x.trim()).filter(Boolean);
    const vozes = speechSynthesis.getVoices();
    const voz = vozes.find((v) => /^pt[-_]PT/i.test(v.lang)) || vozes.find((v) => /^pt/i.test(v.lang)) || null;
    const meu = ttsId;
    btn.classList.add("on"); const s = $("span", btn); if (s) s.textContent = "Parar";
    let i = 0;
    const seg = () => {
      if (meu !== ttsId) return;
      if (i >= partes.length) { ttsStop(); return; }
      const u = new SpeechSynthesisUtterance(partes[i]); i += 1;
      u.lang = voz ? voz.lang : "pt-PT"; if (voz) u.voice = voz; u.rate = 1;
      u.onend = seg; u.onerror = () => { if (meu === ttsId) ttsStop(); };
      speechSynthesis.speak(u);
    };
    seg();
  }
  if (TTS_OK) { try { speechSynthesis.getVoices(); } catch (e) { /* nada */ } window.addEventListener("pagehide", () => { try { speechSynthesis.cancel(); } catch (e) { /* nada */ } }); }

  /* ---------- tema claro / escuro ---------- */
  const temaPref = () => { try { return localStorage.getItem("n20:tema") || "auto"; } catch (e) { return "auto"; } };
  const temaEscuro = () => temaPref() === "escuro";
  function aplicarTema() {
    const dark = temaEscuro();
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    const m = document.querySelector('meta[name="theme-color"]'); if (m) m.content = dark ? "#0f1226" : "#2d6bff";
    $$("[data-tema-lab]").forEach((el) => { el.textContent = dark ? "Tema claro" : "Tema escuro"; });
  }
  function trocarTema() {
    const novo = temaEscuro() ? "claro" : "escuro";
    try { localStorage.setItem("n20:tema", novo); } catch (e) { /* sem armazenamento */ }
    GC.event("tema-" + novo);
    aplicarTema();
  }

  /* ============================================================
     PARCERIAS: criadores e explicadores com código de desconto
     ============================================================ */
  const PARC = (window.N20_PARCEIROS || []).filter((p) => p && p.nome && p.codigo).map((p) => Object.assign({}, p, { codigo: String(p.codigo).trim().toUpperCase() }));
  const PARC_DESC = C.PARCEIROS_DESCONTO || "";
  const arroba = (h) => String(h || "").trim().replace(/^@/, "");
  function parceiroAtivo() { const c = store.get("parceiro", ""); return (c && PARC.find((p) => p.codigo === c)) || null; }
  function usarParceiro(cod, avisar) {
    const c = String(cod || "").trim().toUpperCase(), p = PARC.find((x) => x.codigo === c);
    if (!c) { store.set("parceiro", ""); if (currentView === "parcerias") { renderParcerias(); enhance(app); } return; }
    if (!p) return;
    store.set("parceiro", p.codigo); GC.event("parceiro-usar");
    toast(`<span class="tl">${lince()}</span><div><b>Código ${esc(p.codigo)} guardado</b><span>${PARC_DESC ? `Tens ${esc(PARC_DESC)} de desconto no plano Completo. ` : ""}Fica aplicado no pagamento.</span></div>${unlocked() ? "" : `<a class="btn btn-primary btn-sm" href="#precos">Ver plano</a>`}`, avisar ? 7000 : 9000);
    if (currentView === "parcerias") { renderParcerias(); enhance(app); }
  }
  function parcAvisoHTML() {
    const p = parceiroAtivo();
    return p ? `<div class="parc-on">${ic("check")}<span>Código <b>${esc(p.codigo)}</b> de ${esc(p.nome)} aplicado no pagamento${PARC_DESC ? ` (−${esc(PARC_DESC)})` : ""}.</span></div>` : "";
  }
  const PARC_COR = ["bg-blue", "bg-violet", "bg-coral", "bg-mint", "bg-pink"];
  function parceiroCard(p, i) {
    const ini = p.nome.split(/\s+/).filter(Boolean).slice(0, 2).map((x) => x[0]).join("").toUpperCase();
    const ativo = (parceiroAtivo() || {}).codigo === p.codigo;
    const redes = [
      p.tiktok ? `<a href="https://www.tiktok.com/@${encodeURIComponent(arroba(p.tiktok))}" target="_blank" rel="noopener"><b>TikTok</b>@${esc(arroba(p.tiktok))}</a>` : "",
      p.instagram ? `<a href="https://www.instagram.com/${encodeURIComponent(arroba(p.instagram))}/" target="_blank" rel="noopener"><b>Instagram</b>@${esc(arroba(p.instagram))}</a>` : "",
      p.youtube && /^https:\/\//.test(p.youtube) ? `<a href="${esc(p.youtube)}" target="_blank" rel="noopener"><b>YouTube</b>Ver canal</a>` : ""
    ].join("");
    return `<article class="parc rv ${ativo ? "ativo" : ""}">
      <div class="parc-top">${p.foto ? `<img class="parc-av" src="${esc(p.foto)}" alt="" loading="lazy" width="72" height="72">` : `<span class="parc-av ${PARC_COR[i % PARC_COR.length]}" aria-hidden="true">${esc(ini)}</span>`}
        <div><h3>${esc(p.nome)}</h3>${p.descricao ? `<p>${esc(p.descricao)}</p>` : ""}</div></div>
      ${redes ? `<div class="parc-redes">${redes}</div>` : ""}
      <div class="cupao ${ativo ? "on" : ""}">
        <div class="cupao-l"><span class="cupao-v">${PARC_DESC ? `−${esc(PARC_DESC)}` : "%"}</span><span class="cupao-s">no plano<br>Completo</span></div>
        <div class="cupao-r"><span class="lab">Código de desconto</span>
          <button type="button" class="cupao-cod" data-act="parc-copiar" data-c="${esc(p.codigo)}" aria-label="Copiar o código ${esc(p.codigo)}"><b>${esc(p.codigo)}</b><span class="cupao-cp">${ic("layers")}<i>Copiar</i></span></button></div>
      </div>
      ${ativo ? `<div class="parc-ok">${ic("check")}<span>Código aplicado no pagamento</span><button type="button" class="linklike" data-act="parc-tirar">Tirar</button></div>` : `<button type="button" class="btn btn-primary btn-sm parc-usar" data-act="parc-usar" data-c="${esc(p.codigo)}">Usar este código ${ic("arrow")}</button>`}
    </article>`;
  }
  function renderParcerias() {
    const com = C.PARCEIROS_COMISSAO || "";
    const mail = C.CONTACTO_EMAIL ? `mailto:${C.CONTACTO_EMAIL}?subject=${encodeURIComponent("Parceria Nota20")}&body=${encodeURIComponent("Olá! Quero ser parceiro da Nota20.\n\nNome:\nTikTok / Instagram:\nCódigo que gostava de ter:\n")}` : "";
    app.innerHTML = `<div class="wrap" style="padding-bottom:60px">
      <div class="page-head"><span class="eyebrow">${ic("star", 'width="18" height="18"')} Parcerias</span><h1>Parceiros da Nota20</h1>
        <p>Criadores e explicadores que recomendam a Nota20. ${PARC.length ? `Usa o código de um deles${PARC_DESC ? ` e poupas ${esc(PARC_DESC)} no plano Completo` : " no pagamento do plano Completo"}.` : "Cada um tem um código de desconto para o plano Completo."}</p></div>
      ${parcAvisoHTML()}
      ${PARC.length ? `<div class="parc-grid">${PARC.map(parceiroCard).join("")}</div>
        <p class="small muted parc-nota">Os parceiros recebem uma comissão por cada compra feita com o seu código. O preço para ti nunca sobe: o código só dá desconto.</p>`
        : `<div class="empty parc-vazio">${lince()}<span>Os primeiros parceiros aparecem aqui em breve, cada um com o seu código de desconto.</span></div>`}
      <section class="parc-ser rv">
        <div><span class="eyebrow" style="color:#fff;opacity:.9">${ic("sparkle", 'width="18" height="18"')} Para criadores e explicadores</span>
          <h2>Queres ser parceiro?</h2>
          <p>Se fazes conteúdo de estudo ou dás explicações a alunos do secundário, a Nota20 pode ser um rendimento extra sem trabalho adicional.</p></div>
        <ul>
          <li>${ic("check")}<span><b>${com ? `${esc(com)} de cada compra` : "Comissão por cada compra"}</b> feita com o teu código, sem limite.</span></li>
          <li>${ic("check")}<span><b>Código de desconto só teu</b>${PARC_DESC ? `, que dá ${esc(PARC_DESC)} aos teus seguidores` : ""}, e um link direto com o código aplicado.</span></li>
          <li>${ic("check")}<span><b>Acesso Completo grátis</b>, para conheceres a app por dentro.</span></li>
          <li>${ic("check")}<span><b>O teu perfil nesta página</b>, com as tuas redes.</span></li>
        </ul>
        ${mail ? `<a class="btn btn-yellow" href="${esc(mail)}">${ic("mail")} Quero ser parceiro</a>` : ""}
        ${C.CONTACTO_INSTAGRAM ? `<p class="small" style="margin:0;opacity:.9">Ou envia mensagem para ${esc(C.CONTACTO_INSTAGRAM)} no Instagram.</p>` : ""}
      </section>
    </div>`;
  }

  /* ---------- painel privado das comissões (só para o dono) ---------- */
  const eur = (c) => (c / 100).toFixed(2).replace(".", ",") + " €";
  const PA_DONOS = ["diogomcpires2007@gmail.com", "nota20en@gmail.com"];
  async function renderParcAdmin() {
    const dono = CONTA.user && PA_DONOS.includes(String(CONTA.user.email || "").toLowerCase());
    if (!dono) { app.innerHTML = `<div class="wrap" style="max-width:820px;padding-bottom:60px"><div class="page-head"><h1>Página reservada</h1><p>Entra com a conta de administração para veres as comissões.</p></div>${CONTA.user ? "" : `<button class="btn btn-primary" type="button" data-act="login">Entrar</button>`}</div>`; return; }
    app.innerHTML = `<div class="wrap" style="padding-bottom:60px"><div class="page-head"><span class="eyebrow">${ic("star", 'width="18" height="18"')} Só tu vês isto</span><h1>Comissões dos parceiros</h1><p id="pa-sub">A carregar…</p></div><div id="pa-body"></div></div>`;
    let d;
    try { d = await CONTA.rpc("parcerias_admin"); } catch (e) { const s = document.getElementById("pa-sub"); if (s) s.textContent = "Não foi possível carregar. Recarrega a página."; return; }
    if (currentView !== "parcerias-admin") return;
    const taxa = (parseFloat(C.PARCEIROS_COMISSAO) || 25) / 100, G14 = 14 * 864e5, agora = Date.now();
    const cods = [...new Set([...PARC.map((p) => p.codigo), ...d.vendas.map((v) => v.codigo), ...d.pagamentos.map((p) => p.codigo)])];
    const dataPt = (iso) => { const x = new Date(iso); return `${x.getDate()} ${MESES[x.getMonth()]} ${x.getFullYear()}`; };
    let devido = 0;
    const linhas = cods.map((c) => {
      const p = PARC.find((x) => x.codigo === c), vs = d.vendas.filter((v) => v.codigo === c), ok = vs.filter((v) => v.estado === "pago");
      const firmes = ok.filter((v) => agora - new Date(v.data).getTime() >= G14), garantia = ok.filter((v) => agora - new Date(v.data).getTime() < G14);
      const com = (arr) => Math.round(arr.reduce((s, v) => s + (v.valor || 0), 0) * taxa);
      const pago = d.pagamentos.filter((x) => x.codigo === c).reduce((s, x) => s + x.valor, 0);
      const aPagar = Math.max(0, com(firmes) - pago); devido += aPagar;
      const promo = (vs.find((v) => v.promo) || {}).promo || "";
      return { c, promo: p ? "" : promo, nome: p ? p.nome : "Código por identificar", n: ok.length, reemb: vs.length - ok.length, total: ok.reduce((s, v) => s + (v.valor || 0), 0), garantia: com(garantia), pago, aPagar };
    });
    document.getElementById("pa-sub").textContent = `Comissão de ${Math.round(taxa * 100)}% sobre o valor pago. Só entram em «A pagar» as vendas com mais de 14 dias (fim da garantia). Atualizado agora.`;
    document.getElementById("pa-body").innerHTML = `
      <div class="pa-kpis"><div><b>${eur(devido)}</b><span>a pagar agora</span></div><div><b>${d.vendas.filter((v) => v.estado === "pago").length}</b><span>vendas com código</span></div><div><b>${eur(linhas.reduce((s, l) => s + l.garantia, 0))}</b><span>comissão ainda na garantia</span></div></div>
      <div class="pa-grid">${linhas.map((l) => `<article class="card pa-card"><div class="pa-h"><h3>${esc(l.nome)}</h3><span class="chip">${esc(l.c)}</span></div>
        <dl><div><dt>Vendas</dt><dd>${l.n}${l.reemb ? ` <small>(+${l.reemb} reembolsada${l.reemb > 1 ? "s" : ""})</small>` : ""}</dd></div><div><dt>Total vendido</dt><dd>${eur(l.total)}</dd></div><div><dt>Na garantia (ainda não pagar)</dt><dd>${eur(l.garantia)}</dd></div><div><dt>Já pago</dt><dd>${eur(l.pago)}</dd></div><div class="tot"><dt>A pagar agora</dt><dd>${eur(l.aPagar)}</dd></div></dl>
        ${l.promo ? `<div class="pa-assoc"><p class="small" style="margin:0;font-weight:700">Alguém escreveu um código à mão no pagamento. De quem é? (Vê na Stripe, em Cupões, qual código teve uma utilização nova.)</p><div class="row"><select aria-label="Parceiro">${PARC.map((x) => `<option value="${esc(x.codigo)}">${esc(x.nome)} (${esc(x.codigo)})</option>`).join("")}</select><button class="btn btn-primary btn-sm" type="button" data-act="pa-assoc" data-p="${esc(l.promo)}">Guardar</button></div></div>` : ""}
        ${l.aPagar > 0 && !l.promo ? `<button class="btn btn-primary btn-sm" type="button" data-act="pa-pagar" data-c="${esc(l.c)}" data-n="${esc(l.nome)}" data-v="${l.aPagar}">Marcar ${eur(l.aPagar)} como pago</button>` : ""}</article>`).join("")}</div>
      <h2 class="des-h">Vendas com código</h2>
      ${d.vendas.length ? `<div class="pa-list">${d.vendas.map((v) => `<div class="${v.estado === "pago" ? "" : "off"}"><span>${dataPt(v.data)}</span><b>${esc(v.codigo)}</b><span>${eur(v.valor || 0)}</span><span>${v.estado !== "pago" ? "reembolsada" : agora - new Date(v.data).getTime() < G14 ? "na garantia" : "firme"}</span></div>`).join("")}</div>` : `<div class="empty">${lince()}<span>Ainda não há compras com código de parceiro. Aparecem aqui sozinhas, segundos depois de cada pagamento.</span></div>`}
      ${d.pagamentos.length ? `<h2 class="des-h">Pagamentos que fizeste</h2><div class="pa-list">${d.pagamentos.map((x) => `<div><span>${dataPt(x.data)}</span><b>${esc(x.codigo)}</b><span>${eur(x.valor)}</span><span>pago</span></div>`).join("")}</div>` : ""}`;
  }

  /* ============================================================
     EVENTOS
     ============================================================ */
  document.addEventListener("click", (ev) => {
    const buy = ev.target.closest("a[data-buy]");
    if (buy) {
      GC.event("comprar-clique");
      if (CONTA.on && !CONTA.user) { ev.preventDefault(); closeModal(); openLogin("comprar", () => { location.href = payHref(); }); return; }
      buy.href = payHref();
    }
    const jump = ev.target.closest("[data-jump]");
    if (jump) { ev.preventDefault(); const t = document.getElementById(jump.dataset.jump); if (t) t.scrollIntoView({ behavior: "smooth" }); return; }
    const a = ev.target.closest("[data-act]");
    if (!a) return;
    const act = a.dataset.act;
    const q = a.closest(".q");
    const key = q && q.dataset.key;
    const entry = key && ITEMS.get(key);
    switch (act) {
      case "mc": {
        if (!entry) return;
        const i = +a.dataset.i;
        if (entry.ctx.mode === "exam") { $$(".opt", q).forEach((b) => b.classList.remove("sel")); a.classList.add("sel"); setSimAns(key, { sel: i }); }
        else { if (!gateEx(key)) return; showMc(q, entry.item, i, key); }
        break;
      }
      case "multi": {
        if (!entry) return;
        a.classList.toggle("sel"); a.setAttribute("aria-pressed", a.classList.contains("sel"));
        if (entry.ctx.mode === "exam") setSimAns(key, { sel: $$(".opt.sel", q).map((b) => +b.dataset.i) });
        break;
      }
      case "comp": {
        if (!entry) return;
        $$(`.opt[data-s="${a.dataset.s}"]`, q).forEach((b) => b.classList.remove("sel"));
        a.classList.add("sel");
        if (entry.ctx.mode === "exam") { const sel = {}; $$(".opt.sel", q).forEach((b) => { sel[b.dataset.s] = +b.dataset.i; }); setSimAns(key, { sel }); }
        break;
      }
      case "check-multi":
        if ($$(".opt.sel", q).length === entry.item.certas.length && !gateEx(key)) break;
        checkMulti(q, entry.item, key); break;
      case "check-comp":
        if ($$(".opt.sel", q).length === entry.item.sub.length && !gateEx(key)) break;
        checkComp(q, entry.item, key); break;
      case "paywall": { const tt = document.getElementById("toast"); if (tt) tt.remove(); openPaywall(a.dataset.r || "topico"); break; }
      case "promo-x": ssSet("n20:promo-x", "1"); renderPromo(); break;
      case "err-filter": st.errosFiltro = a.dataset.v; renderErros(); enhance(app); break;
      case "tr-sel": st.treinoSel[a.dataset.k] = a.dataset.k === "n" ? +a.dataset.v : a.dataset.v; renderTreino(); enhance(app); break;
      case "tr-start": startTreino(); break;
      case "tr-again": startTreino(); break;
      case "tr-new": st.treino = null; renderTreino(); enhance(app); break;
      case "tr-erros": st.treinoSel = { grupo: "todos", foco: "erros", n: 10 }; st.treino = null; break;
      case "plan-done": {
        const id = a.dataset.id;
        const t = st.plano && planTasks(st.plano).find((x) => x.id === id);
        if (!t) break;
        if (taskDone(t)) { delete st.planDone[id]; if (t.tipo === "topico") { st.studied.delete(t.ref); saveStudied(); } }
        else { st.planDone[id] = dkey(new Date()); if (t.tipo === "topico") { st.studied.add(t.ref); saveStudied(); } const [x, y] = centerOf(a); confetti(x, y, 14); addXP(t.tipo === "topico" ? 20 : 10, (t.tipo === "topico" ? "studied:" + t.ref : "plan:" + id), x, y - 20); }
        store.set("planDone", st.planDone);
        renderPlano();
        break;
      }
      case "ics": downloadICS(); break;
      case "share-progress": shareProgress(); break;
      case "login": openLogin(a.dataset.m || ""); break;
      case "login-google": a.disabled = true; CONTA.entrarGoogle().catch(() => { a.disabled = false; const m = document.getElementById("login-msg"); if (m) m.textContent = "Não foi possível abrir a Google agora. Usa o código por email."; }); break;
      case "parc-copiar": { const cod = a.dataset.c, lab = $("i", a); (navigator.clipboard ? navigator.clipboard.writeText(cod) : Promise.reject()).then(() => { a.classList.add("ok"); if (lab) lab.textContent = "Copiado!"; setTimeout(() => { a.classList.remove("ok"); if (lab) lab.textContent = "Copiar"; }, 1800); }).catch(() => { if (lab) lab.textContent = "Seleciona e copia"; }); GC.event("parceiro-copiar"); break; }
      case "parc-usar": usarParceiro(a.dataset.c, true); break;
      case "parc-tirar": usarParceiro("", true); break;
      case "pa-assoc": { const sel = $("select", a.closest(".pa-assoc")); if (!sel) break; a.disabled = true; CONTA.rpc("parceria_associar", { p_promo: a.dataset.p, p_codigo: sel.value }).then(() => { renderParcAdmin(); }).catch(() => { a.disabled = false; a.textContent = "Erro, tenta outra vez"; }); break; }
      case "pa-pagar": { const v = Math.round(parseFloat(String(a.dataset.v))); if (!(v > 0)) break; if (!window.confirm(`Registar que pagaste ${eur(v)} a ${a.dataset.n}?`)) break; a.disabled = true; CONTA.rpc("parceria_registar_pagamento", { p_codigo: a.dataset.c, p_valor: v, p_nota: null }).then(() => { renderParcAdmin(); }).catch(() => { a.disabled = false; a.textContent = "Erro, tenta outra vez"; }); break; }
      case "login-reenviar": { const f = document.getElementById("login-form"); const em = f && $("#login-email", f).value.trim().toLowerCase(); if (!em) break; a.disabled = true; CONTA.pedirCodigo(em).then(() => { a.textContent = "Enviado!"; }).catch((e) => { a.textContent = erroConta(e); }); break; }
      case "conta-guardar": CONTA.enviar().then(() => { a.textContent = "Guardado!"; }).catch(() => { a.textContent = "Sem ligação"; }); break;
      case "ir-avaliar": { const tt = document.getElementById("toast"); if (tt) tt.remove(); GC.event("avaliar-abrir"); const ir = () => { const a = document.getElementById("avaliacoes"); if (a) window.scrollTo({ top: a.getBoundingClientRect().top + scrollY - 70, behavior: "smooth" }); };
        if (currentView === "inicio") ir(); else { location.hash = "inicio"; setTimeout(ir, 800); } break; }
      case "conta-sair": CONTA.sair().then(() => { chipConta(); toast(`<span class="tl">${lince()}</span><div><b>Sessão terminada</b><span>O teu progresso continua guardado na conta.</span></div>`); route(); }); break;
      case "conta-apagar": if (confirm("Apagar a conta e o progresso guardado? Não dá para desfazer.")) { a.disabled = true; CONTA.apagar().then(() => { chipConta(); toast(`<span class="tl">${lince()}</span><div><b>Conta apagada</b><span>Os teus dados foram removidos.</span></div>`); location.hash = "#inicio"; }).catch(() => { a.disabled = false; a.textContent = "Não foi possível. Tenta mais tarde."; }); } break;
      case "convidar": convidar(); break;
      case "convite-wa": if (convPendente) { convPendente = false; setTimeout(conviteConta, 400); } break;
      case "convite-copiar": { const t = conviteTexto(); (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => { if (convPendente) { convPendente = false; conviteConta(); } }).catch(() => { a.textContent = "Seleciona e copia o texto"; }); break; }
      case "escolher-extra": { const sel = a.closest(".convite") && a.closest(".convite").querySelector(".extra-sel"); const t = sel && topicById(sel.value); if (!t) break; store.set("extra", t.id); GC.event("convite-extra"); closeModal(); toast(`<span class="tl">${lince()}</span><div><b>${esc(t.titulo)} desbloqueado!</b><span>É teu para sempre neste dispositivo.</span></div>`); if (location.hash === "#t-" + t.id) route(); else location.hash = "#t-" + t.id; break; }
      case "copy-share": { const t = progressoTexto(); (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => { a.textContent = "Copiado!"; }).catch(() => { a.textContent = "Seleciona e copia o texto"; }); break; }
      case "privacidade": openPrivacy(); break;
      case "install-top": instalarTopo(); break;
      case "install": if (installEvt) { installEvt.prompt(); installEvt.userChoice.finally(() => { installEvt = null; $$("[data-install]").forEach((b) => { b.hidden = true; }); }); } break;
      case "print": {
        if (currentView === "estudar" && location.hash.startsWith("#t-")) { const t = topicById(decodeURIComponent(location.hash.slice(3)).split("/")[0]); if (t && !canOpen(t)) { openPaywall("topico"); break; } document.body.classList.add("print-topic"); }
        window.print();
        setTimeout(() => document.body.classList.remove("print-topic"), 500);
        break;
      }
      case "demo-free":
        previewFree = !previewFree; store.set("previewFree", previewFree);
        renderDemoBar(); route(); break;
      case "demo-reset":
        used.ex = used.chat = used.fix = 0; store.set("used", used); counted.clear(); store.set("counted", []);
        route(); break;
      case "retry": {
        if (st.res[key] && st.res[key].ok === false) wasWrong.add(key);
        delete st.res[key]; saveRes();
        const tmp = document.createElement("div");
        tmp.innerHTML = renderItem(entry.item, key, $(".q-num", q).textContent, entry.ctx);
        q.replaceWith(tmp.firstElementChild);
        formatPoems(app);
        break;
      }
      case "show-sol": {
        const s = $(".solution", q);
        if (s.hidden && !gateEx(key)) break;
        s.hidden = !s.hidden;
        a.innerHTML = s.hidden ? `${ic("bulb")} Ver resolução` : `${ic("bulb")} Esconder resolução`;
        const txt = ($("textarea", q) || {}).value || "";
        if (!s.hidden && wordCount(txt) >= 10) { const [x, y] = centerOf(a); addXP(5, "sol:" + key, x, y - 20); }
        break;
      }
      case "ai-fix": aiFix(q, key); break;
      case "studied": {
        const id = a.dataset.id;
        if (st.studied.has(id)) st.studied.delete(id); else st.studied.add(id);
        saveStudied();
        const on = st.studied.has(id);
        a.className = `btn ${on ? "btn-soft" : "btn-primary"} btn-sm`;
        a.textContent = on ? "✓ Estudado" : "Marcar como estudado";
        a.setAttribute("aria-pressed", on);
        if (on) { const [x, y] = centerOf(a); confetti(x, y, 24); addXP(20, "studied:" + id, x, y - 20); }
        break;
      }
      case "filter": st.filter = a.dataset.v; renderStudy(); enhance(app); break;
      case "ask-about": ssSet("n20:ask", `Tenho uma dúvida sobre ${a.dataset.topic}: `); break;
      case "suggest": sendChat(a.dataset.q); break;
      case "chat-clear": st.chat = []; store.set("chat", []); renderTutor(); break;
      case "sim-start": {
        SIM = SIMS.find((x) => x.id === a.dataset.id) || SIMS[0];
        st.sim = { id: SIM.id, startedAt: Date.now(), submitted: false, answers: {}, scores: {} }; saveSim(); renderSim(); enhance(app); window.scrollTo({ top: 0, behavior: "instant" }); break;
      }
      case "sim-other": st.sim = null; saveSim(); renderSim(); enhance(app); window.scrollTo({ top: 0, behavior: "instant" }); break;
      case "sim-submit":
        openModal(`<h3>Entregar a prova?</h3><p class="muted" style="font-weight:600">Depois de entregar não podes alterar as respostas.</p><div class="row"><button class="btn btn-primary" data-act="sim-confirm" type="button">Entregar</button><button class="btn btn-ghost" data-act="modal-close" type="button">Continuar a prova</button></div>`);
        break;
      case "sim-confirm": {
        closeModal(); clearInterval(timerInt);
        st.sim.submitted = true; st.sim.submittedAt = Date.now(); saveSim(); saveSimHist();
        renderSim(); enhance(app); window.scrollTo({ top: 0, behavior: "instant" });
        const card = document.getElementById("result-card");
        if (card) { const [x, y] = centerOf(card); confetti(x, Math.min(y, 260), 60); addXP(50, "sim:" + st.sim.startedAt, x, 200); }
        break;
      }
      case "sim-reset":
        openModal(`<h3>Repetir este simulado?</h3><p class="muted" style="font-weight:600">As respostas e cotações atuais são apagadas e o tempo começa de novo.</p><div class="row"><button class="btn btn-primary" data-act="sim-reset-ok" type="button">Repetir</button><button class="btn btn-ghost" data-act="modal-close" type="button">Cancelar</button></div>`);
        break;
      case "sim-reset-ok": {
        closeModal(); const id = SIM.id;
        st.sim = { id, startedAt: Date.now(), submitted: false, answers: {}, scores: {} }; saveSim(); renderSim(); enhance(app); window.scrollTo({ top: 0, behavior: "instant" }); break;
      }
      case "sim-ai": simAI(a.dataset.key); break;
      case "code": abrirCodigo(); break;
      case "modal-close": closeModal(); break;
      case "qz-start": qzStart(a.dataset.k); break;
      case "qz-next": qzNext(); break;
      case "des-share": desPartilhar(); break;
      case "des-img": a.disabled = true; Promise.resolve(desImagem()).finally(() => { a.disabled = false; }); break;
      case "des-copy": { const t = desTexto(); (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => { a.textContent = "Copiado!"; }).catch(() => { a.textContent = "Seleciona e copia o texto"; }); break; }
      case "search": openSearch(); break;
      case "srch-sug": { const i = document.getElementById("srch-in"); if (i) { i.value = a.dataset.v; searchUpdate(i.value); i.focus(); } break; }
      case "tts": ttsToggle(a); break;
      case "tema": trocarTema(); break;
      case "modal-close-bg": if (ev.target === a) closeModal(); break;
      case "del-review": if (RV.isOwner && RV.db) RV.db.doc("reviews/" + a.dataset.id).delete().catch(() => {}); break;
    }
  });

  document.addEventListener("input", (ev) => {
    const t = ev.target;
    if (t.matches('textarea[data-act="draft"]')) {
      const q = t.closest(".q"), key = q.dataset.key, entry = ITEMS.get(key);
      const isTexto = entry && entry.item.tipo === "texto";
      const wc = $("[data-wc]", q); if (wc) wc.innerHTML = wcLabel(t.value, isTexto);
      if (entry && entry.ctx.mode === "exam") setSimAns(key, { text: t.value }); else saveDraft(key, t.value);
    }
    if (t.matches('input[data-act="sim-score"]')) {
      const key = t.dataset.key;
      st.sim.scores = st.sim.scores || {}; st.sim.scores[key] = +t.value; saveSim();
      const v = document.getElementById("scv-" + key); if (v) v.innerHTML = `<b>${t.value}</b>/${t.max}`;
      updateSimTotal();
    }
    if (t.id === "srch-in") searchUpdate(t.value);
    if (t.id === "ask") { t.style.height = "auto"; t.style.height = Math.min(160, t.scrollHeight) + "px"; }
  });
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape" && modalRoot.innerHTML) closeModal();
    if (((ev.key === "k" && (ev.ctrlKey || ev.metaKey)) || (ev.key === "/" && !/^(INPUT|TEXTAREA|SELECT)$/.test(ev.target.tagName))) && !modalRoot.innerHTML) { ev.preventDefault(); openSearch(); }
    if (ev.target.id === "srch-in" && ev.key === "Enter") { const f = $("#srch-res a"); if (f) { ev.preventDefault(); f.click(); } }
    if (ev.key === "Enter" && QZ && QZ.answered && !modalRoot.innerHTML && !/^(INPUT|TEXTAREA|BUTTON|A)$/.test(ev.target.tagName)) qzNext();
    if (ev.target.id === "ask" && ev.key === "Enter" && !ev.shiftKey) { ev.preventDefault(); const f = ev.target.form; if (f) f.requestSubmit(); }
  });
  document.addEventListener("submit", async (ev) => {
    const f = ev.target;
    if (f.id === "composer") { ev.preventDefault(); const ta = $("#ask"); const v = ta.value; ta.value = ""; sendChat(v); }
    if (f.id === "review-form") { ev.preventDefault(); submitReview(f); }
    if (f.classList.contains("lead-form")) { ev.preventDefault(); submitLead(f); }
    if (f.id === "plan-form") {
      ev.preventDefault();
      const dias = $$('input[name="dias"]:checked', f).map((x) => +x.value);
      if (!dias.length) { $(".plan-msg", f).textContent = "Escolhe pelo menos um dia."; return; }
      const novo = !st.plano;
      st.plano = Object.assign({}, st.plano || {}, { dias, min: +f.min.value, fraco: f.fraco.value });
      store.set("plano", st.plano);
      renderPlano(); enhance(app);
      if (novo) GC.event("plano-criado");
      if (novo && Object.keys(st.res).length >= 5) setTimeout(pedirAvaliacao, 4000);
      if (novo) { window.scrollTo({ top: 0, behavior: "instant" }); const c = $(".today"); if (c) { const [x, y] = centerOf(c); confetti(x, Math.min(y, 300), 30); addXP(20, "plano", x, Math.min(y, 300)); } }
    }
    if (f.id === "login-form") { ev.preventDefault(); submitLogin(f); }
    if (f.id === "code-form") {
      ev.preventDefault();
      const msg = $("#code-msg"), v = $("#code-in").value.trim().toUpperCase();
      if (!v) return;
      try {
        const hsh = await sha256(v);
        if ((C.ACCESS_CODE_HASHES || []).includes(hsh)) { st.unlocked = true; store.set("unlocked", true); GC.event("codigo-ativado"); msg.textContent = "Acesso ativado. Bom estudo!"; setTimeout(() => { closeModal(); route(); }, 900); }
        else msg.textContent = "Código inválido. Confirma se o escreveste bem.";
      } catch (e) { msg.textContent = "Não foi possível validar o código neste navegador."; }
    }
  });

  /* ---------- arranque ---------- */
  function renderDemoBar() {
    const bar = document.getElementById("demo-bar");
    if (!C.MODO_DEMO) { bar.hidden = true; return; }
    bar.hidden = false;
    bar.innerHTML = previewFree
      ? `A ver como aluno do plano grátis (limites ativos). <button type="button" data-act="demo-free">Desbloquear tudo</button><button type="button" data-act="demo-reset">Repor contadores</button>`
      : `Versão de demonstração: tudo desbloqueado. <button type="button" data-act="demo-free">Ver como aluno grátis</button>`;
  }
  renderDemoBar();
  $$("[data-lince]").forEach((el) => { el.outerHTML = lince(); });
  renderXpChip(false);
  aplicarTema();
  document.getElementById("foot").innerHTML = `
    <div class="row" style="justify-content:space-between"><a class="logo" href="#inicio">${lince()}<span>Nota<b>20</b></span></a>
      <span class="row small"><a href="#plano">Plano</a><a href="#estudar">Estudar</a><a href="#desafio">Desafio do dia</a><a href="#revisao">Revisão</a><a href="#treino">Treino</a><a href="#exames">Exames</a><a href="#simulado">Simulados</a><a href="#cabula">Cábula</a><a href="#pais">Para pais</a><a href="#parcerias">Parcerias</a><a href="#duvidas">Dúvidas</a><a href="#precos">Preços</a><a href="resumos/">Resumos</a><a href="#termos">Termos e privacidade</a><a href="${LRE}" target="_blank" rel="noopener">Livro de Reclamações</a></span></div>
    <p class="small" style="margin:0">A Nota20 não tem ligação ao EduQA (antigo IAVE), ao Ministério da Educação${CRIADOR ? " nem ao Instituto Superior Técnico" : ""}. Os enunciados e critérios oficiais pertencem ao EduQA (antigo IAVE) e são apresentados por ligação; as resoluções são propostas da Nota20.</p>
    ${contactosHTML()}
    <button class="tema-btn" type="button" data-act="tema">${ic("moon")}<span data-tema-lab>Tema escuro</span></button>`;
  aplicarTema();
  HIST.iniciar();
  window.addEventListener("hashchange", route);
  route();
  chipConta();
  chipInstalar();
  { let pst = null; const upd = () => { pst = null; document.body.classList.toggle("promo-scrolled", window.scrollY > 520); }; window.addEventListener("scroll", () => { if (!pst) pst = requestAnimationFrame(upd); }, { passive: true }); upd(); }
  CONTA.arranque().then(() => {
    const ok = CONTA.voltouGoogle === true || ssGet("n20:google-ok") === "1";
    if (ok) {
      ssSet("n20:google-ok", "");
      if (ssGet("n20:pos-login") === "comprar" && C.PAYMENT_LINK && !unlocked()) { ssSet("n20:pos-login", ""); location.href = payHref(); return; }
      toast(`<span class="tl">${lince()}</span><div><b>Sessão iniciada</b><span>O teu progresso fica guardado na conta.</span></div>`, 5000);
    } else if (CONTA.voltouGoogle === "erro") toast(`<span class="tl">${lince()}</span><div><b>Não foi possível entrar com a Google</b><span>Tenta outra vez ou usa o código por email.</span></div>`);
  }).then(regressoPagamento);
  { const pp = new URLSearchParams(location.search).get("p"); if (pp) usarParceiro(pp.slice(0, 40), false); }
  { const cod = new URLSearchParams(location.search).get("codigo"); if (cod) abrirCodigo(cod.slice(0, 40)); }
  initReviews();
})();
