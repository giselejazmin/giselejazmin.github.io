function parseFecha(fecha: string): Date {
  return new Date(`${fecha}T00:00:00`);
}

export function formatFechaLarga(fecha: string): string {
  return parseFecha(fecha).toLocaleDateString("es-BO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getDia(fecha: string): string {
  return String(parseFecha(fecha).getDate());
}

export function getMesCorto(fecha: string): string {
  return parseFecha(fecha)
    .toLocaleDateString("es-BO", { month: "short" })
    .replace(".", "")
    .toUpperCase();
}

export function esFechaFutura(fecha: string): boolean {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  return parseFecha(fecha) >= hoy;
}
