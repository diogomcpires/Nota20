/* Nota20 · Português 639 — Educação Literária 12.º ano */
window.N20 = window.N20 || { topics: [] };

N20.topics.push(
{
  id: "pessoa-ortonimo",
  grupo: "I", ano: "12.º", free: false,
  titulo: "Fernando Pessoa ortónimo",
  subtitulo: "Fingimento, dor de pensar e nostalgia",
  resumo: `
<p>Pessoa ortónimo é o poeta que assina com o próprio nome. A sua poesia é <strong>intelectual e reflexiva</strong>, mas de forma tradicional e musical: quadras, versos curtos, rima e ritmo próximos da lírica popular.</p>
<h4>Temas centrais</h4>
<p><strong>O fingimento artístico</strong>: em «Autopsicografia», o poeta é «um fingidor» que transforma a dor real numa dor pensada, intelectualizada. A poesia nasce da razão a trabalhar sobre a emoção.</p>
<p><strong>A dor de pensar</strong>: a consciência impede a felicidade. Em «Ela canta, pobre ceifeira», o sujeito inveja a «alegre inconsciência» da ceifeira e deseja o impossível: ser inconsciente e ter consciência disso («Ah, poder ser tu, sendo eu!»).</p>
<p><strong>A fragmentação do eu</strong>: o sujeito não se reconhece, sente-se múltiplo e estranho a si próprio.</p>
<p><strong>A nostalgia da infância</strong>: a infância é um tempo perdido de felicidade, talvez nunca vivido, que o adulto lembra com saudade.</p>
<p><strong>Sonho e realidade</strong>: a busca de um sentido que escapa, a angústia e o tédio.</p>`,
  pontos: [
    "Fingimento: a emoção é transformada pela razão em arte («Autopsicografia»).",
    "Dor de pensar: a consciência impede a felicidade (a ceifeira).",
    "Desejo paradoxal: inconsciência + consciência dela.",
    "Fragmentação do eu e estranheza perante si próprio.",
    "Nostalgia da infância como felicidade perdida.",
    "Forma tradicional: quadras, redondilha, musicalidade."
  ],
  noExame: "Pede-se a relação razão/emoção, a dor de pensar, o fingimento e a comparação com heterónimos ou com Camões.",
  exercicios: [
    {
      tipo: "aberta",
      enunciado: "Explica o desejo paradoxal expresso pelo sujeito poético nestes versos.",
      texto: `<div class="poem">Ah, poder ser tu, sendo eu!<br>Ter a tua alegre inconsciência,<br>E a consciência disso!</div><p class="src">Fernando Pessoa, «Ela canta, pobre ceifeira»</p>`,
      cotacao: 13,
      resolucao: `<p>O sujeito poético deseja ter a <strong>felicidade inconsciente</strong> da ceifeira, que canta sem pensar, mas sem perder a sua própria <strong>consciência</strong> («poder ser tu, sendo eu»). Este desejo é paradoxal porque a felicidade da ceifeira depende precisamente de não pensar; se tivesse consciência dessa alegria, deixaria de ser inconsciente. O excerto mostra a <strong>dor de pensar</strong>: o sujeito sabe que a razão o impede de ser feliz, mas não consegue nem quer abdicar dela.</p>`,
      criterios: [
        "Identifica o desejo de ter a inconsciência / alegria da ceifeira.",
        "Explica o paradoxo (manter a consciência dessa inconsciência).",
        "Relaciona com a dor de pensar.",
        "Correção linguística."
      ]
    },
    {
      tipo: "mc",
      enunciado: "Em «Autopsicografia», a afirmação «O poeta é um fingidor» significa que:",
      opcoes: ["o poeta mente sobre os seus sentimentos", "o poeta transforma intelectualmente a emoção vivida em emoção artística", "o poeta não sente nada", "o poeta escreve apenas sobre o que imagina"],
      certa: 1,
      explicacao: "O fingimento não é mentira: o poeta finge «que é dor / a dor que deveras sente», isto é, transforma pela razão a dor real em dor poética."
    }
  ]
},
{
  id: "heteronimos",
  grupo: "I", ano: "12.º", free: false,
  titulo: "Os heterónimos",
  subtitulo: "Alberto Caeiro, Ricardo Reis e Álvaro de Campos",
  resumo: `
<p>Os heterónimos são poetas inventados por Pessoa, cada um com biografia, estilo e visão do mundo próprios.</p>
<h4>Alberto Caeiro, o mestre</h4>
<p>Poeta da <strong>Natureza</strong> e das <strong>sensações</strong>. Recusa o pensamento metafísico («pensar é estar doente dos olhos»): o importante é <strong>ver</strong> as coisas como são, sem lhes dar significado. Linguagem simples, quase prosaica, <span class="hl">verso livre</span>, comparações concretas. Obra-chave: <em>O Guardador de Rebanhos</em>.</p>
<h4>Ricardo Reis, o clássico</h4>
<p>Discípulo de Caeiro, mas de formação clássica. Segue o <strong>epicurismo</strong> (procurar um prazer calmo e moderado, <em>carpe diem</em>) e o <strong>estoicismo</strong> (aceitar o destino, o Fado, com serenidade). Procura a <strong>ataraxia</strong> (ausência de perturbação) e evita emoções fortes, até no amor por Lídia. Escreve <strong>odes</strong> com vocabulário erudito, latinismos e <span class="hl">hipérbatos</span>; usa mitologia greco-latina.</p>
<h4>Álvaro de Campos, o engenheiro</h4>
<p>Tem <strong>três fases</strong>. <em>Decadentista</em> («Opiário»): tédio e cansaço. <em>Futurista/sensacionista</em> («Ode Triunfal», «Ode Marítima»): exaltação da máquina, da velocidade e da civilização industrial, desejo de «sentir tudo de todas as maneiras», com exclamações, onomatopeias e versos longos. <em>Intimista/abúlica</em> («Tabacaria», «Aniversário»): desilusão, vazio, nostalgia da infância, consciência do nada.</p>`,
  pontos: [
    "Caeiro: sensacionismo, objetividade, recusa da metafísica, verso livre, simplicidade.",
    "Reis: epicurismo + estoicismo, carpe diem, ataraxia, Fado, odes, latinismos, hipérbato.",
    "Campos 1: decadentismo (tédio). Campos 2: futurismo/sensacionismo (máquina, euforia).",
    "Campos 3: intimismo e abulia (vazio, nostalgia da infância, «Tabacaria»).",
    "Caeiro é o mestre de Reis, de Campos e do próprio Pessoa.",
    "Cada heterónimo responde de forma diferente à dor de pensar."
  ],
  noExame: "Excerto de um heterónimo com perguntas sobre a sua mundividência e marcas formais, por vezes em comparação com o ortónimo.",
  exercicios: [
    {
      tipo: "aberta",
      enunciado: "Mostra que este excerto exprime o sensacionismo de Alberto Caeiro.",
      texto: `<div class="poem">Sou um guardador de rebanhos.<br>O rebanho é os meus pensamentos<br>E os meus pensamentos são todos sensações.<br>Penso com os olhos e com os ouvidos<br>E com as mãos e os pés<br>E com o nariz e a boca.<br><br>Pensar uma flor é vê-la e cheirá-la<br>E comer um fruto é saber-lhe o sentido. […]</div><p class="src">Alberto Caeiro, O Guardador de Rebanhos, IX</p>`,
      cotacao: 13,
      resolucao: `<p>O excerto exprime o sensacionismo de Caeiro porque reduz o pensamento às <strong>sensações</strong>: os seus pensamentos «são todos sensações». O sujeito afirma que pensa «com os olhos e com os ouvidos / E com as mãos e os pés / E com o nariz e a boca», numa <strong>enumeração</strong> dos órgãos dos sentidos marcada pelo <strong>polissíndeto</strong>, que valoriza o conhecimento através do corpo. Além disso, conhecer uma flor é «vê-la e cheirá-la» e conhecer um fruto é comê-lo, o que mostra a <strong>recusa do pensamento abstrato</strong>: a realidade apreende-se diretamente pelos sentidos.</p>`,
      criterios: [
        "Refere a equivalência pensamentos = sensações.",
        "Refere a enumeração dos sentidos / polissíndeto.",
        "Refere a recusa da abstração (conhecer = sentir).",
        "Correção linguística."
      ]
    },
    {
      tipo: "mc",
      enunciado: "«Vem sentar-te comigo, Lídia, à beira do rio. / Sossegadamente fitemos o seu curso e aprendamos / Que a vida passa, e não estamos de mãos enlaçadas.» Estes versos são de:",
      opcoes: ["Alberto Caeiro, pela simplicidade da linguagem", "Ricardo Reis, pela serenidade epicurista e consciência da brevidade da vida", "Álvaro de Campos, fase futurista", "Pessoa ortónimo, pela nostalgia da infância"],
      certa: 1,
      explicacao: "Lídia, o rio como símbolo da passagem do tempo, a contenção («Sossegadamente») e a lição sobre a brevidade da vida são marcas de Ricardo Reis."
    },
    {
      tipo: "mc",
      enunciado: "«Não sou nada. / Nunca serei nada. / Não posso querer ser nada. / À parte isso, tenho em mim todos os sonhos do mundo.» Este excerto pertence à fase:",
      opcoes: ["futurista de Álvaro de Campos", "intimista/abúlica de Álvaro de Campos", "decadentista de Álvaro de Campos", "clássica de Ricardo Reis"],
      certa: 1,
      explicacao: "É o início de «Tabacaria»: o vazio, a consciência do nada e o contraste com «todos os sonhos do mundo» marcam a fase intimista."
    }
  ]
},
{
  id: "mensagem",
  grupo: "I", ano: "12.º",
  titulo: "Mensagem",
  subtitulo: "Fernando Pessoa (1934)",
  resumo: `
<p><em>Mensagem</em> é a única obra em português publicada por Pessoa em vida. Tem 44 poemas organizados em <strong>três partes</strong>, que representam o nascimento, a realização e a morte/renascimento de Portugal.</p>
<h4>As três partes</h4>
<p><strong>I. Brasão</strong> (nascimento): os fundadores e heróis da nação, organizados segundo os elementos do escudo português (campos, castelos, quinas, coroa, timbre): Ulisses, Viriato, D. Afonso Henriques, D. Dinis, D. João I, o Infante D. Fernando, entre outros. Aqui as figuras históricas são <strong>mitificadas</strong>.</p>
<p><strong>II. Mar Português</strong> (realização): os Descobrimentos e o esforço coletivo para dominar o mar: «O Infante», «O Mostrengo», «Mar Português» («Valeu a pena? Tudo vale a pena / Se a alma não é pequena»).</p>
<p><strong>III. O Encoberto</strong> (morte e esperança de renascimento): a decadência presente e a esperança no regresso de D. Sebastião (<span class="hl">sebastianismo</span>) e num <span class="hl">Quinto Império</span> espiritual e cultural. Termina com «Nevoeiro»: «É a Hora!».</p>
<h4>Características</h4>
<p>É uma obra <strong>épico-lírica</strong>: celebra a pátria e os heróis (épico), mas em poemas curtos, subjetivos e simbólicos (lírico). O herói é eleito por Deus para uma missão, o que o torna símbolo e mito. A linguagem é simbólica, com muitas frases exclamativas, apóstrofes e paradoxos («O mito é o nada que é tudo»).</p>`,
  pontos: [
    "Três partes: Brasão (nascimento), Mar Português (realização), O Encoberto (morte/renascimento).",
    "Mitificação dos heróis: figuras históricas tornam-se símbolos.",
    "Herói eleito por Deus para uma missão; o sofrimento é o preço da grandeza.",
    "Sebastianismo e Quinto Império: esperança num futuro espiritual.",
    "Obra épico-lírica: matéria épica, forma lírica e subjetiva.",
    "Saiu no exame de 2025 («D. Fernando, Infante de Portugal»)."
  ],
  noExame: "Muito frequente. Pedem-se a missão do herói, a relação com Deus, o sentido simbólico e a comparação com Os Lusíadas (épico vs. lírico).",
  exercicios: [
    {
      tipo: "aberta",
      enunciado: "Interpreta o sentido da segunda estrofe, relacionando-a com a primeira.",
      texto: `<div class="poem">Ó mar salgado, quanto do teu sal<br>São lágrimas de Portugal!<br>Por te cruzarmos, quantas mães choraram,<br>Quantos filhos em vão rezaram!<br>Quantas noivas ficaram por casar<br>Para que fosses nosso, ó mar!<br><br>Valeu a pena? Tudo vale a pena<br>Se a alma não é pequena.<br>Quem quer passar além do Bojador<br>Tem que passar além da dor.<br>Deus ao mar o perigo e o abismo deu,<br>Mas nele é que espelhou o céu.</div><p class="src">Fernando Pessoa, «Mar Português», Mensagem</p>`,
      cotacao: 13,
      resolucao: `<p>A primeira estrofe apresenta o <strong>sofrimento coletivo</strong> causado pelos Descobrimentos: através da apóstrofe ao mar, da hipérbole («quanto do teu sal / São lágrimas de Portugal!») e da anáfora em «quantas/quantos», o sujeito evoca as mães, os filhos e as noivas que pagaram o preço da conquista do mar. Na segunda estrofe, responde à pergunta «Valeu a pena?»: o sacrifício <strong>valeu a pena</strong> porque a grandeza só é possível a quem tem uma «alma» grande e aceita passar «além da dor». O último dístico conclui que o mar, embora cheio de perigos, é também o lugar onde se reflete o «céu», isto é, a <strong>glória e a dimensão divina</strong> da missão portuguesa.</p>`,
      criterios: [
        "Refere o sofrimento da 1.ª estrofe (lágrimas, mães, filhos, noivas).",
        "Explica a resposta: o sacrifício vale a pena se a alma for grande.",
        "Interpreta perigo/abismo vs. céu (dor como caminho para a grandeza).",
        "Correção linguística."
      ]
    },
    {
      tipo: "mc",
      enunciado: "A terceira parte da Mensagem, «O Encoberto», centra-se sobretudo:",
      opcoes: ["na fundação da nacionalidade", "nos Descobrimentos marítimos", "na esperança de um renascimento nacional (sebastianismo, Quinto Império)", "na descrição dos castelos do brasão"],
      certa: 2,
      explicacao: "«O Encoberto» trata a decadência presente e a esperança no regresso de D. Sebastião e no Quinto Império."
    },
    {
      tipo: "mc",
      enunciado: "Os versos «Quem quer passar além do Bojador / Tem que passar além da dor» exprimem:",
      opcoes: ["uma comparação entre dois cabos geográficos", "a ideia de que a grandeza exige sofrimento", "um lamento pelo fracasso das navegações", "a recusa da expansão marítima"],
      certa: 1,
      explicacao: "O paralelismo «além do Bojador» / «além da dor» liga a superação geográfica à superação do sofrimento: só alcança a glória quem aceita a dor."
    }
  ]
},
{
  id: "contos",
  grupo: "I", ano: "12.º", free: false,
  titulo: "Contos do século XX",
  subtitulo: "Manuel da Fonseca e Maria Judite de Carvalho",
  resumo: `
<p>No 12.º ano estuda-se um conto de autor do século XX. Os mais trabalhados são «Sempre é uma companhia» e «George». (O programa inclui também «Famílias desavindas», de Mário de Carvalho: confirma com o teu professor qual foi o conto lido na tua turma.)</p>
<h4>«Sempre é uma companhia» — Manuel da Fonseca</h4>
<p>Passa-se em <strong>Alcaria</strong>, aldeia isolada do Alentejo. o <strong>Batola</strong>, dono da venda, vive uma existência monótona e vazia, enquanto a mulher trabalha e o despreza. Um caixeiro-viajante deixa à experiência uma <strong>telefonia</strong> (rádio). O aparelho transforma a aldeia: à noite, os homens reúnem-se na venda para ouvir música e notícias do mundo (incluindo a guerra). Quando o vendedor regressa para levar o rádio, é a mulher do Batola, inicialmente contra, que decide ficar com ele: «sempre é uma companhia». Temas: <span class="hl">isolamento e solidão</span>, monotonia rural, a rádio como janela para o mundo e fator de comunidade.</p>
<h4>«George» — Maria Judite de Carvalho</h4>
<p>George, pintora de 45 anos que vive longe e é independente, regressa por pouco tempo à terra onde cresceu. Ao longo do conto confronta-se com <strong>Gi</strong>, a rapariga que ela foi e que queria partir, e com <strong>Georgina</strong>, uma mulher velha com quem se cruza e que representa quem ela será. São <span class="hl">três idades da mesma mulher</span>. Temas: a passagem do tempo, a memória, a liberdade e o preço das escolhas, a solidão.</p>`,
  pontos: [
    "«Sempre é uma companhia»: isolamento de Alcaria, monotonia, rádio como abertura ao mundo.",
    "Evolução da mulher do Batola: da recusa à aceitação («sempre é uma companhia»).",
    "«George»: Gi (passado), George (presente), Georgina (futuro) — a mesma mulher.",
    "Temas comuns: solidão, tempo, escolhas, mudança.",
    "Atenção ao narrador, ao espaço (físico, social, psicológico) e ao tempo.",
    "Conto: ação concentrada, poucas personagens, final significativo."
  ],
  noExame: "Pode surgir no Grupo I (excerto) ou na Parte C (exposição sobre a tua experiência de leitura).",
  exercicios: [
    {
      tipo: "mc",
      enunciado: "Em «Sempre é uma companhia», a telefonia representa sobretudo:",
      opcoes: ["a modernização agrícola do Alentejo", "a rutura do isolamento e a criação de laços na aldeia", "a riqueza do Batola", "a censura do Estado Novo"],
      certa: 1,
      explicacao: "O rádio liga Alcaria ao mundo e reúne a comunidade na venda, combatendo a solidão: daí o título."
    },
    {
      tipo: "mc",
      enunciado: "Em «George», Gi, George e Georgina são:",
      opcoes: ["três irmãs", "a mesma mulher em três momentos da vida", "mãe, filha e neta", "três pintoras rivais"],
      certa: 1,
      explicacao: "As três figuras representam o passado, o presente e o futuro da mesma mulher, num diálogo sobre o tempo e as escolhas."
    },
    {
      tipo: "aberta",
      enunciado: "Explica a importância do título «Sempre é uma companhia» para a interpretação do conto.",
      cotacao: 13,
      resolucao: `<p>O título retoma a frase dita pela mulher do Batola quando decide ficar com a telefonia. Revela a <strong>solidão profunda</strong> em que vivem as personagens de Alcaria, uma aldeia isolada e monótona, onde até um aparelho de rádio se torna uma «companhia». A expressão mostra também a <strong>mudança da mulher</strong>, que inicialmente recusava o aparelho, mas percebe que ele trouxe vida, convívio e ligação ao mundo. O título resume, assim, o tema central do conto: a necessidade humana de companhia e de comunicação.</p>`,
      criterios: [
        "Relaciona o título com a solidão / isolamento.",
        "Refere a mudança de atitude da mulher do Batola.",
        "Refere a função do rádio (convívio, ligação ao mundo).",
        "Correção linguística."
      ]
    }
  ]
},
{
  id: "poetas-contemporaneos",
  grupo: "I", ano: "12.º", free: false,
  titulo: "Poetas contemporâneos",
  subtitulo: "Poesia portuguesa do século XX e XXI",
  resumo: `
<p>O programa propõe 2 poemas de 3 autores, escolhidos pela tua escola de uma lista de 12 poetas portugueses contemporâneos. Pergunta ao teu professor quais estudaste e revê esses primeiro.</p>
<h4>Os 12 poetas da lista e o que os distingue</h4>
<ul>
<li><strong>Miguel Torga</strong>: a terra transmontana, o humanismo, a revolta contra o destino e contra Deus, a solidão orgulhosa do poeta.</li>
<li><strong>Jorge de Sena</strong>: poesia de testemunho, a liberdade, o exílio, o diálogo com outras artes (música, pintura).</li>
<li><strong>Eugénio de Andrade</strong>: a natureza e os elementos (água, terra, luz), o corpo e o amor, a mãe e a infância, uma palavra limpa e depurada.</li>
<li><strong>Alexandre O'Neill</strong>: ironia e humor, crítica ao Portugal pequeno e ao quotidiano, marcas do surrealismo.</li>
<li><strong>António Ramos Rosa</strong>: reflexão sobre a própria poesia e a palavra, o desejo de uma linguagem livre, a crítica a um quotidiano que aliena.</li>
<li><strong>Herberto Helder</strong>: linguagem torrencial e cheia de imagens, o poema como ato quase mágico, o corpo, a mãe, a metamorfose.</li>
<li><strong>Ruy Belo</strong>: o tempo e a morte, o quotidiano, versos longos, a fé e a dúvida, ecos bíblicos.</li>
<li><strong>Manuel Alegre</strong>: a liberdade e a resistência à ditadura, o exílio, a pátria, o diálogo com Camões.</li>
<li><strong>Luiza Neto Jorge</strong>: linguagem experimental e surrealizante, o corpo, a condição da mulher, a ironia sobre o quotidiano.</li>
<li><strong>Vasco Graça Moura</strong>: o diálogo com a tradição (Camões, o soneto), o virtuosismo formal, a ironia e a memória.</li>
<li><strong>Nuno Júdice</strong>: o poema que pensa sobre si próprio, o amor, a memória, um tom narrativo e meditativo.</li>
<li><strong>Ana Luísa Amaral</strong>: o quotidiano doméstico e feminino, a reescrita de mitos e da tradição (Camões, Penélope), o corpo e o amor.</li>
</ul>
<h4>Linhas temáticas que deves dominar</h4>
<p><strong>Representações do contemporâneo</strong>: a cidade, a guerra, a ditadura e a liberdade, o quotidiano, a sociedade de consumo. <strong>Tradição literária</strong>: diálogo com poetas anteriores (Camões, Cesário, Pessoa), através de <span class="hl">intertextualidade</span>, paródia ou homenagem. <strong>Figurações do poeta</strong>: o poeta reflete sobre o seu papel, a sua missão ou a sua impotência. <strong>Arte poética</strong>: poemas sobre a própria poesia, a palavra e o ato de escrever.</p>
<h4>Como analisar um poema contemporâneo no exame</h4>
<p>Não precisas de conhecer o poema: precisas de <strong>ler bem</strong>. Identifica o sujeito poético e o destinatário, o tema, a evolução do texto (partes), os recursos expressivos com função clara e eventuais referências a outros autores. O verso livre e a ausência de rima são comuns; o sentido constrói-se pelas imagens.</p>`,
  pontos: [
    "Quatro eixos: contemporâneo, tradição literária, figurações do poeta, arte poética.",
    "Intertextualidade: reconhecer ecos de Camões, Pessoa, Cesário.",
    "Verso livre e imagens: o sentido nasce das metáforas.",
    "Identifica sempre: quem fala, a quem, sobre quê, como evolui.",
    "Recurso expressivo + efeito de sentido (nunca só o nome do recurso).",
    "Em comparação: semelhanças e diferenças concretas, com citações."
  ],
  noExame: "Surge sobretudo na Parte B ou C, em comparação com um texto de outro período.",
  exercicios: [
    {
      tipo: "mc",
      enunciado: "Um poema contemporâneo que retoma e transforma versos de «Mar Português» recorre a:",
      opcoes: ["metonímia", "intertextualidade", "anástrofe", "eufemismo"],
      certa: 1,
      explicacao: "Intertextualidade é o diálogo explícito ou implícito com outro texto (citação, alusão, paródia, homenagem)."
    },
    {
      tipo: "mc",
      enunciado: "Um poema em que o sujeito reflete sobre o ato de escrever e o poder da palavra integra-se na linha da:",
      opcoes: ["crónica de costumes", "arte poética", "poesia trovadoresca", "epopeia"],
      certa: 1,
      explicacao: "A arte poética é a poesia que pensa sobre a própria poesia (a palavra, o poeta, a escrita)."
    }
  ]
},
{
  id: "saramago",
  grupo: "I", ano: "12.º", free: false,
  titulo: "José Saramago",
  subtitulo: "Memorial do Convento · O Ano da Morte de Ricardo Reis",
  resumo: `
<p>Estudas um dos dois romances. No exame de 2026 saíram excertos dos dois.</p>
<h4>Memorial do Convento (1982)</h4>
<p>Século XVIII. D. João V promete construir um convento em <strong>Mafra</strong> se a rainha lhe der um herdeiro. Em paralelo, <strong>Baltasar Sete-Sóis</strong> (ex-soldado que perdeu a mão esquerda na guerra) e <strong>Blimunda Sete-Luas</strong> (que, em jejum, vê o interior das pessoas e recolhe «vontades») vivem um amor livre e profundo. Com o padre <strong>Bartolomeu de Gusmão</strong> e o músico <strong>Domenico Scarlatti</strong>, constroem a <strong>passarola</strong>, máquina voadora movida pelas vontades humanas. Temas: crítica ao <span class="hl">poder absoluto</span> e à Igreja/Inquisição (autos de fé), denúncia da <span class="hl">exploração do povo</span> (milhares de homens forçados a trabalhar na obra, o transporte da pedra), o amor e o sonho. No fim, Baltasar morre num auto de fé e Blimunda recolhe a sua vontade.</p>
<h4>O Ano da Morte de Ricardo Reis (1984)</h4>
<p>Depois da morte de Pessoa (1935), o heterónimo <strong>Ricardo Reis</strong> regressa do Brasil a Lisboa e instala-se no Hotel Bragança. Relaciona-se com <strong>Lídia</strong>, criada do hotel, e com <strong>Marcenda</strong>, jovem de Coimbra com uma mão paralisada; conversa com o fantasma de Fernando Pessoa. O contexto é o <strong>Estado Novo</strong> e a Europa dos fascismos (Guerra Civil de Espanha): censura, propaganda, a polícia política (PVDE) e a miséria. Reis, espectador da vida, é confrontado com a realidade. Termina com a revolta dos marinheiros, em que morre o irmão de Lídia, e a partida de Reis com Pessoa.</p>
<h4>Estilo de Saramago</h4>
<p>Narrador omnisciente e <strong>irónico</strong>, que comenta e dialoga com o leitor; frases longas; diálogos sem travessão, separados por vírgulas e maiúsculas; mistura de tempo histórico e tempo da escrita; intertextualidade (Camões, Pessoa).</p>`,
  pontos: [
    "Memorial: Mafra, D. João V, Baltasar e Blimunda, Bartolomeu, Scarlatti, passarola.",
    "Memorial: denúncia do poder, da Inquisição e da exploração do povo.",
    "Ricardo Reis: Lisboa 1936, Estado Novo, Lídia, Marcenda, fantasma de Pessoa.",
    "Ricardo Reis: censura, PVDE, miséria, fascismos europeus.",
    "Narrador irónico e interventivo; diálogos sem marcas tradicionais.",
    "Intertextualidade com Camões e Pessoa."
  ],
  noExame: "2026: dilema de Baltasar, perceções sensoriais dos mercados e exposição sobre a denúncia das condições do povo.",
  exercicios: [
    {
      tipo: "mc",
      enunciado: "Em Memorial do Convento, a passarola é construída graças:",
      opcoes: ["ao ouro do rei", "às vontades humanas recolhidas por Blimunda", "ao trabalho forçado dos operários de Mafra", "à ajuda da Inquisição"],
      certa: 1,
      explicacao: "A passarola voa graças às «vontades» (nuvens fechadas dentro das pessoas) que Blimunda recolhe. Simboliza o sonho e a vontade humana."
    },
    {
      tipo: "aberta",
      enunciado: "Mostra que, em Memorial do Convento, Saramago denuncia as condições de vida do povo. Refere duas situações.",
      cotacao: 13,
      resolucao: `<p>Em <em>Memorial do Convento</em>, Saramago denuncia a <strong>exploração do povo</strong> ao serviço da vaidade do rei. Em primeiro lugar, a construção do convento de Mafra obriga milhares de homens, vindos de todo o país e muitas vezes recrutados à força, a trabalhar em condições duríssimas, mal alimentados e alojados em barracões precários. Em segundo lugar, o episódio do <strong>transporte da pedra</strong> para a varanda da basílica mostra o esforço sobre-humano e os acidentes mortais a que os trabalhadores estão sujeitos, em contraste com o luxo da corte. Deste modo, o narrador dá voz aos anónimos que a História oficial esquece.</p>`,
      criterios: [
        "Situação 1 (ex.: recrutamento forçado / condições dos trabalhadores de Mafra).",
        "Situação 2 (ex.: transporte da pedra, mortes, fome, autos de fé).",
        "Relação com a crítica ao poder / valorização dos anónimos.",
        "Introdução, desenvolvimento e conclusão (em respostas de exposição)."
      ]
    }
  ]
}
);
