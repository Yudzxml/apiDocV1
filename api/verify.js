const jwt = require("jsonwebtoken");

const JWT_SECRET = "9f8c3a7b0a1f2d4e6b8c0f2a1d3c4b5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1";
const BASE_URL = process.env.BASE_URL || "https://yydz.biz.id";

module.exports = async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).send("Gunakan GET method");
    }

    const { token, exp } = req.query;
    if (!token || !exp) {
      return res.status(400).send("Token atau exp tidak ada");
    }

    const now = Math.floor(Date.now() / 1000);
    if (now > parseInt(exp)) {
      return res.status(400).send("Link verifikasi sudah kadaluarsa");
    }

    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
      console.log("✅ JWT payload terverifikasi:", payload);
    } catch (err) {
      console.error("❌ JWT verification error:", err.message);
      return res.status(400).send("Token invalid / expired");
    }

    // Kirim payload ke API register
    const apiRes = await fetch("https://api.yydz.biz.id/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const apiJson = await apiRes.json();
    console.log("📩 Response dari API Register:", apiJson);

    // Jika gagal (deviceId)
    if (apiJson.error && apiJson.error.includes("deviceId")) {
      res.setHeader("Content-Type", "text/html");
      return res.end(`
        <!DOCTYPE html>
        <html lang="id">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Registrasi Gagal</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: "Segoe UI", Arial, sans-serif;
              background: linear-gradient(135deg, #1E3A8A, #2563EB, #3B82F6);
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              color: #fff;
            }
            .card {
              background: #ffffff;
              color: #333;
              max-width: 420px;
              width: 90%;
              padding: 40px 30px;
              border-radius: 20px;
              box-shadow: 0 10px 25px rgba(0,0,0,0.2);
              text-align: center;
              animation: fadeIn 0.8s ease-in-out;
            }
            h1 { font-size: 24px; margin-bottom: 15px; color: #DC2626; }
            p { font-size: 15px; margin: 15px 0; color: #444; }
            button {
              margin-top: 20px;
              padding: 12px 22px;
              border: none;
              border-radius: 10px;
              background: linear-gradient(135deg, #2563EB, #1E40AF);
              color: #fff;
              font-size: 15px;
              font-weight: bold;
              cursor: pointer;
              transition: transform 0.2s ease, opacity 0.2s ease;
            }
            button:hover { transform: translateY(-2px); opacity: 0.9; }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>❌ Registrasi Ditolak</h1>
            <p>Device Anda sudah pernah digunakan untuk membuat akun.<br/>Anda tidak bisa mendaftar akun ganda.</p>
            <button onclick="window.location.href='${BASE_URL}/login'">Kembali ke Login</button>
          </div>
        </body>
        </html>
      `);
    }

    // Jika sukses
    res.setHeader("Content-Type", "text/html");
    return res.end(`
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Verifikasi Berhasil</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: "Segoe UI", Arial, sans-serif;
            background: linear-gradient(135deg, #1E3A8A, #2563EB, #3B82F6);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            color: #fff;
          }
          .card {
            background: #ffffff;
            color: #333;
            max-width: 420px;
            width: 90%;
            padding: 40px 30px;
            border-radius: 20px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            text-align: center;
            animation: fadeIn 0.8s ease-in-out;
          }
          h1 { font-size: 24px; margin-bottom: 15px; color: #1E40AF; }
          p { font-size: 15px; margin: 15px 0; color: #444; }
          .loader {
            border: 6px solid #f3f3f3;
            border-top: 6px solid #2563EB;
            border-radius: 50%;
            width: 55px;
            height: 55px;
            animation: spin 1s linear infinite;
            margin: 25px auto;
          }
          @keyframes spin { 
            0% { transform: rotate(0deg); } 
            100% { transform: rotate(360deg); } 
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .footer { margin-top: 25px; font-size: 12px; color: #777; }
        </style>
        <script>
          setTimeout(() => {
            window.location.href = "${BASE_URL}/login";
          }, 3000);
        </script>
      </head>
      <body>
        <div class="card">
          <h1>✅ Verifikasi Berhasil</h1>
          <div class="loader"></div>
          <p>Akun Anda sudah aktif. Anda akan diarahkan ke halaman login dalam beberapa detik...</p>
          <div class="footer">© ${new Date().getFullYear()} Yudz-Api's</div>
        </div>
      </body>
      </html>
    `);
  } catch (err) {
    console.error("🔥 Server error:", err);
    return res.status(500).send("Terjadi kesalahan server");
  }
};