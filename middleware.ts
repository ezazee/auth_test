import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("jwt_token")?.value;
  const path = request.nextUrl.pathname;
  const isPublic = path === "/";

  if (isPublic && currentUser) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  console.log(currentUser);
  if (!isPublic && !currentUser) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
