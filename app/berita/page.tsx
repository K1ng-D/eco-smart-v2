"use client";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import BeritaCard from "@/components/BeritaCard";
import ProdukCardSkeleton from "@/components/ProdukCardSkeleton";
import TransitionLayout from "@/components/transtition";

const page = () => {
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

  return (
    <div>
      <TransitionLayout />
      <section className="bg-pameranbg bg-center text-white py-20 min-h-screen relative flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="relative max-w-screen-md mx-auto px-6 sm:px-8 lg:px-16 text-center">
          <h1 className="text-6xl font-bold mb-4">
            KABAR TERBARU DARI <span className="text-[#2b7a0b]">KOMUNITAS</span>{" "}
            KAMI
          </h1>
          <p className="text-lg mb-8 text-white uppercase">
            Ikuti perkembangan terbaru dan aktivitas seru yang dilakukan oleh
            warga dalam menjaga lingkungan kita.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-16">
          <h2 className="text-[#2b7a0b] text-2xl font-bold mb-4">
            BERITA KOMUNITAS
          </h2>
          <p className="mt-1 text-gray-600 mb-6">
            Temukan informasi terbaru dan cerita inspiratif dari komunitas
            EcoSmart.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <ProdukCardSkeleton key={index} />
                ))
              : newsData.map((news) => (
                  <BeritaCard key={news.id} news={news} />
                ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
