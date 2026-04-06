document.addEventListener('DOMContentLoaded', function () {

  const zones = document.querySelectorAll('.hover-zone');
  const exploreBtn = document.getElementById('explore-btn');
  const headSection = document.querySelector('.head-section');
  const anatomySection = document.getElementById('anatomy-section');
  const anatomyCards = document.querySelectorAll('.anatomy-card');

  // ========== Array de imágenes disponibles ==========
  const overlayImages = [
    'img/about/overlay1-large.png',
    'img/about/overlay2-large.png',
    'img/about/overlay3-large.png',
    'img/about/overlay4-large.png',
    'img/about/overlay5-large.png',
    'img/about/base-large.png'
  ];

  // ========== Array de background-positions para cada zona ==========
  const backgroundPositions = [
    '0% 0%',      // hover-zone-1
    '100% 0%',    // hover-zone-2
    '0% 50%',     // hover-zone-3
    '100% 50%',   // hover-zone-4
    '0% 100%',    // hover-zone-5
    '100% 100%'   // hover-zone-6
  ];

  // ========== Función para obtener imagen aleatoria ==========
  function getRandomImage() {
    return overlayImages[Math.floor(Math.random() * overlayImages.length)];
  }

  // ========== Event Listeners para cada zona ==========
  zones.forEach((zone, index) => {
    const position = backgroundPositions[index];

    // Asignar imagen aleatoria inicial al cargar
    const initialImage = getRandomImage();
    zone.style.backgroundImage = `url('${initialImage}')`;
    zone.style.backgroundPosition = position;
    zone.style.transition = 'all .3s ease';

    // Al hacer hover, cambiar a otra imagen aleatoria
    zone.addEventListener('mouseenter', function () {
      const randomImage = getRandomImage();
      zone.style.backgroundImage = `url('${randomImage}')`;
      zone.style.backgroundPosition = position;
    });
  });

  // ========== Botón Explore - Transición a Anatomy Section ==========
  exploreBtn.addEventListener('click', function () {
    // 1. Agregar clase de animación de salida a head-section
    headSection.classList.add('splitting');

    // 2. Esperar a que termine la animación CSS (500ms) y luego ocultar
    setTimeout(() => {
      headSection.style.display = 'none';
      headSection.classList.remove('splitting');

      // 3. Mostrar anatomy-section
      anatomySection.style.display = 'flex';
      anatomySection.classList.add('active');

      // 4. Animar las tarjetas en cascada con delay escalonado
      anatomyCards.forEach((card, i) => {
        setTimeout(() => {
          card.classList.add('visible');
        }, i * 150); // 0ms, 150ms, 300ms
      });

    }, 500); // debe coincidir con la duración de splitOut
  });
});