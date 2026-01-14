import { NextResponse } from 'next/server';

export function middleware(request) {
    const path = request.nextUrl.pathname;

    // Define public paths that don't require authentication
    const isPublicPath = path.startsWith('/auth') ||
        path.startsWith('/_next') ||
        path.startsWith('/api') ||
        path === '/favicon.ico' ||
        path.match(/\.(jpg|jpeg|png|gif|svg|webp)$/);

    // Get the token from the cookies
    const token = request.cookies.get('jwt')?.value;

    // Redirect to login if accessing protected route without token
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Allow the request to proceed
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
