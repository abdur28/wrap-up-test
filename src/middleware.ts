import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/checkout(.*)", "/admin(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);


export const middleware = clerkMiddleware((auth, req) => {
    const { sessionClaims } = auth();
    // Restrict admin routes to users with specific permissions
    // if (isAdminRoute(req)) {
    //   auth().protect(has => {
    //     return (
    //       has({ role: "admin" }) 
    //     )
    //   })
    // }

    // Restrict organization routes to signed in users
    if (isProtectedRoute(req)) auth().protect();
    
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};


// export const middleware = async (request: NextRequest) => {
//   const cookies = request.cookies;
//   const res = NextResponse.next();

//   if (cookies.get("refreshToken")) {
//     console.log(cookies.get("refreshToken"));
//     return res;
//   }
// }



