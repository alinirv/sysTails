const legancyMap = [
  {
    nome: "Alraunes",
    aparencia: "São seres feitos de plantas cuja aparência reflete suas vontades, experiências e influências, possuindo muita diversificação mesmo sendo da mesma espécie.",
    habilidades: [
      {
        nome: "Filhos de Darnawel",
        descricao: "O seu corpo é feito de plantas e vinhas, não precisando se alimentar, precisando apenas de água para sobreviver. Além disso, você pode criar pequenos efeitos inofensivos que tenham ligação com a natureza, possui Resistência Mágica (Natureza) e não é afetado por Envenenado."
      },
      {
        nome: "Essência Revigorante",
        descricao: "Uma vez por rodada, ao receber uma regeneração de Pontos de Vida, você aumentará a regeneração em um valor igual a ½ dos seus Pontos de Energia Máximos."
      }
    ]
  },
  {
    nome: "Elfos",
    aparencia: "São seres estudiosos, rostos afinados, longas e pontudas orelhas e uma beleza invejável.",
    habilidades: [
      {
        nome: "Sabedoria Antiga",
        descricao: "Você inicia com +3 pontos para serem distribuídos nos seus conhecimentos. O limite máximo inicial ainda se mantém o mesmo. Além disso, com uma ação simples você passa a compreender um idioma sendo falado até 10 metros, além de conseguir falar este mesmo idioma."
      },
      {
        nome: "Pensamento Célere",
        descricao: "Caso você falhe em um teste de Parâmetro, você receberá +1 no seu próximo teste de Parâmetro."
      }
    ]
  },
  {
    nome: "Minotauros",
    aparencia: "São seres robustos e perseverantes como touros humanoides, possuem um par de chifres, caudas bovinas e cascos ao invés de pés.",
    habilidades: [
      {
        nome: "Nômade",
        descricao: "Você nunca esquece o caminho de trilhas, estradas ou ruínas que já percorreu. Além disso, ao utilizar uma Corrida você utilizará esta Movimentação com o seu total de metros, ao invés da metade. Você se torna imune à Lentidão e ao Terreno Difícil."
      },
      {
        nome: "Visão Etérea",
        descricao: "Com uma Ação Simples você se conecta a um pequeno local que já tenha visitado, podendo enxergar tudo neste local por 10 minutos. Esta habilidade só pode ser utilizada novamente após concluir um Repouso."
      }
    ]
  },
  {
    nome: "Netunes",
    aparencia: "São seres que possuem finas e pequenas escamas com cores vivas e vibrantes, guelras em seus pescoços e barbatanas em suas panturrilhas e antebraços. Dentro de rios, lagos ou mares, adaptam suas pernas em uma longa e elegante cauda.",
    habilidades: [
      {
        nome: "Adaptação dos Oceanos",
        descricao: "Você respira e enxerga naturalmente dentro e fora d’água, além de não receber penalidades aplicadas pelo combate aquático. Além disso, você consegue se comunicar mentalmente com um alvo até 6 metros. O efeito dura 1 minuto e só funciona em um alvo por vez."
      },
      {
        nome: "Recompensa da Caçada",
        descricao: "Em combate, no final do seu turno, caso você tenha causado qualquer tipo de dano nos Pontos de Vida de um alvo ou tenha utilizado Pontos de Energia, você poderá realizar um teste de Destino (Dif. 10). Caso tenha sucesso, você regenera 1 Ponto de Energia."
      }
    ]
  },
  {
    nome: "Anões",
    aparencia: "São seres teimosos por natureza e rabugentos por opção, possuem corpos pequenos e atarracados, porém robustos, tendo sua estrutura muscular avantajada.",
    habilidades: [
      {
        nome: "Herança dos Três Irmãos",
        descricao: "Você precisa de metade de comida e água para sobreviver, além ignorar a regra de 2 horas adicionais vindos de Repousos caso esteja repousando em um local desconfortável. Você também possui Infravisão. Além disso, enquanto você estiver tocando um objeto mundano de até 1 metro de altura e largura, você poderá modificar a forma física deste objeto. Você também pode utilizar este efeito para reparar um pequeno objeto mundano, contando que a parte danificada não seja maior que 30 centímetros. Este efeito de reparo é permanente, ou até ser quebrado novamente."
      },
      {
 nome: "Fortitude Ampliada",
        descricao: "O seu dado de Pontos de Vida ao criar um personagem e ao receber Níveis de Despertar é 1d8, ao invés de 1d6. Caso você opte pelo valor fixo desta rolagem, considere 4, ao invés de 3."
      }
    ]
  },
  {
    nome: "Daevas",
    aparencia: "São seres de pele rachada que varia entre acinzentada, arroxeada ou avermelhada. Em seu corpo, uma dualidade entre uma parte mortal e uma parte abissal, que acaba por herdar traços demoníacos.",
    habilidades: [
      {
        nome: "Essência Abissal",
        descricao: "Você pode modificar sua aparência salientando os seus aspectos abissais, como o tom de voz, cor dos olhos, pequenos espinhos pelo corpo e etc… Além disso, você possui Resistência Mágica (Trevas) e não é afetado por Enfraquecido."
      },
      {
        nome: "Pacto Originário",
        descricao: "Escolha uma de suas Habilidades de Combate para ter seu custo de Pontos de Energia reduzido em 1. Você pode mudar a habilidade escolhida a novo nível de despertar."
      }
    ]
  },
  {
    nome: "Ursars",
    aparencia: "São grandes ursos humanoides, de pelagem branca (ou tons marrons, negros ou mesclados). Seus olhos podem refletir seu estado emocional.",
    habilidades: [
      {
        nome: "Virtude do Primeiro Povo",
        descricao: "Ao tocar o corpo de um alvo não-hostil a você, você poderá se conectar emocionalmente a este ser, podendo identificar seus sentimentos atuais."
      },
      {
        nome: "Presente de Norduk",
        descricao: "Seu corpo possui uma resistência maior a baixas temperaturas, não recebendo o efeito de Frio Elevado, e Frio Extremo se torna Frio Elevado. Além disso, ao concluir um Repouso Completo, você receberá um valor de Pontos de Vida Temporários equivalente ao dobro do seu total máximo de Pontos de Energia."
      }
    ]
  },
  {
    nome: "Valdraks",
    aparencia: "São seres naturalmente resistente, sua pele normalmente é pálida e seca, com tons azulados, acinzentados ou negros, com aspectos de rochas polidas.",
    habilidades: [
      {
        nome: "Resiliência",
        descricao: "Você é imune a qualquer efeito que o faria se deslocar involuntariamente. Alvos com duas ou mais Categorias de Tamanho acima da sua são imunes a este efeito. Além disso, você possui 120 pontos de Unidade, ao invés de 100. A sua base de valor da regra de Empurrar, Erguer e Puxar é dobrada."
      },
      {
        nome: "Incansável",
        descricao: "Você ignora 1 ponto de Exaustão recebido. Este efeito só pode ser realizado novamente após concluir um Repouso Completo."
      }
    ]
  },
  {
    nome: "Humanos",
    aparencia: "Humanos ‘ -’",
    habilidades: [
      {
        nome: "Adaptabilidade",
        descricao: "Escolha um parâmetro: Você é imune a efeitos de Habilidades de Caminho e Características que apliquem Inaptidão no Parâmetro escolhido. Habilidades de Caminho e Característica que apliquem Inaptidão em si mesmo não são afetadas por este efeito. Além disso você inicia com um ponto de Maestria adicional."
      },
      {
        nome: "Determinação",
        descricao: "Sempre que você realizar um teste de Parâmetro ou Conhecimento e o Resultado Natural deste teste for 10, ou mais, considere este Resultado Natural um 12."
      }
    ]
  },
  {
    nome: "Delahks",
    aparencia: "São seres reptilianos de pele escamosa que variam entre tons avermelhados, verdes ou cinzas, sempre esboçando um ar suave.",
    habilidades: [
      {
        nome: "Versatilidade",
        descricao: "Você pode utilizar as suas mãos e pés para escalar e se movimentar por qualquer superfície sólida, se fixando nesta superfície sem teste algum. Além disso, durante o seu turno e sem custo de Ação, você pode utilizar sua cauda para: Utilizar ou passar um item para um alvo até 1 metro. Trocar um Armamento equipado por outro Armamento que você possuía."
      },
      {
        nome: "Miragem",
        descricao: "Com uma Ação Simples você pode criar uma pequena ilusão a seguir que permanece por 10 minutos: Um efeito sensorial em um local até 6 metros que produzirá sons ou odores a escolha. Um item inofensivo objeto inofensivo que caiba em sua mão. Um pequeno símbolo em um objeto ou superfície até 6 metros."
      }
    ]
  },
  {
    nome: "Draenus",
    aparencia: "São seres de orelhas pontudas de pele escura em tons que variam entre roxo, azul e cinza, com pequenas linhas negras com tom obsidiana.",
    habilidades: [
      {
        nome: "Presente das Sombras",
        descricao: "Você pode utilizar as linhas obsidianas de sua pele para manipular as sombras ao seu redor, podendo realizar pequenos truques com estas sombras até 3 metros, como abrir uma porta destrancada, segurar um cálice, entre outros pequenos efeitos inofensivos que podem ser autorizados pelo Narrador. Além disso, você possui Infravisão Mística."
      },
      {
        nome: "Manto Noturno",
        descricao: "Ao ser alvo de uma Condição Mágica, você poderá realizar o teste de Espírito para remover esta Condição Mágica antes de recebê-la; caso tenha sucesso, você evitará de receber esta Condição Mágica."
      }
    ]
  },
  {
    nome: "Kitaris",
    aparencia: "São seres felídeos humanóides que possuem uma grande variedade de formas, sempre possuindo traços felinos, como orelhas felpudas, pelagem rasteira ou volumosa em alguns casos, e longas caudas.",
    habilidades: [
      {
        nome: "Mobilidade Felina",
        descricao: "Você possui um corpo ágil, modificando a regra Saltar, fazendo com que você dobre os valores base."
      },
      {
        nome: "Sorte",
        descricao: "Sempre que você tiver 1 como Resultado Natural de um teste de Parâmetro, você poderá realizar novamente este teste de Parâmetro."
      }
    ]
  },
  {
    nome: "Orkrashs",
    aparencia: "São seres de pele terrenosa, variando entre o amarelado, avermelhado, amarronzado ou acinzentado, com caninos inferiores protuberantes e ossos largos.",
    habilidades: [
      {
        nome: "Agraciado pelos Rituais",
        descricao: "Ao iniciar um Repouso Completo, você poderá realizar um pequeno ritual que fará com que você, e todos os seus alvos aliados até 20 metros recebam os efeitos deste Repouso Completo em 4 horas ao invés de 6 horas. Além disso, com uma Ação Simples, você pode marcar um local em uma superfície até 1 metro, fazendo com que caso um Legado ou criatura que não seja um alvo se aproxima até 10 metros deste local, você sentirá uma perturbação mística, sempre que algo se aproximar deste local."
      },
      {
        nome: "Fúria dos Antigos",
        descricao: "Enquanto seus Pontos de Vida atuais estiverem menores ou iguais ao dobro do seu total máximo de Pontos de Energia você receberá 1 ponto adicional em seus Parâmetros. Este ponto adicional pode ultrapassar o valor máximo de Parâmetros."
      }
    ]
  },
  {
    nome: "Inaris",
    aparencia: "São seres de pelagem que varia de tons de branco até o negro, laranja, marrom ou vermelho. Possuem um forte apreço por suas caudas, sendo longas ou curtas, peludas ou com pelos baixos.",
    habilidades: [
      {
        nome: "Instinto Natural",
        descricao: "A sua Percepção Passiva passa a ser 8 e a regra de Percepção Passiva é aplicada mesmo enquanto dormindo. Além disso, com uma Ação Simples, você passa a enxergar por 10 minutos todo alvo Invisível, transformado ou ilusão, enxergando sua forma original. Após este efeito ser usado, só poderá ser utilizado novamente depois de um Repouso."
      },
      {
        nome: "Sempre Alerta",
        descricao: "Você possui Aptidão em testes de Agilidade nas suas rolagens de Iniciativa. Além disso, você possui 2 metros adicionais na sua Movimentação."
      }
    ]
  },
  {
    nome: "Seikos",
    aparencia: "São seres humanoides que carregam característica vulpinas, seus olhos são totalmente brancos, uma leve e rasas pelagem que variam entre os tons brancos, negros, castanhos, alaranj ados ou acinzentados.",
    habilidades: [
      {
        nome: "Vontade das Brumas",
        descricao: "Você pode tocar um alvo morto para visualizar fragmentos de suas memórias. Além disso, você não pode ser alvo de efeitos de alvos inimigos que removam os seus Pontos de Energia. Você ainda é afetado por Envenenado."
      },
      {
        nome: "Espelho da Alma",
        descricao: "Com uma Ação Simples você pode alterar sua forma por completo, tornando-se um animal selvagem da fauna. Este animal pode ter a sua Categoria de Tamanho ou uma menor. Enquanto nessa forma, você perde todo Efeito Positivo e Foco ativo, além de não poder utilizar Habilidades de Caminho. Esta forma não possui duração, mas você pode desfazer esta forma com uma Ação Simples. Ao realizar um Repouso esta forma é desfeita."
      }
    ]
  },
  {
    nome: "Yuansus",
    aparencia: "São seres serenos de pele porcelana, cabelos de seda. Sua pele reflete o céu em tons pálidos de branco, azul, verde ou lilás, com pequenos chifres como os de um cervo adornando suas cabeças.",
    habilidades: [
      {
        nome: "Dinastia Narzepiana",
        descricao: "Os seus Parâmetros não podem ser reduzidos por efeitos de Habilidades de Caminho e Características. Além disso, você pode levitar a 30 centímetros da superfície sólida atual, podendo utilizar a sua Movimentação enquanto levitando, ignorando também locais com Terreno Difícil."
      },
      {
        nome: "Poder Oculto",
        descricao: "Enquanto em combate, você pode refazer um teste de parâmetro que tenha realizado, ficando com o novo resultado. Esta habilidade pode ser utilizada uma vez por combate."
      }
    ]
  },
  {
    nome: "Zaokans",
    aparencia: "São seres de olhos negros com iris que refletem a cor de sua pele, que podem ser vermelhas, verdes, brancas, cinzas ou azuis em cores vivas, além de possuírem manchas endurecidas sob suas peles. Além disso possuem um protuberância na testa que lembram chifres nos formatos mais variados.",
    habilidades: [
      {
        nome: "Corpo Fechado",
        descricao: "Você possui o dobro dos valores bases da regra de Fôlego. Além disso, você remove 1 ponto adicional de Exaustão sempre que concluir um Repouso Completo."
      },
      {
        nome: "Furor das Brumas",
        descricao: "Caso você fique Incapacitado você poderá continuar em pé, utilizando normalmente as suas ações. Você ainda recebe o ponto de Exaustão ao chegar a zero Pontos de Vida, como é afetado pela regra de Dado de Morte e Pontos de Vida Negativos."
      }
    ]
  },
  {
    nome: "Elementais",
    aparencia: "São seres moldados em formas humanóides a partir de elementos naturais.",
    habilidades: [
      {
        nome: "Essência Elemental",
        descricao: "Escolha um elemento: Fogo, Água, Vento, Terra, Trovão ou Gelo. Você possui Resistência Mágica, referente ao elemento escolhido. Além disso, você pode criar pequenos efeitos inofensivos elementais referente ao seu elemento como moldar uma mão, congelar uma taça, entre outros pequenos efeitos inofensivos."
      },
      {
        nome: "Encarnação Elemental",
        descricao: "Enquanto em combate, ao receber qualquer tipo de dano de um alvo, você fará com que este mesmo alvo receba a metade do seu total máximo de Pontos de Energia como Dano Mágico elemental referente ao seu elemento. Este efeito ocorre uma vez por rodada."
      }
    ]
  },
  {
    nome: "Forjados",
    aparencia: "São armaduras reanimadas ‘ -’",
    habilidades: [
      {
        nome: "Armadura Viva",
        descricao: "Você não precisa se alimentar e respirar. Você também ignora a regra de 2 horas adicionais vindos de Repousos caso esteja repousando em um local desconfortável. Você pode tocar por 10 minutos uma Armadura que não esteja sendo utilizada, após isso, você assume essa armadura como seu novo corpo. Você só recebe o bônus de bloqueio da armadura caso possua o pré-requisito necessário de Vigor."
      },
      {
        nome: "Corpo de Ferro",
        descricao: "Você é imune a Envenenado e Sangramento."
      }
    ]
  },
  {
    nome: "Kahats’zas",
    aparencia: "São seres de crânio alongado, formando rostos magros e com formato losangular, sua pele pode ser azulada, púrpura ou azul-acinzentada, assim como seus cabelos que são essencialmente brancos.",
    habilidades: [
      {
        nome: "Conectado com o Véu",
        descricao: "Com uma Ação Simples, você pode realizar um dos seguintes efeitos: Levitar e mover objetos de até 20 kg que estejam até 6 metros para um novo local a 6 metros. Abrir ou fechar uma tranca ou recipiente destrancado até 6 metros. Acender ou apagar uma tocha, vela ou fogueira até 6 metros. Modificar a sua voz, ou até mesmo fazer com que ela ressoe até 6 metros de você. Este efeito permanece por 1 minuto."
      },
      {
        nome: "Magia Antiga",
        descricao: "Ao perder qualquer valor de Pontos de Vida, o seu próximo custo de Pontos de Energia é reduzido em 1. Este efeito não acumula e permanece por 1 minuto caso não seja utilizado."
      }
    ]
  },
  {
    nome: "Vennélis",
    aparencia: "São seres de pele rígida, possuindo tonalidades semelhantes à de metais, como cobáltico, prata, platina, dourado ou cobre, brilhando em diversas intensidades, mas não apresenta a textura desses metais.",
    habilidades: [
      {
        nome: "Resplendor",
        descricao: "Com a sua Ação Simples, você pode desfazer as mandalas em suas costas, criando um par de asas etéreas, que lhe permitem Voar. Além disso, com uma Ação Simples, você pode criar um orbe de luz mística que permanece a 1 metro de você por 10 minutos. Toda Escuridão e Escuridão Mística até 4 metros deste orbe é iluminada."
      },
      {
        nome: "Toque da Salvação",
        descricao: "Você pode tocar um alvo Incapacitado fazendo com que este alvo não precise mais rolar o Dado de Morte até a próxima vez que este alvo ficar Incapacitado novamente."
      }
    ]
  }
];

export default legancyMap;