function Card({ title, value }) {
  return (
    <div className="rounded-xl border border-neutral-700 bg-neutral-900/60 p-4 text-center transition hover:border-neutral-500 hover:bg-neutral-900">
      <div className="text-sm font-medium text-neutral-200">{title}</div>
      <div className="mt-2 text-2xl font-semibold text-neutral-50">{value}</div>
    </div>
  );
}

export default function KpiGrid({ total, domains, tools, latestYear }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card title="Total Projects" value={total} />
      <Card title="Domains Covered" value={domains} />
      <Card title="Tools Used" value={tools} />
      <Card title="Latest Year" value={latestYear} />
    </div>
  );
}
