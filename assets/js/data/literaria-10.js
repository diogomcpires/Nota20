/* Nota20 · Português 639 — Educação Literária 10.º ano */
window.N20 = window.N20 || { topics: [] };

N20.topics.push(
{
  id: "trovadoresca",
  grupo: "I", ano: "10.º", free: false,
  titulo: "Poesia trovadoresca",
  subtitulo: "Cantigas de amigo, de amor, de escárnio e de maldizer",
  resumo: `
<p>A poesia trovadoresca é a primeira grande manifestação literária em galego-português (séculos XII a XIV). As cantigas eram feitas para serem cantadas e chegaram até nós em três <strong>cancioneiros</strong>: da Ajuda, da Vaticana e da Biblioteca Nacional.</p>
<h4>Cantiga de amigo</h4>
<p>O autor é um homem, mas o <strong>sujeito poético é feminino</strong>: uma donzela que fala do <em>amigo</em> (o namorado). O tema central é a <strong>ausência do amado</strong> e a saudade, a espera, a alegria do encontro ou o ciúme. A donzela confidencia-se à mãe, às amigas ou à natureza (ondas, flores, aves). Formalmente destaca-se o <span class="hl">paralelismo</span> (repetição de versos com pequenas variações), o <span class="hl">refrão</span> e o <em>leixa-pren</em> (o 2.º verso de uma estrofe é retomado como 1.º verso de uma estrofe seguinte). Tem raízes populares peninsulares.</p>
<h4>Cantiga de amor</h4>
<p>O sujeito poético é <strong>masculino</strong> e dirige-se à <em>senhor</em> (a dama), idealizada e inacessível. Exprime a <span class="hl">coita de amor</span> (sofrimento amoroso), segundo as regras do amor cortês de origem provençal: o trovador está numa relação de <strong>vassalagem amorosa</strong>, guarda a <em>mesura</em> (discrição, contenção) e não revela o nome da dama.</p>
<h4>Cantigas de escárnio e de maldizer</h4>
<p>São cantigas satíricas. No <strong>escárnio</strong>, a crítica é <strong>indireta</strong>, feita com ironia e palavras de duplo sentido (equívoco). No <strong>maldizer</strong>, a crítica é <strong>direta</strong>, por vezes com linguagem grosseira, e o visado pode ser nomeado. Retratam vícios da sociedade medieval: avareza, vaidade, cobardia, falsa nobreza.</p>`,
  pontos: [
    "Cantiga de <strong>amigo</strong> = voz feminina, saudade do amigo, confidentes (mãe, amigas, natureza), paralelismo e refrão.",
    "Cantiga de <strong>amor</strong> = voz masculina, coita de amor, <em>senhor</em> idealizada, vassalagem amorosa, mesura.",
    "<strong>Escárnio</strong> critica de forma indireta (ironia, equívoco); <strong>maldizer</strong> critica de forma direta e pode nomear o visado.",
    "Paralelismo + refrão criam musicalidade e facilitam a memorização: as cantigas eram cantadas.",
    "A natureza na cantiga de amigo é muitas vezes <strong>confidente</strong> do sujeito poético (personificação, apóstrofe).",
    "Num exame, identifica sempre: quem fala, a quem fala, o que sente e que recursos o mostram."
  ],
  noExame: "Aparece no Grupo I (Parte A ou B), muitas vezes comparada com outro texto lírico. As perguntas pedem o estado de espírito do sujeito poético, o papel da natureza e as marcas formais (paralelismo, refrão).",
  exercicios: [
    {
      tipo: "mc",
      enunciado: "Lê a cantiga de Martim Codax e escolhe a opção correta.",
      texto: `<div class="poem">Ondas do mar de Vigo,<br>se vistes meu amigo!<br>E ai Deus, se verrá cedo!<br><br>Ondas do mar levado,<br>se vistes meu amado!<br>E ai Deus, se verrá cedo!<br><br>Se vistes meu amigo,<br>o por que eu sospiro!<br>E ai Deus, se verrá cedo!<br><br>Se vistes meu amado,<br>por que ei gran cuidado!<br>E ai Deus, se verrá cedo!</div><p class="src">Martim Codax</p>`,
      opcoes: [
        "É uma cantiga de amor, porque o sujeito poético sofre de coita.",
        "É uma cantiga de amigo em que a donzela se dirige às ondas como confidentes.",
        "É uma cantiga de escárnio, pois o refrão ironiza a demora do amigo.",
        "É uma cantiga de amor, pois o sujeito poético masculino se dirige à sua senhor."
      ],
      certa: 1,
      explicacao: "A voz é feminina (fala do «amigo» / «amado»), o tema é a ausência e a espera do amigo, e a donzela interpela as ondas (apóstrofe) como confidentes. Paralelismo e refrão confirmam a cantiga de amigo."
    },
    {
      tipo: "mc",
      enunciado: "Na cantiga de Martim Codax, a passagem de «Ondas do mar de Vigo» para «Ondas do mar levado», mantendo a mesma estrutura, é um exemplo de:",
      opcoes: ["leixa-pren", "paralelismo", "refrão", "hipérbato"],
      certa: 1,
      explicacao: "Paralelismo: repetição da estrutura do verso com pequena variação (Vigo / levado; amigo / amado). O refrão é o verso repetido no fim de cada estrofe («E ai Deus, se verrá cedo!»)."
    },
    {
      tipo: "aberta",
      enunciado: "Explica o estado de espírito da donzela na cantiga de Martim Codax, fundamentando com dois aspetos do texto.",
      cotacao: 13,
      resolucao: `<p>A donzela revela <strong>ansiedade e saudade</strong> pela ausência do amigo. Por um lado, interroga as ondas do mar sobre se viram o amado, o que mostra a sua <strong>inquietação</strong> por não ter notícias dele («se vistes meu amigo!»). Por outro lado, o refrão «E ai Deus, se verrá cedo!» exprime, através da interjeição «ai» e da invocação a Deus, a <strong>esperança ansiosa</strong> de que ele regresse depressa. A referência ao suspiro («o por que eu sospiro») e ao «gran cuidado» reforça o seu sofrimento amoroso.</p>`,
      criterios: [
        "Identifica o estado de espírito (saudade, ansiedade, preocupação, esperança).",
        "Fundamenta com o apelo às ondas (apóstrofe / interrogação).",
        "Fundamenta com o refrão ou com «sospiro» / «gran cuidado».",
        "Escreve com correção linguística (3 pontos em 13)."
      ]
    }
  ]
},
{
  id: "fernao-lopes",
  grupo: "I", ano: "10.º", free: false,
  titulo: "Fernão Lopes",
  subtitulo: "Crónica de D. João I",
  resumo: `
<p>Fernão Lopes foi nomeado cronista-mor do reino por D. Duarte (1434) e é considerado o pai da historiografia portuguesa. Na <em>Crónica de D. João I</em> narra a <strong>crise de 1383-1385</strong>: após a morte de D. Fernando, Portugal arrisca perder a independência para Castela, e o Mestre de Avis torna-se Defensor do Reino e, depois, rei.</p>
<h4>Capítulos que estudas</h4>
<p>No <strong>capítulo 11</strong>, o pajem do Mestre grita pelas ruas que o estão a matar no paço; Álvaro Pais e o povo de Lisboa acorrem em multidão para o defender. No <strong>capítulo 148</strong>, durante o cerco castelhano, o cronista descreve a <strong>fome</strong> e o sofrimento de Lisboa: falta de pão, crianças a chorar, pessoas a procurar restos de comida.</p>
<h4>O que torna esta crónica especial</h4>
<p>Fernão Lopes dá ao <strong>povo</strong> (a «arraia-miúda») o estatuto de <span class="hl">ator coletivo</span>: é a multidão que age, sofre e decide. A crónica mostra a <span class="hl">afirmação da consciência coletiva</span> de um povo que defende a sua independência. O autor procura a <strong>verdade</strong>, consultando documentos e testemunhos, e escreve com grande <span class="hl">visualismo</span> (descrições vivas, como se o leitor estivesse a ver as cenas), dramatismo, discurso direto e interpelações ao leitor.</p>`,
  pontos: [
    "Contexto: crise de 1383-1385 e defesa da independência face a Castela.",
    "O povo é <strong>ator coletivo</strong>: age em massa, com emoção e determinação.",
    "Cap. 11: o alvoroço em Lisboa para salvar o Mestre. Cap. 148: a fome durante o cerco.",
    "<strong>Visualismo</strong>: descrições plásticas, movimento, cor e som que tornam as cenas «visíveis».",
    "Preocupação com a <strong>verdade</strong> histórica e com a imparcialidade.",
    "Recursos frequentes: enumeração, gradação, discurso direto, interrogação retórica, apóstrofe ao leitor."
  ],
  noExame: "Costuma sair no Grupo I com um excerto: pedem-se a caracterização do povo, a construção do visualismo e os sentimentos do cronista perante o sofrimento coletivo.",
  exercicios: [
    {
      tipo: "mc",
      enunciado: "Na Crónica de D. João I, o povo de Lisboa é apresentado sobretudo como:",
      opcoes: [
        "um grupo passivo que assiste aos acontecimentos.",
        "um ator coletivo que intervém de forma decisiva nos acontecimentos.",
        "uma multidão manipulada exclusivamente pela nobreza.",
        "um pano de fundo sem importância para a narração."
      ],
      certa: 1,
      explicacao: "Fernão Lopes valoriza o povo como personagem coletiva: é ele que acorre a salvar o Mestre (cap. 11) e resiste ao cerco (cap. 148). Isto mostra a afirmação de uma consciência coletiva."
    },
    {
      tipo: "mc",
      enunciado: "O «visualismo» de Fernão Lopes consiste em:",
      opcoes: [
        "usar ilustrações no manuscrito da crónica.",
        "descrever as cenas de forma viva e pormenorizada, como se o leitor as presenciasse.",
        "narrar apenas factos que o próprio cronista viu.",
        "privilegiar a descrição de paisagens naturais."
      ],
      certa: 1,
      explicacao: "Visualismo é a capacidade de tornar as cenas «visíveis»: movimento, ruído, multidões, pormenores físicos e emotivos."
    },
    {
      tipo: "aberta",
      enunciado: "Explica de que modo o capítulo 148 da Crónica de D. João I evidencia o sofrimento coletivo de Lisboa durante o cerco. Refere dois aspetos.",
      cotacao: 13,
      resolucao: `<p>No capítulo 148, o cronista mostra o sofrimento coletivo através da <strong>descrição da fome</strong> que atinge todos os habitantes: os mantimentos esgotam-se, o pão torna-se raríssimo e as pessoas procuram qualquer coisa para comer. Além disso, Fernão Lopes recorre a um <strong>forte visualismo e dramatismo</strong>, apresentando quadros como o das crianças que choram com fome e o dos mais pobres que não têm como sobreviver, o que comove o leitor. O cronista revela ainda <strong>compaixão</strong> perante a cidade, sublinhando que o sofrimento é partilhado por toda a comunidade.</p>`,
      criterios: [
        "Refere a fome / falta de mantimentos que atinge toda a cidade.",
        "Refere o visualismo / dramatismo das descrições (ex.: crianças, pobres).",
        "Pode referir a compaixão do cronista ou a resistência coletiva.",
        "Correção linguística."
      ]
    }
  ]
},
{
  id: "gil-vicente",
  grupo: "I", ano: "10.º", free: false,
  titulo: "Gil Vicente",
  subtitulo: "Farsa de Inês Pereira",
  resumo: `
<p>A <em>Farsa de Inês Pereira</em> (1523) desenvolve um provérbio dado como mote: <strong>«Mais quero asno que me leve que cavalo que me derrube.»</strong></p>
<h4>A ação</h4>
<p>Inês, jovem do povo, está farta das tarefas domésticas e quer casar com um homem <strong>«discreto»</strong> (avisado, galante, que saiba cantar e tocar), mesmo que seja pobre. Recusa <strong>Pero Marques</strong>, lavrador rico mas rústico e ingénuo, apresentado por Lianor Vaz. Com a ajuda dos judeus casamenteiros Latão e Vidal, casa com o escudeiro <strong>Brás da Mata</strong>, que se revela um tirano: fecha-a em casa e proíbe-a de cantar e de ir à janela. Brás parte para África e morre a fugir. Inês, desiludida, casa então com Pero Marques, que lhe faz todas as vontades. No final, Pero Marques leva-a às costas à ermida onde ela se vai encontrar com um ermitão, antigo pretendente: o «asno» que a leva.</p>
<h4>Crítica social e cómico</h4>
<p>Gil Vicente critica o <strong>casamento por interesse ou por aparência</strong>, a vaidade e a pobreza dos escudeiros fanfarrões, a hipocrisia do clero e a ingenuidade. A peça usa <span class="hl">cómico de carácter</span> (personagens-tipo), <span class="hl">cómico de situação</span> (Pero Marques que se senta de costas, a cena final) e <span class="hl">cómico de linguagem</span> (falas rústicas, ironia).</p>`,
  pontos: [
    "Mote: «Mais quero asno que me leve que cavalo que me derrube» — toda a peça o demonstra.",
    "Inês evolui: de sonhadora ingénua a mulher calculista e esperta.",
    "Brás da Mata = escudeiro pobre, vaidoso e tirânico. Pero Marques = rústico, rico e submisso.",
    "Personagens-tipo: a mãe, Lianor Vaz (alcoviteira), os judeus casamenteiros, o ermitão.",
    "Três tipos de cómico: de carácter, de situação e de linguagem.",
    "Crítica aos costumes: casamento, clero, fidalguia empobrecida."
  ],
  noExame: "Perguntas típicas: caracterização de Inês e dos pretendentes, relação da cena com o mote, tipos de cómico e crítica social.",
  exercicios: [
    {
      tipo: "mc",
      enunciado: "O desfecho da Farsa de Inês Pereira ilustra o mote porque:",
      opcoes: [
        "Inês casa com Brás da Mata e é feliz.",
        "Pero Marques, o «asno», leva Inês às costas e faz-lhe todas as vontades.",
        "Inês decide não voltar a casar.",
        "Brás da Mata regressa de África arrependido."
      ],
      certa: 1,
      explicacao: "O «cavalo» que a derrubou foi o escudeiro Brás da Mata; o «asno» que a leva é Pero Marques, literalmente às costas na cena final."
    },
    {
      tipo: "mc",
      enunciado: "Quando Pero Marques se senta na cadeira de costas por não saber usá-la, estamos perante um exemplo de:",
      opcoes: ["cómico de linguagem", "cómico de situação", "ironia trágica", "cómico de carácter apenas"],
      certa: 1,
      explicacao: "É cómico de situação: o riso nasce da ação ridícula. (Também revela o carácter rústico, mas o recurso em causa é a situação.)"
    },
    {
      tipo: "aberta",
      enunciado: "Compara Brás da Mata com Pero Marques enquanto maridos de Inês. Refere dois aspetos.",
      cotacao: 13,
      resolucao: `<p>Brás da Mata e Pero Marques são maridos opostos. Brás, o escudeiro que parecia «discreto» antes do casamento, revela-se <strong>autoritário e tirânico</strong>: prende Inês em casa e proíbe-a de cantar e de se mostrar à janela, impondo-lhe uma vida de clausura. Pero Marques, pelo contrário, é <strong>submisso e ingénuo</strong>: aceita todas as vontades de Inês e chega a levá-la às costas ao encontro do ermitão, sem perceber que está a ser enganado. Assim, Brás corresponde ao «cavalo que derruba» e Pero ao «asno que leva».</p>`,
      criterios: [
        "Caracteriza Brás como marido tirânico / controlador.",
        "Caracteriza Pero como marido submisso / ingénuo.",
        "Relaciona (opcionalmente) com o mote.",
        "Correção linguística."
      ]
    }
  ]
},
{
  id: "camoes-lirico",
  grupo: "I", ano: "10.º", free: false,
  titulo: "Camões lírico",
  subtitulo: "Rimas: redondilhas e sonetos",
  resumo: `
<p>A lírica de Camões junta duas tradições. A <strong>medida velha</strong> (tradição peninsular) usa redondilhas (versos de 5 ou 7 sílabas), muitas vezes com <em>mote</em> e <em>voltas</em>. A <strong>medida nova</strong>, de influência italiana (Petrarca), usa o <span class="hl">soneto</span>: duas quadras e dois tercetos em versos decassílabos.</p>
<h4>Grandes temas</h4>
<p><strong>A representação da amada:</strong> por um lado, a mulher idealizada, de beleza espiritual e serena (influência petrarquista e neoplatónica); por outro, a mulher real e sensual, como na «Endechas a Bárbara escrava».</p>
<p><strong>A experiência amorosa e a reflexão sobre o Amor:</strong> o amor é vivido como contradição e paradoxo («Amor é fogo que arde sem se ver»).</p>
<p><strong>O desconcerto do mundo:</strong> o poeta constata que os bons sofrem e os maus prosperam, num mundo sem ordem moral.</p>
<p><strong>A mudança:</strong> tudo muda, mas a mudança do sujeito é sempre para pior («Mudam-se os tempos, mudam-se as vontades»).</p>
<p><strong>A reflexão autobiográfica:</strong> o poeta culpa os seus erros, a má fortuna e o amor pelo seu destino infeliz («Erros meus, má fortuna, amor ardente»).</p>
<p>Os sonetos têm uma estrutura argumentativa: as quadras apresentam uma ideia e os tercetos concluem, muitas vezes com uma <strong>chave de ouro</strong> no último verso.</p>`,
  pontos: [
    "Medida velha = redondilhas (mote + voltas). Medida nova = soneto em decassílabos.",
    "Soneto: 2 quadras + 2 tercetos; esquema rimático frequente ABBA ABBA CDC DCD.",
    "Amada idealizada (petrarquismo) vs. amada sensual e concreta.",
    "Amor como contradição: antíteses, paradoxos e oxímoros.",
    "Desconcerto do mundo, mudança e tom autobiográfico/disfórico.",
    "Último verso do soneto costuma condensar a ideia central (chave de ouro)."
  ],
  noExame: "Muitas vezes comparado com outro poeta (Pessoa, Antero). Pede-se a conceção de amor, o desconcerto, a estrutura do soneto e os recursos expressivos.",
  exercicios: [
    {
      tipo: "aberta",
      enunciado: "Lê o soneto e explica a ideia expressa no último terceto.",
      texto: `<div class="poem">Mudam-se os tempos, mudam-se as vontades,<br>Muda-se o ser, muda-se a confiança;<br>Todo o mundo é composto de mudança,<br>Tomando sempre novas qualidades.<br><br>Continuamente vemos novidades,<br>Diferentes em tudo da esperança;<br>Do mal ficam as mágoas na lembrança,<br>E do bem, se algum houve, as saudades.<br><br>O tempo cobre o chão de verde manto,<br>Que já coberto foi de neve fria,<br>E em mim converte em choro o doce canto.<br><br>E, afora este mudar-se cada dia,<br>Outra mudança faz de mor espanto:<br>Que não se muda já como soía.</div><p class="src">Luís de Camões, Rimas</p>`,
      cotacao: 13,
      resolucao: `<p>No último terceto, o sujeito poético conclui que, além da mudança constante do mundo, existe uma mudança ainda mais surpreendente («de mor espanto»): <strong>a própria mudança já não acontece como antigamente</strong> («não se muda já como soía»). Ou seja, se antes a mudança trazia renovação (como a natureza, em que o inverno dá lugar à primavera), agora ela só traz desilusão ao sujeito, transformando o «doce canto» em «choro». Este verso final funciona como <strong>chave de ouro</strong>, condensando o pessimismo do poema.</p>`,
      criterios: [
        "Identifica a «mudança da mudança» (já não se muda como antes).",
        "Relaciona com o contraste natureza (renovação cíclica) / sujeito (mudança para pior).",
        "Pode referir a chave de ouro / tom disfórico.",
        "Correção linguística."
      ]
    },
    {
      tipo: "mc",
      enunciado: "No verso «O tempo cobre o chão de verde manto», a expressão «verde manto» é:",
      opcoes: ["uma metáfora que sugere a vegetação da primavera", "uma hipérbole", "uma antítese com «neve fria»", "uma sinestesia"],
      certa: 0,
      explicacao: "«Verde manto» é uma metáfora para a vegetação que cobre o chão na primavera. A oposição com «neve fria» (verso seguinte) mostra a mudança das estações."
    },
    {
      tipo: "mc",
      enunciado: "O soneto camoniano pertence à:",
      opcoes: ["medida velha, com versos de redondilha maior", "medida nova, com versos decassílabos", "medida velha, com mote e voltas", "medida nova, com versos alexandrinos"],
      certa: 1,
      explicacao: "O soneto é a forma da medida nova, de influência italiana, com versos decassílabos (10 sílabas métricas)."
    }
  ]
},
{
  id: "lusiadas",
  grupo: "I", ano: "10.º", free: false,
  titulo: "Os Lusíadas",
  subtitulo: "A epopeia de Luís de Camões",
  resumo: `
<p><em>Os Lusíadas</em> (1572) é uma <strong>epopeia</strong>: 10 cantos, 1102 estâncias em <span class="hl">oitava rima</span> (ABABABCC) e versos decassílabos heroicos. O <strong>herói é coletivo</strong>: o povo português («o peito ilustre lusitano»). A viagem de Vasco da Gama à Índia (1497-1498) é o fio narrativo que permite contar a história de Portugal.</p>
<h4>Estrutura externa e interna</h4>
<p><strong>Proposição</strong> (canto I, est. 1-3): o poeta anuncia o que vai cantar. <strong>Invocação</strong> (I, 4-5): pede inspiração às Tágides (ninfas do Tejo). <strong>Dedicatória</strong> (I, 6-18): oferece o poema a D. Sebastião. <strong>Narração</strong> (de I, 19 até ao fim): começa <em>in medias res</em>, com as naus já no Índico.</p>
<h4>Os quatro planos</h4>
<p><strong>Viagem</strong> (Vasco da Gama a caminho da Índia); <strong>História de Portugal</strong> (narrada sobretudo por Vasco da Gama ao rei de Melinde, nos cantos III a V, e por Paulo da Gama no canto VIII); <strong>Mitologia</strong> (Vénus protege os portugueses, Baco opõe-se-lhes); <strong>Reflexões do poeta</strong> (no fim de vários cantos: a fragilidade humana, o desprezo pelas letras, o poder corruptor do ouro, o lamento final sobre a pátria «metida no gosto da cobiça»).</p>
<h4>Episódios essenciais</h4>
<p>Inês de Castro (III), Aljubarrota e Despedidas em Belém com o <strong>Velho do Restelo</strong> (IV), Adamastor (V), Tempestade (VI), Ilha dos Amores (IX) e Máquina do Mundo (X). No canto IV, o poeta refere também o reinado infeliz de D. Duarte e o sacrifício do Infante D. Fernando (o Infante Santo), tema do exame de 2025.</p>`,
  pontos: [
    "Epopeia: herói coletivo, ação grandiosa, maravilhoso (mitologia), estilo elevado.",
    "Estrutura: Proposição, Invocação, Dedicatória, Narração (in medias res).",
    "Oitava rima ABABABCC, decassílabos heroicos.",
    "Quatro planos: viagem, História de Portugal, mitologia, reflexões do poeta.",
    "Velho do Restelo: voz crítica da expansão (glória vã, cobiça, perigos).",
    "Reflexões do poeta: tom disfórico, crítica à sociedade do seu tempo."
  ],
  noExame: "Saiu no exame de 2025 (canto IV, est. 51-53) comparado com a Mensagem. Pedem-se reflexões do poeta, caracterização de heróis e traços épicos vs. líricos.",
  exercicios: [
    {
      tipo: "mc",
      enunciado: "Lê a primeira estância. Ela integra:",
      texto: `<div class="poem">As armas e os barões assinalados<br>Que da ocidental praia Lusitana,<br>Por mares nunca de antes navegados<br>Passaram ainda além da Taprobana,<br>Em perigos e guerras esforçados<br>Mais do que prometia a força humana,<br>E entre gente remota edificaram<br>Novo Reino, que tanto sublimaram;</div><p class="src">Os Lusíadas, I, 1</p>`,
      opcoes: ["a Invocação, porque o poeta pede inspiração.", "a Proposição, porque o poeta anuncia o que vai cantar.", "a Dedicatória, porque se dirige a D. Sebastião.", "a Narração, porque começa a viagem."],
      certa: 1,
      explicacao: "As estâncias 1-3 do canto I formam a Proposição: o poeta anuncia o assunto (os feitos dos portugueses). Repara na hipérbole «Mais do que prometia a força humana», que engrandece o herói coletivo."
    },
    {
      tipo: "mc",
      enunciado: "O esquema rimático da estância acima (oitava rima) é:",
      opcoes: ["ABBA ABBA", "ABABABCC", "AABBCCDD", "ABABCDCD"],
      certa: 1,
      explicacao: "assinalados / navegados / esforçados (A); Lusitana / Taprobana / humana (B); edificaram / sublimaram (C). Esquema ABABABCC."
    },
    {
      tipo: "aberta",
      enunciado: "Explica a função do episódio do Velho do Restelo na estrutura de sentido da obra.",
      cotacao: 13,
      resolucao: `<p>O Velho do Restelo, que surge no canto IV durante as despedidas em Belém, representa uma <strong>voz crítica da expansão marítima</strong>. Condena a «glória de mandar» e a «vã cobiça» que levam os portugueses a abandonar o reino, deixando para trás famílias e perigos internos, em troca de riquezas e fama incertas. Assim, o episódio introduz na epopeia uma <strong>perspetiva contrária ao entusiasmo</strong> da viagem, antecipando as reflexões do próprio poeta sobre a cobiça e a decadência, e dando à obra uma dimensão crítica e humana.</p>`,
      criterios: [
        "Identifica o Velho como voz crítica / opositora da expansão.",
        "Refere os argumentos (cobiça, vã glória, sofrimento, abandono do reino).",
        "Relaciona com a estrutura da obra (contraponto ao tom épico; antecipa reflexões do poeta).",
        "Correção linguística."
      ]
    }
  ]
}
);
