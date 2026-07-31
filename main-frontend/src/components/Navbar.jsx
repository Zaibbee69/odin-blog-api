import { useState, useEffect } from "react";
import { Link } from "react-router";

/**
 * Navbar
 * Minimal editorial site header. Sticky, collapses to a simple
 * hamburger menu on mobile. No auth/admin controls — this is the
 * public reading surface only.
 */
export default function Navbar({ currentUser = null, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Archive", to: "/archive" },
    { label: "About", to: "/about" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur border-zinc-200"
          : "bg-white border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        {/* Logo / wordmark */}
        <Link to="/" className="font-serif text-xl tracking-tight text-black">
          The Marginalia
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-sm text-zinc-600 transition-colors hover:text-black"
            >
              {link.label}
            </Link>
          ))}
          {currentUser ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-zinc-600">{currentUser.email}</span>
              <button
                type="button"
                onClick={onLogout}
                className="rounded-full border border-zinc-900 px-4 py-1.5 text-sm text-black transition-colors hover:bg-black hover:text-white"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-full border border-zinc-900 px-4 py-1.5 text-sm text-black transition-colors hover:bg-black hover:text-white"
            >
              Sign in
            </Link>
          )}
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className="flex h-9 w-9 items-center justify-center rounded-full text-black md:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-px w-5 bg-black transition-transform duration-200 ${
                isMenuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-px w-5 bg-black transition-opacity duration-200 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-px w-5 bg-black transition-transform duration-200 ${
                isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`overflow-hidden border-t border-zinc-200 bg-white transition-[max-height] duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "max-h-64" : "max-h-0 border-t-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-md px-2 py-3 text-base text-zinc-700 hover:bg-zinc-50 hover:text-black"
            >
              {link.label}
            </Link>
          ))}
          {currentUser ? (
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                onLogout?.();
              }}
              className="mt-2 rounded-full border border-zinc-900 px-4 py-2 text-center text-base text-black"
            >
              Sign out ({currentUser.email})
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 rounded-full border border-zinc-900 px-4 py-2 text-center text-base text-black"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
