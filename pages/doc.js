import dynamic from "next/dynamic";

const Redoc = dynamic(() => import("@redocly/redoc").then(mod => mod.Redoc), { ssr: false });

export default function ApiDocs() {
  return (
    <div style={{ height: "100vh" }}>
      <Redoc specUrl="/swagger.json" />
    </div>
  );
}