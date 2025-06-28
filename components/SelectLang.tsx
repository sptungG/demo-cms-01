"use client";

import { Fragment } from "react";
import getCountryFlag from "country-flag-icons/unicode";
import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export interface ILanguage {
  countryName: string;
  countryCode: string;
  countryFlag?: string;
}

interface SelectLangProps {
  languages: ILanguage[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SelectLang = ({
  languages,
  value = "vn",
  onChange,
  placeholder = "Select language",
}: SelectLangProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (value: string) => {
    onChange?.(value);
    const segments = pathname.split("/").filter(Boolean);

    let newPathname = "";
    if (value.toLowerCase() === "vn") {
      // Nếu chuyển sang locale vn, bỏ prefix locale hiện tại (nếu có)
      const pathWithoutLocale = segments.length > 1 ? segments.slice(1) : [];
      newPathname =
        pathWithoutLocale.length > 0 ? `/${pathWithoutLocale.join("/")}` : "/";
    } else {
      // Nếu chuyển sang locale khác, thêm prefix mới
      newPathname = `/${value.toLowerCase()}${pathname}`;
    }

    router.push(newPathname);
  };
  return (
    <div className="relative w-full">
      <Listbox value={value} onChange={handleChange}>
        <div className="relative">
          <Listbox.Button className="relative focus:outline-none w-full min-w-[35px] h-9 rounded-md border border-input bg-background px-3 py-2 text-sm flex items-center justify-between gap-2 hover:bg-accent hover:text-accent-foreground">
            <span className="flex items-center gap-2 truncate">
              {value && (
                <span className="text-lg">{getCountryFlag(value)}</span>
              )}
              <span className="truncate">{value.toLocaleUpperCase()}</span>
            </span>
            <ChevronDown className="w-4 h-4 opacity-50 shrink-0 transition-transform duration-200 ui-open:rotate-180" />
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute focus:outline-none  z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover text-popover-foreground shadow-lg text-sm">
              {languages.map((lang) => (
                <Listbox.Option
                  disabled={
                    lang.countryFlag?.toLowerCase() === value.toLowerCase()
                  }
                  key={lang.countryCode}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-2 pr-4 ${
                      active ? "bg-accent text-accent-foreground" : ""
                    } ui-selected:bg-accent/50`
                  }
                  value={lang.countryFlag}
                >
                  {({ selected }) => (
                    <>
                      <span className="flex items-center gap-2 truncate">
                        <span className="text-lg shrink-0">
                          {getCountryFlag(lang.countryFlag as string)}
                        </span>
                        <span
                          className={`truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {lang.countryFlag}
                        </span>
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                          <Check className="w-4 h-4" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default SelectLang;
