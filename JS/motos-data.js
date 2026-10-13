const MOTOS_DATA = [
  {
    id: 1,
    nome: "Yamaha Crosser 150 ABS",
    marca: "Yamaha",
    categoriaCc: "baixa",
    cilindrada: "149 cc",
    potencia: "12,4 cv",
    torque: "1,3 kgfm",
    tanque: "12 Litros",
    peso: "134 kg",
    imagem: "assets/xtz.png",
    descricao: "Mão de obra acessível e excelente economia para quem está começando em viagens regionais e estradas de terra leve.",
    consumoVelocidade: {
      v80: "42 km/L (Cruzeiro econômico)",
      v120: "28 km/L (Limite de esgoelamento)",
      v180: "N/A (Velocidade máx: ~115 km/h)"
    }
  },
  {
    id: 2,
    nome: "Yamaha XTZ 250 Lander",
    marca: "Yamaha",
    categoriaCc: "baixa",
    cilindrada: "249 cc",
    potencia: "20,9 cv",
    torque: "2,1 kgfm",
    tanque: "13,6 Litros",
    peso: "153 kg",
    imagem: "assets/xtz250.png",
    descricao: "Robusta, confortável para o piloto e extremamente confiável em asfaltos esburacados e estradas de chão.",
    consumoVelocidade: {
      v80: "35 km/L",
      v120: "24 km/L",
      v180: "N/A (Velocidade máx: ~135 km/h)"
    }
  },
  {
    id: 3,
    nome: "Honda Sahara 300",
    marca: "Honda",
    categoriaCc: "baixa",
    cilindrada: "293,5 cc",
    potencia: "25,2 cv",
    torque: "2,74 kgfm",
    tanque: "13,8 Litros",
    peso: "149 kg",
    imagem: "assets/shara300.jpg",
    descricao: "Evolução da XRE 300 com embreagem deslizante e câmbio de 6 marchas que ajuda muito no consumo de cruzeiro.",
    consumoVelocidade: {
      v80: "33 km/L",
      v120: "23 km/L",
      v180: "N/A (Velocidade máx: ~142 km/h)"
    }
  },
  {
    id: 4,
    nome: "Royal Enfield Himalayan 411",
    marca: "Royal Enfield",
    categoriaCc: "media",
    cilindrada: "411 cc",
    potencia: "24,5 cv",
    torque: "3,2 kgfm",
    tanque: "15 Litros",
    peso: "199 kg",
    imagem: "assets/royal411.png",
    descricao: "Foco em torque em baixas rotações e postura muito confortável para viagens sem pressa no estilo adventure clássico.",
    consumoVelocidade: {
      v80: "30 km/L",
      v120: "20 km/L",
      v180: "N/A (Velocidade máx: ~130 km/h)"
    }
  },
  {
    id: 5,
    nome: "Honda CB 500X",
    marca: "Honda",
    categoriaCc: "media",
    cilindrada: "471 cc (Bicilíndrico)",
    potencia: "50,2 cv",
    torque: "4,54 kgfm",
    tanque: "17,7 Litros",
    peso: "191 kg",
    imagem: "assets/cb500x.png",
    descricao: "Uma das motos de viagem mais queridas do Brasil. Oferece autonomia superior a 400 km e rodar suave na rodovia.",
    consumoVelocidade: {
      v80: "31 km/L",
      v120: "22 km/L",
      v180: "14 km/L (Próximo do topo ~170 km/h)"
    }
  },
  {
    id: 6,
    nome: "Suzuki V-Strom 650 XT",
    marca: "Suzuki",
    categoriaCc: "media",
    cilindrada: "645 cc (V-Twin)",
    potencia: "71 cv",
    torque: "6,32 kgfm",
    tanque: "20 Litros",
    peso: "216 kg",
    imagem: "assets/vstrom650xt.png",
    descricao: "Lendária pelo motor V2 extremamente elástico e banco largo que garante horas na estrada sem cansaço.",
    consumoVelocidade: {
      v80: "25 km/L",
      v120: "18,5 km/L",
      v180: "12,5 km/L"
    }
  },
  {
    id: 7,
    nome: "Yamaha Ténéré 700",
    marca: "Yamaha",
    categoriaCc: "media",
    cilindrada: "689 cc (Crossplane CP2)",
    potencia: "73,4 cv",
    torque: "6,9 kgfm",
    tanque: "16 Litros",
    peso: "204 kg",
    imagem: "assets/tenere700.png",
    descricao: "Aventureira pura com aptidão impecável para qualquer terreno de expedição longa sem eletrônica excessiva.",
    consumoVelocidade: {
      v80: "24 km/L",
      v120: "18 km/L",
      v180: "12 km/L"
    }
  },
  {
    id: 8,
    nome: "BMW F 850 GS",
    marca: "BMW",
    categoriaCc: "alta",
    cilindrada: "853 cc",
    potencia: "95 cv",
    torque: "9,38 kgfm",
    tanque: "15 Litros",
    peso: "233 kg",
    imagem: "assets/bmwgs850.png",
    descricao: "Tecnologia de ponta com painel TFT, modos de pilotagem eletrônicos e excelente estabilidade em altas velocidades.",
    consumoVelocidade: {
      v80: "23 km/L",
      v120: "17 km/L",
      v180: "11 km/L"
    }
  },
  {
    id: 9,
    nome: "Honda CRF 1100L Africa Twin",
    marca: "Honda",
    categoriaCc: "alta",
    cilindrada: "1.084 cc",
    potencia: "99,3 cv",
    torque: "10,5 kgfm",
    tanque: "24,8 Litros (Adventure)",
    peso: "238 kg",
    imagem: "assets/africatwin1100.png",
    descricao: "Máquina de cruzar continentes, disponível inclusive com câmbio automático DCT de dupla embreagem.",
    consumoVelocidade: {
      v80: "21 km/L",
      v120: "16 km/L",
      v180: "10,5 km/L"
    }
  },
  {
    id: 10,
    nome: "BMW R 1250 GS Adventure",
    marca: "BMW",
    categoriaCc: "alta",
    cilindrada: "1.254 cc (Boxer ShiftCam)",
    potencia: "136 cv",
    torque: "14,5 kgfm",
    tanque: "30 Litros",
    peso: "268 kg",
    imagem: "assets/bmwgs1250.png",
    descricao: "A rainha das grandes viagens pelo mundo. O tanque de 30L proporciona autonomia monstra com o motor Boxer.",
    consumoVelocidade: {
      v80: "20 km/L",
      v120: "15,5 km/L",
      v180: "9,5 km/L"
    }
  }
];