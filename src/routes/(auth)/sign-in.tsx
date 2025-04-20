import { createFileRoute, LinkProps, redirect } from "@tanstack/react-router";
import SignIn from "@/features/auth/sign-in";

export const Route = createFileRoute("/(auth)/sign-in")({
  beforeLoad({ context }) {
    const { isAuthenticated, getRedirectPath } = context.authStore;
    if (isAuthenticated()) {
      const path: LinkProps["to"] = getRedirectPath();
      throw redirect({ to: path });
    }
  },
  component: SignIn,
});
