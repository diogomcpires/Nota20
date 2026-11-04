/* Nota20 · Banco de treino do Grupo II (gramática e leitura)
   Exercícios originais, acrescentados aos tópicos e usados no modo «Treino rápido». */
window.N20 = window.N20 || { topics: [] };

(function () {
  const add = (id, arr) => { const t = N20.topics.find((x) => x.id === id); if (t) t.exercicios.push(...arr); };
  const mc = (enunciado, opcoes, certa, explicacao) => ({ tipo: "mc", enunciado, opcoes, certa, explicacao });
  const FS = ["sujeito", "complemento direto", "complemento indireto", "complemento oblíquo", "complemento agente da passiva", "predicativo do sujeito", "predicativo do complemento direto", "modificador do grupo verbal", "modificador de frase", "complemento do nome", "modificador restritivo do nome", "modificador apositivo do nome", "complemento do adjetivo", "vocativo"];
  const fs = (frase, seg, opcoes, certa, explicacao) => mc(`Em «${frase}», o segmento «${seg}» desempenha a função de…`, opcoes, certa, explicacao);

  add("funcoes-sintaticas", [
    fs("A professora considerou o trabalho excelente.", "excelente", ["predicativo do sujeito.", "predicativo do complemento direto.", "modificador restritivo do nome.", "complemento direto."], 1, "Caracteriza o CD («o trabalho») com o verbo «considerar»."),
    fs("Os alunos gostam de poesia.", "de poesia", ["complemento indireto.", "modificador do grupo verbal.", "complemento oblíquo.", "complemento do nome."], 2, "É selecionado por «gostar», é preposicionado e não se substitui por «lhe»."),
    fs("Entreguei o teste ao professor.", "ao professor", ["complemento indireto.", "complemento oblíquo.", "complemento direto.", "modificador do grupo verbal."], 0, "Substitui-se por «lhe»: «Entreguei-lhe o teste»."),
    fs("O Memorial do Convento foi escrito por Saramago.", "por Saramago", ["complemento oblíquo.", "modificador do grupo verbal.", "complemento agente da passiva.", "sujeito."], 2, "Frase passiva: quem pratica a ação é o agente da passiva."),
    fs("Lisboa, cidade de Cesário Verde, inspirou muitos poetas.", "cidade de Cesário Verde", ["modificador restritivo do nome.", "modificador apositivo do nome.", "complemento do nome.", "sujeito."], 1, "Acrescenta informação sobre «Lisboa», entre vírgulas."),
    fs("O medo da solidão atormenta o sujeito poético.", "da solidão", ["complemento do nome.", "modificador restritivo do nome.", "complemento oblíquo.", "complemento do adjetivo."], 0, "O nome «medo» pede um complemento (medo de quê?)."),
    fs("Felizmente, o exame correu bem.", "Felizmente", ["modificador do grupo verbal.", "modificador de frase.", "vocativo.", "predicativo do sujeito."], 1, "Exprime a atitude do falante sobre toda a frase."),
    fs("O poeta parece cansado.", "cansado", ["predicativo do sujeito.", "complemento direto.", "modificador do grupo verbal.", "predicativo do complemento direto."], 0, "Surge depois de um verbo copulativo («parecer») e caracteriza o sujeito."),
    fs("Os alunos que estudaram tiveram boa nota.", "que estudaram", ["modificador apositivo do nome.", "complemento do nome.", "modificador restritivo do nome.", "complemento direto."], 2, "Relativa restritiva, sem vírgulas: restringe «os alunos»."),
    fs("Ricardo, fecha a porta!", "Ricardo", ["sujeito.", "vocativo.", "complemento direto.", "modificador de frase."], 1, "É um chamamento ao interlocutor."),
    fs("Estudei toda a tarde na biblioteca.", "na biblioteca", ["complemento oblíquo.", "modificador do grupo verbal.", "complemento indireto.", "complemento do nome."], 1, "«Estudar» não seleciona um lugar: a informação pode ser retirada."),
    fs("Vivo em Odivelas há dez anos.", "em Odivelas", ["modificador do grupo verbal.", "complemento oblíquo.", "complemento indireto.", "modificador de frase."], 1, "«Viver», com este sentido, seleciona um complemento de lugar."),
    fs("A Ana está orgulhosa do irmão.", "do irmão", ["complemento do nome.", "complemento oblíquo.", "complemento do adjetivo.", "modificador restritivo do nome."], 2, "Completa o adjetivo «orgulhosa»."),
    fs("Elegeram-no delegado de turma.", "delegado de turma", ["complemento direto.", "predicativo do sujeito.", "predicativo do complemento direto.", "modificador apositivo do nome."], 2, "Caracteriza o CD («o»), com o verbo «eleger»."),
    fs("O professor deu-lhes os resultados.", "lhes", ["complemento direto.", "complemento indireto.", "sujeito.", "complemento oblíquo."], 1, "«lhes» é sempre complemento indireto.")
  ]);

  const or = (frase, seg, opcoes, certa, explicacao) => mc(`Em «${frase}», a oração «${seg}» classifica-se como…`, opcoes, certa, explicacao);
  add("oracoes", [
    or("Embora estivesse cansado, o Jacinto foi à festa.", "Embora estivesse cansado", ["subordinada adverbial causal.", "subordinada adverbial concessiva.", "coordenada adversativa.", "subordinada adverbial condicional."], 1, "«Embora» introduz um obstáculo que não impede a ação: concessiva."),
    or("Se estudares, terás boa nota.", "Se estudares", ["subordinada adverbial condicional.", "subordinada adverbial temporal.", "subordinada substantiva completiva.", "subordinada adverbial final."], 0, "Exprime a condição para a nota."),
    or("O Carlos disse que viria amanhã.", "que viria amanhã", ["subordinada adjetiva relativa restritiva.", "subordinada substantiva completiva.", "subordinada adverbial consecutiva.", "coordenada explicativa."], 1, "Completa o verbo «dizer» (função de complemento direto)."),
    or("O livro que me emprestaste é ótimo.", "que me emprestaste", ["subordinada adjetiva relativa explicativa.", "subordinada substantiva completiva.", "subordinada adjetiva relativa restritiva.", "subordinada substantiva relativa."], 2, "Tem antecedente («o livro») e restringe-o, sem vírgulas."),
    or("Os Maias, que Eça publicou em 1888, retratam a sociedade lisboeta.", "que Eça publicou em 1888", ["subordinada adjetiva relativa explicativa.", "subordinada adjetiva relativa restritiva.", "subordinada substantiva completiva.", "coordenada copulativa."], 0, "Está entre vírgulas e acrescenta informação: explicativa."),
    or("Estudou tanto que adormeceu em cima dos livros.", "que adormeceu em cima dos livros", ["subordinada adverbial consecutiva.", "subordinada adverbial comparativa.", "subordinada substantiva completiva.", "subordinada adverbial causal."], 0, "«tanto… que»: exprime a consequência."),
    or("Saiu cedo para que não perdesse o comboio.", "para que não perdesse o comboio", ["subordinada adverbial causal.", "subordinada adverbial final.", "subordinada adverbial consecutiva.", "subordinada adverbial condicional."], 1, "Exprime a finalidade."),
    or("Quando chegou, já todos tinham saído.", "Quando chegou", ["subordinada adverbial temporal.", "subordinada adverbial condicional.", "subordinada adjetiva relativa.", "coordenada conclusiva."], 0, "Situa a ação no tempo."),
    or("Quem estuda aprende.", "Quem estuda", ["subordinada adjetiva relativa restritiva.", "subordinada substantiva relativa.", "subordinada substantiva completiva.", "subordinada adverbial condicional."], 1, "Relativa sem antecedente, com função de sujeito."),
    or("Não fui à praia, pois estava a chover.", "pois estava a chover", ["coordenada explicativa.", "coordenada conclusiva.", "subordinada adverbial final.", "coordenada adversativa."], 0, "«pois», depois da oração, justifica a afirmação anterior."),
    or("Estudei muito, logo mereço a nota.", "logo mereço a nota", ["coordenada explicativa.", "coordenada conclusiva.", "subordinada adverbial consecutiva.", "coordenada copulativa."], 1, "«logo» introduz uma conclusão."),
    or("É importante que leias os textos com atenção.", "que leias os textos com atenção", ["subordinada substantiva completiva.", "subordinada adjetiva relativa restritiva.", "subordinada adverbial final.", "subordinada adverbial causal."], 0, "Completiva com função de sujeito («Isso é importante»)."),
    or("Ele é mais alto do que eu.", "do que eu (sou)", ["subordinada adverbial consecutiva.", "subordinada adverbial comparativa.", "subordinada adverbial concessiva.", "coordenada adversativa."], 1, "«mais… do que»: comparação.")
  ]);

  add("coesao", [
    mc("Em «O Carlos viu a Maria Eduarda. Ele ficou fascinado.», o pronome «Ele» assegura a coesão…", ["lexical, por reiteração.", "referencial, por anáfora.", "referencial, por catáfora.", "temporal."], 1, "Retoma um referente já referido (anáfora)."),
    mc("Em «Disse-lhe apenas isto: amanhã não venho.», «isto» é um caso de…", ["anáfora.", "catáfora.", "elipse.", "substituição lexical."], 1, "Antecipa o que vem a seguir: catáfora."),
    mc("Em «Comprei rosas e túlipas. As flores enfeitaram a sala.», a coesão é assegurada por…", ["substituição por um hiperónimo.", "reiteração.", "substituição por um sinónimo.", "elipse."], 0, "«flores» é hiperónimo de «rosas» e «túlipas»."),
    mc("Em «O Pedro leu Os Maias e a Ana também.», há…", ["catáfora.", "elipse.", "reiteração lexical.", "substituição por hipónimo."], 1, "Fica subentendido «leu Os Maias»."),
    mc("O conector «contudo» exprime…", ["adição.", "contraste/oposição.", "conclusão.", "causa."], 1, "Equivale a «mas», «no entanto»."),
    mc("O conector «portanto» exprime…", ["conclusão.", "concessão.", "exemplificação.", "tempo."], 0, "Introduz uma conclusão."),
    mc("Qual dos conectores tem valor aditivo?", ["«no entanto»", "«além disso»", "«por conseguinte»", "«ou seja»"], 1, "«além disso» acrescenta informação."),
    mc("«Isto é», «ou seja» e «quer dizer» servem para…", ["opor ideias.", "reformular/explicitar.", "concluir.", "exprimir causa."], 1, "Introduzem uma explicação do que foi dito."),
    mc("Em «Primeiro, leu o poema; depois, analisou-o.», a coesão temporal é assegurada sobretudo por…", ["advérbios/locuções temporais e tempos verbais.", "pronomes pessoais.", "repetição de palavras.", "conectores adversativos."], 0, "«Primeiro», «depois» e o pretérito perfeito ordenam as ações."),
    mc("A frase que mantém o sentido de «Apesar de estar a chover, saímos.» é…", ["«Saímos porque estava a chover.»", "«Embora estivesse a chover, saímos.»", "«Se estivesse a chover, sairíamos.»", "«Estava a chover, logo saímos.»"], 1, "Ambas exprimem concessão."),
    mc("Num texto, o uso repetido da palavra «liberdade» em parágrafos seguidos assegura a coesão…", ["lexical, por reiteração.", "referencial, por catáfora.", "frásica.", "temporal."], 0, "Repetir a mesma palavra é reiteração.")
  ]);

  add("deixis", [
    mc("Em «Amanhã vou ao Porto.», «Amanhã» é um deítico…", ["pessoal.", "espacial.", "temporal.", "social."], 2, "Só se percebe a data sabendo quando a frase foi dita."),
    mc("Em «Aqui está o livro que pediste.», «Aqui» é um deítico…", ["espacial.", "temporal.", "pessoal.", "social."], 0, "Depende do lugar onde está o falante."),
    mc("Em «Vossa Excelência está satisfeito?», a forma de tratamento é um caso de deíxis…", ["temporal.", "espacial.", "social.", "textual."], 2, "Marca a relação social entre os interlocutores."),
    mc("Em «Este livro é melhor do que aquele.», os demonstrativos são deíticos…", ["pessoais.", "espaciais.", "temporais.", "sociais."], 1, "Indicam proximidade ou distância em relação ao falante."),
    mc("A passagem correta de «Vou sair agora», disse ele, para o discurso indireto é…", ["Ele disse que vou sair agora.", "Ele disse que ia sair naquele momento.", "Ele disse que iria sair amanhã.", "Ele disse: ia sair naquele momento."], 1, "O presente passa a imperfeito e «agora» a «naquele momento»."),
    mc("A passagem correta de «Estudarei amanhã», disse a Ana, para o discurso indireto é…", ["A Ana disse que estudará amanhã.", "A Ana disse que estudaria no dia seguinte.", "A Ana disse que estudava ontem.", "A Ana disse que estudaria amanhã."], 1, "Futuro → condicional; «amanhã» → «no dia seguinte»."),
    mc("A passagem correta de «Ontem estive aqui», disse o João, para o discurso indireto é…", ["O João disse que na véspera tinha estado ali.", "O João disse que ontem esteve aqui.", "O João disse que no dia seguinte estaria ali.", "O João disse que na véspera estou ali."], 0, "Perfeito → mais-que-perfeito; «ontem» → «na véspera»; «aqui» → «ali»."),
    mc("A passagem correta de «Fecha a janela!», pediu a mãe, para o discurso indireto é…", ["A mãe pediu que fecha a janela.", "A mãe pediu que fechasse a janela.", "A mãe pediu: fechasse a janela.", "A mãe pediu que fechará a janela."], 1, "O imperativo passa ao conjuntivo."),
    mc("No discurso indireto livre, as falas ou pensamentos da personagem…", ["aparecem entre aspas, com travessão.", "são introduzidos sempre por «disse que».", "surgem na voz do narrador, sem verbo introdutor nem marcas gráficas.", "só aparecem no teatro."], 2, "Mistura a voz do narrador com a da personagem."),
    mc("Que verbo introdutor indica que a personagem falou em resposta a outra?", ["«perguntou»", "«respondeu»", "«ordenou»", "«sussurrou»"], 1, "O verbo introdutor dá informação sobre o ato de fala.")
  ]);

  add("aspeto-modalidade", [
    mc("Em «A Terra gira à volta do Sol.», o valor aspetual é…", ["habitual.", "genérico.", "iterativo.", "perfetivo."], 1, "É uma verdade geral, sem limites no tempo."),
    mc("Em «Todos os dias, leio o jornal.», o valor aspetual é…", ["genérico.", "habitual.", "perfetivo.", "iterativo."], 1, "Ação repetida por hábito."),
    mc("Em «Bateu à porta várias vezes.», o valor aspetual é…", ["iterativo.", "genérico.", "imperfetivo.", "habitual."], 0, "Ação repetida numa mesma ocasião."),
    mc("Em «Li o livro todo.», o valor aspetual é…", ["imperfetivo.", "perfetivo.", "genérico.", "habitual."], 1, "A ação é apresentada como concluída."),
    mc("Em «Estava a ler quando o telefone tocou.», «Estava a ler» tem valor…", ["perfetivo.", "imperfetivo.", "genérico.", "iterativo."], 1, "A ação está em curso, não concluída."),
    mc("Em «Talvez chova amanhã.», a modalidade é…", ["deôntica, com valor de obrigação.", "epistémica, com valor de probabilidade.", "apreciativa.", "deôntica, com valor de permissão."], 1, "Exprime o grau de certeza do falante."),
    mc("Em «Tens de entregar o trabalho hoje.», a modalidade é…", ["epistémica.", "deôntica, com valor de obrigação.", "apreciativa.", "deôntica, com valor de permissão."], 1, "Impõe uma obrigação."),
    mc("Em «Podes sair mais cedo.», a modalidade é…", ["deôntica, com valor de permissão.", "epistémica, com valor de certeza.", "apreciativa.", "deôntica, com valor de obrigação."], 0, "Dá autorização."),
    mc("Em «Que belo poema!», a modalidade é…", ["epistémica.", "deôntica.", "apreciativa.", "nenhuma."], 2, "Exprime uma avaliação do falante."),
    mc("Em «Certamente o exame será difícil.», a modalidade é…", ["epistémica, com valor de certeza.", "deôntica, com valor de obrigação.", "apreciativa.", "epistémica, com valor de probabilidade."], 0, "«Certamente» indica certeza."),
    mc("Em «Infelizmente, chegou tarde.», «Infelizmente» marca a modalidade…", ["deôntica.", "epistémica.", "apreciativa.", "nenhuma."], 2, "Avalia negativamente o facto.")
  ]);

  add("atos-ilocutorios", [
    mc("«Prometo que amanhã te devolvo o livro.» é um ato ilocutório…", ["assertivo.", "compromissivo.", "diretivo.", "expressivo."], 1, "O falante compromete-se com uma ação futura."),
    mc("«Fecha a porta, por favor.» é um ato ilocutório…", ["diretivo.", "assertivo.", "declarativo.", "compromissivo."], 0, "Procura que o ouvinte faça algo."),
    mc("«Peço desculpa pelo atraso.» é um ato ilocutório…", ["diretivo.", "expressivo.", "assertivo.", "compromissivo."], 1, "Exprime um estado psicológico (arrependimento)."),
    mc("«Declaro aberta a sessão.», dito pelo presidente da mesa, é um ato ilocutório…", ["assertivo.", "declarativo.", "diretivo.", "expressivo."], 1, "Muda a realidade pelo simples facto de ser dito por quem tem autoridade."),
    mc("«O exame de Português tem três grupos.» é um ato ilocutório…", ["assertivo.", "compromissivo.", "expressivo.", "diretivo."], 0, "Afirma algo que pode ser verdadeiro ou falso."),
    mc("«Podes passar-me o sal?», dito à mesa, é um ato ilocutório…", ["assertivo direto.", "diretivo indireto.", "expressivo.", "compromissivo."], 1, "Tem forma de pergunta, mas é um pedido."),
    mc("«Parabéns pelo resultado!» é um ato ilocutório…", ["expressivo.", "declarativo.", "diretivo.", "assertivo."], 0, "Exprime um sentimento (felicitação)."),
    mc("«Está frio aqui, não está?», dito para que alguém feche a janela, é…", ["um ato assertivo direto.", "um ato diretivo indireto.", "um ato compromissivo.", "um ato declarativo."], 1, "A forma assertiva esconde um pedido.")
  ]);

  add("palavras", [
    mc("A palavra «infeliz» forma-se por…", ["derivação por sufixação.", "derivação por prefixação.", "composição morfológica.", "conversão."], 1, "in- + feliz."),
    mc("A palavra «felizmente» forma-se por…", ["derivação por sufixação.", "derivação parassintética.", "composição morfossintática.", "derivação por prefixação."], 0, "feliz + -mente."),
    mc("A palavra «entardecer» forma-se por…", ["derivação por prefixação.", "composição.", "derivação parassintética.", "conversão."], 2, "en- + tarde + -ecer em simultâneo (não existe «entarde» nem «tardecer»)."),
    mc("A palavra «guarda-chuva» forma-se por…", ["composição morfológica.", "composição morfossintática.", "derivação por sufixação.", "amálgama."], 1, "Junta duas palavras (verbo + nome)."),
    mc("A palavra «agricultura» forma-se por…", ["composição morfológica.", "composição morfossintática.", "derivação parassintética.", "truncação."], 0, "Junta dois radicais (agri- + cultura)."),
    mc("Em «O jantar estava ótimo.», «jantar» resulta de…", ["derivação.", "conversão.", "composição.", "siglação."], 1, "Um verbo passa a nome sem mudar de forma."),
    mc("«CP» (Comboios de Portugal) é um caso de…", ["acronímia.", "siglação.", "truncação.", "amálgama."], 1, "Lê-se letra a letra."),
    mc("«metro» (de «metropolitano») é um caso de…", ["truncação.", "siglação.", "amálgama.", "derivação."], 0, "A palavra é encurtada."),
    mc("A relação entre «flor» e «rosa» é de…", ["sinonímia.", "hiperonímia/hiponímia.", "holonímia/meronímia.", "antonímia."], 1, "«flor» é hiperónimo de «rosa»."),
    mc("A relação entre «roda» e «bicicleta» é de…", ["hiperonímia/hiponímia.", "meronímia/holonímia.", "sinonímia.", "antonímia."], 1, "A roda é uma parte da bicicleta (merónimo)."),
    mc("«portunhol» (português + espanhol) é um caso de…", ["composição morfológica.", "amálgama.", "siglação.", "conversão."], 1, "Junta partes de duas palavras.")
  ]);

  add("recursos-expressivos", [
    mc("«O vento chorava lá fora.» Recurso expressivo:", ["metáfora.", "personificação.", "hipérbole.", "comparação."], 1, "Atribui uma ação humana ao vento."),
    mc("«Já te disse isto um milhão de vezes.» Recurso expressivo:", ["hipérbole.", "eufemismo.", "ironia.", "gradação."], 0, "Exagero intencional."),
    mc("«contentamento descontente» Recurso expressivo:", ["antítese.", "oxímoro.", "hipálage.", "anáfora."], 1, "Junta termos contraditórios numa só expressão."),
    mc("«Ó mar salgado, quanto do teu sal / São lágrimas de Portugal!» Em «Ó mar salgado», há…", ["apóstrofe.", "comparação.", "eufemismo.", "metonímia."], 0, "O sujeito dirige-se ao mar."),
    mc("«Passei a tarde a ler Camões.» Recurso expressivo:", ["metáfora.", "metonímia.", "perífrase.", "sinestesia."], 1, "O autor está pela obra."),
    mc("«Tinha uns olhos verdes como o mar.» Recurso expressivo:", ["metáfora.", "comparação.", "hipálage.", "hipérbole."], 1, "Há um elemento comparativo explícito («como»)."),
    mc("«Ele partiu para sempre», em vez de «ele morreu». Recurso expressivo:", ["eufemismo.", "ironia.", "hipérbole.", "perífrase."], 0, "Suaviza uma realidade dolorosa."),
    mc("«Correu, saltou, voou.» Recurso expressivo:", ["enumeração com gradação.", "anáfora.", "antítese.", "pleonasmo."], 0, "As ações sucedem-se com intensidade crescente."),
    mc("«uma voz doce e aveludada» Recurso expressivo:", ["sinestesia.", "personificação.", "hipálage.", "comparação."], 0, "Mistura sensações de sentidos diferentes (audição, paladar, tato)."),
    mc("«o Rei dos animais», para designar o leão. Recurso expressivo:", ["metonímia.", "perífrase.", "eufemismo.", "metáfora."], 1, "Diz por várias palavras o que se podia dizer com uma."),
    mc("«Que bonito serviço!», dito a quem partiu um prato. Recurso expressivo:", ["ironia.", "eufemismo.", "hipérbole.", "apóstrofe."], 0, "Diz-se o contrário do que se pensa."),
    mc("«É um não querer… / é um andar… / é nunca contentar-se…» Recurso expressivo:", ["anáfora.", "aliteração.", "enumeração.", "hipérbato."], 0, "Repetição de «é» no início dos versos.")
  ]);

  const lt = (texto, enunciado, opcoes, certa, explicacao) => ({ tipo: "mc", texto: `<div class="prose"><p>${texto}</p></div>`, enunciado, opcoes, certa, explicacao });
  add("leitura", [
    lt("Durante anos, achei que ler devagar era sinal de pouca inteligência. Hoje sei que é o contrário: quem lê devagar volta atrás, sublinha, discorda. Ler depressa serve para encontrar informação; ler devagar serve para pensar com ela.", "A ideia principal do texto é que…", ["ler depressa é sempre preferível.", "a leitura lenta favorece a reflexão.", "só os inteligentes leem devagar.", "sublinhar é inútil."], 1, "O texto opõe encontrar informação a pensar com ela."),
    lt("Os jardins públicos são talvez a mais democrática das invenções urbanas. Ali, o reformado, a estudante e o turista partilham o mesmo banco, a mesma sombra e o mesmo silêncio, sem pagar bilhete.", "O autor valoriza os jardins públicos sobretudo porque…", ["são bonitos.", "são espaços de encontro igual para todos.", "atraem turistas.", "são silenciosos."], 1, "«democrática»: todos partilham o espaço em igualdade."),
    lt("Dizem que os jovens já não leem. Mas basta entrar numa livraria ao sábado para ver filas de adolescentes à procura do próximo volume de uma saga. Talvez não leiam o que os adultos gostariam; isso não quer dizer que não leiam.", "A estratégia argumentativa do autor consiste em…", ["confirmar uma opinião comum com estatísticas.", "contestar uma ideia feita com um exemplo do quotidiano.", "citar um especialista.", "fazer uma pergunta sem resposta."], 1, "Refuta «os jovens já não leem» com a cena da livraria."),
    lt("A cidade acordou devagar. Primeiro, o ruído dos elétricos; depois, o cheiro a pão quente; por fim, as vozes das vendedeiras, que enchiam a praça como um coro desafinado.", "No texto, predomina a sequência…", ["argumentativa.", "descritiva.", "explicativa.", "dialogal."], 1, "Descreve sensações e elementos da cidade."),
    lt("Os telemóveis prometeram aproximar-nos e, em parte, cumpriram. Falamos com quem está longe como se estivesse ao lado. O preço, contudo, é que muitas vezes estamos longe de quem está ao lado.", "O último período do texto exprime…", ["uma conclusão otimista.", "uma ressalva irónica ao que foi dito antes.", "um exemplo do que foi dito antes.", "uma pergunta retórica."], 1, "«contudo» introduz o lado negativo, com jogo de palavras (longe/ao lado)."),
    lt("Chamar «inútil» à poesia é, no fundo, um elogio. A poesia não serve para nada porque não está ao serviço de ninguém: existe para nos fazer ver o mundo pela primeira vez.", "Para o autor, a «inutilidade» da poesia é…", ["um defeito a corrigir.", "uma prova da sua liberdade.", "a razão por que ninguém a lê.", "um mito."], 1, "Não estar ao serviço de ninguém é ser livre."),
    lt("Em 1755, Lisboa foi destruída por um sismo, um maremoto e um incêndio. A reconstrução, dirigida pelo Marquês de Pombal, deu origem à Baixa que conhecemos, com ruas direitas e edifícios preparados para resistir a novos abalos.", "O texto tem uma intenção predominantemente…", ["persuasiva.", "informativa.", "expressiva.", "lúdica."], 1, "Relata factos históricos de forma objetiva."),
    lt("Há quem pense que errar é perder tempo. Eu diria que é investir: cada erro corrigido é uma lição que já não teremos de pagar outra vez, e geralmente com juros.", "A expressão «com juros» tem um sentido…", ["literal, ligado a bancos.", "figurado: os erros não corrigidos custam cada vez mais.", "irónico: errar não custa nada.", "hiperbólico: ninguém aprende com os erros."], 1, "Metáfora financeira: o erro repetido sai mais caro.")
  ]);

  add("correcao-linguistica", [
    mc("Qual das frases está correta?", ["Houveram muitos problemas no teste.", "Houve muitos problemas no teste.", "Haviam muitos problemas no teste.", "Houveram-se muitos problemas no teste."], 1, "«Haver» com sentido de «existir» é impessoal: fica sempre no singular."),
    mc("Qual das frases está correta?", ["Fazem dois anos que vivo aqui.", "Faz dois anos que vivo aqui.", "Fazem-se dois anos que vivo aqui.", "Fizeram dois anos que vivo aqui."], 1, "«Fazer» a indicar tempo decorrido é impessoal."),
    mc("Segundo o Acordo Ortográfico de 1990, escreve-se…", ["«há-de»", "«há de»", "«hade»", "«á de»"], 1, "O AO90 retirou o hífen às formas de «haver de»."),
    mc("Qual das frases está corretamente pontuada?", ["Os alunos do 12.º ano, estudaram muito.", "Os alunos do 12.º ano estudaram muito.", "Os alunos, do 12.º ano estudaram muito.", "Os alunos do 12.º ano estudaram, muito."], 1, "Não se separa o sujeito do predicado com vírgula."),
    mc("Qual das frases está correta?", ["Não lembro-me do nome dele.", "Não me lembro do nome dele.", "Não lembro-me-o.", "Não me lembro-me do nome dele."], 1, "A negação atrai o pronome para antes do verbo (próclise)."),
    mc("«Eles ____ o filme e depois ____ a casa.» (ver / vir, presente)", ["vêem … vêem", "veem … vêm", "vêm … veem", "veem … veem"], 1, "AO90: «eles veem» (ver) e «eles vêm» (vir)."),
    mc("Qual das frases está correta?", ["Se ele ver o teste, fica contente.", "Se ele vir o teste, fica contente.", "Se ele vier o teste, fica contente.", "Se ele vê-se o teste, fica contente."], 1, "Futuro do conjuntivo de «ver»: «vir»."),
    mc("Qual das frases está correta?", ["Fui eu que fiz o trabalho.", "Fui eu que fez o trabalho.", "Foi eu que fiz o trabalho.", "Foi eu que fez o trabalho."], 0, "O verbo concorda com «eu»: «fui… fiz».")
  ]);
})();
