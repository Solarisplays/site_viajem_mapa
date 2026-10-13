/**
 * Serviço que simula chamadas a uma API REST
 */
const API = {
  // Ler banco atual do localStorage
  _getDB() {
    return JSON.parse(localStorage.getItem("RS_MOTOS_DB"));
  },

  // Salvar alterações no localStorage
  _saveDB(data) {
    localStorage.setItem("RS_MOTOS_DB", JSON.stringify(data));
  },

  // Simular atraso de rede (Delay de 300ms)
  _delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  // 1. Operação GET: Buscar Cidades e Pontos de Interesse
  async getLocations() {
    await this._delay();
    const db = this._getDB();
    return {
      status: 200,
      data: {
        cities: db.cities,
        pointsOfInterest: db.pointsOfInterest
      }
    };
  },

  // 1. Operação GET: Buscar Motos
  async getMotorcycles() {
    await this._delay();
    const db = this._getDB();
    return { status: 200, data: db.motorcycles };
  },

  // 2. Operação POST: Cadastrar Nova Moto
  async postMotorcycle(newMoto) {
    await this._delay();
    const db = this._getDB();

    const motoToSave = {
      id: "m_" + Date.now(),
      ...newMoto
    };

    db.motorcycles.push(motoToSave);
    this._saveDB(db);

    return { status: 201, message: "Moto cadastrada com sucesso!", data: motoToSave };
  },

  // 3. Operação DELETE: Remover Moto cadastrada
  async deleteMotorcycle(id) {
    await this._delay();
    let db = this._getDB();

    const exists = db.motorcycles.some(m => m.id === id);
    if (!exists) {
      throw new Error("Moto não encontrada na base de dados.");
    }

    db.motorcycles = db.motorcycles.filter(m => m.id !== id);
    this._saveDB(db);

    return { status: 200, message: "Moto removida com sucesso!" };
  }
};