import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";
import { useEffect } from "react";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function ApiDocs() {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      /* GENERAL BODY & FONTS */
      body, .swagger-ui, .swagger-container {
        background-color: #121212 !important;
        color: #e0e0e0 !important;
        font-family: 'Inter', sans-serif !important;
      }

      /* TOPBAR */
      .swagger-ui .topbar {
        background-color: #1f1f1f !important;
        border-bottom: 1px solid #333 !important;
        padding: 10px 20px;
      }

      .swagger-ui .topbar a {
        color: #fff !important;
      }

      /* OPBLOCKS */
      .swagger-ui .opblock {
        background-color: #1e1e1e !important;
        border: 1px solid #333 !important;
        border-radius: 12px;
        margin-bottom: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.5);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }

      .swagger-ui .opblock:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.7);
      }

      .swagger-ui .opblock-summary {
        color: #fff !important;
        font-weight: 600;
        font-size: 15px;
      }

      .swagger-ui .opblock-summary-method {
        background-color: #3a3a3a !important;
        color: #fff !important;
        border-radius: 6px;
        padding: 4px 8px;
        font-weight: bold;
        text-transform: uppercase;
        font-size: 13px;
      }

      .swagger-ui .opblock-description-wrapper, 
      .swagger-ui .opblock-body pre {
        background-color: #1a1a1a !important;
        color: #ddd !important;
        border-radius: 8px;
        padding: 10px;
        font-size: 14px;
      }

      .swagger-ui .responses-wrapper {
        background-color: #1a1a1a !important;
        color: #ccc !important;
        border-radius: 8px;
      }

      .swagger-ui .model-box {
        background-color: #1a1a1a !important;
        color: #ccc !important;
        border-radius: 8px;
        padding: 8px;
      }

      .swagger-ui .response-col_status {
        color: #ff9800 !important;
        font-weight: bold;
      }

      .swagger-ui .scheme-container {
        background-color: #1a1a1a !important;
        border-radius: 8px;
        padding: 8px;
      }

      /* SCROLLBAR DARK */
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

      /* FOOTER */
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

      /* RESPONSIVE MOBILE */
      @media (max-width: 768px) {
        .swagger-ui .opblock-summary {
          font-size: 14px;
        }
        .swagger-ui .opblock-summary-method {
          font-size: 12px;
          padding: 3px 6px;
        }
        .swagger-ui .opblock-description-wrapper, 
        .swagger-ui .opblock-body pre {
          font-size: 13px;
          padding: 8px;
        }
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