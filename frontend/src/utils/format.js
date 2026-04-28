export function currency(value) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value || 0);
}

export function date(value) {
  if (!value) return "Not set";
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(new Date(value));
}

export function todayInputPlus(days) {
  const dateValue = new Date();
  dateValue.setDate(dateValue.getDate() + days);
  return dateValue.toISOString().slice(0, 10);
}
