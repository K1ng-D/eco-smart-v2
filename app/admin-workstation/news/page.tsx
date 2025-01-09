"use client";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app, db } from "@/lib/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import TransitionLayout from "@/components/transtition";

export default function UploadNews() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [image, setImage] = useState<File | null>(null);
  const [titleNews, setTitleNews] = useState("");
  const [descriptionNews, setDescriptionNews] = useState("");
  const [writterNews, setWritterNews] = useState("");
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        checkIfUserIsAdmin(user.email);
      } else {
        setLoading(false);
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  const checkIfUserIsAdmin = (userEmail: string | null) => {
    const allowedAdminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    if (userEmail && userEmail === allowedAdminEmail) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
      router.push("/not-authorized");
    }

    setLoading(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (!image || !titleNews || !descriptionNews || !writterNews) {
      alert("Mohon lengkapi semua data sebelum mengupload");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", image);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "default_preset"
    );

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Upload gagal: ${errorData.message}`);
      }

      const data = await response.json();
      const imageUrl = data.secure_url;
      const dateCreated = new Date().toISOString();

      await addDoc(collection(db, "news"), {
        titleNews,
        descriptionNews,
        writterNews,
        imageUrl,
        dateCreated,
      });

      alert("Berita berhasil diunggah dan disimpan di Firestore!");
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat mengupload gambar atau menyimpan data.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return <div>Access Denied</div>;
  }

  return (
    <div className="md:pl-[270px] w-full h-screen pt-14 pb-10 mx-auto p-6 bg-white rounded-lg shadow-md">
      <TransitionLayout />
      <h1 className="text-2xl font-semibold mb-6 text-start">Upload Berita</h1>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Judul Berita"
          value={titleNews}
          onChange={(e) => setTitleNews(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009539]"
        />
        <input
          type="text"
          placeholder="Deskripsi Berita"
          value={descriptionNews}
          onChange={(e) => setDescriptionNews(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009539]"
        />
        <input
          type="text"
          placeholder="Penulis Berita"
          value={writterNews}
          onChange={(e) => setWritterNews(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009539]"
        />
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009539]"
        />
        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`w-full py-2 text-white rounded-lg ${
            uploading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-[#009539] border-2 font-bold border-[#009539] hover:text-[#009539] hover:bg-white"
          } focus:outline-none focus:ring-2 focus:ring-[#009539]`}
        >
          {uploading ? "Uploading..." : "Upload Berita"}
        </button>
      </div>
    </div>
  );
}
