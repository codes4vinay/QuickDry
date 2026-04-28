import { FiInbox } from "react-icons/fi";

export default function EmptyState({ title = "Nothing here yet", text = "Once data exists, it will appear here." }) {
  return (
    <div className="glass flex flex-col items-center justify-center p-10 text-center">
      <div className="rounded-3xl bg-slate-100 p-4 text-slate-500 dark:bg-white/10 dark:text-slate-300">
        <FiInbox size={28} />
      </div>
      <h3 className="mt-4 text-lg font-black">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-300">{text}</p>
    </div>
  );
}
