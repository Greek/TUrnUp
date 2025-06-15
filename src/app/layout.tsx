import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { Nav_Bar } from "./_components/navbar";

export const metadata: Metadata = {
  title: "TUrnUp",
  description: "find all the on-campus events near you",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <Nav_Bar />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
