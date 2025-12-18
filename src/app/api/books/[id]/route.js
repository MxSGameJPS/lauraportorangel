import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET a specific book (for editing)
export async function GET(request, { params }) {
  try {
    const book = await prisma.book.findUnique({
      where: { id: params.id },
    });
    if (!book)
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching book" }, { status: 500 });
  }
}

// PUT (Update) a book
export async function PUT(request, { params }) {
  try {
    const data = await request.json();

    // Convert price string to float if present
    const price = data.price ? parseFloat(data.price) : null;
    const releaseDate = data.releaseDate
      ? new Date(data.releaseDate)
      : undefined;

    const updatedBook = await prisma.book.update({
      where: { id: params.id },
      data: {
        title: data.title,
        description: data.description,
        price: price,
        purchaseLink: data.purchaseLink,
        releaseDate: releaseDate,
        coverImage: data.coverImage,
      },
    });

    return NextResponse.json(updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);
    return NextResponse.json({ error: "Error updating book" }, { status: 500 });
  }
}

// DELETE a book
export async function DELETE(request, { params }) {
  try {
    await prisma.book.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: "Book deleted" });
  } catch (error) {
    console.error("Error deleting book:", error);
    return NextResponse.json({ error: "Error deleting book" }, { status: 500 });
  }
}
