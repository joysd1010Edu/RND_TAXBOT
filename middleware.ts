import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

//========== Middleware Configuration ===========
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  //========== Public Routes (No Authentication Required) ===========
  const publicRoutes = ["/Login", "/Forgot"];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  //========== Check for Authentication Token and User Data ===========
  const accessToken = request.cookies.get("accessToken")?.value;
  const userDataCookie = request.cookies.get("userData")?.value;

  let userRole: string | null = null;
  if (userDataCookie) {
    try {
      const userData = JSON.parse(decodeURIComponent(userDataCookie));
      userRole = userData.role;
    } catch (error) {
      console.error("Error parsing user data cookie:", error);
    }
  }

  //========== Prevent Users with Role 'user' from Accessing Admin Pages ===========
  if (pathname.startsWith("/Admin") && userRole !== "admin") {
    return NextResponse.redirect(new URL("/403", request.url)); // Redirect to 403 page or any other page you prefer
  }
  //========== Prevent Users with Role 'admin' from Accessing user Pages ===========
  if (pathname.startsWith("/user") && userRole !== "user") {
    return NextResponse.redirect(new URL("/403", request.url)); // Redirect to 403 page or any other page you prefer
  }

  //========== Redirect Authenticated Users Away from Public Routes ===========
  if (isPublicRoute && accessToken) {
    if (userRole === "admin") {
      return NextResponse.redirect(new URL("/Admin/Dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/user/UserDashboard", request.url));
    }
  }

  //========== Redirect to Login if Not Authenticated ===========
  if (!isPublicRoute && !accessToken && pathname !== "/") {
    const loginUrl = new URL("/Login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  //========== Redirect Root to Appropriate Dashboard ===========
  if (pathname === "/" && accessToken) {
    if (userRole === "admin") {
      return NextResponse.redirect(new URL("/Admin/Dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/user/UserDashboard", request.url));
    }
  }

  //========== Redirect Root to Login if Not Authenticated ===========
  if (pathname === "/" && !accessToken) {
    return NextResponse.redirect(new URL("/Login", request.url));
  }

  return NextResponse.next();
}

//========== Middleware Matcher Configuration ===========
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png|.*\\.jpg).*)",
  ],
};
