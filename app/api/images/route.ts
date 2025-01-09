import { NextResponse } from "next/server";

export async function GET() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${btoa(`${apiKey}:${apiSecret}`)}`,
    },
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
