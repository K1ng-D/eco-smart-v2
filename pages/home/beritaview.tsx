"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import BeritaCard from "@/components/BeritaCard";
import ProdukCardSkeleton from "@/components/ProdukCardSkeleton";

// Variants didefinisikan sebagai objek di luar komponen
const variants = {
  offscreen: {
    y: 150,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1.5, // Mengatur nilai default untuk duration
    },
  },
};

export default function BeritaKamiSection() {
  interface News {
    id: string;
    imageUrl: string;
    titleNews: string;
    descriptionNews: string;
    writterNews: string;
    dateCreated: string;
  }

  const [newsData, setNewsData] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  // Mengambil data berita dari Firestore
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "news"));
        const newsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            imageUrl: data.imageUrl,
            titleNews: data.titleNews,
            descriptionNews: data.descriptionNews,
            writterNews: data.writterNews,
            dateCreated: data.dateCreated,
          } as News;
        });
        setNewsData(newsData);
      } catch (error) {
        console.error("Error fetching news data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Format tanggal untuk ditampilkan dengan format Indonesia
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center py-12 ">
        <motion.div className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
            <h2 className="text-[#2f7d32] text-4xl font-bold mb-4">
              BERITA KAMI
            </h2>
            <p className="mt-1 text-gray-600">
              Berita seputar EcoSmart semuanya tersedia.
            </p>
          </div>
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
    <section className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto mb-8">
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 className="text-[#2f7d32] text-4xl font-bold mb-4">BERITA KAMI</h2>
        <p className="mt-1 text-gray-600">
          Berita seputar EcoSmart semuanya tersedia.
        </p>
      </div>
      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
      >
        {newsData.slice(0, 3).map((news, index) => (
          <motion.div key={index} variants={variants}>
            <BeritaCard news={news} />
          </motion.div>
        ))}
      </motion.div>
      <div className="mt-12 text-center">
        <Link
          href="/berita"
          className="py-3 px-4 font-bold inline-flex items-center gap-x-1 text-sm rounded-full border border-gray-200 bg-white text-[#2f7d32] shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
        >
          Berita lainnya
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
    </section>
  );
}
