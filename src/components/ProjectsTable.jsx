// src/components/ProjectsTable.jsx

function Pill({ children, tone = "neutral" }) {
  const tones = {
    neutral: "border-neutral-800 bg-neutral-900/30 text-neutral-200",
    tool: "border-neutral-700 bg-neutral-900/40 text-neutral-100",
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
    <th
      className={[
        "px-4 py-3",
        right ? "text-right" : "text-left",
        "whitespace-nowrap",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={() => onToggle(col)}
        className={[
          "inline-flex items-center gap-2 text-xs font-medium tracking-wide transition",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-600",
          active ? "text-neutral-100" : "text-neutral-400 hover:text-neutral-200",
        ].join(" ")}
      >
        <span className={active ? "cp-neon" : ""}>{label}</span>
        <span className={active ? "text-neutral-300" : "text-neutral-700"}>
          {active ? (sortDir === "asc" ? "↑" : "↓") : "↑↓"}
        </span>
      </button>
    </th>
  );
}

function EmptyState({ onReset }) {
  return (
    <div className="p-10 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900/30 text-lg">
        🔎
      </div>

      <div className="mt-4 text-lg font-semibold text-neutral-100">
        No projects match your filters
      </div>

      <div className="mt-2 text-sm text-neutral-400">
        Try clearing the search or switching domain.
      </div>

      {onReset ? (
        <button
          type="button"
          onClick={onReset}
          className="cp-btn mt-5 rounded-xl px-4 py-2 text-sm text-neutral-100"
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
          <span className="font-semibold text-neutral-100">{list.length}</span>{" "}
          <span className="text-neutral-500">/ {totalCount}</span>
        </div>
      </div>

      {/* Terminal frame */}
      <div className="cp-panel cp-border-glow relative mt-4 overflow-hidden rounded-2xl">
        {/* Scanline overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            background:
              "repeating-linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(255,255,255,0.05) 1px, transparent 1px, transparent 6px)",
          }}
        />

        {/* top neon bar */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, rgba(60,255,245,0), rgba(60,255,245,0.55), rgba(255,54,166,0.35), rgba(60,255,245,0))",
          }}
        />

        {hasProjects ? (
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full">
              <thead className="border-b border-neutral-800/70 bg-neutral-950/30">
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
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-neutral-400">
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
                      "border-b border-neutral-800/70 transition",
                      "cursor-pointer",
                      "hover:bg-transparent",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40",
                    ].join(" ")}


                  >
                    <td className="px-4 py-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-2 w-2 rounded-full bg-neutral-700 transition group-hover:bg-neutral-300" />
                        <div>
                          <div className="text-sm font-medium text-neutral-100 group-hover:cp-neon">
                            {p.title}
                          </div>

                          {p.shortDescription ? (
                            <div className="mt-1 text-xs text-neutral-400 line-clamp-1">
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
                      <div className="text-sm text-neutral-200">{p.domain}</div>
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
                      <span className="text-sm text-neutral-200">{p.year}</span>
                    </td>

                    {/* subtle right glow on hover */}
                    <td className="pointer-events-none absolute right-0 top-0 hidden h-full w-16 group-hover:block">
                      <div
                        className="h-full w-full opacity-60"
                        style={{
                          background:
                            "linear-gradient(270deg, rgba(60,255,245,0.10), rgba(255,54,166,0.06), transparent)",
                        }}
                      />
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
