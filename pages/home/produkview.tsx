"use client";
import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import ProdukCard from "@/components/ProdukCard";
import ProdukCardSkeleton from "@/components/ProdukCardSkeleton";

function variants() {
  return {
    offscreen: {
      y: 150,
      opacity: 0,
    },
    onscreen: ({ duration = 1.5 } = {}) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",

        duration,
      },
    }),
  };
}

export default function ProdukKamiSection() {
  interface Product {
    id: string;
    imageUrl: string;
    productName: string;
    ownerName: string;
    priceProduct: string;
    selectedEcommerce: string;
    whatsappNumber: string; // Add this line
  }

  const [productsData, setProductsData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const setVariants = useMemo(() => variants(), []);

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
            whatsappNumber: data.whatsappNumber || "", // Add this line
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

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center py-12 ">
        <motion.div
          variants={variants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true }}
          className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto"
        >
          <h2 className="text-[#2f7d32] text-4xl font-bold mb-8 text-center">
            PRODUK KAMI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            {Array.from({ length: 3 }).map((_, index) => (
              <ProdukCardSkeleton key={index} />
            ))}
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center py-12 ">
      <motion.div
        variants={variants}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
        className=" max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto"
      >
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 className="text-[#2f7d32] text-4xl font-bold mb-4">
            PRODUK KAMI
          </h2>
          <p className="mt-1 text-gray-600">
            Berbagai macam produk yang ramah lingkungan.
          </p>
        </div>
        <motion.div
          className="flex flex-wrap gap-3 justify-center items-center"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
        >
          {productsData.slice(0, 3).map((product, index) => (
            <motion.div key={index} variants={setVariants}>
              <ProdukCard product={product} />
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-12 text-center">
          <Link
            href="/produk"
            className="py-3 px-4 inline-flex items-center gap-x-1 text-sm font-bold rounded-full border border-gray-200 bg-white text-[#2f7d32] shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
          >
            Produk lainnya
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
