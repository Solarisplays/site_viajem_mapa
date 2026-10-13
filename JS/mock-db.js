// Dados iniciais mockados para a aplicação
const initialDatabase = {
  cities: [
    { id: 1, name: "Porto Alegre", lat: -30.0346, lng: -51.2177 },
    { id: 2, name: "Gramado", lat: -29.3746, lng: -50.8764 },
    { id: 3, name: "Canela", lat: -29.3653, lng: -50.8101 },
    { id: 4, name: "Bento Gonçalves", lat: -29.1706, lng: -51.5186 },
    { id: 5, name: "Caxias do Sul", lat: -29.1678, lng: -51.1794 }
  ],
  pointsOfInterest: [
    {
      id: 101,
      name: "Posto Rota 66 - Serra",
      type: "posto", // 'posto', 'restaurante', 'mirante'
      cityId: 2,
      kmMark: 65,
      priceGasoline: 5.89,
      description: "Posto com estrutura para motociclistas e café."
    },
    {
      id: 102,
      name: "Mirante do Belvedere",
      type: "mirante",
      cityId: 2,
      kmMark: 82,
      description: "Vista panorâmica do Vale do Quilombo."
    },
    {
      id: 103,
      name: "Churrascaria O Gaúcho",
      type: "restaurante",
      cityId: 3,
      kmMark: 95,
      description: "Almoço tradicional com amplo estacionamento para motos."
    }
  ],
  motorcycles: [
    {
      id: "m1",
      name: "BMW R 1250 GS",
      tankCapacity: 20,
      consumptionKmL: 18,
      fuelType: "Gasolina Aditivada"
    }
  ],
  routes: [
    {
      id: "r1",
      origin: "Porto Alegre",
      destination: "Gramado",
      distanceKm: 105,
      motoId: "m1"
    }
  ]
};

// Inicializa o localStorage caso esteja vazio
if (!localStorage.getItem("RS_MOTOS_DB")) {
  localStorage.setItem("RS_MOTOS_DB", JSON.stringify(initialDatabase));
}