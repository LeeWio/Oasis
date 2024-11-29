"use client";

import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { isAppleDevice } from "@react-aria/utils";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  DiscordIcon,
  GithubIcon,
  Logo,
  SearchIcon,
  TwitterIcon,
} from "@/components/icons";
import AuthForm from "@/components/auth-form";
import Component from "@/app/pricing/page";

export const Navbar = () => {
  useEffect(() => {
    setCommandKey(isAppleDevice() ? "command" : "ctrl");
  }, []);

  const [commandKey, setCommandKey] = useState<"ctrl" | "command">("command");

  const searchInput = (
    <Button
      className={"bg-default-100 text-sm text-default-500"}
      endContent={
        <Kbd
          className="hidden bg-transparent px-2 py-0.5 shadow-none lg:inline-block"
          keys={commandKey}
        >
          K
        </Kbd>
      }
      size={"md"}
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      variant={"flat"}
    >
      Quick Search...
    </Button>
  );

  return (
    <>
      <NextUINavbar maxWidth="xl" position="sticky">
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex justify-start items-center gap-1"
              href="/"
            >
              <Logo />
              <p className="font-bold text-inherit">ACME</p>
            </NextLink>
          </NavbarBrand>
          <ul className="hidden lg:flex gap-4 justify-start ml-2">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium",
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </ul>
        </NavbarContent>

        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden sm:flex gap-2">
            <Link
              isExternal
              aria-label="Twitter"
              href={siteConfig.links.twitter}
            >
              <TwitterIcon className="text-default-500" />
            </Link>
            <Link
              isExternal
              aria-label="Discord"
              href={siteConfig.links.discord}
            >
              <DiscordIcon className="text-default-500" />
            </Link>
            <Link isExternal aria-label="Github" href={siteConfig.links.github}>
              <GithubIcon className="text-default-500" />
            </Link>
            <ThemeSwitch />
          </NavbarItem>
          <Component />
          {/*<NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>*/}
          <NavbarItem className="hidden md:flex">
            {/*<Button*/}
            {/*  isExternal*/}
            {/*  as={Link}*/}
            {/*  className="text-sm font-normal text-default-600 bg-default-100"*/}
            {/*  href={siteConfig.links.sponsor}*/}
            {/*  startContent={<HeartFilledIcon className="text-danger" />}*/}
            {/*  variant="flat"*/}
            {/*>*/}
            {/*  Sponsor*/}
            {/*</Button>*/}
            <AuthForm />
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarMenu>
          {searchInput}
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 2
                      ? "primary"
                      : index === siteConfig.navMenuItems.length - 1
                        ? "danger"
                        : "foreground"
                  }
                  href="#"
                  size="lg"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      </NextUINavbar>
    </>
  );
};
