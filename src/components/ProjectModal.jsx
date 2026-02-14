// src/components/ProjectModal.jsx
import { useEffect, useMemo, useRef } from "react";

export default function ProjectModal({ project, onClose, onOpenFull }) {
  const panelRef = useRef(null);

  const screenshot = useMemo(() => {
    const a = project?.assets || {};
    return (
      a?.screenshots?.[0] ||
      a?.previewImage ||
      (Array.isArray(a?.images) ? a.images[0] : null) ||
      null
    );
  }, [project]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", onKeyDown);
    const t = setTimeout(() => panelRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
      clearTimeout(t);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
      role="dialog"
      aria-modal="true"
    >
      {/* overlay vignette + noise feel (uses your cp-bg pseudo layers) */}
      <div className="absolute inset-0 cp-bg opacity-40" />

      <div
        ref={panelRef}
        tabIndex={-1}
        className={[
          "relative z-10 w-full max-w-3xl outline-none",
          "cp-panel cp-cut cp-glow-strong cp-holo cp-scanlines",
          "cp-pop",
        ].join(" ")}

      >
        {/* TOP BAR */}
        <div className="cp-accent-line">
          <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-neutral-800/80">
            <div className="min-w-0">
              <div className="text-[11px] tracking-widest text-neutral-400 uppercase">
                {project.domain} • {project.year}
              </div>

              <div
            className="mt-1 text-xl font-semibold cp-title truncate cp-glitch"
            data-text={project.title}
          >
            {project.title}
          </div>


              {project.shortDescription ? (
                <div className="mt-1 text-sm text-neutral-300/90 line-clamp-2">
                  {project.shortDescription}
                </div>
              ) : null}

              {(project.tags?.length || project.tools?.length) ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {(project.tags || []).slice(0, 4).map((t) => (
                    <span
                      key={`tag-${t}`}
                      className="cp-btn-strong rounded-full px-3 py-1 text-[11px] text-neutral-100"
                    >
                      {t}
                    </span>
                  ))}
                  {(project.tools || []).slice(0, 3).map((t) => (
                    <span
                      key={`tool-${t}`}
                      className="cp-btn rounded-full px-3 py-1 text-[11px] text-neutral-100"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            <button
              onClick={onClose}
              className="cp-btn-strong rounded-lg px-3 py-1.5 text-xs text-neutral-100"
              type="button"
            >
              Close
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="grid grid-cols-1 gap-4 p-5 lg:grid-cols-2">
          {/* LEFT */}
          <div className="space-y-3">
            {Array.isArray(project.kpis) && project.kpis.length > 0 ? (
              <div className="grid grid-cols-1 gap-2">
                {project.kpis.slice(0, 3).map((k) => (
                  <div
                    key={`${k.label}-${k.value}`}
                    className="cp-panel cp-cut cp-holo cp-scanlines border border-neutral-800/70 px-4 py-3"
                  >
                    <div className="text-[11px] tracking-widest text-neutral-400 uppercase">
                      {k.label}
                    </div>
                    <div className="mt-1 text-lg font-semibold cp-kpi-value">
                      {k.value}
                    </div>
                    {k.sub ? (
                      <div className="mt-1 text-xs text-neutral-400/80">
                        {k.sub}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}

            {project.overview ? (
              <div className="cp-panel cp-cut border border-neutral-800/70 px-4 py-3">
                <div className="text-[11px] tracking-widest text-neutral-400 uppercase">
                  Overview
                </div>
                <div className="mt-2 text-sm text-neutral-200/90 line-clamp-6">
                  {project.overview}
                </div>
              </div>
            ) : null}
          </div>

          {/* RIGHT */}
          <div className="cp-panel cp-cut border border-neutral-800/70 px-4 py-3">
            <div className="text-[11px] tracking-widest text-neutral-400 uppercase">
              Preview
            </div>

            <div className="mt-3 overflow-hidden rounded-xl border border-neutral-800 bg-black">
              {screenshot ? (
                <img
                  src={screenshot}
                  alt="Project preview"
                  className="block w-full object-contain"
                  style={{ maxHeight: "320px" }}
                />
              ) : (
                <div className="flex h-[220px] items-center justify-center text-sm text-neutral-500">
                  No preview image
                </div>
              )}
            </div>

            <div className="mt-3 flex justify-end gap-2">
              <button
                onClick={onOpenFull}
                className="cp-btn-strong rounded-lg px-3 py-1.5 text-xs text-neutral-100"
                type="button"
              >
                Open project
              </button>
            </div>

            <div className="mt-3 text-[11px] text-neutral-500">
              Tip: Esc closes • Click outside closes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
