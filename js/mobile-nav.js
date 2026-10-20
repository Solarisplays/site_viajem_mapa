// ==========================================================================
// mobile-nav.js - Adaptações para celular (todas as páginas)
// 1) Cria o botão de menu hambúrguer no cabeçalho
// 2) Adiciona rótulos (data-label) nas células das tabelas do admin,
//    permitindo exibi-las como cartões em telas pequenas
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // ---------- 1. MENU HAMBÚRGUER ----------
  const header    = document.querySelector(".main-header");
  const container = header && header.querySelector(".header-container");
  const nav       = header && header.querySelector(".nav-menu");

  if (container && nav && !container.querySelector(".nav-toggle")) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "nav-toggle";
    btn.setAttribute("aria-label", "Abrir menu");
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = "<span></span><span></span><span></span>";

    // Fica logo depois da logo
    const logo = container.querySelector(".logo");
    if (logo) logo.after(btn); else container.prepend(btn);

    const fechar = () => {
      header.classList.remove("nav-open");
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Abrir menu");
    };

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const aberto = header.classList.toggle("nav-open");
      btn.setAttribute("aria-expanded", String(aberto));
      btn.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    });

    // Fecha ao clicar em um link, fora do menu ou ao voltar para desktop
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) fechar(); });
    document.addEventListener("click", (e) => { if (!header.contains(e.target)) fechar(); });
    window.addEventListener("resize", () => { if (window.innerWidth > 860) fechar(); });
  }

  // ---------- 2. RÓTULOS DAS TABELAS ----------
  function rotularTabela(tabela) {
    const titulos = [...tabela.querySelectorAll("thead th")].map(th => th.textContent.trim());
    tabela.querySelectorAll("tbody tr").forEach(tr => {
      [...tr.children].forEach((td, i) => {
        if (titulos[i] && !td.hasAttribute("colspan")) td.setAttribute("data-label", titulos[i]);
      });
    });
  }

  document.querySelectorAll(".admin-table").forEach(tabela => {
    rotularTabela(tabela);
    const tbody = tabela.querySelector("tbody");
    // As linhas são geradas via JS; reaplica os rótulos sempre que mudarem
    if (tbody) new MutationObserver(() => rotularTabela(tabela)).observe(tbody, { childList: true });
  });
});

