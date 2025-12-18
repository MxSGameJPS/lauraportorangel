import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request) {
  try {
    const data = await request.json();

    // Convert price string to float
    const price = data.price ? parseFloat(data.price) : null;
    const releaseDate = new Date(data.releaseDate);

    const newBook = await prisma.book.create({
      data: {
        title: data.title,
        description: data.description,
        price: price,
        purchaseLink: data.purchaseLink,
        releaseDate: releaseDate,
        coverImage: data.coverImage,
      },
    });

    return NextResponse.json(newBook);
  } catch (error) {
    console.error("Error creating book:", error);
    return NextResponse.json({ error: "Error creating book" }, { status: 500 });
  }
}
