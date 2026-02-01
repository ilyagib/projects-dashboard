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
assets: {
  screenshots: [
    "/projects/sales-performance/dashboard-1.png"
  ],
  files: [
    // אופציונלי בהמשך:
    // { label: "Report (PDF)", url: "/projects/sales-performance/report.pdf" }
  ]
},

embeds: [
  {
    label: "Interactive Dashboard",
    type: "iframe",
    src: "https://public.tableau.com/views/tableau_employee_performance/Employee_Data_Analysis?:showVizHome=no&:embed=yes&:tabs=no",
    height: 750
  }
],



    // מה שרואים ב"פרויקט עצמו" (מודאל/עמוד בעתיד)
    overview:
      "Goal: identify what drives profit and where margin erosion happens across employees, categories, and discounts.",

    insights: [
      "Top performers generated the highest total profit without the highest discount usage.",
      "A few categories drive most profit; several show consistent margin erosion.",
      "Discounts correlate with deal closure but can reduce profitability when uncontrolled.",
    ],

    // אופציונלי - אם תרצה להרחיב
    keyQuestions: [
      "Who are the top 5 employees by total profit?",
      "Do top sellers rely more on discounts or maintain higher margins?",
      "Which categories show gaps/opportunities for improvement?",
    ],
    approach: [
      "Defined KPIs: total profit, profit per order, discount rate, category contribution.",
      "Aggregated by employee, category, and time to compare performance.",
      "Validated results by checking outliers and edge cases.",
    ],
    results: [
      "Ranked employees by total profit and highlighted top performers.",
      "Baseline view of discount vs. profit tradeoffs.",
      "Mapped category gaps to training/upsell opportunities.",
    ],

    screenshots: [], // קישורי תמונות אם תרצה

    // לינקים
    githubUrl: "https://github.com/ilyagib/REPLACE_ME",
    liveUrl: "",
    reportUrl: "",
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

    overview:
      "Goal: segment customers by behavior to support messaging, retention, and prioritization.",

    insights: [
      "A small segment drives outsized value and repeat purchases.",
      "Some segments respond better to reactivation than discounts.",
    ],

    keyQuestions: [
      "What distinct customer groups exist by behavior?",
      "Which segments show highest retention/value potential?",
    ],
    approach: [
      "Engineered behavioral features (frequency, recency, basket size).",
      "Grouped customers into interpretable segments.",
      "Validated segments with business interpretation.",
    ],
    results: ["Defined segments with clear business labels and suggested actions."],

    screenshots: [],

    githubUrl: "https://github.com/ilyagib/REPLACE_ME",
    liveUrl: "",
    reportUrl: "",
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

    overview:
      "Goal: provide a clear view of margin trends and profitability hotspots with drilldowns.",

    insights: [
      "Some high-revenue categories have low margins and drag profitability.",
      "Margin declines are concentrated in specific products/time windows.",
    ],

    keyQuestions: [
      "Where is margin erosion happening over time?",
      "Which categories contribute most to profit vs. revenue?",
    ],
    approach: [
      "Built SQL transformations for KPIs (profit, margin %, revenue).",
      "Designed Tableau views to compare categories over time.",
      "Created drilldowns by product to find root causes.",
    ],
    results: ["Dashboard with category and product drilldowns + KPI definitions."],

    screenshots: [],

    githubUrl: "https://github.com/ilyagib/REPLACE_ME",
    liveUrl: "",
    reportUrl: "",
  },
];
