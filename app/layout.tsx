import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";

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
            <main className="w-full mx-auto px-6 flex-grow">{children}</main>
            <footer className="w-full flex items-center justify-between py-3 text-gray-500">
              <p className="text-tiny">
                © 2024 Acme Inc. All rights reserved.
              </p>
              <div className="flex gap-1">
                <Button
                  isExternal
                  as={Link}
                  className="text-gray-500"
                  href="https://beian.mps.gov.cn"
                  size="sm"
                  startContent={
                    <Image
                      alt="beian-logo"
                      src="https://beian.mps.gov.cn/web/assets/logo01.6189a29f.png"
                      width={6}
                    />
                  }
                  variant="light"
                >
                  粤公网安备44030002003865号
                </Button>
                <Button
                  isExternal
                  as={Link}
                  className="text-gray-500"
                  href="https://beian.miit.gov.cn"
                  size="sm"
                  variant="light"
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
