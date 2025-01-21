import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen px-4">
            <Navbar />
            <main className="container mx-auto px-6 flex-grow">{children}</main>
            <footer className="w-full flex items-center justify-between py-3 text-gray-500">
              <p className="text-tiny">
                © 2024 Acme Inc. All rights reserved.
              </p>
              <div className="flex gap-1">
                <Button
                  className="text-gray-500"
                  variant="light"
                  as={Link}
                  size="sm"
                  isExternal
                  href="https://beian.mps.gov.cn"
                  startContent={
                    <Image
                      alt="beian-logo"
                      width={6}
                      src="https://beian.mps.gov.cn/web/assets/logo01.6189a29f.png"
                    />
                  }
                >
                  粤公网安备44030002003865号
                </Button>
                <Button
                  className="text-gray-500"
                  size="sm"
                  as={Link}
                  variant="light"
                  isExternal
                  href="https://beian.miit.gov.cn"
                >
                  鄂ICP备2024058930号
                </Button>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
