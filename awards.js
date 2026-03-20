// Datos de los premios con imágenes
const awardData = [
  {
    title: "AWWWARDS",
    image: "img/awwwards_117_133.png",
    content: `
            <p>Adam Hartwig: Site of the Day, May 9th <a href="https://www.awwwards.com/sites/adam-hartwig">Launch</a></p>
            <p>Creative Edge Parties: Honorable Mention <a href="https://www.awwwards.com/sites/creative-edge-parties">Launch</a></p>
            <p>Pete Nottage: Honorable Mention <a href="https://www.awwwards.com/sites/pete-nottage">Launch</a></p>
            <p>Starworks Artists: Honorable Mention <a href="https://www.awwwards.com/sites/starworks-artists">Launch</a></p>
        `,
  },
  {
    title: "THE FWA",
    image: "img/fwa_242_134.png",
    content: `
            <p>Adam Hartwig: Site of the day <a href="https://thefwa.com/cases/adam-hartwig">Launch</a></p>
            <p>Creative Edge Parties: Site of the day <a href="https://thefwa.com/cases/creative-edge-parties">Launch</a></p>
        `,
  },
  {
    title: "VERY NICE SITES",
    image: "img/verynicesites_125_134.png",
    content: `
            <p>Adam Hartwig: Featured Site <a href="http://www.verynicesites.com/sites/adam-hartwig/">Launch</a></p>
        `,
  },
  {
    title: "CODROPS",
    image: "img/codrops_117_133.png",
    content: `
            <p>Adam Hartwig: Inspirational Site of the Week <a href="https://tympanus.net/codrops/collective/collective-61/">Launch</a></p>
        `,
  },
  {
    title: 'French Design Index',
    image: 'img/frenchdesignindex_115_134.png',
    content: `
            <p>Adam Hartwig: Inspirational Site of the Week <a href="http://www.frenchdesignindex.com/design-index-3802">Launch</a></p>
    `,
  },
  {
    title: 'CSSAwards',
    image: 'img/cssawards_242_134.png',
    content: `
            <p>Adam Hartwig: Inspirational Site of the Week <a href="http://www.frenchdesignindex.com/design-index-3802">Launch</a></p>
    `,
  },
  {
    title: 'The Best Designs',
    image: 'img/thebestdesigns_188_134.png',
    content: `
            <p>Adam Hartwig: Inspirational Site of the Week <a href="http://www.frenchdesignindex.com/design-index-3802">Launch</a></p>
    `,
  },
  {
    title: 'CSS Design Awards',
    image: 'img/cssdesignawards_138_134.png',
    content: `
            <p>Adam Hartwig: Inspirational Site of the Week <a href="http://www.frenchdesignindex.com/design-index-3802">Launch</a></p>
    `,
  },
  {
    title: 'OnePageLove',
    image: 'img/onepagelove_150_134.png',
    content: `
            <p>Adam Hartwig: Inspirational Site of the Week <a href="http://www.frenchdesignindex.com/design-index-3802">Launch</a></p>
    `,
  },
  {
    title: "HTML INSPIRATION",
    image: "img/htmlinspiration_117_133.png",
    content: `
            <p>Adam Hartwig: Featured Site + #1 Best of the best <a href="http://htmlinspiration.com/adam-hartwig/358/">Launch</a></p>
        `,
  },
];

let currentIndex = 0;

// Función para actualizar el contenido y la imagen
function updateContent(index) {
  const titleElement = document.getElementById("award-title");
  const contentElement = document.getElementById("award-content");
  const imageElement = document.getElementById("carousel-image");

  titleElement.textContent = awardData[index].title;
  contentElement.innerHTML = awardData[index].content;
  imageElement.src = awardData[index].image;
  imageElement.alt = awardData[index].title;

  // Actualizar imágenes de los lados
  const prev1Index = (index - 1 + awardData.length) % awardData.length;
  const prev0Index = (index - 2 + awardData.length) % awardData.length;
  const next0Index = (index + 1) % awardData.length;
  const next1Index = (index + 2) % awardData.length;

  document.getElementById("side-prev-1").src = awardData[prev1Index].image;
  document.getElementById("side-prev-0").src = awardData[prev0Index].image;
  document.getElementById("side-next-0").src = awardData[next0Index].image;
  document.getElementById("side-next-1").src = awardData[next1Index].image;

  // Actualizar indicadores
  document.querySelectorAll(".indicator").forEach((indicator) => {
    indicator.classList.remove("active");
  });
  document.querySelector(`.indicator[data-index="${index}"]`).classList.add("active");
}

// Función para ir a la siguiente sección
function nextSection() {
  currentIndex = (currentIndex + 1) % awardData.length;
  updateContent(currentIndex);
}

// Función para ir a la sección anterior
function prevSection() {
  currentIndex = (currentIndex - 1 + awardData.length) % awardData.length;
  updateContent(currentIndex);
}

// Event listeners para las flechas
document.querySelectorAll(".arrow-right").forEach((arrow) => {
  arrow.addEventListener("click", nextSection);
});

document.querySelectorAll(".arrow-left").forEach((arrow) => {
  arrow.addEventListener("click", prevSection);
});
document.querySelectorAll(".indicator").forEach((indicator) => {
  indicator.addEventListener("click", function () {
    currentIndex = parseInt(this.getAttribute("data-index"));
    updateContent(currentIndex);
  });
});

// Event listeners para las imágenes de los lados
document.getElementById("side-prev-1").addEventListener("click", prevSection);
document.getElementById("side-prev-0").addEventListener("click", prevSection);
document.getElementById("side-next-0").addEventListener("click", nextSection);
document.getElementById("side-next-1").addEventListener("click", nextSection);

// Inicializar con la primera sección
updateContent(0);
