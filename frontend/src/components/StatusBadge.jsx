const map = {
  RECEIVED: "bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200",
  PROCESSING: "bg-amber-100 text-amber-800 dark:bg-amber-400/15 dark:text-amber-200",
  READY: "bg-cyan-100 text-cyan-800 dark:bg-cyan-400/15 dark:text-cyan-200",
  DELIVERED: "bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-200",
  CANCELLED: "bg-rose-100 text-rose-800 dark:bg-rose-400/15 dark:text-rose-200"
};

export default function StatusBadge({ status }) {
  return <span className={`badge ${map[status] || map.RECEIVED}`}>{status}</span>;
}
