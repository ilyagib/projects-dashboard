export const projectsData = [
  {
    id: "northwind-business-sales-analysis",
    title: "Northwind Business & Sales Analysis",
    domain: "Sales / Business Optimization",
    year: 2026,
    tools: ["SQL", "Python", "Tableau"],
    tags: ["KPIs", "profitability", "customers", "employees", "optimization"],

    shortDescription:
      "End-to-end business analysis using the Northwind database, focusing on profitability drivers, customer behavior, and operational optimization.",

    overview:
      "This project analyzes sales, customers, products, and employees to identify key profitability drivers. The goal is to translate data insights into concrete business actions that improve margin, retention, and operational efficiency.",

    executiveSummary: [
      "Strong positive correlation (~0.89) between order frequency and gross profit.",
      "USA and Germany lead total profitability across markets.",
      "High-value customers consistently generate repeat revenue and margin.",
      "Employee performance varies significantly by discount strategy and product focus.",
      "Clear weekly sales pattern suggests operational optimization opportunities."
    ],

    kpis: [
      { label: "Correlation", value: "0.89", sub: "Orders ↔ Profit" },
      { label: "Top Market", value: "USA", sub: "$114K+ Gross Profit" },
      { label: "Top Employee", value: "Margaret P.", sub: "$232K Gross Profit" }
    ],

    assets: {
      previewImage: "/projects/sample-northwind/preview.png",

      presentation: {
  pdfUrl: "/projects/northwind-presentation.pdf"
},

      tableau: {
        iframeUrl:
          "https://public.tableau.com/views/tableau_employee_performance/Employee_Data_Analysis?:showVizHome=no",
        openUrl:
          "https://public.tableau.com/views/tableau_employee_performance/Employee_Data_Analysis"
      },

      images: [
        {
          id: "orders-profit-correlation",
          title: "Correlation Between Order Count and Gross Profit",
          question:
            "Is there a measurable relationship between customer order frequency and total gross profit?",
          description:
            "Scatter plot with regression line showing the relationship between OrderCount and TotalGrossProfit.",
          insight:
            "Strong positive correlation (~0.89). Customers placing more orders generate substantially higher gross profit.",
          businessImpact:
            "Retention and loyalty programs should prioritize increasing repeat order frequency.",
          image:
            "/projects/sample-northwind/story/orders-profit-correlation.png"
        },

        {
          id: "profit-by-country",
          title: "Gross Profit by Country",
          question:
            "Which markets contribute the most to total profitability?",
          description:
            "Country-level aggregation of total gross profit across all customers.",
          insight:
            "USA and Germany dominate profitability, followed by Austria and Brazil.",
          businessImpact:
            "Strategic focus and marketing budgets should prioritize high-performing markets while reviewing underperforming regions.",
          image:
            "/projects/sample-northwind/story/profit-by-country.png"
        },

        {
          id: "top-customers",
          title: "Top Customers by Revenue and Profit",
          question:
            "Which customers generate the highest revenue and gross profit?",
          description:
            "Customer-level breakdown including revenue, gross profit, and order count.",
          insight:
            "Top accounts (QUICK-Stop, Save-a-lot Markets, Ernst Handel) consistently drive strong revenue and margin through frequent orders.",
          businessImpact:
            "Implement key account management strategies to protect and expand high-value relationships.",
          image:
            "/projects/sample-northwind/story/top-customers.png"
        },

        {
          id: "sales-by-day",
          title: "Total Sales by Day of Week",
          question:
            "How does sales volume fluctuate throughout the week?",
          description:
            "Line chart showing total sales aggregated by weekday.",
          insight:
            "Sales dip significantly Thursday–Friday and peak again on Sunday.",
          businessImpact:
            "Align staffing and inventory with weekend peaks; introduce mid-week promotions to stabilize revenue.",
          image:
            "/projects/sample-northwind/story/sales-by-day.png"
        }
      ],

      files: [
  {
    id: "northwind-presentation",
    label: "Download Full Presentation (PDF)",
    type: "pdf",
    url: "/files/northwind-presentation.pdf"
  }
]
    
    }
  }
];