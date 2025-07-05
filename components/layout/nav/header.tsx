"use client";

import React from "react";
import Link from "next/link";
import { useLayout } from "../layout-context";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import SelectLang from "@/components/SelectLang";
import { motion, AnimatePresence } from "framer-motion";

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
      setIsScrolled(window.scrollY > 90);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className="bg-white sticky top-0 right-0 w-full z-[99999] border-b backdrop-blur-xl"
    >
      <nav
        data-state={menuState ? "active" : "inactive"}
        className="m-auto"
      >
        <hr className="bg-vina-primary" />
        <div className={`${isScrolled ? 'bg-white shadow-sm' : 'bg-white'}`}>
          <div className="mx-auto container px-2 sm:px-3 md:px-4">
            <div
              className={`relative flex h-14 sm:h-16 items-center ${isScrolled ? 'justify-between' : 'justify-center'} py-2 sm:py-3 lg:gap-0 lg:py-0`}
            >
              <div className={`hidden sm:flex w-full items-center ${isScrolled ? 'justify-between' : 'justify-center'}`}>
                {isScrolled && <AnimatePresence>
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
                </AnimatePresence>}

                <motion.div
                  className="flex lg:items-center gap-2 sm:gap-3 md:gap-4 "
                  initial={{ opacity: 1 }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <ul className="flex items-center gap-0.5 sm:gap-1">
                    {header.nav!.map((item, index) => {
                      const isActive = pathname === item!.href;
                      return (
                        <motion.li key={index}>
                          <Link
                            href={item!.href!}
                            className={`relative rounded-md px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm transition-colors ${isActive
                              ? "text-vina-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-vina-primary after:content-['']"
                              : "text-muted-foreground hover:text-vina-primary"
                              }`}
                          >
                            {item!.label}
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>

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
                      placeholder="Ngôn ngữ"
                    />
                  </motion.div>
                </motion.div>
              </div>
              <div className="w-full flex sm:hidden items-center justify-between">
                <Link
                  href={`/${selectedLang.toLowerCase()}`}
                  aria-label="home"
                  className="block sm:hidden flex items-center space-x-2 sm:space-x-3 hover:opacity-90"
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
                    className={`h-5 w-5 sm:h-6 sm:w-6 transition-all duration-300 ${menuState ? "rotate-180 scale-0 opacity-0" : ""}`}
                  />
                  <X
                    className={`absolute inset-0 m-auto h-5 w-5 sm:h-6 sm:w-6 transition-all duration-300 ${menuState ? "" : "-rotate-180 scale-0 opacity-0"}`}
                  />
                </button>

                {/* Mobile menu */}
                <div
                  className={`block fixed inset-x-0 top-[56px] sm:top-[65px] z-50 h-[calc(100vh-56px)] sm:h-[calc(100vh-65px)] transform overflow-y-auto bg-background p-4 sm:p-6 transition-all duration-300 ${menuState
                    ? "translate-x-0 opacity-100"
                    : "translate-x-full opacity-0"
                    }`}
                >
                  <div className="flex flex-col gap-4 sm:gap-6">
                    <ul className="flex flex-col gap-1.5 sm:gap-2">
                      {header.nav!.map((item, index) => {
                        const isActive = pathname === item!.href;
                        return (
                          <li key={index}>
                            <Link
                              href={item!.href!}
                              className={`block rounded-md px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm transition-colors ${isActive
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
          </div>
        </div>
      </nav>
    </motion.header>
  );
};
