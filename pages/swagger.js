// pages/swagger.js
import dynamic from "next/dynamic";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function SwaggerPage() {
  return (
    <div className="swagger-modern-container">
      <div style={{ flex: 1 }}>
        <SwaggerUI
          url="/swagger.json"
          docExpansion="list"
          deepLinking={true}
          displayOperationId={true}
          showExtensions={true}
          showCommonExtensions={true}
          layout="BaseLayout"
        />
      </div>
      <footer>
        © 2025 YUDZXML Allright Reserved
      </footer>
    </div>
  );
}