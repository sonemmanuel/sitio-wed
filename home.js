function mostrarSection(numero, colorFondo) {
    // 1. Seleccionamos las secciones por su ID
    const s1 = document.getElementById('sec1');
    const s2 = document.getElementById('sec2');
    const cuerpo = document.getElementById('fondo');

    // 2. Escondemos ambas secciones
    s1.style.display = 'none';
    s2.style.display = 'none';

    // 3. Mostramos solo la que queremos
    if (numero === 1) {
        s1.style.display = 'block';
    } else if (numero === 2) {
        s2.style.display = 'block';
    }

    // 4. Cambiamos el color de fondo del contenedor main
    cuerpo.style.backgroundColor = colorFondo;
}