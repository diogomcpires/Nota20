/* Nota20 · Exames nacionais de 2020, 2021 e 2022 (1.ª fase) resolvidos
   Itens parafraseados a partir dos enunciados oficiais do IAVE; chaves da Versão 1
   conforme os critérios oficiais. Textos literários em domínio público transcritos;
   os restantes (excertos em prosa, textos do Grupo II, cartoon) ficam no enunciado oficial. */
window.N20 = window.N20 || { topics: [] };
N20.exames = N20.exames || [];

N20.exames.push(
{
  id: "exame-2022-f1",
  ano: 2022, fase: "1.ª fase", versao: "Versão 1", free: false,
  titulo: "Exame Nacional 2022 · 1.ª fase",
  temas: ["Mensagem, «D. Sebastião»", "Os Lusíadas, Canto I", "Sebastianismo (exposição)", "Mário de Carvalho, crónica", "Texto de opinião: heroísmo"],
  links: {
    enunciado: "https://www.examesnacionais.com.pt/exames-nacionais/12ano/2022-1fase/Portugues_639.pdf",
    criterios: "https://iave.pt/wp-content/uploads/2022/06/EX-Port639-F1-2022-CC-VD.pdf"
  },
  nota: "Resolução da Versão 1. Os poemas de Pessoa e de Camões estão transcritos; a crónica do Grupo II está no enunciado oficial (protegida por direitos de autor).",
  grupos: [
    { nome: "Grupo I · Educação Literária", partes: [
      { nome: "Parte A · Fernando Pessoa, Mensagem, «D. Sebastião»",
        texto: `<div class="poem">Esperai! Caí no areal e na hora adversa<br>Que Deus concede aos seus<br>Para o intervalo em que esteja a alma imersa<br>Em sonhos que são Deus.<br><br>Que importa o areal e a morte e a desventura<br>Se com Deus me guardei?<br>É O que eu me sonhei que eterno dura,<br>É Esse que regressarei.</div><p class="src">Fernando Pessoa, Mensagem (ortografia atualizada)</p>`,
        itens: [
          { n: "1", obrigatorio: true, tipo: "aberta", topico: "mensagem",
            enunciado: "Explica o apelo feito na primeira estrofe e, a partir dele, infere os sentimentos do «eu» e do «vós».",
            resolucao: `<p>D. Sebastião pede aos portugueses que <strong>esperem pelo seu regresso</strong> («Esperai!»). A morte no «areal» de Alcácer Quibir não é um fim: é apenas um <strong>«intervalo»</strong>, em que a alma vive «Em sonhos que são Deus». Deste apelo infere-se que o «eu» sente <strong>confiança e certeza</strong> no seu regresso, enquanto o «vós», os portugueses, vive o <strong>desânimo e a descrença</strong>, que o rei procura contrariar com esperança.</p>`,
            criterios: ["Apelo à espera do regresso do rei: a morte é transitória («intervalo») e o sonho é divino.", "«Eu»: confiança/certeza; «vós»: desânimo, descrença ou desespero, que o apelo quer vencer.", "Correção linguística."] },
          { n: "2", obrigatorio: true, tipo: "aberta", topico: "mensagem",
            enunciado: "Identifica, na segunda estrofe, a dimensão histórica e a dimensão mítica do herói, fundamentando cada uma com uma referência textual.",
            resolucao: `<p>A <strong>dimensão histórica</strong> é a do rei que morreu fisicamente na batalha, evocada pelo «areal», pela «morte» e pela «desventura» (v. 5). A <strong>dimensão mítica</strong> é a do herói que, guardado por Deus («Se com Deus me guardei?»), sobrevive como sonho que «eterno dura» e que há de regressar; as maiúsculas em «O» e «Esse» sublinham o seu caráter transcendente.</p>`,
            criterios: ["Herói histórico: o areal, a morte, a desventura (Alcácer Quibir).", "Herói mítico: guardado por Deus, sonho eterno, certeza do regresso («O», «Esse» com maiúscula).", "Correção linguística."] },
          { n: "3", obrigatorio: false, tipo: "mc", topico: "mensagem",
            enunciado: "Na primeira estrofe, a palavra «intervalo» remete para um antes e um depois, correspondendo a um tempo…",
            opcoes: ["de desistência, durante o qual a essência do sujeito perdura.", "de transição, durante o qual a essência do sujeito esmorece.", "de desistência, durante o qual a essência do sujeito esmorece.", "de transição, durante o qual a essência do sujeito perdura."],
            certa: 3, explicacao: "Versão 1: (D). O «intervalo» é a passagem entre a morte e o regresso; durante ele, a alma permanece «imersa / Em sonhos que são Deus»." }
        ] },
      { nome: "Parte B · Luís de Camões, Os Lusíadas, Canto I, estâncias 15 a 18",
        texto: `<div class="poem">E, enquanto eu estes canto, e a vós não posso,<br>Sublime Rei, que não me atrevo a tanto,<br>Tomai as rédeas vós do Reino vosso:<br>Dareis matéria a nunca ouvido canto.<br>Comecem a sentir o peso grosso<br>(Que pelo mundo todo faça espanto)<br>De exércitos e feitos singulares,<br>De África as terras e do Oriente os mares.<br><br>Em vós os olhos tem o Mouro frio,<br>Em quem vê seu exício afigurado;<br>Só com vos ver, o bárbaro Gentio<br>Mostra o pescoço ao jugo já inclinado;<br>Tétis todo o cerúleo senhorio<br>Tem pera vós por dote aparelhado,<br>Que, afeiçoada ao gesto belo e tenro,<br>Deseja de comprar-vos pera genro.<br><br>Em vós se vêm, da Olímpica morada,<br>Dos dous avós as almas cá famosas;<br>Ũa, na paz angélica dourada,<br>Outra, pelas batalhas sanguinosas.<br>Em vós esperam ver-se renovada<br>Sua memória e obras valerosas;<br>E lá vos têm lugar, no fim da idade,<br>No templo da suprema Eternidade.<br><br>Mas, enquanto este tempo passa lento<br>De regerdes os povos, que o desejam,<br>Dai vós favor ao novo atrevimento,<br>Pera que estes meus versos vossos sejam,<br>E vereis ir cortando o salso argento<br>Os vossos Argonautas, por que vejam<br>Que são vistos de vós no mar irado,<br>E costumai-vos já a ser invocado.</div><p class="src">Luís de Camões, Os Lusíadas, I, 15-18</p>`,
        itens: [
          { n: "4", obrigatorio: true, tipo: "aberta", topico: "lusiadas",
            enunciado: "Explica de que modo a estratégia argumentativa da estância 15 serve para incitar D. Sebastião à ação gloriosa.",
            resolucao: `<p>O poeta começa por <strong>elogiar</strong> o rei («Sublime Rei») e insinua que os feitos que ele há de realizar são tão grandiosos que não se atreve a cantá-los («a vós não posso»). Em seguida, <strong>aconselha-o</strong> a assumir o governo («Tomai as rédeas vós do Reino vosso»), prometendo-lhe que assim dará «matéria a nunca ouvido canto», e aponta-lhe os objetivos: dominar «De África as terras e do Oriente os mares». O elogio e a promessa de glória funcionam como incentivo à ação.</p>`,
            criterios: ["Louvor do rei e sugestão de que os seus feitos futuros superam a capacidade do poeta.", "Conselho para assumir o governo, matéria para um novo canto; domínio de África e dos mares do Oriente.", "Correção linguística."] },
          { n: "5", obrigatorio: true, tipo: "aberta", topico: "lusiadas",
            enunciado: "Nas estâncias 16 e 17, o poeta atribui a D. Sebastião uma dimensão excecional. Comprova-o com dois exemplos.",
            resolucao: `<p>Por um lado, o rei inspira temor e submissão: o «Mouro» vê nele a sua ruína («seu exício afigurado») e o «Gentio» oferece-se ao «jugo» só de o ver. Por outro lado, até os deuses e os antepassados o distinguem: <strong>Tétis</strong> deseja-o para genro, oferecendo-lhe como dote o domínio dos mares, e os <strong>dois avós</strong> (D. João III e Carlos V) esperam ver nele renovada a sua memória e as suas obras.</p>`,
            criterios: ["Dois exemplos entre: temor dos Mouros e submissão dos Gentios; Tétis quer-o para genro com o mar por dote; os avós esperam feitos iguais ou maiores.", "Correção linguística."] },
          { n: "6", obrigatorio: false, tipo: "mc", topico: "lusiadas",
            enunciado: "A par do louvor aos navegadores cantados n'Os Lusíadas, na estância 18 está subjacente…",
            opcoes: ["a crítica à ambição desmedida do rei.", "a alusão à demora na ação heroica que se espera do rei.", "o reconhecimento, pelo rei, da força guerreira dos povos a dominar.", "o elogio do rei ao valor artístico dos versos do poeta."],
            certa: 1, explicacao: "Versão 1: (B). «enquanto este tempo passa lento / De regerdes os povos» alude à espera até o rei assumir o governo e agir." }
        ] },
      { nome: "Parte C · Exposição", itens: [
        { n: "7", obrigatorio: true, tipo: "aberta", topico: "frei-luis",
          enunciado: "Numa breve exposição, mostra como o sebastianismo se manifesta na Mensagem e no Frei Luís de Sousa (uma manifestação significativa em cada obra), com introdução, desenvolvimento e conclusão.",
          resolucao: `<p>O mito de D. Sebastião, o rei desaparecido em Alcácer Quibir que um dia voltaria, atravessa a literatura portuguesa e está presente tanto na <em>Mensagem</em> como no <em>Frei Luís de Sousa</em>.</p><p>Na <em>Mensagem</em>, o rei deixa de ser uma figura histórica para se tornar um <strong>mito</strong>: o «Encoberto» que regressará, numa manhã de nevoeiro, para salvar uma pátria decadente e fundar um Quinto Império, não material mas espiritual. A sua «loucura», a ânsia de grandeza, é apresentada como o que dá sentido à vida. No <em>Frei Luís de Sousa</em>, passado sob o domínio filipino, o sebastianismo surge como <strong>crença popular</strong>: Telmo e Maria acreditam que D. Sebastião não morreu e que o seu regresso trará a independência. No entanto, o regresso do Romeiro, D. João de Portugal, mostra que a volta do passado pode ser destruidora.</p><p>Assim, a <em>Mensagem</em> transforma o sebastianismo numa esperança de renovação, enquanto o drama de Garrett revela também o seu lado trágico.</p>`,
          criterios: ["Introdução ao tema.", "Mensagem: o mito substitui o regresso do rei vivo; salvação da pátria decadente («nevoeiro»), Quinto Império espiritual, «loucura» como ânsia de infinito.", "Frei Luís de Sousa: domínio filipino; Telmo e Maria sebastianistas; o regresso do Romeiro não é positivo.", "Conclusão; estruturação e correção."] }
      ] }
    ] },
    { nome: "Grupo II · Leitura e Gramática", partes: [
      { nome: "Mário de Carvalho, «As Vascas. Da Ignorância. Redenção» (crónica)", intro: "Crónica autobiográfica: o autor confessa-se esmagado pelo saber dos especialistas e pela crítica sobre as grandes obras, que o fazem sentir-se ignorante, e acaba por defender, com ironia, o direito de cada leitor à sua opinião.", itens: [
        { n: "1", obrigatorio: true, tipo: "mc", topico: "leitura", enunciado: "No primeiro parágrafo, as referências a autores e obras consagrados servem sobretudo para…", opcoes: ["enaltecer a quantidade e a diversidade de estudos literários publicados.", "confrontar as opiniões do autor com as de outros comentadores.", "caricaturar a inibição que o saber dos especialistas provoca no leitor entusiasta.", "o autor se autocriticar, assumindo uma profunda ignorância sobre literatura."], certa: 2, explicacao: "Versão 1: (C). O exagero das referências caricatura o leitor que se sente esmagado pelos especialistas." },
        { n: "2", obrigatorio: true, tipo: "mc", topico: "coesao", enunciado: "No segundo parágrafo, «Não», «Nem tampouco» e «Nem sequer» asseguram a coesão interfrásica, exprimindo…", opcoes: ["oposição.", "concessão.", "adição.", "conclusão."], certa: 2, explicacao: "Versão 1: (C). «Nem» acrescenta negações em série: valor aditivo." },
        { n: "3", obrigatorio: true, tipo: "mc", topico: "coesao", enunciado: "Com a expressão «De facto», o autor…", opcoes: ["introduz novos acontecimentos, como idas à Biblioteca Nacional ou à Torre do Tombo.", "confirma a semelhança entre o exemplo apresentado e o seu caso pessoal.", "exprime a certeza de que a situação ocorre só esporadicamente.", "estabelece a ligação com as ideias do parágrafo seguinte."], certa: 1, explicacao: "Versão 1: (B). «De facto» confirma o que foi dito, aplicando-o ao próprio autor." },
        { n: "4", obrigatorio: false, tipo: "mc", topico: "leitura", enunciado: "Pode inferir-se do texto que o autor defende…", opcoes: ["a liberdade de formar e de exprimir opiniões próprias sobre as obras.", "a necessidade de conhecer os estudos académicos sobre as obras.", "a segurança que vem da ideia de que «só sei que nada sei».", "a importância de apoiar as opiniões pessoais nas dos comentadores."], certa: 0, explicacao: "Versão 1: (A). A «redenção» do título é o direito do leitor a ter opinião própria." },
        { n: "5", obrigatorio: false, tipo: "mc", topico: "leitura", enunciado: "O tom predominante do texto é…", opcoes: ["condescendente.", "formal.", "pessimista.", "irónico."], certa: 3, explicacao: "Versão 1: (D). O autor exagera a sua «ignorância» para criticar, com humor, o peso dos especialistas." },
        { n: "6", obrigatorio: true, tipo: "mc", topico: "funcoes-sintaticas", enunciado: "Tal como em «vale-me», o pronome pessoal desempenha a função de complemento indireto em…", opcoes: ["«atraem-me»", "«me salta» (à vista)", "«me confronto»", "«sustenta-me»"], certa: 1, explicacao: "Versão 1: (B). Algo salta à vista a alguém (CI). Em «atraem-me» e «sustenta-me», o pronome é complemento direto; em «me confronto», é reflexo." },
        { n: "7", obrigatorio: false, tipo: "mc", topico: "aspeto-modalidade", enunciado: "Todas as frases exemplificam a modalidade apreciativa, exceto…", opcoes: ["«É uma boa pergunta, com que me confronto repetidamente.»", "«Ah, inacessível Gogol…»", "«Como é triste e deprimente ser-se tão desconhecedor…»", "«A personagem não pode deixar de saber que eles lá estão.»"], certa: 3, explicacao: "Versão 1: (D). Exprime certeza (modalidade epistémica), não uma avaliação." }
      ] }
    ] },
    { nome: "Grupo III · Escrita", partes: [
      { nome: "Texto de opinião (200 a 350 palavras)", itens: [
        { n: "III", obrigatorio: true, tipo: "texto", cotacao: 44, generoAlvo: "texto de opinião", topico: "texto-opiniao",
          enunciado: "Para muitas pessoas, o heroísmo exige um caminho difícil, feito de renúncia e de sofrimento. Escreve um texto de opinião em que defendas a tua perspetiva sobre esta conceção de heroísmo, com dois argumentos, cada um ilustrado com um exemplo significativo, e uma conclusão.",
          resolucao: `<p class="small"><strong>Texto-modelo (220 palavras)</strong></p><p>Costuma dizer-se que não há heróis sem sacrifício. Concordo que o heroísmo implica quase sempre renúncia, mas julgo que não é o sofrimento que define um herói: é a escolha de pôr o bem dos outros acima do seu.</p><p>Em primeiro lugar, é verdade que muitos dos gestos que admiramos tiveram um preço elevado. Aristides de Sousa Mendes, cônsul em Bordéus em 1940, desobedeceu às ordens do governo e passou milhares de vistos a refugiados; foi afastado da carreira e morreu na pobreza. A sua coragem consistiu precisamente em aceitar perder tudo para salvar desconhecidos.</p><p>Em segundo lugar, porém, reduzir o heroísmo ao sofrimento é injusto para com o heroísmo discreto do quotidiano. Um enfermeiro que, turno após turno, cuida dos doentes com paciência, ou um jovem que dedica os sábados a ensinar crianças de um bairro carenciado não vivem necessariamente um calvário e, no entanto, mudam vidas. O seu mérito está na constância e na generosidade, não na dor.</p><p>Por isso, considero que a renúncia faz parte do heroísmo, mas não deve ser vista como condição obrigatória para o reconhecermos. Valorizar apenas os heróis que sofrem pode levar-nos a ignorar quem, sem alarde, torna o mundo um pouco melhor todos os dias. Ser herói é, acima de tudo, escolher agir pelos outros quando seria mais fácil não o fazer.</p>`,
          criterios: ["A: ponto de vista explícito + 2 argumentos + 1 exemplo em cada + conclusão + discurso valorativo.", "B: tema sem desvios, argumentos e exemplos pertinentes e diversificados.", "C: partes equilibradas, parágrafos, conectores e cadeias de referência.", "CL: correção linguística (14)."] }
      ] }
    ] }
  ]
},
{
  id: "exame-2021-f1",
  ano: 2021, fase: "1.ª fase", versao: "Versão 1", free: false,
  titulo: "Exame Nacional 2021 · 1.ª fase",
  temas: ["Alberto Caeiro", "Garrett e Camilo: o herói romântico", "Fernão Lopes (exposição)", "Almada Negreiros", "Texto de opinião: artes e progresso"],
  links: {
    enunciado: "https://www.examesnacionais.com.pt/exames-nacionais/12ano/2021-1fase/Portugues_639.pdf",
    criterios: "https://www.examesnacionais.com.pt/exames-nacionais/12ano/2021-1fase/Portugues_639_Criterios.pdf"
  },
  nota: "Resolução da Versão 1. O poema de Caeiro está transcrito; os excertos de Garrett e Camilo e o texto do Grupo II estão no enunciado oficial.",
  grupos: [
    { nome: "Grupo I · Educação Literária", partes: [
      { nome: "Parte A · Alberto Caeiro, «O meu olhar azul como o céu»",
        texto: `<div class="poem">O meu olhar azul como o céu<br>É calmo como a água ao sol.<br>É assim, azul e calmo,<br>Porque não interroga nem se espanta...<br><br>Se eu interrogasse e me espantasse<br>Não nasciam flores novas nos prados<br>Nem mudaria qualquer cousa no sol de modo a ele ficar mais belo.<br><br>(Mesmo se nascessem flores novas no prado<br>E se o sol mudasse para mais belo,<br>Eu sentiria menos flores no prado<br>E achava mais feio o sol...<br>Porque tudo é como é e assim é que é,<br>E eu aceito, e nem agradeço,<br>Para não parecer que penso nisso...)</div><p class="src">Alberto Caeiro, Poesia</p>`,
        itens: [
          { n: "1", obrigatorio: true, tipo: "aberta", topico: "heteronimos",
            enunciado: "Relaciona as comparações dos dois primeiros versos com o sentido do quarto verso.",
            resolucao: `<p>O olhar do sujeito é comparado ao <strong>céu</strong> («azul como o céu») e à <strong>água ao sol</strong> («calmo como a água ao sol»), elementos da Natureza que sugerem serenidade e transparência. O quarto verso explica essa calma: o olhar é assim «Porque não interroga nem se espanta», ou seja, <strong>aceita o mundo tal como ele é</strong>, sem o questionar nem reagir emocionalmente.</p>`,
            criterios: ["Comparações com o céu e a água ao sol: tranquilidade, serenidade.", "Verso 4: o olhar é calmo porque não questiona nem se espanta; aceita o que vê.", "Relação entre as comparações e o verso 4; correção linguística."] },
          { n: "2", obrigatorio: false, tipo: "mc", topico: "heteronimos",
            enunciado: "Nos versos 8 a 11, o recurso à ____ evidencia a ideia de que é pela visão que se pode ____.",
            opcoes: ["metonímia … alterar a perceção da natureza", "antítese … conhecer a beleza objetiva da natureza", "metonímia … conhecer a beleza objetiva da natureza", "antítese … alterar a perceção da natureza"],
            certa: 1, explicacao: "Versão 1: (B). As oposições «flores novas» / «menos flores» e «mais belo» / «mais feio» mostram que mudar a Natureza a tornaria pior: a beleza está nas coisas como são, vistas objetivamente." },
          { n: "3", obrigatorio: true, tipo: "aberta", topico: "heteronimos",
            enunciado: "Explica a aparente contradição presente nos versos 12 a 14.",
            resolucao: `<p>No verso 12, o sujeito afirma uma visão <strong>objetiva</strong> do real: «tudo é como é», as coisas são apenas o que os sentidos captam, e ele aceita-as com serenidade, sem pensar nelas. Nos versos 13 e 14, porém, admite que nem agradece «Para não parecer que penso nisso», o que revela que a recusa de pensar é uma <strong>atitude consciente e deliberada</strong>. A contradição está aí: para não parecer que pensa, o poeta tem de pensar nisso, o que mostra que a sua simplicidade é construída.</p>`,
            criterios: ["Verso 12: visão objetiva, sem pensamento nem emoção; aceitação serena.", "Versos 13-14: a recusa de pensar é consciente/deliberada (finge não pensar).", "Explicação da contradição; correção linguística."] }
        ] },
      { nome: "Parte B · Almeida Garrett, Viagens na Minha Terra, e Camilo Castelo Branco, Amor de Perdição", intro: "Excerto de Garrett: o retrato de um oficial e, a propósito da sua farda, um comentário irónico do narrador às leitoras. Excerto de Camilo: diálogo entre Simão, Mariana e João da Cruz.",
        itens: [
          { n: "4", obrigatorio: true, tipo: "aberta", topico: "amor-perdicao",
            enunciado: "Identifica uma característica do herói romântico comum às duas personagens (o oficial e Simão) e explica como se manifesta em cada uma.",
            resolucao: `<p>Uma característica comum é a <strong>nobreza de caráter</strong>. No oficial de Garrett, manifesta-se na lealdade e na verdade com que age; em Simão, na coragem e na determinação com que enfrenta o perigo. Outras características válidas: a <strong>intensidade dos sentimentos</strong> (o oficial entrega-se à emoção e tem um coração generoso; Simão vive num estado de exaltação) ou o <strong>sentido de honra</strong> (o oficial sente fortemente as ofensas; Simão quer bater-se sozinho).</p>`,
            criterios: ["Identificação de uma característica comum (nobreza de caráter, intensidade dos sentimentos ou sentido de honra).", "Manifestação no oficial e em Simão.", "Correção linguística."] },
          { n: "5", obrigatorio: true, tipo: "aberta", topico: "viagens-minha-terra",
            enunciado: "Explicita uma opinião defendida pelo narrador (excerto de Garrett) e uma opinião defendida por João da Cruz (excerto de Camilo).",
            resolucao: `<p>O narrador de Garrett critica, com <strong>ironia</strong>, o abandono da farda militar portuguesa em favor de uma que imita a das tropas inglesas: a farda nacional seria «patriótica» demais para uma terra que se deixou corromper. João da Cruz defende que a <strong>paixão excessiva faz perder o juízo</strong>: Simão, rico e fidalgo, não teria falta de mulheres bonitas e com dote e, se o destino quiser, Teresa há de ser sua.</p>`,
            criterios: ["Narrador: crítica irónica à imitação estrangeira (farda inglesa) e à perda do patriotismo.", "João da Cruz: a paixão em excesso faz perder a razão; Simão terá outras mulheres; se for destino, Teresa será dele.", "Correção linguística."] },
          { n: "6", obrigatorio: false, tipo: "mc", topico: "amor-perdicao",
            enunciado: "Completa: nos excertos, são marcas do Romantismo a interpelação feita ____ e a valorização ____.",
            opcoes: ["às leitoras … do registo de língua usado por João da Cruz", "ao «oficial» … da altivez revelada por Simão", "às leitoras … da altivez revelada por Simão", "ao «oficial» … do registo de língua usado por João da Cruz"],
            certa: 0, explicacao: "Versão 1: (A). O narrador de Garrett conversa com as leitoras; o registo popular de João da Cruz mostra a valorização do falar do povo." }
        ] },
      { nome: "Parte C · Exposição", itens: [
        { n: "7", obrigatorio: true, tipo: "aberta", topico: "fernao-lopes",
          enunciado: "A partir da leitura da Crónica de D. João I, de Fernão Lopes, escreve uma breve exposição sobre a emergência de uma consciência coletiva do povo português, com dois momentos em que as multidões a revelam.",
          resolucao: `<p>Na <em>Crónica de D. João I</em>, Fernão Lopes dá vida às multidões e faz do povo de Lisboa um verdadeiro protagonista da crise de 1383-1385.</p><p>Um primeiro momento é o do <strong>assassínio do Conde Andeiro</strong>: quando corre a notícia de que o Mestre de Avis está em perigo, a multidão corre ao Paço para o proteger, porque vê nele quem pode garantir a independência. Um segundo momento é o <strong>cerco de Lisboa</strong>: todos se unem para defender as muralhas e procurar mantimentos, suportando a fome para resistir ao invasor castelhano. (Também é válido: a revolta contra a regente D. Leonor Teles, vista como traidora por defender os interesses de Castela.)</p><p>Assim, a «arraia-miúda» deixa de ser uma massa anónima e ganha consciência de que o destino do reino também depende dela.</p>`,
          criterios: ["Introdução.", "Dois momentos: socorro ao Mestre no Paço; revolta contra D. Leonor; união no cerco de Lisboa.", "Conclusão: consciência coletiva crescente.", "Estruturação (3) e correção (2)."] }
      ] }
    ] },
    { nome: "Grupo II · Leitura e Gramática", partes: [
      { nome: "Fernando Cabral Martins, «Almada Negreiros», O Cânone (2020)", intro: "Almada Negreiros como artista plural: a sua obra atravessa várias artes e a sua ideia de poesia abrange muitas formas de criação.", itens: [
        { n: "1", obrigatorio: true, tipo: "mc", topico: "leitura", enunciado: "Segundo o texto, a marca distintiva do modernismo português é o culto…", opcoes: ["da diversidade.", "do simbolismo.", "da vanguarda.", "da perfeição."], certa: 0, explicacao: "Versão 1: (A). Os modernistas portugueses são todos singulares: o que os une é a diversidade." },
        { n: "2", obrigatorio: false, tipo: "mc", topico: "leitura", enunciado: "Ao afirmar que «Almada Negreiros é um ator», o autor quer evidenciar as ideias de…", opcoes: ["pluralidade e improvisação.", "superficialidade e dispersão.", "versatilidade e experimentação.", "artificialidade e imitação."], certa: 2, explicacao: "Versão 1: (C). Como um ator, Almada assume vários papéis e experimenta várias artes." },
        { n: "3", obrigatorio: true, tipo: "mc", topico: "leitura", enunciado: "No terceiro parágrafo, o autor pretende…", opcoes: ["comprovar a ausência de fronteiras entre as manifestações artísticas de Almada.", "explicar a origem de algumas obras de Almada.", "confrontar a obra poética e a obra plástica de Almada.", "comentar os materiais usados por Almada nas suas obras."], certa: 0, explicacao: "Versão 1: (A)." },
        { n: "4", obrigatorio: true, tipo: "mc", topico: "leitura", enunciado: "Segundo o quarto parágrafo, a conceção de Poesia de Almada…", opcoes: ["valoriza a perpetuação de formas poéticas tradicionais.", "desconstrói a definição clássica de produção poética.", "considera certas manifestações artísticas superiores a outras.", "defende a associação sistemática entre palavra escrita e imagem."], certa: 1, explicacao: "Versão 1: (B). Para Almada, a poesia não se confunde com a história das formas poéticas." },
        { n: "5", obrigatorio: false, tipo: "mc", topico: "oracoes", enunciado: "Todas as orações seguintes são subordinadas substantivas completivas, exceto…", opcoes: ["«que os “Modernistas” portugueses são todos singulares»", "«que é um pintor»", "«que aprende a viver»", "«que a poesia não se confunde com a história das formas poéticas»"], certa: 2, explicacao: "Versão 1: (C). Nas outras, «que» é conjunção e a oração completa um verbo ou um nome; em «que aprende a viver», «que» é pronome relativo." },
        { n: "6", obrigatorio: true, tipo: "mc", topico: "funcoes-sintaticas", enunciado: "As expressões «por tapeçarias decorativas» e «de um livro» desempenham, respetivamente, as funções de…", opcoes: ["modificador do grupo verbal e modificador restritivo do nome.", "complemento oblíquo e modificador restritivo do nome.", "complemento oblíquo e complemento do nome.", "modificador do grupo verbal e complemento do nome."], certa: 2, explicacao: "Versão 1: (C). A primeira é selecionada pelo verbo; a segunda completa o sentido do nome." },
        { n: "7", obrigatorio: false, tipo: "mc", topico: "aspeto-modalidade", enunciado: "Tal como em «são», o valor aspetual genérico está presente em…", opcoes: ["«se concretizar»", "«troca»", "«experimenta»", "«se confunde»"], certa: 3, explicacao: "Versão 1: (D). «A poesia não se confunde com…» é uma verdade geral, sem limites temporais." }
      ] }
    ] },
    { nome: "Grupo III · Escrita", partes: [
      { nome: "Texto de opinião (200 a 350 palavras)", itens: [
        { n: "III", obrigatorio: true, tipo: "texto", cotacao: 44, generoAlvo: "texto de opinião", topico: "texto-opiniao",
          enunciado: "O progresso da humanidade implica também a valorização das artes, como parte de uma formação humanista, e não apenas o progresso científico e tecnológico? Escreve um texto de opinião com um ponto de vista claro, dois argumentos, cada um ilustrado com um exemplo significativo, e conclusão.",
          resolucao: `<p class="small"><strong>Texto-modelo (217 palavras)</strong></p><p>Medimos muitas vezes o progresso pela velocidade dos computadores ou pelas descobertas da medicina. Considero, porém, que uma humanidade só avança verdadeiramente quando, a par da ciência, valoriza as artes.</p><p>Em primeiro lugar, as artes formam o olhar crítico e a sensibilidade que a técnica, por si só, não ensina. Quem lê um romance como <em>Os Maias</em> aprende a reconhecer a hipocrisia de uma sociedade; quem vê <em>Guernica</em>, de Picasso, compreende o horror da guerra de uma forma que nenhum relatório consegue transmitir. Uma sociedade capaz de sentir e de questionar decide melhor o que fazer com as suas descobertas.</p><p>Em segundo lugar, ciência e arte não são mundos opostos, mas complementares. Leonardo da Vinci estudava anatomia para pintar e pintava para compreender o corpo humano; hoje, muitas empresas tecnológicas contratam designers e escritores, porque sabem que uma invenção só tem sucesso se servir as pessoas. A criatividade alimenta a inovação.</p><p>É certo que os investimentos em investigação científica são urgentes, mas seria um erro fazê-los à custa do ensino artístico, como tantas vezes acontece quando se cortam horas de música ou de teatro nas escolas. Defendo, por isso, que o verdadeiro progresso é aquele que torna as pessoas não só mais capazes, mas também mais humanas, e é nas artes que essa humanidade se cultiva.</p>`,
          criterios: ["A: ponto de vista explícito + 2 argumentos + 1 exemplo em cada + conclusão + discurso valorativo.", "B: tema sem desvios, informação pertinente e diversificada.", "C: organização e coesão.", "CL: correção linguística (14)."] }
      ] }
    ] }
  ]
},
{
  id: "exame-2020-f1",
  ano: 2020, fase: "1.ª fase", versao: "Versão 1", free: false,
  titulo: "Exame Nacional 2020 · 1.ª fase",
  temas: ["Eça: A Ilustre Casa de Ramires e Os Maias", "Ricardo Reis", "Vieira (exposição)", "Arlindo Oliveira, «Bits, estrelas e grãos de areia»", "Apreciação crítica de cartoon"],
  links: {
    enunciado: "https://www.examesnacionais.com.pt/exames-nacionais/12ano/2020-1fase/Portugues_639.pdf",
    criterios: "https://www.examesnacionais.com.pt/exames-nacionais/12ano/2020-1fase/Portugues_639_Criterios.pdf"
  },
  nota: "Resolução da Versão 1. Em 2020 (ano da pandemia) as regras foram diferentes: eram obrigatórios os itens 1 a 4 do Grupo II e o Grupo III, e dos restantes 10 itens contavam as 8 melhores respostas. A ode de Ricardo Reis está transcrita; os excertos de Eça, o texto do Grupo II e o cartoon estão no enunciado oficial.",
  grupos: [
    { nome: "Grupo I · Educação Literária", partes: [
      { nome: "Parte A · Eça de Queirós, A Ilustre Casa de Ramires e Os Maias", intro: "Excerto de A Ilustre Casa de Ramires: no Rossio, à noite, José Lúcio Castanheiro, entusiasmado com a revista «Anais», encontra Gonçalo Mendes Ramires, que ainda não começou a novela prometida. Excerto de Os Maias: Carlos e Ega observam, no Rossio, rapazes de botas compridas e bicudas, e Ega critica a imitação do estrangeiro.",
        itens: [
          { n: "1", obrigatorio: false, tipo: "aberta", topico: "ilustre-casa",
            enunciado: "Explica em que medida a atitude de Gonçalo se distingue da de Castanheiro e se aproxima da atitude das personagens do excerto de Os Maias.",
            resolucao: `<p>Gonçalo revela <strong>ociosidade</strong>: vai adiando a escrita da novela sobre a sua família. Castanheiro, pelo contrário, tem uma atitude <strong>empreendedora</strong>: trabalha no Ministério da Fazenda e persegue com entusiasmo o projeto de uma revista que ajude a ressuscitar o sentimento português. A atitude de Gonçalo aproxima-se da das personagens de <em>Os Maias</em>, que passeiam por Lisboa «às horas de trabalho» e se ocupam a observar os outros, em vez de fazerem alguma coisa.</p>`,
            criterios: ["Gonçalo: ociosidade, adiamento da novela; Castanheiro: entusiasmo, iniciativa, projeto patriótico.", "Aproximação às personagens de Os Maias: deambulam desocupadas a observar os outros.", "Correção linguística."] },
          { n: "2", obrigatorio: false, tipo: "aberta", topico: "os-maias",
            enunciado: "Identifica um aspeto de Portugal ou dos portugueses criticado em cada excerto.",
            resolucao: `<p>Em <em>A Ilustre Casa de Ramires</em>, critica-se a tendência dos portugueses para a <strong>procrastinação</strong> (ou a falta de sentimento patriótico, ligada à perda da identidade nacional). Em <em>Os Maias</em>, critica-se a <strong>imitação caricatural do estrangeiro</strong>, sinal da incapacidade de criar modelos próprios (ou a inércia da juventude, que vagueia desocupada pela cidade).</p>`,
            criterios: ["Ilustre Casa: procrastinação ou falta de sentimento patriótico.", "Os Maias: imitação do estrangeiro ou ociosidade da juventude.", "Correção linguística."] },
          { n: "3", obrigatorio: false, tipo: "completar", topico: "os-maias",
            enunciado: "Completa as afirmações sobre os excertos.",
            sub: [
              { label: "a) O discurso indireto livre está presente em…", opcoes: ["«suplicou a Gonçalo Mendes Ramires…»", "«Nós estamos imundamente morrendo…»", "«Sim, mas precioso!»"], certa: 2 },
              { label: "b) O diminutivo tem valor pejorativo em…", opcoes: ["«novelazinha»", "«arzinho»", "«cãozinho»"], certa: 1 },
              { label: "c) Em «negros óculos sobre ele, duros e desconsolados»…", opcoes: ["o primeiro adjetivo caracteriza o objeto e os outros dois remetem para a reação da personagem", "os três adjetivos caracterizam os olhos da personagem", "todos os adjetivos caracterizam o estado de espírito da personagem"], certa: 0 }
            ],
            explicacao: "Versão 1: a) 3; b) 2; c) 1." }
        ] },
      { nome: "Parte B · Ricardo Reis, «Sofro, Lídia, do medo do destino»",
        texto: `<div class="poem">Sofro, Lídia, do medo do destino.<br>A leve pedra que um momento ergue<br>As lisas rodas do meu carro, aterra<br>Meu coração.<br>Tudo quanto me ameace de mudar-me<br>Para melhor que seja, odeio e fujo.<br>Deixem-me os deuses minha vida sempre<br>Sem renovar<br>Meus dias, mas que um passe e outro passe<br>Ficando eu sempre quase o mesmo, indo<br>Para a velhice como um dia entra<br>No anoitecer.</div><p class="src">Ricardo Reis, Odes</p>`,
        itens: [
          { n: "4", obrigatorio: false, tipo: "aberta", topico: "heteronimos",
            enunciado: "Apesar da referência a «Meu coração», o sujeito poético adota uma atitude racional. Explica essa atitude e o motivo que a justifica, com base nos seis primeiros versos.",
            resolucao: `<p>O sujeito poético <strong>intelectualiza as emoções</strong>: em vez de se deixar dominar pelo medo, analisa-o e decide recusar qualquer mudança («Tudo quanto me ameace de mudar-me / […] odeio e fujo»), procurando a serenidade. Assume esta atitude por causa do <strong>terror face ao destino e à mudança</strong>: até uma «leve pedra» no caminho o «aterra», porque qualquer alteração lhe causa sofrimento.</p>`,
            criterios: ["Atitude racional: intelectualização das emoções, recusa voluntária da mudança, busca da serenidade.", "Motivo: o medo do destino/da mudança, que lhe provoca sofrimento.", "Correção linguística."] },
          { n: "5", obrigatorio: false, tipo: "aberta", topico: "heteronimos",
            enunciado: "Transcreve a comparação presente no final do poema e interpreta o seu sentido.",
            resolucao: `<p>A comparação é «indo / Para a velhice como um dia entra / No anoitecer». Tal como o dia chega à noite <strong>de forma lenta e gradual</strong>, quase sem se dar por isso, o sujeito deseja que o tempo passe <strong>impercetivelmente</strong> e o conduza tranquilamente à velhice, sem mudanças nem sofrimento.</p>`,
            criterios: ["Transcrição correta da comparação.", "Interpretação: passagem lenta e impercetível do tempo; velhice tranquila, sem sofrimento.", "Correção linguística."] },
          { n: "6", obrigatorio: false, tipo: "completar", topico: "heteronimos",
            enunciado: "Completa as afirmações sobre o poema.",
            sub: [
              { label: "a) No verso 1, o recurso que identifica um interlocutor é a…", opcoes: ["anástrofe", "apóstrofe", "comparação"], certa: 1 },
              { label: "b) A aliteração está presente no…", opcoes: ["verso 2", "verso 3", "verso 6"], certa: 1 },
              { label: "c) Quanto à métrica, o poema…", opcoes: ["combina decassílabos heroicos com tetrassílabos agudos", "tem versos todos com número de sílabas diferente", "apresenta elisões na escansão de todos os versos"], certa: 0 }
            ],
            explicacao: "Versão 1: a) 2; b) 2; c) 1. «Lídia» é a interlocutora (apóstrofe); no verso 3 repete-se o som [R] («rodas», «carro», «aterra»); os versos longos são decassílabos e os curtos («Meu coração», «Sem renovar», «No anoitecer») são tetrassílabos agudos." }
        ] },
      { nome: "Parte C · Exposição", itens: [
        { n: "7", obrigatorio: false, tipo: "aberta", topico: "vieira",
          enunciado: "Escreve uma breve exposição sobre a importância da crítica no Sermão de Santo António (aos Peixes), de Vieira: dois aspetos criticados e o modo como cada um é construído alegoricamente.",
          resolucao: `<p>No <em>Sermão de Santo António</em>, Vieira dirige-se aos peixes, mas o verdadeiro alvo da sua crítica são os homens, em especial os colonos do Maranhão.</p><p>Um dos aspetos criticados é a <strong>hipocrisia e a traição</strong>, representadas pelo <strong>Polvo</strong>: aparentemente manso e inofensivo, disfarça-se com as cores da rocha para atacar a presa, tal como os homens falsos que, como Judas, enganam quem confia neles. Outro é o <strong>oportunismo</strong>, representado pelos <strong>Pegadores</strong>, que se agarram aos peixes grandes e vivem à sua custa, como os homens que se encostam aos poderosos para tirar proveito.</p><p>Através da alegoria, Vieira torna a crítica mais viva e persuasiva e leva os ouvintes a reconhecerem-se nos defeitos dos peixes.</p>`,
          criterios: ["Introdução.", "Dois aspetos entre: hipocrisia (Polvo), oportunismo (Pegadores), arrogância/vaidade.", "Construção alegórica de cada um.", "Conclusão; estruturação (3) e correção (2)."] }
      ] }
    ] },
    { nome: "Grupo II · Leitura e Gramática", partes: [
      { nome: "Arlindo Oliveira, «Bits, estrelas e grãos de areia», Público (2019)", intro: "Apesar de haver cada vez mais informação disponível, as decisões continuam muitas vezes a ser tomadas por instinto, emoção e sensacionalismo, e não com base em dados.", itens: [
        { n: "1", obrigatorio: true, tipo: "mc", topico: "leitura", enunciado: "Nos dois primeiros parágrafos, os exemplos apresentados visam…", opcoes: ["contestar a veracidade da afirmação de Carl Sagan.", "demonstrar a irrelevância de vários cálculos científicos.", "realçar o número excessivo de estimativas inverosímeis.", "evidenciar o elevado volume de informação virtual."], certa: 3, explicacao: "Versão 1: (D). Bits, estrelas e grãos de areia servem para dar a dimensão da informação existente." },
        { n: "2", obrigatorio: true, tipo: "mc", topico: "leitura", enunciado: "Segundo o autor, o nível de desenvolvimento superior que o ser humano atingiu…", opcoes: ["garante que mais informação signifique melhores decisões.", "contrasta com o facto de as decisões continuarem a ser tomadas de forma instintiva.", "leva sistematicamente a decisões baseadas apenas em dados objetivos.", "dificulta decisões exclusivamente racionais e científicas."], certa: 1, explicacao: "Versão 1: (B)." },
        { n: "3", obrigatorio: true, tipo: "mc", topico: "coesao", enunciado: "Relativamente ao terceiro parágrafo, o quarto parágrafo…", opcoes: ["retoma a ideia anterior e introduz uma ideia nova.", "contradiz a ideia anterior, com exemplos.", "retoma a ideia anterior e ilustra-a com exemplos.", "contradiz a ideia anterior, citando um especialista."], certa: 0, explicacao: "Versão 1: (A)." },
        { n: "4", obrigatorio: true, tipo: "mc", topico: "leitura", enunciado: "Segundo o quinto parágrafo, a diversidade e a quantidade de informação disponível têm promovido…", opcoes: ["o acesso rápido a informação fidedigna.", "a liberdade de pensamento individual.", "o sensacionalismo de algumas notícias.", "a valorização de acontecimentos relevantes."], certa: 2, explicacao: "Versão 1: (C)." },
        { n: "5", obrigatorio: false, tipo: "mc", topico: "oracoes", enunciado: "Em «nos chega», o pronome está antes do verbo porque está…", opcoes: ["integrado numa oração subordinante.", "dependente de uma oração coordenada.", "dependente da expressão «Em parte».", "integrado numa oração subordinada."], certa: 3, explicacao: "Versão 1: (D). Nas orações subordinadas, o pronome átono coloca-se antes do verbo (próclise)." },
        { n: "6", obrigatorio: false, tipo: "aberta", topico: "funcoes-sintaticas",
          enunciado: "Identifica a função sintática de: a) «que cada um destes números poderá ser da ordem de dez mil triliões»; b) «pelos nossos instintos» (numa frase passiva).",
          resolucao: `<p>a) <strong>Complemento direto</strong> (oração completiva selecionada pelo verbo). b) <strong>Complemento agente da passiva</strong>.</p>`,
          criterios: ["a) complemento direto; b) complemento agente da passiva."] },
        { n: "7", obrigatorio: false, tipo: "completar", topico: "palavras",
          enunciado: "Completa as afirmações sobre a palavra latina ARENA e outras evoluções.",
          sub: [
            { label: "a) São palavras derivadas de ARENA…", opcoes: ["«areinho» e «ária»", "«ariana» e «arenito»", "«arenoso» e «arear»"], certa: 2 },
            { label: "b) Na evolução ARENA > areia ocorre…", opcoes: ["apócope", "síncope", "crase"], certa: 1 },
            { label: "c) Na evolução STELLA > estrela ocorre…", opcoes: ["sonorização", "metátese", "prótese"], certa: 2 }
          ],
          explicacao: "Versão 1: a) 3; b) 2; c) 3. Em ARENA cai o -n- intervocálico (síncope); em STELLA acrescenta-se um e- inicial (prótese)." }
      ] }
    ] },
    { nome: "Grupo III · Escrita", partes: [
      { nome: "Apreciação crítica de um cartoon de Agim Sulaj (200 a 350 palavras)", itens: [
        { n: "III", obrigatorio: true, tipo: "texto", cotacao: 44, generoAlvo: "apreciação crítica", topico: "apreciacao-critica",
          enunciado: "Escreve uma apreciação crítica do cartoon de Agim Sulaj (ver enunciado oficial): uma rede metálica divide a imagem na diagonal; por trás dela, uma mão desenha a lápis pegadas que se afastam da rede em direção à luz. Inclui descrição, comentário crítico em discurso valorativo e conclusão.",
          resolucao: `<p class="small"><strong>Texto-modelo (220 palavras)</strong></p><p>O cartoon de Agim Sulaj é uma imagem de grande simplicidade que, no entanto, encerra uma reflexão profunda sobre a liberdade.</p><p>A composição está dividida na diagonal por uma rede metálica. De um dos lados, uma mão, presa atrás da rede, segura um lápis; do outro, uma fila de pegadas desenhadas afasta-se da rede e avança em direção à luz. O contraste entre a zona fechada e a zona luminosa organiza todo o olhar do leitor.</p><p>Em primeiro lugar, impressiona a força do símbolo: quem desenha está preso, mas aquilo que cria consegue sair. As pegadas sugerem que a imaginação e a arte permitem ultrapassar qualquer barreira física. Em segundo lugar, a escolha do lápis, um objeto humilde, torna a mensagem ainda mais eficaz, porque mostra que a liberdade interior não depende de grandes meios. Por fim, a luz para onde as pegadas se dirigem dá à imagem um tom de esperança, em vez de desespero.</p><p>Trata-se, além disso, de um cartoon muito atual: num tempo de confinamento ou de qualquer forma de opressão, lembra-nos que criar é uma maneira de resistir.</p><p>Em suma, com uma economia de meios notável, Sulaj consegue transmitir uma ideia universal: podem prender o corpo, mas não a criatividade. É, por isso, uma obra inteligente e comovente, que convida à reflexão sem precisar de palavras.</p>`,
          criterios: ["A: descrição com elementos significativos + comentário crítico fundamentado + discurso valorativo + conclusão.", "B: tema sem desvios, aspetos pertinentes e diversificados.", "C: organização e coesão.", "CL: correção linguística."] }
      ] }
    ] }
  ]
}
);
