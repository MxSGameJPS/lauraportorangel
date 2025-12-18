import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET a specific event
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const event = await prisma.event.findUnique({
      where: { id },
    });
    if (!event)
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching event" },
      { status: 500 }
    );
  }
}

// PUT (Update) an event
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        date: data.date ? new Date(data.date) : undefined,
        location: data.location,
        type: data.type,
      },
    });

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { error: "Error updating event" },
      { status: 500 }
    );
  }
}

// DELETE an event
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await prisma.event.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Event deleted" });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: "Error deleting event" },
      { status: 500 }
    );
  }
}
