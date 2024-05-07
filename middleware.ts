import { type NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("jwt_token")?.value;

  if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard')) {
    return Response.redirect(new URL('/dashboard', request.url));
  }

  if (!currentUser && !request.nextUrl.pathname.startsWith('/')) {
    return Response.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
