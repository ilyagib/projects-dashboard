export const projectsData = [
  {
    id: "sales-performance",
    title: "Sales Performance Analysis",
    domain: "Sales",
    year: 2025,
    tools: ["SQL", "Python", "Pandas"],
    tags: ["profit", "discounts", "KPIs"],
    shortDescription:
      "Explored profit drivers, top performers, and discount impact to improve margins.",
    links: {
      github: "https://github.com/ilyagib/REPLACE_ME",
      live: "", // אם יש דמו/דאשבורד אונליין
      report: "", // PDF/Notion/Google Doc אם תרצה
    },
    content: {
      overview:
        "Goal: identify what drives profit and where margin erosion happens across employees, categories, and discounts.",
      dataset:
        "Northwind-style sales tables (Employees, Orders, Order Details, Categories).",
      keyQuestions: [
        "Who are the top 5 employees by total profit?",
        "Do top sellers rely more on discounts or maintain higher margins?",
        "Which product categories show gaps/opportunities for improvement?",
      ],
      approach: [
        "Defined KPIs: total profit, profit per order, discount rate, category contribution.",
        "Aggregated by employee, category, and time to compare performance.",
        "Validated results by checking edge cases (refunds/outliers/zero profit).",
      ],
      insights: [
        "Top performers generated the highest total profit without the highest discount usage.",
        "A few categories drive most profit; several show consistent margin erosion.",
        "Discounts correlate with deal closure but can reduce profitability when uncontrolled.",
      ],
      results: [
        "Identified top 5 employees by total profit.",
        "Created a baseline view of discount vs. profit tradeoffs.",
        "Mapped category gaps to training/upsell opportunities.",
      ],
      screenshots: [
        // שים פה קישורים לתמונות (אם תרצה להציג באתר)
        // "https://.../chart1.png"
      ],
    },
  },

  {
    id: "customer-segmentation",
    title: "Customer Segmentation",
    domain: "Marketing",
    year: 2024,
    tools: ["Python", "Pandas"],
    tags: ["segments", "retention"],
    shortDescription:
      "Created customer segments based on behavioral patterns to support targeting.",
    links: {
      github: "https://github.com/ilyagib/REPLACE_ME",
      live: "",
      report: "",
    },
    content: {
      overview:
        "Goal: segment customers by behavior to support messaging, retention, and prioritization.",
      dataset:
        "Customer purchase history + basic demographics (example).",
      keyQuestions: [
        "What distinct customer groups exist by behavior?",
        "Which segments show highest retention/value potential?",
        "Where can targeting increase conversion or repeat purchases?",
      ],
      approach: [
        "Engineered behavioral features (frequency, recency, avg basket).",
        "Grouped customers into interpretable segments.",
        "Validated segments with sanity checks and business interpretation.",
      ],
      insights: [
        "A small segment drives outsized value and repeat purchases.",
        "Another segment is high-activity but low-margin and needs different offers.",
      ],
      results: [
        "Defined segments with clear business labels.",
        "Suggested actions per segment (retention, upsell, reactivation).",
      ],
      screenshots: [],
    },
  },

  {
    id: "profitability-dashboard",
    title: "Profitability Dashboard",
    domain: "Finance",
    year: 2025,
    tools: ["SQL", "Tableau"],
    tags: ["dashboard", "margins"],
    shortDescription:
      "Built a dashboard to monitor margin erosion and highlight categories needing review.",
    links: {
      github: "https://github.com/ilyagib/REPLACE_ME",
      live: "",
      report: "",
    },
    content: {
      overview:
        "Goal: provide a clear view of margin trends and profitability hotspots.",
      dataset:
        "Order lines + costs + category mapping.",
      keyQuestions: [
        "Where is margin erosion happening over time?",
        "Which products/categories contribute most to profit vs. revenue?",
        "Which areas need pricing/discount policy review?",
      ],
      approach: [
        "Built SQL transformations for KPIs (profit, margin %, revenue).",
        "Designed Tableau views to compare categories over time.",
        "Created drilldowns by product to find root causes.",
      ],
      insights: [
        "Some high-revenue categories have low margins and drag profitability.",
        "Margin declines are concentrated in specific time windows/products.",
      ],
      results: [
        "Dashboard with category and product drilldowns.",
        "Clear KPI definitions for consistent reporting.",
      ],
      screenshots: [],
    },
  },
];
