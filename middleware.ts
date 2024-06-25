import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/((?!api).*)",
  "/",
  "/(api/trpc)(.*)",
  "/api/products/(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: [
    "/((?!api).*)",
    "/",
    "/api(.*)", // Añade la ruta específica si está bajo /api
  ],
};
