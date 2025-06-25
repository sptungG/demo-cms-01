"use client";

import React from "react";
import Link from "next/link";
import { useLayout } from "../layout-context";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export const Header = () => {
  const { globalSettings } = useLayout();
  const header = globalSettings!.header!;
  const pathname = usePathname();

  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <nav
        data-state={menuState ? "active" : "inactive"}
        className={`fixed z-20 w-full border-b backdrop-blur-xl transition-all duration-300 ${
          isScrolled ? "bg-background/80 shadow-sm" : "bg-background/50"
        }`}
      >
        <div className="mx-auto max-w-6xl px-6 transition-all duration-300">
          <div className="relative flex h-16 items-center justify-between gap-6 py-3 lg:gap-0 lg:py-0">
            <Link
              href="/"
              aria-label="home"
              className="flex items-center space-x-3 transition-opacity hover:opacity-90"
            >
              <div className="relative h-8 w-8">
                <Image
                  src={header.logo!.path as string}
                  fill
                  className="object-contain"
                  alt={header.name || "Logo"}
                  priority
                />
              </div>
              <span className="text-lg font-semibold">{header.name}</span>
            </Link>

            <button
              onClick={() => setMenuState(!menuState)}
              aria-label={menuState ? "Close Menu" : "Open Menu"}
              className="relative z-20 -m-2.5 cursor-pointer rounded-md p-2.5 transition-colors hover:bg-accent/10 lg:hidden"
            >
              <Menu className={`size-6 transition-all duration-300 ${menuState ? "rotate-180 scale-0 opacity-0" : ""}`} />
              <X className={`absolute inset-0 m-auto size-6 transition-all duration-300 ${menuState ? "" : "-rotate-180 scale-0 opacity-0"}`} />
            </button>

            <div className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {header.nav!.map((item, index) => {
                  const isActive = pathname === item!.href;
                  return (
                    <li key={index}>
                      <Link
                        href={item!.href!}
                        className={`relative rounded-md px-3 py-2 text-sm transition-colors ${
                          isActive
                            ? "text-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-foreground after:content-['']"
                            : "text-muted-foreground hover:bg-accent/10 hover:text-accent-foreground"
                        }`}
                      >
                        {item!.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Mobile menu */}
            <div
              className={`fixed inset-x-0 top-[65px] z-50 h-[calc(100vh-65px)] transform overflow-y-auto bg-background p-6 transition-all duration-300 lg:hidden ${
                menuState ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
              }`}
            >
              <ul className="space-y-3">
                {header.nav!.map((item, index) => {
                  const isActive = pathname === item!.href;
                  return (
                    <li key={index}>
                      <Link
                        href={item!.href!}
                        onClick={() => setMenuState(false)}
                        className={`block rounded-md px-4 py-2 text-base transition-colors ${
                          isActive
                            ? "bg-accent/10 text-foreground"
                            : "text-muted-foreground hover:bg-accent/10 hover:text-accent-foreground"
                        }`}
                      >
                        {item!.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
