import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('authjs.session-token')?.value;
  console.log(sessionToken,"sessionToken");
  if (!sessionToken) {
    const url = request.nextUrl.clone();
    url.pathname = '/sign-in';
    url.search = ''; 

    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
export const config = {
  matcher: '/admin/:path*', 
};
