import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(_req: NextRequest) {
  // Add auth/role checks here later.
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
