import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/((?!api/products).*)",
  "/((?!api/collections).*)",
  "/(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: [
    "/((?!api/products).*)", // Excluir la ruta /api/products de la protección
    "/",
    "/(api/trpc)(.*)",
  ],
};
