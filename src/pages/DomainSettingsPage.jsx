import React, { useEffect, useState } from "react";
import axios from "axios";

const DomainSettingsPage = () => {
  const [domain, setDomain] = useState("");
  const [savedDomain, setSavedDomain] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchDomain = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/domain/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.data.domain) {
          setSavedDomain(res.data.domain);
        }
      } catch (err) {
        console.error("Ошибка получения домена", err);
      }
    };

    fetchDomain();
  }, []);

  const handleSave = async () => {
    setStatus("");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/domain/assign",
        { domain },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSavedDomain(res.data.domain);
      setStatus(" Домен успешно сохранён");
    } catch (err) {
      setStatus(
        err.response?.data?.message || " Ошибка при сохранении домена"
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Привязка домена</h1>

      {savedDomain ? (
        <p className="mb-4 text-green-700">
          Ваш текущий домен:{" "}
          <span className="font-semibold">{savedDomain}</span>
        </p>
      ) : (
        <p className="mb-4">У вас пока не задан домен</p>
      )}

      <input
        type="text"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        placeholder="Введите имя домена (например, flowershop)"
        className="w-full p-2 border rounded mb-4"
      />

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Сохранить домен
      </button>

      {status && <p className="mt-4 text-sm">{status}</p>}
    </div>
  );
};

export default DomainSettingsPage;
