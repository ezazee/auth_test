import { type NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { decode } from "punycode";


export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("jwt_token")?.value;
  const path = request.nextUrl.pathname;
  const isPublic = path === "/";

  if (currentUser) {
    const decodedToken = jwtDecode(currentUser);
    const userId = decodedToken.sub;
    const expDate = decodedToken.exp;
  }

  if (isPublic && currentUser) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isPublic && !currentUser) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
