// ── 1. Escena ──────────────────────────────────
const scene = new THREE.Scene();

// ── 2. Cámara ─────────────────────────────────
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 120, 35);
camera.lookAt(0, 0, 0);

// ── 3. Renderer ───────────────────────────────
const canvas = document.getElementById('solarCanvas');
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: false
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x2a2a2a);

// ── 4. Estrellas de fondo ──────────────────────
function createStars() {
  const geometry = new THREE.BufferGeometry();
  const count = 800;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 600;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.4,
    transparent: true,
    opacity: 0.6
  });

  const stars = new THREE.Points(geometry, material);
  scene.add(stars);
}

createStars();

// ── 5. El Sol (centro) ─────────────────────────
function createGlowTexture(size, color) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const radius = size / 2;

  // Crear gradiente radial circular
  const gradient = ctx.createRadialGradient(radius, radius, 0, radius, radius, radius);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  return new THREE.CanvasTexture(canvas);
}

function createSun() {
  const geometry = new THREE.SphereGeometry(3, 32, 32);
  
  // Crear textura con múltiples colores DENTRO de la función
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  
  // Gradiente radial con múltiples colores
  const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
  gradient.addColorStop(0, '#FFFF00');     // Centro: Amarillo
  gradient.addColorStop(0.5, '#FF9D00');   // Medio: Naranja
  gradient.addColorStop(1, '#FF4500');     // Exterior: Rojo-Naranja
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);
  
  const sunTexture = new THREE.CanvasTexture(canvas);
  
  const material = new THREE.MeshStandardMaterial({
    map: sunTexture,
    roughness: 0.9,
    brightness: 2,
    metalness: -5
  });

  const sun = new THREE.Mesh(geometry, material);
  scene.add(sun);

  // ── Luz puntual (ilumina planetas) ─────────
  const sunLight = new THREE.PointLight(0xFFDD88, 2, 200);
  sunLight.position.set(0, 0, 0);
  scene.add(sunLight);

  // ── Luz ambiental suave ────────────────────
  const ambientLight = new THREE.AmbientLight(0x222222, 1);
  scene.add(ambientLight);

  return sun;
}

const sun = createSun();

// ── 6. Órbitas elípticas en perspectiva ────────
const orbitData = [
  { rx: 10,  rz: 3.5  },
  { rx: 16,  rz: 5.5  },
  { rx: 23,  rz: 8    },
  { rx: 31,  rz: 11   },
  { rx: 42,  rz: 15   },
  { rx: 55,  rz: 19.5 },
  { rx: 68,  rz: 24   },
  { rx: 82,  rz: 29   },
];

function createOrbit({ rx, rz }) {
  const curve = new THREE.EllipseCurve(
    0, 0,
    rx, rz,
    0, Math.PI * 2,
    false
  );

  const points = curve.getPoints(128);
  const points3D = points.map(p => new THREE.Vector3(p.x, 0, p.y));
  const geometry = new THREE.BufferGeometry().setFromPoints(points3D);

  const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.3
  });

  const orbit = new THREE.LineLoop(geometry, material);
  scene.add(orbit);
  return orbit;
}

orbitData.forEach(createOrbit);

// ── 7. Planetas ────────────────────────────────
const planetData = [
  { size: 0.8,  rx: 10, rz: 3.5,  angle: 2.5,  name: 'Planeta1' },
  { size: 1.2,  rx: 16, rz: 5.5,  angle: 1.0,  name: 'Planeta2' },
  { size: 1.4,  rx: 23, rz: 8,    angle: 4.2,  name: 'Planeta3' },
  { size: 1.0,  rx: 31, rz: 11,   angle: 5.8,  name: 'Planeta4' },
  { size: 3.2,  rx: 42, rz: 15,   angle: 0.8,  name: 'Planeta5' },
  { size: 2.8,  rx: 55, rz: 19.5, angle: 1.6,  name: 'Planeta6' },
  { size: 2.0,  rx: 68, rz: 24,   angle: 3.5,  name: 'Planeta7' },
  { size: 1.8,  rx: 82, rz: 29,   angle: 0.3,  name: 'Planeta8' },
  { size: 1.8,  rx: 82, rz: 29,   angle: 0.9,  name: 'Planeta9' },
];

const planets = [];

function createPlanet({ size, rx, rz, angle }) {
  const geometry = new THREE.SphereGeometry(size, 32, 32);
  const material = new THREE.MeshStandardMaterial({
    color: 0xdddddd,
    roughness: 0.8,
    metalness: 0.1
  });

  const planet = new THREE.Mesh(geometry, material);

  planet.position.set(
    Math.cos(angle) * rx,
    0,
    Math.sin(angle) * rz
  );

  scene.add(planet);

  planets.push({ mesh: planet, rx, rz, angle, speed: 0.3 / rx });
  return planet;
}

planetData.forEach(createPlanet);

// ── Interactividad hover planetas ↔ tabs ────
const tooltip = document.getElementById('planetTooltip');
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let activePlanetIndex = -1;

planets.forEach((planetObj, index) => {
  const div = document.querySelector(`div[data-planet="${index}"]`);
  
  if (div) {
    // Evento para mostrar tooltip al hacer hover en div
    div.addEventListener('mouseenter', () => {
      planetObj.mesh.scale.set(1.5, 1.5, 1.5);
      activePlanetIndex = index;
      tooltip.textContent = div.textContent;
      tooltip.classList.add('active');
    });
    
    div.addEventListener('mouseleave', () => {
      planetObj.mesh.scale.set(1, 1, 1);
      activePlanetIndex = -1;
      tooltip.classList.remove('active');
    });
  }
});

// Detectar hover sobre los planetas en 3D
window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  raycaster.setFromCamera(mouse, camera);
});

// Función para actualizar posición del tooltip
function updateTooltipPosition() {
  if (activePlanetIndex >= 0 && activePlanetIndex < planets.length) {
    const planetObj = planets[activePlanetIndex];
    
    // Convertir posición 3D a 2D en pantalla
    const worldPosition = planetObj.mesh.position.clone();
    const screenPosition = worldPosition.project(camera);
    
    // Convertir de coordenadas normalizadas (-1 a 1) a píxeles
    const x = (screenPosition.x + 1) / 2 * window.innerWidth;
    const y = (1 - screenPosition.y) / 2 * window.innerHeight;
    
    // Posicionar tooltip encima del planeta
    tooltip.style.left = x + 'px';
    tooltip.style.top = (y - 80) + 'px';
    tooltip.style.transform = 'translateX(-50%)';
  }
}

// ── 8. Texto "SKILLS" semitransparente ─────────
function createSkillsText() {
  const textCanvas = document.createElement('canvas');
  textCanvas.width = 512;
  textCanvas.height = 256;
  const ctx = textCanvas.getContext('2d');

  ctx.clearRect(0, 0, 512, 256);
  ctx.font = 'bold 110px Arial';
  ctx.fillStyle = 'rgba(180, 180, 180, 0.15)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('SKILLS', 256, 128);

  const texture = new THREE.CanvasTexture(textCanvas);
  const geometry = new THREE.PlaneGeometry(80, 40);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthWrite: false
  });

  const textMesh = new THREE.Mesh(geometry, material);
  textMesh.rotation.x = -Math.PI / 2;
  textMesh.position.set(0, 0.1, 0);
  scene.add(textMesh);
}

createSkillsText();

// ── 9. Loop de animación ───────────────────────
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const elapsed = clock.getElapsedTime();

  // ── Animar planetas ────────────────────────
  planets.forEach(p => {
    p.angle += p.speed * 0.50;
    p.mesh.position.set(
      Math.cos(p.angle) * p.rx,
      0,
      Math.sin(p.angle) * p.rz
    );
    p.mesh.rotation.y += 0.005;
  });

  // ── Pulso suave del sol ────────────────────
  const pulse = Math.sin(elapsed * 2) * 0.05 + 1;
  sun.scale.set(pulse, pulse, pulse);

  // ── Actualizar posición del tooltip ────────
  updateTooltipPosition();

  renderer.render(scene, camera);
}

animate();

// ── 10. Responsive (resize handler) ────────────
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});