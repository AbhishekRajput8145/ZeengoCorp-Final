import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "About", href: "/about" },
  { label: "Ventures", href: "/ventures" },
  { label: "Services", href: "/services" },
  { label: "Blogs", href: "/blogs" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkIsMobile = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-black/60 backdrop-blur-md border-b border-white/5"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="block hover:opacity-80 transition-opacity"
          >
            <img
              src="/logo.png"
              alt="ZeengoCorp"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium py-2 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white/50 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}

            {/* Desktop CTA Button */}
            <Button
              asChild
              className="bg-white text-black hover:bg-[#e0e0e0] font-bold rounded-full px-6 transition-all hover:scale-[1.03] active:scale-[0.97]"
            >
              <Link href="/contact">Connect Now</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:bg-white/10"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-black/95 backdrop-blur-xl fixed left-0 right-0 top-20 h-[calc(100vh-5rem)] overflow-y-auto p-6 border-t border-white/10"
            >
              <div className="space-y-2">
                {NAV_ITEMS.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className="block text-gray-300 hover:text-white transition-colors text-lg font-medium p-3 rounded-lg hover:bg-white/5"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: NAV_ITEMS.length * 0.05, duration: 0.3 }}
                >
                  <Button
                    asChild
                    className="w-full bg-white text-black hover:bg-gray-100 font-bold mt-4 rounded-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href="/contact">Connect Now</Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}