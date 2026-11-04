/* Nota20 · Treino do Grupo I (Educação Literária)
   Exercícios originais acrescentados a cada obra e usados no «Treino rápido». */
window.N20 = window.N20 || { topics: [] };

(function () {
  const add = (id, arr) => { const t = N20.topics.find((x) => x.id === id); if (t) t.exercicios.push(...arr); };
  const mc = (enunciado, opcoes, certa, explicacao) => ({ tipo: "mc", enunciado, opcoes, certa, explicacao });

  add("trovadoresca", [
    mc("Nas cantigas de amor, o sujeito poético…", ["é uma donzela que fala do amigo.", "é um homem que se dirige a uma «senhor» inacessível.", "critica abertamente uma pessoa nomeada.", "descreve batalhas."], 1, "Vassalagem amorosa: o trovador serve a dama como um vassalo serve o senhor."),
    mc("A «coita d'amor» é…", ["a alegria do encontro.", "o sofrimento amoroso do trovador.", "o refrão da cantiga.", "a crítica social."], 1, "Típica da cantiga de amor."),
    mc("A diferença entre a cantiga de escárnio e a de maldizer é que…", ["a de escárnio critica de forma indireta (ironia, equívocos) e a de maldizer de forma direta, nomeando o visado.", "a de escárnio é cantada por mulheres.", "a de maldizer fala de amor.", "não há diferença."], 0, "Escárnio = indireto; maldizer = direto.")
  ]);
  add("fernao-lopes", [
    mc("Fernão Lopes preocupa-se com a «verdade» histórica, por isso…", ["inventa episódios para emocionar.", "consulta documentos e testemunhos e critica cronistas parciais.", "escreve apenas sobre reis.", "recusa descrever o povo."], 1, "É considerado o pai da historiografia portuguesa pelo rigor."),
    mc("A expressão «arraia-miúda» designa…", ["os nobres de Castela.", "o povo humilde.", "o clero.", "os soldados ingleses."], 1, "O povo miúdo, que ganha protagonismo na Crónica."),
    mc("Na crise de 1383-1385, o Mestre de Avis torna-se…", ["rei de Castela.", "Defensor do Reino e, depois, rei D. João I.", "cronista-mor.", "regente em nome de D. Leonor."], 1, "É aclamado Defensor e, em 1385, rei.")
  ]);
  add("gil-vicente", [
    mc("O mote da Farsa de Inês Pereira é…", ["«Quem tudo quer tudo perde.»", "«Mais quero asno que me leve que cavalo que me derrube.»", "«Deus quer, o homem sonha, a obra nasce.»", "«Mais vale só do que mal acompanhado.»"], 1, "A peça é a demonstração deste provérbio."),
    mc("Na cena final, Inês vai às costas de Pero Marques. Esta imagem…", ["concretiza o mote: o «asno» que a leva.", "mostra que Inês se arrependeu.", "prova que Pero Marques é esperto.", "não tem relação com o mote."], 0, "Pero Marques é o «asno» que a leva, enquanto ela o engana."),
    mc("Lianor Vaz tem na farsa a função de…", ["mãe de Inês.", "casamenteira que apresenta Pero Marques.", "criada de Brás da Mata.", "juíza."], 1, "Traz a proposta de casamento de Pero Marques.")
  ]);
  add("camoes-lirico", [
    mc("A medida velha caracteriza-se pelo uso de…", ["sonetos decassílabos.", "redondilhas (versos de 5 ou 7 sílabas), muitas vezes com mote e voltas.", "verso livre.", "oitava rima."], 1, "Tradição peninsular."),
    mc("No soneto «Mudam-se os tempos, mudam-se as vontades», o tema central é…", ["a beleza da amada.", "a mudança constante, que até muda a forma de mudar.", "a glória de Portugal.", "a vida no campo."], 1, "O desconcerto do mundo e a mudança que só traz mágoa."),
    mc("No soneto «Alma minha gentil, que te partiste», o sujeito poético…", ["celebra um casamento.", "chora a morte da amada e deseja reencontrá-la no Céu.", "critica a corte.", "descreve uma batalha."], 1, "Amor espiritual que sobrevive à morte.")
  ]);
  add("lusiadas", [
    mc("O episódio de Inês de Castro (Canto III) é narrado por…", ["Camões, no plano das reflexões.", "Vasco da Gama ao rei de Melinde.", "o Velho do Restelo.", "Vénus."], 1, "Integra a narração da história de Portugal."),
    mc("O Adamastor (Canto V) simboliza…", ["a glória dos navegadores.", "os perigos do mar e o medo do desconhecido, vencidos pelos portugueses.", "o amor de Inês.", "a cobiça."], 1, "É a personificação do Cabo das Tormentas."),
    mc("A Ilha dos Amores (Canto IX) é…", ["um castigo dos deuses.", "a recompensa dada pelos deuses aos navegadores.", "o local da morte de Inês.", "a terra do Adamastor."], 1, "Vénus prepara-a como prémio pelo esforço heroico.")
  ]);
  add("vieira", [
    mc("O conceito predicável do sermão é…", ["«Vós sois o sal da terra.»", "«Ó mar salgado.»", "«Deus quer, o homem sonha.»", "«Pregar aos homens.»"], 0, "Do Evangelho de São Mateus."),
    mc("Os Pegadores são repreendidos por…", ["traição.", "parasitismo e oportunismo.", "arrogância.", "ambição de voar."], 1, "Agarram-se aos peixes grandes e vivem à sua custa."),
    mc("Os Voadores são repreendidos por…", ["ambição e vaidade, por quererem ser mais do que são.", "falarem demasiado.", "serem traidores.", "não ouvirem Santo António."], 0, "Querem voar sendo peixes e acabam presos.")
  ]);
  add("frei-luis", [
    mc("No Ato I, Manuel de Sousa Coutinho incendeia o próprio palácio para…", ["fugir da justiça.", "não receber os governadores ao serviço de Castela.", "esconder o retrato de D. João.", "proteger Maria."], 1, "Gesto patriótico contra o domínio filipino."),
    mc("No desfecho, Manuel e Madalena…", ["fogem para Espanha.", "tomam o hábito religioso.", "reconciliam-se com D. João.", "partem para a Índia."], 1, "Manuel torna-se Frei Luís de Sousa; Maria morre."),
    mc("Os presságios (o retrato, a sexta-feira, os receios de Telmo) servem para…", ["criar humor.", "anunciar a catástrofe e aumentar a tensão trágica.", "descrever a época.", "caracterizar Lisboa."], 1, "Elementos de tragédia.")
  ]);
  add("amor-perdicao", [
    mc("O narrador apresenta a história como…", ["um sonho.", "uma «memória de família».", "uma lenda medieval.", "uma notícia de jornal."], 1, "Simão seria tio de Camilo."),
    mc("João da Cruz ajuda Simão porque…", ["é pai de Teresa.", "deve um favor ao pai de Simão.", "quer casá-lo com Mariana.", "é inimigo de Baltasar."], 1, "Domingos Botelho salvara-o no passado."),
    mc("No desfecho, Mariana…", ["casa com Simão.", "atira-se ao mar depois da morte de Simão.", "entra no convento.", "volta para Viseu."], 1, "Morre por amor, como Simão e Teresa.")
  ]);
  add("os-maias", [
    mc("O subtítulo de Os Maias é…", ["«Cenas da vida lisboeta».", "«Episódios da vida romântica».", "«Crónica de costumes».", "«Memórias de família»."], 1, "Sugere a ironia sobre o romantismo."),
    mc("A corrida de cavalos no hipódromo critica sobretudo…", ["a pobreza do povo.", "o provincianismo e a imitação falhada do estrangeiro.", "a política.", "o jornalismo."], 1, "Lisboa quer parecer cosmopolita e não consegue."),
    mc("No final, Carlos e Ega correm para apanhar o «americano». O episódio…", ["mostra que mudaram de vida.", "contradiz, com ironia, a teoria de que nada vale a pena.", "é uma homenagem a Afonso.", "anuncia uma tragédia."], 1, "Dizem que não vale a pena correr… e correm.")
  ]);
  add("antero", [
    mc("Antero de Quental foi uma figura central…", ["do Trovadorismo.", "da Geração de 70 e das Conferências do Casino.", "do Orpheu.", "do Neorrealismo."], 1, "Liderou a geração que quis renovar a cultura portuguesa."),
    mc("A forma poética preferida de Antero é…", ["o soneto.", "a ode.", "a redondilha.", "o verso livre."], 0, "Usa o soneto como instrumento de reflexão."),
    mc("No soneto «Na mão de Deus», a morte surge como…", ["castigo.", "repouso e libertação junto de Deus.", "tema cómico.", "algo a evitar a todo o custo."], 1, "O sujeito entrega-se a Deus e encontra paz.")
  ]);
  add("cesario", [
    mc("«O Sentimento dum Ocidental» descreve…", ["uma viagem ao campo.", "Lisboa ao anoitecer, numa deambulação do sujeito poético.", "uma batalha.", "uma história de amor no campo."], 1, "As quatro partes acompanham a noite na cidade."),
    mc("Em «Num Bairro Moderno», o sujeito poético…", ["critica a Igreja.", "transforma a giga de legumes de uma vendedeira numa figura humana.", "descreve o mar.", "fala da morte da irmã."], 1, "A imaginação recria o real a partir do que vê."),
    mc("A poesia de Cesário é marcada por…", ["linguagem abstrata e mística.", "notação sensorial (visual, auditiva, olfativa) e olhar de pintor.", "temas medievais.", "versos sem rima nem métrica."], 1, "Regista o real através dos sentidos.")
  ]);
  add("pessoa-ortonimo", [
    mc("A «dor de pensar» significa que…", ["o pensamento traz felicidade.", "a consciência impede o sujeito de ser feliz.", "o poeta não pensa.", "pensar é uma doença física."], 1, "Pensar afasta-o da felicidade simples."),
    mc("Em «Não sei quantas almas tenho», o tema central é…", ["a nostalgia da infância.", "a fragmentação do eu.", "o fingimento poético.", "o sebastianismo."], 1, "O sujeito não se reconhece, «diverso, móbil e só»."),
    mc("Formalmente, a poesia do ortónimo aproxima-se da lírica tradicional pelo uso de…", ["verso livre e longo.", "quadras, versos curtos, rima e musicalidade.", "odes clássicas.", "prosa poética."], 1, "Forma tradicional ao serviço de temas intelectuais.")
  ]);
  add("heteronimos", [
    mc("Ricardo Reis procura a ataraxia, isto é…", ["a euforia.", "a tranquilidade, a ausência de perturbação.", "a ação heroica.", "a revolta."], 1, "Ideal estoico-epicurista."),
    mc("A linguagem de Ricardo Reis caracteriza-se por…", ["vocabulário simples e verso livre.", "sintaxe latinizante, com hipérbatos, e vocabulário erudito.", "onomatopeias e exclamações.", "linguagem popular."], 1, "Imita os modelos clássicos."),
    mc("As três fases de Álvaro de Campos são…", ["decadentista, futurista/sensacionista e intimista.", "medieval, clássica e romântica.", "realista, simbolista e modernista.", "lírica, épica e dramática."], 0, "«Opiário», «Ode Triunfal», «Tabacaria».")
  ]);
  add("mensagem", [
    mc("As três partes da Mensagem são…", ["Brasão, Mar Português e O Encoberto.", "Glória, Queda e Salvação.", "Terra, Mar e Céu.", "Passado, Presente e Futuro."], 0, "Nascimento, realização e morte/renascimento."),
    mc("No poema «O Mostrengo», o homem do leme vence o medo em nome de…", ["D. Sebastião.", "D. João II e da vontade de um povo.", "Vasco da Gama.", "Deus."], 1, "«Manda a vontade, que me ata ao leme, / De El-Rei D. João Segundo!»"),
    mc("Em «Mar Português», a ideia de que tudo vale a pena «Se a alma não é pequena» significa que…", ["o sofrimento nunca compensa.", "o sacrifício é justificado pela grandeza do sonho.", "só os ricos vencem.", "o mar é perigoso."], 1, "O esforço coletivo vale pelo ideal que serve.")
  ]);
  add("contos", [
    mc("O título «Sempre é uma companhia» é…", ["uma frase do Batola sobre a mulher.", "o que a mulher do Batola diz para justificar ficar com a telefonia.", "o nome da aldeia.", "o slogan do caixeiro-viajante."], 1, "Revela a solidão e o isolamento do casal e da aldeia."),
    mc("Em «Sempre é uma companhia», a chegada da telefonia…", ["isola ainda mais a aldeia.", "aproxima as pessoas e abre a aldeia ao mundo.", "provoca uma tragédia.", "é recusada por todos."], 1, "Os homens voltam a reunir-se na venda."),
    mc("Um tema central de «George» é…", ["a guerra colonial.", "a passagem do tempo e as escolhas de uma mulher que quis ser livre.", "a vida no campo.", "a religião."], 1, "Gi, George e Georgina: três idades da mesma mulher.")
  ]);
  add("poetas-contemporaneos", [
    mc("Quando um poeta contemporâneo dialoga com Camões ou Pessoa, recorre sobretudo a…", ["intertextualidade.", "discurso indireto livre.", "deíxis social.", "aspeto genérico."], 0, "Retoma, transforma ou parodia textos anteriores."),
    mc("No poema «25 de Abril», Sophia de Mello Breyner Andresen celebra…", ["a monarquia.", "a liberdade e o começo de um tempo novo.", "a vida no campo.", "a guerra."], 1, "O dia da revolução como manhã inicial e limpa."),
    mc("Um poema que fala do próprio ato de escrever integra a linha temática…", ["representações do contemporâneo.", "figurações do poeta / arte poética.", "tradição literária.", "o amor."], 1, "O poeta reflete sobre a poesia.")
  ]);
  add("saramago", [
    mc("Em Memorial do Convento, a pontuação de Saramago caracteriza-se por…", ["uso abundante de travessões e aspas.", "falas separadas por vírgulas e iniciadas por maiúscula, sem travessões.", "ausência total de pontuação.", "frases muito curtas."], 1, "A oralidade entra no texto sem marcas gráficas tradicionais."),
    mc("Em Memorial do Convento, Blimunda encontra Baltasar, depois de nove anos de procura…", ["no convento de Mafra.", "a ser queimado num auto de fé, e recolhe a sua vontade.", "em Paris.", "na passarola."], 1, "Desfecho trágico e simbólico."),
    mc("Em O Ano da Morte de Ricardo Reis, a ação decorre…", ["no século XVIII.", "em 1936, em Lisboa, no tempo do Estado Novo e das ditaduras europeias.", "no Brasil.", "durante as invasões francesas."], 1, "Reis regressa a Lisboa depois da morte de Pessoa.")
  ]);
})();
