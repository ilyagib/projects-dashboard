export default function Controls({
  search,
  setSearch,
  domainFilter,
  setDomainFilter,
  domains,
  onReset,
}) {
  return (
    <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-end">
      <div className="flex-1">
        <label className="text-xs text-neutral-300">Search</label>
        <input
          className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-900/60 px-3 py-2 text-sm text-neutral-100 outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-600"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, tool, tag, year..."
        />
      </div>

      <div className="w-full md:w-64">
        <label className="text-xs text-neutral-300">Domain</label>
        <select
          className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-900/60 px-3 py-2 text-sm text-neutral-100 outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-600"
          value={domainFilter}
          onChange={(e) => setDomainFilter(e.target.value)}
        >
          {domains.map((d) => (
            <option key={d} value={d} className="bg-neutral-900">
              {d}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={onReset}
        className="h-[42px] w-full rounded-xl border border-neutral-700 bg-neutral-900/60 px-4 text-sm text-neutral-100 transition hover:border-neutral-500 hover:bg-neutral-900 md:w-auto"
      >
        Reset
      </button>
    </div>
  );
}
