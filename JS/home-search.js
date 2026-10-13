document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("home-search-input");
  const dropdown = document.getElementById("autocomplete-list");

  // Validação para garantir que os elementos existem na página
  if (!searchInput || !dropdown) {
    console.error("Erro RotaRS: Verifique se os IDs 'home-search-input' e 'autocomplete-list' existem no seu index.html");
    return;
  }

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();

    // Limpa se o texto tiver menos de 2 letras
    if (query.length < 2) {
      dropdown.innerHTML = "";
      dropdown.classList.add("hidden");
      return;
    }

    // Validação da lista de rotas
    if (typeof ROTAS_RS === "undefined") {
      console.error("Erro RotaRS: A variável ROTAS_RS não foi encontrada. Certifique-se de que js/rotas-data.js foi carregado no HTML.");
      return;
    }

    // Filtra as rotas pelo nome, trecho ou categoria
    const rotasEncontradas = ROTAS_RS.filter((rota) => 
      rota.nome.toLowerCase().includes(query) ||
      rota.trecho.toLowerCase().includes(query) ||
      rota.categoria.toLowerCase().includes(query)
    );

    // Se não encontrar nenhuma rota
    if (rotasEncontradas.length === 0) {
      dropdown.innerHTML = `<div class="autocomplete-no-results">Nenhuma rota encontrada para "${e.target.value}"</div>`;
      dropdown.classList.remove("hidden");
      return;
    }

    // Renderiza os resultados
    dropdown.innerHTML = rotasEncontradas.map((rota) => `
      <div class="autocomplete-item" data-id="${rota.id}" data-nome="${rota.nome}">
        <img src="assets/motoicon.png" class="moto-icon-fade" alt="Moto">
        <div class="autocomplete-info">
          <span class="autocomplete-title">${destacarTexto(rota.nome, query)}</span>
          <span class="autocomplete-trecho">${destacarTexto(rota.trecho, query)}</span>
        </div>
        <span class="autocomplete-badge">${rota.categoria}</span>
      </div>
    `).join("");

    dropdown.classList.remove("hidden");
  });

  // Evento ao clicar em uma sugestão
  dropdown.addEventListener("click", (e) => {
    const item = e.target.closest(".autocomplete-item");
    if (!item) return;

    const rotaId = item.getAttribute("data-id");
    const rotaNome = item.getAttribute("data-nome");

    searchInput.value = rotaNome;
    dropdown.classList.add("hidden");

    window.location.href = `planejamento.html?rotaId=${rotaId}`;
  });

  // Esconde a lista ao clicar fora
  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.add("hidden");
    }
  });
});

function destacarTexto(texto, busca) {
  const regex = new RegExp(`(${busca})`, "gi");
  return texto.replace(regex, "<strong>$1</strong>");
}