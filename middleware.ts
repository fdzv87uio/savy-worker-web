import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('curcle-auth-token');
  const url = request.nextUrl.clone();

  // if (url.pathname !== '/') {
  //   // Si no tiene la cookie y no está en el home, redirigir al home
  //   if (!authToken) {
  //     url.pathname = '/';
  //     return NextResponse.redirect(url);
  //   }
  // }

  return NextResponse.next();
}
