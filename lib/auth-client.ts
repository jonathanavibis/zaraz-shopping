import { createAuthClient } from "better-auth/react";

const getClientBaseUrl = () => {
  if (typeof window !== "undefined" && window.location.origin) {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
};

export const authClient = createAuthClient({
  baseURL: getClientBaseUrl(),
});

export const { signIn, signUp, useSession, signOut } = authClient;
