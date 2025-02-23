require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Гарантируем, что файлы сохраняются в `backend/uploads/`
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Раздача загруженных файлов (правильный путь!)
app.use("/uploads", express.static(uploadDir));

// Подключение к MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/site-builder";
mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB подключена"))
    .catch(err => console.error("❌ Ошибка подключения к MongoDB:", err.message));

// ✅ Настройка Multer с правильным путем
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // ❗ Используем правильную папку
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// ✅ Обработчик загрузки файлов
app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) return res.status(400).json({ message: "Файл не загружен" });

    const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    console.log("✅ Файл загружен:", fileUrl);

    res.json({ url: fileUrl });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Сервер запущен на порту ${PORT}`));
  