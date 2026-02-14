import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { projectsData } from "../data/projectsData";

import Header from "../components/Header";
import KpiGrid from "../components/KpiGrid";
import Controls from "../components/Controls";
import ProjectsTable from "../components/ProjectsTable";
import ProjectModal from "../components/ProjectModal";

export default function Dashboard() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [domainFilter, setDomainFilter] = useState("All");
  const [sortBy, setSortBy] = useState("year");
  const [sortDir, setSortDir] = useState("desc");
  const [selectedProject, setSelectedProject] = useState(null);

  const { totalProjects, domainsCount, toolsCount } = useMemo(() => {
    const totalProjects = projectsData.length;
    const domainsCount = new Set(projectsData.map((p) => p.domain)).size;
    const toolsCount = new Set(projectsData.flatMap((p) => p.tools || [])).size;
    return { totalProjects, domainsCount, toolsCount };
  }, []);

  const domains = useMemo(() => {
    const unique = Array.from(new Set(projectsData.map((p) => p.domain)));
    unique.sort((a, b) => a.localeCompare(b));
    return ["All", ...unique];
  }, []);

  const toggleSort = (col) => {
    if (sortBy === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortBy(col);
      setSortDir(col === "year" ? "desc" : "asc");
    }
  };

  const visibleProjects = useMemo(() => {
    const q = search.trim().toLowerCase();

    const filtered = projectsData.filter((p) => {
      const matchesDomain = domainFilter === "All" || p.domain === domainFilter;

      const haystack = [
        p.title,
        p.domain,
        String(p.year),
        ...(p.tools || []),
        ...(p.tags || []),
        p.shortDescription || "",
        p.overview || "",
        ...(p.insights || []),
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = q === "" || haystack.includes(q);
      return matchesDomain && matchesSearch;
    });

    return [...filtered].sort((a, b) => {
      let av = a?.[sortBy] ?? "";
      let bv = b?.[sortBy] ?? "";

      if (sortBy === "title" || sortBy === "domain") {
        av = String(av).toLowerCase();
        bv = String(bv).toLowerCase();
      }

      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [search, domainFilter, sortBy, sortDir]);

  const onReset = () => {
    setSearch("");
    setDomainFilter("All");
    setSortBy("year");
    setSortDir("desc");
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pt-8 pb-2 animate-fade-in">

      <Header />

      <KpiGrid total={totalProjects} domains={domainsCount} tools={toolsCount} />

      <Controls
        search={search}
        setSearch={setSearch}
        domainFilter={domainFilter}
        setDomainFilter={setDomainFilter}
        domains={domains}
        onReset={onReset}
      />

      <ProjectsTable
        projects={visibleProjects}
        totalCount={projectsData.length}
        sortBy={sortBy}
        sortDir={sortDir}
        onToggleSort={toggleSort}
        onRowClick={(p) => setSelectedProject(p)}
      />

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onOpenFull={() => {
            navigate(`/projects/${selectedProject.id}`);
            setSelectedProject(null);
          }}
        />
      )}
    </div>
  );
}
