import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";
import "../styles/swagger-modern.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function SwaggerPage() {
  return (
    <div className="swagger-modern-wrapper" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div className="swagger-modern-container" style={{ flex: 1 }}>
        <SwaggerUI
          url="/swagger.json"
          docExpansion="list"
          deepLinking={true}
          displayOperationId={true}
          showExtensions={true}
          showCommonExtensions={true}
          layout="StandaloneLayout"
        />
      </div>
      <footer style={{
        textAlign: "center",
        padding: "10px 0",
        background: "#f3f4f6",
        fontSize: "0.9rem",
        color: "#6b7280"
      }}>
        © 2025 YUDZXML Allright Reserved
      </footer>
    </div>
  );
}