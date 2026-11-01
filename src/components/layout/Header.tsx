"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, ButtonArrow } from "@/components/ui/Button";
import { Wordmark } from "@/components/brand/Wordmark";
import { socials, SocialLink } from "@/components/layout/SocialLinks";
import { nav } from "@/config/site";
import { cn } from "@/lib/cn";

const isActive = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

/** Sticky blur nav: wordmark, active-page marker, one CTA, full-screen mobile menu. */
export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu on navigation (state adjusted during render, not in an effect).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  // Lock page scroll and allow Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      {/* Blur lives on a background layer: backdrop-filter on the header itself
          would become the containing block for the fixed mobile menu. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 border-b hairline bg-canvas/80 backdrop-blur-xl backdrop-saturate-150"
      />
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight text-ink">
          <Wordmark />
          <span className="sr-only"> — home</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                  active ? "bg-ink text-canvas" : "text-ink-muted hover:bg-sunken hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Button href="/contact" aria-current={pathname === "/contact" ? "page" : undefined}>
            Start a project
            <ButtonArrow />
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative inline-flex size-11 items-center justify-center rounded-full bg-ink text-canvas md:hidden"
        >
          <span
            aria-hidden
            className={cn(
              "absolute h-0.5 w-4.5 rounded-full bg-current transition-transform duration-300",
              open ? "rotate-45" : "-translate-y-1",
            )}
          />
          <span
            aria-hidden
            className={cn(
              "absolute h-0.5 w-4.5 rounded-full bg-current transition-transform duration-300",
              open ? "-rotate-45" : "translate-y-1",
            )}
          />
        </button>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto border-t hairline bg-canvas md:hidden"
        >
          <nav aria-label="Mobile" className="flex min-h-full flex-col px-5 pt-6 pb-10">
            <ul>
              {[...nav, { label: "Contact", href: "/contact" }].map((item, i) => (
                <li
                  key={item.href}
                  className="animate-fade-up border-b hairline"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between py-4 text-display text-4xl",
                      isActive(pathname, item.href) ? "text-flame-deep" : "text-ink",
                    )}
                  >
                    {item.label}
                    <span aria-hidden className="text-2xl text-ink-faint">
                      ↗
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-10">
              <Button href="/contact" size="lg" className="w-full">
                Start a project
                <ButtonArrow />
              </Button>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                {socials.map((social) => (
                  <SocialLink key={social.label} {...social} />
                ))}
              </div>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
