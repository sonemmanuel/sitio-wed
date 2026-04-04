document.addEventListener('DOMContentLoaded', function () {

  const zones = document.querySelectorAll('.hover-zone');
  const exploreBtn = document.querySelector('.explore-btn');

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

  // ========== Botón Explore Click Handler ==========
  if (exploreBtn) {
    exploreBtn.addEventListener('click', function () {
      // Reemplaza '#destino' con la URL o ancla real que desees
      // window.location.href = '#destino';
      console.log('Explore button clicked');
    });
  }

});