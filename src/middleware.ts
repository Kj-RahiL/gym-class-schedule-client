
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./utils/verifyToken";

const authRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  //   console.log("middle", request);
  const { pathname } = request.nextUrl;
  // console.log("pa", pathname);

  const accessToken = cookies().get("accessToken")?.value;
  console.log("pa", accessToken);

  if (!accessToken) {
    //Protecting hybrid routes
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      //   return NextResponse.redirect(new URL("/login", request.url));
      return NextResponse.redirect(
        new URL(`/login?redirect=${encodeURIComponent(pathname)}`, request.url)
      );
    }
  }

  //role based authorization

  let decodedToken:any;
  try {
    decodedToken = verifyToken(accessToken);
  } catch (error) {
    console.error("Failed to decode accessToken", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  console.log(decodedToken, "decodedToken");

  const role = decodedToken?.role;
  console.log(role, 'role');

  if (role === "Admin" && pathname.match(/^\/admin-dashboard/)) {
    return NextResponse.next();
  }
  if (role === "Trainer" && pathname.match(/^\/trainer-dashboard/)) {
    return NextResponse.next();
  }
  if (pathname === "/classes") {
    return NextResponse.next(); 
  }
  
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/classes",
    "/trainer-dashboard/:page*",
    "/admin-dashboard/:page*",
  ],
};
