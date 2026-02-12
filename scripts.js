
// Función para mostrar la invitación
function mostrarInvitacion() {
  // Ocultar portada inicial
  document.querySelector('.inicio').style.display = 'none';

  // Mostrar contenido principal
  document.getElementById('principal').style.display = 'flex';

  // Iniciar música automáticamente
  const musica = document.getElementById('musica');
  musica.play().catch(e => console.log("Autoplay no permitido: ", e));
  document.getElementById('music-toggle').classList.remove('paused');

  // Mostrar controles de música
  document.getElementById('music-controls').style.display = 'block';
  setTimeout(() => {
    document.getElementById('music-controls').classList.add('visible');
  }, 100);

  // Mostrar todas las secciones (excepto footer)
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.style.display = 'block';
    section.classList.add('scroll-animation');
  });

  // Mostrar footer sin animación
  document.querySelector('footer').style.display = 'block';

  // Iniciar cuenta regresiva
  iniciarCuentaRegresiva();

  // Configurar observador de scroll
  initScrollAnimations();

}

// Función para animaciones al hacer scroll
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.scroll-animation');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      } else {
        entry.target.classList.remove('animated');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// Mostrar/ocultar mapa
function mostrarMapa() {
  const mapa = document.getElementById('mapa');
  mapa.style.display = mapa.style.display === 'none' ? 'block' : 'none';
}
// Variable para controlar si el usuario inició la música manualmente
let musicaPausadaPorUsuario = false;
// Detectar cuando la aplicación se mueve a segundo plano (para algunos navegadores móviles)
window.addEventListener('blur', pausarMusica);
window.addEventListener('focus', reproducirMusica);
// Detectar cuando el usuario cierra la pestaña o el navegador
window.addEventListener('beforeunload', pausarMusica);

// Función para pausar la música
function pausarMusica() {
  musica.pause();
}

// Detectar cuando la página pierde el foco
document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    // La página está oculta (usuario cambió de app o minimizó el navegador)
    pausarMusica();
  } else {
    // La página volvió a ser visible
    reproducirMusica();
  }
});

// Función para reproducir la música
function reproducirMusica() {
  if (!musicaPausadaPorUsuario) {
    musica.play().catch(e => console.log("Error al reproducir:", e));
  }
}


// Control de audio
function toggleAudio() {
  if (musica.paused) {
    musica.play().catch(e => {
      console.log("Autoplay no permitido:", e);
      // Mostrar un mensaje al usuario para que active la música manualmente
    });
    musicaPausadaPorUsuario = false;

    document.getElementById('music-toggle').classList.remove('paused');
  } else {
    musicaPausadaPorUsuario = true;
    musica.pause();
    document.getElementById('music-toggle').classList.add('paused');
  }
}

// Cuenta regresiva
function iniciarCuentaRegresiva() {
  const fechaBoda = new Date('March 28, 2026 16:00:00').getTime();

  const actualizarCuentaRegresiva = setInterval(function () {
    const ahora = new Date().getTime();
    const diferencia = fechaBoda - ahora;

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    document.getElementById('days').innerHTML = dias;
    document.getElementById('hours').innerHTML = horas;
    document.getElementById('minutes').innerHTML = minutos;
    document.getElementById('seconds').innerHTML = segundos;

    if (diferencia < 0) {
      clearInterval(actualizarCuentaRegresiva);
      document.getElementById('countdown').innerHTML = '<div class="calendar-box">¡Hoy es el día!</div>';
    }
  }, 1000);
}

// Funciones para el panel de invitados (simuladas)
function buscarInvitado(e) {
  e.preventDefault();
  // Simulación de búsqueda
  document.getElementById('infoBox').style.display = 'block';
  document.getElementById('nombreInvitado').textContent = 'Nombre del Invitado';
  document.getElementById('menuInvitado').textContent = 'Menú Especial';
  document.getElementById('asistenciaInvitado').textContent = 'Confirmada';
  return false;
}

function mostrarPanelReducido() {
  document.getElementById('infoBox').style.display = 'none';
  document.getElementById('panelReducido').style.display = 'block';
}

function ocultarPanelReducido() {
  document.getElementById('panelReducido').style.display = 'none';
  document.getElementById('infoBox').style.display = 'block';
}

function cambiarInvitados(tipo, cambio) {
  const elemento = document.getElementById(tipo);
  let valor = parseInt(elemento.textContent) + cambio;
  valor = Math.max(0, valor);
  elemento.textContent = valor;
}

function confirmarReducido() {
  alert('Asistencia reducida confirmada');
  document.getElementById('panelReducido').style.display = 'none';
}

// Inicialización - asegurar que todo esté oculto al inicio excepto la portada
document.addEventListener('DOMContentLoaded', function () {
  // Ocultar todos los elementos excepto la portada inicial
  document.getElementById('principal').style.display = 'none';
  document.getElementById('mapa').style.display = 'none';
  document.getElementById('panelReducido').style.display = 'none';
  document.getElementById('infoBox').style.display = 'none';
  document.getElementById('music-controls').style.display = 'none';
  document.querySelector('footer').style.display = 'none';

  // Ocultar secciones
  document.querySelectorAll('section').forEach(section => {
    section.style.display = 'none';
  });

  // --- Verificación automática de código desde URL ---
  const urlParams = new URLSearchParams(window.location.search);
  const codigoDesdeUrl = urlParams.get('codigo');

  if (codigoDesdeUrl) {
    // Si hay un código en la URL, oculta el formulario y muestra un mensaje de carga
    document.getElementById('confirm').style.display = 'none';
    document.getElementById('loading-message').style.display = 'block';
    // Ejecuta la verificación automáticamente
    ejecutarVerificacion(codigoDesdeUrl);
  }

  // --- Lógica del Modal de Código de Vestimenta ---
  const dressModal = document.getElementById('dressModal');
  const openBtn = document.getElementById('openDressCode');
  const closeBtns = document.getElementById('closeDressModal');

  if (dressModal && openBtn && closeBtns) {
    openBtn.onclick = () => {
      dressModal.style.display = 'block';
    };
    closeBtns.onclick = () => {
      dressModal.style.display = 'none';
    };
    window.onclick = (event) => {
      if (event.target == dressModal) dressModal.style.display = 'none';
    };
  }


  // --- Lógica del Carrusel de Galería ---
  const galleries = {
    cita: [
      'images/firstdate.jpeg',
      'images/firstdate2.jpeg',
    ],
    compromiso: [
      'images/propuesta.jpeg',
      'images/compromiso2.jpeg',
      'images/compromiso3.jpeg',
      'images/compromiso4.jpeg',
      'images/compromiso5.jpeg',
      'images/compromiso6.jpeg',
      'images/compromiso7.jpeg',
      'images/compromiso8.jpeg',
      'images/compromiso9.jpeg',
      'images/compromiso10.jpeg',
      'images/compromiso11.jpeg',
      'images/compromiso12.jpeg',
      'images/compromiso13.jpeg',
      'images/compromiso14.jpeg',
      'images/compromiso15.jpeg',
      'images/compromiso16.jpeg',
      'images/compromiso17.jpeg',
      'images/compromiso18.jpeg',
      'images/compromiso19.jpeg',
      'images/compromiso20.jpeg',
    ],
    pedida: [
      'images/pedida1.jpeg',
      'images/pedida2.jpeg',
      'images/pedida3.jpeg',
      'images/pedida4.jpeg',
      'images/pedida5.jpeg',
      'images/pedida6.jpeg',
      'images/pedida7.jpeg',
      'images/pedida8.jpeg',
    ],
    viajes: [
      'images/hidalgo.jpeg',
      'images/travel2.jpeg',
      'images/travel3.jpeg',
    ]
  };

  let currentGallery = [];
  let currentIndex = 0;

  const galleryModal = document.getElementById('gallery-modal');
  const galleryImage = document.getElementById('gallery-image');
  const closeBtn = document.querySelector('.gallery-close-btn');
  const prevBtn = document.querySelector('.gallery-nav-btn.prev');
  const nextBtn = document.querySelector('.gallery-nav-btn.next');

  document.querySelectorAll('.card[data-gallery]').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const galleryKey = card.dataset.gallery;
      currentGallery = galleries[galleryKey];
      currentIndex = 0;
      openGalleryModal();
    });
  });

  function openGalleryModal() {
    updateImage();
    galleryModal.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  function closeGalleryModal() {
    galleryModal.classList.remove('visible');
    document.body.style.overflow = 'auto';
  }

  function updateImage() {
    galleryImage.src = currentGallery[currentIndex];
  }

  function showNextImage() {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    updateImage();
  }

  function showPrevImage() {
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    updateImage();
  }

  closeBtn.addEventListener('click', closeGalleryModal);
  nextBtn.addEventListener('click', showNextImage);
  prevBtn.addEventListener('click', showPrevImage);
  galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
      closeGalleryModal();
    }
  });
});

// --- Sistema de Modales Genérico ---
function mostrarModalMensaje(mensaje) {
  const modal = document.getElementById('message-modal');
  const texto = document.getElementById('message-text');
  texto.textContent = mensaje;
  modal.style.display = 'flex';
}

function cerrarModalMensaje() {
  const modal = document.getElementById('message-modal');
  modal.style.display = 'none';
}
// --- Fin Sistema de Modales ---

// --- Sistema de Modal de Confirmación ---
function mostrarModalConfirmacion(mensaje, callbackSi) {
  const modal = document.getElementById('confirm-modal');
  const texto = document.getElementById('confirm-text');
  const btnSi = document.getElementById('confirm-yes-btn');
  const btnNo = document.getElementById('confirm-no-btn');

  texto.textContent = mensaje;
  modal.style.display = 'flex';

  btnSi.onclick = () => {
    modal.style.display = 'none';
    callbackSi();
  };

  btnNo.onclick = () => {
    modal.style.display = 'none';
  };
}
// --- Fin Sistema de Modal de Confirmación ---

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxNJR2wj7ViqyXcCXi1M4uf0PPgqPBLtdVOIDAJgGkNpU6agM9uo7cgKf6jSGnM17XO8Q/exec';
let token = '';
let asistencia = '';
let originalAdultos = 0;
let originalChildren = 0;
let alergiasGuardadas = '';

function ejecutarVerificacion(codigo) {
  // Elimina script viejo si existe
  const oldScript = document.getElementById("jsonpScript");
  if (oldScript) oldScript.remove();

  const script = document.createElement("script");
  script.id = "jsonpScript";
  script.src = `${SCRIPT_URL}?codigo=${encodeURIComponent(codigo)}&callback=procesarRespuesta`;

  script.onerror = () => {
    mostrarModalMensaje('Hubo un error al verificar el código. Intenta de nuevo.');
    const button = document.querySelector('.code-form button');
    if (button) button.classList.remove('loading');
    document.getElementById('loading-message').style.display = 'none';
  };

  document.body.appendChild(script);
}

function verificarCodigo() {
  const codigoInput = document.getElementById("codigoSecreto");
  const codigo = codigoInput.value.trim();
  if (!codigo) {
    mostrarModalMensaje("Por favor ingresa un código");
    return;
  }
  const button = event.target;
  button.classList.add('loading');
  ejecutarVerificacion(codigo);
}

function procesarRespuesta(data) {
  const button = document.querySelector('.code-form button');
  if (button) button.classList.remove('loading');
  document.getElementById('loading-message').style.display = 'none';

  if (data.error) {
    mostrarModalMensaje(data.error);
    return;
  }

  if (!data.invitado) {
    mostrarModalMensaje("Código no válido");
    return;
  }

  originalAdultos = parseInt(data.invitado.adultos) || 0;
  originalChildren = parseInt(data.invitado.children) || 0;
  const { invitado } = data;
  let {
    nombre,
    asistencia,
    adultos = 0,
    children = 0,
    alergias = ""
  } = invitado;

  const deadlineLabel = document.querySelector('.confirmation-deadline strong');

  if (nombre && nombre.startsWith("Es un placer invitar a:")) {
    // Set special deadline
    if (deadlineLabel) deadlineLabel.innerHTML = "05 de Febrero, 2026";
    // Remove prefix
    nombre = nombre.replace("Es un placer invitar a:", "").trim();
  }else if (nombre && nombre.startsWith("Invitado Especial:")) {
    // Set default deadline
    if (deadlineLabel) deadlineLabel.innerHTML = "13 de Marzo, 2025";
  } else {
    // Set default deadline
    if (deadlineLabel) deadlineLabel.innerHTML = "20 de Diciembre, 2025";
  }

  document.getElementById("infoBox").style.display = "block";
  document.getElementById("nombreInvitado").textContent = nombre;
  document.getElementById("asistenciaInvitado").textContent = asistencia;
  document.getElementById("children").textContent = children || 0;
  document.getElementById("infoBoxChildren").textContent = children || 0;
  document.getElementById("numeroAdultos").textContent = adultos || 0;
  document.getElementById("infoBoxAdultos").textContent = adultos || 0;

  alergiasGuardadas = alergias;

  // Ocultar botón de confirmación
  document.getElementById("confirm").style.display = "none";
  // --- Cambio de música para invitado especial ---
  if (nombre === 'David Flores') {
    const musica = document.getElementById('musica');
    const source = musica.querySelector('source');

    if (source && source.src.includes('Ordinary.mp3')) {
      musica.pause();
      source.src = 'flow.mp3';
      musica.load(); // Carga la nueva canción
      musica.play().catch(e => console.log("Error al reproducir la canción especial:", e));
    }
  }

  console.log("Respuesta recibida:", data);
  token = data.token;
  window.token = data.token; // Asignar al token global
  asistencia = data.invitado.asistencia;
}


async function confirmarAsistencia(event) {
  event.preventDefault();

  const button = event.target;
  button.classList.add('loading');

  const nombre = document.getElementById("nombreInvitado").textContent.trim();
  const adultos = parseInt(document.getElementById("numeroAdultos").textContent) || 0;
  const children = parseInt(document.getElementById("children").textContent) || 0;
  let asistencia = document.getElementById("asistenciaInvitado").textContent.trim();
  // 🚨 Validación: no permitir aumentar invitados
  if (adultos > originalAdultos || children > originalChildren) {
    checkDectected();
    button.classList.remove('loading');
    return;
  }
  // Actualizar estado de asistencia
  if (asistencia === "Sin Confirmar") {
    asistencia = "Confirmado";
  }

  // Preparar datos para enviar
  const formData = new FormData();
  formData.append("nombre", nombre);
  formData.append("asistencia", asistencia);
  formData.append("token", window.token);
  formData.append("adultos", adultos);
  formData.append("children", children);
  formData.append("alergias", alergiasGuardadas || "");
  // Actualizar UI inmediatamente
  document.getElementById("infoBoxChildren").textContent = children;
  document.getElementById("infoBoxAdultos").textContent = adultos;
  document.getElementById("panelReducido").style.display = "none";
  document.getElementById("infoBox").style.display = "block";
  try {
    const res = await fetch(SCRIPT_URL, { method: "POST", body: formData });
    const texto = await res.text();

    if (texto === "Trampa") {
      checkDectected();
      button.classList.remove('loading');
      return;
    }

    mostrarModalMensaje("¡Gracias por confirmar tu asistencia!");
    console.log("Respuesta del servidor:", texto);

    // Ocultar formulario de confirmación
    document.getElementById("sectionConfirm").style.display = "none";

    // Resetear formulario (si existe)
    const form = document.getElementById("formulario");
    if (form) form.reset();

  } catch (error) {
    console.error("Error en confirmación:", error);
    mostrarModalMensaje("Hubo un error. Por favor, intenta nuevamente.");
  } finally {
    button.classList.remove('loading');
  }
}


function checkDectected() {
  // ¡Activando trampa!
  document.getElementById('hacker-warning').style.display = 'flex';
  // Reseteando invitados a 0
  document.getElementById('numeroAdultos').textContent = 0;
  document.getElementById('children').textContent = 0;
  document.getElementById('infoBoxAdultos').textContent = 0;
  document.getElementById('infoBoxChildren').textContent = 0;
  originalAdultos = 0;
  originalChildren = 0;
  return; // Detiene la ejecución para que no se envíe nada

}
async function declinarAsistencia(event) {
  const button = event.target;

  const ejecutarDeclinacion = () => {
    button.classList.add('loading');
    const nombre = document.getElementById("nombreInvitado").textContent.trim();
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("asistencia", "No");
    formData.append("token", token);
    formData.append("adultos", 0); // Se envían 0 adultos
    formData.append("children", 0); // y 0 niños

    fetch(SCRIPT_URL, {
      method: "POST",
      body: formData
    })
      .then(res => res.text())
      .then(texto => {
        mostrarModalMensaje("Lamentamos mucho que no puedas acompañarnos. ¡Te enviaremos fotos!");
        document.getElementById('sectionConfirm').style.display = 'none';
      })
      .catch(error => {
        console.error("Error al declinar:", error);
        mostrarModalMensaje("Hubo un error. Por favor, intenta nuevamente.");
      })
      .finally(() => {
        button.classList.remove('loading');
      });
  };
  mostrarModalConfirmacion("¿Estás seguro de que no podrás acompañarnos?", ejecutarDeclinacion);
}

function mostrarModalAlergias() {
  // Limpiar el formulario antes de mostrarlo
  document.getElementById('allergy-form').reset();
  document.getElementById('otra-alergia-input').disabled = true;

  // Si hay alergias guardadas, pre-rellenar el formulario
  if (alergiasGuardadas) {
    const alergiasPrevias = alergiasGuardadas.split(', ').map(a => a.trim());
    const checkboxes = document.querySelectorAll('#allergy-form input[name="alergia"]');
    const alergiasComunes = Array.from(checkboxes).map(cb => cb.value);

    checkboxes.forEach(cb => {
      if (alergiasPrevias.includes(cb.value)) {
        cb.checked = true;
      }
    });

    const otraAlergia = alergiasPrevias.find(a => !alergiasComunes.includes(a) && a !== "");
    if (otraAlergia) {
      document.getElementById('otra-alergia-check').checked = true;
      const otraInput = document.getElementById('otra-alergia-input');
      otraInput.disabled = false;
      otraInput.value = otraAlergia;
    }
  }
  document.getElementById('allergy-modal').style.display = 'flex';
}

function cerrarModalAlergias() {
  document.getElementById('allergy-modal').style.display = 'none';
}

// Habilitar/deshabilitar el campo de texto para "Otra" alergia
document.getElementById('otra-alergia-check').addEventListener('change', function () {
  const inputOtro = document.getElementById('otra-alergia-input');
  if (this.checked) {
    inputOtro.disabled = false;
    inputOtro.focus();
  } else {
    inputOtro.disabled = true;
    inputOtro.value = '';
  }
});

function guardarAlergias() {
  const alergiasSeleccionadas = [];

  // Recolectar alergias de los checkboxes
  document.querySelectorAll('#allergy-form input[name="alergia"]:checked').forEach(checkbox => {
    alergiasSeleccionadas.push(checkbox.value);
  });

  // Recolectar alergia del campo "Otra"
  const otraAlergiaInput = document.getElementById('otra-alergia-input');
  if (document.getElementById('otra-alergia-check').checked && otraAlergiaInput.value.trim() !== '') {
    alergiasSeleccionadas.push(otraAlergiaInput.value.trim());
  }

  // Guardar las alergias en la variable global
  alergiasGuardadas = alergiasSeleccionadas.join(', ');

  mostrarModalMensaje("Tus preferencias se han guardado y se enviarán al confirmar tu asistencia.");
  cerrarModalAlergias();
}

// === ACTIVAR EFECTO DE DESPLAZAMIENTO ===

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// --- Función para copiar al portapapeles ---
function copyToClipboard(elementId, button) {
  const textToCopy = document.getElementById(elementId).innerText;

  navigator.clipboard.writeText(textToCopy).then(() => {
    // Éxito al copiar
    const originalText = button.innerText;
    button.innerText = '¡Copiado!';
    button.classList.add('copied');

    setTimeout(() => {
      button.innerText = originalText;
      button.classList.remove('copied');
    }, 2000); // Vuelve al texto original después de 2 segundos
  }).catch(err => {
    // Error al copiar
    console.error('Error al copiar: ', err);
    alert('No se pudo copiar el código.');
  });
}
