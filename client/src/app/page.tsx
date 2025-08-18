import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { parseJwt } from "@/lib/utils";

import { HomeContent } from "./HomeContent";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";
  if (!token) {
    redirect(
      `/login?error=${encodeURIComponent(
        "You must be logged in to access this page"
      )}`
    );
  }
  const decodedToken = parseJwt(token);
  return <HomeContent username={decodedToken?.username ?? "User"} />;
}
