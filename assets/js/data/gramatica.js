/* Nota20 · Português 639 — Grupo II: Leitura e Gramática */
window.N20 = window.N20 || { topics: [] };

N20.topics.push(
{
  id: "leitura",
  grupo: "II", ano: null, free: false,
  titulo: "Ler textos não literários",
  subtitulo: "Tese, intenção, estrutura e géneros",
  resumo: `
<p>O Grupo II começa com um texto não literário: artigo de opinião, crónica, discurso, ensaio, texto de divulgação. As primeiras perguntas (escolha múltipla) testam a <strong>compreensão</strong>.</p>
<h4>O que te perguntam</h4>
<p><strong>A intenção do autor</strong> num parágrafo ou parte («o autor pretende…»). <strong>A tese</strong> (o ponto de vista defendido) e os <strong>argumentos</strong>. <strong>A função de um exemplo</strong> ou de uma citação. <strong>O sentido de uma expressão</strong> no contexto. <strong>A conclusão</strong> do texto.</p>
<h4>Método em 4 passos</h4>
<p><strong>1.</strong> Lê o texto uma vez inteiro e escreve à margem, numa palavra, o assunto de cada parágrafo. <strong>2.</strong> Sublinha a tese (muitas vezes no início ou no fim) e os conectores que marcam a argumentação (<em>porém, assim, por isso, com efeito</em>). <strong>3.</strong> Lê a pergunta e volta ao excerto indicado pelas linhas: a resposta tem de estar <strong>no texto</strong>, não no que tu pensas. <strong>4.</strong> Elimina opções: desconfia das que são verdadeiras em geral mas não correspondem ao excerto, das que exageram («sempre», «apenas», «independentemente») e das que invertem a relação entre ideias.</p>
<h4>Géneros mais frequentes</h4>
<p><strong>Artigo de opinião</strong>: defende uma tese com argumentos, sobre um tema atual. <strong>Crónica</strong>: reflexão pessoal a partir do quotidiano, tom subjetivo. <strong>Discurso político</strong>: dirigido a um auditório, com marcas de interpelação (como o discurso de Tolentino Mendonça no exame de 2025). <strong>Texto de divulgação</strong>: explica um tema a um público não especializado.</p>`,
  pontos: [
    "A resposta está no excerto indicado: relê sempre as linhas da pergunta.",
    "Identifica a tese, os argumentos e os exemplos.",
    "Elimina opções verdadeiras «em geral» mas falsas para aquele excerto.",
    "Atenção a palavras absolutas (sempre, nunca, apenas, independentemente).",
    "Os conectores revelam a estrutura argumentativa.",
    "Género: artigo de opinião, crónica, discurso, divulgação."
  ],
  noExame: "Itens 1 a 4 do Grupo II são quase sempre de compreensão; os restantes de gramática. Todos de escolha múltipla.",
  exercicios: [
    {
      tipo: "mc",
      enunciado: "Lê o parágrafo e escolhe a opção que identifica a intenção do autor.",
      texto: `<div class="prose">«Durante anos, achámos que ler no ecrã era o mesmo que ler no papel. Os estudos mais recentes sugerem outra coisa: quando o texto é longo e exige atenção, os leitores em papel compreendem e recordam melhor. Isto não significa que devamos abandonar os ecrãs, mas que devemos escolher o suporte de acordo com o objetivo da leitura.»</div><p class="src">Texto de treino Nota20</p>`,
      opcoes: [
        "Defender o abandono total da leitura digital.",
        "Mostrar que a leitura em papel e no ecrã são equivalentes.",
        "Defender que o suporte de leitura deve ser escolhido em função do objetivo.",
        "Criticar os estudos sobre leitura por serem recentes."
      ],
      certa: 2,
      explicacao: "A última frase contém a tese: não abandonar ecrãs, mas escolher o suporte segundo o objetivo. A opção A exagera; a B contradiz o texto; a D não tem apoio no texto."
    },
    {
      tipo: "mc",
      enunciado: "No mesmo parágrafo, a expressão «Isto não significa que…» serve para:",
      opcoes: ["introduzir um exemplo", "prevenir uma interpretação excessiva e precisar a tese", "concluir que os estudos estão errados", "mudar de assunto"],
      certa: 1,
      explicacao: "O autor antecipa uma conclusão exagerada do leitor (abandonar ecrãs) e corrige-a, precisando a sua posição."
    }
  ]
},
{
  id: "funcoes-sintaticas",
  grupo: "II", ano: null, free: true,
  titulo: "Funções sintáticas",
  subtitulo: "Sujeito, complementos, predicativos e modificadores",
  resumo: `
<h4>Ao nível da frase</h4>
<p><strong>Sujeito</strong> (com quem o verbo concorda; pode ser simples, composto, nulo subentendido ou indeterminado), <strong>predicado</strong>, <strong>vocativo</strong> (chamamento: «<em>Pedro</em>, anda cá») e <strong>modificador de frase</strong> («<em>Felizmente</em>, chegaste»).</p>
<h4>Dentro do grupo verbal</h4>
<p><strong>Complemento direto</strong>: substituível por <em>o, a, os, as</em> («Li <em>o livro</em>» → «Li-<em>o</em>»). <strong>Complemento indireto</strong>: substituível por <em>lhe, lhes</em> («Dei o livro <em>à Ana</em>» → «Dei-<em>lhe</em>»). <strong>Complemento oblíquo</strong>: selecionado pelo verbo, preposicionado, não substituível por <em>lhe</em> («Gosto <em>de música</em>»; «Moro <em>em Odivelas</em>»; «Vou <em>a Lisboa</em>»). <strong>Complemento agente da passiva</strong>: quem pratica a ação numa frase passiva («O livro foi escrito <em>por Eça</em>»). <strong>Predicativo do sujeito</strong>: com verbos copulativos (ser, estar, parecer, ficar, permanecer…): «A Ana está <em>cansada</em>». <strong>Predicativo do complemento direto</strong>: caracteriza o CD («Acho o filme <em>aborrecido</em>»; «Elegeram-no <em>delegado</em>»). <strong>Modificador do grupo verbal</strong>: informação não selecionada pelo verbo, que pode ser retirada («Estudo <em>à noite</em>»).</p>
<h4>Dentro do grupo nominal e adjetival</h4>
<p><strong>Complemento do nome</strong>: selecionado pelo nome, muitas vezes deverbal («a construção <em>do convento</em>»; «o medo <em>do escuro</em>»). <strong>Modificador restritivo do nome</strong>: restringe a referência, sem vírgulas («o livro <em>azul</em>»; «os alunos <em>que estudaram</em>»). <strong>Modificador apositivo do nome</strong>: acrescenta informação, entre vírgulas («Lisboa, <em>capital de Portugal</em>, …»). <strong>Complemento do adjetivo</strong>: «orgulhoso <em>do filho</em>».</p>`,
  pontos: [
    "CD → o/a/os/as. CI → lhe/lhes. Oblíquo → selecionado, preposicionado, sem «lhe».",
    "Predicativo do sujeito: depois de verbo copulativo.",
    "Predicativo do CD: caracteriza o CD (achar, considerar, eleger, nomear).",
    "Modificador do GV: pode sair sem a frase ficar agramatical.",
    "Complemento do nome: o nome «pede» esse complemento (construção de, medo de).",
    "Modificador restritivo (sem vírgulas) vs. apositivo (entre vírgulas)."
  ],
  noExame: "Há sempre pelo menos um item de funções sintáticas. Em 2025: «complemento do nome». Em 2026: «agente da passiva».",
  exercicios: [
    {
      tipo: "mc",
      enunciado: "Na frase «O convento foi construído pelos operários de todo o país», «pelos operários de todo o país» desempenha a função de:",
      opcoes: ["complemento oblíquo", "complemento agente da passiva", "modificador do grupo verbal", "complemento indireto"],
      certa: 1,
      explicacao: "Frase passiva (foi construído): quem pratica a ação é o agente da passiva. Na ativa seria o sujeito: «Os operários construíram o convento»."
    },
    {
      tipo: "mc",
      enunciado: "Na frase «Os portugueses consideraram a viagem um feito heroico», «um feito heroico» é:",
      opcoes: ["complemento direto", "predicativo do sujeito", "predicativo do complemento direto", "modificador apositivo do nome"],
      certa: 2,
      explicacao: "«a viagem» é o CD; «um feito heroico» caracteriza esse CD, com o verbo «considerar»: predicativo do complemento direto."
    },
    {
      tipo: "mc",
      enunciado: "Identifica a frase em que a expressão sublinhada é complemento oblíquo.",
      opcoes: ["Escrevi uma carta <u>à minha avó</u>.", "Ela mora <u>em Coimbra</u>.", "Estudei <u>durante a tarde</u>.", "O livro <u>de Saramago</u> é longo."],
      certa: 1,
      explicacao: "«Morar» seleciona um complemento de lugar: «em Coimbra» é oblíquo. «À minha avó» é CI (→ lhe); «durante a tarde» é modificador do GV; «de Saramago» é modificador restritivo do nome."
    },
    {
      tipo: "mc",
      enunciado: "Em «a descoberta do caminho marítimo», «do caminho marítimo» é:",
      opcoes: ["complemento do nome", "modificador restritivo do nome", "complemento oblíquo", "complemento do adjetivo"],
      certa: 0,
      explicacao: "«Descoberta» é um nome derivado de «descobrir», que seleciona o que é descoberto: complemento do nome."
    }
  ]
},
{
  id: "oracoes",
  grupo: "II", ano: null, free: false,
  titulo: "Coordenação e subordinação",
  subtitulo: "Classificar orações sem falhar",
  resumo: `
<h4>Orações coordenadas</h4>
<p>Ligam orações com o mesmo estatuto: <strong>copulativas</strong> (e, nem, não só… mas também), <strong>adversativas</strong> (mas, porém, contudo, todavia), <strong>disjuntivas</strong> (ou… ou, ora… ora, quer… quer), <strong>conclusivas</strong> (logo, portanto, por isso), <strong>explicativas</strong> (pois, porque — com vírgula, depois de uma ordem ou opinião).</p>
<h4>Subordinadas substantivas</h4>
<p><strong>Completivas</strong>: introduzidas por <em>que</em> ou <em>se</em> (ou infinitivas), funcionam como sujeito, complemento direto ou oblíquo: «Sei <em>que vais chegar</em>» (CD). Teste: substitui por «isso». <strong>Relativas sem antecedente</strong>: «<em>Quem espera</em> sempre alcança».</p>
<h4>Subordinadas adjetivas relativas</h4>
<p>Têm um antecedente (nome) e são introduzidas por pronome relativo (que, quem, o qual, cujo, onde). <strong>Restritivas</strong>: sem vírgulas, restringem («Os alunos <em>que estudaram</em> passaram»: só esses). <strong>Explicativas</strong>: entre vírgulas, acrescentam informação («Os alunos, <em>que estudaram</em>, passaram»: todos).</p>
<h4>Subordinadas adverbiais</h4>
<p><strong>Causal</strong> (porque, visto que, uma vez que), <strong>final</strong> (para que, a fim de que), <strong>temporal</strong> (quando, enquanto, logo que), <strong>concessiva</strong> (embora, ainda que, apesar de), <strong>condicional</strong> (se, caso, desde que), <strong>consecutiva</strong> (tão… que, de tal modo… que), <strong>comparativa</strong> (como, tal como, mais… do que).</p>
<p><strong>Dica de ouro</strong>: o «que» completivo não tem antecedente e a oração equivale a «isso»; o «que» relativo retoma um nome anterior e pode ser substituído por «o qual».</p>`,
  pontos: [
    "Completiva = substituível por «isso» (sem antecedente).",
    "Relativa = tem antecedente; «que» ≈ «o qual / a qual».",
    "Restritiva sem vírgulas; explicativa entre vírgulas.",
    "Concessiva (embora) vs. adversativa (mas): a 1.ª subordina, a 2.ª coordena.",
    "Consecutiva: «tão/tal… que». Final: «para que».",
    "Explicativa coordenada (pois) ≠ relativa explicativa."
  ],
  noExame: "Em 2025 pediu-se a única subordinada substantiva completiva entre quatro orações iniciadas por «que».",
  exercicios: [
    {
      tipo: "mc",
      enunciado: "Qual das orações sublinhadas é subordinada substantiva completiva?",
      opcoes: ["O livro <u>que me emprestaste</u> é ótimo.", "Disseram-me <u>que o exame foi difícil</u>.", "Estudei tanto <u>que adormeci</u>.", "Lisboa, <u>que visitei ontem</u>, estava cheia."],
      certa: 1,
      explicacao: "«Disseram-me isso»: a oração é CD do verbo dizer, sem antecedente. A e D são relativas (restritiva e explicativa); C é consecutiva (tanto… que)."
    },
    {
      tipo: "mc",
      enunciado: "Em «Embora estivesse cansado, Baltasar continuou a trabalhar», a oração «Embora estivesse cansado» é:",
      opcoes: ["coordenada adversativa", "subordinada adverbial concessiva", "subordinada adverbial causal", "subordinada adverbial condicional"],
      certa: 1,
      explicacao: "«Embora» introduz uma concessiva: apresenta um obstáculo que não impede a ação principal."
    },
    {
      tipo: "mc",
      enunciado: "Em «Os peixes que ouviram Santo António foram louvados», a oração relativa é:",
      opcoes: ["explicativa, porque refere todos os peixes", "restritiva, porque delimita quais os peixes", "completiva, porque é introduzida por «que»", "consecutiva"],
      certa: 1,
      explicacao: "Sem vírgulas, a relativa restringe o antecedente «os peixes»: só os que ouviram foram louvados."
    }
  ]
},
{
  id: "coesao",
  grupo: "II", ano: null, free: false,
  titulo: "Coesão textual",
  subtitulo: "Lexical, referencial, interfrásica, temporal e frásica",
  resumo: `
<p>A coesão são os mecanismos linguísticos que ligam as partes de um texto.</p>
<h4>Coesão lexical</h4>
<p>Feita com palavras de sentido relacionado: <strong>repetição</strong>, <strong>sinonímia</strong>, <strong>antonímia</strong>, <strong>hiperonímia/hiponímia</strong> («flor» / «rosa»), <strong>holonímia/meronímia</strong> («cidade» / «rua»), e o uso de vocabulário do mesmo <strong>campo lexical</strong>.</p>
<h4>Coesão gramatical</h4>
<p><strong>Referencial</strong>: retoma ou antecipa referentes com pronomes (pessoais, demonstrativos, relativos como <em>que, cujo, onde</em>), determinantes, advérbios (<em>lá, aí</em>) ou <strong>elipse</strong>. Chama-se <em>anáfora</em> quando retoma algo anterior e <em>catáfora</em> quando antecipa. <strong>Interfrásica</strong>: conectores que ligam frases e orações (<em>porém, assim, porque, embora</em>). <strong>Temporal</strong>: correlação de tempos verbais e advérbios/expressões de tempo. <strong>Frásica</strong>: concordância (sujeito-verbo, nome-adjetivo) e ordem das palavras.</p>
<p>No exame de 2026, o campo lexical de «música» e «cidade» foi a resposta para coesão lexical e as palavras «cujos» e «onde» foram a resposta para coesão referencial.</p>`,
  pontos: [
    "Lexical = palavras (sinónimos, hiperónimos, campo lexical, repetição).",
    "Referencial = pronomes, determinantes, relativos (cujo, onde), elipse.",
    "Anáfora (retoma) vs. catáfora (antecipa).",
    "Interfrásica = conectores.",
    "Temporal = tempos verbais e expressões de tempo.",
    "Frásica = concordância."
  ],
  noExame: "Itens que pedem para identificar o mecanismo de coesão ou o referente de um pronome (antecedente).",
  exercicios: [
    {
      tipo: "mc",
      enunciado: "Em «Visitei Mafra. Lá, o convento impressionou-me», a palavra «Lá» assegura coesão:",
      opcoes: ["lexical, por sinonímia", "gramatical referencial (anáfora)", "interfrásica", "temporal"],
      certa: 1,
      explicacao: "«Lá» retoma «Mafra»: é coesão referencial por anáfora (advérbio)."
    },
    {
      tipo: "mc",
      enunciado: "Em «Comprei rosas, túlipas e lírios. As flores enchiam a sala», a relação entre «rosas, túlipas e lírios» e «flores» é de:",
      opcoes: ["holonímia", "hiperonímia/hiponímia", "antonímia", "sinonímia"],
      certa: 1,
      explicacao: "«Flores» é hiperónimo (termo geral) de rosas, túlipas e lírios (hipónimos). É coesão lexical."
    }
  ]
},
{
  id: "deixis",
  grupo: "II", ano: null, free: false,
  titulo: "Deíxis e discurso relatado",
  subtitulo: "Pessoal, temporal, espacial; discurso direto e indireto",
  resumo: `
<h4>Deíxis</h4>
<p>Os deíticos são palavras cujo sentido depende da <strong>situação de enunciação</strong> (quem fala, quando e onde). <strong>Pessoal</strong>: pronomes e determinantes de 1.ª e 2.ª pessoa (eu, tu, nós, me, te, meu, vosso) e formas verbais correspondentes. <strong>Temporal</strong>: hoje, ontem, amanhã, agora, na próxima semana, e os tempos verbais relativos ao momento em que se fala. <strong>Espacial</strong>: aqui, aí, ali, cá, lá, este, esse, aquele, e verbos como <em>vir</em>/<em>ir</em>.</p>
<p>No exame de 2025, a frase «É nessa condição […] que hoje me dirijo» foi a resposta certa porque tem deítico pessoal («me») e temporal («hoje»).</p>
<h4>Reprodução do discurso</h4>
<p><strong>Discurso direto</strong>: reproduz as palavras exatas, com verbo introdutor e marcas gráficas («Disse: — Volto amanhã»). <strong>Discurso indireto</strong>: o narrador relata as palavras, com oração completiva e mudanças nos deíticos e tempos («Disse que voltaria no dia seguinte»). <strong>Discurso indireto livre</strong>: mistura a voz do narrador e a da personagem, sem verbo introdutor (muito usado por Eça e Saramago).</p>
<p>Na passagem de direto para indireto: <em>eu</em> → <em>ele</em>; <em>hoje</em> → <em>naquele dia</em>; <em>amanhã</em> → <em>no dia seguinte</em>; <em>aqui</em> → <em>ali/lá</em>; presente → pretérito imperfeito; futuro → condicional.</p>`,
  pontos: [
    "Deíticos dependem de quem fala, quando e onde.",
    "Pessoal: eu, tu, nós, me, te, meu, vosso. Temporal: hoje, agora, ontem. Espacial: aqui, aí, este.",
    "3.ª pessoa (ele, o, lhe) normalmente NÃO é deítica.",
    "Direto → indireto: muda pessoa, tempo verbal, deíticos.",
    "Indireto livre: sem verbo introdutor, voz da personagem na voz do narrador.",
    "Verbos introdutores: dizer, afirmar, perguntar, responder, exclamar."
  ],
  noExame: "Escolha múltipla do tipo «a única frase com deíticos pessoais e temporais é…».",
  exercicios: [
    {
      tipo: "mc",
      enunciado: "Qual das frases contém deíticos pessoal e espacial?",
      opcoes: ["Ele chegou ontem a Lisboa.", "Trago-te aqui o livro.", "O livro estava na mesa.", "Amanhã vai chover."],
      certa: 1,
      explicacao: "«te» (2.ª pessoa) e «trago» (1.ª pessoa) são deíticos pessoais; «aqui» é deítico espacial. A tem só temporal; D só temporal."
    },
    {
      tipo: "mc",
      enunciado: "A passagem correta para discurso indireto de «— Amanhã volto aqui — disse o Romeiro.» é:",
      opcoes: ["O Romeiro disse que amanhã volto aqui.", "O Romeiro disse que no dia seguinte voltaria ali.", "O Romeiro disse que voltou ali no dia anterior.", "O Romeiro disse: no dia seguinte voltaria ali."],
      certa: 1,
      explicacao: "amanhã → no dia seguinte; volto (presente com valor de futuro) → voltaria; aqui → ali; 1.ª pessoa → 3.ª pessoa."
    }
  ]
},
{
  id: "aspeto-modalidade",
  grupo: "II", ano: null, free: false,
  titulo: "Valor aspetual e modal",
  subtitulo: "Perfetivo, imperfetivo, habitual, iterativo, genérico · epistémico, deôntico, apreciativo",
  resumo: `
<h4>Valor aspetual (como a situação decorre no tempo)</h4>
<p><strong>Perfetivo</strong>: situação concluída («Li o livro»). <strong>Imperfetivo</strong>: situação em curso, sem fim marcado («Estava a ler quando chegaste»; «Lia o jornal»). <strong>Habitual</strong>: situação que se repete por hábito («Todos os dias corro»; «Costumo ler à noite»). <strong>Iterativo</strong>: situação repetida num intervalo limitado («Bateu à porta várias vezes»; «Tenho estudado muito»). <strong>Genérico</strong>: verdade geral, intemporal («A água ferve a 100 ºC»; «A poesia é um guia náutico perpétuo» — exame 2025).</p>
<h4>Valor modal (atitude do locutor)</h4>
<p><strong>Epistémico</strong>: grau de certeza ou probabilidade («<em>Talvez</em> chova»; «<em>Deve</em> estar em casa»; «<em>Certamente</em>»). <strong>Deôntico</strong>: obrigação ou permissão («<em>Tens de</em> estudar»; «<em>Podes</em> sair»; «É <em>proibido</em>»). <strong>Apreciativo</strong>: avaliação/juízo de valor («<em>Felizmente</em>, passei»; «<em>Infelizmente</em>»; «É <em>uma pena</em> que…»).</p>
<p>O verbo <strong>poder</strong> é traiçoeiro: «Podes entrar» (deôntico, permissão) vs. «Pode chover» (epistémico, possibilidade).</p>`,
  pontos: [
    "Perfetivo = acabado. Imperfetivo = em curso.",
    "Habitual = hábito. Iterativo = repetição num intervalo.",
    "Genérico = verdade geral (presente intemporal).",
    "Epistémico = certeza/probabilidade. Deôntico = obrigação/permissão.",
    "Apreciativo = avaliação (felizmente, infelizmente).",
    "«Poder» e «dever» podem ser epistémicos ou deônticos: vê o contexto."
  ],
  noExame: "Em 2025, «A poesia é um guia náutico perpétuo» exprimia uma situação genérica.",
  exercicios: [
    {
      tipo: "mc",
      enunciado: "Na frase «Os navegadores devem ter sentido medo diante do Adamastor», o verbo «dever» tem valor:",
      opcoes: ["deôntico (obrigação)", "epistémico (probabilidade)", "apreciativo", "aspetual iterativo"],
      certa: 1,
      explicacao: "O locutor exprime uma suposição provável, não uma obrigação: valor epistémico."
    },
    {
      tipo: "mc",
      enunciado: "«Todas as manhãs, a varina percorria as ruas.» exprime valor aspetual:",
      opcoes: ["perfetivo", "genérico", "habitual", "iterativo"],
      certa: 2,
      explicacao: "«Todas as manhãs» marca um hábito: valor habitual."
    },
    {
      tipo: "mc",
      enunciado: "Qual das frases tem valor modal deôntico?",
      opcoes: ["Talvez o exame seja fácil.", "Felizmente, o exame correu bem.", "Os alunos têm de levar caneta azul ou preta.", "O exame começa às 9h30."],
      certa: 2,
      explicacao: "«Têm de» exprime obrigação: deôntico. A é epistémico; B apreciativo; D não tem modalidade marcada."
    }
  ]
},
{
  id: "atos-ilocutorios",
  grupo: "II", ano: null, free: false,
  titulo: "Atos ilocutórios",
  subtitulo: "O que fazemos quando falamos",
  resumo: `
<p>Um ato ilocutório é a ação que o locutor realiza ao produzir um enunciado.</p>
<p><strong>Assertivo</strong>: afirmar, descrever, informar, concluir («O exame é em junho»). <strong>Diretivo</strong>: levar o interlocutor a fazer algo: pedir, ordenar, aconselhar, perguntar («Fecha a janela»; «Podes ajudar-me?»). <strong>Compromissivo</strong>: o locutor compromete-se: prometer, ameaçar, oferecer («Amanhã trago-te o livro»). <strong>Expressivo</strong>: exprimir um estado psicológico: agradecer, pedir desculpa, felicitar, lamentar («Obrigado!»; «Parabéns!»). <strong>Declarativo</strong>: altera a realidade por ser dito por quem tem autoridade: declarar, nomear, batizar («Declaro aberta a sessão»).</p>
<h4>Diretos e indiretos</h4>
<p>Um ato é <strong>indireto</strong> quando a forma não coincide com a intenção: «Está frio aqui, não está?» (forma assertiva/interrogativa, intenção diretiva: «fecha a janela»). Pergunta-te sempre: <em>o que quer o locutor que aconteça?</em></p>`,
  pontos: [
    "Assertivo: afirmar. Diretivo: pedir/ordenar/perguntar.",
    "Compromissivo: prometer/ameaçar. Expressivo: agradecer/felicitar.",
    "Declarativo: muda a realidade (nomear, declarar) — exige autoridade.",
    "Ato indireto: forma ≠ intenção («Tens horas?» = pedido).",
    "Perguntas são, em regra, atos diretivos.",
    "Analisa a intenção, não só a forma da frase."
  ],
  noExame: "Escolha múltipla sobre o ato ilocutório de uma frase do texto.",
  exercicios: [
    {
      tipo: "mc",
      enunciado: "«Prometo que vos trarei notícias da Índia.» é um ato ilocutório:",
      opcoes: ["assertivo", "diretivo", "compromissivo", "expressivo"],
      certa: 2,
      explicacao: "O locutor compromete-se com uma ação futura: compromissivo."
    },
    {
      tipo: "mc",
      enunciado: "Na frase «Importas-te de baixar o volume?», realiza-se um ato:",
      opcoes: ["assertivo direto", "diretivo (pedido) indireto", "expressivo", "declarativo"],
      certa: 1,
      explicacao: "A forma é de pergunta sobre a disposição do interlocutor, mas a intenção é pedir que baixe o volume: diretivo indireto."
    }
  ]
},
{
  id: "palavras",
  grupo: "II", ano: null, free: false,
  titulo: "Formação de palavras e relações semânticas",
  subtitulo: "Derivação, composição e outros processos",
  resumo: `
<h4>Derivação</h4>
<p><strong>Prefixação</strong> (des+fazer → desfazer), <strong>sufixação</strong> (feliz+mente → felizmente), <strong>prefixação e sufixação</strong> (in+feliz+mente → infelizmente: existem «infeliz» e «felizmente»), <strong>parassíntese</strong> (prefixo e sufixo juntam-se ao mesmo tempo: a+manh(ã)+ecer → amanhecer; não existe «amanhã» como verbo nem «manhecer»), <strong>derivação não afixal</strong> (nome formado a partir do verbo, sem sufixo: abandonar → o abandono; pescar → a pesca), <strong>conversão</strong> (mudança de classe sem alterar a forma: o jantar, o olhar).</p>
<h4>Composição</h4>
<p><strong>Morfológica</strong>: junção de radicais, muitas vezes de origem grega ou latina, com vogal de ligação (agricultura, luso-descendente). <strong>Morfossintática</strong>: junção de palavras (guarda-chuva, amor-perfeito, cor-de-rosa).</p>
<h4>Outros processos</h4>
<p>Sigla (UE, IST), acrónimo (lido como palavra: NATO, ONU), truncação (foto, bici), amálgama (portunhol), empréstimo (site, email), extensão semântica (rato do computador).</p>
<h4>Relações semânticas</h4>
<p>Sinonímia, antonímia, <strong>hiperonímia/hiponímia</strong> (animal / cão), <strong>holonímia/meronímia</strong> (corpo / braço), polissemia (uma palavra, vários sentidos relacionados), homonímia (formas iguais, sentidos sem relação).</p>`,
  pontos: [
    "Parassíntese: prefixo + sufixo simultâneos (entristecer, amanhecer, envelhecer).",
    "Prefixação e sufixação: existem as formas intermédias (infelizmente).",
    "Derivação não afixal: verbo → nome sem sufixo (o abandono).",
    "Conversão: mesma forma, nova classe (o jantar).",
    "Composição morfológica (radicais) vs. morfossintática (palavras).",
    "Hiperónimo = geral; hipónimo = específico. Holónimo = todo; merónimo = parte."
  ],
  noExame: "Aparece com menos frequência no 12.º, mas cai: formação de palavras e relações semânticas.",
  exercicios: [
    {
      tipo: "mc",
      enunciado: "A palavra «entristecer» é formada por:",
      opcoes: ["prefixação", "sufixação", "parassíntese", "composição morfológica"],
      certa: 2,
      explicacao: "en + trist(e) + ecer: prefixo e sufixo juntam-se em simultâneo («entriste» e «tristecer» não existem)."
    },
    {
      tipo: "mc",
      enunciado: "«Guarda-chuva» é um exemplo de:",
      opcoes: ["composição morfossintática", "composição morfológica", "derivação por sufixação", "amálgama"],
      certa: 0,
      explicacao: "Junta duas palavras (guarda + chuva) mantendo a ligação sintática: composição morfossintática."
    }
  ]
},
{
  id: "recursos-expressivos",
  grupo: "II", ano: null, free: false,
  titulo: "Recursos expressivos",
  subtitulo: "Reconhecer e explicar o efeito",
  resumo: `
<p>Nos Grupos I e II pedem-te para identificar um recurso <strong>e</strong> explicar o seu <strong>efeito de sentido</strong>. Nunca respondas só com o nome.</p>
<p><strong>Metáfora</strong>: identificação de dois elementos sem conector («A vida é um sonho»). <strong>Comparação</strong>: com conector («como», «tal qual»). <strong>Personificação</strong>: atribuir traços humanos a seres não humanos. <strong>Apóstrofe</strong>: interpelação de alguém ou algo («Ó mar salgado»). <strong>Anáfora</strong>: repetição no início de versos/frases. <strong>Antítese</strong>: oposição de ideias. <strong>Oxímoro/paradoxo</strong>: junção de termos contraditórios («contentamento descontente»). <strong>Hipérbole</strong>: exagero. <strong>Enumeração</strong> e <strong>gradação</strong> (enumeração com intensidade crescente ou decrescente). <strong>Hipérbato/anástrofe</strong>: inversão da ordem normal (frequente em Ricardo Reis). <strong>Sinestesia</strong>: mistura de sensações («paisagem sonora» — exame 2026). <strong>Metonímia</strong>: troca de um termo por outro com relação de proximidade (o autor pela obra, o lugar pelas pessoas). <strong>Hipálage</strong>: atribuir a um objeto uma qualidade de outro ser («fumava um cigarro preguiçoso»). <strong>Ironia</strong>: dizer o contrário do que se pensa. <strong>Eufemismo</strong>: suavizar. <strong>Perífrase</strong>: dizer por rodeios. <strong>Interrogação retórica</strong>: pergunta sem resposta esperada, para levar a refletir. <strong>Polissíndeto/assíndeto</strong>: repetição/ausência de conjunções. <strong>Aliteração</strong>: repetição de sons consonânticos.</p>
<h4>Fórmula para responder</h4>
<p><em>Recurso</em> + <em>citação</em> + <em>efeito</em>: «Através da apóstrofe "Ó mar salgado", o sujeito poético interpela o mar, o que confere ao poema um tom emotivo e solene e torna o mar o destinatário do lamento.»</p>`,
  pontos: [
    "Responde sempre: recurso + citação + efeito.",
    "Metáfora (sem «como») vs. comparação (com «como»).",
    "Oxímoro: termos contraditórios lado a lado.",
    "Sinestesia: cruzamento de sensações.",
    "Metonímia: relação de contiguidade; hipálage: qualidade «deslocada».",
    "Interrogação retórica: provoca reflexão, não espera resposta."
  ],
  noExame: "Em 2025 (enumeração) e 2026 (sinestesia «paisagem sonora»; metáfora «cardume negro»).",
  exercicios: [
    {
      tipo: "mc",
      enunciado: "Em «é um contentamento descontente», Camões usa:",
      opcoes: ["hipérbole", "oxímoro", "aliteração", "metonímia"],
      certa: 1,
      explicacao: "Junção de termos contraditórios («contentamento»/«descontente») para exprimir a natureza paradoxal do amor."
    },
    {
      tipo: "mc",
      enunciado: "A expressão «paisagem sonora» constitui:",
      opcoes: ["metonímia", "sinestesia", "hipérbole", "aliteração"],
      certa: 1,
      explicacao: "Associa o visual («paisagem») ao auditivo («sonora»): sinestesia. Foi a resposta no exame de 2026."
    },
    {
      tipo: "aberta",
      enunciado: "Explica o efeito da apóstrofe no verso «Ó mar salgado, quanto do teu sal / São lágrimas de Portugal!».",
      cotacao: 13,
      resolucao: `<p>Através da apóstrofe «Ó mar salgado», o sujeito poético <strong>interpela diretamente o mar</strong>, transformando-o em interlocutor e quase em personagem. Este recurso confere ao poema um <strong>tom emotivo e solene</strong>, intensificado pela exclamação, e torna o mar o destinatário de um lamento coletivo: é a ele que o sujeito atribui o sal das «lágrimas de Portugal», isto é, o sofrimento causado pelos Descobrimentos.</p>`,
      criterios: [
        "Identifica a interpelação ao mar.",
        "Refere o efeito (tom emotivo/solene, personificação, lamento).",
        "Relaciona com o sentido (sofrimento associado ao mar).",
        "Correção linguística."
      ]
    }
  ]
}
);
