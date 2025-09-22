 // Función para mostrar la invitación
    function mostrarInvitacion() {
      // Ocultar portada inicial
      document.querySelector('.inicio').style.display = 'none';
      
      // Mostrar contenido principal
      document.getElementById('principal').style.display = 'flex';
      document.querySelector('.romantic-image').style.display = 'block';
      
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
    document.addEventListener('visibilitychange', function() {
    if(document.hidden) {
        // La página está oculta (usuario cambió de app o minimizó el navegador)
        pausarMusica();
    } else {
        // La página volvió a ser visible
        reproducirMusica();
    }
    });

    // Función para reproducir la música
    function reproducirMusica() {
        if(!musicaPausadaPorUsuario) {
            musica.play().catch(e => console.log("Error al reproducir:", e));
        }
    }

    
    // Control de audio
    function toggleAudio() {
        if(musica.paused) {
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
      
      const actualizarCuentaRegresiva = setInterval(function() {
        const ahora = new Date().getTime();
        const diferencia = fechaBoda - ahora;
        
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
        
        document.getElementById('days').innerHTML = dias + '<span>días</span>';
        document.getElementById('hours').innerHTML = horas + '<span>horas</span>';
        document.getElementById('minutes').innerHTML = minutos + '<span>min</span>';
        document.getElementById('seconds').innerHTML = segundos + '<span>seg</span>';
        
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
    document.addEventListener('DOMContentLoaded', function() {
      // Ocultar todos los elementos excepto la portada inicial
      document.getElementById('principal').style.display = 'none';
      document.querySelector('.romantic-image').style.display = 'none';
      document.getElementById('mapa').style.display = 'none';
      document.getElementById('panelReducido').style.display = 'none';
      document.getElementById('infoBox').style.display = 'none';
      document.getElementById('music-controls').style.display = 'none';
      document.querySelector('footer').style.display = 'none';
      
      // Ocultar secciones
      document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
      });
    });

    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxNJR2wj7ViqyXcCXi1M4uf0PPgqPBLtdVOIDAJgGkNpU6agM9uo7cgKf6jSGnM17XO8Q/exec';
    let token = '';
    let asistencia = '';
    let originalAdultos = 0;
    let originalChildren = 0;
    let alergiasGuardadas = '';

    function verificarCodigo() {
      const codigo = document.getElementById("codigoSecreto").value.trim();
      if (!codigo) {
        alert("Por favor ingresa un código");
        return;
      }

      // Elimina script viejo si existe
      const oldScript = document.getElementById("jsonpScript");
      if (oldScript) oldScript.remove();

      const script = document.createElement("script");
      script.id = "jsonpScript";
      script.src = `${SCRIPT_URL}?codigo=${encodeURIComponent(codigo)}&callback=procesarRespuesta`;
      document.body.appendChild(script);
    }

    function procesarRespuesta(data) {
      if (data.error) {
        alert(data.error);
        return;
      }

      if (!data.invitado) {
        alert("Código no válido");
        return;
      }

      originalAdultos = parseInt(data.invitado.adultos) || 0; 
      originalChildren = parseInt(data.invitado.children) || 0;
      const { invitado } = data;
      const {
        nombre,
        asistencia,
        adultos = 0,
        children = 0,
        alergias = ""
      } = invitado;

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

      console.log("Respuesta recibida:", data);
      token = data.token;
      window.token = data.token; // Asignar al token global
      asistencia = data.invitado.asistencia;
    }


    async function confirmarAsistencia(event) {
      event.preventDefault();

      const nombre = document.getElementById("nombreInvitado").textContent.trim();
      const adultos = parseInt(document.getElementById("numeroAdultos").textContent) || 0;
      const children = parseInt(document.getElementById("children").textContent) || 0;
      let asistencia = document.getElementById("asistenciaInvitado").textContent.trim();
      // 🚨 Validación: no permitir aumentar invitados
      if (adultos > originalAdultos || children > originalChildren) {
        alert(adultos)
        alert(originalAdultos)
        alert(children)
        alert(originalChildren)
        checkDectected();
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
          return;
        }

        alert("¡Gracias por confirmar tu asistencia!");
        console.log("Respuesta del servidor:", texto);

        // Ocultar formulario de confirmación
        document.getElementById("sectionConfirm").style.display = "none";

        // Resetear formulario (si existe)
        const form = document.getElementById("formulario");
        if (form) form.reset();

      } catch (error) {
        console.error("Error en confirmación:", error);
        alert("Hubo un error. Por favor, intenta nuevamente.");
      }
    }


    function checkDectected(){
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
      event.preventDefault();

      if (!confirm("¿Estás seguro de que no podrás acompañarnos?")) {
        return; // Si el usuario cancela, no hacemos nada
      }

      const nombre = document.getElementById("nombreInvitado").textContent;
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
            alert("Lamentamos mucho que no puedas acompañarnos. ¡Te enviaremos fotos!");
            document.getElementById('sectionConfirm').style.display = 'none';
        });
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
    document.getElementById('otra-alergia-check').addEventListener('change', function() {
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

      alert("Tus preferencias se han guardado y se enviarán al confirmar tu asistencia.");
      cerrarModalAlergias();
    }