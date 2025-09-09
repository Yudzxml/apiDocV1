import '../styles/globals.css';
import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; // untuk dark mode syntax highlighting

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const endpoints = document.querySelectorAll(".endpoint h2");
    endpoints.forEach(h2 => {
      h2.addEventListener("click", () => {
        const methods = h2.parentNode.querySelectorAll(".method-body");
        methods.forEach(m => m.style.display = m.style.display === "block" ? "none" : "block");
      });
    });

    const methodHeaders = document.querySelectorAll(".method-header");
    methodHeaders.forEach(header => {
      header.addEventListener("click", () => {
        const body = header.nextElementSibling;
        if (body) body.style.display = body.style.display === "block" ? "none" : "block";
      });
    });

    const toggle = document.querySelector("#darkToggle");
    if(toggle){
      toggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
      });
    }

    Prism.highlightAll();
  });

  return <Component {...pageProps} />;
}

export default MyApp;