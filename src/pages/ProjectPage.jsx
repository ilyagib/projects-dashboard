import { useMemo } from "react";
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

function Section({ children }) {
  return (
    <div className="rounded-xl border border-neutral-700 bg-neutral-900/40 p-4">
      {children}
    </div>
  );
}

/* ---------- Screenshots (no title, clean) ---------- */

function ScreenshotsWide({ screenshots = [] }) {
  if (!screenshots.length) return null;

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-700 bg-neutral-950/40">
      {screenshots.map((src, idx) => (
        <a
          key={src}
          href={src}
          target="_blank"
          rel="noreferrer"
          className={`block ${idx !== 0 ? "border-t border-neutral-800" : ""}`}
          title="Open full size"
        >
          <img
            src={src}
            alt="Project dashboard"
            loading="lazy"
            className="block w-full object-contain"
            style={{ maxHeight: "420px" }}
          />
        </a>
      ))}
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
        <div className="mx-auto max-w-6xl px-6 py-10">
          <Section>
            <div className="text-sm">Project not found</div>
            <Link className="mt-3 inline-block text-sm underline" to="/">
              Back to dashboard
            </Link>
          </Section>
        </div>
      </div>
    );
  }

  const screenshots = project.assets?.screenshots || [];
  const dashboard = project.embeds?.[0];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* ---------- MAIN CONTENT ---------- */}
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs text-neutral-300">
              {project.domain} • {project.year}
            </div>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">
              {project.title}
            </h1>
            <p className="mt-2 text-sm text-neutral-200">
              {project.shortDescription}
            </p>
          </div>

          <Link
            to="/"
            className="rounded-xl border border-neutral-700 bg-neutral-900/40 px-4 py-2 text-sm transition hover:border-neutral-500"
          >
            Back
          </Link>
        </div>

        {/* Tags + Tools */}
        <div className="mt-4 flex flex-wrap gap-2">
          {(project.tags || []).map((t) => (
            <Pill key={t}>{t}</Pill>
          ))}
          {(project.tools || []).map((t) => (
            <Pill key={t}>{t}</Pill>
          ))}
        </div>

        {/* Content layout */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Section>
              <p className="text-sm text-neutral-200">{project.overview}</p>
            </Section>

            {project.insights?.length > 0 && (
              <Section>
                <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-200">
                  {project.insights.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </Section>
            )}
          </div>

          <div className="lg:col-span-1">
            <ScreenshotsWide screenshots={screenshots} />
          </div>
        </div>
      </div>

      {/* ---------- FULL-WIDTH TABLEAU ---------- */}
      {dashboard?.type === "iframe" && (
        <div className="mt-12 w-full border-y border-neutral-700 bg-black">
          <div className="mx-auto max-w-[1400px] px-4 py-6">
            <div className="mb-3 flex justify-end">
              <a
                href={dashboard.src}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-neutral-700 bg-neutral-900/40 px-3 py-1.5 text-xs transition hover:border-neutral-500"
              >
                Open in new tab
              </a>
            </div>

            <div className="overflow-hidden rounded-2xl border border-neutral-800">
              <iframe
                title="Interactive Tableau Dashboard"
                src={dashboard.src}
                width="100%"
                loading="lazy"
                className="block"
                style={{
                  height: "clamp(520px, 70vh, 820px)",
                }}
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
