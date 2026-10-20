document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".carousel-slide");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  
  if (slides.length === 0) return;

  let currentIndex = 0;
  let autoPlayInterval;

  function updateCarousel() {
    slides.forEach((slide, index) => {
      slide.classList.remove("active", "prev", "next");

      if (index === currentIndex) {
        slide.classList.add("active");
      } else if (index === (currentIndex - 1 + slides.length) % slides.length) {
        slide.classList.add("prev");
      } else if (index === (currentIndex + 1) % slides.length) {
        slide.classList.add("next");
      }
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayInterval = setInterval(nextSlide, 3000);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  nextBtn.addEventListener("click", () => {
    nextSlide();
    startAutoPlay();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    startAutoPlay();
  });

  const carouselContainer = document.querySelector(".carousel-container");
  carouselContainer.addEventListener("mouseenter", stopAutoPlay);
  carouselContainer.addEventListener("mouseleave", startAutoPlay);

  // Deslizar o dedo para trocar de imagem (celular)
  let toqueInicioX = null;
  carouselContainer.addEventListener("touchstart", (e) => {
    toqueInicioX = e.touches[0].clientX;
    stopAutoPlay();
  }, { passive: true });

  carouselContainer.addEventListener("touchend", (e) => {
    if (toqueInicioX === null) return;
    const diferenca = e.changedTouches[0].clientX - toqueInicioX;
    if (Math.abs(diferenca) > 40) {
      diferenca < 0 ? nextSlide() : prevSlide();
    }
    toqueInicioX = null;
    startAutoPlay();
  });

  updateCarousel();
  startAutoPlay();
});
