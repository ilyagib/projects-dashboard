// src/components/ui.jsx
export function Chip({ children, variant = "tag" }) {
  const base = "rounded-full border px-3 py-1 text-xs transition select-none";
  const styles =
    variant === "tool"
      ? "border-neutral-700 bg-neutral-900/40 text-neutral-100 hover:border-neutral-500"
      : "border-neutral-800 bg-neutral-900/20 text-neutral-200 hover:border-neutral-600";
  return <span className={`${base} ${styles}`}>{children}</span>;
}

export function Card({ title, children }) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/20 p-4">
      {title ? (
        <div className="text-xs font-medium text-neutral-400">{title}</div>
      ) : null}
      <div className={title ? "mt-2" : ""}>{children}</div>
    </div>
  );
}

export function NavBtn({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg border border-neutral-800 bg-neutral-900/30 px-3 py-1.5 text-xs text-neutral-200 hover:border-neutral-600 hover:bg-neutral-900/60"
    >
      {children}
    </button>
  );
}
