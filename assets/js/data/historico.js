/* Nota20 · Histórico dos exames (2020-2026) e previsão para 2027
   Fonte: enunciados e critérios oficiais do IAVE e do EduQA (10 provas analisadas). */
window.N20 = window.N20 || { topics: [] };

N20.historico = {
  provas: [
    { id: "2020-1", ano: 2020, fase: "1.ª", lit: { "os-maias": "A", "ilustre-casa": "A", "heteronimos": "B", "vieira": "C" }, obras: "Eça (Os Maias, A Ilustre Casa de Ramires) · Ricardo Reis · Vieira", g3: "apreciação crítica", gram: ["funcoes-sintaticas", "oracoes", "palavras"], exame: "exame-2020-f1" },
    { id: "2021-1", ano: 2021, fase: "1.ª", lit: { "heteronimos": "A", "frei-luis": "B", "viagens-minha-terra": "B", "amor-perdicao": "B", "fernao-lopes": "C" }, obras: "Alberto Caeiro · Garrett (Viagens na Minha Terra) e Camilo (Amor de Perdição) · Fernão Lopes", g3: "texto de opinião", gram: ["oracoes", "funcoes-sintaticas", "aspeto-modalidade"], exame: "exame-2021-f1" },
    { id: "2022-1", ano: 2022, fase: "1.ª", lit: { "mensagem": "A", "lusiadas": "B", "frei-luis": "C" }, obras: "Mensagem («D. Sebastião») · Os Lusíadas, I · Frei Luís de Sousa (sebastianismo)", g3: "texto de opinião", gram: ["coesao", "funcoes-sintaticas", "aspeto-modalidade"], exame: "exame-2022-f1" },
    { id: "2023-1", ano: 2023, fase: "1.ª", lit: { "saramago": "A", "camoes-lirico": "B", "trovadoresca": "C" }, obras: "Saramago (Ricardo Reis e Memorial) · Camões lírico · cantiga de amor", g3: "texto de opinião", gram: ["recursos-expressivos", "funcoes-sintaticas", "oracoes", "deixis"], exame: "exame-2023-f1" },
    { id: "2024-1", ano: 2024, fase: "1.ª", lit: { "amor-perdicao": "A", "heteronimos": "B" }, obras: "Camilo (Coração, Cabeça e Estômago) · Álvaro de Campos", g3: "texto de opinião", gram: ["recursos-expressivos", "coesao", "funcoes-sintaticas", "oracoes"], exame: "exame-2024-f1" },
    { id: "2024-2", ano: 2024, fase: "2.ª", lit: { "os-maias": "A", "cidade-serras": "A", "heteronimos": "B" }, obras: "Eça (A Cidade e as Serras) · Ricardo Reis", g3: "texto de opinião", gram: ["aspeto-modalidade", "funcoes-sintaticas", "oracoes"] },
    { id: "2025-1", ano: 2025, fase: "1.ª", lit: { "lusiadas": "A", "mensagem": "B" }, obras: "Os Lusíadas, IV · Mensagem («D. Fernando»)", g3: "texto de opinião", gram: ["deixis", "oracoes", "funcoes-sintaticas", "aspeto-modalidade"], exame: "exame-2025-f1" },
    { id: "2025-2", ano: 2025, fase: "2.ª", lit: { "heteronimos": "A", "vieira": "B", "trovadoresca": "C" }, obras: "Alberto Caeiro · Vieira · cantiga de amigo", g3: "apreciação crítica", gram: ["coesao", "aspeto-modalidade", "funcoes-sintaticas", "oracoes"], exame: "exame-2025-f2" },
    { id: "2026-1", ano: 2026, fase: "1.ª", lit: { "saramago": "A", "cesario": "B" }, obras: "Saramago (Memorial e Ricardo Reis) · Cesário Verde", g3: "apreciação crítica", gram: ["recursos-expressivos", "coesao", "funcoes-sintaticas"], exame: "exame-2026-f1" },
    { id: "2026-2", ano: 2026, fase: "2.ª", lit: { "heteronimos": "A", "poetas-contemporaneos": "A", "frei-luis": "B", "camoes-lirico": "C" }, obras: "Eugénio de Andrade e Alberto Caeiro · Frei Luís de Sousa · Camões lírico (exposição)", g3: "texto de opinião", gram: ["coesao", "aspeto-modalidade", "funcoes-sintaticas", "oracoes"] }
  ],

  /* Previsão 2027: ordem = prioridade de estudo. nivel: 3 muito provável, 2 provável, 1 possível, 0 pouco provável */
  previsao: [
    { topico: "pessoa-ortonimo", nivel: 3, grupo: "I", motivo: "Pessoa saiu em 8 das 10 provas (só faltou nos anos de Saramago), mas a poesia lírica do ortónimo (fora da Mensagem) ainda não saiu em nenhuma delas." },
    { topico: "heteronimos", nivel: 3, grupo: "I", motivo: "É o tema literário mais frequente: 6 das 10 provas (Caeiro, Reis e Campos), incluindo a 2.ª fase de 2026. A última 1.ª fase com heterónimos foi em 2024." },
    { topico: "funcoes-sintaticas", nivel: 3, grupo: "II", motivo: "Saiu em todas as 10 provas. É o item de gramática mais certo." },
    { topico: "oracoes", nivel: 3, grupo: "II", motivo: "Saiu em 8 de 10 provas (completivas, relativas e adverbiais)." },
    { topico: "texto-opiniao", nivel: 2, grupo: "III", motivo: "Saiu em 7 de 10 provas, incluindo a mais recente (2.ª fase de 2026). É o género mais provável, mas treina os dois." },
    { topico: "os-maias", nivel: 2, grupo: "I", motivo: "Eça não sai na 1.ª fase desde 2020 (saiu na 2.ª fase de 2024)." },
    { topico: "aspeto-modalidade", nivel: 2, grupo: "II", motivo: "Saiu em 6 de 10 provas." },
    { topico: "coesao", nivel: 2, grupo: "II", motivo: "Saiu em 5 de 10 provas, quatro delas desde 2024." },
    { topico: "antero", nivel: 1, grupo: "I", motivo: "Nunca saiu nas 10 provas analisadas: é um candidato a surpresa." },
    { topico: "camoes-lirico", nivel: 1, grupo: "I", motivo: "Saiu em 2023 e na Parte C da 2.ª fase de 2026; a lírica de Camões costuma alternar com Os Lusíadas." },
    { topico: "gil-vicente", nivel: 1, grupo: "I", motivo: "Nunca saiu nas provas analisadas; pode surgir na Parte C (exposição)." },
    { topico: "fernao-lopes", nivel: 1, grupo: "I", motivo: "Só saiu na Parte C, em 2021." },
    { topico: "apreciacao-critica", nivel: 1, grupo: "III", motivo: "Saiu em 3 de 10 provas (2020, 2.ª fase de 2025 e 1.ª fase de 2026)." },
    { topico: "recursos-expressivos", nivel: 1, grupo: "II", motivo: "Saiu no Grupo II em 3 de 10 provas, e aparece sempre no Grupo I." },
    { topico: "poetas-contemporaneos", nivel: 1, grupo: "I", motivo: "Saiu pela primeira vez na 2.ª fase de 2026 (Eugénio de Andrade, ao lado de Caeiro): revê os poetas que estudaste nas aulas." },
    { topico: "saramago", nivel: 0, grupo: "I", motivo: "Saiu em 2023 e 2026: o padrão sugere uma pausa." },
    { topico: "mensagem", nivel: 0, grupo: "I", motivo: "Saiu em 2022 e 2025: o padrão sugere uma pausa." },
    { topico: "lusiadas", nivel: 0, grupo: "I", motivo: "Saiu em 2022 e 2025." },
    { topico: "cesario", nivel: 0, grupo: "I", motivo: "Saiu em 2026." }
  ]
};
