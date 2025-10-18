// === FILTRO DE BÚSQUEDA (mejorado) ===
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase().trim();
  const sections = document.querySelectorAll('section');
  let found = false;

  sections.forEach(section => {
    const sectionName = section.getAttribute('data-category').toLowerCase();
    const items = section.querySelectorAll('.menu-item');
    let sectionVisible = false;

    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      const matchItem = text.includes(query);
      const matchCategory = sectionName.includes(query);

      // Si el usuario busca la categoría (ej: "bebidas")
      if (matchCategory) {
        item.style.display = '';
        sectionVisible = true;
        found = true;
      } else if (matchItem) {
        item.style.display = '';
        sectionVisible = true;
        found = true;
      } else {
        item.style.display = 'none';
      }
    });

    // Muestra u oculta la sección completa
    section.style.display = sectionVisible ? 'block' : 'none';
  });

  // Mensaje de "sin resultados"
  let noResults = document.getElementById('noResults');
  if (!found) {
    if (!noResults) {
      noResults = document.createElement('p');
      noResults.id = 'noResults';
      noResults.textContent = 'No se encontraron resultados ';
      document.querySelector('.menu-wrapper').appendChild(noResults);
    }
  } else if (noResults) {
    noResults.remove();
  }
});

// === FUNCIÓN PRINCIPAL PARA FLECHAS (versión mejorada con última imagen visible) ===
function scrollCarousel(id, direction) {
  const carousel = document.getElementById(id);
  if (!carousel) return;

  const item = carousel.querySelector('.menu-item');
  const gap = parseInt(getComputedStyle(carousel).gap) || 16;
  const itemWidth = item ? item.getBoundingClientRect().width : 260;
  const scrollAmount = Math.round(itemWidth + gap);

  // Calcula la nueva posición del scroll
  const newScrollLeft = carousel.scrollLeft + scrollAmount * direction;

  // --- Corrección: permitir ver la última tarjeta completa antes de reiniciar ---
  const nearEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - (itemWidth / 2);

  if (nearEnd && direction === 1) {
    // Si realmente llegó al final → volver al inicio
    carousel.scrollTo({ left: 0, behavior: 'smooth' });
  } else if (newScrollLeft <= 0 && direction === -1) {
    // Si está al inicio y va a la izquierda → saltar al final
    carousel.scrollTo({ left: carousel.scrollWidth - carousel.clientWidth, behavior: 'smooth' });
  } else {
    // Movimiento normal
    carousel.scrollBy({ left: scrollAmount * direction, behavior: 'smooth' });
  }
}



// === INSERTAR FLECHAS AUTOMÁTICAMENTE ===
document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".menu-carousel");

  carousels.forEach((carousel) => {
    const container = document.createElement("div");
    container.classList.add("carousel-container");

    // Crear botones
    const leftBtn = document.createElement("button");
    leftBtn.classList.add("carousel-btn", "left");
    leftBtn.innerHTML = "&#10094;"; // flecha izquierda

    const rightBtn = document.createElement("button");
    rightBtn.classList.add("carousel-btn", "right");
    rightBtn.innerHTML = "&#10095;"; // flecha derecha

    // Insertar en el DOM
    carousel.parentNode.insertBefore(container, carousel);
    container.appendChild(leftBtn);
    container.appendChild(carousel);
    container.appendChild(rightBtn);

    // Eventos para mover el carrusel
    leftBtn.addEventListener("click", () => scrollCarousel(carousel.id, -1));
    rightBtn.addEventListener("click", () => scrollCarousel(carousel.id, 1));
  });
});

// === SOPORTE CON TECLAS (← →) ===
document.querySelectorAll('.menu-carousel').forEach(car => {
  car.setAttribute('tabindex', '0'); // permite foco con Tab
  car.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      car.scrollBy({ left: 260, behavior: 'smooth' });
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      car.scrollBy({ left: -260, behavior: 'smooth' });
    }
  });
});

