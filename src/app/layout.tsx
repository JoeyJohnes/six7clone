import type { Metadata } from "next";
import { Montserrat, Roboto_Mono } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Six7 — Автоматизация бизнеса",
  description: "Делаю так, чтобы ваш бизнес работал без вас. Автоматизирую всё: от записи до оплаты. Запуск за 3 дня.",
  openGraph: {
    title: "Six7 — Автоматизация бизнеса",
    description: "ИИ работает, пока вы отдыхаете. Напишите — запустим автоматизацию за 3 дня.",
    url: "https://six7cc.vercel.app",
    siteName: "Six7",
    images: [{ url: "/og-image.jpg", width: 1920, height: 1080 }],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Six7 — Автоматизация бизнеса",
    description: "ИИ работает, пока вы отдыхаете. Напишите — запустим автоматизацию за 3 дня.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${montserrat.variable} ${robotoMono.variable} antialiased dark`}
    >
      <body className="bg-[#060810] text-[#f0f2f5]">{children}</body>
    </html>
  );
}
