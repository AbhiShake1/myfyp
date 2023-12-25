import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { nextUrl: { pathname }, url } = request;

  const token = await getToken({ req: request, secureCookie: process.env.NODE_ENV === "production" });
  if (!token) {
    if (pathname.startsWith("/login")) return NextResponse.next();
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/login")) return NextResponse.redirect(new URL("/", url));

  const { role } = token;
  if (!role) return NextResponse.redirect(new URL("/login", url));

  switch (role) {
    case "admin":
      if (pathname.startsWith("/subscription") || pathname.startsWith("/login/journey")) return NextResponse.redirect(new URL("/admin", url));
      break
    case "staff":
      if (pathname.startsWith("/admin/staffs") || pathname.startsWith("/login/journey")) return NextResponse.redirect(new URL("/admin", url));
      break;
    case "student":
      if (pathname.startsWith("/admin")) return NextResponse.redirect(new URL("/", url))
      break;
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|builder|$).*)"
};
