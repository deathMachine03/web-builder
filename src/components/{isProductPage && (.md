{isProductPage && (
                            <>
                                <h2 className="text-xl font-bold mb-4">Товары</h2>

                                <button onClick={handleAddProduct} className="bg-blue-600 text-white p-2 rounded-lg w-full text-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2">
                                    <PlusCircle size={20} />
                                    Добавить товар
                                </button>

                                {draftProducts.map((product) => (
                            <div key={product._id} className="border p-4 rounded-md mt-4 shadow-sm">
                                
                                <label className="block font-semibold">Название</label>
                                <input 
                                    type="text" 
                                    value={product.name} 
                                    onChange={(e) => handleUpdateProduct(product._id, "name", e.target.value)} 
                                    className="w-full p-2 border rounded-md mb-2"
                                />

                                <label className="block font-semibold">Цена</label>
                                <input 
                                    type="number" 
                                    value={product.price} 
                                    onChange={(e) => handleUpdateProduct(product._id, "price", e.target.value)} 
                                    className="w-full p-2 border rounded-md mb-2"
                                />

                                <label className="block font-semibold">Описание</label>
                                <textarea 
                                    value={product.description} 
                                    onChange={(e) => handleUpdateProduct(product._id, "description", e.target.value)} 
                                    className="w-full p-2 border rounded-md mb-2"
                                />

                                <label className="block font-semibold">Изображение</label>
                                <input 
                                    type="file" 
                                    className="w-full text-sm mb-2" 
                                    onChange={(e) => uploadFile(e.target.files[0], "productImage", product._id)} 
                                />
                                {product.image ? (
                                    <img src={product.image} alt="Товар" className="mt-2 h-16 w-full object-cover rounded" />
                                ) : (
                                    <div className="h-16 w-full bg-gray-200 rounded flex items-center justify-center">
                                        Нет изображения
                                    </div>
                                )}

                                <button onClick={() => handleDeleteProduct(product._id)} className="text-red-600 flex items-center gap-2">
                                    <Trash2 size={18} />
                                    Удалить
                                </button>
                            </div>
                        ))}
                            </>
                        )}