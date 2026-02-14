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
          <label className="mb-2 block text-xs font-medium tracking-wide text-neutral-300">
            Search
          </label>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, tool, tag, year..."
            className="
              cp-panel cp-border-glow
              h-11 w-full rounded-xl px-4
              text-sm text-neutral-100
              placeholder:text-neutral-500
              outline-none transition
              focus:ring-2 focus:ring-neutral-600
            "
          />
        </div>

        {/* Domain */}
        <div className="lg:col-span-3">
          <label className="mb-2 block text-xs font-medium tracking-wide text-neutral-300">
            Domain
          </label>

          <select
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value)}
            className="
              cp-panel cp-border-glow
              h-11 w-full rounded-xl px-3
              text-sm text-neutral-100
              outline-none transition
              focus:ring-2 focus:ring-neutral-600
            "
          >
            {domains.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Reset */}
        <div className="lg:col-span-1 lg:flex lg:items-end">
          <button
            onClick={onReset}
            type="button"
            className="
              cp-btn
              h-11 w-full rounded-xl
              px-4 text-sm text-neutral-100
              active:scale-[0.99]
            "
          >
            Reset
          </button>
        </div>

      </div>
    </div>
  );
}
