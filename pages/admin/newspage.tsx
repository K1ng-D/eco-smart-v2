"use client";
import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { CldImage } from "next-cloudinary";

interface News {
  id: string;
  imageUrl: string;
  titleNews: string;
  descriptionNews: string;
  writterNews: string;
  dateCreated: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [filteredNews, setFilteredNews] = useState<News[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "news"));
        const newsData: News[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as News[];
        setNews(newsData);
        setFilteredNews(newsData);
      } catch (error: any) {
        console.error("Error fetching Firestore data:", error);
        setError("Gagal mengambil data dari Firestore");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredNews(
        news.filter(
          (newsItem) =>
            newsItem.titleNews
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            newsItem.descriptionNews
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            newsItem.writterNews
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredNews(news);
    }
  }, [searchQuery, news]);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Apakah Anda yakin ingin menghapus berita ini?"
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "news", id));
      setNews((prev) => prev.filter((newsItem) => newsItem.id !== id));
      alert("Berita berhasil dihapus!");
    } catch (error) {
      console.error("Error deleting news:", error);
      alert("Gagal menghapus berita.");
    }
  };

  return (
    <div className="p-5 sm:ml-[250px] sm:p-10">
      <h1 className="text-3xl font-bold mb-5">Daftar Berita</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari berdasarkan judul, deskripsi, atau penulis..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div className="overflow-x-auto whitespace-nowrap">
        <div className="flex gap-5">
          {filteredNews.map((newsItem) => (
            <div
              key={newsItem.id}
              className="border border-gray-300 p-5 rounded-lg shadow-lg max-w-sm flex-shrink-0"
            >
              <div className="w-[300px] h-[300px] overflow-hidden">
                <CldImage
                  src={newsItem.imageUrl}
                  width="300"
                  height="300"
                  alt={newsItem.titleNews}
                  className="rounded-md object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-semibold mt-3">
                {newsItem.titleNews.length > 20
                  ? `${newsItem.titleNews.substring(0, 20)}...`
                  : newsItem.titleNews}
              </h3>

              <p className="text-gray-700">
                <strong>Penulis:</strong> {newsItem.writterNews}
              </p>
              <p className="text-gray-700">
                <strong>Tanggal:</strong>{" "}
                {new Date(newsItem.dateCreated).toLocaleDateString()}
              </p>
              <button
                onClick={() => handleDelete(newsItem.id)}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all"
              >
                Hapus Berita
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
