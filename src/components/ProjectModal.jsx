export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-xl rounded-2xl border border-neutral-700 bg-neutral-900 p-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs text-neutral-300">
              {project.domain} • {project.year}
            </div>
            <h3 className="mt-1 text-lg font-semibold text-neutral-50">
              {project.project_name}
            </h3>
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

        {project.description && (
          <p className="mt-3 text-sm text-neutral-200">{project.description}</p>
        )}

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

        <div className="mt-5 flex flex-wrap justify-end gap-2">
          {project.githubUrl && (
            <a
              className="rounded-xl border border-neutral-700 bg-neutral-950/40 px-4 py-2 text-sm text-neutral-100 transition hover:border-neutral-500 hover:bg-neutral-950"
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          )}
          {project.demoUrl && (
            <a
              className="rounded-xl border border-neutral-700 bg-neutral-950/40 px-4 py-2 text-sm text-neutral-100 transition hover:border-neutral-500 hover:bg-neutral-950"
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
            >
              Live Demo
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
