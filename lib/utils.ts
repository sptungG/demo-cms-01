import { ILanguage } from "@/components/SelectLang";
import { clsx, type ClassValue } from "clsx";
import { countries } from "country-flag-icons";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const checktIsLocale = (locale?: string) => {
  return countries.some((x) => x.toLowerCase() === locale?.toLowerCase());
};

export const isValidLocale = (locale: string, languages: ILanguage[]) => {
  return languages.some(
    (lang) => lang.countryCode.toLowerCase() === locale.toLowerCase()
  );
};

export const getPathWithoutLocale = (path: string, languages: ILanguage[]) => {
  const segments = path.split("/").filter(Boolean);
  const firstSegment = segments[0]?.toLowerCase();

  return isValidLocale(firstSegment, languages)
    ? segments.slice(1).join("/")
    : segments.join("/");
};
