export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-CR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  
  export const relativeDate = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date;
  
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
    if (seconds < 60) return "hace unos segundos";
    if (minutes < 60) return `hace ${minutes} minuto${minutes > 1 ? "s" : ""}`;
    if (hours < 24) return `hace ${hours} hora${hours > 1 ? "s" : ""}`;
    if (days < 7) return `hace ${days} día${days > 1 ? "s" : ""}`;
  
    return formatDate(dateString); // si pasó más de una semana, mostramos fecha exacta
  };