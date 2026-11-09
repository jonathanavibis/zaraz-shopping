// Zaraz Universal API Client (Connecting Frontend to zaraz-server and MongoDB)

export const BACKEND_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  (typeof window !== "undefined" && window.location.hostname.includes("vercel.app")
    ? "https://zaraz-server30.vercel.app"
    : "http://localhost:5000");

/**
 * Universal fetcher that connects directly to zaraz-server (Express + MongoDB Atlas)
 * and falls back to internal Next.js API if zaraz-server is not reachable.
 */
export async function apiRequest<T = any>(
  endpoint: string,
  options?: RequestInit
): Promise<{ success: boolean; [key: string]: any }> {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  // Primary: Connect to zaraz-server (Express + MongoDB Atlas)
  try {
    const res = await fetch(`${BACKEND_URL}${cleanEndpoint}`, {
      cache: "no-store",
      ...options,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(typeof window !== "undefined" && localStorage.getItem("zaraz_token")
          ? { Authorization: `Bearer ${localStorage.getItem("zaraz_token")}` }
          : {}),
        ...options?.headers,
      },
    });

    if (
      res.ok ||
      res.status === 400 ||
      res.status === 401 ||
      res.status === 404 ||
      res.status === 409
    ) {
      const data = await res.json();
      return data;
    }
  } catch (backendError) {
    console.warn(
      `[Zaraz API] zaraz-server at ${BACKEND_URL} not reachable, falling back to Next.js API...`,
      backendError
    );
  }

  // Fallback: Local Next.js API
  try {
    const fallbackEndpoint = cleanEndpoint.startsWith("/api")
      ? cleanEndpoint
      : `/api${cleanEndpoint}`;

    const res = await fetch(fallbackEndpoint, {
      ...options,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });
    return await res.json();
  } catch (fallbackError: any) {
    return {
      success: false,
      message: fallbackError.message || "Failed to communicate with API server",
    };
  }
}
