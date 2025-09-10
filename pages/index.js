import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [typedText, setTypedText] = useState("");
  const indexRef = useRef(0);
  const canvasRef = useRef(null);

  const text = "Welcome to my Personal Account";

  // Typing Effect
  useEffect(() => {
    if (!loading) return;
    const typeWriter = () => {
      if (indexRef.current < text.length) {
        setTypedText(prev => prev + text.charAt(indexRef.current));
        indexRef.current += 1;
        setTimeout(typeWriter, 100);
      } else setTimeout(() => setLoading(false), 600);
    };
    typeWriter();
  }, [loading]);

  // Particle Background
  useEffect(() => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", resize);
  resize();

  const colors = ["#ec4899", "#06b6d4", "#a855f7"];
  const particles = [];

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.speedX = (Math.random() - 0.5) * 1.5;
      this.speedY = (Math.random() - 0.5) * 1.5;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  for (let i = 0; i < 100; i++) particles.push(new Particle());

  const animate = () => {
    // 🔥 Ganti clearRect dengan fillRect gelap
    ctx.fillStyle = "#0d0d0d"; // warna latar belakang gelap
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  };

  animate();

  return () => window.removeEventListener("resize", resize);
}, []);

  // Global Styles Reset
  useEffect(() => {
  // Reset style body & html
  document.body.style.margin = "0";
  document.body.style.padding = "0";
  document.body.style.boxSizing = "border-box";
  document.body.style.minHeight = "100vh";
  document.body.style.background = "#0d0d0d";
  
  // Flexbox untuk center horizontal & top spacing
  document.body.style.display = "flex";
  document.body.style.flexDirection = "column";
  document.body.style.alignItems = "center";
  document.body.style.justifyContent = "flex-start"; // tetap di atas tapi tidak menempel ke layar
  document.body.style.overflowX = "hidden";
  document.body.style.overflowY = "auto";

  // HTML element
  document.documentElement.style.height = "100%";
  document.documentElement.style.overflowY = "auto";
}, []);

return (
  <div style={{
    fontFamily: "'Poppins', sans-serif",
    width: "100%",
    minHeight: "100vh",
    position: "relative",
    background: "#0d0d0d",
    color: "#fff",
    overflow: "visible", // biar konten scroll
  }}>
    {/* Canvas Background */}
    <canvas ref={canvasRef} style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 0
    }} />

    {/* Loading Screen */}
    {loading && (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "#0d0d0d",
        zIndex: 9999,
        textAlign: "center"
      }}>
        {/* typing text + progress bar */}
      </div>
    )}

    {/* Main Content */}
    {!loading && (
      <div style={{
        position: "relative", // cukup relative, jangan fixed/absolute
        width: "100%",
        maxWidth: "420px",
        margin: "60px 0", // margin atas/bawah untuk jarak aman dari viewport
        padding: "25px",
        borderRadius: "20px",
        textAlign: "center",
        background: "linear-gradient(180deg, rgba(25,25,25,0.95), rgba(15,15,15,0.95))",
        boxShadow: "0 0 40px rgba(236,72,153,0.2)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.05)",
        zIndex: 1
      }}>
        {/* Avatar, Name, Skills, Links */}
      </div>
    )}
  </div>
);
}