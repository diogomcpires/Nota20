/* Nota20 · Português 639 — Simulado original (formato do exame IAVE 2025/2026)
   Textos literários em domínio público (Camões, Pessoa). Texto do Grupo II original da Nota20. */
window.N20 = window.N20 || { topics: [] };

N20.simulado = {
  id: "simulado-1",
  titulo: "Simulado Nota20 n.º 1",
  duracao: 120, tolerancia: 30,
  descricao: "Camões, «Autopsicografia», um texto sobre o tédio e um texto de opinião. 10 itens obrigatórios + 5 opcionais (contam os 3 melhores) = 200 pontos.",
  grupos: [
    {
      nome: "Grupo I · Educação Literária",
      partes: [
        {
          nome: "Parte A · Luís de Camões",
          texto: `<div class="poem">Amor é fogo que arde sem se ver,<br>é ferida que dói, e não se sente;<br>é um contentamento descontente,<br>é dor que desatina sem doer.<br><br>É um não querer mais que bem querer;<br>é um andar solitário entre a gente;<br>é nunca contentar-se de contente;<br>é um cuidar que ganha em se perder.<br><br>É querer estar preso por vontade;<br>é servir a quem vence, o vencedor;<br>é ter com quem nos mata, lealdade.<br><br>Mas como causar pode seu favor<br>nos corações humanos amizade,<br>se tão contrário a si é o mesmo Amor?</div><p class="src">Luís de Camões, Rimas</p>`,
          itens: [
            {
              n: "1", obrigatorio: true, tipo: "aberta", cotacao: 13,
              enunciado: "Explica de que modo o sujeito poético define o Amor nas duas quadras, referindo dois recursos expressivos.",
              resolucao: `<p>Nas quadras, o sujeito poético define o Amor como uma <strong>experiência contraditória e inexplicável</strong>. Para isso, recorre a uma série de <strong>metáforas</strong> («fogo que arde sem se ver», «ferida que dói, e não se sente») que associam o Amor a sensações intensas mas invisíveis. Usa também <strong>antíteses e oxímoros</strong>, como em «contentamento descontente» ou «dor que desatina sem doer», que juntam ideias opostas para mostrar o carácter paradoxal do sentimento. A <strong>anáfora</strong> do verbo «é» no início dos versos acumula definições, sugerindo que nenhuma consegue esgotar o que o Amor é.</p>`,
              criterios: ["Amor como sentimento contraditório/paradoxal.", "Recurso 1 com citação e efeito (metáfora / antítese / oxímoro / anáfora).", "Recurso 2 com citação e efeito.", "Correção linguística (3)."]
            },
            {
              n: "2", obrigatorio: true, tipo: "aberta", cotacao: 13,
              enunciado: "Interpreta o sentido da interrogação do último terceto, relacionando-a com as estrofes anteriores.",
              resolucao: `<p>Depois de enumerar, nas três primeiras estrofes, os efeitos contraditórios do Amor, o sujeito conclui com uma <strong>interrogação retórica</strong>: como pode o Amor criar «amizade» e harmonia nos corações humanos, se ele próprio é «tão contrário a si»? A pergunta funciona como <strong>conclusão lógica</strong> do soneto, introduzida pela conjunção adversativa «Mas», e sublinha o mistério do Amor: apesar de ser feito de contradições, continua a unir as pessoas. O soneto termina, assim, sem resposta, deixando o leitor perante o paradoxo.</p>`,
              criterios: ["Identifica a interrogação retórica e o seu sentido (paradoxo do Amor que une sendo contraditório).", "Relaciona com as definições contraditórias anteriores.", "Correção linguística."]
            },
            {
              n: "3", obrigatorio: false, tipo: "mc", cotacao: 13,
              enunciado: "O soneto apresenta o esquema rimático…",
              opcoes: ["ABAB ABAB CDC DCD", "ABBA ABBA CDC DCD", "ABBA ABBA CDE CDE", "AABB AABB CCD EED"],
              certa: 1,
              explicacao: "ver/doer/querer/perder (A); sente/descontente/gente/contente (B); vontade/lealdade/amizade (C); vencedor/favor/Amor (D)."
            }
          ]
        },
        {
          nome: "Parte B · Fernando Pessoa",
          texto: `<div class="poem">O poeta é um fingidor.<br>Finge tão completamente<br>Que chega a fingir que é dor<br>A dor que deveras sente.<br><br>E os que leem o que escreve,<br>Na dor lida sentem bem,<br>Não as duas que ele teve,<br>Mas só a que eles não têm.<br><br>E assim nas calhas de roda<br>Gira, a entreter a razão,<br>Esse comboio de corda<br>Que se chama coração.</div><p class="src">Fernando Pessoa, «Autopsicografia»</p>`,
          itens: [
            {
              n: "4", obrigatorio: true, tipo: "aberta", cotacao: 13,
              enunciado: "Explica a conceção de criação poética apresentada na primeira estrofe.",
              resolucao: `<p>Na primeira estrofe, o sujeito define o poeta como «um fingidor». Fingir não significa mentir, mas <strong>transformar intelectualmente a emoção</strong>: o poeta parte de uma dor real, que «deveras sente», e finge-a «tão completamente» que a converte numa dor imaginada, trabalhada pela razão. A poesia nasce, portanto, da <strong>intelectualização do sentimento</strong>, num processo em que a emoção vivida dá origem a uma emoção artística.</p>`,
              criterios: ["Fingimento como transformação/intelectualização da emoção (não mentira).", "Dor real («deveras sente») → dor fingida/poética.", "Correção linguística."]
            },
            {
              n: "5", obrigatorio: true, tipo: "aberta", cotacao: 13,
              enunciado: "Explicita o papel do leitor tal como é apresentado na segunda estrofe.",
              resolucao: `<p>Na segunda estrofe, o leitor surge como o terceiro elemento do processo poético. Ao ler, não sente nem a dor real do poeta nem a dor fingida («Não as duas que ele teve»), mas uma <strong>terceira dor</strong>, a sua, «a que eles não têm»: uma dor <strong>lida</strong>, recriada a partir do texto. O leitor participa, assim, na construção do sentido, vivendo uma emoção que nasce da leitura e não da experiência direta.</p>`,
              criterios: ["Leitor sente uma dor diferente das duas do poeta.", "Dor «lida» / recriada pelo leitor.", "Correção linguística."]
            },
            {
              n: "6", obrigatorio: false, tipo: "multi", cotacao: 13,
              enunciado: "Identifica as três afirmações que se verificam no poema.",
              opcoes: [
                "A. A última estrofe apresenta uma metáfora do coração.",
                "B. O sujeito poético exprime-se sempre na primeira pessoa do singular.",
                "C. Razão e emoção interagem no processo de criação poética.",
                "D. O poema rejeita a importância do sentimento.",
                "E. O poema é formado por quadras, com rima cruzada."
              ],
              certas: [0, 2, 4],
              explicacao: "A: «comboio de corda / Que se chama coração». C: o coração «entretém a razão». E: três quadras com rima ABAB. B é falsa (3.ª pessoa: «O poeta», «eles»); D é falsa (o sentimento é o ponto de partida)."
            }
          ]
        },
        {
          nome: "Parte C · Exposição",
          itens: [
            {
              n: "7", obrigatorio: true, tipo: "aberta", cotacao: 13,
              enunciado: "Numa breve exposição, mostra como os poemas de Camões e de Pessoa refletem sobre a relação entre emoção e razão. Inclui introdução, um aspeto de cada poema e conclusão.",
              resolucao: `<p>Tanto o soneto de Camões como «Autopsicografia», de Pessoa, transformam a emoção em objeto de reflexão racional, ainda que de formas diferentes.</p><p>Em Camões, o sujeito procura <strong>definir racionalmente o Amor</strong> através de uma sucessão de definições e termina com uma pergunta lógica («Mas como causar pode seu favor…»), mostrando que a razão não consegue explicar a contradição do sentimento. Em Pessoa, a razão não tenta explicar a emoção mas <strong>trabalha-a</strong>: o poeta «finge» a dor que sente, e o coração surge como um «comboio de corda» que gira «a entreter a razão».</p><p>Assim, se em Camões a razão se rende ao mistério do Amor, em Pessoa a razão e a emoção colaboram na criação poética.</p>`,
              criterios: ["Introdução que apresenta o tema.", "Aspeto de Camões com citação.", "Aspeto de Pessoa com citação.", "Conclusão; estruturação (3) e correção (2)."]
            }
          ]
        }
      ]
    },
    {
      nome: "Grupo II · Leitura e Gramática",
      partes: [
        {
          nome: "Texto: «O elogio do tédio»",
          texto: `<div class="prose"><h5>O elogio do tédio</h5>
<p>Houve um tempo em que esperar era inevitável. Esperava-se o autocarro, a consulta, a carta que não chegava. Nesses intervalos, sem nada para fazer, a mente divagava: observava-se a rua, inventavam-se histórias para os desconhecidos, recordavam-se conversas antigas. Hoje, esses intervalos quase desapareceram. Basta um segundo de espera para que a mão procure o telemóvel, como se o vazio fosse uma ameaça que é preciso afastar a todo o custo.</p>
<p>Os psicólogos têm mostrado, contudo, que o tédio não é um inimigo. Quando não somos estimulados por nada, o cérebro ativa redes associadas à imaginação, à memória e ao planeamento do futuro. É nesse estado aparentemente improdutivo que surgem muitas ideias inesperadas. Não admira que tantos escritores e cientistas contem que as suas melhores intuições lhes ocorreram durante um passeio, no duche ou numa viagem de comboio.</p>
<p>O problema é que fomos ensinados a encarar cada minuto livre como uma oportunidade de consumo. As aplicações que usamos foram desenhadas para que nunca as larguemos, oferecendo-nos uma novidade atrás da outra. Assim, trocamos a lentidão fértil do pensamento por uma sucessão de estímulos breves, que nos ocupam sem nos alimentar.</p>
<p>Talvez devêssemos, por isso, reaprender a arte de não fazer nada. Deixar o telemóvel no bolso durante uma viagem, olhar pela janela, tolerar alguns minutos de silêncio: gestos simples que, no entanto, exigem hoje uma pequena coragem. Quem o faz descobre, muitas vezes, que o tédio é apenas a porta de entrada para algo mais interessante: o encontro connosco próprios.</p>
<p>Defender o tédio não é defender a preguiça. É reconhecer que a mente, tal como a terra, precisa de pousio para voltar a dar fruto.</p></div><p class="src">Texto original Nota20, escrito para este simulado.</p>`,
          itens: [
            { n: "1", obrigatorio: true, tipo: "mc", cotacao: 13, enunciado: "No primeiro parágrafo, o autor pretende…", opcoes: ["criticar a demora dos serviços públicos.", "contrastar a experiência da espera no passado com a atual fuga ao vazio.", "defender o regresso à escrita de cartas.", "mostrar que a imaginação depende do telemóvel."], certa: 1, explicacao: "«Houve um tempo…» vs. «Hoje…»: o parágrafo opõe o passado (espera que fazia divagar) ao presente (o telemóvel preenche qualquer vazio)." },
            { n: "2", obrigatorio: false, tipo: "mc", cotacao: 13, enunciado: "A comparação «como se o vazio fosse uma ameaça que é preciso afastar a todo o custo» sugere que…", opcoes: ["o vazio é perigoso para a saúde.", "as pessoas reagem ao tédio como algo a evitar a qualquer preço.", "o telemóvel é uma ameaça para quem espera.", "a espera se tornou agradável."], certa: 1, explicacao: "A comparação mostra a reação exagerada de fuga ao vazio, como se fosse um perigo." },
            { n: "3", obrigatorio: true, tipo: "mc", cotacao: 13, enunciado: "No segundo parágrafo, a referência a escritores e cientistas funciona como…", opcoes: ["argumento que contradiz a tese do autor.", "exemplo que ilustra a ideia de que o tédio favorece a criatividade.", "digressão sem relação com o tema.", "conclusão do texto."], certa: 1, explicacao: "Os exemplos (passeio, duche, comboio) ilustram a afirmação anterior: no tédio surgem ideias inesperadas." },
            { n: "4", obrigatorio: false, tipo: "mc", cotacao: 13, enunciado: "Na última frase, a comparação entre a mente e a terra que precisa de pousio sugere que…", opcoes: ["a mente deve ser ocupada com estudo constante.", "o descanso mental é necessário para a criatividade.", "o trabalho agrícola estimula a imaginação.", "o tédio e a preguiça são equivalentes."], certa: 1, explicacao: "Pousio = descanso da terra para voltar a produzir. A mente também precisa de pausas para «dar fruto»." },
            { n: "5", obrigatorio: true, tipo: "mc", cotacao: 13, enunciado: "Em «Os psicólogos têm mostrado», a forma verbal exprime valor aspetual…", opcoes: ["perfetivo.", "genérico.", "iterativo.", "habitual."], certa: 2, explicacao: "O pretérito perfeito composto («têm mostrado») indica uma situação repetida num intervalo que chega ao presente: valor iterativo." },
            { n: "6", obrigatorio: false, tipo: "mc", cotacao: 13, enunciado: "A oração «para que nunca as larguemos» classifica-se como subordinada…", opcoes: ["adverbial final.", "adverbial consecutiva.", "substantiva completiva.", "adjetiva relativa restritiva."], certa: 0, explicacao: "«para que» introduz a finalidade com que as aplicações foram desenhadas: oração final." },
            { n: "7", obrigatorio: true, tipo: "mc", cotacao: 13, enunciado: "Em «Quem o faz descobre, muitas vezes, que o tédio é apenas a porta de entrada…», o pronome «o» refere-se…", opcoes: ["ao telemóvel.", "ao tédio.", "aos gestos de deixar o telemóvel, olhar pela janela e tolerar o silêncio.", "ao encontro connosco próprios."], certa: 2, explicacao: "«o» retoma (anáfora) o conjunto de ações enumeradas antes: é coesão referencial." }
          ]
        }
      ]
    },
    {
      nome: "Grupo III · Escrita",
      partes: [
        {
          nome: "Texto de opinião (200 a 350 palavras)",
          itens: [
            {
              n: "III", obrigatorio: true, tipo: "texto", cotacao: 44, generoAlvo: "texto de opinião",
              enunciado: "Há quem defenda que o tempo livre deve ser sempre aproveitado de forma produtiva; outros consideram que o direito ao ócio é essencial. Escreve um texto de opinião, de 200 a 350 palavras, em que defendas um ponto de vista com dois argumentos, cada um ilustrado com um exemplo significativo, e uma conclusão coerente.",
              resolucao: `<p><strong>Plano de resposta</strong></p><ol><li><strong>Introdução</strong>: o tempo livre tornou-se mais um espaço de rendimento (cursos, metas, redes); tese: o ócio não é tempo perdido, é condição de equilíbrio e criatividade.</li><li><strong>Argumento 1 + exemplo</strong>: o descanso protege a saúde mental (ex.: esgotamento de estudantes que preenchem todo o tempo livre com explicações e atividades).</li><li><strong>Argumento 2 + exemplo</strong>: muitas ideias nascem quando a mente vagueia (ex.: um passeio sem telemóvel, a observação que inspira um projeto).</li><li><strong>Conclusão</strong>: ser produtivo também exige saber parar; o ócio é um direito e um investimento.</li></ol><p>Liga as partes com conectores (em primeiro lugar, além disso, contudo, em suma) e mantém-te entre 200 e 350 palavras.</p>`,
              criterios: ["A: tese + 2 argumentos + 2 exemplos + juízos de valor + conclusão.", "B: pertinência, sem desvios.", "C: organização e coesão.", "CL: correção linguística."]
            }
          ]
        }
      ]
    }
  ]
};
