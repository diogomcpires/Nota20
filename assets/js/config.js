/* ============================================================
   Nota20 · configuração
   Muda aqui o nome, os preços e as ligações sem mexer no resto.
   ============================================================ */
window.N20_CONFIG = {
  MARCA: "Nota20",
  DISCIPLINA: "Português",
  PROVA: "639",

  /* true = tudo desbloqueado e aparece a faixa "versão de demonstração".
     Põe false quando ligares os pagamentos. */
  MODO_DEMO: false,

  /* Preços (pagamento único). Se anunciares um preço de lançamento,
     sobe mesmo o preço na data indicada. */
  PRECO: "19,99 €",
  PRECO_DEPOIS: "29,99 €",
  PROMO_ATE: "31 de dezembro de 2026",
  /* Fim do preço de lançamento (contagem decrescente). Vazio = sem contagem.
     Quando passar, a faixa desaparece: atualiza PRECO para o preço normal. */
  PROMO_FIM: "2026-12-31T23:59:59",
  ACESSO_ATE: "ao fim da 2.ª fase dos exames de 2027",

  /* Dia do exame (1.ª fase). Enquanto o calendário de 2027 não sair,
     é uma estimativa e aparece como "data estimada". */
  EXAME_DATA: "2027-06-15T09:30:00",
  EXAME_DATA_OFICIAL: false,

  /* Quem fez a app. Aparece na página inicial, para pais, preços e perguntas.
     Tem de ser verdade e tens de o conseguir provar se te pedirem. "" = não mostrar. */
  CRIADOR: "Feita por um aluno do Técnico que teve 19,5 no exame de Português",

  /* Garantia de reembolso (dias). Se a anuncias, cumpre-a sempre. 0 = não mostrar. */
  GARANTIA_DIAS: 14,

  /* Link de pagamento (ex.: Stripe Payment Link). Vazio = botão mostra "brevemente". */
  /* Pack IA: +100 perguntas e +20 correções por unidade (quantidade ajustável no Stripe) */
  PACK_LINK: "https://buy.stripe.com/cNifZgcg20tK8rr4ry4c803",
  PACK_PRECO: "2,99 €",
  PAYMENT_LINK: "https://buy.stripe.com/dRmbJ06VIdgw2334ry4c800",

  /* Códigos de acesso (hash SHA-256 em hexadecimal). Ver README para gerar. */
  ACCESS_CODE_HASHES: [],

  /* Explicador e correção com IA fora do Claude: URL do teu proxy
     (ver worker/ai-proxy.js). Vazio = só funciona dentro do Claude. */
  AI_ENDPOINT: "",

  /* Limites do plano grátis (total por aluno, guardado no navegador).
     Ao chegar ao limite aparece o ecrã "desbloqueia o plano Completo". */
  LIMITES_GRATIS: { exercicios: 10, explicador: 3, correcao: 1 },

  /* Recolha de emails (dicas e testadores). URL que recebe um POST em JSON
     {email, origem, tester, at}: por exemplo um formulário do Formspree,
     um webhook do Brevo/Make ou o teu proxy. Vazio = só funciona dentro do Claude
     (guarda na base de dados do artifact); fora dele, a secção não aparece. */
  LEADS_ENDPOINT: "",

  /* Estatísticas anónimas com o GoatCounter (grátis, sem cookies, sem guardar o IP).
     Cria a conta em goatcounter.com e põe aqui o código (ex.: "nota20" para nota20.goatcounter.com).
     Vazio = desligado. Nunca conta dentro do Claude nem no modo de demonstração. */
  GOATCOUNTER: "nota20",

  /* Contas (Supabase): entrar com um código enviado por email, progresso guardado e plano pago.
     O URL e a chave publicável podem estar no site; as chaves secretas ficam só no Supabase. */
  SUPABASE_URL: "https://fvbxunpfziahvfmioxcr.supabase.co",
  SUPABASE_KEY: "sb_publishable_aRi7XdYToIkpQIdTUMA_dQ_Ak5f1fZE",
  /* IA no site (explicador e correção) pela função "ia" do Supabase, só para quem tem conta.
     Liga (true) depois de pores a chave ANTHROPIC_API_KEY nos segredos das Edge Functions. */
  IA_CONTA: true,

  /* Partilhas precisas para o aluno escolher 1 tópico do plano Completo grátis. */
  CONVITES_PARA_TOPICO: 3,

  CONTACTO_EMAIL: "nota20en@gmail.com",
  CONTACTO_INSTAGRAM: "@nota20app",
  CONTACTO_TIKTOK: "@nota20app",

  /* Quem vende: obrigatório por lei antes de começares a vender (aparece em Termos).
     NOME e NIF como estão nas Finanças; MORADA pode ser a do domicílio fiscal. */
  VENDEDOR: { NOME: "", NIF: "", MORADA: "", TELEFONE: "" },
  /* "isento" = regime de isenção do artigo 53.º do CIVA (até 15 000 € por ano);
     "incluido" = o preço já inclui IVA à taxa legal. */
  IVA: "isento",
  /* Métodos de pagamento ativos (só informativo, aparece nos Termos). */
  METODOS_PAGAMENTO: "MB WAY e cartão (Visa, Mastercard, Apple Pay, Google Pay)",
  TERMOS_DATA: "3 de novembro de 2026"
};
