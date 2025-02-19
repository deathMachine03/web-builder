const Settings = require("../models/settings");

// Получение настроек (GET /settings)
exports.getSettings = async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            // Если настроек нет, создаем новый документ с дефолтными значениями
            settings = await Settings.create({
                logo: "http://localhost:5000/uploads/default-logo.png",
                bgImage: "http://localhost:5000/uploads/default-bg.jpg",
                text: "Добро пожаловать в наш магазин!",
                headerColor: "#ffffff",
                buttonColor: "#007bff",
                buttonText: "Перейти к товарам"
            });
        }
        res.json(settings);
    } catch (error) {
        console.error("Ошибка получения настроек:", error);
        res.status(500).json({ message: "Ошибка сервера", error });
    }
};

// Обновление настроек (PATCH /settings)
exports.updateSettings = async (req, res) => {
    try {
        const { logo, bgImage, text, headerColor, buttonColor, buttonText } = req.body;

        let settings = await Settings.findOne();
        if (settings) {
            // Обновляем существующий документ
            settings.logo = logo || settings.logo;
            settings.bgImage = bgImage || settings.bgImage;
            settings.text = text || settings.text;
            settings.headerColor = headerColor || settings.headerColor;
            settings.buttonColor = buttonColor || settings.buttonColor;
            settings.buttonText = buttonText || settings.buttonText;
            await settings.save();
        } else {
            // Если настроек нет, создаем новый документ
            settings = await Settings.create({ logo, bgImage, text, headerColor, buttonColor, buttonText });
        }

        res.json(settings);
    } catch (error) {
        console.error("Ошибка обновления настроек:", error);
        res.status(500).json({ message: "Ошибка сервера", error });
    }
};
