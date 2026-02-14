// src/pages/ProjectPage.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { projectsData } from "../data/projectsData";
import { Chip, Card, NavBtn } from "../components/ui";

export default function ProjectPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const headerRef = useRef(null);

  const [showTop, setShowTop] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [loading, setLoading] = useState(true);

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

  const project =
    projectIndex >= 0 ? orderedProjects[projectIndex] : null;

  const prevProject =
    projectIndex > 0 ? orderedProjects[projectIndex - 1] : null;

  const nextProject =
    projectIndex >= 0 &&
    projectIndex < orderedProjects.length - 1
      ? orderedProjects[projectIndex + 1]
      : null;

  // Skeleton loading
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(t);
  }, [id]);

  useEffect(() => {
    if (!project) return;

    setActiveImg(0);

    const onKeyDown = (e) => {
      const tag = (e.target?.tagName || "").toLowerCase();
      const isTyping =
        tag === "input" ||
        tag === "textarea" ||
        e.target?.isContentEditable;
      if (isTyping) return;

      if (e.key === "Escape") {
        e.preventDefault();
        navigate(-1);
      }

      if (e.key === "ArrowLeft" && prevProject)
        navigate(`/projects/${prevProject.id}`);

      if (e.key === "ArrowRight" && nextProject)
        navigate(`/projects/${nextProject.id}`);
    };

    const onScroll = () => setShowTop(window.scrollY > 250);

    window.addEventListener("keydown", onKeyDown, true);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("keydown", onKeyDown, true);
      window.removeEventListener("scroll", onScroll);
    };
  }, [navigate, project, prevProject, nextProject]);

  // ===== Skeleton =====
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100">
        <div className="mx-auto w-full max-w-6xl px-6 py-8 space-y-6">
          <div className="h-8 w-1/3 rounded skeleton" />
          <div className="h-4 w-1/2 rounded skeleton" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-4">
              <div className="h-32 rounded-2xl skeleton" />
              <div className="h-32 rounded-2xl skeleton" />
            </div>

            <div className="lg:col-span-5">
              <div className="h-72 rounded-2xl skeleton" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100">
        <div className="mx-auto w-full max-w-6xl px-6 py-10">
          <div className="cp-panel cp-border-glow rounded-2xl p-4">
            <div className="text-lg font-semibold">Project not found</div>
            <button
              className="mt-4 rounded-lg border border-neutral-700 bg-neutral-900/40 px-3 py-2 text-sm hover:border-neutral-500"
              onClick={() => navigate("/")}
            >
              Back to dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const tableau = project.assets?.tableau;

  const images =
    Array.isArray(project.assets?.images) &&
    project.assets.images.length > 0
      ? project.assets.images
      : project.assets?.previewImage
      ? [project.assets.previewImage]
      : [];

  const currentImage = images[activeImg] || null;

  const scrollTo = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    const headerH = headerRef.current?.offsetHeight ?? 0;
    const y =
      el.getBoundingClientRect().top +
      window.scrollY -
      headerH -
      12;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="animate-fade-in">
        <div className="mx-auto w-full max-w-6xl px-6 py-8">

          {/* Header */}
          <div
            ref={headerRef}
            className="sticky top-0 z-20 -mx-6 mb-6 border-b border-neutral-800 bg-neutral-950/85 px-6 py-4 backdrop-blur"
          >
            <div className="mb-2 text-xs text-neutral-400">
              <Link to="/" className="hover:text-neutral-200">
                Dashboard
              </Link>
              <span className="mx-2 text-neutral-600">/</span>
              <span className="text-neutral-300">{project.title}</span>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs text-neutral-400">
                  {project.domain} • {project.year}
                </div>

                <h1 className="cp-title cp-heading mt-2 text-3xl font-semibold tracking-tight">
                  {project.title}
                </h1>

                {project.shortDescription && (
                  <p className="cp-body cp-body-muted mt-2 text-sm">
                    {project.shortDescription}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  {(project.tags || []).map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                  {(project.tools || []).map((t) => (
                    <Chip key={t} variant="tool">
                      {t}
                    </Chip>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <NavBtn onClick={() => scrollTo("overview")}>
                    Overview
                  </NavBtn>
                  <NavBtn onClick={() => scrollTo("insights")}>
                    Insights
                  </NavBtn>
                  {tableau?.iframeUrl && (
                    <NavBtn onClick={() => scrollTo("dashboard")}>
                      Dashboard
                    </NavBtn>
                  )}
                </div>
              </div>

              <button
                onClick={() => navigate(-1)}
                className="cp-btn rounded-lg px-4 py-2 text-sm text-neutral-100"
              >
                Back
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

            <div className="lg:col-span-7 space-y-6">
              {project.overview && (
                <div id="overview">
                  <Card title="Overview">
                    <p className="text-sm leading-relaxed text-neutral-200">
                      {project.overview}
                    </p>
                  </Card>
                </div>
              )}

              {project.insights?.length > 0 && (
                <div id="insights">
                  <Card title="Insights">
                    <ul className="list-disc pl-5 space-y-2 text-sm text-neutral-200">
                      {project.insights.map((x, i) => (
                        <li key={i}>{x}</li>
                      ))}
                    </ul>
                  </Card>
                </div>
              )}
            </div>

            {/* Gallery */}
            <div className="lg:col-span-5">
              <Card title={null}>
                <div className="text-xs text-neutral-400 mb-3">Preview</div>

                <div className="overflow-hidden rounded-xl border border-neutral-800 bg-black">
                  {currentImage ? (
                    <img
                      src={currentImage}
                      alt=""
                      className="w-full object-contain"
                      style={{ maxHeight: "280px" }}
                    />
                  ) : (
                    <div className="h-[220px] flex items-center justify-center text-sm text-neutral-500">
                      No preview image
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>

          {/* Tableau */}
          {tableau?.iframeUrl && (
            <div
              id="dashboard"
              className="mt-6 overflow-hidden rounded-2xl border border-neutral-800"
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
          )}
        </div>

        {showTop && (
          <button
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            className="fixed bottom-5 right-5 z-50 rounded-xl border border-neutral-700 bg-neutral-900/70 px-4 py-2 text-sm text-neutral-100 backdrop-blur hover:border-neutral-500"
          >
            Back to top
          </button>
        )}
      </div>
    </div>
  );
}
