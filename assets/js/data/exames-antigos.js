/* Nota20 · Exames nacionais anteriores resolvidos (2025 2.ª fase, 2024 e 2023 1.ª fase)
   Itens parafraseados; propostas de resolução próprias com base nos critérios oficiais do IAVE. */
window.N20 = window.N20 || { topics: [] };
N20.exames = N20.exames || [];

N20.exames.push(
{
  id: "exame-2025-f2",
  ano: 2025, fase: "2.ª fase", versao: "Versão 1", free: false,
  titulo: "Exame Nacional 2025 · 2.ª fase",
  temas: ["Alberto Caeiro", "Padre António Vieira", "Cantiga de amigo", "Apreciação crítica de cartoon"],
  links: {
    enunciado: "https://www.examesnacionais.com.pt/exames-nacionais/12ano/2025-2fase/Portugues_639.pdf",
    criterios: "https://www.examesnacionais.com.pt/exames-nacionais/12ano/2025-2fase/Portugues_639_Criterios.pdf"
  },
  nota: "Resolução da Versão 1. Abre o enunciado oficial ao lado para leres os textos (o artigo do Grupo II e o cartoon estão protegidos por direitos de autor).",
  grupos: [
    { nome: "Grupo I · Educação Literária", partes: [
      { nome: "Parte A · Alberto Caeiro, poema XXXIX («O mistério das cousas…»)", intro: "O sujeito poético interroga-se sobre o «mistério das cousas» e ri-se de quem lhes atribui sentidos ocultos.", itens: [
        { n: "1", obrigatorio: true, tipo: "aberta", topico: "heteronimos",
          enunciado: "As interrogações retóricas da primeira estrofe estão ao serviço da ironia presente no riso do sujeito poético. Explicita os motivos desse riso irónico.",
          resolucao: `<p>O sujeito poético começa por pôr em causa o «mistério das cousas»: se esse mistério existisse, mostrar-se-ia na Natureza, mas nada nela o revela, o que as interrogações retóricas sublinham. O seu <strong>riso irónico</strong> nasce, por isso, da atitude dos outros homens, que, através do pensamento, atribuem às coisas sentidos escondidos, enquanto ele se limita a ver e a sentir. Para Caeiro, procurar significados ocultos é um erro do pensamento, e não uma forma de conhecimento.</p>`,
          criterios: ["Questionamento do «mistério das cousas», que não se manifesta na Natureza.", "Riso irónico perante os homens que atribuem sentidos ocultos pelo pensamento, por oposição aos sentidos.", "Correção linguística."] },
        { n: "2", obrigatorio: true, tipo: "aberta", topico: "heteronimos",
          enunciado: "Explica de que modo o «eu» e os outros homens se distinguem na forma de construir o conhecimento das «cousas».",
          resolucao: `<p>Os outros homens procuram o <strong>«sentido oculto das cousas»</strong>: através da imaginação e do pensamento, acrescentam-lhes significados subjetivos ou simbólicos que elas não têm. O «eu», pelo contrário, defende que o conhecimento vem <strong>apenas dos sentidos</strong>: as coisas valem por aquilo que são e «não têm significação» para além da sua existência concreta. Opõem-se, assim, uma visão intelectualizada e uma visão sensacionista do real.</p>`,
          criterios: ["Os outros: sentido oculto, imaginação/pensamento, significados acrescentados.", "O «eu»: conhecimento só pelos sentidos; as coisas «não têm significação».", "Correção linguística."] },
        { n: "3", obrigatorio: false, tipo: "multi", topico: "heteronimos",
          enunciado: "Identifica as três afirmações sobre a poesia de Alberto Caeiro que se verificam na leitura do poema.",
          opcoes: ["A. Os poemas evidenciam, com frequência, marcas do texto argumentativo.", "B. Na deambulação pelo campo, o sujeito afirma o seu amor pela «Natureza sem gente».", "C. O tempo reduz-se ao instante presente, o que lhe permite fruir a eterna novidade do mundo.", "D. O discurso aproxima-se da fluidez da fala quotidiana, com linguagem simples e repetições sintáticas.", "E. A liberdade formal e o predomínio do presente caracterizam esta poesia."],
          certas: [0, 3, 4],
          explicacao: "Versão 1: A, D e E. As interrogações e a refutação da ideia de «mistério» são marcas argumentativas; a linguagem é simples e repetitiva; o verso é livre e predomina o presente. B e C referem ideias de Caeiro que não aparecem neste poema." }
      ] },
      { nome: "Parte B · Padre António Vieira, Sermão de Santo António e Sermão da Sexagésima", intro: "Os homens perseguem Santo António e os peixes ouvem-no; a referência a Jonas reforça a crítica aos homens.", itens: [
        { n: "4", obrigatorio: true, tipo: "aberta", topico: "vieira",
          enunciado: "Relaciona o sentido da afirmação «Aos homens deu Deus uso de razão…» com o episódio da vida de Santo António narrado no início do excerto.",
          resolucao: `<p>A afirmação estabelece um <strong>contraste</strong> entre o comportamento esperado dos homens, a quem Deus deu razão, e o dos peixes, que não a têm. O episódio de Santo António mostra precisamente o contrário do esperado: os homens, dotados de razão, agem de forma irracional e perseguem o pregador, enquanto os peixes o ouvem com devoção. Vieira usa esta inversão para <strong>criticar os homens</strong>, que se revelam menos dignos do que os animais.</p>`,
          criterios: ["Contraste homens (razão) / peixes (sem razão).", "No episódio, os homens agem irracionalmente (perseguem o santo) e os peixes ouvem-no com devoção.", "Correção linguística."] },
        { n: "5", obrigatorio: true, tipo: "aberta", topico: "vieira",
          enunciado: "Interpreta a afirmação «Os homens tiveram entranhas…», tendo em conta o jogo entre o sentido literal e o sentido figurado de «entranhas».",
          resolucao: `<p>No episódio de Jonas, os homens mostram <strong>maldade</strong> ao lançá-lo ao mar, enquanto o peixe o salva e o leva até Nínive. Vieira joga com os dois sentidos de «entranhas»: em relação aos homens, a palavra tem <strong>sentido figurado</strong> (coragem para fazer o mal, crueldade, baixeza); em relação ao peixe, tem <strong>sentido literal</strong>, as vísceras do animal, onde Jonas foi guardado e protegido. O peixe revela, assim, mais humanidade do que os homens.</p>`,
          criterios: ["Maldade dos homens (lançam Jonas ao mar) vs. o peixe que o salva.", "«Entranhas»: sentido figurado nos homens; sentido literal no peixe.", "Correção linguística."] },
        { n: "6", obrigatorio: false, tipo: "completar", topico: "vieira",
          enunciado: "Completa as afirmações sobre as estratégias do orador.",
          sub: [
            { label: "a) Nas linhas 4-5, para evidenciar a intenção crítica, o orador recorre à…", opcoes: ["apóstrofe e à metáfora", "exclamação e à antítese", "anáfora e à personificação"], certa: 1 },
            { label: "b) A referência a Jonas funciona como…", opcoes: ["argumento de autoridade", "tese defendida pelo orador", "exemplo bíblico"], certa: 2 }
          ],
          explicacao: "Versão 1: a) 2; b) 3. O episódio de Jonas é um exemplo bíblico que confirma a crítica aos homens." }
      ] },
      { nome: "Parte C · Exposição", itens: [
        { n: "7", obrigatorio: true, tipo: "aberta", topico: "trovadoresca",
          enunciado: "Numa breve exposição, compara a representação da Natureza na poesia de Alberto Caeiro e na cantiga de amigo de Martim Codax (dois aspetos de distinção).",
          resolucao: `<p>A Natureza está presente tanto na poesia de Alberto Caeiro como na cantiga de amigo de Martim Codax, mas é representada de forma muito diferente.</p><p>Em primeiro lugar, Caeiro sente-se <strong>parte da Natureza</strong>, que conhece de forma objetiva, através dos sentidos, sem lhe atribuir significados. Na cantiga, pelo contrário, a Natureza é <strong>exterior</strong> à donzela e surge de forma subjetiva. Em segundo lugar, na cantiga as ondas são <strong>personificadas</strong> e tornam-se interlocutoras e confidentes da donzela, a quem ela se dirige, ao passo que, para Caeiro, as coisas são apenas o que se vê e não falam nem escondem sentidos.</p><p>Em suma, se na cantiga a Natureza serve a expressão do sentimento amoroso, em Caeiro ela é a própria realidade, vista sem pensamento.</p>`,
          criterios: ["Introdução sobre o tema.", "Dois aspetos de distinção (pertença vs. exterioridade; objetividade sensorial vs. subjetividade; personificação na cantiga).", "Conclusão; estruturação (3) e correção (2)."] }
      ] }
    ] },
    { nome: "Grupo II · Leitura e Gramática", partes: [
      { nome: "Pedro Mexia, «Camões em Macau», Lá Fora (2018)", intro: "A «Gruta de Camões» em Macau, vista por Wenceslau de Moraes, e a conferência de Camilo Pessanha (1924) sobre a inspiração poética longe da pátria.", itens: [
        { n: "1", obrigatorio: true, tipo: "mc", topico: "leitura", enunciado: "A chamada Gruta de Camões, em Macau, surpreende porque…", opcoes: ["o nome do poeta lhe está associado.", "se destaca na aridez quase uniforme da costa.", "foi descrita por Wenceslau de Moraes.", "é uma zona indistinta da frente marítima."], certa: 1, explicacao: "A surpresa vem do contraste com a costa árida e uniforme." },
        { n: "2", obrigatorio: true, tipo: "mc", topico: "leitura", enunciado: "Em contexto, a sequência «E, no entanto» introduz um contraste entre…", opcoes: ["a pequenez do domínio português e a vastidão dos horizontes.", "a vida tranquila de Camões e a calma do jardim.", "a insignificância das referências a Camões e o encanto que o jardim desperta.", "a verdade dos factos e a objetividade da descrição."], certa: 2, explicacao: "«No entanto» opõe o pouco que se sabe/refere de Camões ao fascínio que o lugar provoca." },
        { n: "3", obrigatorio: false, tipo: "mc", topico: "leitura", enunciado: "Na conferência de 1924, Camilo Pessanha defende que…", opcoes: ["o génio poético está ligado a uma relação profunda com a terra natal.", "a inspiração se intensifica longe da pátria.", "a inspiração de Camões se explica apenas pela saudade.", "o génio de Camões é moldado pelo sentimento nacionalista."], certa: 0, explicacao: "Pessanha liga a inspiração ao «húmus do solo natal»." },
        { n: "4", obrigatorio: false, tipo: "mc", topico: "coesao", enunciado: "Em «tal como o encontrou» e em «uma qualquer grandeza, e essa grandeza», a coesão é assegurada, respetivamente, por…", opcoes: ["substituição lexical e reiteração lexical.", "referência gramatical e coesão frásica.", "substituição lexical e coesão frásica.", "referência gramatical e reiteração lexical."], certa: 3, explicacao: "O pronome «o» retoma um referente (coesão gramatical referencial); «grandeza… essa grandeza» repete a palavra (reiteração lexical)." },
        { n: "5", obrigatorio: true, tipo: "mc", topico: "aspeto-modalidade", enunciado: "Em «que deambulava por aquelas bandas e se refugiava», exprimem-se em simultâneo…", opcoes: ["valor perfetivo e situação habitual.", "valor imperfetivo e situação genérica.", "situação habitual e valor imperfetivo.", "situação genérica e valor perfetivo."], certa: 2, explicacao: "O pretérito imperfeito indica uma ação repetida por hábito e não concluída: habitual + imperfetivo." },
        { n: "6", obrigatorio: true, tipo: "mc", topico: "funcoes-sintaticas", enunciado: "A única expressão que desempenha a função de complemento oblíquo é…", opcoes: ["«de arestas musgosas»", "«de Macau»", "«dos tufões»", "«da faceta “patriótica”»"], certa: 3, explicacao: "É a única selecionada por um verbo e introduzida por preposição; as outras modificam ou completam nomes." },
        { n: "7", obrigatorio: false, tipo: "mc", topico: "oracoes", enunciado: "A oração introduzida por «que» (l. 20) e a introduzida por «uma vez que» (l. 26) são, respetivamente, subordinadas…", opcoes: ["adjetiva relativa restritiva e adverbial concessiva.", "adjetiva relativa explicativa e adverbial causal.", "adjetiva relativa restritiva e adverbial causal.", "adjetiva relativa explicativa e adverbial concessiva."], certa: 1, explicacao: "A relativa vem entre vírgulas (explicativa); «uma vez que» introduz uma causa." }
      ] }
    ] },
    { nome: "Grupo III · Escrita", partes: [
      { nome: "Apreciação crítica do cartoon «Reflorestação», de Victor Solís (200 a 350 palavras)", itens: [
        { n: "III", obrigatorio: true, tipo: "texto", cotacao: 44, generoAlvo: "apreciação crítica", topico: "apreciacao-critica",
          enunciado: "Escreve uma apreciação crítica do cartoon «Reflorestação», de Victor Solís (ver enunciado oficial): descrição da cena e dos elementos significativos, comentário crítico com pelo menos três aspetos, em discurso valorativo, e conclusão.",
          resolucao: `<p><strong>Plano</strong></p><ol><li><strong>Descrição</strong>: o que mostra a cena, onde está o foco, que contraste se vê entre os elementos.</li><li><strong>Aspeto 1</strong>: a crítica central (a relação do ser humano com a floresta e com a «reflorestação» anunciada).</li><li><strong>Aspeto 2</strong>: o recurso que torna o cartoon eficaz (ironia do título, símbolo, exagero).</li><li><strong>Aspeto 3</strong>: a atualidade do tema e o efeito no leitor.</li><li><strong>Conclusão</strong>: juízo global coerente.</li></ol><p>Mantém-te entre 200 e 350 palavras e usa vocabulário avaliativo (contundente, irónico, pertinente).</p>`,
          criterios: ["A: descrição + ≥3 aspetos + discurso valorativo + conclusão.", "B: pertinência e argumentação eficaz.", "C: organização e coesão.", "CL: correção linguística (14)."] }
      ] }
    ] }
  ]
},
{
  id: "exame-2024-f1",
  ano: 2024, fase: "1.ª fase", versao: "Versão 1", free: false,
  titulo: "Exame Nacional 2024 · 1.ª fase",
  temas: ["Camilo Castelo Branco", "Álvaro de Campos", "Roger Scruton, a beleza", "Texto de opinião"],
  links: {
    enunciado: "https://www.examesnacionais.com.pt/exames-nacionais/12ano/2024-1fase/Portugues_639.pdf",
    criterios: "https://www.examesnacionais.com.pt/exames-nacionais/12ano/2024-1fase/Portugues_639_Criterios.pdf"
  },
  nota: "Resolução da Versão 1. Os excertos de Camilo (Coração, Cabeça e Estômago) e de Álvaro de Campos estão no enunciado oficial; o texto do Grupo II está protegido por direitos de autor.",
  grupos: [
    { nome: "Grupo I · Educação Literária", partes: [
      { nome: "Parte A · Camilo Castelo Branco, Coração, Cabeça e Estômago", intro: "Um narrador que se esforça, de forma ridícula, por parecer um herói romântico, pálido e doente.", itens: [
        { n: "1", obrigatorio: true, tipo: "aberta", topico: "amor-perdicao",
          enunciado: "As palavras «a farsa em que eu a mim próprio me estava dando em espetáculo» mostram que o protagonista quer projetar uma imagem que não corresponde à realidade. Explicita em que consiste essa imagem.",
          resolucao: `<p>O protagonista tenta construir a imagem de um <strong>herói romântico doente e abatido</strong>. Por um lado, procura <strong>disfarçar a sua saúde</strong>, que considera um defeito («a minha cara sadia»), chegando a querer «remediar o infortúnio de ter saúde». Por outro lado, quer parecer um <strong>«génio»</strong> atormentado, criando uma aparência física que reflita «a imagem da [sua] alma». Essa imagem é, portanto, uma «farsa» construída para impressionar os outros.</p>`,
          criterios: ["Disfarçar a saúde, construindo a imagem de alguém doente.", "Parecer um «génio» abatido, refletindo «a imagem da minha alma».", "Correção linguística."] },
        { n: "2", obrigatorio: true, tipo: "aberta", topico: "amor-perdicao",
          enunciado: "O texto faz um retrato humorístico do herói romântico. Apresenta dois aspetos que evidenciem a dimensão cómica do excerto.",
          resolucao: `<p>Um primeiro aspeto cómico é o <strong>exagero do ritual com o cabelo</strong>, a que o narrador se dedica para «dar à cabeça um ar fatal». Outro é o <strong>absurdo de considerar a saúde um «infortúnio»</strong> e de tentar disfarçá-la, chegando a fumar charutos com «formal estupidez» ou a pedir ao médico um medicamento que lhe provocasse olheiras. O humor nasce do contraste entre a seriedade com que o narrador age e o ridículo dos seus atos.</p>`,
          criterios: ["Dois de: ritual capilar exagerado; barbear a testa; saúde como infortúnio; fumar charutos; pedir medicamento para olheiras.", "Correção linguística."] },
        { n: "3", obrigatorio: false, tipo: "completar", topico: "amor-perdicao",
          enunciado: "Completa as afirmações sobre o excerto.",
          sub: [
            { label: "a) No primeiro parágrafo, expressões como «Comecei», «todos os dias», «depois», «a pouco e pouco» e «até que» servem para…", opcoes: ["ilustrar as exigências sistemáticas de manter a imagem", "organizar a sequência, mostrando os efeitos naturais da passagem do tempo", "relatar o processo seguido para conseguir a transformação física"], certa: 2 },
            { label: "b) No final, com «Era a natureza a vingar-se.», o narrador…", opcoes: ["conclui, metaforicamente, que levou longe demais o desejo de mudar", "realça, ironicamente, que a mudança forjada foi de pouca dura", "exprime, hiperbolicamente, a convicção de que a natureza pode ser enganada"], certa: 1 }
          ],
          explicacao: "Versão 1: a) 3; b) 2. Os conectores temporais marcam as etapas do processo de transformação; o final é irónico: a natureza desfaz a farsa." }
      ] },
      { nome: "Parte B · Álvaro de Campos (poema sobre a máscara)", intro: "O sujeito poético tira a máscara, vê-se ao espelho e decide voltar a pô-la.", itens: [
        { n: "4", obrigatorio: true, tipo: "aberta", topico: "heteronimos",
          enunciado: "Explica a importância da máscara na construção da dualidade do sujeito poético.",
          resolucao: `<p>A máscara instala um jogo entre <strong>ser e parecer</strong>, entre o passado e o presente: oculta o «eu» da infância, que só reaparece quando ela é retirada. Ao mesmo tempo, essa duplicidade permite ao sujeito <strong>preservar o seu ser autêntico</strong> e, em simultâneo, desempenhar o papel social que a máscara representa. A máscara é, assim, o elemento que separa e une as duas faces do sujeito.</p>`,
          criterios: ["A máscara oculta o eu da infância (ser/parecer, passado/presente).", "Permite manter o ser autêntico e desempenhar o papel social.", "Correção linguística."] },
        { n: "5", obrigatorio: true, tipo: "aberta", topico: "heteronimos",
          enunciado: "Depois de tirar a máscara, o sujeito poético decide voltar a pô-la. Justifica essa opção com dois aspetos.",
          resolucao: `<p>O sujeito volta a pôr a máscara porque a criança que ela esconde representa a <strong>vulnerabilidade</strong> da infância, que ele não quer expor. Além disso, sente-se <strong>mais confortável com a máscara</strong>, que lhe dá a imagem de alguém «normal», adaptado às convenções sociais. Essa normalidade, o «términus de linha», é o ponto de chegada de uma viagem de autoconhecimento que implica aceitar o presente.</p>`,
          criterios: ["Dois de: vulnerabilidade da infância; conforto da imagem «normal»; normalidade como aceitação do presente e das convenções.", "Correção linguística."] },
        { n: "6", obrigatorio: false, tipo: "multi", topico: "heteronimos",
          enunciado: "Identifica as três afirmações verdadeiras sobre o poema.",
          opcoes: ["I. Olhar-se ao espelho sugere o desejo de autoconhecimento.", "II. O sujeito anseia por reviver a infância.", "III. A coexistência de versos longos e curtos contribui para o ritmo do poema.", "IV. As reticências do verso 3 assinalam a frustração do sujeito.", "V. O texto mostra marcas da linguagem de Campos, como a liberdade formal e a anáfora."],
          certas: [0, 2, 4],
          explicacao: "Versão 1: I, III e V." }
      ] },
      { nome: "Parte C · Exposição", itens: [
        { n: "7", obrigatorio: true, tipo: "aberta", topico: "exposicao",
          enunciado: "Numa breve exposição, compara os textos das Partes A e B quanto à imagem que cada sujeito dá de si (um aspeto de aproximação e um de distinção).",
          resolucao: `<p>O narrador de Camilo e o sujeito poético de Álvaro de Campos constroem ambos uma imagem de si que não coincide com aquilo que são.</p><p>Aproximam-se porque ambos agem <strong>de forma consciente e voluntária</strong>, escondendo o verdadeiro «eu». Distinguem-se, porém, naquilo que ocultam: o narrador de Camilo quer disfarçar a <strong>aparência física</strong> saudável para parecer um homem romântico, enquanto o sujeito de Campos encobre uma <strong>realidade psicológica</strong>, o «eu» da infância, mostrando aos outros um ser social.</p><p>Assim, num caso a máscara é exterior e cómica; no outro, é interior e existencial.</p>`,
          criterios: ["Introdução.", "Aproximação: atitude consciente; o verdadeiro eu fica oculto.", "Distinção: aparência física (Camilo) vs. realidade psicológica (Campos).", "Conclusão; estruturação e correção."] }
      ] }
    ] },
    { nome: "Grupo II · Leitura e Gramática", partes: [
      { nome: "Roger Scruton, Beleza: Uma Muito Breve Introdução (2023)", intro: "A beleza toca-nos profundamente; o autor pergunta se os juízos de beleza têm fundamento racional e critica o relativismo que enfraqueceu as humanidades.", itens: [
        { n: "1", obrigatorio: true, tipo: "mc", topico: "leitura", enunciado: "Segundo o autor, não é possível ser indiferente à beleza porque…", opcoes: ["ela se manifesta sempre que quem a observa entende o que comunica.", "está inequivocamente associada a valores reconhecidos pela sociedade.", "tem um caráter simultaneamente sagrado e profano.", "todos os seres humanos a interpretam da mesma forma."], certa: 0, explicacao: "Versão 1: A." },
        { n: "2", obrigatorio: true, tipo: "mc", topico: "leitura", enunciado: "As interrogações retóricas do segundo e terceiro parágrafos servem uma estratégia argumentativa que visa…", opcoes: ["exprimir as dúvidas do autor.", "suscitar a reflexão sobre o tema.", "embelezar estilisticamente o discurso.", "contestar o conceito de beleza."], certa: 1, explicacao: "A interrogação retórica leva o leitor a pensar no problema." },
        { n: "3", obrigatorio: false, tipo: "mc", topico: "leitura", enunciado: "Segundo o texto, a atual «crise das humanidades» deve-se…", opcoes: ["à rejeição do relativismo dos juízos subjetivos.", "à subordinação dos juízos de valor ao património.", "à desvalorização do rigor crítico que devia orientar o juízo estético.", "à recusa do espírito cético que contesta a beleza."], certa: 2, explicacao: "Versão 1: C." },
        { n: "4", obrigatorio: false, tipo: "mc", topico: "recursos-expressivos", enunciado: "«qual voz de um amigo íntimo» e «alicerces racionais» contêm, respetivamente…", opcoes: ["uma metonímia e uma hipérbole.", "uma comparação e uma metáfora.", "uma comparação e uma metonímia.", "uma metonímia e uma comparação."], certa: 1, explicacao: "«qual» funciona como conector comparativo; «alicerces racionais» é metáfora (fundamentos)." },
        { n: "5", obrigatorio: true, tipo: "mc", topico: "coesao", enunciado: "Todas as expressões contribuem para a coesão interfrásica, exceto…", opcoes: ["«Além disso»", "«Todavia»", "«No entanto»", "«Esta atitude»"], certa: 3, explicacao: "«Esta atitude» retoma um referente: é coesão referencial (e lexical), não um conector." },
        { n: "6", obrigatorio: true, tipo: "mc", topico: "funcoes-sintaticas", enunciado: "Todos os constituintes sublinhados são complementos do adjetivo, exceto em…", opcoes: ["«indiferentes à beleza»", "«incapazes de a perceber»", "«juízos de beleza»", "«inferior a outro»"], certa: 2, explicacao: "«juízos» é um nome: «de beleza» é complemento do nome." },
        { n: "7", obrigatorio: false, tipo: "mc", topico: "oracoes", enunciado: "A palavra «que», nas linhas 12 e 19, é…", opcoes: ["pronome no primeiro caso e conjunção no segundo.", "pronome em ambos os casos.", "conjunção em ambos os casos.", "conjunção no primeiro caso e pronome no segundo."], certa: 3, explicacao: "Versão 1: D. Teste: o «que» relativo tem antecedente e equivale a «o qual»; o «que» conjunção introduz completivas." }
      ] }
    ] },
    { nome: "Grupo III · Escrita", partes: [
      { nome: "Texto de opinião (200 a 350 palavras)", itens: [
        { n: "III", obrigatorio: true, tipo: "texto", cotacao: 44, generoAlvo: "texto de opinião", topico: "texto-opiniao",
          enunciado: "Diz-se que as pessoas usam as redes sociais para se mostrarem ao mundo ou para se esconderem atrás de uma imagem falsa, e que ambas são formas questionáveis de comunicar. Escreve um texto de opinião com dois argumentos, cada um com um exemplo, e conclusão.",
          resolucao: `<p><strong>Plano</strong></p><ol><li><strong>Tese</strong> (ex.: as redes não são o problema; a forma de as usar é que pode tornar a comunicação falsa).</li><li><strong>Argumento 1 + exemplo</strong>: a exposição constante cria uma vida editada (filtros, «melhores momentos») e comparações injustas.</li><li><strong>Argumento 2 + exemplo</strong>: as redes também dão voz e ligam pessoas (campanhas solidárias, comunidades de interesse, artistas que se dão a conhecer).</li><li><strong>Conclusão</strong>: comunicar com autenticidade depende de quem publica, não da plataforma.</li></ol>`,
          criterios: ["A: ponto de vista + 2 argumentos + 2 exemplos + juízos de valor + conclusão.", "B, C e CL como no texto de opinião."] }
      ] }
    ] }
  ]
},
{
  id: "exame-2023-f1",
  ano: 2023, fase: "1.ª fase", versao: "Versão 1", free: false,
  titulo: "Exame Nacional 2023 · 1.ª fase",
  temas: ["Saramago (Ricardo Reis e Memorial)", "Camões lírico", "Cantiga de amor", "Texto de opinião"],
  links: {
    enunciado: "https://www.examesnacionais.com.pt/exames-nacionais/12ano/2023-1fase/Portugues_639.pdf",
    criterios: "https://www.examesnacionais.com.pt/exames-nacionais/12ano/2023-1fase/Portugues_639_Criterios.pdf"
  },
  nota: "Resolução da Versão 1. Os excertos de Saramago e o texto do Grupo II estão protegidos por direitos de autor: lê-os no enunciado oficial.",
  grupos: [
    { nome: "Grupo I · Educação Literária", partes: [
      { nome: "Parte A · Saramago: O Ano da Morte de Ricardo Reis e Memorial do Convento", intro: "Marcenda (mão esquerda paralisada) janta com o pai no hotel; Baltasar (sem a mão esquerda) trabalha com Blimunda na passarola.", itens: [
        { n: "1", obrigatorio: true, tipo: "aberta", topico: "saramago",
          enunciado: "Compara, com base em dois aspetos, a forma como Marcenda e Baltasar reagem à impossibilidade de usar a mão esquerda.",
          resolucao: `<p>Marcenda e Baltasar reagem de forma oposta à sua limitação. Marcenda tem uma <strong>atitude passiva</strong>: a mão esquerda permanece imóvel, «como se estivesse morta», e ela parece resignada, precisando de ajuda até para se alimentar. Baltasar, pelo contrário, é <strong>pró-ativo</strong>: «faz da sua fraqueza força», usa o espigão e o gancho que substituem a mão e trabalha na construção da passarola. Enquanto ela se submete à limitação, ele supera-a.</p>`,
          criterios: ["Passividade de Marcenda vs. pró-atividade de Baltasar (trabalha na passarola).", "Resignação de Marcenda (precisa de ajuda) vs. Baltasar que usa o espigão e o gancho.", "Correção linguística."] },
        { n: "2", obrigatorio: true, tipo: "aberta", topico: "saramago",
          enunciado: "A partir do tratamento dado ao pai e à filha no hotel, conclui que são clientes habituais. Apresenta duas evidências.",
          resolucao: `<p>Percebe-se que são clientes habituais, em primeiro lugar, porque o criado os trata com <strong>familiaridade</strong>, sendo «familiar de modos». Em segundo lugar, a comida de Marcenda <strong>chega já preparada da copa</strong> para que ela a possa comer sem esforço: o peixe sem espinhas, a carne cortada e a fruta descascada, o que mostra que o hotel conhece a sua limitação.</p>`,
          criterios: ["O criado é «familiar de modos».", "A comida chega preparada (peixe sem espinhas, carne cortada, fruta descascada).", "Correção linguística."] },
        { n: "3", obrigatorio: true, tipo: "aberta", topico: "saramago",
          enunciado: "Explica em que medida as expressões «Tu és Sete-Sóis porque vês às claras, tu serás Sete-Luas porque vês às escuras» e «Lua onde estás, Sol aonde vais» evidenciam a relação entre Baltasar e Blimunda.",
          resolucao: `<p>As expressões mostram que Baltasar e Blimunda são <strong>complementares</strong>: tal como o Sol e a Lua, formam um todo e não existem um sem o outro. Essa união revela-se também no trabalho em comum: Blimunda colabora na construção da passarola, cuidando de Baltasar e usando o dom de ver o interior dos corpos e dos materiais para escolher o que serve à máquina.</p>`,
          criterios: ["Sol e Lua: complementaridade, um todo.", "Colaboração de Blimunda na passarola (dom de ver por dentro).", "Correção linguística."] }
      ] },
      { nome: "Parte B · Luís de Camões, soneto «Quem vê, Senhora, claro e manifesto»", itens: [
        { n: "4", obrigatorio: true, tipo: "aberta", topico: "camoes-lirico",
          enunciado: "Explicita, com dois aspetos, a reação do sujeito poético à figura feminina, fundamentando com transcrições.",
          resolucao: `<p>O sujeito poético revela, por um lado, <strong>fascínio</strong> pela beleza da Senhora, em especial dos olhos, ao referir «o lindo ser de vossos olhos belos». Por outro lado, mostra <strong>submissão e veneração</strong>, entregando-lhe tudo o que é e tem: «tudo quanto tenho, tudo é vosso». Essa entrega é vivida como <strong>felicidade</strong>, uma «bem-aventurança».</p>`,
          criterios: ["Dois de: fascínio pela beleza dos olhos; veneração/submissão; felicidade pela entrega.", "Transcrição pertinente para cada aspeto.", "Correção linguística."] },
        { n: "5", obrigatorio: false, tipo: "multi", topico: "camoes-lirico",
          enunciado: "Identifica as duas afirmações falsas sobre o soneto.",
          opcoes: ["A. O sujeito poético dirige-se à Senhora através de uma apóstrofe.", "B. «perder a vista» tem sentido metafórico.", "C. O sujeito lamenta desejar algo cujo preço elevado o impede de saldar a dívida.", "D. O poema mostra o estilo engenhoso do poeta, sobretudo no último terceto (antítese e paralelismo).", "E. Existe uma relação de igualdade entre a Senhora e o sujeito poético."],
          certas: [2, 4],
          explicacao: "Versão 1: C e E são falsas. O sujeito não lamenta o preço (vive-o como felicidade) e coloca-se numa posição de submissão, não de igualdade." },
        { n: "6", obrigatorio: false, tipo: "mc", topico: "camoes-lirico",
          enunciado: "Na segunda quadra, o sujeito poético pretende enfatizar…",
          opcoes: ["a sua entrega incondicional, para ser merecedor de admirar a beleza dos olhos da Senhora.", "o descontentamento por ter de pagar o «preço honesto».", "o contraste entre o preço a pagar e a bem-aventurança alcançada.", "que, ao dar a vida e a alma, se iguala aos outros."],
          certa: 0, explicacao: "Versão 1: A." }
      ] },
      { nome: "Parte C · Exposição", itens: [
        { n: "7", obrigatorio: true, tipo: "aberta", topico: "trovadoresca",
          enunciado: "Numa breve exposição, compara o soneto de Camões e a cantiga de amor «A dona que eu am'e tenho por senhor» quanto às ideias expressas (um aspeto de aproximação e um de distanciamento).",
          resolucao: `<p>O soneto de Camões e a cantiga de amor medieval tratam ambos o amor por uma mulher idealizada, mas de forma diferente.</p><p>Aproximam-se na <strong>devoção total à amada</strong> e no enaltecimento da sua beleza: no soneto, o sujeito afirma que «tudo é vosso»; na cantiga, ama a dona «mais do que a si mesmo». Afastam-se, porém, na forma de viver esse amor: no soneto, a entrega é vivida com <strong>prazer e felicidade</strong>, enquanto na cantiga domina a <strong>coita d'amor</strong>, o sofrimento que leva o sujeito a pedir a morte se não puder ver a amada.</p><p>Assim, a mesma devoção traduz-se em bem-aventurança em Camões e em sofrimento na lírica trovadoresca.</p>`,
          criterios: ["Introdução.", "Aproximação: devoção total / enaltecimento da beleza.", "Distinção: entrega feliz (soneto) vs. coita d'amor (cantiga).", "Conclusão; estruturação e correção."] }
      ] }
    ] },
    { nome: "Grupo II · Leitura e Gramática", partes: [
      { nome: "David Sobral, Qual É o Nosso Lugar no Universo? (2022)", intro: "Texto de divulgação científica: a poluição luminosa afasta-nos do céu; reconhecer a nossa pequenez no Universo traz humildade.", itens: [
        { n: "1", obrigatorio: true, tipo: "mc", topico: "leitura", enunciado: "Segundo o autor, olhar o céu estrelado…", opcoes: ["capta uma beleza que nem a luz artificial impede.", "depende do contexto em que se encontra quem observa.", "é impossível de concretizar plenamente, seja onde for.", "está acessível a quem olhe o céu das cidades."], certa: 1, explicacao: "A experiência depende do lugar (poluição luminosa nas cidades)." },
        { n: "2", obrigatorio: false, tipo: "mc", topico: "leitura", enunciado: "Da expressão «estranho e paradoxal» depreende-se que…", opcoes: ["o ser humano sabe cada vez mais, mas não olha o céu, onde poderia encontrar respostas.", "a luz artificial é compatível com a observação da Via Láctea.", "o conhecimento das origens torna irrelevante observar o céu.", "a tecnologia dispensa olhar as estrelas."], certa: 0, explicacao: "O paradoxo: mais conhecimento, menos contacto com o céu." },
        { n: "3", obrigatorio: true, tipo: "mc", topico: "leitura", enunciado: "Os estudos sobre o Universo permitiram…", opcoes: ["a esperança de nos tornarmos eternos.", "evidenciar dúvidas sobre a importância da nossa origem.", "mostrar a desproporção entre a imensidão do Universo e a pequenez humana.", "constatar a importância do ser humano no Universo."], certa: 2, explicacao: "O texto sublinha a nossa insignificância à escala cósmica." },
        { n: "4", obrigatorio: false, tipo: "mc", topico: "recursos-expressivos", enunciado: "O recurso que destaca a relação entre o ser humano e o Universo é…", opcoes: ["metáfora em «manto escuro».", "metáfora em «nossa própria casa celeste».", "hipérbole em «manto escuro».", "hipérbole em «nossa própria casa celeste»."], certa: 1, explicacao: "Chamar ao céu «casa» aproxima o Universo do ser humano: metáfora." },
        { n: "5", obrigatorio: true, tipo: "mc", topico: "funcoes-sintaticas", enunciado: "O pronome «nos» NÃO é complemento direto em…", opcoes: ["«nos compõe»", "«nos tornam»", "«nos manter»", "«nos dizem»"], certa: 3, explicacao: "Dizer algo a alguém: «nos» é complemento indireto (= a nós)." },
        { n: "6", obrigatorio: true, tipo: "mc", topico: "oracoes", enunciado: "Tal como «que não somos nem estamos de todo no centro do mundo», é subordinada substantiva completiva…", opcoes: ["«de onde vimos»", "«ainda que faltem milhares de milhões de anos»", "«que operamos com as nossas mãos»", "«que, afinal, somos mesmo muito importantes»"], certa: 3, explicacao: "B é concessiva; C é relativa; D completa um verbo e equivale a «isso»." },
        { n: "7", obrigatorio: false, tipo: "mc", topico: "deixis", enunciado: "A única expressão com deíxis temporal, espacial e pessoal é…", opcoes: ["«leva-nos hoje à ideia mais nítida de sempre sobre de onde vimos, como chegámos aqui»", "«Olhar o céu é apontar em direção às nossas origens cósmicas»", "«A nossa viagem em busca das nossas origens… parece ter começado muito, muito cedo»", "«somos total e completamente insignificantes»"], certa: 0, explicacao: "«nos» (pessoal), «hoje» (temporal), «aqui» (espacial)." }
      ] }
    ] },
    { nome: "Grupo III · Escrita", partes: [
      { nome: "Texto de opinião (200 a 350 palavras)", itens: [
        { n: "III", obrigatorio: true, tipo: "texto", cotacao: 44, generoAlvo: "texto de opinião", topico: "texto-opiniao",
          enunciado: "Partindo da ideia de David Sobral de que vivemos de olhos postos nos ecrãs, isolados num mundo globalmente ligado mas desligado, escreve um texto de opinião sobre o impacto da tecnologia nas relações humanas (dois argumentos com exemplos e conclusão).",
          resolucao: `<p>Este tema é muito próximo do exercício do tópico <a href="#t-texto-opiniao">Texto de opinião</a>, onde tens um texto-modelo completo sobre se a tecnologia nos aproxima ou nos afasta. Estrutura: tese clara, dois argumentos com exemplos concretos (videochamadas que mantêm laços à distância; amigos à mesa cada um no seu ecrã) e conclusão.</p>`,
          criterios: ["A: tese + 2 argumentos + 2 exemplos + juízos de valor + conclusão.", "B, C e CL."] }
      ] }
    ] }
  ]
}
);
