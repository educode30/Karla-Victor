(function () {
  const leftCol = document.querySelector('.left-column');
  const rightCol = document.querySelector('.right-column');
  const gallerySection = document.querySelector('.gallery-section');

  if (!leftCol || !rightCol || !gallerySection) {
    console.warn('[gallery] No se encontraron los elementos necesarios.');
    return;
  }

  let leftScrollRange = 0;
  let rightScrollRange = 0;
  let sectionScrollRange = 0;
  let ticking = false;

  function measureHeights() {
    const viewportH = window.innerHeight;
    const leftH = leftCol.scrollHeight;
    const rightH = rightCol.scrollHeight;

    // calcula cuánto se moverá cada columna
    leftScrollRange = Math.max(0, leftH - viewportH);
    rightScrollRange = Math.max(0, rightH - viewportH);

    // el scroll total será el promedio de ambas + un margen de seguridad
    sectionScrollRange = Math.max((leftScrollRange + rightScrollRange) / 2, viewportH * 0.3);

    // define altura total necesaria para permitir el efecto
    const totalHeight = viewportH + sectionScrollRange;
    gallerySection.style.height = `${totalHeight}px`;

    // evita overflow interno
    gallerySection.style.overflow = "visible";
  }

  function updateGalleryPosition() {
    const rect = gallerySection.getBoundingClientRect();
    const total = (gallerySection.offsetHeight - window.innerHeight) || 1;
    const progress = Math.min(Math.max(-rect.top / total, 0), 1);

    // izquierda sube (-), derecha baja (+)
    const leftPx = -Math.round(progress * leftScrollRange);
    const rightPx = Math.round(progress * rightScrollRange);

    leftCol.style.transform = `translateY(${leftPx}px)`;
    rightCol.style.transform = `translateY(${rightPx}px)`;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateGalleryPosition();
        ticking = false;
      });
      ticking = true;
    }
  }

  function waitForImages(container) {
    const imgs = Array.from(container.querySelectorAll('img'));
    if (!imgs.length) return Promise.resolve();
    return Promise.all(
      imgs.map(img =>
        img.complete
          ? Promise.resolve()
          : new Promise(res => {
              img.addEventListener('load', res, { once: true });
              img.addEventListener('error', res, { once: true });
            })
      )
    );
  }

  async function init() {
    await Promise.all([waitForImages(leftCol), waitForImages(rightCol)]);
    measureHeights();
    updateGalleryPosition();

    window.addEventListener('resize', () => {
      measureHeights();
      updateGalleryPosition();
    });

    window.addEventListener('scroll', onScroll, { passive: true });

    // recálculo extra para asegurar altura correcta tras carga total
    setTimeout(() => {
      measureHeights();
      updateGalleryPosition();
    }, 1000);
  }

  init();
})();
