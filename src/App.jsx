// src/App.jsx
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProjectPage from "./pages/ProjectPage";
import ScrollToTop from "./components/ScrollToTop";

function Footer() {
  return (
    <footer className="border-t border-neutral-800">
      <div className="mx-auto flex h-8 w-full max-w-6xl items-center justify-between px-6">
        <div className="text-xs leading-none text-neutral-500">
          © {new Date().getFullYear()} Ilya Gibalo
        </div>

        <div className="flex items-center gap-2 leading-none">
          <a
            className="text-xs text-neutral-400 hover:text-neutral-200"
            href="https://mail.google.com/mail/?view=cm&fs=1&to=ilyagibalo@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            Email
          </a>
          <span className="text-xs text-neutral-700">•</span>
          <a
            className="text-xs text-neutral-400 hover:text-neutral-200"
            href="https://www.linkedin.com/in/ilya-gibalo-a503703a0/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <span className="text-xs text-neutral-700">•</span>
          <a
            className="text-xs text-neutral-400 hover:text-neutral-200"
            href="https://github.com/ilyagib"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen cp-bg text-neutral-100 flex flex-col">
      <ScrollToTop />

      {/* Route content (keep above cp-bg overlays) */}
      <main key={location.pathname} className="relative z-10 flex-1 animate-route">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer (keep above cp-bg overlays) */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
