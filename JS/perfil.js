// ==========================================================================
// perfil.js - Página de Perfil do Usuário
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {

  // Lê o usuário logado — compatível com login.js (que salva como "nome")
  // e com o perfil antigo (que usava "name")
  let user = JSON.parse(localStorage.getItem("RS_MOTOS_LOGGED_USER")) ||
             JSON.parse(localStorage.getItem("usuarioLogado"));

  // Se não estiver logado, redireciona para o login
  if (!user) {
    alert("Você precisa estar logado para acessar o perfil.");
    window.location.href = "login.html";
    return;
  }

  // Normaliza os campos: garante que "name" e "nome" funcionem juntos
  user.name     = user.name     || user.nome     || "";
  user.nickname = user.nickname || user.name || "Piloto";
  user.nome     = user.name;

  // Garante existência do objeto de privacidade
  if (!user.privacy) {
    user.privacy = {
      hideAge: false, hideEmail: false, hideVehicle: false,
      hidePhotos: false, hideRoutes: false
    };
  }

  // Garante existência do array de fotos
  if (!user.photos) user.photos = [];

  // Renderiza o perfil na tela
  renderProfile(user);

  // ==========================================================================
  // NAVEGAÇÃO ENTRE VISÃO DE PERFIL E EDITAR PERFIL
  // ==========================================================================
  const viewProfile = document.getElementById("view-profile");
  const viewEdit    = document.getElementById("view-edit-profile");
  const btnGoEdit   = document.getElementById("btn-go-edit");
  const btnBack     = document.getElementById("btn-back-to-profile");

  btnGoEdit.addEventListener("click", () => {
    document.getElementById("edit-name").value          = user.name || "";
    document.getElementById("edit-nickname").value      = user.nickname || "";
    document.getElementById("edit-bio").value           = user.bio || "";
    document.getElementById("edit-age").value           = user.age || "";
    document.getElementById("edit-vehicle-model").value = user.vehicleModel || "";
    document.getElementById("edit-consumption").value   = user.consumption || "";

    document.getElementById("priv-age").checked     = !!user.privacy.hideAge;
    document.getElementById("priv-email").checked   = !!user.privacy.hideEmail;
    document.getElementById("priv-vehicle").checked = !!user.privacy.hideVehicle;
    document.getElementById("priv-photos").checked  = !!user.privacy.hidePhotos;
    document.getElementById("priv-routes").checked  = !!user.privacy.hideRoutes;

    viewProfile.classList.add("hidden");
    viewEdit.classList.remove("hidden");
  });

  btnBack.addEventListener("click", (e) => {
    e.preventDefault();
    viewEdit.classList.add("hidden");
    viewProfile.classList.remove("hidden");
  });

  // ==========================================================================
  // TROCA DE ABAS NA EDIÇÃO (ESTILO STEAM)
  // ==========================================================================
  const tabBtns   = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b)   => b.classList.remove("active"));
      tabPanels.forEach((p) => p.classList.add("hidden"));

      btn.classList.add("active");
      document.getElementById(btn.getAttribute("data-tab")).classList.remove("hidden");
    });
  });

  // ==========================================================================
  // SALVAR FORMULÁRIO DE EDIÇÃO
  // ==========================================================================
  document.getElementById("form-edit-profile").addEventListener("submit", (e) => {
    e.preventDefault();

    user.name         = document.getElementById("edit-name").value.trim();
    user.nome         = user.name; // mantém compatibilidade com login.js
    user.nickname     = document.getElementById("edit-nickname").value.trim();
    user.bio          = document.getElementById("edit-bio").value.trim();
    user.age          = document.getElementById("edit-age").value.trim();
    user.vehicleModel = document.getElementById("edit-vehicle-model").value.trim();
    user.consumption  = parseFloat(document.getElementById("edit-consumption").value) || "";

    user.privacy = {
      hideAge:     document.getElementById("priv-age").checked,
      hideEmail:   document.getElementById("priv-email").checked,
      hideVehicle: document.getElementById("priv-vehicle").checked,
      hidePhotos:  document.getElementById("priv-photos").checked,
      hideRoutes:  document.getElementById("priv-routes").checked
    };

    // Salva em AMBAS as chaves para consistência
    localStorage.setItem("RS_MOTOS_LOGGED_USER", JSON.stringify(user));
    localStorage.setItem("usuarioLogado", JSON.stringify(user));

    renderProfile(user);
    viewEdit.classList.add("hidden");
    viewProfile.classList.remove("hidden");
  });

  // ==========================================================================
  // PUBLICAR NOVA FOTO (UPLOAD REAL)
  // ==========================================================================
  const modalUpload = document.getElementById("modal-upload");
  document.getElementById("btn-open-upload").addEventListener("click",  () => modalUpload.classList.remove("hidden"));
  document.getElementById("btn-close-upload").addEventListener("click", () => modalUpload.classList.add("hidden"));

  document.getElementById("form-upload-photo").addEventListener("submit", async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById("photo-file");
    const captionInput = document.getElementById("photo-caption");
    const captionText = captionInput.value.trim();

    if (fileInput.files && fileInput.files.length > 0) {
      const files = Array.from(fileInput.files);
      const readPromises = files.map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => resolve(event.target.result);
          reader.readAsDataURL(file);
        });
      });

      const results = await Promise.all(readPromises);
      // As fotos mais recentes primeiro
      results.reverse().forEach(url => {
        user.photos.unshift({ url: url, caption: captionText });
      });

      localStorage.setItem("RS_MOTOS_LOGGED_USER", JSON.stringify(user));
      localStorage.setItem("usuarioLogado", JSON.stringify(user));
      renderGallery(user.photos);
      modalUpload.classList.add("hidden");
      captionInput.value = "";
      fileInput.value = "";
    }
  });

  // ==========================================================================
  // LIGHTBOX (EXPANDIR FOTO)
  // ==========================================================================
  const modalLightbox = document.getElementById("modal-lightbox");
  document.getElementById("btn-close-lightbox").addEventListener("click", () => modalLightbox.classList.add("hidden"));
  modalLightbox.addEventListener("click", (e) => {
    if (e.target === modalLightbox) modalLightbox.classList.add("hidden");
  });
});

// ==========================================================================
// RENDERIZAR PERFIL (função única, sem duplicata)
// ==========================================================================
function renderProfile(user) {
  const displayName = user.name || user.nome || "Usuário";

  document.getElementById("profile-name").textContent     = displayName;
  document.getElementById("profile-nickname").textContent = `@${user.nickname || "usuario"}`;
  document.getElementById("profile-bio").textContent      = user.bio || "Nenhuma descrição informada.";

  // Avatar: foto ou inicial do nome
  const avatar = document.getElementById("profile-avatar");
  if (user.photo) {
    avatar.innerHTML = `<img src="${user.photo}" alt="Avatar" style="width:100%;height:100%;border-radius:50%;object-fit:cover;" />`;
  } else {
    avatar.textContent = (displayName || "U").charAt(0).toUpperCase();
  }

  // Privacidade — Idade
  document.getElementById("profile-age").textContent =
    user.privacy.hideAge ? "🔒 Ocultado" : (user.age ? `${user.age} anos` : "Não informada");

  // Privacidade — E-mail
  document.getElementById("profile-email").textContent =
    user.privacy.hideEmail ? "🔒 Ocultado" : (user.email || "Não informado");

  // Privacidade — Veículo
  const vehicleDetails  = document.getElementById("vehicle-details");
  const vehicleHiddenMsg = document.getElementById("vehicle-hidden-msg");
  if (user.privacy.hideVehicle) {
    vehicleDetails.classList.add("hidden");
    vehicleHiddenMsg.classList.remove("hidden");
  } else {
    vehicleDetails.classList.remove("hidden");
    vehicleHiddenMsg.classList.add("hidden");
    document.getElementById("profile-vehicle-model").textContent      = user.vehicleModel || "Não informado";
    document.getElementById("profile-vehicle-consumption").textContent = user.consumption  || "--";
  }

  // Privacidade — Galeria
  const galleryContainer = document.getElementById("gallery-container");
  const photosHiddenMsg  = document.getElementById("photos-hidden-msg");
  if (user.privacy.hidePhotos) {
    galleryContainer.classList.add("hidden");
    photosHiddenMsg.classList.remove("hidden");
  } else {
    galleryContainer.classList.remove("hidden");
    photosHiddenMsg.classList.add("hidden");
    renderGallery(user.photos || []);
  }

  // Privacidade — Rotas
  const routesContainer = document.getElementById("routes-container");
  const routesHiddenMsg = document.getElementById("routes-hidden-msg");
  if (user.privacy.hideRoutes) {
    routesContainer.classList.add("hidden");
    routesHiddenMsg.classList.remove("hidden");
  } else {
    routesContainer.classList.remove("hidden");
    routesHiddenMsg.classList.add("hidden");
  }
}

// ==========================================================================
// GALERIA DE FOTOS
// ==========================================================================
function renderGallery(photos) {
  const container = document.getElementById("gallery-container");
  if (!photos || photos.length === 0) {
    container.innerHTML = `<p style="color:#718096;font-size:0.88rem;grid-column:1/-1;">Sua galeria está vazia. Clique em "+ Postar Foto" para adicionar fotos!</p>`;
    return;
  }

  container.innerHTML = photos.map((photo, index) => `
    <div class="gallery-thumb" onclick="openLightbox(${index})">
      <img src="${photo.url}" alt="${photo.caption}" />
      <div class="gallery-thumb-caption">${photo.caption}</div>
    </div>
  `).join("");

  window.currentGalleryPhotos = photos;
}

window.currentLightboxIndex = -1;

function openLightbox(index) {
  window.currentLightboxIndex = index;
  const photo = window.currentGalleryPhotos[index];
  if (!photo) return;

  document.getElementById("lightbox-img").src = photo.url;

  const captionEl = document.getElementById("lightbox-caption");
  if (captionEl) {
    captionEl.textContent = photo.caption || "(sem legenda)";
    captionEl.classList.remove("hidden");
  }

  const inputEl = document.getElementById("lightbox-caption-input");
  if (inputEl) {
    inputEl.value = photo.caption || "";
    inputEl.classList.add("hidden");
  }

  const editBtn = document.getElementById("btn-edit-caption");
  if (editBtn) editBtn.classList.remove("hidden");

  const saveBtn = document.getElementById("btn-save-caption");
  if (saveBtn) saveBtn.classList.add("hidden");

  // Preenche nome e avatar no painel lateral
  const user = JSON.parse(localStorage.getItem("RS_MOTOS_LOGGED_USER")) ||
               JSON.parse(localStorage.getItem("usuarioLogado"));
  if (user) {
    const nameEl = document.getElementById("lb-user-name");
    if (nameEl) nameEl.textContent = user.name || user.nome || "Usuario";

    const avatarEl = document.getElementById("lb-user-avatar");
    if (avatarEl) {
      if (user.photo) {
        avatarEl.innerHTML = '<img src="' + user.photo + '" alt="Avatar">';
      } else {
        const displayName = user.name || user.nome || "U";
        avatarEl.textContent = displayName.charAt(0).toUpperCase();
      }
    }
  }

  document.getElementById("modal-lightbox").classList.remove("hidden");
}

function updateGalleryStorage() {
  let user = JSON.parse(localStorage.getItem("RS_MOTOS_LOGGED_USER")) || JSON.parse(localStorage.getItem("usuarioLogado"));
  user.photos = window.currentGalleryPhotos;
  localStorage.setItem("RS_MOTOS_LOGGED_USER", JSON.stringify(user));
  localStorage.setItem("usuarioLogado", JSON.stringify(user));
  renderGallery(user.photos);
}

document.addEventListener("DOMContentLoaded", () => {
    // A��es do Lightbox
    const btnEdit = document.getElementById("btn-edit-caption");
    const btnSave = document.getElementById("btn-save-caption");
    const inputCaption = document.getElementById("lightbox-caption-input");
    const textCaption = document.getElementById("lightbox-caption");
    const btnDelete = document.getElementById("btn-delete-photo");
    const fileChange = document.getElementById("lightbox-change-photo");

    if(btnEdit) {
        btnEdit.addEventListener("click", () => {
            textCaption.classList.add("hidden");
            inputCaption.classList.remove("hidden");
            btnEdit.classList.add("hidden");
            btnSave.classList.remove("hidden");
            inputCaption.focus();
        });
    }

    if(btnSave) {
        btnSave.addEventListener("click", () => {
            if(window.currentLightboxIndex >= 0) {
                window.currentGalleryPhotos[window.currentLightboxIndex].caption = inputCaption.value.trim();
                textCaption.textContent = inputCaption.value.trim();
                updateGalleryStorage();
                
                textCaption.classList.remove("hidden");
                inputCaption.classList.add("hidden");
                btnEdit.classList.remove("hidden");
                btnSave.classList.add("hidden");
            }
        });
    }

    if(btnDelete) {
        btnDelete.addEventListener("click", () => {
            if(window.currentLightboxIndex >= 0 && confirm("Tem certeza que deseja excluir esta foto?")) {
                window.currentGalleryPhotos.splice(window.currentLightboxIndex, 1);
                updateGalleryStorage();
                document.getElementById("modal-lightbox").classList.add("hidden");
            }
        });
    }

    if(fileChange) {
        fileChange.addEventListener("change", (e) => {
            if(e.target.files && e.target.files[0] && window.currentLightboxIndex >= 0) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    window.currentGalleryPhotos[window.currentLightboxIndex].url = event.target.result;
                    document.getElementById("lightbox-img").src = event.target.result;
                    updateGalleryStorage();
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        });
    }
});
