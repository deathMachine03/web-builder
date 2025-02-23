import React from "react";
import { useParams } from "react-router-dom";

const ProductPage = () => {
    const { id } = useParams(); // Получаем ID из URL

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">Товар #{id}</h1>
            <p>Описание товара...</p>
        </div>
    );
};

export default ProductPage;
