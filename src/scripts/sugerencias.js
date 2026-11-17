const WHATSAPP_NUMBER = window.__WHATSAPP_NUMBER__ || "";
const SCHOOL_NAME = window.__SCHOOL_NAME__ || "Unidad Educativa";

function buildMessage({ nombre, rol, mensaje }) {
  let message = `*SUGERENCIA - ${SCHOOL_NAME}*\n\n`;
  message += `*Rol:* ${rol}\n`;
  message += `*Nombre:* ${nombre || "Anónimo"}\n\n`;
  message += `*Mensaje:*\n${mensaje}`;
  return message;
}

function showFeedback(element, text, isError) {
  if (!element) return;
  element.textContent = text;
  element.classList.toggle("error", Boolean(isError));
}

function handleSubmit(event) {
  const form = event.target.closest("#sugerencia-form");
  if (!form) return;
  event.preventDefault();

  const feedback = document.getElementById("sugerencia-feedback");
  const formData = new FormData(form);
  const nombre = String(formData.get("nombre") || "").trim();
  const rol = String(formData.get("rol") || "").trim();
  const mensaje = String(formData.get("mensaje") || "").trim();

  if (!rol || !mensaje) {
    showFeedback(
      feedback,
      "Por favor selecciona tu rol y escribe tu sugerencia.",
      true
    );
    return;
  }

  if (!WHATSAPP_NUMBER) {
    showFeedback(
      feedback,
      "El canal de WhatsApp no está configurado. Comunica tu sugerencia directamente a la dirección de la unidad educativa.",
      true
    );
    return;
  }

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    buildMessage({ nombre, rol, mensaje })
  )}`;
  window.open(url, "_blank");
  showFeedback(
    feedback,
    "Se abrió WhatsApp con tu sugerencia. Envía el mensaje para completar el registro.",
    false
  );
}

if (!window.__sugerenciasInit) {
  window.__sugerenciasInit = true;
  document.addEventListener("submit", handleSubmit);
}
