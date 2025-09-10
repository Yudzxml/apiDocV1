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
  useEffect(() => { document.body.style.margin = "0"; document.body.style.padding = "0"; document.body.style.display = "flex"; document.body.style.flexDirection = "column"; document.body.style.alignItems = "center"; document.body.style.justifyContent = "center"; document.body.style.minHeight = "100vh"; document.body.style.background = "#0d0d0d"; document.body.style.overflow = "hidden"; }, []);

return (

  <div style={{
    fontFamily: "'Poppins', sans-serif",
    width: "100%",
    minHeight: "100vh",
    position: "relative",
    background: "#0d0d0d",
    color: "#fff",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    boxSizing: "border-box"
  }}>
    <canvas ref={canvasRef} style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 0
    }} />
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
        <div style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: "clamp(20px,4vw,30px)",
          background: "linear-gradient(90deg, #ec4899, #a855f7, #06b6d4)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "1.5px",
          marginBottom: "20px",
          minHeight: "40px",
          textShadow: "0 0 6px rgba(236,72,153,0.6), 0 0 10px rgba(168,85,247,0.4)"
        }}>{typedText}</div>
        <div style={{ width: "80%", height: "5px", background: "rgba(255,255,255,0.1)", borderRadius: "3px", overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: `${(indexRef.current / text.length) * 100}%`,
            background: "linear-gradient(90deg, #ec4899, #a855f7, #06b6d4)",
            borderRadius: "3px",
            transition: "width 0.3s linear"
          }} />
        </div>
      </div>
    )}
    {!loading && (
      <div style={{
        width: "100%",
        maxWidth: "380px",
        padding: "20px",
        borderRadius: "16px",
        textAlign: "center",
        background: "linear-gradient(180deg, rgba(25,25,25,0.9), rgba(15,15,15,0.9))",
        boxShadow: "0 0 30px rgba(236,72,153,0.2)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.05)",
        zIndex: 1"
      }}>
        <div style={{ position: "relative" }}>
          <img src="https://raw.githubusercontent.com/Yudzxml/UploaderV2/main/tmp/e53304b6.jpg" alt="avatar" style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            border: "3px solid #ec4899",
            boxShadow: "0 0 15px rgba(236,72,153,0.5)",
            objectFit: "cover",
            transition: "transform .4s ease"
          }} />
          <span style={{
            position: "absolute",
            top: "70px",
            right: "calc(50% - 45px)",
            width: "14px",
            height: "14px",
            background: "#22c55e",
            border: "2px solid #111",
            borderRadius: "50%"
          }} />
        </div>
        <h1 style={{
          marginTop: "12px",
          fontSize: "clamp(20px,4vw,24px)",
          fontWeight: 700,
          background: "linear-gradient(90deg,#ec4899,#a855f7,#06b6d4)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>Yudzxml</h1>
        <p style={{ color: "#9ca3af", fontSize: "clamp(11px,3vw,13px)" }}>@Yudzxml.ofc</p>
        <div style={{ marginTop: "15px", display: "flex", flexWrap: "wrap", gap: "6px", justifyContent: "center" }}>
          {["React","NextJS","Vite","TailwindCSS","Django","Laravel","TypeScript","JavaScript","PHP","Java","Kotlin","Go-Lang","Python","C/C++","Rust"].map(skill => (
            <span key={skill} style={{
              padding: "4px 10px",
              borderRadius: "6px",
              fontSize: "clamp(10px,2.5vw,12px)",
              background: "linear-gradient(90deg, rgba(34,211,238,0.2), rgba(236,72,153,0.2))",
              transition: "transform 0.3s"
            }}>{skill}</span>
          ))}
        </div>
        <p style={{ marginTop: "15px", fontSize: "clamp(11px,3vw,13px)", color: "#d1d5db", fontStyle: "italic" }}>“Full-Stack Developer” <br /> “Learn Hard, Build, And Sharing ✨”</p>
        <h2 style={{
          marginTop: "20px",
          marginBottom: "10px",
          fontSize: "clamp(13px,3.5vw,15px)",
          fontWeight: 600,
          background: "linear-gradient(90deg,#22d3ee,#ec4899)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>Connect With Me</h2>
        {[
          {href:"https://github.com/Yudzxml", icon:"https://cdn-icons-png.flaticon.com/512/25/25231.png", label:"GitHub"},
          {href:"https://chat.whatsapp.com/GX4hALwfNXjIMG7V3OGPFI", icon:"https://cdn-icons-png.flaticon.com/512/733/733585.png", label:"WhatsApp Group"},
          {href:"https://www.tiktok.com/@yudzxml.store?_t=ZS-8zYLchCRH9Q&_r=1", icon:"https://cdn-icons-png.flaticon.com/512/3116/3116491.png", label:"TikTok"},
          {href:"mailto:yudaaryaardhana1122@email.com", icon:"https://cdn-icons-png.flaticon.com/512/5968/5968534.png", label:"Email"}
        ].map(link => (
          <a key={link.label} href={link.href} target="_blank" style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "rgba(55,65,81,0.65)",
            padding: "12px 16px",
            borderRadius: "12px",
            textDecoration: "none",
            color: "#fff",
            transition: "0.3s",
            fontSize: "clamp(12px,3vw,14px)",
            marginBottom: "12px",
            backdropFilter: "blur(4px)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img src={link.icon} alt={link.label} style={{ width: "20px", height: "20px", borderRadius: "5px", filter: "brightness(0.7) drop-shadow(0 0 2px rgba(0,0,0,0.5))", transition: "transform 0.3s, filter 0.3s" }} />
              <span>{link.label}</span>
            </div>
            <span style={{ fontWeight: "bold", fontSize: "14px" }}>→</span>
          </a>
        ))}
      </div>
    )}
  </div>
);
}