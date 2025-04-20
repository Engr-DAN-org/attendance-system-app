import { CookieAttributes } from "node_modules/@types/js-cookie";

/**
 * @returns true if the environment is Development, false otherwise
 */
export function isDevelopment() {
  return import.meta.env.VITE_ENVIRONMENT === "Development" || false;
}

export function getCookieOptions(expiryDate: Date): CookieAttributes {
  return {
    expires: expiryDate,
    secure: !isDevelopment(),
    sameSite: isDevelopment() ? "Lax" : "Strict",
  };
}
