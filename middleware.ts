import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Auth protection is handled client-side via useAuth() in each protected page.
// Middleware cannot access Supabase sessions stored in localStorage.
// This middleware is kept as a placeholder for future cookie-based auth (@supabase/ssr).
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/submit/:path*', '/critiques/:path*', '/queue/:path*'],
};
