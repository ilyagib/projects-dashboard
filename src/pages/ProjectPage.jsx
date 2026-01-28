import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { projectsData } from "../data/projectsData";

function Pill({ children }) {
  return (
    <span className="rounded-full border border-neutral-700 bg-neutral-950/40 px-3 py-1 text-xs text-neutral-200">
      {children}
    </span>
  );
}

function Section({ title, children }) {
  return (
    <div className="mt-6">
      <div className="text-xs font-medium text-neutral-300">{title}</div>
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
      className="rounded-xl border border-neutral-700 bg-neutral-900/40 px-4 py-2 text-sm text-neutral-100 transition hover:border-neutral-500 hover:bg-neutral-900"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

export default function ProjectPage() {
  const { id } = useParams();
  const [activeEmbedIdx, setActiveEmbedIdx] = useState(0);

  const project = useMemo(() => {
    return projectsData.find((p) => p.id === id) || null;
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100">
        <div className="mx-auto w-full max-w-4xl px-6 py-10">
          <div className="rounded-xl border border-neutral-700 bg-neutral-900/40 p-4">
            <div className="text-sm">
              Project not found: <span className="text-neutral-300">{id}</span>
            </div>
            <Link className="mt-3 inline-block text-sm underline" to="/">
              Back to dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const embeds = Array.isArray(project.embeds) ? project.embeds : [];
  const screenshots = project.assets?.screenshots || [];
  const files = project.assets?.files || [];
  const githubUrl = project.links?.githubUrl || "";

  const activeEmbed = embeds[activeEmbedIdx] || null;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto w-full max-w-4xl px-6 py-10">
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

        {project.overview && (
          <Section title="Overview">
            <p className="text-sm text-neutral-200">{project.overview}</p>
          </Section>
        )}

        {Array.isArray(project.insights) && project.insights.length > 0 && (
          <Section title="Key insights">
            <ul className="list-disc pl-5 text-sm text-neutral-200 space-y-1">
              {project.insights.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </Section>
        )}

        {/* Embedded dashboards */}
        {embeds.length > 0 && (
          <Section title="Interactive dashboards">
            <div className="flex flex-wrap gap-2">
              {embeds.map((e, idx) => (
                <button
                  key={e.label + idx}
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

            {activeEmbed && activeEmbed.type === "iframe" && (
              <div className="mt-4 overflow-hidden rounded-xl border border-neutral-700 bg-black">
                <iframe
                  title={activeEmbed.label || "Embedded dashboard"}
                  src={activeEmbed.src}
                  width="100%"
                  height={activeEmbed.height || 650}
                  loading="lazy"
                  className="block"
                  allowFullScreen
                />
              </div>
            )}

            {/* אם iframe חסום אצל ספק כלשהו, עדיין יהיה לך לינק לפתיחה בטאב חדש */}
            {activeEmbed?.src && (
              <div className="mt-3 flex justify-end">
                <ExternalButton href={activeEmbed.src}>Open in new tab</ExternalButton>
              </div>
            )}
          </Section>
        )}

{screenshots.length > 0 && (
  <div className="mt-6 space-y-4">
    {screenshots.map((src) => (
      <a
        key={src}
        href={src}
        target="_blank"
        rel="noreferrer"
        className="mx-auto block w-full max-w-2xl overflow-hidden rounded-xl border border-neutral-700 bg-neutral-950/40 transition hover:border-neutral-500"
        title="Open full size"
      >
        <img
          src={src}
          alt="Project screenshot"
          loading="lazy"
          className="w-full h-auto object-contain"
        />
      </a>
    ))}
  </div>
)}


        {/* Files hosted on the site */}
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

        {/* Optional: GitHub (secondary) */}
        <div className="mt-6 flex flex-wrap justify-end gap-2">
          <ExternalButton href={githubUrl}>GitHub (optional)</ExternalButton>
        </div>
      </div>
    </div>
  );
}
