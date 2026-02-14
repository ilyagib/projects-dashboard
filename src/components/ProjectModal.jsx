// src/components/ProjectModal.jsx
import { useEffect, useRef, useState } from "react";

export default function ProjectModal({ project, onClose, onOpenFull }) {
  const panelRef = useRef(null);
  const screenshot = project.assets?.screenshots?.[0];

  const [isOpen, setIsOpen] = useState(false);
  const closeTimerRef = useRef(null);

  const requestClose = () => {
    // play close animation, then call onClose
    setIsOpen(false);
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      onClose();
    }, 170);
  };

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") requestClose();
    };

    window.addEventListener("keydown", onKeyDown);

    // open animation (next tick)
    const t = window.setTimeout(() => {
      setIsOpen(true);
      panelRef.current?.focus();
    }, 0);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(t);
      window.clearTimeout(closeTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={[
        "fixed inset-0 z-50 flex items-center justify-center px-4",
        "transition-opacity duration-200",
        isOpen ? "opacity-100" : "opacity-0",
      ].join(" ")}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) requestClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className={[
          "relative w-full max-w-3xl overflow-hidden rounded-2xl",
          "border border-neutral-700 bg-neutral-950 outline-none",
          "transition-transform duration-200 will-change-transform",
          isOpen ? "scale-100 translate-y-0" : "scale-[0.98] translate-y-2",
        ].join(" ")}
      >
        {/* HEADER */}
        <div className="flex items-start justify-between gap-4 border-b border-neutral-800 p-4">
          <div>
            <div className="text-xs text-neutral-400">
              {project.domain} • {project.year}
            </div>
            <div className="mt-1 text-lg font-semibold text-neutral-100">
              {project.title}
            </div>
            {project.shortDescription && (
              <div className="mt-1 text-sm text-neutral-300">
                {project.shortDescription}
              </div>
            )}
          </div>

          <button
            onClick={requestClose}
            className="rounded-lg border border-neutral-700 bg-neutral-900/40 px-3 py-1.5 text-xs text-neutral-100 hover:border-neutral-500"
          >
            Close
          </button>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-2">
          {/* LEFT */}
          <div className="space-y-3">
            {Array.isArray(project.kpis) && project.kpis.length > 0 && (
              <div className="grid grid-cols-1 gap-2">
                {project.kpis.slice(0, 3).map((k) => (
                  <div
                    key={`${k.label}-${k.value}`}
                    className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-3"
                  >
                    <div className="text-xs text-neutral-400">{k.label}</div>
                    <div className="mt-1 text-base font-semibold text-neutral-100">
                      {k.value}
                    </div>
                    {k.sub && (
                      <div className="mt-1 text-xs text-neutral-500">{k.sub}</div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {project.overview && (
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-3">
                <div className="text-xs text-neutral-400">Overview</div>
                <div className="mt-2 text-sm text-neutral-200 line-clamp-6">
                  {project.overview}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div>
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-3">
              <div className="text-xs text-neutral-400">Preview</div>

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
                    No screenshot yet
                  </div>
                )}
              </div>

              <div className="mt-3 flex justify-end gap-2">
                <button
                  onClick={() => {
                    onOpenFull();
                    requestClose();
                  }}
                  className="rounded-lg border border-neutral-700 bg-neutral-900/40 px-3 py-1.5 text-xs text-neutral-100 hover:border-neutral-500"
                >
                  Open project
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* bottom close hint (optional) */}
        <div className="border-t border-neutral-800 px-4 py-3 text-xs text-neutral-500">
          Tip: click outside or press Esc to close
        </div>
      </div>
    </div>
  );
}
