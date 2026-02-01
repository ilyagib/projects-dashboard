import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { projectsData } from "../data/projectsData";

/* ---------- UI helpers ---------- */

function Pill({ children }) {
  return (
    <span className="rounded-full border border-neutral-700 bg-neutral-950/40 px-3 py-1 text-xs text-neutral-200">
      {children}
    </span>
  );
}

function Section({ title, children, hideTitle = false }) {
  return (
    <div className="mt-6">
      {!hideTitle && (
        <div className="text-xs font-medium text-neutral-300">{title}</div>
      )}
      <div className="mt-2 rounded-xl border border-neutral-700 bg-neutral-900/40 p-4">
        {children}
      </div>
    </div>
  );
}

function ExternalButton({ href, children }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="rounded-xl border border-neutral-700 bg-neutral-900/40 px-4 py-2 text-sm text-neutral-100 transition hover:border-neutral-500 hover:bg-neutral-900"
    >
      {children}
    </a>
  );
}

/* ---------- Screenshot carousel ---------- */

function ScreenshotCarousel({ screenshots = [], maxWidthClass = "max-w-2xl" }) {
  const [idx, setIdx] = useState(0);
  if (!screenshots.length) return null;

  const prev = () =>
    setIdx((i) => (i - 1 + screenshots.length) % screenshots.length);
  const next = () => setIdx((i) => (i + 1) % screenshots.length);

  const activeSrc = screenshots[idx];

  return (
    <div className={`mx-auto w-full ${maxWidthClass}`}>
      <a
        href={activeSrc}
        target="_blank"
        rel="noreferrer"
        className="group relative block overflow-hidden rounded-xl border border-neutral-700 bg-neutral-950/40 transition hover:border-neutral-500"
        title="Open full size"
      >
        <img
          src={activeSrc}
          alt="Project screenshot"
          loading="lazy"
          className="block w-full h-auto object-contain transition-transform duration-200 ease-out group-hover:scale-[1.03]"
        />

        {screenshots.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                prev();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-xl border border-neutral-700 bg-neutral-950/60 px-3 py-2 text-sm text-neutral-100 opacity-0 transition hover:border-neutral-500 hover:bg-neutral-950 group-hover:opacity-100"
              aria-label="Previous screenshot"
            >
              ←
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                next();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl border border-neutral-700 bg-neutral-950/60 px-3 py-2 text-sm text-neutral-100 opacity-0 transition hover:border-neutral-500 hover:bg-neutral-950 group-hover:opacity-100"
              aria-label="Next screenshot"
            >
              →
            </button>
          </>
        )}
      </a>

      {screenshots.length > 1 && (
        <>
          <div className="mt-3 flex items-center justify-center gap-2">
            {screenshots.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setIdx(i)}
                className={`h-2.5 w-2.5 rounded-full border transition ${
                  i === idx
                    ? "border-neutral-300 bg-neutral-300"
                    : "border-neutral-600 bg-transparent hover:border-neutral-400"
                }`}
                aria-label={`Go to screenshot ${i + 1}`}
              />
            ))}
          </div>

          <div className="mt-2 text-center text-xs text-neutral-400">
            {idx + 1} / {screenshots.length}
          </div>
        </>
      )}
    </div>
  );
}

/* ---------- Page ---------- */

export default function ProjectPage() {
  const { id } = useParams();

  const project = useMemo(
    () => projectsData.find((p) => p.id === id) || null,
    [id]
  );

  if (!project) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100">
        <div className="mx-auto w-full max-w-4xl px-6 py-10">
          <div className="rounded-xl border border-neutral-700 bg-neutral-900/40 p-4">
            <div className="text-sm">
              Project not found:{" "}
              <span className="text-neutral-300">{id}</span>
            </div>
            <Link className="mt-3 inline-block text-sm underline" to="/">
              Back to dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const screenshots = project.assets?.screenshots || [];
  const files = project.assets?.files || [];
  const embeds = Array.isArray(project.embeds) ? project.embeds : [];
  const githubUrl = project.links?.githubUrl || "";

  const [activeEmbedIdx, setActiveEmbedIdx] = useState(0);
  const activeEmbed = embeds[activeEmbedIdx] || null;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto w-full max-w-4xl px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs text-neutral-300">
              {project.domain} • {project.year}
            </div>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">
              {project.title}
            </h1>
            {project.shortDescription && (
              <p className="mt-2 text-sm text-neutral-200">
                {project.shortDescription}
              </p>
            )}
          </div>

          <Link
            to="/"
            className="rounded-xl border border-neutral-700 bg-neutral-900/40 px-4 py-2 text-sm text-neutral-100 transition hover:border-neutral-500 hover:bg-neutral-900"
          >
            Back
          </Link>
        </div>

        {/* Tags & tools */}
        <div className="mt-4 flex flex-wrap gap-2">
          {(project.tags || []).map((t) => (
            <Pill key={t}>{t}</Pill>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {(project.tools || []).map((t) => (
            <Pill key={t}>{t}</Pill>
          ))}
        </div>

        {/* Overview */}
        {project.overview && (
          <Section title="Overview">
            <p className="text-sm text-neutral-200">{project.overview}</p>
          </Section>
        )}

        {/* Insights */}
        {Array.isArray(project.insights) && project.insights.length > 0 && (
          <Section title="Key insights">
            <ul className="list-disc pl-5 text-sm text-neutral-200 space-y-1">
              {project.insights.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </Section>
        )}

        {/* Screenshots (no title) */}
        {screenshots.length > 0 && (
          <div className="mt-6">
            <ScreenshotCarousel
              screenshots={screenshots}
              maxWidthClass="max-w-2xl"
            />
          </div>
        )}

        {/* Embedded dashboards */}
        {embeds.length > 0 && (
          <Section title="Interactive dashboards">
            <div className="flex flex-wrap gap-2">
              {embeds.map((e, idx) => (
                <button
                  key={`${e.label || "embed"}-${idx}`}
                  type="button"
                  onClick={() => setActiveEmbedIdx(idx)}
                  className={`rounded-xl border px-3 py-2 text-sm transition ${
                    idx === activeEmbedIdx
                      ? "border-neutral-300 bg-neutral-900"
                      : "border-neutral-700 bg-neutral-950/40 hover:border-neutral-500 hover:bg-neutral-900/70"
                  }`}
                >
                  {e.label || `Dashboard ${idx + 1}`}
                </button>
              ))}
            </div>

            {activeEmbed?.type === "iframe" && activeEmbed?.src && (
              <div className="mt-4 overflow-hidden rounded-xl border border-neutral-700 bg-black">
                <iframe
                  title={activeEmbed.label || "Embedded dashboard"}
                  src={activeEmbed.src}
                  width="100%"
                  height={activeEmbed.height || 700}
                  loading="lazy"
                  className="block"
                  allowFullScreen
                />
              </div>
            )}

            {activeEmbed?.src && (
              <div className="mt-3 flex justify-end">
                <ExternalButton href={activeEmbed.src}>
                  Open in new tab
                </ExternalButton>
              </div>
            )}
          </Section>
        )}

        {/* Files */}
        {files.length > 0 && (
          <Section title="Files">
            <div className="flex flex-wrap gap-2">
              {files.map((f) => (
                <a
                  key={f.url}
                  href={f.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-neutral-700 bg-neutral-950/40 px-4 py-2 text-sm text-neutral-100 transition hover:border-neutral-500 hover:bg-neutral-900"
                >
                  {f.label || "Open file"}
                </a>
              ))}
            </div>
          </Section>
        )}

        {/* GitHub (optional) */}
        <div className="mt-6 flex flex-wrap justify-end gap-2">
          <ExternalButton href={githubUrl}>GitHub (optional)</ExternalButton>
        </div>
      </div>
    </div>
  );
}
