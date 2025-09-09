import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/swagger");
  }, [router]);

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#0f172a",
      color: "#3b82f6",
      fontFamily: "Inter, sans-serif",
      fontSize: "1.5rem",
      flexDirection: "column",
      textAlign: "center",
      padding: "20px"
    }}>
      Redirecting to Documentation UI...
    </div>
  );
}