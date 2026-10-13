document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // TRAVA DE SEGURANÇA: verifica acesso antes de qualquer coisa
  // ==========================================================================
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (!usuarioLogado || (!usuarioLogado.isAdmin && usuarioLogado.email !== "adm@gmail.com")) {
    alert("Acesso negado! Esta área é exclusiva para o administrador.");
    window.location.href = "login.html";
    return;
  }

  initTabs();
  carregarUsuarios();
  carregarRotas();
  carregarMotos();
  carregarPostagens();

  document.getElementById("form-rota").addEventListener("submit", salvarRota);
  document.getElementById("form-moto").addEventListener("submit", salvarMoto);
});

// NAVEGAÇÃO POR ABAS
function initTabs() {
  const tabs = document.querySelectorAll(".admin-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".admin-tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(`tab-${tab.dataset.tab}`).classList.add("active");
    });
  });
}

// ==========================================
// 1. GERENCIAR USUÁRIOS (GET & DELETE)
// ==========================================
function carregarUsuarios() {
  const usuarios = JSON.parse(localStorage.getItem("usuarios_cadastrados")) || [];
  const tbody = document.getElementById("list-usuarios");
  if (!tbody) return;

  if (usuarios.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; color: #64748b; padding: 1.5rem;">
          Nenhum usuário cadastrado até o momento.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = usuarios.map(u => `
    <tr>
      <td>${u.id}</td>
      <td><strong>${u.nome || "—"}</strong></td>
      <td>${u.nickname || "—"}</td>
      <td>${u.email}</td>
      <td>${u.phone || "—"}</td>
      <td>${u.vehicleType ? u.vehicleType.toUpperCase() + ": " + (u.vehicleModel || "—") : "—"}</td>
      <td>
        <button class="btn-info" onclick="verDetalhesUsuario(${u.id})">Ver</button>
        <button class="btn-danger" onclick="excluirUsuario(${u.id})">Excluir</button>
      </td>
    </tr>
  `).join("");
}

function verDetalhesUsuario(id) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios_cadastrados")) || [];
  const u = usuarios.find(u => u.id === id);
  if (!u) return;

  document.getElementById("detalhe-nome").textContent     = u.nome        || "Não informado";
  document.getElementById("detalhe-nickname").textContent = u.nickname     || "Não informado";
  document.getElementById("detalhe-email").textContent    = u.email        || "Não informado";
  document.getElementById("detalhe-telefone").textContent = u.phone        || "Não informado";
  document.getElementById("detalhe-veiculo").textContent  = u.vehicleType  ? u.vehicleType.toUpperCase() : "Não informado";
  document.getElementById("detalhe-modelo").textContent   = u.vehicleModel || "Não informado";
  document.getElementById("detalhe-consumo").textContent  = u.consumption  ? u.consumption + " km/L" : "Não informado";
  document.getElementById("detalhe-admin").textContent    = u.isAdmin      ? "✅ Sim" : "❌ Não";

  const fotoEl = document.getElementById("detalhe-foto");
  fotoEl.src = u.photo || "assets/login-icon.png";
  fotoEl.style.display = "block";

  document.getElementById("modal-usuario-detalhe").classList.remove("hidden");
}

function excluirUsuario(id) {
  if (!confirm("Tem certeza que deseja excluir este cadastro?")) return;
  let usuarios = JSON.parse(localStorage.getItem("usuarios_cadastrados")) || [];
  usuarios = usuarios.filter(u => u.id !== id);
  localStorage.setItem("usuarios_cadastrados", JSON.stringify(usuarios));
  carregarUsuarios();
}

// ==========================================
// 2. GERENCIAR ROTAS — lê de ROTAS_RS
// ==========================================
function carregarRotas() {
  // Usa o array global ROTAS_RS definido em rotas-data.js
  // Rotas editadas/adicionadas pelo admin ficam em rotas_admin no localStorage
  const rotasGlobais = (typeof ROTAS_RS !== "undefined") ? ROTAS_RS : [];
  const rotasAdmin   = JSON.parse(localStorage.getItem("rotas_admin")) || [];

  // Merge: substituições do admin têm prioridade; novas são acrescentadas
  const idsAdmin   = rotasAdmin.map(r => r.id);
  const rotasBase  = rotasGlobais.filter(r => !idsAdmin.includes(r.id));
  const excluidas  = JSON.parse(localStorage.getItem("rotas_excluidas")) || [];
  const rotas = [...rotasBase, ...rotasAdmin]
    .filter(r => !excluidas.includes(r.id))
    .sort((a, b) => a.id - b.id);

  const tbody = document.getElementById("list-rotas");
  if (!tbody) return;

  if (rotas.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:1.5rem;color:#64748b;">Nenhuma rota cadastrada.</td></tr>`;
    return;
  }

  tbody.innerHTML = rotas.map(r => `
    <tr>
      <td><strong>${r.nome}</strong></td>
      <td>${r.trecho || (r.origem || "") + " → " + (r.destino || "")}</td>
      <td>${r.distancia}</td>
      <td>${r.categoria || "—"}</td>
      <td>
        <button class="btn-warning" onclick="editarRota(${r.id})">Editar</button>
        <button class="btn-danger"  onclick="excluirRota(${r.id})">Excluir</button>
      </td>
    </tr>
  `).join("");
}

function abrirModalRota() {
  document.getElementById("modal-rota-titulo").innerText = "Cadastrar Rota";
  document.getElementById("form-rota").reset();
  document.getElementById("rota-id").value = "";
  document.getElementById("modal-rota").classList.remove("hidden");
}

function salvarRota(e) {
  e.preventDefault();
  const id = document.getElementById("rota-id").value;
  let rotasAdmin = JSON.parse(localStorage.getItem("rotas_admin")) || [];

  const dadosRota = {
    id:        id ? parseInt(id) : Date.now(),
    nome:      document.getElementById("rota-nome").value,
    trecho:    document.getElementById("rota-origem").value + " → " + document.getElementById("rota-destino").value,
    origem:    document.getElementById("rota-origem").value,
    destino:   document.getElementById("rota-destino").value,
    distancia: document.getElementById("rota-distancia").value,
    categoria: ""
  };

  if (id) {
    rotasAdmin = rotasAdmin.map(r => r.id === parseInt(id) ? dadosRota : r);
    // Se a rota original é do ROTAS_RS e não estava no admin ainda, adiciona ela editada
    const jaEsta = rotasAdmin.some(r => r.id === parseInt(id));
    if (!jaEsta) rotasAdmin.push(dadosRota);
  } else {
    rotasAdmin.push(dadosRota);
  }

  localStorage.setItem("rotas_admin", JSON.stringify(rotasAdmin));
  fecharModais();
  carregarRotas();
}

function editarRota(id) {
  // Busca tanto no ROTAS_RS quanto no rotas_admin
  const rotasGlobais = (typeof ROTAS_RS !== "undefined") ? ROTAS_RS : [];
  const rotasAdmin   = JSON.parse(localStorage.getItem("rotas_admin")) || [];
  const rota = rotasAdmin.find(r => r.id === id) || rotasGlobais.find(r => r.id === id);
  if (!rota) return;

  document.getElementById("modal-rota-titulo").innerText = "Alterar Rota";
  document.getElementById("rota-id").value       = rota.id;
  document.getElementById("rota-nome").value     = rota.nome;
  document.getElementById("rota-origem").value   = rota.origem   || "";
  document.getElementById("rota-destino").value  = rota.destino  || "";
  document.getElementById("rota-distancia").value= rota.distancia;

  document.getElementById("modal-rota").classList.remove("hidden");
}

function excluirRota(id) {
  if (!confirm("Excluir esta rota permanentemente?")) return;

  // Remove do rotas_admin (se estiver lá)
  let rotasAdmin = JSON.parse(localStorage.getItem("rotas_admin")) || [];
  rotasAdmin = rotasAdmin.filter(r => r.id !== id);
  localStorage.setItem("rotas_admin", JSON.stringify(rotasAdmin));

  // Marca como excluída para ocultar das rotas base também
  let excluidas = JSON.parse(localStorage.getItem("rotas_excluidas")) || [];
  if (!excluidas.includes(id)) excluidas.push(id);
  localStorage.setItem("rotas_excluidas", JSON.stringify(excluidas));

  carregarRotas();
}

// ==========================================
// 3. GERENCIAR MOTOS — lê de MOTOS_DATA
// ==========================================
function carregarMotos() {
  // Usa o array global MOTOS_DATA definido em motos-data.js
  const motosGlobais = (typeof MOTOS_DATA !== "undefined") ? MOTOS_DATA : [];
  const motosAdmin   = JSON.parse(localStorage.getItem("motos_admin")) || [];
  const excluidas    = JSON.parse(localStorage.getItem("motos_excluidas")) || [];

  const idsAdmin  = motosAdmin.map(m => m.id);
  const motosBase = motosGlobais.filter(m => !idsAdmin.includes(m.id));
  const motos = [...motosBase, ...motosAdmin]
    .filter(m => !excluidas.includes(m.id))
    .sort((a, b) => a.id - b.id);

  const tbody = document.getElementById("list-motos");
  if (!tbody) return;

  if (motos.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:1.5rem;color:#64748b;">Nenhuma moto cadastrada.</td></tr>`;
    return;
  }

  tbody.innerHTML = motos.map(m => {
    const imgSrc = m.imagem
      ? (m.imagem.startsWith("assets/") ? m.imagem : `assets/${m.imagem}`)
      : "assets/login-icon.png";
    return `
    <tr>
      <td><img src="${imgSrc}" style="height:50px;object-fit:contain;" onerror="this.src='assets/login-icon.png'"></td>
      <td><strong>${m.nome}</strong></td>
      <td>${m.marca}</td>
      <td>${m.cilindrada}</td>
      <td>${m.potencia || "—"}</td>
      <td>
        <button class="btn-danger" onclick="excluirMoto(${m.id})">Excluir</button>
      </td>
    </tr>`;
  }).join("");
}

function abrirModalMoto() {
  document.getElementById("form-moto").reset();
  document.getElementById("modal-moto").classList.remove("hidden");
}

function salvarMoto(e) {
  e.preventDefault();
  let motosAdmin = JSON.parse(localStorage.getItem("motos_admin")) || [];

  const novaMoto = {
    id:         Date.now(),
    nome:       document.getElementById("moto-nome").value,
    marca:      document.getElementById("moto-marca").value,
    cilindrada: document.getElementById("moto-cilindrada").value,
    imagem:     document.getElementById("moto-imagem").value,
    potencia:   ""
  };

  motosAdmin.push(novaMoto);
  localStorage.setItem("motos_admin", JSON.stringify(motosAdmin));
  fecharModais();
  carregarMotos();
}

function excluirMoto(id) {
  if (!confirm("Excluir esta moto?")) return;

  let motosAdmin = JSON.parse(localStorage.getItem("motos_admin")) || [];
  motosAdmin = motosAdmin.filter(m => m.id !== id);
  localStorage.setItem("motos_admin", JSON.stringify(motosAdmin));

  let excluidas = JSON.parse(localStorage.getItem("motos_excluidas")) || [];
  if (!excluidas.includes(id)) excluidas.push(id);
  localStorage.setItem("motos_excluidas", JSON.stringify(excluidas));

  carregarMotos();
}

// ==========================================
// 4. GERENCIAR POSTAGENS (GET & DELETE)
// ==========================================
function carregarPostagens() {
  const postagens = JSON.parse(localStorage.getItem("postagens_forum")) || [];
  const tbody = document.getElementById("list-postagens");
  if (!tbody) return;

  if (postagens.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;padding:1.5rem;color:#64748b;">Nenhuma postagem encontrada.</td></tr>`;
    return;
  }

  tbody.innerHTML = postagens.map(p => `
    <tr>
      <td><strong>${p.autor}</strong></td>
      <td>${p.texto}</td>
      <td>${p.data}</td>
      <td>
        <button class="btn-danger" onclick="excluirPostagem(${p.id})">Excluir</button>
      </td>
    </tr>
  `).join("");
}

function excluirPostagem(id) {
  if (!confirm("Excluir esta publicação?")) return;
  let postagens = JSON.parse(localStorage.getItem("postagens_forum")) || [];
  postagens = postagens.filter(p => p.id !== id);
  localStorage.setItem("postagens_forum", JSON.stringify(postagens));
  carregarPostagens();
}

// Utilitário para fechar modais
function fecharModais() {
  document.querySelectorAll(".modal-backdrop").forEach(m => m.classList.add("hidden"));
}