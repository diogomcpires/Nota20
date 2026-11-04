/* Nota20 · Português 639 — Exames nacionais resolvidos
   Os enunciados oficiais são do IAVE. Aqui parafraseamos os itens e apresentamos
   propostas de resolução próprias, com base nos critérios oficiais publicados. */
window.N20 = window.N20 || { topics: [] };

N20.exames = [
{
  id: "exame-2026-f1",
  ano: 2026, fase: "1.ª fase", versao: "Versão 2", free: false,
  titulo: "Exame Nacional 2026 · 1.ª fase",
  temas: ["Saramago (Memorial e Ricardo Reis)", "Cesário Verde", "«Paisagem sonora»", "Apreciação crítica de cartoon"],
  links: {
    enunciado: "https://eduqa.pt/wp-content/uploads/2026/06/portugues_prova_639_enunciado.pdf",
    criterios: "https://eduqa.pt/wp-content/uploads/2026/07/portugues_prova_639_cc.pdf"
  },
  nota: "Resolução da Versão 2. Os textos de Saramago, o artigo do Grupo II e o cartoon estão protegidos por direitos de autor: abre o enunciado oficial ao lado para os leres.",
  grupos: [
    {
      nome: "Grupo I · Educação Literária",
      partes: [
        {
          nome: "Parte A · Saramago: Memorial do Convento e O Ano da Morte de Ricardo Reis",
          intro: "Dois excertos: Baltasar Sete-Sóis no mercado do peixe da Ribeira (Memorial) e Ricardo Reis a percorrer a Baixa e a Praça da Figueira (O Ano da Morte de Ricardo Reis).",
          itens: [
            {
              n: "1", topico: "saramago", obrigatorio: true, tipo: "aberta",
              enunciado: "Explica o dilema de Baltasar no primeiro parágrafo do excerto do Memorial, tendo em conta a sua condição física e a sua situação económica.",
              resolucao: `<p>Baltasar vive um dilema porque não tem como sobreviver. Por um lado, a sua <strong>condição física</strong> impede-o de regressar ao trabalho do campo em Mafra: tendo perdido a mão na guerra, não pode «pegar numa enxada». Por outro lado, a sua <strong>situação económica</strong> é precária, e a alternativa seria pedir esmola no paço «por conta do sangue perdido» ao serviço do rei; contudo, essa solução exige uma longa espera e a intercessão de padrinhos que ele não tem. Fica, assim, preso entre duas saídas impossíveis.</p>`,
              criterios: ["Condição física: sem a mão, não pode trabalhar a terra («pegar numa enxada»).", "Situação económica: poderia pedir esmola ao paço pelo sangue perdido, mas isso implica espera e padrinhos.", "Correção linguística (3 pts)."]
            },
            {
              n: "2", topico: "saramago", obrigatorio: true, tipo: "aberta",
              enunciado: "Compara o mercado do peixe (Memorial) com o mercado da Praça da Figueira (Ricardo Reis), a partir de duas sensações distintas captadas em cada ambiente.",
              resolucao: `<p>Os dois mercados aproximam-se pelas sensações que despertam. No plano <strong>auditivo</strong>, ambos são espaços ruidosos: no mercado do peixe ouvem-se os pregões e gritos das vendedeiras, enquanto na Praça da Figueira se ouvem os sons da lavagem e um arrastar metálico. No plano <strong>olfativo</strong>, ambos são marcados por cheiros intensos: no primeiro domina o cheiro a peixe; no segundo, o cheiro a hortaliça apodrecida, a excrementos, a sangue e a penas. Em ambos se mistura, além disso, a azáfama e a sujidade, o que dá uma imagem viva e realista da Lisboa popular.</p>`,
              criterios: ["Duas sensações distintas (auditiva, olfativa ou visual).", "Comparação dos dois mercados em cada sensação.", "Correção linguística."]
            },
            {
              n: "3", topico: "saramago", obrigatorio: false, tipo: "completar",
              enunciado: "Completa o texto escolhendo a opção adequada para cada espaço.",
              sub: [
                { label: "a) Entre «Ricardo Reis rodeou a praça» e «sombra e humidade», o narrador apresenta a visão de Lisboa de Ricardo Reis, realçando a ideia de…", opcoes: ["monotonia («fileiras de janelas à mesma altura», «igual de cor, de janelas e de grades»)", "abertura («prolongando-se pelo enfiamento da rua»)", "monumentalidade («altas frontarias»)"], certa: 0 },
                { label: "b) Entre «como não» e «valido a pena», prevalece a voz subjetiva do narrador, que reflete sobre…", opcoes: ["a oposição entre o espaço social e o espaço físico de Lisboa", "a vivência psicológica do tempo e o efeito do ambiente urbano no estado físico e emocional dos habitantes", "o modo como o espaço físico afeta o estado de espírito de Ricardo Reis"], certa: 1 }
              ],
              explicacao: "Versão 2: a) 1; b) 2 (segundo os critérios oficiais). Na Versão 1, a ordem das opções muda: a) 2; b) 1."
            }
          ]
        },
        {
          nome: "Parte B · Cesário Verde, «O Sentimento dum Ocidental»",
          intro: "Cinco estrofes da primeira parte do poema, com a Lisboa do anoitecer, os hotéis, os bairros pobres e as varinas.",
          itens: [
            {
              n: "4", topico: "cesario", obrigatorio: true, tipo: "aberta",
              enunciado: "Refere duas situações observadas pelo sujeito poético, uma sobre Lisboa e outra sobre os tipos sociais, que evidenciam contrastes.",
              resolucao: `<p>Quanto à <strong>cidade</strong>, o sujeito contrasta a riqueza dos hotéis cosmopolitas, que «Flamejam» com luz e luxo, com a miséria dos bairros onde as varinas se «apinham», em casas associadas ao que é «podre» e a «focos de infeção». Quanto aos <strong>tipos sociais</strong>, opõe a vida confortável de dentistas, lojistas e famílias burguesas à vida dura das varinas, que trabalham descalças «Desde manhã à noite».</p>`,
              criterios: ["Contraste na cidade: hotéis luxuosos vs. bairros miseráveis.", "Contraste nos tipos sociais: burgueses/profissionais vs. varinas.", "Correção linguística."]
            },
            {
              n: "5", topico: "cesario", obrigatorio: true, tipo: "aberta",
              enunciado: "Explica dois sentimentos do sujeito poético em relação às varinas, fundamentando cada um com um recurso expressivo e uma citação.",
              resolucao: `<p>O sujeito poético revela, em primeiro lugar, <strong>compaixão e indignação</strong> perante a vida dura das varinas. A exclamação «Descalças!» sublinha a sua pobreza e o seu sofrimento, e a metáfora dos filhos que «naufragam nas tormentas» evoca a desgraça que as atinge. Em segundo lugar, mostra <strong>admiração</strong> pela sua força e vitalidade: a metáfora «cardume negro» transmite o movimento coletivo e enérgico das varinas, reforçado por adjetivos como «hercúleas» e «varonis» e pela comparação com «pilastras», que sugere solidez e resistência.</p>`,
              criterios: ["Sentimento 1 (compaixão/indignação) + recurso + citação.", "Sentimento 2 (admiração) + recurso + citação.", "Correção linguística."]
            },
            {
              n: "6", topico: "cesario", obrigatorio: false, tipo: "multi",
              enunciado: "Identifica as três afirmações sobre a poesia de Cesário Verde que se verificam nas cinco estrofes.",
              opcoes: [
                "I. Critica a desigualdade social e as condições degradantes em que vive o povo.",
                "II. Recorda, com saudade e dor, a época gloriosa da expansão marítima.",
                "III. O sujeito descreve a realidade que observa e constrói a partir dela as suas reflexões.",
                "IV. A linguagem impressionista evidencia-se na valorização da cor, da luz e do movimento.",
                "V. A cidade é vista como espaço fechado e opressivo, por contraste com a liberdade do campo."
              ],
              certas: [0, 2, 3],
              explicacao: "Versão 2: I, III e IV. A II não se verifica nestas estrofes, e a V refere o campo, que não aparece no excerto, embora seja um tema de Cesário noutros poemas."
            }
          ]
        },
        {
          nome: "Parte C · Exposição",
          itens: [
            {
              n: "7", topico: "saramago", obrigatorio: true, tipo: "aberta",
              enunciado: "Mostra, numa breve exposição, que Saramago denuncia as condições de vida do povo em Memorial do Convento ou em O Ano da Morte de Ricardo Reis. Inclui introdução, desenvolvimento com duas situações e conclusão.",
              resolucao: `<p><strong>Memorial do Convento</strong></p><p>Em <em>Memorial do Convento</em>, José Saramago dá voz aos anónimos que a História oficial esquece, denunciando as duras condições de vida do povo no reinado de D. João V.</p><p>Em primeiro lugar, a construção do convento de Mafra, fruto de uma promessa do rei, obriga milhares de homens de todo o país a trabalhar na obra, muitos recrutados à força e levados presos. Vivem em barracões precários, como os da chamada Ilha da Madeira, e trabalham sem descanso. Em segundo lugar, o episódio do transporte da enorme pedra destinada à varanda da basílica revela um esforço sobre-humano, mal recompensado e perigoso, que provoca feridos e mortos, enquanto a corte vive no luxo.</p><p>Deste modo, o romance transforma os trabalhadores no verdadeiro herói coletivo da obra e critica a vaidade de um poder indiferente ao sofrimento humano.</p><p class="muted"><strong>Alternativa — O Ano da Morte de Ricardo Reis</strong>: a miséria visível no bodo distribuído pelo jornal <em>O Século</em>; a vigilância da PVDE e o interrogatório de Ricardo Reis; a censura e as notícias manipuladas; a revolta dos marinheiros, em que morre o irmão de Lídia.</p>`,
              criterios: ["Introdução sobre o tema.", "Duas situações de denúncia, cada uma com exemplo significativo.", "Conclusão adequada.", "Conteúdo 8 + estruturação 3 + correção 2."]
            }
          ]
        }
      ]
    },
    {
      nome: "Grupo II · Leitura e Gramática",
      partes: [
        {
          nome: "Miguel Marcelino, «Paisagem sonora», Público (2025)",
          intro: "O autor defende que cada cidade tem uma «paisagem sonora» própria (edifícios, ruas, pessoas, sinos, chamamentos), um património frágil ameaçado pelo trânsito, pelos aviões e pela música amplificada, que merece ser protegido.",
          itens: [
            { n: "1", topico: "leitura", obrigatorio: true, tipo: "mc", enunciado: "Nos dois primeiros parágrafos, o autor pretende…", opcoes: ["salientar a importância da notação musical na uniformização das interpretações.", "estabelecer uma analogia entre a música e os sons característicos de cada cidade ou bairro.", "sublinhar a importância da música e da sua história na vida dos bairros.", "explicar o valor das gravações do ruído urbano com base na notação musical."], certa: 1, explicacao: "O autor parte da história da música para aproximar a música dos sons próprios de cada cidade: é uma analogia." },
            { n: "2", topico: "recursos-expressivos", obrigatorio: true, tipo: "mc", enunciado: "A expressão «paisagem sonora» evidencia o uso de…", opcoes: ["metonímia", "aliteração", "sinestesia, para descrever as experiências sensoriais simultâneas que a cidade proporciona", "hipérbole"], certa: 2, explicacao: "«Paisagem» (visual) + «sonora» (auditivo) = sinestesia." },
            { n: "3", topico: "leitura", obrigatorio: false, tipo: "mc", enunciado: "Entre as linhas 10 e 34, o autor descreve vários ambientes para…", opcoes: ["mostrar que a acústica das cidades resulta da arquitetura dos espaços e do seu uso, criando experiências diferentes.", "refutar que as cidades barulhentas se tornam irresistíveis.", "mostrar que as cidades funcionam como instrumentos independentemente da estrutura urbana.", "ilustrar a suavidade dos sons que invadem os espaços urbanos."], certa: 0, explicacao: "Os exemplos servem para provar que a forma da cidade e o seu uso determinam o som." },
            { n: "4", topico: "leitura", obrigatorio: false, tipo: "mc", enunciado: "Na conclusão, o autor defende que…", opcoes: ["as cidades futuras terão melhor qualidade acústica.", "é essencial reduzir as massas construídas.", "os obstáculos à proteção das paisagens sonoras vão desaparecer.", "a paisagem sonora merece maior atenção, para que se criem condições para a fruir plenamente."], certa: 3, explicacao: "A conclusão é um apelo à valorização e proteção da paisagem sonora." },
            { n: "5", topico: "coesao", obrigatorio: false, tipo: "mc", enunciado: "Entre as linhas 6 e 22, a coesão lexical e a coesão gramatical referencial são asseguradas, respetivamente, por…", opcoes: ["pronominalização e predomínio do presente do indicativo.", "vocabulário dos campos lexicais de «música» e «cidade» e as palavras «cujos» e «onde».", "pronominalização e as palavras «cujos» e «onde».", "campos lexicais e predomínio do presente do indicativo."], certa: 1, explicacao: "Coesão lexical = vocabulário relacionado (campos lexicais). Coesão referencial = relativos «cujos» e «onde», que retomam antecedentes." },
            { n: "6", topico: "leitura", obrigatorio: true, tipo: "mc", enunciado: "A palavra «como» associa-se à ideia de exemplificação e à de comparação, respetivamente, em…", opcoes: ["«como numa fuga» e «como as cidades»", "«Como resistir» e «como Lisboa»", "«como Veneza» e «como numa fuga»", "«como Lisboa» e «como Veneza»"], certa: 2, explicacao: "«como Veneza» dá um exemplo de cidade; «como numa fuga» estabelece uma comparação com a forma musical." },
            { n: "7", topico: "funcoes-sintaticas", obrigatorio: true, tipo: "mc", enunciado: "Todas as expressões são complemento agente da passiva, exceto…", opcoes: ["«pelo automóvel ou pelo avião»", "«pelo urbanismo tradicional de edifícios contínuos»", "«pelas inúmeras embarcações»", "«pela Ásia»"], certa: 3, explicacao: "«pela Ásia» indica lugar (por onde algo se espalha), não quem pratica a ação." }
          ]
        }
      ]
    },
    {
      nome: "Grupo III · Escrita",
      partes: [
        {
          nome: "Apreciação crítica de um cartoon (200 a 350 palavras)",
          itens: [
            {
              n: "III", topico: "apreciacao-critica", obrigatorio: true, tipo: "texto", cotacao: 44, generoAlvo: "apreciação crítica",
              enunciado: "Escreve uma apreciação crítica do cartoon de Javad Takjoo (ver enunciado oficial): descrição dos elementos significativos, comentário crítico com pelo menos três aspetos e conclusão.",
              resolucao: `<p>O cartoon só existe no enunciado oficial, por isso deixamos aqui o <strong>plano que garante a cotação máxima no parâmetro A</strong>:</p><ol><li><strong>Descrição</strong> (1 parágrafo): o que se vê, onde, em que posição; elementos em destaque; cores/contrastes; legenda, se houver.</li><li><strong>Aspeto 1</strong>: a mensagem central (o que critica/denuncia).</li><li><strong>Aspeto 2</strong>: os recursos visuais (símbolo, exagero, ironia, contraste) e a sua eficácia.</li><li><strong>Aspeto 3</strong>: a atualidade/pertinência e o efeito no leitor.</li><li><strong>Conclusão</strong>: juízo global coerente.</li></ol><p>Usa discurso valorativo («de forma contundente», «uma imagem perspicaz», «ironicamente») e mantém-te entre 200 e 350 palavras.</p>`,
              criterios: ["A (10): descrição + ≥3 aspetos + conclusão.", "B (10): informação pertinente, argumentação eficaz.", "C (10): organização e coesão.", "CL (14): correção linguística."]
            }
          ]
        }
      ]
    }
  ]
},
{
  id: "exame-2025-f1",
  ano: 2025, fase: "1.ª fase", versao: "Versão 1", free: true,
  titulo: "Exame Nacional 2025 · 1.ª fase",
  temas: ["Os Lusíadas, canto IV", "Mensagem: «D. Fernando, Infante de Portugal»", "Discurso de Tolentino Mendonça", "Texto de opinião"],
  links: {
    enunciado: "https://www.examesnacionais.com.pt/exames-nacionais/12ano/2025-1fase/Portugues_639.pdf",
    criterios: "https://iave.pt/wp-content/uploads/2025/06/EX-Port639-F1-2025-CC-VD_net.pdf"
  },
  nota: "Resolução da Versão 1. O excerto de Os Lusíadas está no enunciado oficial. O discurso do Grupo II está protegido por direitos de autor.",
  grupos: [
    {
      nome: "Grupo I · Educação Literária",
      partes: [
        {
          nome: "Parte A · Os Lusíadas, canto IV, estâncias 51-53",
          intro: "O narrador refere o reinado de D. Duarte e o sacrifício do Infante D. Fernando, cativo em Fez, comparando-o aos heróis da Antiguidade.",
          itens: [
            {
              n: "1", topico: "lusiadas", obrigatorio: true, tipo: "aberta",
              enunciado: "Apresenta a perspetiva do narrador sobre o reinado de D. Duarte, considerando duas ideias da estância 51.",
              resolucao: `<p>O narrador apresenta o reinado de D. Duarte como um tempo <strong>infeliz e instável</strong>. Em primeiro lugar, reflete sobre a <strong>alternância</strong> entre momentos de felicidade e de infelicidade na vida humana, sublinhando a <strong>inconstância da Fortuna</strong>, visível no contraste entre o «tempo iroso» e o «estado deleitoso». Em segundo lugar, aplica essa reflexão ao caso concreto, mostrando que essa instabilidade se fez sentir «neste Reino e neste Rei», isto é, no reinado de D. Duarte, marcado por desgraças.</p>`,
              criterios: ["Alternância felicidade/infelicidade.", "Inconstância da Fortuna («tempo iroso» / «estado deleitoso»).", "Instabilidade do reinado («neste Reino e neste Rei»). Duas ideias bastam."]
            },
            {
              n: "2", topico: "lusiadas", obrigatorio: true, tipo: "aberta",
              enunciado: "Explicita duas características de D. Fernando, fundamentando com as estâncias 52 e 53.",
              resolucao: `<p>D. Fernando revela, antes de mais, <strong>abnegação e patriotismo</strong>: aceita ficar cativo, sacrificando a sua liberdade e a própria vida, para que Portugal não tenha de entregar Ceuta, colocando o bem da pátria acima do seu. Revela também uma <strong>grandeza moral quase santa</strong>: o narrador considera o seu sacrifício superior ao dos heróis da Antiguidade, como Codro, Cúrcio e os Décios, que deram a vida pela pátria, o que o eleva à condição de mártir.</p>`,
              criterios: ["Abnegação / sacrifício pelo bem da nação.", "Patriotismo, lealdade, nobreza de carácter, devoção (santidade/martírio superior aos heróis antigos).", "Correção linguística."]
            },
            {
              n: "3", topico: "lusiadas", obrigatorio: false, tipo: "completar",
              enunciado: "Completa as afirmações sobre a estância 53.",
              sub: [
                { label: "a) Na estância 53, o narrador recorre à…", opcoes: ["apóstrofe", "sinestesia", "enumeração"], certa: 2 },
                { label: "b) …para…", opcoes: ["colocar os feitos dos heróis da Antiguidade acima dos de D. Fernando", "sublinhar o caráter extraordinário dos atos do Infante", "mostrar que os feitos dos heróis evidenciam a brevidade da vida"], certa: 1 }
              ],
              explicacao: "A enumeração de heróis antigos (Codro, Cúrcio, os Décios) serve para mostrar que o sacrifício de D. Fernando os supera."
            }
          ]
        },
        {
          nome: "Parte B · Fernando Pessoa, «D. Fernando, Infante de Portugal» (Mensagem)",
          texto: `<div class="poem">Deu-me Deus o seu gládio, porque eu faça<br>A sua santa guerra.<br>Sagrou-me seu em honra e em desgraça,<br>Às horas em que um frio vento passa<br>Por sobre a fria terra.<br><br>Pôs-me as mãos sobre os ombros e doirou-me<br>A fronte com o olhar;<br>E esta febre de Além, que me consome,<br>E este querer grandeza são seu nome<br>Dentro em mim a vibrar.<br><br>E eu vou, e a luz do gládio erguido dá<br>Em minha face calma.<br>Cheio de Deus, não temo o que virá,<br>Pois, venha o que vier, nunca será<br>Maior do que a minha alma.</div>`,
          itens: [
            {
              n: "4", topico: "mensagem", obrigatorio: true, tipo: "aberta",
              enunciado: "Explica de que modo as ações de Deus fazem do sujeito poético um instrumento da vontade divina. Começa por referir essas ações.",
              resolucao: `<p>Deus <strong>dá-lhe o seu gládio</strong> («Deu-me Deus o seu gládio»), <strong>sagra-o</strong> («Sagrou-me seu»), <strong>põe-lhe as mãos sobre os ombros</strong> e <strong>doira-lhe a fronte com o olhar</strong>. Estes gestos de investidura e bênção transmitem-lhe força e escolhem-no: o sujeito torna-se um <strong>eleito</strong>, armado para fazer «A sua santa guerra». Deste modo, a sua ação deixa de ser apenas humana e passa a cumprir uma missão sagrada, sendo ele o instrumento através do qual a vontade de Deus se realiza.</p>`,
              criterios: ["Refere as ações de Deus (gládio, sagração, mãos nos ombros, olhar que doira).", "Explica a eleição para a «santa guerra» / missão sagrada.", "Correção linguística."]
            },
            {
              n: "5", topico: "mensagem", obrigatorio: true, tipo: "aberta",
              enunciado: "Descreve o estado de espírito do sujeito poético perante a vontade divina (versos 8 a 15), com base em dois aspetos.",
              resolucao: `<p>O sujeito revela, por um lado, uma <strong>inquietação ambiciosa</strong>: sente uma «febre de Além» que o «consome» e um «querer grandeza», sinais de que interiorizou a missão divina. Por outro lado, mostra <strong>determinação e serenidade</strong>: avança («E eu vou») com a «face calma» e, «Cheio de Deus», afirma não temer o futuro, porque nada poderá ser «Maior do que a minha alma». A coragem nasce da certeza de cumprir a vontade de Deus.</p>`,
              criterios: ["Consciência do destino / ambição («febre de Além», «querer grandeza»).", "Determinação, serenidade, coragem («E eu vou», «face calma», «não temo»).", "Dois aspetos bem desenvolvidos."]
            },
            {
              n: "6", topico: "mensagem", obrigatorio: false, tipo: "multi",
              enunciado: "Identifica as três afirmações que se verificam no poema.",
              opcoes: [
                "A. O sebastianismo é tema central do poema.",
                "B. Destaca-se a mitificação de figuras históricas, sobretudo na primeira parte da obra.",
                "C. A força espiritual dos heróis leva-os a agir independentemente do esforço exigido.",
                "D. O poema apela a outros portugueses para que continuem a ambição do sujeito.",
                "E. Os poemas são geralmente breves e valorizam o ritmo e a rima."
              ],
              certas: [1, 2, 4],
              explicacao: "Versão 1: B, C e E. O poema não trata o sebastianismo (A) nem faz apelo a outros (D)."
            }
          ]
        },
        {
          nome: "Parte C · Exposição",
          itens: [
            {
              n: "7", topico: "exposicao", obrigatorio: true, tipo: "aberta",
              enunciado: "Escreve uma breve exposição em que distingas os textos das Partes A e B pela predominância de traços líricos ou épicos (introdução, desenvolvimento com um traço de cada, citações, conclusão).",
              resolucao: `<p>Os textos das Partes A e B evocam a mesma figura histórica, o Infante D. Fernando, mas de forma distinta: o excerto de <em>Os Lusíadas</em> tem traços predominantemente <strong>épicos</strong>, ao passo que o poema da <em>Mensagem</em> tem traços predominantemente <strong>líricos</strong>.</p><p>No texto de Camões, um traço épico é a <strong>narração na terceira pessoa</strong> de factos da história de Portugal, que exalta o sacrifício de D. Fernando e o compara aos grandes heróis da Antiguidade. No poema de Pessoa, pelo contrário, domina a <strong>subjetividade da primeira pessoa</strong>: é o próprio Infante que exprime o que sente, como em «E esta febre de Além, que me consome», revelando a sua interioridade e o espírito de missão.</p><p>Em suma, Camões narra o feito heroico de fora, enquanto Pessoa o vive de dentro, transformando a história em experiência lírica.</p>`,
              criterios: ["Introdução: identifica a obra épica e a obra lírica.", "Traço épico (narração na 3.ª pessoa, história de Portugal, exaltação do herói) com citação.", "Traço lírico (1.ª pessoa, sentimentos, espírito de missão) com citação.", "Conclusão; estruturação (3) e correção (2)."]
            }
          ]
        }
      ]
    },
    {
      nome: "Grupo II · Leitura e Gramática",
      partes: [
        {
          nome: "José Tolentino Mendonça, «O que é amar um País» (discurso do 10 de Junho de 2020)",
          intro: "O orador defende que cada português, onde quer que viva, é uma expressão do país e o constrói com a sua ação. Apresenta Camões e a poesia como guias de autoconhecimento e define «desconfinar» como participar criativamente na comunidade e ousar sonhar.",
          itens: [
            { n: "1", topico: "leitura", obrigatorio: true, tipo: "mc", enunciado: "Na primeira parte, o orador dirige-se «às mulheres e aos homens» do seu país porque estes…", opcoes: ["formam a pátria ocupando todo o território.", "alargam as fronteiras através das relações com o território vizinho.", "são as «raízes» de Portugal e preservam as tradições.", "constroem a sociedade como um todo através da sua ação individual."], certa: 3, explicacao: "O orador refere os que «dia a dia o constroem»: cada um contribui para o todo." },
            { n: "2", topico: "leitura", obrigatorio: false, tipo: "mc", enunciado: "No segundo parágrafo, a poesia é vista como…", opcoes: ["um legado que nos dispensa de conhecer o Portugal do século XVI.", "tendo uma capacidade extraordinária de despertar o questionamento e a descoberta de si e do mundo.", "um legado que continua a guiar viagens por mar e terra.", "capaz de despertar o marinheiro que há em cada português."], certa: 1, explicacao: "A poesia é um «guia» de autoconhecimento: leva-nos a interrogar e a descobrir." },
            { n: "3", topico: "leitura", obrigatorio: true, tipo: "mc", enunciado: "Quando afirma que Camões «desconfinou» Portugal, o autor associa o «desconfinamento» a ideias como…", opcoes: ["independência e liderança política.", "bem-estar e satisfação pessoal.", "ousadia e responsabilidade social.", "conformismo e poder individual."], certa: 2, explicacao: "Desconfinar = ser protagonista, participar de forma criativa na comunidade e sonhar em grande: ousadia + responsabilidade." },
            { n: "4", topico: "deixis", obrigatorio: true, tipo: "mc", enunciado: "A única frase com deíticos pessoais e temporais é…", opcoes: ["«Desconfinar é sentir-se protagonista…»", "«Cada português é uma expressão de Portugal…»", "«É nessa condição […] que hoje me dirijo…»", "«A quem tivesse dúvidas…»"], certa: 2, explicacao: "«me» (1.ª pessoa = deítico pessoal) e «hoje» (deítico temporal)." },
            { n: "5", topico: "oracoes", obrigatorio: false, tipo: "mc", enunciado: "A única oração subordinada substantiva completiva é…", opcoes: ["«que dia a dia o constroem»", "«que ela não viveria sem as raízes»", "«que fazemos da vida»", "«que nos definem como indivíduos e como nação»"], certa: 1, explicacao: "As outras retomam um antecedente (são relativas). «que ela não viveria sem as raízes» completa um verbo/nome e equivale a «isso»." },
            { n: "6", topico: "funcoes-sintaticas", obrigatorio: false, tipo: "mc", enunciado: "Todas as expressões são complemento do nome, exceto…", opcoes: ["«de forma criativa»", "«de Camões»", "«de nós mesmos»", "«de Portugal»"], certa: 0, explicacao: "«de forma criativa» indica o modo de uma ação: é modificador (do grupo verbal), não completa um nome." },
            { n: "7", topico: "aspeto-modalidade", obrigatorio: true, tipo: "mc", enunciado: "A frase «A poesia é um guia náutico perpétuo» exprime…", opcoes: ["aspeto perfetivo.", "situação habitual.", "aspeto imperfetivo.", "situação genérica."], certa: 3, explicacao: "Afirma uma verdade geral, intemporal, sobre a poesia: valor genérico." }
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
              n: "III", topico: "texto-opiniao", obrigatorio: true, tipo: "texto", cotacao: 44, generoAlvo: "texto de opinião",
              enunciado: "«Para uns, é o indivíduo que faz a sociedade; para outros, é a sociedade que faz o indivíduo.» Escreve um texto de opinião defendendo uma posição com dois argumentos, cada um com um exemplo, e uma conclusão.",
              resolucao: `<p><em>Texto-modelo (237 palavras)</em></p>
<p>Há quem acredite que cada pessoa molda o mundo à sua volta e quem defenda que somos apenas o reflexo do meio em que crescemos. Na minha perspetiva, a sociedade forma-nos, mas é o indivíduo que, ao agir, a transforma.</p>
<p>Em primeiro lugar, é inegável que a sociedade nos faz. A língua que falamos, os valores que aprendemos na família e na escola e até os nossos gostos resultam do contexto em que vivemos. Um jovem que cresce num bairro sem bibliotecas nem oportunidades terá, em regra, um percurso mais difícil do que outro que cresce rodeado de livros e de apoio. Ignorar esta influência seria injusto e ingénuo.</p>
<p>Contudo, a História mostra que os indivíduos também fazem a sociedade. Aristides de Sousa Mendes, cônsul em Bordéus, desobedeceu às ordens do governo e passou vistos a milhares de refugiados em 1940, salvando vidas e deixando um exemplo moral que ainda hoje nos interpela. Do mesmo modo, quando uma única aluna decide organizar uma recolha de alimentos na escola, acaba muitas vezes por mobilizar toda a comunidade. Estes gestos provam que a vontade individual pode romper o que parecia inevitável.</p>
<p>Em suma, considero que a relação entre indivíduo e sociedade é de influência mútua: a sociedade dá-nos o ponto de partida, mas somos nós que escolhemos o caminho. Por isso, cabe a cada um assumir a responsabilidade de deixar o mundo um pouco melhor do que o encontrou.</p>`,
              criterios: ["A: ponto de vista claro, 2 argumentos com exemplos, juízos de valor, conclusão.", "B: pertinência e variedade da informação; sem desvios.", "C: organização e coesão.", "CL: correção linguística (14 pts)."]
            }
          ]
        }
      ]
    }
  ]
}
];
