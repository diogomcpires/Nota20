/* Nota20 · Matéria completa · Grupo II (Gramática e leitura) e Grupo III (Escrita) */
window.N20 = window.N20 || { topics: [] };
N20.materia = N20.materia || {};

N20.materia["leitura"] = [
{ titulo: "O que é pedido no Grupo II", html: `
<p>O Grupo II parte de um <strong>texto não literário</strong> (artigo de opinião, crónica, ensaio, reportagem, discurso, entrevista). As perguntas testam a <strong>compreensão</strong> do texto e a <strong>gramática</strong>.</p>` },
{ titulo: "Tese, argumentos e intenção", html: `
<ul>
<li><strong>Tema</strong>: o assunto geral (por exemplo, as redes sociais).</li>
<li><strong>Tese</strong>: a posição do autor sobre o tema (por exemplo, as redes sociais isolam os jovens).</li>
<li><strong>Argumentos</strong>: razões que sustentam a tese. <strong>Exemplos</strong>: casos concretos que ilustram os argumentos.</li>
<li><strong>Contra-argumentos</strong>: objeções que o autor refere para depois as refutar.</li>
<li><strong>Intenção comunicativa</strong>: informar, persuadir, criticar, alertar, refletir, divertir.</li>
</ul>` },
{ titulo: "Estrutura de um texto argumentativo", html: `
<ul>
<li><strong>Introdução</strong>: apresenta o tema e muitas vezes a tese.</li>
<li><strong>Desenvolvimento</strong>: argumentos, exemplos, contra-argumentos.</li>
<li><strong>Conclusão</strong>: reforça a tese, apela, sintetiza.</li>
</ul>
<p>Repara nos <strong>conectores</strong> (no entanto, por isso, além disso, em suma): indicam a função de cada parágrafo.</p>` },
{ titulo: "Géneros não literários", html: `
<ul>
<li><strong>Artigo de opinião</strong>: defende um ponto de vista, assinado, com argumentos.</li>
<li><strong>Crónica</strong>: texto breve sobre o quotidiano, tom pessoal e por vezes humorístico.</li>
<li><strong>Ensaio</strong>: reflexão aprofundada e pessoal sobre um tema cultural ou filosófico.</li>
<li><strong>Reportagem</strong>: relato informativo de factos, com testemunhos.</li>
<li><strong>Discurso político</strong>: dirigido a um público, persuasivo, com apelos.</li>
</ul>` },
{ titulo: "Recursos de persuasão", html: `
<ul>
<li>Interrogações retóricas, apóstrofes ao leitor, uso da 1.ª pessoa do plural («nós») para criar cumplicidade.</li>
<li>Argumento de autoridade (citar especialistas), dados e estatísticas, exemplos.</li>
<li>Ironia, comparação, enumeração, adjetivação valorativa.</li>
</ul>` },
{ titulo: "Como responder bem", html: `
<ul>
<li>Nas escolhas múltiplas, <strong>volta ao texto</strong>: a resposta certa está lá, não na tua opinião.</li>
<li>Desconfia de opções com palavras absolutas (sempre, nunca, todos) se o texto for matizado.</li>
<li>Para a intenção, pergunta: <em>o que quer o autor que o leitor pense ou faça?</em></li>
</ul>` },
];

N20.materia["funcoes-sintaticas"] = [
{ titulo: "Ao nível da frase", html: `
<ul>
<li><strong>Sujeito</strong>: com quem o verbo concorda. Pode ser simples, composto, nulo subentendido («Ø Chegámos cedo»), nulo indeterminado («Ø Dizem que vai chover») ou nulo expletivo (com verbos impessoais: «Ø Choveu»).</li>
<li><strong>Predicado</strong>: o verbo e os seus complementos e modificadores.</li>
<li><strong>Vocativo</strong>: chamamento, separado por vírgula («Pedro, anda cá»).</li>
<li><strong>Modificador de frase</strong>: expressa a opinião do falante sobre toda a frase («<em>Felizmente</em>, chegaste»).</li>
</ul>` },
{ titulo: "Dentro do grupo verbal", html: `
<ul>
<li><strong>Complemento direto (CD)</strong>: substitui-se por <strong>o, a, os, as</strong> («Li o livro» → «Li-o»).</li>
<li><strong>Complemento indireto (CI)</strong>: substitui-se por <strong>lhe, lhes</strong> («Dei o livro à Ana» → «Dei-lhe o livro»).</li>
<li><strong>Complemento oblíquo</strong>: exigido pelo verbo, preposicionado, <strong>não</strong> se substitui por «lhe» («Gosto <em>de música</em>», «Vou <em>a Lisboa</em>», «Moro <em>em Odivelas</em>»).</li>
<li><strong>Complemento agente da passiva</strong>: quem pratica a ação numa frase passiva («O livro foi escrito <em>por Eça</em>»).</li>
<li><strong>Predicativo do sujeito</strong>: com verbos copulativos (ser, estar, parecer, ficar, permanecer, tornar-se): «A Ana está <em>cansada</em>».</li>
<li><strong>Predicativo do complemento direto</strong>: caracteriza o CD, com verbos como considerar, achar, eleger, nomear, tornar: «Considero o filme <em>excelente</em>».</li>
<li><strong>Modificador do grupo verbal</strong>: informação acessória (tempo, lugar, modo, causa…), que pode ser retirada: «Estudei <em>ontem</em>».</li>
</ul>` },
{ titulo: "Dentro do grupo nominal", html: `
<ul>
<li><strong>Complemento do nome</strong>: exigido pelo nome, geralmente de nomes derivados de verbos ou adjetivos: «a destruição <em>da cidade</em>», «o medo <em>do escuro</em>».</li>
<li><strong>Modificador restritivo do nome</strong>: restringe a referência do nome, <strong>sem vírgulas</strong>: «o livro <em>que comprei</em>», «a casa <em>azul</em>».</li>
<li><strong>Modificador apositivo do nome</strong>: acrescenta informação, <strong>entre vírgulas</strong>: «Lisboa, <em>capital de Portugal</em>, …», «O Pedro, <em>que é médico</em>, …».</li>
</ul>
<p>Também há <strong>complemento do adjetivo</strong>: «Estou <em>farto de esperar</em>».</p>` },
{ titulo: "Testes para não falhar", html: `
<ul>
<li><strong>CD vs. oblíquo</strong>: experimenta «o/a». Se não der e tiver preposição exigida pelo verbo, é oblíquo.</li>
<li><strong>CI vs. oblíquo</strong>: experimenta «lhe». «Obedeço ao pai» → «Obedeço-lhe» (CI). «Penso no pai» → «Penso nele», não «lhe» (oblíquo).</li>
<li><strong>Oblíquo vs. modificador</strong>: se retirares e a frase ficar incompleta ou mudar de sentido, é oblíquo («Vou a Lisboa» → «Vou» fica incompleto).</li>
<li><strong>Predicativo do sujeito vs. modificador</strong>: verbo copulativo → predicativo.</li>
<li><strong>Restritivo vs. apositivo</strong>: vírgulas!</li>
</ul>` },
{ titulo: "Funções de orações", html: `
<p>Orações inteiras também têm funções:</p>
<ul>
<li>Subordinada substantiva completiva: muitas vezes <strong>CD</strong> («Disse <em>que vinha</em>») ou sujeito («<em>Que venhas</em> é importante»).</li>
<li>Subordinada adjetiva relativa: <strong>modificador restritivo ou apositivo do nome</strong>.</li>
<li>Subordinadas adverbiais: <strong>modificador do grupo verbal</strong> (ou modificador de frase).</li>
</ul>` },
];

N20.materia["oracoes"] = [
{ titulo: "Coordenação", html: `
<p>Orações <strong>independentes</strong> ligadas entre si:</p>
<ul>
<li><strong>Copulativas</strong>: e, nem, não só… mas também.</li>
<li><strong>Adversativas</strong>: mas, porém, contudo, todavia, no entanto.</li>
<li><strong>Disjuntivas</strong>: ou, ou… ou, quer… quer.</li>
<li><strong>Conclusivas</strong>: logo, portanto, por isso, pois (depois do verbo).</li>
<li><strong>Explicativas</strong>: pois, porque (quando explicam a afirmação anterior: «Deve ter chovido, pois o chão está molhado»).</li>
</ul>` },
{ titulo: "Subordinadas substantivas", html: `
<ul>
<li><strong>Completivas</strong>: introduzidas por <em>que, se, para</em>, ou sem conjunção (infinitivo). Funcionam como CD, sujeito, complemento oblíquo ou complemento do nome/adjetivo: «Sei <em>que tens razão</em>», «Pergunto <em>se vens</em>».</li>
<li><strong>Relativas sem antecedente</strong>: «<em>Quem espera</em> sempre alcança».</li>
</ul>` },
{ titulo: "Subordinadas adjetivas relativas", html: `
<p>Introduzidas por pronomes relativos (<em>que, o qual, quem, cujo, onde</em>) com <strong>antecedente</strong>:</p>
<ul>
<li><strong>Restritivas</strong>, sem vírgulas: «Os alunos <em>que estudaram</em> passaram» (só esses).</li>
<li><strong>Explicativas</strong>, entre vírgulas: «Os alunos, <em>que estudaram</em>, passaram» (todos estudaram).</li>
</ul>` },
{ titulo: "Subordinadas adverbiais", html: `
<ul>
<li><strong>Causais</strong>: porque, visto que, como (no início), uma vez que.</li>
<li><strong>Finais</strong>: para que, a fim de que, para + infinitivo.</li>
<li><strong>Temporais</strong>: quando, enquanto, logo que, assim que, antes que, depois que.</li>
<li><strong>Concessivas</strong>: embora, ainda que, mesmo que, apesar de.</li>
<li><strong>Condicionais</strong>: se, caso, desde que, a menos que.</li>
<li><strong>Consecutivas</strong>: tão/tanto… que, de modo que.</li>
<li><strong>Comparativas</strong>: como, (mais/menos)… do que, tal como.</li>
</ul>` },
{ titulo: "Armadilhas frequentes", html: `
<ul>
<li>«Que» pode iniciar <strong>completiva</strong> (depois de verbo: «Disse que…»), <strong>relativa</strong> (depois de nome: «o livro que…») ou <strong>consecutiva</strong> («tão cansado que…»).</li>
<li>«Porque»: <strong>causal</strong> (causa real) vs. <strong>explicativa</strong> (justifica o que se disse).</li>
<li>«Como»: causal no início da frase («Como chovia, fiquei»), comparativa («Fala como o pai»).</li>
<li>«Se»: condicional («Se vieres…») vs. completiva interrogativa indireta («Não sei se vens»).</li>
</ul>` },
];

N20.materia["coesao"] = [
{ titulo: "Coesão lexical", html: `
<p>Retomar referentes através do <strong>léxico</strong>:</p>
<ul>
<li><strong>Reiteração</strong> (repetição): «o rio… o rio».</li>
<li><strong>Substituição</strong> por <strong>sinónimos</strong>, <strong>hiperónimos</strong> («o cão… o animal»), <strong>hipónimos</strong>, <strong>holónimos/merónimos</strong>, ou expressões equivalentes («Pessoa… o poeta dos heterónimos»).</li>
</ul>` },
{ titulo: "Coesão gramatical referencial", html: `
<p>Retomar referentes através de palavras gramaticais (<strong>anáfora</strong>):</p>
<ul>
<li>Pronomes pessoais («o João… ele… viu-o»), demonstrativos (isso, este), possessivos, relativos.</li>
<li>Advérbios (lá, aí, então).</li>
<li><strong>Elipse</strong>: omissão de um termo já referido («A Ana chegou e Ø sentou-se»).</li>
<li><strong>Catáfora</strong>: o pronome aparece antes do referente («Disse-<em>o</em> claramente: não vou»).</li>
</ul>` },
{ titulo: "Coesão interfrásica, temporal e frásica", html: `
<ul>
<li><strong>Interfrásica</strong>: conectores e conjunções que ligam frases e orações e marcam relações lógicas (adição, oposição, causa, conclusão…).</li>
<li><strong>Temporal</strong>: tempos verbais coerentes, advérbios e expressões de tempo (depois, entretanto, no dia seguinte).</li>
<li><strong>Frásica</strong>: concordância (sujeito-verbo, nome-adjetivo), ordem das palavras.</li>
</ul>` },
{ titulo: "Como responder", html: `
<ul>
<li>Quando te pedem o <strong>referente</strong> de um pronome, procura para trás a expressão que ele substitui e verifica se concorda em género e número.</li>
<li>Para o mecanismo, nomeia com precisão: «coesão gramatical referencial, através do pronome pessoal…».</li>
</ul>` },
];

N20.materia["deixis"] = [
{ titulo: "Deíxis", html: `
<p>Palavras cujo sentido depende da <strong>situação de enunciação</strong> (quem fala, quando e onde):</p>
<ul>
<li><strong>Pessoal</strong>: pronomes e formas verbais da 1.ª e 2.ª pessoa (eu, tu, nós, meu, vosso).</li>
<li><strong>Temporal</strong>: hoje, ontem, amanhã, agora, este ano, e os tempos verbais relativos ao momento da fala.</li>
<li><strong>Espacial</strong>: aqui, aí, ali, cá, lá, este, esse, aquele.</li>
<li><strong>Social</strong>: formas de tratamento (tu, você, o senhor, V. Ex.ª).</li>
</ul>` },
{ titulo: "Discurso direto e indireto", html: `
<p>Ao passar do <strong>direto</strong> para o <strong>indireto</strong>:</p>
<ul>
<li>Introduz-se um <strong>verbo declarativo</strong> e «que» / «se».</li>
<li><strong>Pessoas</strong>: 1.ª/2.ª passam a 3.ª («eu» → «ele»).</li>
<li><strong>Tempos verbais</strong>: presente → pretérito imperfeito; pretérito perfeito → mais-que-perfeito; futuro → condicional; imperativo → conjuntivo.</li>
<li><strong>Deíticos</strong>: hoje → naquele dia; amanhã → no dia seguinte; ontem → na véspera; aqui → ali/lá; este → aquele.</li>
</ul>
<p>Exemplo: «Amanhã venho cá» → Disse que <em>no dia seguinte</em> <em>iria</em> <em>lá</em>.</p>` },
{ titulo: "Discurso indireto livre", html: `
<p>Mistura a voz do narrador com o pensamento da personagem, <strong>sem verbo introdutor</strong> e sem aspas, mantendo marcas da personagem (exclamações, interrogações). Muito usado por Eça e Saramago.</p>` },
];

N20.materia["aspeto-modalidade"] = [
{ titulo: "Valor aspetual", html: `
<p>Como a ação é vista em relação ao seu decurso:</p>
<ul>
<li><strong>Perfetivo</strong>: ação concluída («Li o livro»).</li>
<li><strong>Imperfetivo</strong>: ação em curso, não concluída («Estou a ler», «Lia quando chegaste»).</li>
<li><strong>Habitual</strong>: ação repetida como hábito («Costumo correr de manhã»).</li>
<li><strong>Iterativo</strong>: ação repetida num intervalo («Bateu à porta várias vezes»).</li>
<li><strong>Genérico</strong>: verdade geral, intemporal («A água ferve a 100 °C»).</li>
</ul>` },
{ titulo: "Valor modal", html: `
<p>A atitude do falante em relação ao que diz:</p>
<ul>
<li><strong>Epistémico</strong>: grau de <strong>certeza</strong> ou probabilidade («Talvez chova», «Deve ter saído», «Certamente virá»).</li>
<li><strong>Deôntico</strong>: <strong>obrigação</strong> ou <strong>permissão</strong> («Tens de estudar», «Podes sair»).</li>
<li><strong>Apreciativo</strong>: <strong>avaliação</strong>, juízo de valor («Infelizmente, perdemos», «Que bom!»).</li>
</ul>` },
{ titulo: "Atenção ao «poder» e «dever»", html: `
<ul>
<li>«Pode chover» = possibilidade → <strong>epistémico</strong>. «Podes ir» = permissão → <strong>deôntico</strong>.</li>
<li>«Deve estar em casa» = probabilidade → <strong>epistémico</strong>. «Deves respeitar» = obrigação → <strong>deôntico</strong>.</li>
</ul>` },
];

N20.materia["atos-ilocutorios"] = [
{ titulo: "Os cinco atos ilocutórios", html: `
<ul>
<li><strong>Assertivos</strong>: afirmar, informar, descrever, concluir («O exame é em junho»).</li>
<li><strong>Diretivos</strong>: levar o outro a fazer algo: pedir, ordenar, aconselhar, perguntar («Fecha a porta»).</li>
<li><strong>Compromissivos</strong>: o falante compromete-se: prometer, jurar, ameaçar («Amanhã ajudo-te»).</li>
<li><strong>Expressivos</strong>: exprimir sentimentos: agradecer, pedir desculpa, felicitar, lamentar («Obrigado!»).</li>
<li><strong>Declarativos</strong>: mudam a realidade pelo próprio ato de dizer, com autoridade: «Declaro aberta a sessão», «Estão casados».</li>
</ul>` },
{ titulo: "Atos diretos e indiretos", html: `
<p>Um ato é <strong>indireto</strong> quando a forma não corresponde à intenção: «Consegues passar-me o sal?» tem forma de pergunta, mas é um <strong>pedido</strong> (diretivo).</p>
<p>No exame, identifica sempre a <strong>intenção</strong> do falante, não só a forma da frase.</p>` },
];

N20.materia["palavras"] = [
{ titulo: "Processos morfológicos", html: `
<ul>
<li><strong>Derivação</strong>: por <strong>prefixação</strong> (in+feliz), <strong>sufixação</strong> (feliz+mente), <strong>parassíntese</strong> (prefixo e sufixo ao mesmo tempo, sem existir a forma intermédia: en+tard+ecer) e <strong>derivação não afixal</strong> (regressiva: lutar → luta).</li>
<li><strong>Composição</strong>: <strong>morfológica</strong> (radicais: hidro+elétrico, agricultura) ou <strong>morfossintática</strong> (palavras: guarda-chuva, cor-de-rosa).</li>
</ul>` },
{ titulo: "Processos não morfológicos", html: `
<ul>
<li><strong>Extensão semântica</strong>: nova aceção para uma palavra (rato do computador).</li>
<li><strong>Empréstimo</strong>: palavras de outras línguas (futebol, croissant).</li>
<li><strong>Amálgama</strong>: fusão de partes de palavras (portunhol).</li>
<li><strong>Sigla</strong> (lida letra a letra: UE) e <strong>acrónimo</strong> (lido como palavra: NATO).</li>
<li><strong>Truncação</strong>: redução (professor → prof).</li>
<li><strong>Onomatopeia</strong>: imitação de sons (tiquetaque).</li>
</ul>` },
{ titulo: "Relações semânticas", html: `
<ul>
<li><strong>Sinonímia</strong> e <strong>antonímia</strong>.</li>
<li><strong>Hiperonímia / hiponímia</strong>: geral / específico (flor → rosa).</li>
<li><strong>Holonímia / meronímia</strong>: todo / parte (corpo → braço).</li>
<li><strong>Polissemia</strong>: uma palavra com vários sentidos relacionados (cabeça de pessoa, cabeça de lista).</li>
<li><strong>Homonímia</strong>: palavras iguais com sentidos sem relação (são / são).</li>
</ul>` },
];

N20.materia["recursos-expressivos"] = [
{ titulo: "Como responder a um item de recursos", html: `
<p>Não basta <strong>nomear</strong> o recurso: tens de explicar o seu <strong>valor expressivo</strong>, ou seja, o efeito que tem naquele texto. Usa o esquema: <em>recurso + exemplo citado + efeito/sentido</em>.</p>` },
{ titulo: "Recursos de sentido", html: `
<ul>
<li><strong>Metáfora</strong>: comparação implícita («a vida é um rio»).</li>
<li><strong>Comparação</strong>: com conector (como, tal como, qual).</li>
<li><strong>Personificação</strong>: atribui características humanas a seres não humanos.</li>
<li><strong>Hipérbole</strong>: exagero.</li>
<li><strong>Eufemismo</strong>: suaviza algo desagradável.</li>
<li><strong>Ironia</strong>: diz o contrário do que se pensa, com intenção crítica.</li>
<li><strong>Antítese</strong>: ideias opostas próximas. <strong>Paradoxo/oxímoro</strong>: ideias opostas que parecem incompatíveis («fogo que arde sem se ver»).</li>
<li><strong>Metonímia</strong> e <strong>sinédoque</strong>: substituição por relação de proximidade (ler Camões = ler a obra de Camões).</li>
<li><strong>Sinestesia</strong>: mistura de sensações («cheiro doce»). <strong>Hipálage</strong>: atribui a um objeto uma qualidade de outro ser («cigarro pensativo»).</li>
<li><strong>Alegoria</strong>: metáfora prolongada (os peixes de Vieira).</li>
</ul>` },
{ titulo: "Recursos de construção e de som", html: `
<ul>
<li><strong>Anáfora</strong>: repetição no início de versos ou frases.</li>
<li><strong>Enumeração</strong> e <strong>gradação</strong> (enumeração em crescendo ou decrescendo).</li>
<li><strong>Apóstrofe</strong>: interpelação a alguém ou algo («Ó mar salgado»).</li>
<li><strong>Interrogação retórica</strong>: pergunta sem esperar resposta.</li>
<li><strong>Hipérbato / anástrofe</strong>: inversão da ordem normal das palavras.</li>
<li><strong>Quiasmo</strong>: cruzamento de termos (AB / BA).</li>
<li><strong>Aliteração</strong> (repetição de consoantes) e <strong>assonância</strong> (de vogais).</li>
<li><strong>Onomatopeia</strong>.</li>
</ul>` },
{ titulo: "Exemplo de resposta completa", html: `
<p>«A <strong>apóstrofe</strong> "Ó mar salgado" dirige-se diretamente ao mar, personificando-o, o que intensifica a emoção do sujeito e sublinha o sofrimento associado às navegações.»</p>` },
];

N20.materia["texto-opiniao"] = [
{ titulo: "Como é avaliado (44 pontos)", html: `
<ul>
<li><strong>Estruturação temática e discursiva</strong>: género/formato, tema e pertinência, organização e coesão.</li>
<li><strong>Correção linguística</strong>: ortografia, pontuação, sintaxe, vocabulário.</li>
<li>Extensão: <strong>200 a 350 palavras</strong>. Fora disso há desconto; menos de 80 palavras dá zero.</li>
</ul>` },
{ titulo: "Estrutura recomendada", html: `
<ol>
<li><strong>Introdução</strong> (1 parágrafo): apresenta o tema e a <strong>tese</strong> de forma clara.</li>
<li><strong>Desenvolvimento</strong> (2 parágrafos): <strong>dois argumentos diferentes</strong>, cada um com um <strong>exemplo</strong> concreto e significativo (da literatura, da história, da atualidade, da tua experiência).</li>
<li><strong>Conclusão</strong> (1 parágrafo): retoma a tese de forma diferente e fecha o texto, decorrendo da argumentação.</li>
</ol>` },
{ titulo: "O que dá nota alta", html: `
<ul>
<li>Tese <strong>inequívoca</strong> logo no início.</li>
<li>Argumentos <strong>distintos</strong> (não o mesmo dito duas vezes) e <strong>exemplos concretos</strong>, não vagos.</li>
<li><strong>Conectores</strong> variados (em primeiro lugar, além disso, por outro lado, por conseguinte, em suma).</li>
<li>Registo <strong>formal</strong>, sem coloquialismos; coerência de pessoa (1.ª pessoa ou impessoal, sem misturar).</li>
<li>Sem desvios ao tema.</li>
</ul>` },
{ titulo: "Erros a evitar", html: `
<ul>
<li>Fugir ao tema ou responder a outra pergunta.</li>
<li>Exemplos genéricos («há muitas pessoas que…»).</li>
<li>Conclusão que só repete a introdução palavra a palavra.</li>
<li>Passar das 350 palavras.</li>
</ul>` },
{ titulo: "Conectores úteis", html: `
<ul>
<li>Introduzir: <em>Atualmente, Nos dias de hoje, É inegável que</em>.</li>
<li>Adicionar: <em>Além disso, Acresce que, Por outro lado</em>.</li>
<li>Exemplificar: <em>Por exemplo, Veja-se o caso de, Prova disso é</em>.</li>
<li>Opor: <em>No entanto, Contudo, Ainda que</em>.</li>
<li>Concluir: <em>Em suma, Em conclusão, Assim</em>.</li>
</ul>` },
];

N20.materia["apreciacao-critica"] = [
{ titulo: "O que é", html: `
<p>Texto em que <strong>descreves</strong> um objeto (cartoon, imagem, filme, livro, exposição) e o <strong>comentas criticamente</strong>, dando a tua avaliação fundamentada.</p>` },
{ titulo: "Estrutura", html: `
<ol>
<li><strong>Descrição</strong> do objeto com os elementos <strong>significativos</strong> (o que se vê, quem, onde, que texto aparece).</li>
<li><strong>Comentário crítico</strong>: pelo menos <strong>três aspetos</strong> comentados (mensagem, recursos usados, eficácia, relação com a atualidade), com <strong>discurso valorativo</strong> (adjetivos e expressões de avaliação).</li>
<li><strong>Conclusão</strong>: apreciação global.</li>
</ol>` },
{ titulo: "Dicas", html: `
<ul>
<li>No cartoon, explica a <strong>crítica</strong> ou a <strong>ironia</strong> e como a imagem e o texto se combinam.</li>
<li>Usa vocabulário valorativo: <em>pertinente, eficaz, original, impressivo, irónico, oportuno</em>.</li>
<li>Respeita a extensão pedida.</li>
</ul>` },
];

N20.materia["exposicao"] = [
{ titulo: "O item de exposição (Grupo I, parte C)", html: `
<p>Pede um <strong>texto expositivo</strong> curto (normalmente <strong>130 a 170 palavras</strong>) sobre um tema das obras estudadas (por exemplo, «a representação do povo em Fernão Lopes» ou «a crítica social n'Os Maias»).</p>` },
{ titulo: "Estrutura", html: `
<ol>
<li><strong>Introdução</strong>: apresenta o tema.</li>
<li><strong>Desenvolvimento</strong>: dois tópicos/aspetos pedidos, cada um <strong>fundamentado com exemplos da obra</strong>.</li>
<li><strong>Conclusão</strong>: síntese.</li>
</ol>` },
{ titulo: "Dicas", html: `
<ul>
<li>Responde exatamente aos <strong>tópicos indicados</strong> no enunciado.</li>
<li>Usa <strong>exemplos concretos</strong> da obra (episódios, personagens, versos).</li>
<li>Linguagem objetiva, 3.ª pessoa, sem opinião pessoal.</li>
</ul>` },
];

N20.materia["correcao-linguistica"] = [
{ titulo: "Erros que mais tiram pontos", html: `
<ul>
<li><strong>Há / à / a</strong>: «Há dois anos» (tempo passado, verbo haver); «Vou à escola» (contração); «Daqui a dois dias» (futuro).</li>
<li><strong>Hífen nos pronomes</strong>: «fá-lo-ei», «diz-se», «viu-o».</li>
<li><strong>Mesóclise</strong>: no futuro e no condicional: «dir-te-ei», «far-se-ia».</li>
<li><strong>Por que / porque / porquê</strong>: «Porque não vens?», «Não sei porquê», «o motivo por que».</li>
<li><strong>Concordância</strong>: «Fazem dois anos» ✗ → «Faz dois anos» ✓; «Houveram problemas» ✗ → «Houve problemas» ✓.</li>
<li><strong>Vírgula entre sujeito e verbo</strong>: proibida («Os alunos, estudaram» ✗).</li>
<li><strong>Acordo Ortográfico</strong>: ação, ótimo, direção, receção (sem consoantes mudas).</li>
</ul>` },
{ titulo: "Pontuação", html: `
<ul>
<li>Vírgula antes de <em>mas, porém, contudo</em>.</li>
<li>Vírgulas a isolar orações relativas explicativas, apostos, vocativos e conectores no meio da frase.</li>
<li>Sem vírgula entre o verbo e o complemento direto.</li>
</ul>` },
{ titulo: "Desconto no exame", html: `
<p>Os erros dividem-se em tipo A (ortografia, pontuação, acentuação) e tipo B (sintaxe, impropriedade lexical). No texto do Grupo III há um parâmetro próprio de correção linguística, e nas respostas abertas os erros também descontam. Revê sempre o texto no fim.</p>` },
];
