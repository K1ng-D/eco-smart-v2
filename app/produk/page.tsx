"use client";
import ProdukCard from "@/components/ProdukCard";
import ProdukCardSkeleton from "@/components/ProdukCardSkeleton";
import TransitionLayout from "@/components/transtition";
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const page = () => {
  interface Product {
    id: string;
    imageUrl: string;
    productName: string;
    ownerName: string;
    priceProduct: string;
    selectedEcommerce: string;
    whatsappNumber: string;
    descriptionProduct: string;
    ecommerceLink?: string; // Add this if needed and make it optional
  }

  const [productsData, setProductsData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            imageUrl: data.imageUrl,
            productName: data.productName,
            ownerName: data.ownerName,
            priceProduct: data.priceProduct,
            selectedEcommerce: data.selectedEcommerce,
            whatsappNumber: data.whatsappNumber || "",
            descriptionProduct: data.descriptionProduct || "",
            ecommerceLink: data.ecommerceLink || "", // Ensure this is included
          } as Product;
        });
        setProductsData(productsData);
      } catch (error) {
        console.error("Error fetching products data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = productsData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const nextPage = () => {
    if (indexOfLastProduct < productsData.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div>
      <TransitionLayout />
      <section
        className="bg-cover bg-center text-white py-20 min-h-screen relative flex items-center justify-center"
        style={{ backgroundImage: "url('/assets/image/Berita.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="relative max-w-screen-md mx-auto px-6 sm:px-8 lg:px-16 text-center">
          <h1 className="text-6xl font-bold mb-4">
            <span className="text-[#2f7d32]">INOVASI </span>HIJAU DARI
            <span className="text-[#2f7d32]"> KOMUNITAS</span> KAMI
          </h1>
          <p className="text-lg mb-8 text-white">
            DAUR ULANG DAN PRODUK LOKAL YANG MENDUKUNG KEBERLANGSUNGAN
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-16">
          <h2 className="font-bold text-center mb-8 text-2xl text-[#2f7d32]">
            Produk Kami
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {loading
              ? Array.from({ length: itemsPerPage }).map((_, index) => (
                  <ProdukCardSkeleton key={index} />
                ))
              : currentProducts.map((product) => (
                  <ProdukCard key={product.id} product={product} />
                ))}
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-center mt-8">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 disabled:opacity-50 mr-2"
            >
              Prev
            </button>
            <button
              onClick={nextPage}
              disabled={indexOfLastProduct >= productsData.length}
              className="px-4 py-2 bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
