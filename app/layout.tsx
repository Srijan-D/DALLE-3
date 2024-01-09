import "../styles/globals.css";
import Header from "@/components/Header";
import PromptInput from "@/components/PromptInput";
import ClientProvider from "../components/ClientProvider";
import { Analytics } from "@vercel/analytics/react";
export const metadata = {
  title: "VisionaryAI - AI image generator",
  description: "AI image generator Powered by Next.js, DALL-E & ChatGPT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          <Header />
          <PromptInput />
          {children}
          <Analytics />
        </ClientProvider>
      </body>
    </html>
  );
}
