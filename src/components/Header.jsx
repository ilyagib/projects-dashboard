// src/components/Header.jsx
export default function Header() {
  return (
    <header className="animate-fade-in">
      <div className="cp-panel cp-sweep cp-cut cp-glow-strong rounded-2xl p-6">
        <h1 className="cp-title cp-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          Projects Analytics Dashboard
        </h1>

        {/* neon accent line */}
        <div className="mt-3 h-px w-40 cp-accent-line" />

        <p className="cp-body cp-body-muted mt-3 text-sm">
          Interactive overview of my data projects
        </p>
      </div>
    </header>
  );
}
