document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("motos-grid");
  const searchInput = document.getElementById("motos-search");
  const filterBtns = document.querySelectorAll(".btn-filter");

  let categoriaAtiva = "todas";
  let termoBusca = "";

  // Renderização Inicial
  renderMotos();

  // Evento de Busca por Texto
  searchInput.addEventListener("input", (e) => {
    termoBusca = e.target.value.toLowerCase().trim();
    renderMotos();
  });

  // Evento dos Botões de Categoria/Cilindrada
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      categoriaAtiva = btn.getAttribute("data-category");
      renderMotos();
    });
  });

  // Função Principal de Renderização
  function renderMotos() {
    if (!grid) return;

    const motosFiltradas = MOTOS_DATA.filter((moto) => {
      const bateuCategoria = categoriaAtiva === "todas" || moto.categoriaCc === categoriaAtiva;
      const bateuBusca = moto.nome.toLowerCase().includes(termoBusca) || 
                         moto.marca.toLowerCase().includes(termoBusca) ||
                         moto.cilindrada.toLowerCase().includes(termoBusca);
      return bateuCategoria && bateuBusca;
    });

    if (motosFiltradas.length === 0) {
      grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #a0aec0; padding: 2rem;">Nenhuma moto encontrada com esses critérios.</p>`;
      return;
    }

    grid.innerHTML = motosFiltradas.map((moto) => `
      <div class="moto-card">
        <img src="${moto.imagem}" alt="${moto.nome}" class="moto-card-img" />
        <div class="moto-card-body">
          <span class="moto-card-badge">${moto.cilindrada}</span>
          <h3 class="moto-card-title">${moto.nome}</h3>
          
          <div class="moto-quick-specs">
            <div><strong>Potência:</strong> ${moto.potencia}</div>
            <div><strong>Tanque:</strong> ${moto.tanque}</div>
            <div><strong>Torque:</strong> ${moto.torque}</div>
            <div><strong>Peso:</strong> ${moto.peso}</div>
          </div>

          <!-- Bloco de Consumo por Velocidade -->
          <div class="moto-consumption-box">
            <h4>⛽ Consumo Estimado por Velocidade:</h4>
            <div class="consumption-list">
              <div><span>⚡ 80 km/h:</span> <strong>${moto.consumoVelocidade.v80}</strong></div>
              <div><span>⚡ 120 km/h:</span> <strong>${moto.consumoVelocidade.v120}</strong></div>
              <div><span>⚡ 150-180 km/h:</span> <strong>${moto.consumoVelocidade.v180}</strong></div>
            </div>
          </div>

          <button type="button" onclick="abrirFichaTecnica(${moto.id})" class="btn btn-primary btn-full" style="margin-top: auto;">
            📋 Ver Ficha Técnica
          </button>
        </div>
      </div>
    `).join("");
  }

  // Controle do Modal
  const modal = document.getElementById("modal-moto");
  const btnClose = document.getElementById("btn-close-moto-modal");

  if (btnClose && modal) {
    btnClose.addEventListener("click", () => modal.classList.add("hidden"));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.add("hidden");
    });
  }
});

// Exibe a Ficha Técnica completa no Modal
function abrirFichaTecnica(id) {
  const moto = MOTOS_DATA.find((m) => m.id === id);
  if (!moto) return;

  document.getElementById("modal-moto-title").textContent = moto.nome;
  const content = document.getElementById("modal-moto-content");

  content.innerHTML = `
    <img src="${moto.imagem}" alt="${moto.nome}" class="modal-moto-img" />
    <p style="font-size: 0.9rem; color: #4a5568;">${moto.descricao}</p>
    
    <table class="specs-table">
      <tr><td>Marca / Fabricante</td><td>${moto.marca}</td></tr>
      <tr><td>Cilindrada Exacta</td><td>${moto.cilindrada}</td></tr>
      <tr><td>Potência Máxima</td><td>${moto.potencia}</td></tr>
      <tr><td>Torque Máximo</td><td>${moto.torque}</td></tr>
      <tr><td>Capacidade do Tanque</td><td>${moto.tanque}</td></tr>
      <tr><td>Peso em Ordem de Marcha</td><td>${moto.peso}</td></tr>
    </table>

    <div class="moto-consumption-box">
      <h4>⛽ Detalhe de Consumo e Autonomia Estimada:</h4>
      <div class="consumption-list" style="font-size: 0.88rem;">
        <div><span>Cruzeiro Leve (80 km/h):</span> <strong>${moto.consumoVelocidade.v80}</strong></div>
        <div><span>Velocidade Rodoviária (120 km/h):</span> <strong>${moto.consumoVelocidade.v120}</strong></div>
        <div><span>Alta Velocidade (150 a 180 km/h):</span> <strong>${moto.consumoVelocidade.v180}</strong></div>
      </div>
    </div>
  `;

  document.getElementById("modal-moto").classList.remove("hidden");
}