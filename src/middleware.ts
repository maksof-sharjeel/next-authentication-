import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('authjs.session-token')?.value;
  console.log(sessionToken, "sessionToken");

  const url = request.nextUrl.clone();
  if (!sessionToken) {
    if (request.nextUrl.pathname !== '/sign-in' && request.nextUrl.pathname !== '/sign-up') {
      url.pathname = '/sign-in';
      url.search = '';
      return NextResponse.redirect(url);
    }
  }
  if (sessionToken && (request.nextUrl.pathname === '/sign-in' || request.nextUrl.pathname === '/sign-up')) {
    url.pathname = '/admin';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/sign-in', '/sign-up'], 
};
