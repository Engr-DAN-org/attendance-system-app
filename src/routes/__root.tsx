import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import NotFoundError from "@/features/errors/not-found-error";
import GeneralError from "@/features/errors/general-error";
import { Toaster } from "@/components/ui/sonner";
import { AuthStoreType } from "@/store/authStore";

export type SystemContext = {
  queryClient: QueryClient;
  authStore: AuthStoreType;
};

export const Route = createRootRouteWithContext<SystemContext>()({
  component: () => {
    return (
      <>
        <Outlet />
        <Toaster />
        {import.meta.env.MODE === "development" && (
          <>
            <ReactQueryDevtools buttonPosition="bottom-left" />
            <TanStackRouterDevtools position="bottom-right" />
          </>
        )}
      </>
    );
  },
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
  // pendingComponent:
});
