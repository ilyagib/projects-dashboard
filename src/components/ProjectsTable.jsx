// src/components/ProjectsTable.jsx

function Pill({ children, tone = "neutral" }) {
  const tones = {
    neutral:
      "border-cyan-200/15 bg-[rgba(10,10,18,0.45)] text-neutral-200/90 shadow-[0_0_14px_rgba(0,255,255,0.06)]",
    tool:
      "border-fuchsia-300/20 bg-[rgba(10,10,18,0.55)] text-neutral-100 shadow-[0_0_16px_rgba(255,0,140,0.08)]",
  };

  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] leading-none",
        tones[tone] || tones.neutral,
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function SortTh({ col, label, sortBy, sortDir, onToggle, right = false }) {
  const active = sortBy === col;

  return (
    <th className={["px-4 py-3", right ? "text-right" : "text-left"].join(" ")}>
      <button
        type="button"
        onClick={() => onToggle(col)}
        className={[
          "group inline-flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase cp-heading transition",
          active ? "text-cyan-100" : "text-neutral-400 hover:text-cyan-100",
        ].join(" ")}
      >
        <span className="relative">
          {label}
          <span
            className={[
              "pointer-events-none absolute -bottom-1 left-0 h-[2px] w-full",
              active
                ? "bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent"
                : "bg-gradient-to-r from-transparent via-neutral-700/40 to-transparent opacity-0 group-hover:opacity-100",
            ].join(" ")}
          />
        </span>

        <span className={active ? "text-cyan-200/80" : "text-neutral-700"}>
          {active ? (sortDir === "asc" ? "↑" : "↓") : "↑↓"}
        </span>
      </button>
    </th>
  );
}

function EmptyState({ onReset }) {
  return (
    <div className="p-10 text-center cp-panel cp-cut cp-scanlines">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-[rgba(10,10,18,0.45)] text-lg shadow-[0_0_20px_rgba(0,255,255,0.10)]">
        🔎
      </div>

      <div className="mt-4 text-lg font-semibold cp-title cp-heading">
        No projects match your filters
      </div>

      <div className="mt-2 text-sm text-neutral-400">
        Try clearing the search or switching domain.
      </div>

      {onReset ? (
        <button
          type="button"
          onClick={onReset}
          className="mt-5 cp-btn-strong cp-cut rounded-lg px-4 py-2 text-sm text-neutral-100"
        >
          Reset filters
        </button>
      ) : null}
    </div>
  );
}

export default function ProjectsTable({
  projects,
  totalCount,
  sortBy,
  sortDir,
  onToggleSort,
  onRowClick,
}) {
  const list = Array.isArray(projects) ? projects : [];
  const hasProjects = list.length > 0;

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between">
        <div className="text-sm text-neutral-300">
          Showing{" "}
          <span className="font-semibold text-cyan-100">{list.length}</span>{" "}
          <span className="text-neutral-500">/ {totalCount}</span>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl cp-panel cp-cut cp-scanlines cp-border-glow">
        {hasProjects ? (
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full">
              <thead className="border-b border-cyan-300/15 bg-[rgba(0,0,0,0.18)]">
                <tr>
                  <SortTh
                    col="title"
                    label="Project"
                    sortBy={sortBy}
                    sortDir={sortDir}
                    onToggle={onToggleSort}
                  />
                  <SortTh
                    col="domain"
                    label="Domain"
                    sortBy={sortBy}
                    sortDir={sortDir}
                    onToggle={onToggleSort}
                  />
                  <th className="px-4 py-3 text-left text-[11px] tracking-[0.14em] uppercase cp-heading text-neutral-400">
                    Tools
                  </th>
                  <SortTh
                    col="year"
                    label="Year"
                    sortBy={sortBy}
                    sortDir={sortDir}
                    onToggle={onToggleSort}
                    right
                  />
                </tr>
              </thead>

              <tbody>
                {list.map((p) => (
                  <tr
                    key={p.id}
                    role="button"
                    tabIndex={0}
                    title="Click to open"
                    onClick={() => onRowClick(p)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") onRowClick(p);
                    }}
                    className={[
                      "group cp-row cp-holo cp-scanlines",
                      "border-b border-cyan-300/10 transition",
                      "cursor-pointer",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40",
                    ].join(" ")}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-2 w-2 rounded-full bg-cyan-300/30 transition group-hover:bg-fuchsia-300/60 shadow-[0_0_12px_rgba(0,255,255,0.14)]" />
                        <div>
                          <div className="text-sm font-medium text-neutral-100 group-hover:text-cyan-100 transition">
                            {p.title}
                          </div>

                          {p.shortDescription ? (
                            <div className="mt-1 text-xs text-neutral-400/90 line-clamp-1">
                              {p.shortDescription}
                            </div>
                          ) : null}

                          {Array.isArray(p.tags) && p.tags.length > 0 ? (
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {p.tags.slice(0, 3).map((t) => (
                                <Pill key={`${p.id}-tag-${t}`}>{t}</Pill>
                              ))}
                              {p.tags.length > 3 ? (
                                <Pill>+{p.tags.length - 3}</Pill>
                              ) : null}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="text-sm text-neutral-200/90 group-hover:text-neutral-100 transition">
                        {p.domain}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      {Array.isArray(p.tools) && p.tools.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {p.tools.slice(0, 3).map((t) => (
                            <Pill key={`${p.id}-tool-${t}`} tone="tool">
                              {t}
                            </Pill>
                          ))}
                          {p.tools.length > 3 ? (
                            <Pill tone="tool">+{p.tools.length - 3}</Pill>
                          ) : null}
                        </div>
                      ) : (
                        <span className="text-xs text-neutral-500">—</span>
                      )}
                    </td>

                    <td className="px-4 py-3 text-right">
                      <span className="text-sm text-neutral-200/90 group-hover:text-cyan-100 transition">
                        {p.year}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState onReset={null} />
        )}
      </div>
    </section>
  );
}
