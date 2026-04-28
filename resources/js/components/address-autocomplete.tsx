import { useEffect, useRef, useState } from "react";
import { cx } from "@/utils/cx";

interface Suggestion {
  display_name: string;
  lat: string;
  lon: string;
}

interface AddressAutocompleteProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (address: string, lat: number | null, lng: number | null) => void;
  isRequired?: boolean;
  hint?: string;
  isInvalid?: boolean;
  dark?: boolean;
}

export function AddressAutocomplete({
  label,
  placeholder,
  value,
  onChange,
  isRequired,
  hint,
  isInvalid,
  dark = false,
}: AddressAutocompleteProps) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const search = (q: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (q.length < 3) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          q,
          format: "json",
          addressdetails: "1",
          limit: "5",
          countrycodes: "nl",
          "accept-language": "nl",
        });
        const res = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
          headers: { "User-Agent": "YAS-TaxiCentrale/1.0 (karradyassine@gmail.com)" },
        });
        const data: Suggestion[] = await res.json();
        setSuggestions(data);
        setIsOpen(data.length > 0);
      } catch {
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 350);
  };

  const select = (s: Suggestion) => {
    setQuery(s.display_name);
    setSuggestions([]);
    setIsOpen(false);
    onChange(s.display_name, parseFloat(s.lat), parseFloat(s.lon));
  };

  return (
    <div ref={containerRef} className="relative flex flex-col gap-1.5">
      <label className={cx("text-xs font-medium", dark ? "text-[#888]" : "text-sm text-secondary")}>
        {label}
        {isRequired && <span className="ml-0.5 text-error-primary">*</span>}
      </label>
      <div className="relative">
        <input
          type="text"
          value={query}
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(e.target.value, null, null);
            search(e.target.value);
          }}
          className={cx(
            "w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition duration-100 ease-linear",
            dark
              ? "bg-[#0E0E0E] text-white border-[#333] placeholder:text-neutral-600 focus:border-[rgb(255,210,0)] focus:ring-2 focus:ring-[rgb(255,210,0)]/20"
              : cx(
                  "bg-primary text-primary shadow-xs placeholder:text-placeholder",
                  "focus:border-brand focus:ring-2 focus:ring-brand/20",
                  isInvalid ? "border-error focus:ring-error/20" : "border-primary",
                ),
          )}
          aria-autocomplete="list"
          aria-expanded={isOpen}
          autoComplete="off"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="size-4 animate-spin rounded-full border-2 border-brand border-t-transparent" />
          </div>
        )}
      </div>
      {isOpen && suggestions.length > 0 && (
        <ul
          role="listbox"
          className={cx(
            "absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-auto rounded-lg border shadow-lg",
            dark
              ? "bg-[#181818] border-[#333]"
              : "bg-primary border-secondary_alt",
          )}
        >
          {suggestions.map((s, i) => (
            <li
              key={i}
              role="option"
              aria-selected={false}
              className={cx(
                "cursor-pointer px-3.5 py-2.5 text-sm transition duration-100 ease-linear",
                dark
                  ? "text-white hover:bg-[#252525]"
                  : "text-primary hover:bg-primary_hover",
              )}
              onMouseDown={() => select(s)}
            >
              {s.display_name}
            </li>
          ))}
        </ul>
      )}
      {hint && (
        <p className={cx("text-xs", isInvalid ? "text-error-primary" : dark ? "text-[#666]" : "text-tertiary")}>{hint}</p>
      )}
    </div>
  );
}
