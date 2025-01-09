"use client";
import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { CldImage } from "next-cloudinary";

interface Product {
  id: string;
  imageUrl: string;
  productName: string;
  descriptionProduct: string;
  priceProduct: string;
  ownerName: string;
  selectedEcommerce: string;
  whatsappNumber: string;
  ecommerceLink: string;
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData: Product[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (error: any) {
        console.error("Error fetching Firestore data:", error);
        setError("Gagal mengambil data dari Firestore");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredProducts(
        products.filter(
          (product) =>
            product.productName
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            product.ownerName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Apakah Anda yakin ingin menghapus produk ini?"
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "products", id));
      setProducts((prev) => prev.filter((product) => product.id !== id));
      setFilteredProducts((prev) =>
        prev.filter((product) => product.id !== id)
      );
      alert("Produk berhasil dihapus!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Gagal menghapus produk.");
    }
  };

  return (
    <div className="p-5 sm:ml-[250px] sm:p-10">
      <h1 className="text-3xl font-bold mb-5">Daftar Produk</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari berdasarkan nama produk, deskripsi, atau pemilik..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div className="overflow-x-auto whitespace-nowrap">
        <div className="flex gap-5">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border border-gray-300 p-5 rounded-lg shadow-lg max-w-sm flex-shrink-0"
            >
              <div className="w-[300px] h-[300px] overflow-hidden">
                <CldImage
                  src={product.imageUrl}
                  width="300"
                  height="300"
                  alt={product.productName}
                  className="rounded-md object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-semibold mt-3">
                {product.productName}
              </h3>

              <p className="text-gray-700">
                <strong>Harga:</strong> {product.priceProduct}
              </p>
              <p className="text-gray-700">
                <strong>Pemilik:</strong> {product.ownerName}
              </p>

              <div className="mt-4 flex justify-between gap-2">
                {product.selectedEcommerce && product.ecommerceLink && (
                  <a
                    href={product.ecommerceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all text-center flex-1"
                  >
                    {product.selectedEcommerce}
                  </a>
                )}

                {product.whatsappNumber && (
                  <a
                    href={`https://wa.me/${product.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all text-center flex-1"
                  >
                    WhatsApp
                  </a>
                )}

                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all text-center flex-1"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
