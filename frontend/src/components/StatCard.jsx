import { motion } from "framer-motion";

export default function StatCard({ icon: Icon, label, value, tone = "cyan" }) {
  const tones = {
    cyan: "from-cyan-400 to-blue-500",
    violet: "from-violet-400 to-fuchsia-500",
    emerald: "from-emerald-400 to-teal-500",
    amber: "from-amber-300 to-orange-500"
  };

  return (
    <motion.article initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-300">{label}</p>
          <h3 className="mt-2 text-3xl font-black tracking-tight">{value}</h3>
        </div>
        <div className={`rounded-2xl bg-gradient-to-br ${tones[tone]} p-3 text-white shadow-lg`}>
          <Icon size={22} />
        </div>
      </div>
    </motion.article>
  );
}
