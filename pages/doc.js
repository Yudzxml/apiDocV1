import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function ApiDocs() {
  const [swaggerUrl, setSwaggerUrl] = useState("/swagger.json");

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      /* ===== BODY & FONTS ===== */
      body, .swagger-ui, .swagger-container {
        background-color: #0a0f14 !important;
        color: #e0e0e0 !important;
        font-family: 'Inter', sans-serif !important;
      }

      /* ===== TOPBAR ===== */
      .swagger-ui .topbar {
        background-color: #111827 !important;
        border-bottom: 1px solid #333 !important;
        padding: 14px 24px;
      }
      .swagger-ui .topbar a {
        color: #38bdf8 !important;
        font-weight: 700;
      }

      /* ===== OPBLOCKS ===== */
      .swagger-ui .opblock {
        background-color: #1c1f26 !important;
        border: 1px solid #2c2f36 !important;
        border-radius: 16px;
        margin-bottom: 16px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.6);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .swagger-ui .opblock:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(0,0,0,0.7);
      }
      .swagger-ui .opblock-summary {
        color: #ffffff !important;
        font-weight: 700;
        font-size: 17px;
      }
      .swagger-ui .opblock-summary-method {
        background-color: #10b981 !important;
        color: #ffffff !important;
        border-radius: 8px;
        padding: 6px 12px;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 14px;
      }

      /* ===== OPBLOCK BODY & RESPONSES ===== */
      .swagger-ui .opblock-description-wrapper,
      .swagger-ui .opblock-body pre,
      .swagger-ui .responses-wrapper,
      .swagger-ui .model-box,
      .swagger-ui .scheme-container {
        background-color: #111827 !important;
        color: #cbd5e1 !important;
        border-radius: 12px;
        padding: 14px;
        font-size: 15px;
      }

      .swagger-ui .response-col_status {
        font-weight: bold;
        color: #facc15 !important;
      }

      /* ===== BUTTONS ===== */
      .swagger-ui .btn,
      .swagger-ui .execute-wrapper .btn {
        background-color: #3b82f6 !important;
        color: #fff !important;
        border-radius: 10px;
        padding: 8px 18px;
        font-weight: 700;
        transition: all 0.25s ease;
      }
      .swagger-ui .btn:hover {
        background-color: #2563eb !important;
      }

      /* ===== SCROLLBAR ===== */
      ::-webkit-scrollbar {
        width: 10px;
      }
      ::-webkit-scrollbar-thumb {
        background: #555 !important;
        border-radius: 6px;
      }
      ::-webkit-scrollbar-track {
        background: #0a0f14 !important;
      }

      /* ===== FOOTER ===== */
      .swagger-footer {
        text-align: center;
        padding: 16px 0;
        background-color: #111827;
        color: #9ca3af;
        font-size: 14px;
        border-top: 1px solid #333;
        position: sticky;
        bottom: 0;
        width: 100%;
      }

      /* ===== RESPONSIVE MOBILE ===== */
      @media (max-width: 768px) {
        .swagger-ui .opblock-summary {
          font-size: 15px;
        }
        .swagger-ui .opblock-summary-method {
          font-size: 13px;
          padding: 4px 8px;
        }
        .swagger-ui .opblock-description-wrapper,
        .swagger-ui .opblock-body pre {
          font-size: 14px;
          padding: 10px;
        }
      }
    `;
    document.head.appendChild(style);
  }, []);

  // Fungsi custom fetch API
  const handleLoadCustomSwagger = (url = "/custom-swagger.json") => {
    setSwaggerUrl(url);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "24px",
        boxSizing: "border-box",
        backgroundColor: "#0a0f14",
      }}
    >
      <div style={{ marginBottom: "16px" }}>
        <button
          onClick={() => handleLoadCustomSwagger()}
          style={{
            backgroundColor: "#3b82f6",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "10px",
            fontWeight: "700",
            cursor: "pointer",
            border: "none",
          }}
        >
          Load Custom Swagger JSON
        </button>
      </div>

      <div style={{ flex: 1 }}>
        <SwaggerUI
          url={swaggerUrl}
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