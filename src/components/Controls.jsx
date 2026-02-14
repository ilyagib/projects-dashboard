// src/components/Controls.jsx
export default function Controls({
  search,
  setSearch,
  domainFilter,
  setDomainFilter,
  domains,
  onReset,
}) {
  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Search */}
        <div className="lg:col-span-8">
          <label className="mb-2 block text-[11px] tracking-[0.14em] text-neutral-300/80 uppercase cp-heading">
            Search
          </label>

          <div className="relative cp-cut">
            <div className="pointer-events-none absolute inset-0 rounded-2xl border border-cyan-300/20 shadow-[0_0_22px_rgba(0,255,255,0.10)]" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, tool, tag, year..."
              className={[
                "w-full h-11 rounded-2xl px-4",
                "bg-[rgba(10,10,18,0.55)]",
                "border border-cyan-300/25",
                "text-sm text-neutral-100 placeholder:text-neutral-500",
                "outline-none transition",
                "focus:border-fuchsia-400/60",
                "focus:shadow-[0_0_0_1px_rgba(255,0,140,0.25),0_0_26px_rgba(255,0,140,0.18)]",
                "caret-cyan-300",
              ].join(" ")}
            />
          </div>
        </div>

        {/* Domain */}
        <div className="lg:col-span-3">
          <label className="mb-2 block text-[11px] tracking-[0.14em] text-neutral-300/80 uppercase cp-heading">
            Domain
          </label>

          <div className="relative cp-cut">
            <div className="pointer-events-none absolute inset-0 rounded-2xl border border-cyan-300/20 shadow-[0_0_22px_rgba(0,255,255,0.10)]" />

            <select
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              className={[
                "w-full h-11 rounded-2xl px-3 pr-9",
                "bg-[rgba(10,10,18,0.55)]",
                "border border-cyan-300/25",
                "text-sm text-neutral-100",
                "outline-none transition appearance-none",
                "focus:border-fuchsia-400/60",
                "focus:shadow-[0_0_0_1px_rgba(255,0,140,0.25),0_0_26px_rgba(255,0,140,0.18)]",
              ].join(" ")}
            >
              {domains.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            {/* dropdown arrow */}
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-cyan-200/70">
              ▾
            </div>
          </div>
        </div>

        {/* Reset */}
        <div className="lg:col-span-1 lg:flex lg:items-end">
          <button
            onClick={onReset}
            type="button"
            className={[
              "w-full h-11",
              "cp-btn-strong cp-cut",
              "text-xs tracking-[0.12em] uppercase cp-heading",
              "text-neutral-100",
            ].join(" ")}
            title="Reset filters"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
