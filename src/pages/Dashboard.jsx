import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { projectsData } from "../data/projectsData";

import Header from "../components/Header";
import KpiGrid from "../components/KpiGrid";
import Controls from "../components/Controls";
import ProjectsTable from "../components/ProjectsTable";

export default function Dashboard() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [domainFilter, setDomainFilter] = useState("All");
  const [sortBy, setSortBy] = useState("year"); // "title" | "domain" | "year"
  const [sortDir, setSortDir] = useState("desc"); // "asc" | "desc"

  // KPIs
  const totalProjects = projectsData.length;
  const domainsCount = new Set(projectsData.map((p) => p.domain)).size;
  const toolsCount = new Set(projectsData.flatMap((p) => p.tools)).size;
  const latestYear = Math.max(...projectsData.map((p) => p.year));

  const domains = useMemo(() => {
    const unique = Array.from(new Set(projectsData.map((p) => p.domain)));
    unique.sort((a, b) => a.localeCompare(b));
    return ["All", ...unique];
  }, []);

  const toggleSort = (col) => {
    if (sortBy === col) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(col);
      setSortDir(col === "year" ? "desc" : "asc");
    }
  };

  const visibleProjects = useMemo(() => {
    const q = search.trim().toLowerCase();

    const filtered = projectsData.filter((p) => {
      const matchesDomain = domainFilter === "All" ? true : p.domain === domainFilter;

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

      const matchesSearch = q === "" ? true : haystack.includes(q);

      return matchesDomain && matchesSearch;
    });

    const sorted = [...filtered].sort((a, b) => {
      let av = a[sortBy];
      let bv = b[sortBy];

      if (sortBy === "title" || sortBy === "domain") {
        av = String(av).toLowerCase();
        bv = String(bv).toLowerCase();
      }

      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [search, domainFilter, sortBy, sortDir]);

  const onReset = () => {
    setSearch("");
    setDomainFilter("All");
    setSortBy("year");
    setSortDir("desc");
  };

  const openProject = (p) => {
    navigate(`/projects/${p.id}`);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto w-full max-w-6xl px-6 py-8">
        <Header />

        <KpiGrid
          total={totalProjects}
          domains={domainsCount}
          tools={toolsCount}
          latestYear={latestYear}
        />

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
          onRowClick={openProject}
        />
      </div>
    </div>
  );
}
