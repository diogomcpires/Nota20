/* Nota20 · Obras que já saíram no exame além das obras de leitura obrigatória
   (outras obras dos mesmos autores). Cada ficha é inserida a seguir à obra do mesmo autor. */
window.N20 = window.N20 || { topics: [] };

(function () {
  const fichas = [
    { depoisDe: "frei-luis", t: {
      id: "viagens-minha-terra", grupo: "I", ano: "11.º", free: false, extra: true,
      titulo: "Viagens na Minha Terra",
      subtitulo: "Almeida Garrett · já saiu no exame (2021)",
      resumo: `
<p>Publicada em 1846, conta uma <span class="hl">viagem de Lisboa a Santarém</span>, feita pelo próprio Garrett em 1843. Mas a viagem é só o fio: o livro mistura relato, reflexão, crítica e uma novela sentimental.</p>
<h4>Duas narrativas</h4>
<p><strong>A viagem</strong>: o narrador sobe o Tejo e atravessa o Ribatejo, comentando tudo o que vê. <strong>A novela da «Menina dos Rouxinóis»</strong>, contada a meio da viagem: Joaninha vive no vale de Santarém com a avó, a cega D. Francisca, e é visitada por Frei Dinis. Ama o primo <strong>Carlos</strong>, oficial liberal, que regressa da guerra civil. Carlos amou também Georgina, em Inglaterra, e descobre que Frei Dinis é o seu pai. No fim, Joaninha enlouquece e morre, e Carlos torna-se «barão», isto é, um homem do dinheiro.</p>
<h4>O narrador</h4>
<p>É um narrador <strong>intruso e conversador</strong>: interrompe a história com <strong>digressões</strong>, dirige-se ao leitor e às «leitoras», brinca, ironiza e comenta a política e a sociedade.</p>
<h4>Temas</h4>
<p>O confronto entre <strong>liberalismo e absolutismo</strong>; a crítica aos <strong>«barões»</strong>, a nova classe materialista saída do liberalismo, por oposição aos «frades»; a decadência do país; o amor romântico, fatal e impossível; a <strong>valorização do nacional</strong> contra a imitação estrangeira.</p>`,
      pontos: [
        "Viagem real (Lisboa → Santarém, 1843) + novela da «Menina dos Rouxinóis».",
        "Narrador intruso: digressões, ironia, diálogo com o leitor e as leitoras.",
        "Carlos (liberal) e Joaninha; Frei Dinis é o pai de Carlos.",
        "Crítica aos «barões» (materialismo) e à imitação do estrangeiro.",
        "Romantismo: amor fatal, sentimento, cor local, valorização do nacional."
      ],
      noExame: "Em 2021 saiu um excerto (o retrato de um oficial e um comentário irónico do narrador às leitoras) comparado com Amor de Perdição: pediu-se uma característica do herói romântico comum às duas personagens.",
      exercicios: [
        { tipo: "mc", enunciado: "A estrutura de Viagens na Minha Terra caracteriza-se por…", opcoes: ["uma narrativa linear, contada por um narrador ausente.", "o cruzamento do relato de uma viagem com uma novela sentimental e muitas digressões.", "uma sequência de cartas trocadas entre Carlos e Joaninha.", "uma peça de teatro em três atos."], certa: 1, explicacao: "Viagem + novela da «Menina dos Rouxinóis» + digressões do narrador." },
        { tipo: "mc", enunciado: "Quando o narrador se dirige às «leitoras», está a…", opcoes: ["criar proximidade com o leitor, típica do narrador intruso romântico.", "mudar de narrador.", "citar uma personagem da novela.", "fazer uma descrição objetiva."], certa: 0, explicacao: "O narrador conversa com quem lê: é uma marca do narrador intruso." },
        { tipo: "aberta", enunciado: "Explica o que representam os «barões» na crítica social de Garrett.", cotacao: 13,
          resolucao: `<p>Os «barões» são a nova classe que enriqueceu com o liberalismo. Garrett critica-os por serem <strong>materialistas e interesseiros</strong>: trocaram os ideais da revolução liberal pelo dinheiro. Opõe-nos aos «frades», símbolo do Portugal antigo, e mostra que a mudança de regime não regenerou o país. O próprio Carlos, que lutou pela liberdade, acaba «barão», o que reforça a desilusão.</p>`,
          criterios: ["Barões: classe enriquecida com o liberalismo, materialista.", "Crítica à traição dos ideais / desilusão (Carlos acaba barão).", "Correção linguística."] }
      ] } },
    { depoisDe: "os-maias", t: {
      id: "ilustre-casa", grupo: "I", ano: "11.º", free: false, extra: true,
      titulo: "A Ilustre Casa de Ramires",
      subtitulo: "Eça de Queirós · já saiu no exame (2020)",
      resumo: `
<p>Romance publicado em 1900. O protagonista é <span class="hl">Gonçalo Mendes Ramires</span>, último descendente de uma das famílias mais antigas do reino, senhor da Torre de Santa Ireneia.</p>
<h4>Duas histórias em paralelo</h4>
<p>Gonçalo escreve uma <strong>novela histórica</strong>, «A Torre de D. Ramires», para a revista «Anais», do amigo José Lúcio Castanheiro. A novela narra os feitos heroicos de um antepassado medieval, <strong>Tructesindo Ramires</strong>. Ao mesmo tempo, conta-se a vida de Gonçalo no presente: um fidalgo <strong>bondoso mas fraco, indeciso e vaidoso</strong>, que adia tudo, quer ser deputado e chega a aliar-se a André Cavaleiro, o antigo rival que corteja a sua irmã Gracinha.</p>
<h4>O passado e o presente</h4>
<p>A coragem dos antepassados contrasta com a fraqueza de Gonçalo. Mas, num momento de reação, ele enfrenta com coragem um homem que o provocara, e no fim parte para África, de onde volta enriquecido. Na última página, um amigo diz que Gonçalo, com as suas qualidades e os seus defeitos, lhe lembra <strong>Portugal</strong>.</p>
<h4>Temas</h4>
<p>A <strong>identidade nacional</strong>: Gonçalo como símbolo do país; o passado heroico e o presente decadente; a crítica à política, ao caciquismo e à falta de iniciativa; o regresso a temas portugueses na fase final de Eça.</p>`,
      pontos: [
        "Gonçalo Mendes Ramires: fidalgo bondoso, fraco, indeciso e vaidoso.",
        "Romance dentro do romance: a novela histórica sobre Tructesindo Ramires.",
        "Contraste passado heroico / presente decadente.",
        "Final: Gonçalo comparado a Portugal (qualidades e defeitos).",
        "Castanheiro: entusiasta, quer ressuscitar o sentimento português (revista «Anais»)."
      ],
      noExame: "Em 2020 saiu um excerto (Castanheiro e Gonçalo no Rossio) comparado com um excerto de Os Maias: a ociosidade de Gonçalo, a crítica à procrastinação e à imitação do estrangeiro.",
      exercicios: [
        { tipo: "mc", enunciado: "Na obra, a novela histórica que Gonçalo escreve serve sobretudo para…", opcoes: ["mostrar que Gonçalo é um grande escritor.", "contrastar o heroísmo dos antepassados com a fraqueza do presente.", "relatar a viagem de Gonçalo a África.", "criticar a revista de Castanheiro."], certa: 1, explicacao: "O passado de Tructesindo é heroico; o presente de Gonçalo é hesitante." },
        { tipo: "mc", enunciado: "No final do romance, Gonçalo é comparado a…", opcoes: ["Tructesindo.", "André Cavaleiro.", "Portugal.", "Castanheiro."], certa: 2, explicacao: "As suas qualidades e defeitos são os do país." },
        { tipo: "aberta", enunciado: "Explica por que razão Gonçalo pode ser visto como um símbolo de Portugal.", cotacao: 13,
          resolucao: `<p>Gonçalo reúne <strong>qualidades e defeitos</strong> que o romance associa ao país: é bondoso, generoso e imaginativo, mas também fraco, indeciso, vaidoso e incapaz de levar até ao fim o que começa. Tal como Portugal, vive à sombra de um <strong>passado glorioso</strong> (os feitos dos Ramires) que contrasta com um presente sem iniciativa. A sua partida para África e o regresso enriquecido sugerem, ainda assim, a possibilidade de regeneração.</p>`,
          criterios: ["Qualidades e defeitos de Gonçalo associados ao país.", "Passado glorioso vs presente decadente; possibilidade de regeneração.", "Correção linguística."] }
      ] } },
    { depoisDe: "ilustre-casa", t: {
      id: "cidade-serras", grupo: "I", ano: "11.º", free: false, extra: true,
      titulo: "A Cidade e as Serras",
      subtitulo: "Eça de Queirós · já saiu no exame (2024, 2.ª fase)",
      resumo: `
<p>Romance publicado em 1901, depois da morte de Eça, desenvolvido a partir do conto «Civilização». É narrado por <strong>Zé Fernandes</strong>, amigo do protagonista.</p>
<h4>A cidade</h4>
<p><span class="hl">Jacinto</span>, rico e fidalgo, vive em Paris, no 202 dos Campos Elísios, rodeado de livros e das últimas invenções. Acredita que a felicidade vem do progresso e da civilização («suma ciência × suma potência = suma felicidade»). No entanto, a casa cheia de máquinas avaria, as coisas correm mal e Jacinto vive mergulhado no <strong>tédio</strong> e no pessimismo.</p>
<h4>As serras</h4>
<p>Uma viagem a <strong>Tormes</strong>, nas serras do Douro, muda tudo. Apesar de a bagagem se perder e de a casa estar degradada, Jacinto encanta-se com a natureza e com a comida simples. Recupera a alegria de viver, casa com Joaninha, prima de Zé Fernandes, e passa a cuidar dos trabalhadores das suas terras.</p>
<h4>Temas</h4>
<p>A <strong>oposição cidade/campo</strong>; a crítica ao excesso de civilização e de técnica, que não traz felicidade; a <strong>idealização do campo</strong> português; a ironia e o humor de Eça.</p>`,
      pontos: [
        "Narrador: Zé Fernandes (participante, amigo de Jacinto).",
        "Paris (202): técnica, luxo, tédio. Tormes: natureza, simplicidade, regeneração.",
        "Crítica ao progresso como receita de felicidade.",
        "Idealização do campo português (fase final de Eça).",
        "Ironia e humor nas avarias e excessos da «civilização»."
      ],
      noExame: "Em 2024 (2.ª fase), saiu um excerto deste romance no Grupo I, Parte A. Se sair Eça, prepara a oposição cidade/campo e a crítica social.",
      exercicios: [
        { tipo: "mc", enunciado: "Em Paris, apesar de todo o conforto e tecnologia, Jacinto vive…", opcoes: ["feliz e realizado.", "no tédio e no pessimismo.", "na pobreza.", "preocupado com os trabalhadores de Tormes."], certa: 1, explicacao: "A civilização não lhe traz felicidade: é a ironia central do romance." },
        { tipo: "mc", enunciado: "O narrador de A Cidade e as Serras é…", opcoes: ["Jacinto.", "um narrador ausente da história.", "Zé Fernandes, amigo de Jacinto.", "Joaninha."], certa: 2, explicacao: "Narrador participante, que observa Jacinto de perto." },
        { tipo: "aberta", enunciado: "Explica a oposição entre a cidade e as serras no romance.", cotacao: 13,
          resolucao: `<p>A <strong>cidade</strong> (Paris) representa a civilização, o progresso técnico e o luxo, mas também o artificialismo, as avarias e o <strong>tédio</strong> de Jacinto. As <strong>serras</strong> (Tormes) representam a natureza, a simplicidade e a autenticidade: aí Jacinto recupera a saúde, a alegria e um sentido para a vida. O romance critica assim a crença de que a técnica traz felicidade e idealiza o campo português.</p>`,
          criterios: ["Cidade: civilização, técnica, artificialismo, tédio.", "Serras: natureza, simplicidade, regeneração.", "Correção linguística."] }
      ] } }
  ];
  fichas.forEach(({ depoisDe, t }) => {
    const i = N20.topics.findIndex((x) => x.id === depoisDe);
    if (i >= 0) N20.topics.splice(i + 1, 0, t); else N20.topics.push(t);
  });
})();
