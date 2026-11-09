"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, ButtonArrow } from "@/components/ui/Button";
import { Wordmark } from "@/components/brand/Wordmark";
import { socials, SocialLink } from "@/components/layout/SocialLinks";
import { nav } from "@/config/site";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";

const isActive = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

/** Sticky blur nav: wordmark, active-page marker, one CTA, full-screen mobile menu. */
export function Header() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const containTab = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== "Tab") return;
    const controls = event.currentTarget.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  // Close the mobile menu on navigation (state adjusted during render, not in an effect).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  // Native modal behavior contains focus, makes the page inert and handles Escape.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const desktop = window.matchMedia("(min-width: 48rem)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });
    root.style.overflow = "hidden";
    desktop.addEventListener("change", closeOnDesktop);
    closeOnDesktop();
    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      root.style.overflow = previousOverflow;
      dialog.close();
    };
  }, [open]);

  return (
    <header className="site-header sticky top-0 z-50">
      {/* Blur lives on a background layer: backdrop-filter on the header itself
          would become the containing block for the fixed mobile menu. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 border-b hairline bg-canvas/80 backdrop-blur-xl backdrop-saturate-150"
      />
      <Container className="site-header-row">
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
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-haspopup="dialog"
          aria-label="Open menu"
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
      </Container>

      <dialog ref={dialogRef} id="mobile-menu" className="mobile-menu" aria-labelledby="mobile-menu-title" onKeyDown={containTab} onClose={() => setOpen(false)}>
        <div className="mobile-menu-heading site-container">
          <h2 id="mobile-menu-title" className="text-eyebrow">Site navigation</h2>
          <button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="mobile-menu-close">
            <X size={20} aria-hidden />
          </button>
        </div>
          <nav aria-label="Mobile" className="mobile-menu-content site-container">
            <ul>
              {[...nav, { label: "Contact", href: "/contact" }].map((item, i) => (
                <li
                  key={item.href}
                  className="animate-fade-up border-b hairline"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <Link
                    href={item.href}
                    onNavigate={() => setOpen(false)}
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
              <Button href="/contact" size="lg" className="w-full" onNavigate={() => setOpen(false)}>
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
      </dialog>
    </header>
  );
}
