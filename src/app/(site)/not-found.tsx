import Error from "@/components/Error";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Umang",
};

export default function NotFound() {
  return (
    <main>
      <Error />
    </main>
  );
}
