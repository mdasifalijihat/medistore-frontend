"use client";

import { Loader, Menu, ShoppingCart } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { authClient } from "@/lib/auth-client";
import { useCartStore } from "@/store/cart.store";
import { useEffect, useState } from "react";
import { shopService } from "@/service/shop.service";
import { Category } from "@/shop";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar = ({
  menu = [
    { title: "Home", url: "/" },
    {
      title: "Shop",
      url: "/shop",
    },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/signup" },
  },
  className,
}: NavbarProps) => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  // const isLoggedIn = !!user;

  const role = (user as any)?.role?.toUpperCase() || "";
  const status = (user as any)?.status;
  const isLoggedIn = !!user && status === "ACTIVE";
  const setCart = useCartStore((state) => state.setCart);
  const totalCount = useCartStore((state) => state.totalCount);
  const [categories, setCategories] = useState<Category[]>([]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await shopService.getCategories();
        setCategories(data);
      } catch {
        console.log("Category load failed");
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadCart = async () => {
      if (!isLoggedIn) return;

      try {
        const data = await shopService.getCart();
        setCart(data.cartItems);
      } catch (err) {
        console.log("Cart load failed");
      }
    };

    loadCart();
  }, [isLoggedIn]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className={cn(
        "sticky top-0 z-50 backdrop-blur-md transition-all duration-300 py-2",
        scrolled ? "bg-background/90 shadow-md border-b" : "bg-background/70",
        className,
      )}
    >
      <div className="container mx-auto">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* logo */}
            <h2> MediStore </h2>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}

                  {/* 🔥 Dynamic Categories */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-popover text-popover-foreground">
                      {categories.map((cat) => (
                        <NavigationMenuLink asChild key={cat.id}>
                          <Link
                            href={`/shop?categoryId=${cat.id}`}
                            className="block w-60 px-4 py-2 hover:bg-muted rounded-md"
                          >
                            {cat.name}
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Cart */}
            <Link href="/cart" className="relative">
              <ShoppingCart className="cursor-pointer" />

              {totalCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {totalCount}
                </span>
              )}
            </Link>

            {isPending ? (
              <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
            ) : isLoggedIn && status === "ACTIVE" ? (
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>{user?.name}</NavigationMenuTrigger>

                    <NavigationMenuContent className="w-56 p-2 space-y-1">
                      {/* CUSTOMER */}
                      {role === "CUSTOMER" && (
                        <>
                          <Link
                            href="/orders"
                            className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                          >
                            My Orders
                          </Link>

                          <Link
                            href="/profile"
                            className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                          >
                            Profile
                          </Link>
                        </>
                      )}

                      {/* SELLER */}
                      {role === "SELLER" && (
                        <>
                          <Link
                            href="/dashboard"
                            className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                          >
                            Seller Dashboard
                          </Link>

                          <Link
                            href="/seller/medicines"
                            className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                          >
                            My Medicines
                          </Link>

                          <Link
                            href="/seller/orders"
                            className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                          >
                            Orders
                          </Link>
                        </>
                      )}

                      {/* ADMIN */}
                      {role === "ADMIN" && (
                        <Link
                          href="/admin-dashboard"
                          className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                        >
                          Admin Panel
                        </Link>
                      )}

                      <button
                        onClick={() => authClient.signOut()}
                        className="w-full text-left rounded-md px-3 py-2 text-sm text-red-500 hover:bg-muted"
                      >
                        Logout
                      </button>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            ) : (
              <>
                <Button asChild variant="outline" size="sm">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/signup">Sign up</Link>
                </Button>
              </>
            )}

            <ModeToggle />
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* logo */}
            <h2> MediStore </h2>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    <ShoppingCart />

                    {isPending ? (
                      <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
                    ) : isLoggedIn && status === "ACTIVE" ? (
                      <>
                        {/* CUSTOMER */}
                        {role === "CUSTOMER" && (
                          <>
                            <Link href="/orders" className="font-semibold">
                              My Orders
                            </Link>
                            <Link href="/profile" className="font-semibold">
                              Profile
                            </Link>
                          </>
                        )}

                        {/* SELLER */}
                        {role === "SELLER" && (
                          <>
                            <Link href="/dashboard" className="font-semibold">
                              Seller Dashboard
                            </Link>
                            <Link
                              href="/seller/medicines"
                              className="font-semibold"
                            >
                              My Medicines
                            </Link>
                            <Link
                              href="/seller/orders"
                              className="font-semibold"
                            >
                              Orders
                            </Link>
                          </>
                        )}

                        {/* ADMIN */}
                        {role === "ADMIN" && (
                          <>
                            <Link
                              href="/admin-dashboard"
                              className="font-semibold"
                            >
                              Admin Panel
                            </Link>
                          </>
                        )}

                        <Button
                          variant="outline"
                          className="text-red-500"
                          onClick={() => authClient.signOut()}
                        >
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button asChild variant="outline">
                          <Link href={auth.login.url}>{auth.login.title}</Link>
                        </Button>
                        <Button asChild>
                          <Link href={auth.signup.url}>
                            {auth.signup.title}
                          </Link>
                        </Button>
                      </>
                    )}

                    <ModeToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </Link>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <Link
      className="flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
};

export { Navbar };
