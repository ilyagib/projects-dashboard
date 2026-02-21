import { useParams, Link } from "react-router-dom";
import { projectsData } from "../data/projectsData";
import PresentationViewer from "../components/PresentationViewer";

export default function ProjectPage() {
  const { id } = useParams();
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="cp-bg min-h-screen flex items-center justify-center">
        <div className="cp-panel cp-cut cp-glow-strong p-8 text-center">
          <h2 className="cp-heading text-xl mb-4">Project not found</h2>
          <Link
            to="/"
            className="cp-btn-strong rounded-lg px-4 py-2 text-sm"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cp-bg min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* HEADER */}
        <div className="cp-panel cp-cut cp-glow-strong p-8">
          <div className="text-xs text-white/50 tracking-widest mb-3">
            {project.domain.toUpperCase()} • {project.year}
          </div>

          <h1 className="cp-title text-3xl mb-4">
            {project.title}
          </h1>

          <p className="text-white/70 max-w-3xl">
            {project.shortDescription}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags?.map((tag) => (
              <span
                key={tag}
                className="cp-btn rounded-full px-3 py-1 text-xs text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* OVERVIEW */}
        <section className="cp-panel cp-cut p-6">
          <h3 className="cp-heading text-sm mb-3">OVERVIEW</h3>
          <p className="text-white/70">{project.overview}</p>
        </section>

        {/* EXECUTIVE SUMMARY */}
        <section className="cp-panel cp-cut p-6">
          <h3 className="cp-heading text-sm mb-3">EXECUTIVE SUMMARY</h3>
          <ul className="space-y-2 text-white/70 text-sm">
            {project.executiveSummary?.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </section>

        {/* KPI CARDS */}
        {project.kpis && (
          <section className="grid md:grid-cols-3 gap-6">
            {project.kpis.map((kpi, i) => (
              <div key={i} className="cp-kpi-2077 cp-cut p-6 cp-holo cp-scanlines">
                <div className="cp-kpi-title mb-2">{kpi.label}</div>
                <div className="cp-kpi-value text-2xl">{kpi.value}</div>
                <div className="text-xs text-white/50 mt-1">{kpi.sub}</div>
              </div>
            ))}
          </section>
        )}

        {/* STORY IMAGES */}
        {project.assets?.images && (
          <section className="space-y-8">
            {project.assets.images.map((img) => (
              <div key={img.id} className="cp-panel cp-cut p-6 space-y-4">
                <h3 className="cp-heading text-sm">{img.title}</h3>
                <p className="text-white/60 text-sm">
                  <strong>Question:</strong> {img.question}
                </p>
                <p className="text-white/60 text-sm">{img.description}</p>
                <p className="text-white/70 text-sm">
                  <strong>Insight:</strong> {img.insight}
                </p>
                <p className="text-white/70 text-sm">
                  <strong>Business Impact:</strong> {img.businessImpact}
                </p>
                <img
                  src={img.image}
                  alt={img.title}
                  className="rounded-xl border border-white/10"
                />
              </div>
            ))}
          </section>
        )}

        {/* TABLEAU DASHBOARD */}
        {project.assets?.tableau?.iframeUrl && (
          <section className="cp-panel cp-cut cp-glow-strong p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="cp-heading text-sm">
                INTERACTIVE DASHBOARD
              </h3>

              <a
                href={project.assets.tableau.openUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cp-btn-strong rounded-lg px-3 py-1.5 text-xs"
              >
                Open Fullscreen
              </a>
            </div>

            <div className="rounded-xl overflow-hidden border border-white/10">
              <iframe
                src={project.assets.tableau.iframeUrl}
                width="100%"
                height="500"
                style={{ border: "none" }}
                allowFullScreen
                title="Tableau Dashboard"
              />
            </div>
          </section>
        )}

 {/* PRESENTATION */}
{project.assets?.files?.length > 0 && (
  <section className="mt-8">
    <div className="flex items-center justify-between px-1 pb-3">
      <div className="text-[11px] uppercase tracking-[0.2em] text-white/60">
        Business Presentation
      </div>

      <a
        href={project.assets.files[0].url}
        download
        className="cp-btn-strong rounded-lg px-3 py-1.5 text-xs text-neutral-100"
      >
        Download PDF
      </a>
    </div>

    {/* בלי מסגרת נוספת כאן */}
    <PresentationViewer src={project.assets.files[0].url} />
  </section>
)}
      </div>
    </div>
  );
}