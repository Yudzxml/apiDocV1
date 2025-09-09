import dynamic from "next/dynamic";

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