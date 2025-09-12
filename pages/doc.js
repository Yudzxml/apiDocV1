import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";
import { useEffect } from "react";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function ApiDocs() {
  useEffect(() => {
    // Dark theme custom untuk Swagger UI
    const style = document.createElement("style");
    style.innerHTML = `
      body, .swagger-ui, .swagger-container {
        background-color: #121212 !important;
        color: #e0e0e0 !important;
        font-family: 'Inter', sans-serif !important;
      }

      .swagger-ui .topbar {
        background-color: #1f1f1f !important;
        border-bottom: 1px solid #333 !important;
      }

      .swagger-ui .opblock {
        background-color: #1e1e1e !important;
        border: 1px solid #333 !important;
        border-radius: 8px;
        margin-bottom: 10px;
      }

      .swagger-ui .opblock-summary {
        color: #fff !important;
      }

      .swagger-ui .opblock-summary-method {
        background-color: #3a3a3a !important;
        color: #fff !important;
      }

      .swagger-ui .opblock-description-wrapper, 
      .swagger-ui .opblock-body pre {
        background-color: #1a1a1a !important;
        color: #ddd !important;
      }

      .swagger-ui .responses-wrapper {
        background-color: #1a1a1a !important;
        color: #ccc !important;
      }

      .swagger-ui .model-box {
        background-color: #1a1a1a !important;
        color: #ccc !important;
      }

      .swagger-ui .response-col_status {
        color: #ff9800 !important;
      }

      .swagger-ui .scheme-container {
        background-color: #1a1a1a !important;
        border-radius: 8px;
      }

      /* scrollbar dark */
      ::-webkit-scrollbar {
        width: 8px;
      }
      ::-webkit-scrollbar-thumb {
        background: #555;
        border-radius: 4px;
      }
      ::-webkit-scrollbar-track {
        background: #222;
      }

      /* Footer custom */
      .swagger-footer {
        text-align: center;
        padding: 12px 0;
        background-color: #1f1f1f;
        color: #aaa;
        font-size: 14px;
        border-top: 1px solid #333;
        position: sticky;
        bottom: 0;
        width: 100%;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        boxSizing: "border-box",
        backgroundColor: "#121212",
      }}
    >
      <div style={{ flex: 1 }}>
        <SwaggerUI
          url="/swagger.json"
          docExpansion="list"
          defaultModelExpandDepth={1}
          deepLinking={true}
          displayRequestDuration={true}
        />
      </div>
      <footer className="swagger-footer">
        © 2025 YUDZXML. All Rights Reserved.
      </footer>
    </div>
  );
}