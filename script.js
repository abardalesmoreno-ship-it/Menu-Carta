document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".category-buttons button");
  const sections = document.querySelectorAll(".menu-section");

  // mostrar todo al inicio
  sections.forEach(sec => sec.style.display = "block");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const cat = btn.dataset.category;

      // marcar botón activo
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // mostrar/ocultar secciones completas (incluye h2)
      sections.forEach(sec => {
        if (cat === "todos" || sec.dataset.category === cat) {
          sec.style.display = "block";
        } else {
          sec.style.display = "none";
        }
      });

      // opcional: desplazar al primer elemento visible
      const firstVisible = Array.from(sections).find(s => s.style.display === "block");
      if (firstVisible) firstVisible.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});
