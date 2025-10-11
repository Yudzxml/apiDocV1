const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const JWT_SECRET  = "9f8c3a7b0a1f2d4e6b8c0f2a1d3c4b5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1"
const BASE_URL = process.env.BASE_URL || "https://yydz.biz.id";

module.exports = async function handler(req, res) {
  try {
    // ✅ Ganti ke POST
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Gunakan POST method" });
    }

    // ✅ Ambil dari body
    const { email, password, deviceId } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email & password wajib diisi" });
    }
    
    async function cekEmailAtauDevice(email, deviceId) {
  try {
    const response = await fetch(`https://api.yydz.biz.id/api/user/cekemail?email=${email}&deviceId=${deviceId}`);
    if (!response.ok) return { error: "Gagal menghubungi API" };

    const result = await response.json();

    if (result.status === 500) return { error: result.error };
    if (result.status === 200 && result.data === true) return { data: true };

    return { error: "Unknown error" };
  } catch {
    return { error: "Gagal menghubungi API" };
  }
}

// Contoh penggunaan
const cek = await cekEmailAtauDevice(email, deviceId);
if (cek.error) {
  return res.status(400).json({ error: cek.error });
}

    

    // ✅ Generate token valid 1 jam
    const payload = { email, password, deviceId };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    const { exp } = jwt.decode(token);

    const verifyUrl = `${BASE_URL}/api/verify?token=${token}&exp=${exp}`;

    // ✅ Konfigurasi SMTP Zoho
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER || "support@yydz.my.id",
        pass: process.env.EMAIL_PASS || "BBEXMhPKtBLC",
      },
    });

    // ✅ Kirim email verifikasi
    await transporter.sendMail({
      from: `"Support" <${process.env.EMAIL_USER || "support@yydz.my.id"}>`,
      to: email,
      subject: "✨ Verifikasi Akun Anda",
      html: `
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Verifikasi Akun</title>
      </head>
      <body style="margin:0;padding:0;background:#f4f7fa;font-family:Arial, sans-serif;">
        <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="background:linear-gradient(135deg,#1E3A8A,#3B82F6);padding:20px;text-align:center;color:white;">
            <h1 style="margin:0;font-size:22px;">Yudz-Api's</h1>
            <p style="margin:4px 0 0;font-size:14px;">Verifikasi Pendaftaran Akun</p>
          </div>

          <!-- Body -->
          <div style="padding:30px;text-align:center;color:#333;">
            <h2 style="font-size:20px;margin-bottom:10px;">Halo ${email},</h2>
            <p style="font-size:15px;line-height:1.6;margin-bottom:20px;">
              Terima kasih telah mendaftar. Klik tombol di bawah ini untuk 
              <b>memverifikasi akun Anda</b>.
            </p>
            <a href="${verifyUrl}" 
              style="display:inline-block;background:linear-gradient(135deg,#3B82F6,#1E40AF);
              color:white;padding:14px 28px;text-decoration:none;font-weight:bold;
              border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,0.2);">
              ✅ Verifikasi Sekarang
            </a>
            <p style="margin-top:30px;font-size:13px;color:#666;">
              Link ini berlaku sampai: <br><b>${new Date(exp * 1000).toLocaleString()}</b>
            </p>
          </div>

          <!-- Footer -->
          <div style="background:#f9fafb;padding:15px;text-align:center;font-size:12px;color:#888;">
            © ${new Date().getFullYear()} Yudz-Api's - Semua Hak Dilindungi
          </div>
        </div>
      </body>
      </html>
      `,
    });

    return res.json({ message: "✅ Link verifikasi sudah dikirim ke email anda" });
  } catch (err) {
    console.error("SMTP/Server Error:", err);
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
};