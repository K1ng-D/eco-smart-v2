import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Skeleton from "@mui/joy/Skeleton";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";

export default function ProdukCardSkeleton() {
  return (
    <Card
      variant="outlined"
      sx={{ width: "100%", maxWidth: 370, margin: "0 auto" }}
    >
      <div>
        <Typography level="h2" sx={{ fontSize: "md", mb: 0.5 }}>
          <Skeleton>Product Name</Skeleton>
        </Typography>
        <Typography level="body-sm">
          <Skeleton>Owner Name | Ecommerce</Skeleton>
        </Typography>
        <IconButton
          aria-label="bookmark product"
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
        >
          <BookmarkAdd />
          <Skeleton />
        </IconButton>
      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <Skeleton>
          <img
            src="https://via.placeholder.com/300"
            loading="lazy"
            alt="Product"
          />
        </Skeleton>
      </AspectRatio>
      <CardContent orientation="horizontal">
        <div>
          <Typography level="body-xs">
            <Skeleton>Harga:</Skeleton>
          </Typography>
          <Typography sx={{ fontSize: "lg", fontWeight: "lg" }}>
            <Skeleton>Rp0</Skeleton>
          </Typography>
        </div>
        <Button
          variant="solid"
          size="sm"
          color="primary"
          aria-label="Contact via WhatsApp"
          sx={{ ml: "auto", fontWeight: 600 }}
        >
          WhatsApp
          <Skeleton />
        </Button>
      </CardContent>
    </Card>
  );
}
