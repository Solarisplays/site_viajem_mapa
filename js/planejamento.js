// ==========================================================================
// planejamento.js - Página de Planejamento de Rotas
// ==========================================================================

let rotaSelecionada = null;
let usandoMotoUsuario = false;

// Converte "105 km" -> 105 | "42 km/L (...)" -> 42 | "13,6 Litros" -> 13.6
function extrairNumero(texto) {
  if (texto === undefined || texto === null) return NaN;
  const m = String(texto).replace(",", ".").match(/[\d.]+/);
  return m ? parseFloat(m[0]) : NaN;
}

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function getUsuarioLogado() {
  return JSON.parse(localStorage.getItem("usuarioLogado")) ||
         JSON.parse(localStorage.getItem("RS_MOTOS_LOGGED_USER"));
}

// Rotas: base do arquivo + alterações feitas no painel ADM
function obterRotas() {
  const base      = (typeof ROTAS_RS !== "undefined") ? ROTAS_RS : [];
  const admin     = JSON.parse(localStorage.getItem("rotas_admin")) || [];
  const excluidas = JSON.parse(localStorage.getItem("rotas_excluidas")) || [];
  const idsAdmin  = admin.map(r => r.id);
  return [...base.filter(r => !idsAdmin.includes(r.id)), ...admin]
    .filter(r => !excluidas.includes(r.id))
    .sort((a, b) => a.id - b.id);
}

// Motos: base do arquivo + cadastros do painel ADM
function obterMotos() {
  const base      = (typeof MOTOS_DATA !== "undefined") ? MOTOS_DATA : [];
  const admin     = JSON.parse(localStorage.getItem("motos_admin")) || [];
  const excluidas = JSON.parse(localStorage.getItem("motos_excluidas")) || [];
  return [...base, ...admin].filter(m => !excluidas.includes(m.id));
}

// ==========================================================================
// ETAPA 1 - LISTA DE ROTAS
// ==========================================================================
function renderizarRotas(rotas) {
  const container = document.getElementById("lista-de-rotas");
  if (!container) return;

  if (rotas.length === 0) {
    container.innerHTML = `<p class="plan-empty">Nenhuma rota encontrada.</p>`;
    return;
  }

  container.innerHTML = rotas.map(rota => `
    <article class="plan-route-card ${rotaSelecionada && rotaSelecionada.id === rota.id ? "selected" : ""}"
             data-id="${rota.id}" tabindex="0">
      <span class="plan-badge">${rota.categoria || "Rota"}</span>
      <h3>${rota.nome}</h3>
      <p class="plan-trecho">${rota.trecho || ""}</p>
      <div class="plan-meta">
        <span>📏 ${rota.distancia}</span>
        ${rota.tempo ? `<span>⏱️ ${rota.tempo}</span>` : ""}
      </div>
      <p class="plan-desc">${rota.descricao || ""}</p>
      <button type="button" class="btn btn-primary btn-full">Selecionar Rota</button>
    </article>
  `).join("");
}

function selecionarRota(id) {
  const rota = obterRotas().find(r => r.id === id);
  if (!rota) return;
  rotaSelecionada = rota;

  document.getElementById("rota-selecionada-info").innerHTML = `
    <span class="plan-badge">${rota.categoria || "Rota"}</span>
    <h4 class="plan-sel-nome">${rota.nome}</h4>
    <p class="plan-trecho">${rota.trecho || ""}</p>
    <div class="plan-meta">
      <span>📏 ${rota.distancia}</span>
      ${rota.tempo ? `<span>⏱️ ${rota.tempo}</span>` : ""}
    </div>
  `;

  document.getElementById("step-rota").classList.add("hidden");
  document.getElementById("step-moto").classList.remove("hidden");
  atualizarEtapa(2);
  limparResultado();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function atualizarEtapa(n) {
  [1, 2, 3].forEach(i => {
    const el = document.getElementById(`step-ind-${i}`);
    el.classList.toggle("active", i <= n);
  });
}

// ==========================================================================
// ETAPA 2 - MOTO
// ==========================================================================
function configurarMoto() {
  const user       = getUsuarioLogado();
  const select     = document.getElementById("select-moto");
  const inputCons  = document.getElementById("input-consumo");
  const motos      = obterMotos();

  // Preenche o select com as motos do catálogo
  select.innerHTML = `<option value="">-- Escolha uma moto --</option>` +
    motos.map(m => {
      const consumo = extrairNumero(m.consumoVelocidade ? m.consumoVelocidade.v80 : m.consumo);
      return `<option value="${m.id}" data-consumo="${isNaN(consumo) ? "" : consumo}"
                      data-tanque="${extrairNumero(m.tanque) || ""}">
                ${m.nome}${isNaN(consumo) ? "" : ` — ${consumo} km/L`}
              </option>`;
    }).join("");

  select.addEventListener("change", () => {
    const opt = select.selectedOptions[0];
    inputCons.value = opt && opt.dataset.consumo ? opt.dataset.consumo : "";
    limparResultado();
  });

  const temMotoNoPerfil = user && (user.vehicleModel || user.consumption);

  if (temMotoNoPerfil) {
    document.getElementById("user-moto-modelo").textContent =
      `${user.vehicleType ? user.vehicleType.toUpperCase() + " · " : ""}${user.vehicleModel || "Modelo não informado"}`;
    document.getElementById("user-moto-consumo").textContent =
      user.consumption ? `⛽ ${user.consumption} km/L` : "⛽ Consumo não informado — informe abaixo";
    mostrarMotoUsuario(true);
  } else {
    mostrarMotoUsuario(false);
    if (!user) document.getElementById("aviso-login").classList.remove("hidden");
  }

  document.getElementById("btn-usar-outra").addEventListener("click", () => mostrarMotoUsuario(false, true));
  document.getElementById("btn-voltar-usuario").addEventListener("click", () => mostrarMotoUsuario(true));
}

function mostrarMotoUsuario(usar, permitirVoltar = false) {
  const user = getUsuarioLogado();
  // Só usa a moto do perfil direto se ela tiver consumo informado
  usandoMotoUsuario = usar && user && user.consumption;

  document.getElementById("moto-usuario-box").classList.toggle("hidden", !usar);
  document.getElementById("moto-select-box").classList.toggle("hidden", usar && !!usandoMotoUsuario);
  document.getElementById("btn-voltar-usuario").classList.toggle("hidden", !permitirVoltar);
  limparResultado();
}

// ==========================================================================
// ETAPA 3 - CÁLCULO
// ==========================================================================
function calcular() {
  if (!rotaSelecionada) return;

  const user = getUsuarioLogado();
  let consumo, tanque = NaN, nomeMoto;

  if (usandoMotoUsuario) {
    consumo  = parseFloat(user.consumption);
    nomeMoto = user.vehicleModel || "Sua moto";
    // tenta achar o tanque no catálogo pelo nome
    const doCatalogo = obterMotos().find(m =>
      user.vehicleModel && m.nome.toLowerCase().includes(user.vehicleModel.toLowerCase()));
    if (doCatalogo) tanque = extrairNumero(doCatalogo.tanque);
  } else {
    const opt = document.getElementById("select-moto").selectedOptions[0];
    consumo   = parseFloat(document.getElementById("input-consumo").value);
    nomeMoto  = opt && opt.value ? opt.textContent.split("—")[0].trim() : (user && user.vehicleModel) || "Moto";
    tanque    = opt && opt.dataset.tanque ? parseFloat(opt.dataset.tanque) : NaN;
  }

  if (isNaN(consumo) || consumo <= 0) {
    alert("Selecione uma moto ou informe um consumo válido (km/L).");
    return;
  }

  const preco     = parseFloat(document.getElementById("input-preco").value) || 0;
  const vezes     = parseInt(document.getElementById("check-ida-volta").value, 10);
  const distancia = extrairNumero(rotaSelecionada.distancia) * vezes;
  const litros    = distancia / consumo;
  const custo     = litros * preco;

  let blocoTanque = "";
  if (!isNaN(tanque) && tanque > 0) {
    // reserva de 15% do tanque por segurança
    const autonomia = tanque * consumo * 0.85;
    const paradas   = Math.max(0, Math.ceil(distancia / autonomia) - 1);
    blocoTanque = `
      <div class="result-item"><span>Tanque</span><strong>${tanque.toFixed(1)} L</strong></div>
      <div class="result-item"><span>Custo para encher o tanque</span><strong>${formatarMoeda(tanque * preco)}</strong></div>
      <div class="result-item"><span>Autonomia segura</span><strong>${autonomia.toFixed(0)} km</strong></div>
      <div class="result-alert ${paradas === 0 ? "ok" : "warn"}">
        ${paradas === 0
          ? "✅ Com o tanque cheio você completa o trajeto sem precisar abastecer."
          : `⛽ Planeje <strong>${paradas}</strong> parada(s) para abastecer — a cada ~${autonomia.toFixed(0)} km.`}
      </div>`;
  }

  document.getElementById("resultado-conteudo").innerHTML = `
    <p class="result-sub">${rotaSelecionada.nome} · ${nomeMoto}</p>
    <div class="result-highlight">
      <span>Custo estimado de combustível</span>
      <strong>${formatarMoeda(custo)}</strong>
    </div>
    <div class="result-item"><span>Distância ${vezes === 2 ? "(ida e volta)" : "(ida)"}</span><strong>${distancia.toFixed(0)} km</strong></div>
    <div class="result-item"><span>Consumo</span><strong>${consumo} km/L</strong></div>
    <div class="result-item"><span>Combustível necessário</span><strong>${litros.toFixed(2)} L</strong></div>
    <div class="result-item"><span>Preço por litro</span><strong>${formatarMoeda(preco)}</strong></div>
    ${rotaSelecionada.tempo && vezes === 1 ? `<div class="result-item"><span>Tempo estimado</span><strong>${rotaSelecionada.tempo}</strong></div>` : ""}
    ${blocoTanque}
  `;

  document.getElementById("resultado-placeholder").classList.add("hidden");
  document.getElementById("resultado-card").classList.remove("hidden");
  atualizarEtapa(3);
}

function limparResultado() {
  document.getElementById("resultado-card").classList.add("hidden");
  document.getElementById("resultado-placeholder").classList.remove("hidden");
  if (rotaSelecionada) atualizarEtapa(2);
}

// ==========================================================================
// INICIALIZAÇÃO
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  const rotas = obterRotas();
  renderizarRotas(rotas);
  configurarMoto();

  // Clique em um card de rota
  document.getElementById("lista-de-rotas").addEventListener("click", (e) => {
    const card = e.target.closest(".plan-route-card");
    if (card) selecionarRota(parseInt(card.dataset.id, 10));
  });

  // Filtro de rotas
  document.getElementById("filtro-rotas").addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase().trim();
    renderizarRotas(obterRotas().filter(r =>
      r.nome.toLowerCase().includes(q) ||
      (r.trecho || "").toLowerCase().includes(q) ||
      (r.categoria || "").toLowerCase().includes(q)));
  });

  // Voltar para lista de rotas
  document.getElementById("btn-trocar-rota").addEventListener("click", () => {
    document.getElementById("step-moto").classList.add("hidden");
    document.getElementById("step-rota").classList.remove("hidden");
    atualizarEtapa(1);
    renderizarRotas(obterRotas());
  });

  document.getElementById("btn-calcular").addEventListener("click", calcular);
  ["input-consumo", "input-preco", "check-ida-volta"].forEach(id =>
    document.getElementById(id).addEventListener("change", limparResultado));

  // Rota vinda da busca da home (?rotaId=) ou dos cards (?destino=)
  const params  = new URLSearchParams(window.location.search);
  const rotaId  = parseInt(params.get("rotaId"), 10);
  const destino = (params.get("destino") || "").toLowerCase();

  if (!isNaN(rotaId)) {
    selecionarRota(rotaId);
  } else if (destino) {
    const achada = rotas.find(r =>
      (r.trecho || "").toLowerCase().includes(destino) || r.nome.toLowerCase().includes(destino));
    if (achada) selecionarRota(achada.id);
    else document.getElementById("filtro-rotas").value = params.get("destino");
  }
});

