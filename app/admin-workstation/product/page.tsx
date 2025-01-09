"use client";
import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import TransitionLayout from "@/components/transtition";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export default function UploadImage() {
  const [image, setImage] = useState<File | null>(null);
  const [descriptionProduct, setDescriptionProduct] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [priceProduct, setPriceProduct] = useState("");
  const [productName, setProductName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [selectedEcommerce, setSelectedEcommerce] = useState("");
  const [ecommerceLink, setEcommerceLink] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
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
    if (
      !image ||
      !descriptionProduct ||
      !ownerName ||
      !priceProduct ||
      !productName ||
      !whatsappNumber ||
      !selectedEcommerce ||
      (selectedEcommerce && !ecommerceLink)
    ) {
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

      await addDoc(collection(db, "products"), {
        descriptionProduct,
        ownerName,
        priceProduct,
        productName,
        imageUrl,
        whatsappNumber,
        selectedEcommerce,
        ecommerceLink,
      });

      alert("Upload berhasil dan data disimpan di Firestore!");
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
    <div className="md:pl-[270px] w-full h-auto pt-14 pb-10 mx-auto p-6 bg-white rounded-lg shadow-md">
      <TransitionLayout />
      <h2 className="text-2xl text-start font-semibold mb-6">Upload Produk</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Nama Produk"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009539]"
        />
        <input
          type="text"
          placeholder="Deskripsi Produk"
          value={descriptionProduct}
          onChange={(e) => setDescriptionProduct(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009539]"
        />
        <input
          type="text"
          placeholder="Harga Produk"
          value={priceProduct}
          onChange={(e) => setPriceProduct(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009539]"
        />
        <input
          type="text"
          placeholder="Nama Pemilik"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009539]"
        />
        <input
          type="text"
          placeholder="Nomor WhatsApp"
          value={whatsappNumber}
          onChange={(e) => setWhatsappNumber(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009539]"
        />

        <select
          value={selectedEcommerce}
          onChange={(e) => setSelectedEcommerce(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009539]"
        >
          <option value="">Pilih E-commerce</option>
          <option value="Tokopedia">Tokopedia</option>
          <option value="Bukalapak">Bukalapak</option>
          <option value="Shopee">Shopee</option>
        </select>

        {selectedEcommerce && (
          <input
            type="text"
            placeholder={`Link ${selectedEcommerce}`}
            value={ecommerceLink}
            onChange={(e) => setEcommerceLink(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009539]"
          />
        )}

        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
        />
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="w-full py-3 px-4 bg-[#009539] text-white hover:text-[#009539] font-bold rounded-md hover:bg-white border-2 border-[#009539] focus:outline-none disabled:bg-gray-400"
        >
          {uploading ? "Uploading..." : "Upload Gambar"}
        </button>
      </div>
    </div>
  );
}
