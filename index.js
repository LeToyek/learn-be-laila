// 1. Import library Express
require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/userRouter");
const authRoutes = require("./routes/authRouter");

// 2. Inisialisasi aplikasi Express
const app = express();

// 3. Tentukan port untuk server
//    Gunakan port dari environment variable jika ada, atau default ke 3000
const PORT = process.env.PORT || 3009;

// Middleware untuk parsing JSON (opsional untuk endpoint ini, tapi praktik yang baik)
app.use(express.json());

// === DEFINISI ENDPOINT ===

// Endpoint GET di route /
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Selamat datang di Express Server Starter!",
  });
});

// Endpoint GET di route /test
app.get("/test", (req, res) => {
  // Log ke konsol setiap kali endpoint ini diakses
  console.log("Endpoint /test diakses pada:", new Date().toLocaleTimeString());

  // Kirim response berupa JSON dengan status code 200 (OK)
  res.status(200).json({
    success: true,
    message: "Halo! Endpoint /test berhasil diakses.",
  });
});
app.use(userRoutes);
app.use("/api/auth", authRoutes);
// 4. Jalankan server untuk mendengarkan koneksi di port yang ditentukan
app.listen(PORT, () => {
  console.log(`Server berjalan lancar di http://localhost:${PORT}`);
});
