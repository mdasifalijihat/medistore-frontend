import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { Roles } from "./constants/roles";
import { userService } from "./service/user.service";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let isAuthenticated = false;
  let isAdmin = false;

  const { data } = await userService.getSession();

  console.log("proxy page", data);

  if (data) {
    isAuthenticated = true;
    isAdmin = data.user?.role === Roles.admin;
  }

  //user in not authenticated at all

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //   user is authenticated and role = admin
  // user can not visit user dashboard
  if (isAdmin && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  //   user is authenticated and role = user
  // user can not visit admin dashboard
  if (!isAdmin && pathname.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
  ],
};
