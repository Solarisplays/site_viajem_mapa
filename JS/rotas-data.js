const ROTAS_RS = [
  {
    id: 1,
    nome: "Rota Romântica",
    trecho: "Novo Hamburgo ➔ Gramado",
    distancia: "105 km",
    tempo: "1h 45min",
    categoria: "Serra & Gastronomia",
    descricao: "Estrada arborizada inspirada na Rota Romântica alemã, repleta de hortênsias, arquitetura enxaimel e boa gastronomia."
  },
  {
    id: 2,
    nome: "Vale dos Vinhedos",
    trecho: "Bento Gonçalves ➔ Garibaldi ➔ Monte Belo do Sul",
    distancia: "85 km",
    tempo: "1h 30min",
    categoria: "Enoturismo",
    descricao: "O coração da imigração italiana e da produção de vinhos e espumantes no Brasil."
  },
  {
    id: 3,
    nome: "Rota do Sol",
    trecho: "Caxias do Sul ➔ Terra de Areia",
    distancia: "140 km",
    tempo: "2h 10min",
    categoria: "Serra ➔ Litoral",
    descricao: "Descida impressionante da serra até o litoral gaúcho cruzando viadutos e túneis em meio à Mata Atlântica."
  },
  {
    id: 4,
    nome: "Cânions e Aparados da Serra",
    trecho: "Cambará do Sul ➔ Praia Grande",
    distancia: "65 km",
    tempo: "1h 20min",
    categoria: "Ecoturismo",
    descricao: "Acesso aos grandiosos Cânions Itaimbezinho e Fortaleza com paisagens panorâmicas inesquecíveis."
  },
  {
    id: 5,
    nome: "Rota das Missões",
    trecho: "Santo Ângelo ➔ São Miguel das Missões",
    distancia: "120 km",
    tempo: "1h 40min",
    categoria: "Histórica & Cultural",
    descricao: "Imersão na história dos índios Guarani e dos padres Jesuítas, passando pelo Sítio Arqueológico de São Miguel Arcanjo."
  },
  {
    id: 6,
    nome: "Caminho dos Cânions e Ausentes",
    trecho: "Bom Jesus ➔ São José dos Ausentes",
    distancia: "110 km",
    tempo: "2h 00min",
    categoria: "Aventura",
    descricao: "O ponto mais alto e frio do RS, cortando os campos de altitude até a divisa com Santa Catarina."
  },
  {
    id: 7,
    nome: "Rota das Cascatas & Taquari",
    trecho: "Lajeado ➔ Encantado (Cristo Protetor)",
    distancia: "50 km",
    tempo: "1h 00min",
    categoria: "Turismo Religioso & Natureza",
    descricao: "Passa pela região do Vale do Taquari, o Cristo Protetor de Encantado e diversas quedas d'água."
  },
  {
    id: 8,
    nome: "Salto do Yucumã",
    trecho: "Frederico Westphalen ➔ Derrubadas",
    distancia: "130 km",
    tempo: "1h 50min",
    categoria: "Natureza Selvagem",
    descricao: "Conduz ao Parque Estadual do Turvo, onde fica a maior queda d'água longitudinal do mundo."
  },
  {
    id: 9,
    nome: "Rota do Pampa e Fronteira",
    trecho: "Bagé ➔ Santana do Livramento",
    distancia: "210 km",
    tempo: "2h 40min",
    categoria: "Cultura Gaúcha & Compras",
    descricao: "Longas retas pelos campos sulinos (coxilhas), vinícolas da Campanha e integração com a fronteira do Uruguai."
  },
  {
    id: 10,
    nome: "Rota da Lagoa dos Patos",
    trecho: "Pelotas ➔ Rio Grande ➔ São José do Norte",
    distancia: "180 km",
    tempo: "2h 30min",
    categoria: "Litoral Sul & História",
    descricao: "Contorna o maior complexo de lagunas do Brasil, combinando charqueadas históricas, travessia de balsa e praias."
  },
  {
    id: 11,
    nome: "Rota das Gemas e Ametistas",
    trecho: "Soledade ➔ Ametista do Sul",
    distancia: "160 km",
    tempo: "2h 15min",
    categoria: "Exótica",
    descricao: "Capital mundial das pedras preciosas, famosa por minas subterrâneas e a igreja revestida de cristais."
  },
  {
    id: 12,
    nome: "Quarta Colônia de Imigração",
    trecho: "Santa Maria ➔ Silveira Martins ➔ Restinga Sêca",
    distancia: "75 km",
    tempo: "1h 15min",
    categoria: "Gastronomia & Paleontologia",
    descricao: "Conhecida pela culinária típica italiana, fósseis de dinossauros e recantos de fé e tranquilidade."
  },
  {
    id: 13,
    nome: "Rota das Olivas e Geoparque",
    trecho: "Caçapava do Sul ➔ Pinheiro Machado",
    distancia: "95 km",
    tempo: "1h 20min",
    categoria: "Ecoturismo",
    descricao: "Região das formações rochosas das Guaritas e centro emergente de produção de azeite de oliva extra virgem."
  },
  {
    id: 14,
    nome: "Rota do Chimarrão",
    trecho: "Venâncio Aires ➔ Passo do Sobrado",
    distancia: "45 km",
    tempo: "0h 45min",
    categoria: "Tradição",
    descricao: "Circuito focado na cultura do cultivo da erva-mate e na hospitalidade do Vale do Rio Pardo."
  },
  {
    id: 15,
    nome: "Rota dos Ervais e Vales",
    trecho: "Ilópolis ➔ Arvorezinha",
    distancia: "60 km",
    tempo: "1h 00min",
    categoria: "Natureza",
    descricao: "Montanhas verdes, museus do pão e da erva-mate e mirantes espetaculares no alto dos vales."
  },
  {
    id: 16,
    nome: "Rota Litoral Norte",
    trecho: "Osório ➔ Torres",
    distancia: "115 km",
    tempo: "1h 20min",
    categoria: "Praia",
    descricao: "Liga o complexo eólico e de lagoas de Osório às falésias e praias de Torres."
  },
  {
    id: 17,
    nome: "Caminho dos Tropeiros",
    trecho: "Vacaria ➔ Passo Fundo",
    distancia: "170 km",
    tempo: "2h 10min",
    categoria: "Histórica",
    descricao: "Antigo caminho de gado dos tropeiros, atravessando fazendas históricas e a cultura sertaneja gaúcha."
  },
  {
    id: 18,
    nome: "Rota do Vento e Faróis",
    trecho: "Tavares ➔ Mostardas",
    distancia: "90 km",
    tempo: "1h 30min",
    categoria: "Aventura & Observação",
    descricao: "Faixa estreita entre o oceano e a Lagoa dos Patos, lar do Parque Nacional da Lagoa do Peixe e seus faróis."
  },
  {
    id: 19,
    nome: "Vale do Rio Pardo e Paleontologia",
    trecho: "Santa Cruz do Sul ➔ Candelária",
    distancia: "40 km",
    tempo: "0h 40min",
    categoria: "Cultura & Ciência",
    descricao: "Berço da arquitetura alemã, festival da Oktoberfest e importante rota científica de fósseis do período Triássico."
  },
  {
    id: 20,
    nome: "Rota do Alto Jacuí",
    trecho: "Cruz Alta ➔ Ijuí",
    distancia: "45 km",
    tempo: "0h 40min",
    categoria: "Diversidade Cultural",
    descricao: "Ligação entre a terra de Erico Verissimo e a capital das etnias, destacando a diversidade de imigrantes."
  }
];