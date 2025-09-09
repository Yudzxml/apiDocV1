import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";
import SwaggerUIStandalonePreset from "swagger-ui-react/swagger-ui-standalone-preset";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function SwaggerPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#0f172a", color: "#f1f5f9" }}>
      <div style={{ flex: 1, padding: "20px" }}>
        <SwaggerUI
          url="/swagger.json"
          docExpansion="list"
          deepLinking={true}
          displayOperationId={true}
          showExtensions={true}
          showCommonExtensions={true}
          presets={[SwaggerUIStandalonePreset]}
        />
      </div>
      <footer style={{
        textAlign: "center",
        padding: "12px 0",
        backgroundColor: "#0f172a",
        color: "#f1f5f9",
        fontSize: "0.9rem",
        fontWeight: 500
      }}>
        © 2025 YUDZXML Allright Reserved
      </footer>
    </div>
  );
}