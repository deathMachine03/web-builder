import { useSelector } from "react-redux";
import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

const iconMap = {
    instagram: <Instagram />,
    facebook: <Facebook />,
    twitter: <Twitter />
};

const Footer = () => {
    const { 
        footerText = "© 2025 Все права защищены", 
        footerColor = "#1a1a1a", 
        phone = "Не указан", 
        email = "Не указан", 
        address = "Не указан", 
        socialLinks = [] 
    } = useSelector((state) => state.site);

    return (
        <footer className="p-6 text-white" style={{ backgroundColor: footerColor }}>
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
                {/* Контактные данные */}
                <div className="text-center md:text-left">
                    <p className="text-lg font-semibold">{footerText}</p>
                    <p className="text-sm mt-1">📍 {address}</p>
                    <p className="text-sm">📞 {phone}</p>
                    <p className="text-sm">📧 {email}</p>
                </div>

                {/* Социальные сети */}
                {Array.isArray(socialLinks) && socialLinks.length > 0 && (
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        {socialLinks.map((link, index) => (
                            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" 
                                className="text-white text-2xl hover:opacity-80 transition">
                                {iconMap[link.name.toLowerCase()] || "🔗"}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </footer>
    );
};

export default Footer;
