"use client";

import React from "react";
import Link from "next/link";
import { useLayout } from "../layout-context";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import SelectLang from "@/components/SelectLang";

interface Props {
  locale: string;
}
export const Header = ({ locale = "vn" }: Props) => {
  const { globalSettings } = useLayout();
  const header = globalSettings!.header!;
  const langs = globalSettings!.language;
  const pathname = usePathname();

  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [selectedLang, setSelectedLang] = React.useState(() => {
    return !!locale ? locale : "vn";
  });

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
        className={`fixed z-20 w-screen border-b backdrop-blur-xl transition-all duration-300 ${
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
                <img
                  src={header.logo!.path as string}
                  className="object-contain bg-transparent"
                  alt={header.name || "Logo"}
                />
              </div>
              <span className="text-lg font-semibold text-vina-primary">
                {header.name}
              </span>
            </Link>

            <div className="hidden lg:flex lg:items-center lg:gap-6">
              <ul className="flex items-center gap-1">
                {header.nav!.map((item, index) => {
                  const isActive = pathname === item!.href;
                  return (
                    <li key={index}>
                      <Link
                        href={item!.href!}
                        className={`relative rounded-md px-3 py-2 text-sm transition-colors ${
                          isActive
                            ? "text-vina-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-vina-primary after:content-['']"
                            : "text-muted-foreground hover:text-vina-primary"
                        }`}
                      >
                        {item!.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Language Selector */}
              <div className="w-[140px]">
                <SelectLang
                  languages={langs as any}
                  value={selectedLang}
                  onChange={setSelectedLang}
                  placeholder="Ngôn ngữ"
                />
              </div>
            </div>

            <button
              onClick={() => setMenuState(!menuState)}
              aria-label={menuState ? "Close Menu" : "Open Menu"}
              className="relative z-20 -m-2.5 cursor-pointer rounded-md p-2.5 transition-colors hover:bg-accent/10 lg:hidden"
            >
              <Menu
                className={`size-6 transition-all duration-300 ${
                  menuState ? "rotate-180 scale-0 opacity-0" : ""
                }`}
              />
              <X
                className={`absolute inset-0 m-auto size-6 transition-all duration-300 ${
                  menuState ? "" : "-rotate-180 scale-0 opacity-0"
                }`}
              />
            </button>

            {/* Mobile menu */}
            <div
              className={`block fixed inset-x-0 top-[65px] z-50 h-[calc(100vh-65px)] transform overflow-y-auto bg-background p-6 transition-all duration-300 ${
                menuState
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0"
              }`}
            >
              <div className="flex flex-col gap-6">
                <ul className="flex flex-col gap-2">
                  {header.nav!.map((item, index) => {
                    const isActive = pathname === item!.href;
                    return (
                      <li key={index}>
                        <Link
                          href={item!.href!}
                          className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                            isActive
                              ? "bg-accent text-accent-foreground"
                              : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                          }`}
                        >
                          {item!.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

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
      </nav>
    </header>
  );
};
