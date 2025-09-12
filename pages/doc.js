import dynamic from "next/dynamic";

const StoplightElements = dynamic(
  () => import("@stoplight/elements").then(mod => mod.Elements),
  { ssr: false }
);

export default function ApiDocs() {
  return (
    <div style={{ height: "100vh" }}>
      <StoplightElements
        apiDescriptionUrl="/swagger.json"
        layout="sidebar"
        theme="dark"
      />
    </div>
  );
}