import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Link from "next/link";

interface Product {
  id: string;
  imageUrl: string;
  productName: string;
  ownerName: string;
  priceProduct: string;
  selectedEcommerce: string;
  ecommerceLink?: string; // ecommerceLink bisa saja tidak ada
  whatsappNumber: string;
}

interface ProdukCardProps {
  product: Product;
}

const formatRupiah = (number: string) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(Number(number));
};

const ProdukCard: React.FC<ProdukCardProps> = ({ product }) => {
  const ecommerceLink = product.ecommerceLink || "#"; // Fallback jika ecommerceLink tidak ada

  return (
    <Card sx={{ width: 370, padding: 2 }}>
      {/* Card Link */}
      <Link href={`/produk/${product.id}`} className="block mb-2" passHref>
        <Typography level="title-lg" sx={{ mb: 1 }}>
          {product.productName}
        </Typography>
        <Typography level="body-sm" sx={{ mb: 2 }}>
          {product.ownerName} | {product.selectedEcommerce}
        </Typography>

        {/* Gambar Produk */}
        <AspectRatio minHeight="20px" maxHeight="250px" sx={{ mb: 2 }}>
          <img
            src={product.imageUrl}
            alt={product.productName}
            loading="lazy"
            style={{ borderRadius: "8px", objectFit: "cover" }} // Styling untuk gambar
          />
        </AspectRatio>

        {/* Informasi Harga */}
        <CardContent
          orientation="horizontal"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 2,
          }}
        >
          <div>
            <Typography level="body-xs" sx={{ mb: 1 }}>
              Harga:
            </Typography>
            <Typography sx={{ fontSize: "lg", fontWeight: "lg" }}>
              {formatRupiah(product.priceProduct)}
            </Typography>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProdukCard;
