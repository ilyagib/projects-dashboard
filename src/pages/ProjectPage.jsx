// src/pages/ProjectPage.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { projectsData } from "../data/projectsData";

function Chip({ children, variant = "tag" }) {
  const styles =
    variant === "tool"
      ? "border-fuchsia-300/25 bg-[rgba(10,10,18,0.55)] text-neutral-100"
      : "border-cyan-200/15 bg-[rgba(10,10,18,0.45)] text-neutral-200/90";

  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-3 py-1 text-xs transition select-none",
        styles,
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function Card({ title, children }) {
  return (
    <div className="cp-panel cp-cut cp-scanlines p-4 border border-cyan-300/10">
      {title ? (
        <div className="text-[11px] tracking-[0.14em] uppercase cp-heading text-neutral-400">
          {title}
        </div>
      ) : null}
      <div className={title ? "mt-2" : ""}>{children}</div>
    </div>
  );
}

function NavBtn({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cp-btn-strong cp-cut rounded-lg px-3 py-1.5 text-[11px] uppercase cp-heading text-neutral-100"
    >
      {children}
    </button>
  );
}

export default function ProjectPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const headerRef = useRef(null);
  const [showTop, setShowTop] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  const orderedProjects = useMemo(() => {
    return [...projectsData].sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return String(a.title).localeCompare(String(b.title));
    });
  }, []);

  const projectIndex = useMemo(
    () => orderedProjects.findIndex((p) => p.id === id),
    [orderedProjects, id]
  );

  const project = useMemo(() => {
    if (projectIndex >= 0) return orderedProjects[projectIndex];
    return null;
  }, [orderedProjects, projectIndex]);

  const prevProject = projectIndex > 0 ? orderedProjects[projectIndex - 1] : null;
  const nextProject =
    projectIndex >= 0 && projectIndex < orderedProjects.length - 1
      ? orderedProjects[projectIndex + 1]
      : null;

  useEffect(() => {
    if (!project) return;

    setActiveImg(0);

    const onScroll = () => setShowTop(window.scrollY > 250);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const onKeyDown = (e) => {
      const tag = (e.target?.tagName || "").toLowerCase();
      const isTyping = tag === "input" || tag === "textarea" || e.target?.isContentEditable;
      if (isTyping) return;

      if (e.key === "Escape") {
        e.preventDefault();
        navigate(-1);
      }
      if (e.key === "ArrowLeft" && prevProject) navigate(`/projects/${prevProject.id}`);
      if (e.key === "ArrowRight" && nextProject) navigate(`/projects/${nextProject.id}`);
    };

    window.addEventListener("keydown", onKeyDown, true);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown, true);
    };
  }, [project, navigate, prevProject, nextProject]);

  if (!project) {
    return (
      <div className="py-10">
        <div className="cp-panel cp-cut p-6 border border-cyan-300/10">
          <div className="text-lg font-semibold cp-heading">Project not found</div>
          <button
            className="mt-4 cp-btn-strong cp-cut rounded-lg px-4 py-2 text-xs cp-heading"
            onClick={() => navigate("/")}
            type="button"
          >
            Back to dashboard
          </button>
        </div>
      </div>
    );
  }

  const tableau = project.assets?.tableau;

  const images =
    Array.isArray(project.assets?.images) && project.assets.images.length > 0
      ? project.assets.images
      : project.assets?.previewImage
      ? [project.assets.previewImage]
      : [];

  const currentImage = images[activeImg] || null;

  const scrollTo = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    const headerH = headerRef.current?.offsetHeight ?? 0;
    const extraGap = 12;
    const y = el.getBoundingClientRect().top + window.scrollY - headerH - extraGap;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="animate-fade-in">
      {/* Sticky Header */}
      <div
        ref={headerRef}
        className="sticky top-0 z-20 -mx-6 mb-6 border-b border-cyan-300/15 bg-neutral-950/85 px-6 py-4 backdrop-blur cp-scanlines"
      >
        {/* Breadcrumbs */}
        <div className="mb-2 text-xs text-neutral-500">
          <Link to="/" className="hover:text-cyan-300">
            Dashboard
          </Link>
          <span className="mx-2 text-neutral-700">/</span>
          <span className="text-neutral-300">{project.title}</span>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[11px] tracking-[0.14em] uppercase cp-heading text-neutral-400">
              {project.domain} • {project.year}
            </div>

            <h1 className="mt-2 text-3xl font-semibold cp-title cp-heading truncate">
              {project.title}
            </h1>

            {project.shortDescription ? (
              <p className="mt-2 text-sm text-neutral-300/90">{project.shortDescription}</p>
            ) : null}

            <div className="mt-4 flex flex-wrap gap-2">
              {(project.tags || []).map((t) => (
                <Chip key={`tag-${t}`} variant="tag">
                  {t}
                </Chip>
              ))}
              {(project.tools || []).map((t) => (
                <Chip key={`tool-${t}`} variant="tool">
                  {t}
                </Chip>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <NavBtn onClick={() => scrollTo("overview")}>Overview</NavBtn>
              <NavBtn onClick={() => scrollTo("insights")}>Insights</NavBtn>
              {tableau?.iframeUrl ? (
                <NavBtn onClick={() => scrollTo("dashboard")}>Dashboard</NavBtn>
              ) : null}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {tableau?.iframeUrl ? (
              <a
                href={tableau.openUrl || tableau.iframeUrl}
                target="_blank"
                rel="noreferrer"
                className="cp-btn-strong cp-cut rounded-lg px-4 py-2 text-[11px] uppercase cp-heading text-neutral-100"
              >
                Open in new tab
              </a>
            ) : null}

            <button
              onClick={() => navigate(-1)}
              className="cp-btn-strong cp-cut rounded-lg px-4 py-2 text-[11px] uppercase cp-heading text-neutral-100"
              type="button"
            >
              Back
            </button>
          </div>
        </div>
      </div>

      {/* Content grid */}
      <div className="mt-2 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-6">
          {project.overview ? (
            <div id="overview">
              <Card title="Overview">
                <p className="text-sm leading-relaxed text-neutral-200/90">{project.overview}</p>
              </Card>
            </div>
          ) : null}

          {Array.isArray(project.insights) && project.insights.length > 0 ? (
            <div id="insights">
              <Card title="Insights">
                <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-200/90">
                  {project.insights.map((x, i) => (
                    <li key={i}>{x}</li>
                  ))}
                </ul>
              </Card>
            </div>
          ) : null}
        </div>

        {/* Gallery */}
        <div className="lg:col-span-5">
          <Card title={null}>
            <div className="flex items-center justify-between">
              <div className="text-[11px] tracking-[0.14em] uppercase cp-heading text-neutral-400">
                Preview
              </div>
              {images.length > 1 ? (
                <div className="text-xs text-neutral-500">
                  {activeImg + 1}/{images.length}
                </div>
              ) : null}
            </div>

            <div className="mt-3 overflow-hidden rounded-xl border border-cyan-300/15 bg-black">
              {currentImage ? (
                <img
                  src={currentImage}
                  alt="Project preview"
                  className="block w-full object-contain"
                  style={{ maxHeight: "280px" }}
                />
              ) : (
                <div className="flex h-[220px] items-center justify-center text-sm text-neutral-500">
                  No preview image
                </div>
              )}
            </div>

            {images.length > 1 ? (
              <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {images.map((src, idx) => (
                  <button
                    key={`${src}-${idx}`}
                    type="button"
                    onClick={() => setActiveImg(idx)}
                    className={[
                      "shrink-0 overflow-hidden rounded-lg border transition",
                      idx === activeImg
                        ? "border-fuchsia-300/50 shadow-[0_0_18px_rgba(255,0,140,0.16)]"
                        : "border-cyan-300/15 hover:border-cyan-300/35",
                    ].join(" ")}
                    title={`Image ${idx + 1}`}
                  >
                    <img src={src} alt="" className="h-14 w-24 object-cover" />
                  </button>
                ))}
              </div>
            ) : null}
          </Card>
        </div>
      </div>

      {/* Tableau (חזר) */}
      {tableau?.iframeUrl ? (
        <div
          id="dashboard"
          className="mt-6 overflow-hidden rounded-2xl border border-cyan-300/15 bg-black cp-scanlines cp-border-glow"
        >
          <div className="aspect-[16/9] w-full">
            <iframe
              src={tableau.iframeUrl}
              className="h-full w-full"
              frameBorder="0"
              allowFullScreen
              title="Tableau dashboard"
            />
          </div>
        </div>
      ) : null}

      {/* Next/Prev */}
      <div className="mt-8 flex flex-col gap-3 border-t border-cyan-300/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs text-neutral-500">
          Tip: <span className="text-neutral-300">←</span>/<span className="text-neutral-300">→</span>{" "}
          to switch projects
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            disabled={!prevProject}
            onClick={() => prevProject && navigate(`/projects/${prevProject.id}`)}
            className={[
              "cp-btn-strong cp-cut rounded-lg px-4 py-2 text-[11px] uppercase cp-heading transition",
              prevProject
                ? "text-neutral-100"
                : "opacity-40 cursor-not-allowed text-neutral-400",
            ].join(" ")}
          >
            ← Previous
          </button>

          <button
            type="button"
            disabled={!nextProject}
            onClick={() => nextProject && navigate(`/projects/${nextProject.id}`)}
            className={[
              "cp-btn-strong cp-cut rounded-lg px-4 py-2 text-[11px] uppercase cp-heading transition",
              nextProject
                ? "text-neutral-100"
                : "opacity-40 cursor-not-allowed text-neutral-400",
            ].join(" ")}
          >
            Next →
          </button>
        </div>
      </div>

      {/* Back to top */}
      {showTop ? (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-5 right-5 cp-btn-strong cp-cut rounded-lg px-4 py-2 text-[11px] uppercase cp-heading text-neutral-100"
        >
          Top
        </button>
      ) : null}
    </div>
  );
}
