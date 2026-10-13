// ==========================================================================
// login.js - Sistema de Autenticação do RotaRS
// ==========================================================================

// ==========================================================================
// 1. INICIALIZAÇÃO DA CONTA ADMINISTRADORA PADRÃO
//    (Executado imediatamente, antes do DOM estar pronto)
// ==========================================================================
(function inicializarAdmin() {
  let usuarios = JSON.parse(localStorage.getItem("usuarios_cadastrados")) || [];

  const indexAdmin = usuarios.findIndex(u => u.email === "adm@gmail.com");

  const dadosAdmin = {
    id: 999,
    nome: "Administrador",
    nickname: "ADM",
    email: "adm@gmail.com",
    senha: "63639707Aa@",
    isAdmin: true
  };

  if (indexAdmin === -1) {
    usuarios.push(dadosAdmin);
  } else {
    // Garante que os dados do admin estejam sempre atualizados
    usuarios[indexAdmin] = { ...usuarios[indexAdmin], ...dadosAdmin };
  }

  localStorage.setItem("usuarios_cadastrados", JSON.stringify(usuarios));
})();

// ==========================================================================
// 2. LÓGICA PRINCIPAL (DOM pronto)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {

  // --- Elementos do DOM ---
  const tabLogin    = document.getElementById("tab-login");
  const tabRegister = document.getElementById("tab-register");
  const panelLogin    = document.getElementById("panel-login");
  const panelRegister = document.getElementById("panel-register");
  const panelProfile  = document.getElementById("panel-profile");

  const formLogin    = document.getElementById("form-login");
  const formRegister = document.getElementById("form-register");

  const selectVehicleType      = document.getElementById("reg-vehicletype");
  const conditionalFields      = document.getElementById("conditional-vehicle-fields");
  const inputModel             = document.getElementById("reg-vehiclemodel");
  const inputConsumption       = document.getElementById("reg-consumption");
  const inputPhoto             = document.getElementById("reg-vehiclephoto");
  const photoPreview           = document.getElementById("photo-preview");
  const photoPreviewContainer  = document.getElementById("photo-preview-container");

  let base64Photo = "";

  // ==========================================================================
  // 3. VERIFICAR SE USUÁRIO JÁ ESTÁ LOGADO (ao abrir a página)
  // ==========================================================================
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (usuarioLogado && usuarioLogado.email) {
    // Usuário já autenticado: exibe o perfil direto
    renderProfile(usuarioLogado);
  }

  // ==========================================================================
  // 4. CONTROLE DAS ABAS (Entrar / Registrar)
  // ==========================================================================
  tabLogin.addEventListener("click", () => {
    tabLogin.classList.add("active");
    tabRegister.classList.remove("active");
    panelLogin.classList.remove("hidden");
    panelRegister.classList.add("hidden");
  });

  tabRegister.addEventListener("click", () => {
    tabRegister.classList.add("active");
    tabLogin.classList.remove("active");
    panelRegister.classList.remove("hidden");
    panelLogin.classList.add("hidden");
  });

  // ==========================================================================
  // 5. PREVIEW DA FOTO DO VEÍCULO (Base64)
  // ==========================================================================
  inputPhoto.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (evt) {
        base64Photo = evt.target.result;
        photoPreview.src = base64Photo;
        photoPreviewContainer.classList.remove("hidden");
      };
      reader.readAsDataURL(file);
    }
  });

  // ==========================================================================
  // 6. CAMPOS CONDICIONAIS DE VEÍCULO (Modelo + Consumo)
  // ==========================================================================
  selectVehicleType.addEventListener("change", (e) => {
    const val = e.target.value;
    if (val === "moto" || val === "carro") {
      conditionalFields.classList.remove("hidden");
      inputModel.setAttribute("required", "true");
      inputConsumption.setAttribute("required", "true");
    } else {
      conditionalFields.classList.add("hidden");
      inputModel.removeAttribute("required");
      inputConsumption.removeAttribute("required");
      inputModel.value = "";
      inputConsumption.value = "";
    }
  });

  // ==========================================================================
  // 7. VALIDAÇÃO DO FORMULÁRIO DE LOGIN (ENTRAR)
  // ==========================================================================
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailInput = document.getElementById("login-email").value.trim();
    const senhaInput = document.getElementById("login-password").value;

    const errEmail  = document.getElementById("err-login-email");
    const errSenha  = document.getElementById("err-login-password");

    // Limpa erros anteriores
    errEmail.textContent = "";
    errSenha.textContent = "";
    document.getElementById("login-email").classList.remove("invalid");
    document.getElementById("login-password").classList.remove("invalid");

    // Validação básica dos campos
    if (!emailInput) {
      errEmail.textContent = "Informe o e-mail ou apelido.";
      document.getElementById("login-email").classList.add("invalid");
      return;
    }
    if (!senhaInput) {
      errSenha.textContent = "Informe a senha.";
      document.getElementById("login-password").classList.add("invalid");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios_cadastrados")) || [];

    // Busca por e-mail OU apelido (case-insensitive)
    const usuarioEncontrado = usuarios.find(
      u => u.email.toLowerCase() === emailInput.toLowerCase() ||
           (u.nickname && u.nickname.toLowerCase() === emailInput.toLowerCase())
    );

    if (!usuarioEncontrado) {
      errEmail.textContent = "E-mail ou apelido não cadastrado.";
      document.getElementById("login-email").classList.add("invalid");
      return;
    }

    if (usuarioEncontrado.senha !== senhaInput) {
      errSenha.textContent = "Senha incorreta. Tente novamente.";
      document.getElementById("login-password").classList.add("invalid");
      return;
    }

    // ✅ Login bem-sucedido — salva sessão
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
    localStorage.setItem("RS_MOTOS_LOGGED_USER", JSON.stringify(usuarioEncontrado));

    // Redirecionamento condicional: admin vai para o painel, usuário normal para home
    if (usuarioEncontrado.isAdmin || usuarioEncontrado.email === "adm@gmail.com") {
      alert("Bem-vindo, Administrador!");
      window.location.href = "admin.html";
    } else {
      alert(`Bem-vindo de volta, ${usuarioEncontrado.nickname || usuarioEncontrado.nome}!`);
      window.location.href = "index.html";
    }
  });

  // ==========================================================================
  // 8. VALIDAÇÃO DO FORMULÁRIO DE CADASTRO (CRIAR CONTA)
  // ==========================================================================
  formRegister.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;

    // Função auxiliar para exibir/limpar erros inline
    const setError = (idInput, idErr, msg) => {
      const input = document.getElementById(idInput);
      const err   = document.getElementById(idErr);
      if (msg) {
        input.classList.add("invalid");
        err.textContent = msg;
        isValid = false;
      } else {
        input.classList.remove("invalid");
        err.textContent = "";
      }
    };

    // Validação 1: Nome Completo
    const fullname = document.getElementById("reg-fullname").value.trim();
    setError("reg-fullname", "err-reg-fullname",
      fullname.length < 3 ? "Nome completo precisa ter pelo menos 3 caracteres." : "");

    // Validação 2: Apelido
    const nickname = document.getElementById("reg-nickname").value.trim();
    setError("reg-nickname", "err-reg-nickname",
      nickname.length < 2 ? "Apelido precisa ter pelo menos 2 letras." : "");

    // Validação 3: E-mail
    const email = document.getElementById("reg-email").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setError("reg-email", "err-reg-email",
      !emailRegex.test(email) ? "Informe um e-mail válido." : "");

    // Validação 4: Telefone
    const phone = document.getElementById("reg-phone").value.trim();
    setError("reg-phone", "err-reg-phone",
      phone.length < 8 ? "Telefone inválido. Digite com DDD." : "");

    // Validação 5: Senha
    const password = document.getElementById("reg-password").value;
    setError("reg-password", "err-reg-password",
      password.length < 6 ? "A senha precisa ter pelo menos 6 caracteres." : "");

    // Validação 6: Tipo de Veículo
    const vehicleType = selectVehicleType.value;
    setError("reg-vehicletype", "err-reg-vehicletype",
      !vehicleType ? "Selecione o tipo de veículo." : "");

    // Validação 7 e 8: Modelo e Consumo (apenas se veículo selecionado)
    if (vehicleType) {
      const model = inputModel.value.trim();
      setError("reg-vehiclemodel", "err-reg-vehiclemodel",
        !model ? "Informe o modelo do veículo." : "");

      const consumption = parseFloat(inputConsumption.value);
      setError("reg-consumption", "err-reg-consumption",
        isNaN(consumption) || consumption <= 0 ? "Informe um consumo válido (maior que zero)." : "");
    }

    if (!isValid) return; // Para aqui se houver erros

    // Verifica se e-mail já está cadastrado
    const usuariosExistentes = JSON.parse(localStorage.getItem("usuarios_cadastrados")) || [];
    const emailJaCadastrado = usuariosExistentes.some(
      u => u.email.toLowerCase() === email.toLowerCase()
    );

    if (emailJaCadastrado) {
      setError("reg-email", "err-reg-email", "Este e-mail já está cadastrado.");
      return;
    }

    // ✅ Todos os campos válidos — monta objeto do novo usuário
    const novoUsuario = {
      id: Date.now(),
      nome: fullname,
      nickname: nickname,
      email: email,
      phone: phone,
      senha: password,
      vehicleType: vehicleType,
      vehicleModel: inputModel.value.trim(),
      consumption: parseFloat(inputConsumption.value),
      photo: base64Photo || "",
      isAdmin: false
    };

    // Salva na lista de usuários cadastrados
    usuariosExistentes.push(novoUsuario);
    localStorage.setItem("usuarios_cadastrados", JSON.stringify(usuariosExistentes));

    // Loga automaticamente após o cadastro
    localStorage.setItem("usuarioLogado", JSON.stringify(novoUsuario));
    localStorage.setItem("RS_MOTOS_LOGGED_USER", JSON.stringify(novoUsuario));

    alert("Conta criada com sucesso! Bem-vindo ao RotaRS.");
    window.location.href = "index.html";
  });

  // ==========================================================================
  // 9. RENDERIZAR PERFIL DO USUÁRIO LOGADO
  // ==========================================================================
  function renderProfile(user) {
    // Oculta abas e painéis de auth, exibe o perfil
    const authTabs = document.querySelector(".auth-tabs");
    if (authTabs) authTabs.classList.add("hidden");
    panelLogin.classList.add("hidden");
    panelRegister.classList.add("hidden");
    panelProfile.classList.remove("hidden");

    const displayNickname = user.nickname || user.nome || "Piloto";
    const displayName     = user.nome || user.name || "";
    const vType           = user.vehicleType || "";
    const vModel          = user.vehicleModel || "";
    const vConsumption    = user.consumption  || "";

    document.getElementById("user-display-nickname").textContent = `Olá, ${displayNickname}!`;
    document.getElementById("user-display-name").textContent     = displayName;

    if (vType && vModel) {
      document.getElementById("user-display-vehicle").textContent =
        `${vType.toUpperCase()}: ${vModel}${vConsumption ? " (" + vConsumption + " km/L)" : ""}`;
    } else {
      document.getElementById("user-display-vehicle").textContent = "Veículo não cadastrado";
    }

    const vehicleImg = document.getElementById("user-vehicle-img");
    if (user.photo) {
      vehicleImg.src = user.photo;
      vehicleImg.dataset.type = "photo"; // foto real → object-fit: cover
    } else {
      vehicleImg.src = "assets/login-icon.png";
      vehicleImg.dataset.type = "icon";  // ícone padrão → object-fit: contain
    }

    loadRouteHistory();
  }

  // ==========================================================================
  // 10. CARREGAR HISTÓRICO DE ROTAS
  // ==========================================================================
  async function loadRouteHistory() {
    const list = document.getElementById("history-list");
    if (!list) return;

    list.innerHTML = "<li>Carregando rotas...</li>";

    try {
      const db = JSON.parse(localStorage.getItem("RS_MOTOS_DB"));
      if (!db || !db.routes || db.routes.length === 0) {
        list.innerHTML = "<li>Nenhuma rota salva ainda.</li>";
        return;
      }

      list.innerHTML = "";
      db.routes.forEach(route => {
        const li = document.createElement("li");
        li.className = "history-item";
        li.innerHTML = `
          <div>
            <strong>${route.origin} ➔ ${route.destination}</strong>
            <br><small>${route.distanceKm} km</small>
          </div>
          <button class="btn-danger-sm" onclick="deleteRoute('${route.id}')">Excluir</button>
        `;
        list.appendChild(li);
      });
    } catch (err) {
      list.innerHTML = "<li>Erro ao carregar rotas.</li>";
    }
  }

  // ==========================================================================
  // 11. EXCLUIR ROTA DO HISTÓRICO (exposta globalmente para uso no onclick)
  // ==========================================================================
  window.deleteRoute = (id) => {
    if (confirm("Deseja realmente remover esta rota do seu histórico?")) {
      let db = JSON.parse(localStorage.getItem("RS_MOTOS_DB"));
      if (db && db.routes) {
        db.routes = db.routes.filter(r => r.id !== id);
        localStorage.setItem("RS_MOTOS_DB", JSON.stringify(db));
        loadRouteHistory();
      }
    }
  };

  // ==========================================================================
  // 12. BOTÃO SAIR (Logout)
  // ==========================================================================
  const btnLogout = document.getElementById("btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      localStorage.removeItem("usuarioLogado");
      localStorage.removeItem("RS_MOTOS_LOGGED_USER");
      window.location.reload();
    });
  }

}); // fim DOMContentLoaded