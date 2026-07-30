/**
 * Footer
 * Quiet, minimal site footer. No admin/auth links — public site only.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  const columns = [
    {
      heading: "Read",
      links: [
        { label: "Home", href: "/" },
        { label: "Archive", href: "/archive" },
      ],
    },
    {
      heading: "Site",
      links: [
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      heading: "Follow",
      links: [
        { label: "RSS", href: "/rss" },
        { label: "Twitter / X", href: "https://twitter.com" },
      ],
    },
  ];

  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <a href="/" className="font-serif text-lg text-black">
              The Marginalia
            </a>
            <p className="mt-3 max-w-[20ch] text-sm leading-relaxed text-zinc-500">
              Notes and essays, published as they're finished.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.heading}>
              <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                {column.heading}
              </h4>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-zinc-600 transition-colors hover:text-black"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-zinc-100 pt-6 text-xs text-zinc-400 sm:flex-row sm:items-center">
          <span>© {year} The Marginalia. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="/privacy" className="hover:text-zinc-600">
              Privacy
            </a>
            <a href="/terms" className="hover:text-zinc-600">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
