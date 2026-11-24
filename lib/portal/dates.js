export const OPEN_HOUR = 8;
export const CLOSE_HOUR = 20;
export const CANCEL_REFUND_HOURS = 24;
export const MAX_BOOKING_HOURS = 4;
export const DAYS_SHOWN = 14;

export const pad = (n) => String(n).padStart(2, "0");
export const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
export const addDays = (d, n) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};
export const at = (d, hour) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), hour);
export const dayKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const fmtHour = (h) => `${h % 12 === 0 ? 12 : h % 12} ${h >= 12 ? "pm" : "am"}`;
export const fmtTime = (iso) => fmtHour(new Date(iso).getHours());
export const fmtDay = (d) =>
  new Date(d).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
export const fmtDate = (d) => new Date(d).toLocaleDateString(undefined, { month: "short", day: "numeric" });
export const hrs = (minutes) => {
  const h = minutes / 60;
  return Number.isInteger(h) ? String(h) : h.toFixed(1);
};
export const hourWord = (minutes) => (minutes === 60 ? "hour" : "hours");

export const TODAY = startOfDay(new Date());
export const ME = 1;
