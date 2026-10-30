import type { Metadata } from "next";
import { CallWidget } from "@/components/CallWidget";

export const metadata: Metadata = {
  title: "Голосовой помощник",
  description: "Звонок голосовому помощнику прямо из браузера",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Голосовой помощник",
    description: "Нажмите «Позвонить», чтобы поговорить с помощником",
  },
};

export default function CallPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-10">
      <CallWidget />
    </main>
  );
}
