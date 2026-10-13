document.addEventListener("DOMContentLoaded", () => {
  renderHeaderAuth();
});

// ==========================================================================
// Renderiza o header de acordo com o estado de autenticação
// Lê AMBAS as chaves para compatibilidade total com login.js
// ==========================================================================
function renderHeaderAuth() {
  const container = document.getElementById("user-nav-container");
  if (!container) return;

  // Lê as duas chaves possíveis (compatibilidade com login.js)
  const activeUser =
    JSON.parse(localStorage.getItem("RS_MOTOS_LOGGED_USER")) ||
    JSON.parse(localStorage.getItem("usuarioLogado"));

  if (activeUser) {
    // Garante que nickname/nome sempre existe para evitar crash
    const displayName = activeUser.nickname || activeUser.nome || activeUser.name || "Usuário";
    const inicial = displayName.charAt(0).toUpperCase();
    const ehAdmin = activeUser.isAdmin || activeUser.email === "adm@gmail.com";

    const avatarContent = activeUser.photo
      ? `<img src="${activeUser.photo}" alt="${displayName}" class="user-avatar-icon" />`
      : `<div class="user-avatar-icon">${inicial}</div>`;

    container.innerHTML = `
      <div class="user-menu-wrapper">
        <button id="btn-user-dropdown" class="user-btn" aria-expanded="false" aria-label="Menu do Usuário">
          ${avatarContent}
          <span>${displayName}</span>
          <span class="arrow-icon">▼</span>
        </button>

        <div id="dropdown-menu" class="user-dropdown" role="menu">
          <a href="perfil.html" class="dropdown-item" role="menuitem">
            <img src="assets/usaricon.png" class="ui-icon" alt="" aria-hidden="true"> <span>Meu Perfil</span>
          </a>
          ${ehAdmin ? `<a href="admin.html" class="dropdown-item" role="menuitem" style="color:#3b82f6;font-weight:600;">⚙️ <span>Painel ADM</span></a>` : ""}
          <hr class="dropdown-divider" />
          <button type="button" id="btn-logout-nav" class="dropdown-item logout-item" role="menuitem">
            🚪 <span>Desconectar</span>
          </button>
        </div>
      </div>
    `;

    // Abrir/Fechar o Dropdown
    const btnDropdown = document.getElementById("btn-user-dropdown");
    const dropdownMenu = document.getElementById("dropdown-menu");

    btnDropdown.addEventListener("click", (e) => {
      e.stopPropagation();
      const isVisible = dropdownMenu.classList.contains("show");
      dropdownMenu.classList.toggle("show");
      btnDropdown.setAttribute("aria-expanded", !isVisible);
    });

    // Fechar dropdown ao clicar fora
    document.addEventListener("click", () => {
      dropdownMenu.classList.remove("show");
      btnDropdown.setAttribute("aria-expanded", "false");
    });

    // Ação de Desconectar (Logout) — remove AMBAS as chaves
    document.getElementById("btn-logout-nav").addEventListener("click", () => {
      if (confirm("Tem certeza que deseja desconectar?")) {
        localStorage.removeItem("RS_MOTOS_LOGGED_USER");
        localStorage.removeItem("usuarioLogado");
        window.location.href = "login.html";
      }
    });

  } else {
    // --- ESTADO: USUÁRIO NÃO LOGADO ---
    container.innerHTML = `
      <div class="auth-btns">
        <a href="login.html" class="btn-outline-sm">Entrar</a>
        <a href="login.html" class="btn-primary-sm">Cadastrar</a>
      </div>
    `;
  }
}