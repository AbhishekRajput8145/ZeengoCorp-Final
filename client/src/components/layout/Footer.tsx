
import { Link } from "wouter";

const QUICK_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Our Ventures", href: "/ventures" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Careers", href: "/careers" },
  { label: "Blogs", href: "/blogs" },
];

export function Footer() {
  return (
    <footer className="bg-black text-white relative">
      {/* Gradient top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6 hover:opacity-80 transition-opacity">
              <img
                src="/logo.png"
                alt="ZeengoCorp"
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              A venture builder and innovation studio. We fund, build, and scale high-impact ventures that change how we live and work.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: More */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-6">More</h4>
            <ul className="space-y-3">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-6">Connect</h4>
            <p className="text-gray-500 text-sm mb-4">
              Have an idea? Let's build something great together.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-black font-bold text-sm px-6 py-2.5 rounded-full hover:bg-gray-200 transition-all hover:scale-[1.03] active:scale-[0.97]"
            >
              Get in Touch
            </Link>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://www.linkedin.com/company/zeengocorp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors group"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/zeengocorp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors group"
                aria-label="X (Twitter)"
              >
                <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} ZeengoCorp Innovations Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">Privacy</Link>
            <Link href="/terms" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}