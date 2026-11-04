/* Nota20 · Simulados originais n.º 2 e n.º 3 (formato do exame 2025/2026)
   Textos literários em domínio público; textos do Grupo II originais da Nota20. */
window.N20 = window.N20 || { topics: [] };

N20.simulados = [N20.simulado].concat([
{
  id: "simulado-2",
  titulo: "Simulado Nota20 n.º 2",
  duracao: 120, tolerancia: 30,
  descricao: "Álvaro de Campos, Antero de Quental, um texto sobre a leitura lenta e um texto de opinião. 10 itens obrigatórios + 5 opcionais (contam os 3 melhores) = 200 pontos.",
  grupos: [
    { nome: "Grupo I · Educação Literária", partes: [
      { nome: "Parte A · Álvaro de Campos",
        texto: `<div class="poem">Todas as cartas de amor são<br>Ridículas.<br>Não seriam cartas de amor se não fossem<br>Ridículas.<br><br>Também escrevi em meu tempo cartas de amor,<br>Como as outras,<br>Ridículas.<br><br>As cartas de amor, se há amor,<br>Têm de ser<br>Ridículas.<br><br>Mas, afinal,<br>Só as criaturas que nunca escreveram<br>Cartas de amor<br>É que são<br>Ridículas.<br><br>Quem me dera no tempo em que escrevia<br>Sem dar por isso<br>Cartas de amor<br>Ridículas.<br><br>A verdade é que hoje<br>As minhas memórias<br>Dessas cartas de amor<br>É que são<br>Ridículas.<br><br>(Todas as palavras esdrúxulas,<br>Como os sentimentos esdrúxulos,<br>São naturalmente<br>Ridículas.)</div><p class="src">Álvaro de Campos (1935)</p>`,
        itens: [
          { n: "1", obrigatorio: true, tipo: "aberta", cotacao: 13, topico: "heteronimos",
            enunciado: "Explica a evolução da atitude do sujeito poético em relação às cartas de amor ao longo do poema.",
            resolucao: `<p>O sujeito começa por afirmar, como uma verdade geral, que todas as cartas de amor são ridículas, e que esse ridículo faz parte da sua natureza. Em seguida, <strong>inclui-se</strong> nessa afirmação: também escreveu cartas «Como as outras». A partir da quarta estrofe, a perspetiva <strong>inverte-se</strong>: ridículos são os que nunca escreveram cartas de amor, ou seja, os que nunca amaram. Na quinta estrofe, surge a <strong>nostalgia</strong> do tempo em que escrevia «Sem dar por isso», e, por fim, reconhece que hoje ridículas são as suas memórias. O poema passa, assim, da troça à valorização do amor e à melancolia.</p>`,
            criterios: ["Afirmação geral do ridículo / inclusão do próprio sujeito.", "Inversão: ridículos são os que nunca amaram; nostalgia do passado e das memórias.", "Correção linguística."] },
          { n: "2", obrigatorio: true, tipo: "aberta", cotacao: 13, topico: "heteronimos",
            enunciado: "Interpreta o sentido da última estrofe, entre parênteses.",
            resolucao: `<p>Na última estrofe, o sujeito faz um comentário <strong>metalinguístico</strong>: a própria palavra «ridículas» é esdrúxula, tal como os «sentimentos esdrúxulos», isto é, excessivos, exagerados. O parêntese funciona como um <strong>aparte autoirónico</strong>: o poeta sorri da intensidade dos sentimentos amorosos e da linguagem que os exprime, terminando o poema com humor e distância, típicos da fase intimista de Campos.</p>`,
            criterios: ["Jogo com a palavra esdrúxula «ridículas» / reflexão sobre a linguagem.", "Sentimentos esdrúxulos = excessivos; autoironia, distanciamento.", "Correção linguística."] },
          { n: "3", obrigatorio: false, tipo: "mc", cotacao: 13, topico: "heteronimos",
            enunciado: "A repetição da palavra «Ridículas» no final de quase todas as estrofes…",
            opcoes: ["é uma anáfora que marca o início de cada ideia.", "funciona como refrão, dando unidade e ritmo ao poema.", "é uma aliteração que imita um som.", "cria uma rima interna em cada verso."],
            certa: 1, explicacao: "A palavra isolada no fim das estrofes funciona como refrão (epífora)." }
        ] },
      { nome: "Parte B · Antero de Quental, «O Palácio da Ventura»",
        texto: `<div class="poem">Sonho que sou um cavaleiro andante.<br>Por desertos, por sóis, por noite escura,<br>Paladino do amor, busco anelante<br>O palácio encantado da Ventura!<br><br>Mas já desmaio, exausto e vacilante,<br>Quebrada a espada já, rota a armadura...<br>E eis que súbito o avisto, fulgurante<br>Na sua pompa e aérea formosura!<br><br>Com grandes golpes bato à porta e brado:<br>Eu sou o Vagabundo, o Deserdado...<br>Abri-vos, portas d'ouro, ante meus ais!<br><br>Abrem-se as portas d'ouro, com fragor...<br>Mas dentro encontro só, cheio de dor,<br>Silêncio e escuridão — e nada mais!</div><p class="src">Antero de Quental, Sonetos</p>`,
        itens: [
          { n: "4", obrigatorio: true, tipo: "aberta", cotacao: 13, topico: "antero",
            enunciado: "Caracteriza o sujeito poético das duas quadras, com base em duas referências textuais.",
            resolucao: `<p>O sujeito sonha ser um <strong>cavaleiro andante</strong>, um «Paladino do amor» que procura, com ânsia («anelante»), o palácio da Ventura, símbolo do Ideal e da felicidade. É uma figura <strong>idealista e persistente</strong>, que atravessa «desertos», «sóis» e «noite escura». Na segunda quadra, revela-se <strong>exausto e derrotado</strong>: desmaia, «exausto e vacilante», com a espada quebrada e a armadura rota, o que mostra o desgaste dessa busca.</p>`,
            criterios: ["Cavaleiro andante idealista em busca do Ideal/Ventura (referência).", "Exaustão e desgaste da busca (referência).", "Correção linguística."] },
          { n: "5", obrigatorio: true, tipo: "aberta", cotacao: 13, topico: "antero",
            enunciado: "Explica o sentido do último terceto, relacionando-o com o resto do soneto.",
            resolucao: `<p>Depois de uma longa busca e de ver, finalmente, o palácio «fulgurante», o sujeito consegue que as portas se abram. No entanto, a conjunção «Mas» introduz a <strong>desilusão</strong>: dentro só há «Silêncio e escuridão — e nada mais!». O contraste entre o brilho exterior e o vazio interior mostra que o Ideal é <strong>inatingível ou ilusório</strong>. O final exprime o pessimismo de Antero: a busca da felicidade termina no nada.</p>`,
            criterios: ["Desilusão: o palácio está vazio («Silêncio e escuridão»).", "Contraste com a esperança/o brilho anterior; ideal inatingível; pessimismo.", "Correção linguística."] },
          { n: "6", obrigatorio: false, tipo: "multi", cotacao: 13, topico: "antero",
            enunciado: "Identifica as três afirmações verdadeiras sobre o soneto.",
            opcoes: ["A. É composto por duas quadras e dois tercetos, em versos decassílabos.", "B. O sujeito encontra no palácio a felicidade que procurava.", "C. A exclamação final reforça a desilusão do sujeito.", "D. A figura do cavaleiro andante remete para o imaginário das novelas de cavalaria.", "E. O poema está escrito na terceira pessoa."],
            certas: [0, 2, 3], explicacao: "A, C e D. O palácio está vazio (B é falsa) e o sujeito fala na primeira pessoa (E é falsa)." }
        ] },
      { nome: "Parte C · Exposição", itens: [
        { n: "7", obrigatorio: true, tipo: "aberta", cotacao: 13, topico: "exposicao",
          enunciado: "Escreve uma breve exposição sobre o amor como fonte de sofrimento na lírica de Camões e em Amor de Perdição. Inclui introdução, um aspeto de cada obra e conclusão.",
          resolucao: `<p>Em épocas e géneros diferentes, a lírica de Camões e <em>Amor de Perdição</em>, de Camilo, apresentam o amor como uma experiência intensa que traz sofrimento.</p><p>Em Camões, o amor é vivido como <strong>contradição</strong>: é «fogo que arde sem se ver» e «ferida que dói, e não se sente». O sujeito sofre porque o amor é paradoxal e, muitas vezes, pela ausência ou morte da amada, refletindo sobre esse sofrimento de forma racional. Em <em>Amor de Perdição</em>, o amor de Simão e Teresa é uma <strong>paixão fatal</strong> que desafia as famílias e a sociedade: conduz à prisão, ao degredo e à morte dos amantes, e também de Mariana.</p><p>Em suma, se em Camões o sofrimento amoroso é objeto de reflexão, em Camilo é o motor de um destino trágico.</p>`,
          criterios: ["Introdução.", "Camões: amor contraditório, sofrimento, reflexão.", "Camilo: paixão fatal que leva à perdição e à morte.", "Conclusão; estruturação e correção."] }
      ] }
    ] },
    { nome: "Grupo II · Leitura e Gramática", partes: [
      { nome: "«Elogio da leitura lenta» (texto original Nota20)",
        texto: `<div class="prose"><p>Há uns anos, uma amiga confessou-me, quase envergonhada, que demorava um mês a ler um romance. Disse-o como quem admite um defeito. Lembrei-me dela recentemente, ao ver anunciada uma aplicação que promete «ler» dez livros por semana através de resumos de quinze minutos. Talvez a minha amiga estivesse apenas fora de moda; talvez estivesse certa.</p><p>Ler depressa tem, naturalmente, as suas vantagens. Num relatório, num manual de instruções ou numa notícia, procuramos informação e queremos encontrá-la sem perder tempo. Ninguém lê um horário de comboios devagar, à espera de descobrir nele um sentido oculto. O problema começa quando aplicamos à literatura a mesma pressa com que consultamos um horário.</p><p>Um romance não é um depósito de informação que se possa esvaziar. É uma experiência que só acontece enquanto lemos. Quando alguém me conta que <em>Os Maias</em> termina com dois amigos a correr para apanhar o americano, conta-me um facto; mas não me dá a ironia, a melancolia e o riso que esse final provoca em quem acompanhou, página a página, a vida de Carlos e de Ega. O resumo informa; o livro transforma.</p><p>Há, além disso, uma razão menos evidente para defender a leitura lenta. Ler devagar é treinar a atenção, essa capacidade de permanecer com uma ideia sem fugir para a seguinte. Num tempo em que tudo nos convida a saltar de ecrã em ecrã, a atenção tornou-se um bem escasso e, talvez por isso, tão valioso.</p><p>Não proponho que se leia tudo com lentidão, nem que se despreze quem lê muito. Proponho apenas que se recuse a ideia de que a velocidade é sempre uma virtude. Afinal, ninguém se gaba de ter ouvido uma sinfonia em cinco minutos.</p><p>A minha amiga continua a demorar um mês a ler um romance. Hoje, quando lhe pergunto o que está a ler, já não pede desculpa.</p></div><p class="src">Texto original da Nota20</p>`,
        itens: [
          { n: "1", obrigatorio: true, tipo: "mc", cotacao: 13, topico: "leitura", enunciado: "No primeiro parágrafo, a referência à amiga serve para…", opcoes: ["introduzir o tema através de um episódio pessoal, que será retomado no final.", "criticar a amiga por ler devagar.", "apresentar dados sobre hábitos de leitura.", "defender as aplicações de resumos."], certa: 0, explicacao: "O episódio abre e fecha o texto (estrutura circular)." },
          { n: "2", obrigatorio: true, tipo: "mc", cotacao: 13, topico: "leitura", enunciado: "No segundo parágrafo, o autor…", opcoes: ["rejeita qualquer forma de leitura rápida.", "admite que a leitura rápida é útil em certos textos, antes de apontar o problema.", "defende que os horários devem ser lidos com atenção ao sentido oculto.", "critica os manuais de instruções."], certa: 1, explicacao: "É uma concessão: reconhece vantagens antes de introduzir «O problema»." },
          { n: "3", obrigatorio: false, tipo: "mc", cotacao: 13, topico: "coesao", enunciado: "A expressão «além disso» (quarto parágrafo) introduz…", opcoes: ["uma oposição.", "um argumento adicional.", "uma conclusão.", "um exemplo."], certa: 1, explicacao: "Conector aditivo: acrescenta uma segunda razão." },
          { n: "4", obrigatorio: true, tipo: "mc", cotacao: 13, topico: "funcoes-sintaticas", enunciado: "Em «Disse-o como quem admite um defeito», o pronome «o» desempenha a função de…", opcoes: ["complemento indireto.", "complemento direto.", "sujeito.", "complemento oblíquo."], certa: 1, explicacao: "«Disse isso»: o pronome «o» substitui o que foi dito (CD)." },
          { n: "5", obrigatorio: false, tipo: "mc", cotacao: 13, topico: "oracoes", enunciado: "A oração «que promete «ler» dez livros por semana» classifica-se como…", opcoes: ["subordinada adjetiva relativa explicativa.", "subordinada substantiva completiva.", "subordinada adjetiva relativa restritiva.", "subordinada adverbial final."], certa: 2, explicacao: "Tem antecedente («uma aplicação») e restringe-o, sem vírgulas." },
          { n: "6", obrigatorio: true, tipo: "mc", cotacao: 13, topico: "aspeto-modalidade", enunciado: "Em «Ninguém lê um horário de comboios devagar», o valor aspetual é…", opcoes: ["perfetivo.", "habitual.", "genérico.", "iterativo."], certa: 2, explicacao: "Exprime uma verdade geral, válida em qualquer tempo." },
          { n: "7", obrigatorio: false, tipo: "mc", cotacao: 13, topico: "leitura", enunciado: "A frase final do texto sugere que a amiga…", opcoes: ["deixou de ler romances.", "já não se envergonha do seu ritmo de leitura.", "passou a usar a aplicação de resumos.", "convenceu o autor a ler mais depressa."], certa: 1, explicacao: "Antes pedia desculpa; agora não, o que confirma a tese do texto." }
        ] }
    ] },
    { nome: "Grupo III · Escrita", partes: [
      { nome: "Texto de opinião (200 a 350 palavras)", itens: [
        { n: "III", obrigatorio: true, tipo: "texto", cotacao: 44, generoAlvo: "texto de opinião", topico: "texto-opiniao",
          enunciado: "Tornar-se conhecido nas redes sociais é um objetivo de vida tão válido como outro qualquer? Escreve um texto de opinião (200 a 350 palavras), com dois argumentos, cada um ilustrado com um exemplo significativo, e uma conclusão.",
          resolucao: `<p><strong>Plano possível</strong></p><ol><li><strong>Tese</strong>: a visibilidade pode ser uma consequência de um trabalho com valor, mas é um objetivo frágil quando procurada por si mesma.</li><li><strong>Argumento 1 + exemplo</strong>: há quem use as redes para divulgar um talento ou uma causa (um músico que lança as primeiras canções, uma divulgadora de ciência), e aí a fama é um meio, não um fim.</li><li><strong>Argumento 2 + exemplo</strong>: perseguir seguidores torna a pessoa dependente da aprovação dos outros e de algoritmos que mudam de um dia para o outro (contas que perdem alcance de repente; pressão para publicar sempre mais).</li><li><strong>Conclusão</strong>: um objetivo de vida deve depender do que fazemos e não do número de pessoas que nos veem.</li></ol>`,
          criterios: ["A: ponto de vista + 2 argumentos + 2 exemplos + juízos de valor + conclusão.", "B: tema sem desvios.", "C: organização e coesão.", "CL: correção linguística (14)."] }
      ] }
    ] }
  ]
},
{
  id: "simulado-3",
  titulo: "Simulado Nota20 n.º 3",
  duracao: 120, tolerancia: 30,
  descricao: "Fernando Pessoa ortónimo, Camões lírico, um texto sobre as cidades e o turismo e um texto de opinião. 10 itens obrigatórios + 5 opcionais (contam os 3 melhores) = 200 pontos.",
  grupos: [
    { nome: "Grupo I · Educação Literária", partes: [
      { nome: "Parte A · Fernando Pessoa, «Não sei quantas almas tenho» (excerto)",
        texto: `<div class="poem">Não sei quantas almas tenho.<br>Cada momento mudei.<br>Continuamente me estranho.<br>Nunca me vi nem acabei.<br>[…]<br><br>Atento ao que sou e vejo,<br>Torno-me eles e não eu.<br>Cada meu sonho ou desejo<br>É do que nasce e não meu.<br>Sou minha própria paisagem;<br>Assisto à minha passagem,<br>Diverso, móbil e só,<br>Não sei sentir-me onde estou.<br><br>Por isso, alheio, vou lendo<br>Como páginas, meu ser.<br>O que segue não prevendo,<br>O que passou a esquecer.<br>Noto à margem do que li<br>O que julguei que senti.<br>Releio e digo: «Fui eu?»<br>Deus sabe, porque o escreveu.</div><p class="src">Fernando Pessoa (1930)</p>`,
        itens: [
          { n: "1", obrigatorio: true, tipo: "aberta", cotacao: 13, topico: "pessoa-ortonimo",
            enunciado: "Explica de que modo os quatro primeiros versos exprimem a fragmentação do «eu».",
            resolucao: `<p>O sujeito poético afirma que não sabe «quantas almas» tem, o que sugere que é <strong>múltiplo</strong> e não uma identidade única. Diz também que muda a «cada momento» e que se estranha «continuamente», isto é, não se reconhece a si próprio. Por fim, confessa que nunca se viu «nem acabou», o que mostra que a sua identidade é <strong>instável e inacabada</strong>. Estes versos exprimem, assim, a fragmentação do «eu».</p>`,
            criterios: ["Multiplicidade: «quantas almas tenho».", "Mudança e estranhamento constantes; identidade instável e inacabada.", "Correção linguística."] },
          { n: "2", obrigatorio: true, tipo: "aberta", cotacao: 13, topico: "pessoa-ortonimo",
            enunciado: "Interpreta os versos «Sou minha própria paisagem; / Assisto à minha passagem».",
            resolucao: `<p>O sujeito vê-se a si mesmo <strong>de fora</strong>, como se fosse uma paisagem que observa. Em vez de viver as suas emoções, <strong>assiste</strong> a elas, como um espectador que vê alguém passar. Esta atitude revela o <strong>desdobramento</strong> do «eu» entre quem sente e quem observa, e a consequente sensação de alheamento: o sujeito está «Diverso, móbil e só» e não consegue sentir-se onde está.</p>`,
            criterios: ["O «eu» observa-se de fora, como espectador de si mesmo.", "Desdobramento / alheamento (ligação a «Diverso, móbil e só»).", "Correção linguística."] },
          { n: "3", obrigatorio: false, tipo: "mc", cotacao: 13, topico: "pessoa-ortonimo",
            enunciado: "Na última estrofe, a comparação do «eu» a um livro («vou lendo / Como páginas, meu ser») sugere que o sujeito…",
            opcoes: ["conhece perfeitamente a sua história.", "se observa como um leitor de si próprio, sem se reconhecer no que leu.", "prefere os livros à vida.", "decide escrever as suas memórias."],
            certa: 1, explicacao: "Ao reler-se, pergunta «Fui eu?»: não se reconhece." }
        ] },
      { nome: "Parte B · Luís de Camões",
        texto: `<div class="poem">Alma minha gentil, que te partiste<br>Tão cedo desta vida, descontente,<br>Repousa lá no Céu eternamente,<br>E viva eu cá na terra sempre triste.<br><br>Se lá no assento etéreo, onde subiste,<br>Memória desta vida se consente,<br>Não te esqueças daquele amor ardente<br>Que já nos olhos meus tão puro viste.<br><br>E se vires que pode merecer-te<br>Alguma cousa a dor que me ficou<br>Da mágoa, sem remédio, de perder-te,<br><br>Roga a Deus, que teus anos encurtou,<br>Que tão cedo de cá me leve a ver-te,<br>Quão cedo de meus olhos te levou.</div><p class="src">Luís de Camões, Rimas</p>`,
        itens: [
          { n: "4", obrigatorio: true, tipo: "aberta", cotacao: 13, topico: "camoes-lirico",
            enunciado: "Explica o pedido que o sujeito poético dirige à amada nas duas quadras.",
            resolucao: `<p>O sujeito dirige-se à amada morta através de uma <strong>apóstrofe</strong> («Alma minha gentil»). Na primeira quadra, deseja que ela <strong>repouse eternamente no Céu</strong>, enquanto ele fica na terra, triste. Na segunda, pede-lhe que, se no Céu for permitido guardar memória desta vida, <strong>não se esqueça</strong> do amor «ardente» e «puro» que viu nos seus olhos.</p>`,
            criterios: ["Desejo de repouso eterno para a amada / tristeza do sujeito na terra.", "Pedido para que não esqueça o amor puro (se houver memória no Céu).", "Correção linguística."] },
          { n: "5", obrigatorio: true, tipo: "aberta", cotacao: 13, topico: "camoes-lirico",
            enunciado: "Mostra como os tercetos exprimem o desejo do sujeito poético.",
            resolucao: `<p>Nos tercetos, o sujeito pede à amada que, se a sua dor o merecer, <strong>rogue a Deus</strong> que o leve desta vida tão cedo como a levou a ela, para a poder <strong>voltar a ver</strong>. A estrutura paralela «tão cedo… / Quão cedo» sublinha a ideia de que a morte é desejada como <strong>reencontro</strong>. O amor sobrevive à morte e só no Céu pode realizar-se plenamente.</p>`,
            criterios: ["Pedido de intercessão junto de Deus para morrer cedo e reencontrar a amada.", "Paralelismo «tão cedo… / Quão cedo»; morte como reencontro.", "Correção linguística."] },
          { n: "6", obrigatorio: false, tipo: "mc", cotacao: 13, topico: "camoes-lirico",
            enunciado: "No soneto, o amor é apresentado como…",
            opcoes: ["um sentimento sensual e terreno.", "um amor espiritual, que sobrevive à morte, de inspiração neoplatónica.", "um jogo cortês sem sofrimento.", "uma experiência cómica."],
            certa: 1, explicacao: "Amor puro, idealizado, que aspira ao reencontro no Céu." }
        ] },
      { nome: "Parte C · Exposição", itens: [
        { n: "7", obrigatorio: true, tipo: "aberta", cotacao: 13, topico: "exposicao",
          enunciado: "Escreve uma breve exposição sobre a forma como Camões lírico e Ricardo Reis encaram a passagem do tempo. Inclui introdução, um aspeto de cada autor e conclusão.",
          resolucao: `<p>A passagem do tempo é um tema central da lírica portuguesa, mas Camões e Ricardo Reis reagem-lhe de forma muito diferente.</p><p>Em Camões, sobretudo em «Mudam-se os tempos, mudam-se as vontades», a mudança é constante e traz <strong>mágoa e desconcerto</strong>: o tempo transforma tudo, as alegrias passadas só deixam saudade e até a forma de mudar se alterou. Em Ricardo Reis, pelo contrário, a consciência da brevidade da vida leva a uma atitude de <strong>aceitação serena</strong>: inspirado no epicurismo e no estoicismo, o sujeito procura gozar o momento com moderação (carpe diem) e aceitar o destino sem perturbação.</p><p>Assim, enquanto Camões sofre com a passagem do tempo, Reis procura neutralizar esse sofrimento através da razão.</p>`,
          criterios: ["Introdução.", "Camões: mudança, mágoa, desconcerto.", "Reis: aceitação serena, carpe diem, ataraxia.", "Conclusão; estruturação e correção."] }
      ] }
    ] },
    { nome: "Grupo II · Leitura e Gramática", partes: [
      { nome: "«A cidade emprestada» (texto original Nota20)",
        texto: `<div class="prose"><p>Na rua onde a minha avó viveu cinquenta anos, já quase ninguém mora. As janelas continuam abertas, as plantas continuam nas varandas, mas quem as rega muda todas as semanas. O prédio tornou-se um pequeno hotel sem receção, onde se entra com um código enviado por mensagem.</p><p>Seria fácil culpar os turistas, mas seria injusto. Quem viaja quer conhecer, e é natural que procure os bairros antigos, onde as ruas são estreitas e as fachadas contam histórias. O turismo trouxe dinheiro, recuperou edifícios que estavam em ruínas e devolveu vida a zonas que muitos tinham abandonado. Ninguém tem saudades das casas a cair.</p><p>O problema é outro. Uma cidade não é só um conjunto de monumentos: é feita das pessoas que a habitam, das mercearias, das conversas à porta, das crianças que vão para a escola. Quando os moradores saem porque não conseguem pagar a renda, o bairro conserva a aparência, mas perde a alma. Fica uma cidade emprestada, bonita e vazia, que se mostra a quem passa e não pertence a ninguém.</p><p>Há cidades europeias que já limitaram o alojamento de curta duração em certas zonas, e há quem proteja o comércio tradicional ou reserve casas para quem lá vive e trabalha. Nenhuma medida é perfeita, e todas têm opositores. Mas recusar qualquer limite é aceitar que o futuro de um bairro seja decidido apenas por quem pode pagar mais.</p><p>Talvez o melhor elogio que se possa fazer a uma cidade seja este: que valha a pena visitá-la porque há quem lá viva.</p></div><p class="src">Texto original da Nota20</p>`,
        itens: [
          { n: "1", obrigatorio: true, tipo: "mc", cotacao: 13, topico: "leitura", enunciado: "O primeiro parágrafo serve sobretudo para…", opcoes: ["descrever a arquitetura de um prédio antigo.", "ilustrar, com um caso concreto, a transformação dos bairros históricos.", "criticar a avó do autor.", "elogiar os hotéis modernos."], certa: 1, explicacao: "O exemplo da rua da avó introduz o tema." },
          { n: "2", obrigatorio: true, tipo: "mc", cotacao: 13, topico: "leitura", enunciado: "No segundo parágrafo, o autor…", opcoes: ["culpa os turistas pelos problemas das cidades.", "reconhece os benefícios do turismo, afastando uma explicação simplista.", "defende o fim do turismo nos bairros antigos.", "apresenta estatísticas sobre o turismo."], certa: 1, explicacao: "Concessão: «Seria fácil culpar os turistas, mas seria injusto»." },
          { n: "3", obrigatorio: false, tipo: "mc", cotacao: 13, topico: "recursos-expressivos", enunciado: "A expressão «uma cidade emprestada» é…", opcoes: ["uma comparação.", "uma metáfora que sugere uma cidade que não pertence a quem a habita.", "uma hipérbole sem sentido figurado.", "uma ironia sobre os preços."], certa: 1, explicacao: "A cidade «empresta-se» a quem passa e deixa de ser dos moradores." },
          { n: "4", obrigatorio: true, tipo: "mc", cotacao: 13, topico: "funcoes-sintaticas", enunciado: "Em «Ninguém tem saudades das casas a cair», o segmento «das casas a cair» desempenha a função de…", opcoes: ["complemento oblíquo.", "complemento do nome.", "modificador restritivo do nome.", "complemento direto."], certa: 1, explicacao: "Completa o nome «saudades» (saudades de quê?)." },
          { n: "5", obrigatorio: false, tipo: "mc", cotacao: 13, topico: "oracoes", enunciado: "A oração «porque não conseguem pagar a renda» classifica-se como…", opcoes: ["subordinada adverbial causal.", "subordinada adverbial final.", "coordenada explicativa.", "subordinada adverbial consecutiva."], certa: 0, explicacao: "Indica a causa da saída dos moradores." },
          { n: "6", obrigatorio: true, tipo: "mc", cotacao: 13, topico: "coesao", enunciado: "No quarto parágrafo, o conector «Mas» introduz…", opcoes: ["uma consequência das medidas.", "uma oposição que conduz à posição do autor.", "um exemplo.", "uma enumeração."], certa: 1, explicacao: "Depois de reconhecer as limitações das medidas, o autor afirma a sua tese." },
          { n: "7", obrigatorio: false, tipo: "mc", cotacao: 13, topico: "aspeto-modalidade", enunciado: "Em «Nenhuma medida é perfeita», a modalidade predominante é…", opcoes: ["deôntica.", "epistémica, com valor de certeza.", "apreciativa.", "deôntica, com valor de permissão."], certa: 1, explicacao: "O autor afirma algo como certo (asserção categórica)." }
        ] }
    ] },
    { nome: "Grupo III · Escrita", partes: [
      { nome: "Texto de opinião (200 a 350 palavras)", itens: [
        { n: "III", obrigatorio: true, tipo: "texto", cotacao: 44, generoAlvo: "texto de opinião", topico: "texto-opiniao",
          enunciado: "Devem as cidades impor limites ao turismo para proteger quem lá vive? Escreve um texto de opinião (200 a 350 palavras), com dois argumentos, cada um ilustrado com um exemplo significativo, e uma conclusão.",
          resolucao: `<p><strong>Plano possível</strong></p><ol><li><strong>Tese</strong>: o turismo deve ser bem-vindo, mas com limites que garantam que os bairros continuam habitados.</li><li><strong>Argumento 1 + exemplo</strong>: sem moradores, o comércio local desaparece e os bairros perdem a identidade que atrai os próprios turistas (mercearias substituídas por lojas de recordações).</li><li><strong>Argumento 2 + exemplo</strong>: a habitação é um direito; quando as casas passam a alojamento de curta duração, as rendas sobem e os jovens e as famílias são empurrados para longe do trabalho e da escola.</li><li><strong>Contra-argumento</strong> (opcional): o turismo cria emprego e recupera edifícios, por isso a solução é equilibrar, não proibir.</li><li><strong>Conclusão</strong>: uma cidade só vale a pena visitar se tiver quem lá viva.</li></ol>`,
          criterios: ["A: ponto de vista + 2 argumentos + 2 exemplos + juízos de valor + conclusão.", "B: tema sem desvios.", "C: organização e coesão.", "CL: correção linguística (14)."] }
      ] }
    ] }
  ]
}
]);
