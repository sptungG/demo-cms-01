"use client";

import React from "react";
import Link from "next/link";
import { useLayout } from "../layout-context";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import SelectLang from "@/components/SelectLang";
import { motion, AnimatePresence } from "framer-motion";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Disclosure } from "@headlessui/react";

interface Props {
  locale: string;
}

interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
}

export const Header = ({ locale = "" }: Props) => {
  const { globalSettings } = useLayout();
  const header = globalSettings!.header!;
  const langs = globalSettings!.language;
  const pathname = usePathname();

  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [selectedLang, setSelectedLang] = React.useState(() => {
    return !!locale ? locale : "";
  });

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 90);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLink = ({ item }: { item: NavItem }) => {
    const isActive = pathname === item.href;

    if (item.children) {
      return (
        <NavigationMenu.Item>
          <NavigationMenu.Trigger
            className={`group cursor-pointer flex items-center gap-1 rounded-md px-3 py-2 text-sm transition-colors ${
              isActive
                ? "text-vina-primary"
                : "text-muted-foreground hover:text-vina-primary"
            }`}
          >
            <Link href={item.href ?? "#"} className="flex items-center gap-1">
              {item.label}
              <ChevronDown
                className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180"
                aria-hidden="true"
              />
            </Link>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute top-0 left-0 w-full sm:w-auto data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight">
            <div className="m-0 w-[200px] bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
              <ul className="flex flex-col py-2">
                {item.children.map((child, index) => (
                  <li key={index} className="group">
                    <NavigationMenu.Link asChild>
                      <Link
                        href={child.href || "#"}
                        className={`flex items-center gap-2 px-4 py-2.5 hover:bg-accent/10 transition-all duration-150 ${
                          pathname === child.href
                            ? "bg-vina-primary/10 text-vina-primary"
                            : "text-muted-foreground hover:text-accent-foreground"
                        }`}
                      >
                        <span className="text-sm font-medium group-hover:text-vina-primary transition-colors">
                          {child.label}
                        </span>
                      </Link>
                    </NavigationMenu.Link>
                  </li>
                ))}
              </ul>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      );
    }

    return (
      <NavigationMenu.Item>
        <NavigationMenu.Link asChild>
          <Link
            href={item.href || "#"}
            className={`rounded-md px-3 py-2 text-sm transition-colors ${
              isActive
                ? "text-vina-primary underline"
                : "text-muted-foreground hover:text-vina-primary"
            }`}
          >
            {item.label}
          </Link>
        </NavigationMenu.Link>
      </NavigationMenu.Item>
    );
  };

  const MobileNavItem = ({ item }: { item: NavItem }) => {
    const isActive = pathname === item.href;

    if (item.children && item.children.length > 0) {
      return (
        <Disclosure>
          {({ open }) => (
            <div key={item.href}>
              <Disclosure.Button
                className={`flex w-full items-center justify-between rounded-md px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm transition-colors ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                }`}
              >
                <span>{item.label}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="mt-1 ml-4 space-y-1">
                {item.children?.map((child, childIndex) => {
                  const isChildActive = pathname === child.href;
                  return (
                    <Link
                      key={childIndex}
                      href={child.href || "#"}
                      className={`block rounded-md px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm transition-colors ${
                        isChildActive
                          ? "bg-vina-primary/10 text-vina-primary"
                          : "text-muted-foreground hover:bg-accent/30 hover:text-accent-foreground"
                      }`}
                      onClick={() => setMenuState(false)}
                    >
                      {child.label}
                    </Link>
                  );
                })}
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      );
    }

    return (
      <Link
        href={item.href || "#"}
        className={`block rounded-md px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm transition-colors ${
          isActive
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
        }`}
        onClick={() => setMenuState(false)}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <motion.header className="bg-white sticky top-0 right-0 w-full z-[50] border-b backdrop-blur-xl">
      <nav data-state={menuState ? "active" : "inactive"} className="m-auto">
        <hr className="bg-vina-primary" />
        <div className={`${isScrolled ? "bg-white shadow-sm" : "bg-white"}`}>
          <div className="mx-auto container px-2 sm:px-3 md:px-4">
            <div
              className={`relative flex h-14 sm:h-16 items-center ${
                isScrolled ? "justify-between" : "justify-center"
              } py-2 sm:py-3 lg:gap-0 lg:py-0`}
            >
              <div
                className={`hidden sm:flex w-full items-center ${
                  isScrolled ? "justify-between" : "justify-center"
                }`}
              >
                {isScrolled && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.1 }}
                      className="hidden md:block"
                    >
                      <Link
                        href={`/${selectedLang.toLowerCase()}`}
                        aria-label="home"
                        className="flex items-center space-x-2 sm:space-x-3 hover:opacity-90"
                      >
                        <div className="relative h-6 w-6 sm:h-8 sm:w-8">
                          <img
                            src={header.logo!.path as string}
                            className="object-contain bg-transparent"
                            alt={header.name || "Logo"}
                          />
                        </div>
                        <span className="hidden lg:block text-base sm:text-lg font-semibold text-vina-primary">
                          {header.name}
                        </span>
                      </Link>
                    </motion.div>
                  </AnimatePresence>
                )}

                <motion.div
                  className="flex lg:items-center gap-2 sm:gap-3 md:gap-4"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <NavigationMenu.Root className="relative">
                    <NavigationMenu.List className="flex items-center gap-0.5 sm:gap-1 list-none">
                      {header.nav!.map((item, index) => (
                        <NavLink key={index} item={item as NavItem} />
                      ))}
                      <NavigationMenu.Indicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
                        <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-border" />
                      </NavigationMenu.Indicator>
                    </NavigationMenu.List>

                    <div className="absolute left-1/2 -translate-x-1/2 top-full flex justify-center">
                      <NavigationMenu.Viewport className="border data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-popover text-popover-foreground shadow-lg transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
                    </div>
                  </NavigationMenu.Root>

                  <motion.div
                    className="w-[100px] sm:w-[120px] md:w-[140px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <SelectLang
                      languages={langs as any}
                      value={selectedLang}
                      onChange={setSelectedLang}
                      placeholder="Language"
                    />
                  </motion.div>
                </motion.div>
              </div>

              {/* Mobile menu - keeping the existing implementation */}
              <div className="w-full flex sm:hidden items-center justify-between">
                <Link
                  href={`/${selectedLang.toLowerCase()}`}
                  aria-label="home"
                  className="sm:hidden flex items-center space-x-2 sm:space-x-3 hover:opacity-90"
                >
                  <div className="relative h-6 w-6 sm:h-8 sm:w-8">
                    <img
                      src={header.logo!.path as string}
                      className="object-contain bg-transparent"
                      alt={header.name || "Logo"}
                    />
                  </div>
                  <span className="text-base sm:text-lg font-semibold text-vina-primary">
                    {header.name}
                  </span>
                </Link>

                <button
                  onClick={() => setMenuState(!menuState)}
                  aria-label={menuState ? "Close Menu" : "Open Menu"}
                  className="relative block sm:hidden z-20 -m-2 sm:-m-2.5 cursor-pointer rounded-md p-2 sm:p-2.5 transition-colors hover:bg-accent/10 lg:hidden"
                >
                  <Menu
                    className={`h-5 w-5 sm:h-6 sm:w-6 transition-all duration-300 ${
                      menuState ? "rotate-180 scale-0 opacity-0" : ""
                    }`}
                  />
                  <X
                    className={`absolute inset-0 m-auto h-5 w-5 sm:h-6 sm:w-6 transition-all duration-300 ${
                      menuState ? "" : "-rotate-180 scale-0 opacity-0"
                    }`}
                  />
                </button>

                {/* Mobile menu */}
                <div
                  className={`block fixed inset-x-0 top-[56px] sm:top-[65px] z-50 h-[calc(100vh-56px)] sm:h-[calc(100vh-65px)] transform overflow-y-auto bg-background p-4 sm:p-6 transition-all duration-300 ${
                    menuState
                      ? "translate-x-0 opacity-100"
                      : "translate-x-full opacity-0"
                  }`}
                >
                  <div className="flex flex-col gap-4 sm:gap-6">
                    <div className="flex flex-col gap-1.5 sm:gap-2">
                      {header.nav!.map((item, index) => (
                        <MobileNavItem key={index} item={item as NavItem} />
                      ))}
                    </div>

                    {/* Mobile Language Selector */}
                    <div className="w-full">
                      <SelectLang
                        languages={langs as any}
                        value={selectedLang}
                        onChange={setSelectedLang}
                        placeholder="Ngôn ngữ"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </motion.header>
  );
};
