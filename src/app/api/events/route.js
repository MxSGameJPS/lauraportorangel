import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request) {
  try {
    const data = await request.json();

    const newEvent = await prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        date: new Date(data.date), // Expecting ISO string
        location: data.location,
        type: data.type,
        // imageUrl is optional and we didn't add upload for events yet to keep it simple, but schema supports it.
      },
    });

    return NextResponse.json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Error creating event" },
      { status: 500 }
    );
  }
}
