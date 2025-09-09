// pages/swagger.js
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function SwaggerPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const swaggerRef = useRef(null);

  // Detect system dark mode on first load
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
    }
  }, []);

  // Filter endpoints on search
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (swaggerRef.current) {
      const blocks = document.querySelectorAll(".opblock");
      blocks.forEach((block) => {
        const summary = block.querySelector(".opblock-summary");
        if (summary.textContent.toLowerCase().includes(e.target.value.toLowerCase())) {
          block.style.display = "block";
        } else {
          block.style.display = "none";
        }
      });
    }
  };

  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          API Documentation
        </h1>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search endpoints..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-100"
          />
          <button
            className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </header>

      {/* Swagger UI */}
      <main className="flex-1 overflow-auto p-4" ref={swaggerRef}>
        <div className="swagger-container border rounded-lg shadow-sm transition-colors duration-300">
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
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 text-center py-3 shadow-inner text-gray-500 dark:text-gray-400 text-sm">
        © 2025 YUDZXML Allright Reserved
      </footer>

      {/* Global CSS for SwaggerUI */}
      <style jsx global>{`
        .swagger-ui .topbar {
          background-color: ${darkMode ? "#1F2937" : "#F9FAFB"};
          transition: background-color 0.3s;
        }
        .swagger-ui .opblock {
          background-color: ${darkMode ? "#111827" : "#FFFFFF"};
          border-color: ${darkMode ? "#374151" : "#E5E7EB"};
          transition: all 0.3s;
        }
        .swagger-ui .opblock.opblock-active {
          border-left-color: ${darkMode ? "#3B82F6" : "#2563EB"};
          box-shadow: 0 0 10px ${darkMode ? "rgba(59, 130, 246, 0.3)" : "rgba(37, 99, 235, 0.3)"};
        }
        .swagger-ui .scheme-container {
          background-color: ${darkMode ? "#1F2937" : "#F9FAFB"};
        }
        .swagger-ui .parameter__name {
          color: ${darkMode ? "#9CA3AF" : "#374151"};
        }
        .swagger-ui .responses__inner {
          background-color: ${darkMode ? "#1F2937" : "#F9FAFB"};
        }
        .swagger-ui .opblock-summary {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}