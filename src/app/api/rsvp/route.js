import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.eventId || !data.name || !data.phone) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }

    const newGuest = await prisma.guest.create({
      data: {
        eventId: data.eventId,
        name: data.name,
        companions: data.guests || 0,
        phone: data.phone,
      },
    });

    return NextResponse.json(newGuest);
  } catch (error) {
    console.error("Error creating RSVP:", error);
    return NextResponse.json(
      { error: "Erro ao confirmar presença" },
      { status: 500 }
    );
  }
}
