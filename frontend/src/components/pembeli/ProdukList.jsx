import React, { useEffect, useState } from "react";
import { getAllBukets } from "../../api/buketApi";
import { addToCart } from "../../api/cartApi";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllBukets();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      const quantity = 1; // Kuantitas default untuk ditambahkan
      const response = await addToCart(productId, quantity);
      alert("Produk berhasil ditambahkan ke keranjang!");
      console.log("Response:", response);
    } catch (err) {
      console.error("Gagal menambahkan produk ke keranjang:", err);
      alert("Terjadi kesalahan saat menambahkan ke keranjang.");
    }
  };

  if (loading) return <p className="text-center py-8">Loading produk...</p>;
  if (error)
    return <p className="text-center py-8 text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-4xl font-extrabold mb-4 text-center">Produk</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white border rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-2 transition-all duration-300"
          >
            {/* Container untuk gambar */}
            <div className="relative h-64 flex items-center justify-center bg-gray-100 rounded-t-lg overflow-hidden">
              <img
                src={`http://localhost:5000${product.image}`}
                alt={product.name}
                className="h-64 w-64 object-contain"
              />
              <span className="absolute top-2 left-2 bg-purple-500 text-white text-sm px-3 py-1 rounded-lg">
                {product.category}
              </span>
            </div>
            {/* Informasi produk */}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-lg font-bold text-gray-900 mb-4">
                Rp{product.price}
              </p>
              <button
                onClick={() => handleAddToCart(product._id)}
                className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-400 transition-all duration-300"
              >
                Tambahkan ke Keranjang
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
