import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const validUser = process.env.ADMIN_USER;
    const validPass = process.env.ADMIN_PASSWORD;

    if (username === validUser && password === validPass) {
      // Create a simple session cookie
      // In a real app, use a signed JWT. Here we trust the server-side environment for simplicity as requested.
      // We'll set a simple value, but ensure it's HttpOnly.

      const cookieStore = await cookies();
      cookieStore.set("admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { message: "Usuário ou senha incorretos." },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
