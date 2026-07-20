import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "material-symbols/outlined.css";
import "./globals.css";
import { ThemeProvider } from "@/shared/components/ThemeProvider";
import "@/lib/network/initOutboundProxy"; // Auto-initialize outbound proxy env
import "@/shared/services/bootstrap"; // Auto-run initializeApp (watchdog, auto-resume tunnel)
import { initConsoleLogCapture } from "@/lib/consoleLogBuffer";
import { RuntimeI18nProvider } from "@/i18n/RuntimeI18nProvider";

// Hook console immediately at module load time (server-side only, runs once)
initConsoleLogCapture();

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "E404R — One Gateway. Infinite Intelligence.",
  description:
    "E404R (Engine 404 Router) — The intelligent AI Gateway that connects, optimizes, and secures access to all AI models. Route smarter, scale faster.",
  keywords: ["AI Gateway", "LLM Router", "AI Infrastructure", "OpenAI compatible", "Claude", "Gemini", "E404R"],
  authors: [{ name: "E404R Team" }],
  icons: {
    icon: "/logo-e404r.svg",
    shortcut: "/logo-e404r.svg",
    apple: "/logo-e404r.svg",
  },
  openGraph: {
    title: "E404R — One Gateway. Infinite Intelligence.",
    description: "Intelligent AI Gateway for developers, enterprises, and AI researchers.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#050d1a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <RuntimeI18nProvider>{children}</RuntimeI18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
