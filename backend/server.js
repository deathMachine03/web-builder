require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path")
const fs = require("fs");


const app = express();
app.use(express.json()); // Разрешаем JSON-запросы
app.use(cors()); // Разрешаем запросы с другого домена
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Раздача загруженных файлов
const settingsRoutes = require("./routes/settingsRoutes");
app.use("/settings", settingsRoutes);

// Создание папки uploads, если её нет
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Настройка хранилища Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Обработчик загрузки файлов (POST /upload)
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
      console.error("Ошибка: Файл не загружен");
      return res.status(400).json({ message: "Файл не загружен" });
  }

  console.log("Файл загружен:", req.file.filename);
  res.json({ url: `http://localhost:5000/uploads/${req.file.filename}` });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://sabeshov:ggvOvuAEbjGbSlqo@clusterfordata.1kgo5.mongodb.net/?retryWrites=true&w=majority&appName=Clusterfordata";

// Подключение к MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB подключена"))
  .catch((err) => console.error("Ошибка подключения:", err));

app.listen(PORT, () => console.log(`🚀 Сервер запущен на порту ${PORT}`));
