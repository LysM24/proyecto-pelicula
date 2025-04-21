const peliculas = [
  { titulo: "Maleficio", enlace: "maleficio.html", portada: "maleficio.jpg" },
  { titulo: "The Ring", enlace: "the-ring.html", portada: "the-ring.jpg" },
  { titulo: "The Ring 2", enlace: "the-ring2.html", portada: "the-ring2.jpg" },
  { titulo: "The Ring 3", enlace: "the-ring3.html", portada: "the-ring3.jpg" },
];

function buscarPelicula() {
  const query = document.getElementById("search-input").value.toLowerCase();
  const resultados = document.getElementById("resultados");
  const catalogo = document.querySelector(".catalogo");
  resultados.innerHTML = "";
  const peliculasFiltradas = peliculas.filter(p =>
    p.titulo.toLowerCase().includes(query)
  );
  if (peliculasFiltradas.length) {
    catalogo.style.display = "none";
    peliculasFiltradas.forEach(p => {
      const a = document.createElement("a");
      a.href = p.enlace;
      const img = document.createElement("img");
      img.src = p.portada;
      img.alt = p.titulo;
      img.style.width = "200px";
      img.style.borderRadius = "10px";
      img.style.margin = "10px";
      a.appendChild(img);
      resultados.appendChild(a);
    });
  } else {
    resultados.textContent = "No se encontraron resultados.";
  }
}

// Menú hamburguesa
const menuBtn = document.querySelector('.menu-hamburguesa');
const menu = document.querySelector('.menu-desplegable');

menuBtn.addEventListener('click', e => {
  e.stopPropagation(); // evita cierre inmediato
  menu.classList.toggle('show');
});

document.addEventListener('click', e => {
  if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
    menu.classList.remove('show');
  }
});

menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('show');
  });
});
