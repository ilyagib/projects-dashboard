export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  const github = project.links?.github || "";
  const live = project.links?.live || "";
  const report = project.links?.report || "";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-neutral-700 bg-neutral-900 p-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs text-neutral-300">
              {project.domain} • {project.year} • <span className="text-neutral-400">{project.id}</span>
            </div>
            <h3 className="mt-1 text-lg font-semibold text-neutral-50">
              {project.title}
            </h3>
            {project.shortDescription && (
              <p className="mt-2 text-sm text-neutral-200">{project.shortDescription}</p>
            )}
          </div>

          <button
            onClick={onClose}
            className="h-9 w-9 rounded-xl border border-neutral-700 bg-neutral-950/40 text-neutral-100 transition hover:border-neutral-500 hover:bg-neutral-950"
            aria-label="Close"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Tags */}
        {Array.isArray(project.tags) && project.tags.length > 0 && (
          <div className="mt-4">
            <div className="text-xs text-neutral-300">Tags</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-neutral-700 bg-neutral-950/40 px-3 py-1 text-xs text-neutral-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tools */}
        <div className="mt-4">
          <div className="text-xs text-neutral-300">Tools</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.tools.map((t) => (
              <span
                key={t}
                className="rounded-full border border-neutral-700 bg-neutral-950/40 px-3 py-1 text-xs text-neutral-200"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Content preview (ה"פרויקט עצמו" בקצרה) */}
        {project.content?.overview && (
          <div className="mt-5">
            <div className="text-xs text-neutral-300">Overview</div>
            <p className="mt-2 text-sm text-neutral-200">{project.content.overview}</p>
          </div>
        )}

        {Array.isArray(project.content?.insights) && project.content.insights.length > 0 && (
          <div className="mt-4">
            <div className="text-xs text-neutral-300">Key insights</div>
            <ul className="mt-2 list-disc pl-5 text-sm text-neutral-200 space-y-1">
              {project.content.insights.slice(0, 3).map((ins) => (
                <li key={ins}>{ins}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Links */}
        <div className="mt-6 flex flex-wrap justify-end gap-2">
          {github && (
            <a
              className="rounded-xl border border-neutral-700 bg-neutral-950/40 px-4 py-2 text-sm text-neutral-100 transition hover:border-neutral-500 hover:bg-neutral-950"
              href={github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          )}
          {live && (
            <a
              className="rounded-xl border border-neutral-700 bg-neutral-950/40 px-4 py-2 text-sm text-neutral-100 transition hover:border-neutral-500 hover:bg-neutral-950"
              href={live}
              target="_blank"
              rel="noreferrer"
            >
              Live Demo
            </a>
          )}
          {report && (
            <a
              className="rounded-xl border border-neutral-700 bg-neutral-950/40 px-4 py-2 text-sm text-neutral-100 transition hover:border-neutral-500 hover:bg-neutral-950"
              href={report}
              target="_blank"
              rel="noreferrer"
            >
              Report
            </a>
          )}
          <button
            onClick={onClose}
            className="rounded-xl border border-neutral-700 bg-neutral-950/40 px-4 py-2 text-sm text-neutral-100 transition hover:border-neutral-500 hover:bg-neutral-950"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
