export const formatData = (date: string) => {
  const value = new Date(date)

  const now = new Date();
  const difference = now - value;

  if (difference < 24 * 60 * 60 * 1000) { // Menos de 24 horas
    const horas = Math.floor(difference / (60 * 60 * 1000));
    return `${horas}h`;

  } else if (difference < 48 * 60 * 60 * 1000) { // Entre 24 e 48 horas

    return 'yesterday';

  } else if (difference < 365 * 24 * 60 * 60 * 1000) { // Menos de um ano

    return value.toLocaleDateString('en-us', {
      day: 'numeric',
      month: 'short',
    });

  } else { // Mais de um ano
    return value.toLocaleDateString('en-us', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
};

export const formatTime = (timeInMillis: number) => {
  if (!isNaN(timeInMillis)) {
    const totalSeconds = Math.floor(timeInMillis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  }

  return "00:00";
};

export function formatNumber(number: number | undefined) {
  if (!number) return '0'

  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'k';
  } else {
    return number.toString();
  }
}