import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_API = env.AUTH_URL;
export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      console.log(cookieStore);

      const res = await fetch(`${AUTH_API}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const session = await res.json();

      if (session === null) {
        return { data: null, error: { message: "Session is missing" } };
      }

      return { data: session, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
