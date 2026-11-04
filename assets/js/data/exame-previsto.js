/* Nota20 · Exame Previsto 2027 (original)
   Construído a partir dos temas mais prováveis (ver historico.js).
   Textos literários em domínio público; texto do Grupo II original. */
window.N20 = window.N20 || { topics: [] };
N20.exames = N20.exames || [];

N20.exames.unshift({
  id: "previsto-2027",
  previsto: true,
  ano: 2027, fase: "previsão Nota20", versao: "Original", free: false,
  titulo: "Exame Previsto 2027",
  temas: ["Pessoa ortónimo", "Antero de Quental", "Os Maias", "Funções sintáticas e orações", "Texto de opinião"],
  nota: "Exame original da Nota20, no formato oficial, feito com os temas que a análise das provas de 2020 a 2026 aponta como mais prováveis. É uma aposta estatística, não uma garantia: estuda tudo, mas começa por aqui.",
  grupos: [
    { nome: "Grupo I · Educação Literária", partes: [
      { nome: "Parte A · Fernando Pessoa, «Isto»",
        texto: `<div class="poem">Dizem que finjo ou minto<br>Tudo que escrevo. Não.<br>Eu simplesmente sinto<br>Com a imaginação.<br>Não uso o coração.<br><br>Tudo o que sonho ou passo,<br>O que me falha ou finda,<br>É como que um terraço<br>Sobre outra coisa ainda.<br>Essa coisa é que é linda.<br><br>Por isso escrevo em meio<br>Do que não está ao pé,<br>Livre do meu enleio,<br>Sério do que não é.<br>Sentir? Sinta quem lê!</div><p class="src">Fernando Pessoa, «Isto»</p>`,
        itens: [
          { n: "1", obrigatorio: true, tipo: "aberta", topico: "pessoa-ortonimo",
            enunciado: "Explica a resposta do sujeito poético à acusação apresentada no primeiro verso.",
            resolucao: `<p>O sujeito poético começa por <strong>recusar</strong> a acusação de que finge ou mente («Não.»). Explica depois que não mente: <strong>sente «com a imaginação»</strong> e não com o coração. Isto significa que a emoção, na sua poesia, é transformada pela inteligência e pela imaginação, tornando-se uma emoção pensada. Trata-se da conceção de <strong>fingimento artístico</strong>: não uma mentira, mas a intelectualização do sentimento.</p>`,
            criterios: ["Recusa da acusação («Não.»).", "Sentir «com a imaginação», não com o coração: intelectualização da emoção (fingimento).", "Correção linguística."] },
          { n: "2", obrigatorio: true, tipo: "aberta", topico: "pessoa-ortonimo",
            enunciado: "Interpreta a imagem do «terraço / Sobre outra coisa ainda», na segunda estrofe.",
            resolucao: `<p>Através da comparação «É como que um terraço», o sujeito afirma que tudo o que vive, sonha ou perde serve apenas de <strong>ponto de partida</strong> para alcançar algo que está para além da experiência. O terraço é um lugar de onde se olha para outra coisa: essa «outra coisa», que «é que é linda», representa a <strong>beleza ideal</strong> que a poesia procura. A experiência real vale, assim, como meio para chegar à criação artística.</p>`,
            criterios: ["Comparação/metáfora: a experiência como ponto de partida.", "A «outra coisa» como beleza ideal / arte, superior ao vivido.", "Correção linguística."] },
          { n: "3", obrigatorio: false, tipo: "mc", topico: "pessoa-ortonimo",
            enunciado: "O verso final, «Sentir? Sinta quem lê!», significa que…",
            opcoes: ["o poeta não tem qualquer sentimento.", "o poeta transfere para o leitor a tarefa de sentir, reservando para si o trabalho intelectual.", "o leitor deve imitar a forma de sentir do poeta.", "a poesia não deve provocar emoções."],
            certa: 1, explicacao: "O poeta trabalha a emoção pela razão; quem vive a emoção, ao ler, é o leitor (como na 2.ª estrofe de «Autopsicografia»)." }
        ] },
      { nome: "Parte B · Antero de Quental, «Na mão de Deus»",
        texto: `<div class="poem">Na mão de Deus, na sua mão direita,<br>Descansou afinal meu coração.<br>Do palácio encantado da Ilusão<br>Desci a passo e passo a escada estreita.<br><br>Como as flores mortais, com que se enfeita<br>A ignorância infantil, despojo vão,<br>Depus do Ideal e da Paixão<br>A forma transitória e imperfeita.<br><br>Como criança, em lôbrega jornada,<br>Que a mãe leva ao colo agasalhada<br>E atravessa, sorrindo vagamente,<br><br>Selvas, mares, areias do deserto...<br>Dorme o teu sono, coração liberto,<br>Dorme na mão de Deus eternamente!</div><p class="src">Antero de Quental, Sonetos</p>`,
        itens: [
          { n: "4", obrigatorio: true, tipo: "aberta", topico: "antero",
            enunciado: "Explicita o estado de espírito do sujeito poético nas quadras, relacionando-o com a renúncia ao Ideal.",
            resolucao: `<p>Nas quadras, o sujeito revela um estado de <strong>serenidade e paz</strong>: o seu coração «Descansou afinal» na mão de Deus. Essa paz resulta de uma <strong>renúncia</strong>: desceu, devagar, do «palácio encantado da Ilusão» e abandonou a «forma transitória e imperfeita» do Ideal e da Paixão, comparada a «flores mortais». A desilusão perante o Ideal inatingível transforma-se, assim, em repouso e aceitação.</p>`,
            criterios: ["Serenidade/paz («Descansou afinal meu coração»).", "Renúncia ao Ideal e à Paixão, vistos como ilusão transitória e imperfeita.", "Correção linguística."] },
          { n: "5", obrigatorio: true, tipo: "aberta", topico: "antero",
            enunciado: "Explica o sentido da comparação presente nos tercetos.",
            resolucao: `<p>Nos tercetos, o sujeito compara-se a uma <strong>criança levada ao colo pela mãe</strong> numa viagem difícil («lôbrega jornada») através de «Selvas, mares, areias do deserto». Tal como a criança atravessa os perigos protegida e tranquila, «sorrindo vagamente», também o coração, entregue a Deus, fica <strong>protegido e em paz</strong>. A apóstrofe final («Dorme o teu sono, coração liberto») apresenta esse repouso eterno, talvez a própria morte, como <strong>libertação</strong>.</p>`,
            criterios: ["Comparação com a criança ao colo da mãe numa jornada difícil.", "Sentido: proteção e paz em Deus; repouso eterno/morte como libertação.", "Correção linguística."] },
          { n: "6", obrigatorio: false, tipo: "multi", topico: "antero",
            enunciado: "Identifica as três afirmações verdadeiras sobre o soneto.",
            opcoes: ["A. As quadras apresentam o esquema rimático ABBA.", "B. O sujeito poético mantém a esperança de alcançar o Ideal.", "C. O repouso eterno é encarado como libertação.", "D. O soneto usa exclusivamente a primeira pessoa.", "E. Nos dois últimos versos, o sujeito dirige-se ao próprio coração através de uma apóstrofe."],
            certas: [0, 2, 4],
            explicacao: "direita/estreita/enfeita/imperfeita (A) e coração/Ilusão/vão/Paixão (B): ABBA ABBA. O sujeito renunciou ao Ideal (B é falsa) e usa a 2.ª pessoa ao falar com o coração (D é falsa)." }
        ] },
      { nome: "Parte C · Exposição", itens: [
        { n: "7", obrigatorio: true, tipo: "aberta", topico: "os-maias",
          enunciado: "Numa breve exposição, mostra que, n'Os Maias, a crónica de costumes faz uma crítica à sociedade portuguesa, a partir de dois episódios da tua experiência de leitura.",
          resolucao: `<p>Em <em>Os Maias</em>, Eça de Queirós junta à história da família Maia uma crónica de costumes que retrata, com ironia, a sociedade lisboeta da segunda metade do século XIX.</p><p>No <strong>jantar do Hotel Central</strong>, a discussão entre Ega e Alencar revela a superficialidade do debate literário, preso entre o ultrarromantismo e um naturalismo mal compreendido, e a conversa sobre finanças mostra a mediocridade das elites perante a crise do país. Nas <strong>corridas de cavalos</strong>, Eça critica o provincianismo de uma sociedade que imita o estrangeiro sem o compreender: o hipódromo improvisado, a falta de público e o aborrecimento geral tornam ridículo o evento que queria parecer elegante.</p><p>Assim, a crónica de costumes mostra um país atrasado e decadente, o mesmo que leva Carlos e Ega a concluírem que «falharam a vida».</p>`,
          criterios: ["Introdução sobre a crónica de costumes.", "Episódio 1 com crítica explicada (ex.: Hotel Central).", "Episódio 2 com crítica explicada (ex.: corridas, jornal, sarau).", "Conclusão; estruturação (3) e correção (2)."] }
      ] }
    ] },
    { nome: "Grupo II · Leitura e Gramática", partes: [
      { nome: "Texto: «O direito a errar»",
        texto: `<div class="prose"><h5>O direito a errar</h5>
<p>Há uma frase que muitos alunos ouvem desde cedo: «Não podes errar.» Dita com boa intenção, ela transforma o erro num fracasso pessoal e a sala de aula num lugar onde o mais importante é não ser apanhado em falta. O resultado conhece-se bem: estudantes que preferem não responder a arriscar uma resposta errada, que decoram em vez de compreender e que vivem cada teste como um julgamento.</p>
<p>A investigação sobre a aprendizagem sugere, contudo, outro caminho. Quando erramos e percebemos porquê, o cérebro reorganiza aquilo que julgava saber, e essa correção tende a ficar gravada com mais força do que uma resposta certa dada por acaso. Não admira que os desportistas treinem precisamente os movimentos que falham e que muitos cientistas descrevam as suas descobertas como uma longa sequência de hipóteses rejeitadas.</p>
<p>Isto não significa que o erro deva ser celebrado sem critério. Errar por descuido, repetidamente, sem procurar entender o que falhou, é apenas desperdiçar uma oportunidade. O erro só é útil quando é examinado: quando o aluno volta ao exercício, compara a sua resposta com a correta e identifica o raciocínio que o levou ao engano.</p>
<p>Talvez a escola devesse, por isso, mudar a pergunta que faz aos estudantes. Em vez de «Quantas respostas certas tiveste?», poderia perguntar também «O que aprendeste com as que falhaste?». Essa mudança, aparentemente pequena, transformaria o medo em curiosidade e a avaliação num instrumento de crescimento.</p>
<p>Afinal, quem nunca erra provavelmente nunca tentou nada de novo. Dar aos alunos o direito a errar é dar-lhes, ao mesmo tempo, a possibilidade de aprender.</p></div><p class="src">Texto original Nota20, escrito para este exame.</p>`,
        itens: [
          { n: "1", obrigatorio: true, tipo: "mc", topico: "leitura", enunciado: "No primeiro parágrafo, o autor pretende…", opcoes: ["defender que os alunos não devem ser avaliados.", "mostrar as consequências negativas de encarar o erro como um fracasso.", "elogiar a exigência dos professores.", "explicar como se deve decorar a matéria."], certa: 1, explicacao: "O parágrafo descreve os efeitos de «Não podes errar»: medo de responder, decorar, testes vividos como julgamentos." },
          { n: "2", obrigatorio: true, tipo: "mc", topico: "leitura", enunciado: "A referência aos desportistas e aos cientistas, no segundo parágrafo, funciona como…", opcoes: ["exemplos que ilustram que o erro analisado faz progredir.", "argumento contrário à tese do autor.", "digressão sem relação com o tema.", "conclusão do texto."], certa: 0, explicacao: "São exemplos que confirmam a afirmação anterior sobre o valor do erro compreendido." },
          { n: "3", obrigatorio: false, tipo: "mc", topico: "leitura", enunciado: "No terceiro parágrafo, o autor…", opcoes: ["contradiz o que defendeu antes.", "precisa a sua tese, indicando em que condições o erro é útil.", "defende que todos os erros devem ser celebrados.", "critica os alunos que fazem exercícios."], certa: 1, explicacao: "«Isto não significa que…» limita a tese: o erro só é útil quando é examinado." },
          { n: "4", obrigatorio: false, tipo: "mc", topico: "coesao", enunciado: "Em «Essa mudança, aparentemente pequena», a expressão «Essa mudança» assegura sobretudo coesão…", opcoes: ["interfrásica.", "gramatical referencial, retomando a proposta anterior.", "temporal.", "frásica, por concordância."], certa: 1, explicacao: "O determinante demonstrativo «Essa» retoma (anáfora) a proposta de mudar a pergunta: coesão referencial." },
          { n: "5", obrigatorio: true, tipo: "mc", topico: "funcoes-sintaticas", enunciado: "Na frase «o cérebro reorganiza aquilo que julgava saber», a expressão «aquilo que julgava saber» desempenha a função de…", opcoes: ["sujeito.", "complemento direto.", "complemento oblíquo.", "predicativo do sujeito."], certa: 1, explicacao: "Reorganiza o quê? «aquilo que julgava saber» → reorganiza-o: complemento direto." },
          { n: "6", obrigatorio: true, tipo: "mc", topico: "oracoes", enunciado: "Em «O erro só é útil quando é examinado», a oração «quando é examinado» é subordinada…", opcoes: ["adverbial temporal.", "substantiva completiva.", "adjetiva relativa restritiva.", "adverbial final."], certa: 0, explicacao: "«quando» introduz uma oração adverbial temporal." },
          { n: "7", obrigatorio: false, tipo: "mc", topico: "aspeto-modalidade", enunciado: "Em «Talvez a escola devesse, por isso, mudar a pergunta», estão presentes…", opcoes: ["apenas valor modal epistémico.", "apenas valor modal deôntico.", "valor modal epistémico («talvez») e deôntico («devesse»).", "valor aspetual habitual."], certa: 2, explicacao: "«Talvez» exprime possibilidade (epistémico); «devesse mudar» exprime uma obrigação/recomendação (deôntico)." }
        ] }
    ] },
    { nome: "Grupo III · Escrita", partes: [
      { nome: "Texto de opinião (200 a 350 palavras)", itens: [
        { n: "III", obrigatorio: true, tipo: "texto", cotacao: 44, generoAlvo: "texto de opinião", topico: "texto-opiniao",
          enunciado: "Há quem diga que a inteligência artificial vai tornar desnecessário o esforço de aprender; outros defendem que nunca foi tão importante aprender a pensar. Escreve um texto de opinião, de 200 a 350 palavras, com dois argumentos, cada um ilustrado com um exemplo significativo, e uma conclusão.",
          resolucao: `<p><strong>Plano</strong></p><ol><li><strong>Tese</strong>: a IA não dispensa o esforço de aprender; torna-o mais necessário, porque é preciso saber avaliar o que ela produz.</li><li><strong>Argumento 1 + exemplo</strong>: a IA pode errar ou inventar informação; só quem conhece a matéria deteta o erro (ex.: um aluno que entrega uma resolução com uma citação falsa).</li><li><strong>Argumento 2 + exemplo</strong>: pensar exige prática; a calculadora não acabou com a matemática, mudou o que se treina (ex.: o raciocínio e a resolução de problemas).</li><li><strong>Conclusão</strong>: usar a IA como ferramenta, não como substituto do próprio pensamento.</li></ol>`,
          criterios: ["A: tese + 2 argumentos + 2 exemplos + juízos de valor + conclusão.", "B, C e CL."] }
      ] }
    ] }
  ]
});
