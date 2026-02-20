import React from "react";

export default function ProjectDetails({ project }) {
  if (!project) return null;

  const images = project.assets?.images ?? [];
  const tableau = project.assets?.tableau;
  const files = project.assets?.files ?? [];

  return (
    <div style={{ display: "grid", gap: 24 }}>
      {/* Header */}
      <header style={{ display: "grid", gap: 8 }}>
        <h1 style={{ margin: 0 }}>{project.title}</h1>
        <p style={{ margin: 0 }}>{project.shortDescription}</p>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {(project.tools ?? []).map((t) => (
            <span
              key={t}
              style={{
                padding: "4px 10px",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 999,
                fontSize: 12
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </header>

      {/* Overview */}
      {project.overview && (
        <section style={{ display: "grid", gap: 8 }}>
          <h2 style={{ margin: 0 }}>Overview</h2>
          <p style={{ margin: 0 }}>{project.overview}</p>
        </section>
      )}

      {/* Tableau */}
      {tableau?.iframeUrl && (
        <section style={{ display: "grid", gap: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <h2 style={{ margin: 0 }}>Dashboard</h2>
            {tableau.openUrl && (
              <a href={tableau.openUrl} target="_blank" rel="noreferrer">
                Open in new tab
              </a>
            )}
          </div>

          <iframe
            src={tableau.iframeUrl}
            title="Tableau Dashboard"
            width="100%"
            height="800"
            style={{ border: 0, borderRadius: 12 }}
            loading="lazy"
            allowFullScreen
          />
        </section>
      )}

      {/* Images / Story */}
      {images.length > 0 && (
        <section style={{ display: "grid", gap: 16 }}>
          <h2 style={{ margin: 0 }}>Key Charts & Story</h2>

          <div style={{ display: "grid", gap: 18 }}>
            {images.map((img) => (
              <article
                key={img.id}
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 14,
                  padding: 16,
                  display: "grid",
                  gap: 10
                }}
              >
                <div style={{ display: "grid", gap: 6 }}>
                  <h3 style={{ margin: 0 }}>{img.title}</h3>
                  {img.question && (
                    <p style={{ margin: 0 }}>
                      <b>Question:</b> {img.question}
                    </p>
                  )}
                </div>

                {/* ✅ זה התיקון החשוב: img.image ולא img */}
                <img
                  src={img.image}
                  alt={img.title || "chart"}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.10)"
                  }}
                />

                {img.description && (
                  <p style={{ margin: 0 }}>{img.description}</p>
                )}

                {img.insight && (
                  <p style={{ margin: 0 }}>
                    <b>Key Insight:</b> {img.insight}
                  </p>
                )}

                {img.businessImpact && (
                  <p style={{ margin: 0 }}>
                    <b>Business Impact:</b> {img.businessImpact}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Files */}
      {files.length > 0 && (
        <section style={{ display: "grid", gap: 12 }}>
          <h2 style={{ margin: 0 }}>Files</h2>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {files.map((f) => (
              <a
                key={f.id}
                href={f.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: "10px 14px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 10,
                  textDecoration: "none"
                }}
              >
                {f.label}
              </a>
            ))}
          </div>

          {/* אופציונלי: Embed PDF אם זה PDF */}
          {files.some((f) => f.type === "pdf") && (
            <iframe
              src={files.find((f) => f.type === "pdf")?.url}
              title="Project Presentation"
              width="100%"
              height="800"
              style={{ border: 0, borderRadius: 12 }}
            />
          )}
        </section>
      )}
    </div>
  );
}