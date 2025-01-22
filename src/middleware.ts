import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: Request) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (token) {
    const url = new URL(req.url);
    if (url.pathname === "/") {
      return NextResponse.redirect(new URL("/chatlist", req.url)); 
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};