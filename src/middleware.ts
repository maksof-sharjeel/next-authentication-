import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('authjs.session-token')?.value;
  console.log(sessionToken,"sessionToken");
  if (!sessionToken) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: '/about/:path*',
};
