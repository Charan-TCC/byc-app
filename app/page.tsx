import { redirect } from "next/navigation";

export default function Home() {
  // Redirect to login page for MVP
  redirect("/login");
}
