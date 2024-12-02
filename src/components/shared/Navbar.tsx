"use client";
import { siteConfig } from "@/config/site";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import NextLink from "next/link";
import { link as linkStyles } from "@nextui-org/theme";
import NavbarDropDown from "./NavbarDropDown";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logOut, useCurrentToken } from "@/redux/features/Auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { toast } from "sonner";

const NavbarPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);
  let user: any;

  if (token) {
    user = verifyToken(token);
  }
  // console.log(user, 'nav')

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      shouldHideOnScroll
      maxWidth="2xl"
      height="5rem"
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle
          className="sm:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
        <NavbarBrand>
          <h2>GYMFIT</h2>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {siteConfig.navItems.map((item) => (
          <NavbarItem key={item.href}>
            <NextLink
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium"
              )}
              color="foreground"
              href={item.href}
              data-active={pathname === item.href}
            >
              {item.label}
            </NextLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        {user ? (
          <NavbarItem className="hidden lg:flex">
            <NavbarDropDown user={user} />
          </NavbarItem>
        ) : (
          <NavbarItem className="hidden sm:flex gap-2">
            <Button onClick={() => router.push("/login")} className="button-bg">
              Login
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarMenu>
        {siteConfig.navMenuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <NextLink
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium"
              )}
              color="foreground"
              href={item.href}
              data-active={pathname === item.href}
            >
              {item.label}
            </NextLink>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          {(user?.role === "Admin" || user?.role === "Trainer") && (
            <NextLink
              key="dashboard"
              href={
                user?.role === "Admin"
                  ? "/admin-dashboard"
                  : user?.role === "Trainer"
                    ? "/trainer-dashboard"
                    : "/"
              }
            >
              Dashboard
            </NextLink>
          )}
        </NavbarMenuItem>
        {user ? (
          <NavbarMenuItem
            className="cursor-pointer "
            key="logout"
            onClick={() => (
              dispatch(logOut()),
              toast.success("LogOut Successful", { duration: 3000 })
            )}
          >
            Log Out
          </NavbarMenuItem>
        ) : (
          <NavbarMenuItem className="sm:flex gap-2">
            <Button onClick={() => router.push("/login")} className="button-bg">
              Login
            </Button>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavbarPage;
