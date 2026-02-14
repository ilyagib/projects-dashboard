// src/data/projectsData.js

export const projectsData = [
  {
    id: "sample-northwind-dashboard",
    title: "Northwind Sales Dashboard",
    domain: "Sales / BI",
    year: 2026,
    tools: ["SQL", "Python", "Tableau"],
    tags: ["KPIs", "dashboard", "profit", "customers"],

    shortDescription:
      "Interactive dashboard exploring sales performance, profitability, and customer segments.",

    overview:
      "Built an end-to-end analysis on the Northwind dataset: cleaned and joined tables in SQL, exported datasets to Python for validation, and delivered a Tableau dashboard with drill-down views by category, employee, and region.",

    insights: [
      "A small set of categories drives most of total profit.",
      "High discounting correlates with margin erosion in specific segments.",
      "Top revenue customers are not always the most profitable.",
      "Employee performance varies significantly across regions.",
    ],

    kpis: [
      { label: "Data rows", value: "≈ 8K", sub: "Orders + Details" },
      { label: "Dashboards", value: "1", sub: "Tableau" },
      { label: "Focus", value: "Profit", sub: "Margins & Discounts" },
    ],

    assets: {
  tableau: {
    iframeUrl:
      "https://public.tableau.com/views/tableau_employee_performance/Employee_Data_Analysis?:showVizHome=no&:embed=true",
    openUrl:
      "https://public.tableau.com/views/tableau_employee_performance/Employee_Data_Analysis"
  }
}
  },

  // Add more projects here...
];
