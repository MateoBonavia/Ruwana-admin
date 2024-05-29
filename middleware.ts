import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/((?!api).*)", "/(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: [
    "/((?!api).*)", // Excluir la ruta /api de la protección
    "/",
    "/(api/trpc)(.*)",
  ],
};
