import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [typedText, setTypedText] = useState("");
  const text = "Welcome to my Personal Account";
  const indexRef = useRef(0);

  const canvasRef = useRef(null);
  const particles = useRef([]);

  // Typing effect
  useEffect(() => {
    const typeWriter = () => {
      if (indexRef.current < text.length) {
        setTypedText((prev) => prev + text.charAt(indexRef.current));
        indexRef.current++;
        setTimeout(typeWriter, 100);
      } else {
        setTimeout(() => setLoading(false), 600);
      }
    };
    typeWriter();
  }, []);

  // Particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const colors = ["#ec4899", "#06b6d4", "#a855f7"];

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

    const initParticles = () => {
      particles.current = [];
      for (let i = 0; i < 100; i++) {
        particles.current.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animate();

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", minHeight: "100vh", position: "relative" }}>
      <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }} />

      {loading ? (
        <div style={{
          position: "fixed", top: 0, left: 0,
          width: "100%", height: "100%",
          display: "flex", justifyContent: "center", alignItems: "center",
          flexDirection: "column", background: "#0d0d0d", zIndex: 9999,
          padding: "20px", textAlign: "center"
        }}>
          <div style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "clamp(22px, 5vw, 36px)",
            background: "linear-gradient(90deg, #ec4899, #a855f7, #06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "2px",
            marginBottom: "30px",
            minHeight: "50px",
            textShadow: "0 0 8px rgba(236,72,153,0.7), 0 0 12px rgba(168,85,247,0.5)"
          }}>{typedText}</div>
          <div style={{ width: "80%", height: "6px", background: "rgba(255,255,255,0.1)", borderRadius: "3px", overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${(indexRef.current / text.length) * 100}%`,
              background: "linear-gradient(90deg, #ec4899, #a855f7, #06b6d4)",
              borderRadius: "3px",
              transition: "width 0.3s linear"
            }} />
          </div>
        </div>
      ) : (
        <main style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: "20px",
          zIndex: 1,
          position: "relative"
        }}>
          <div style={{
            width: "100%",
            maxWidth: "420px",
            background: "linear-gradient(180deg, rgba(25,25,25,0.95), rgba(15,15,15,0.95))",
            borderRadius: "20px",
            padding: "25px",
            textAlign: "center",
            boxShadow: "0 0 40px rgba(236, 72, 153, 0.2)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.05)"
          }}>
            <div style={{ position: "relative" }}>
              <img src="https://raw.githubusercontent.com/Yudzxml/UploaderV2/main/tmp/e53304b6.jpg" alt="avatar"
                style={{
                  width: "110px",
                  height: "110px",
                  borderRadius: "50%",
                  border: "4px solid #ec4899",
                  boxShadow: "0 0 20px rgba(236, 72, 153, 0.5)",
                  objectFit: "cover",
                  transition: "transform .4s ease"
                }} />
              <span style={{
                position: "absolute",
                top: "90px",
                right: "calc(50% - 55px)",
                width: "18px",
                height: "18px",
                background: "#22c55e",
                border: "2px solid #111",
                borderRadius: "50%"
              }} />
            </div>
            <h1 style={{
              marginTop: "15px",
              fontSize: "clamp(22px,5vw,28px)",
              fontWeight: 700,
              background: "linear-gradient(90deg,#ec4899,#a855f7,#06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>Yudzxml</h1>
            <p style={{ color: "#9ca3af", fontSize: "clamp(12px,3.5vw,14px)" }}>@Yudzxml.ofc</p>

            <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
              {["React","NextJS","Vite","TailwindCSS","Django","Laravel","TypeScript","JavaScript","PHP","Java","Kotlin","Go-Lang","Python","C/C++","Rust"].map(skill => (
                <span key={skill} style={{
                  padding: "6px 12px",
                  borderRadius: "8px",
                  fontSize: "clamp(11px,3vw,13px)",
                  background: "linear-gradient(90deg, rgba(34,211,238,0.25), rgba(236,72,153,0.25))",
                  transition: "transform 0.3s"
                }}>{skill}</span>
              ))}
            </div>

            <p style={{ marginTop: "20px", fontSize: "clamp(12px,3.5vw,14px)", color: "#d1d5db", fontStyle: "italic" }}>“Full-Stack Developer” <br/> “Learn Hard, Build, And Sharing ✨”</p>

            <h2 style={{
              marginTop: "25px",
              marginBottom: "12px",
              fontSize: "clamp(14px,4vw,16px)",
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
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "rgba(55,65,81,0.7)",
                padding: "14px 18px",
                borderRadius: "14px",
                textDecoration: "none",
                color: "#fff",
                transition: "0.3s",
                fontSize: "clamp(13px,3.5vw,15px)",
                marginBottom: "16px",
                backdropFilter: "blur(4px)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <img src={link.icon} alt={link.label} style={{
                    width: "22px",
                    height: "22px",
                    flexShrink: 0,
                    borderRadius: "6px",
                    filter: "brightness(0.7) drop-shadow(0 0 2px rgba(0,0,0,0.5))",
                    transition: "transform 0.3s, filter 0.3s"
                  }} />
                  <span>{link.label}</span>
                </div>
                <span style={{ fontWeight: "bold", fontSize: "16px" }}>→</span>
              </a>
            ))}

          </div>
        </main>
      )}
    </div>
  );
}