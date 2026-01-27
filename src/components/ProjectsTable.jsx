export default function ProjectsTable({
  projects,
  totalCount,
  sortBy,
  sortDir,
  onToggleSort,
  onRowClick,
}) {
  const indicator = (col) => {
    if (sortBy !== col) return "";
    return sortDir === "asc" ? " ▲" : " ▼";
  };

  const Th = ({ col, children }) => (
    <th
      onClick={() => onToggleSort(col)}
      className="cursor-pointer select-none border-b border-neutral-700 px-3 py-3 text-left text-sm font-medium text-neutral-200 hover:text-neutral-50"
      title="Sort"
    >
      {children}
      <span className="text-neutral-400">{indicator(col)}</span>
    </th>
  );

  return (
    <div className="mt-6">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-semibold text-neutral-50">Projects</h2>
        <div className="text-xs text-neutral-300">
          Showing {projects.length} / {totalCount}
        </div>
      </div>

      <div className="mt-3 overflow-hidden rounded-xl border border-neutral-700">
        <table className="w-full border-collapse">
          <thead className="bg-neutral-900">
            <tr>
              <Th col="title">Project</Th>
              <Th col="domain">Domain</Th>
              <Th col="year">Year</Th>
              <th className="border-b border-neutral-700 px-3 py-3 text-left text-sm font-medium text-neutral-200">
                Tools
              </th>
            </tr>
          </thead>

          <tbody className="bg-neutral-950/40">
            {projects.map((p) => (
              <tr
                key={p.id}
                onClick={() => onRowClick(p)}
                className="cursor-pointer transition hover:bg-neutral-900/50"
                title="Click for details"
              >
                <td className="border-b border-neutral-900 px-3 py-3 text-sm text-neutral-100">
                  <div className="font-medium">{p.title}</div>
                  {p.shortDescription && (
                    <div className="mt-1 text-xs text-neutral-400 line-clamp-2">
                      {p.shortDescription}
                    </div>
                  )}
                </td>

                <td className="border-b border-neutral-900 px-3 py-3 text-sm text-neutral-200">
                  {p.domain}
                </td>

                <td className="border-b border-neutral-900 px-3 py-3 text-sm text-neutral-200">
                  {p.year}
                </td>

                <td className="border-b border-neutral-900 px-3 py-3 text-sm text-neutral-200">
                  {p.tools.join(", ")}
                </td>
              </tr>
            ))}

            {projects.length === 0 && (
              <tr>
                <td className="px-3 py-6 text-center text-sm text-neutral-300" colSpan={4}>
                  No results. Try clearing filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-2 text-xs text-neutral-400">
        Tip: click a row for details • ESC to close
      </div>
    </div>
  );
}
