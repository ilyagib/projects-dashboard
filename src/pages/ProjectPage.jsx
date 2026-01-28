import { useMemo } from "react";
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

export default function ProjectPage() {
  const { id } = useParams();

  const project = useMemo(() => {
    return projectsData.find((p) => p.id === id) || null;
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100">
        <div className="mx-auto w-full max-w-4xl px-6 py-10">
          <div className="rounded-xl border border-neutral-700 bg-neutral-900/40 p-4">
            <div className="text-sm">Project not found: <span className="text-neutral-300">{id}</span></div>
            <Link className="mt-3 inline-block text-sm text-neutral-100 underline" to="/">
              Back to dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto w-full max-w-4xl px-6 py-10">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs text-neutral-300">
              {project.domain} • {project.year}
            </div>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">{project.title}</h1>
            {project.shortDescription && (
              <p className="mt-2 text-sm text-neutral-200">{project.shortDescription}</p>
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

        {Array.isArray(project.keyQuestions) && project.keyQuestions.length > 0 && (
          <Section title="Key questions">
            <ul className="list-disc pl-5 text-sm text-neutral-200 space-y-1">
              {project.keyQuestions.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </Section>
        )}

        {Array.isArray(project.approach) && project.approach.length > 0 && (
          <Section title="Approach">
            <ol className="list-decimal pl-5 text-sm text-neutral-200 space-y-1">
              {project.approach.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ol>
          </Section>
        )}

        {Array.isArray(project.results) && project.results.length > 0 && (
          <Section title="Results">
            <ul className="list-disc pl-5 text-sm text-neutral-200 space-y-1">
              {project.results.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </Section>
        )}

        <div className="mt-6 flex flex-wrap justify-end gap-2">
          {project.githubUrl && (
            <a
              className="rounded-xl border border-neutral-700 bg-neutral-900/40 px-4 py-2 text-sm text-neutral-100 transition hover:border-neutral-500 hover:bg-neutral-900"
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              className="rounded-xl border border-neutral-700 bg-neutral-900/40 px-4 py-2 text-sm text-neutral-100 transition hover:border-neutral-500 hover:bg-neutral-900"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              Live Demo
            </a>
          )}
          {project.reportUrl && (
            <a
              className="rounded-xl border border-neutral-700 bg-neutral-900/40 px-4 py-2 text-sm text-neutral-100 transition hover:border-neutral-500 hover:bg-neutral-900"
              href={project.reportUrl}
              target="_blank"
              rel="noreferrer"
            >
              Report
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
