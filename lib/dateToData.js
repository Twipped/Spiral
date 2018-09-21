
export default function dateToData (date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();

  return {
    year,
    month,
    day,
    hour,
    timestamp: date.valueOf(),
    dateString: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    tz: date.getTimezoneOffset(),
  };
}
