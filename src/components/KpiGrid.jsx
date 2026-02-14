// src/components/KpiGrid.jsx
function Card({ title, value, icon }) {
  return (
    <div className="cp-kpi-2077 cp-cut cp-holo cp-scanlines p-5">
      <div className="flex items-center justify-between">
        <div className="cp-kpi-icon text-base">{icon}</div>

        <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />
      </div>

      <div className="mt-4 cp-kpi-title">{title}</div>

      <div className="mt-2 text-4xl font-semibold cp-kpi-value">
        {value}
      </div>
    </div>
  );
}


export default function KpiGrid({ total, domains, tools }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 animate-fade-in">
      <Card title="Total Projects" value={total} icon="📊" />
      <Card title="Domains Covered" value={domains} icon="🗂️" />
      <Card title="Tools Used" value={tools} icon="🛠️" />
    </div>
  );
}
