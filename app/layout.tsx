import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arbaj Shaikh — Java Full Stack Developer | Spring Boot | Next.js",
  description: "Java Full Stack Developer with 1+ year building scalable enterprise apps, admin dashboards, HRM systems, booking platforms. Pune, India.",
  keywords: ["Arbaj Shaikh", "Java Developer", "Full Stack", "Spring Boot", "Next.js", "Pune", "HRM", "REST API"],
  authors: [{ name: "Arbaj Shaikh", url: "https://linkedin.com/in/arbaj-shaikh-91a248227" }],
  openGraph: {
    title: "Arbaj Shaikh — Java Full Stack Developer",
    description: "From Development to Production Deployment — I Deliver Complete Scalable Solutions.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
