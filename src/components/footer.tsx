import React from 'react';
import { cn } from '@/lib/utils';
import { Facebook, Linkedin, Twitter, Youtube, Instagram } from 'lucide-react';

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn('bg-black text-white', className)}>
      {/* Social Links */}
      <div className="flex justify-center gap-6 border-t border-white/10 py-8">
        <a
          href="#"
          className="text-white/50 transition-colors hover:text-white"
          aria-label="Facebook"
        >
          <Facebook className="h-5 w-5" />
        </a>
        <a
          href="#"
          className="text-white/50 transition-colors hover:text-white"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-5 w-5" />
        </a>
        <a
          href="#"
          className="text-white/50 transition-colors hover:text-white"
          aria-label="Twitter"
        >
          <Twitter className="h-5 w-5" />
        </a>
        <a
          href="#"
          className="text-white/50 transition-colors hover:text-white"
          aria-label="YouTube"
        >
          <Youtube className="h-5 w-5" />
        </a>
        <a
          href="#"
          className="text-white/50 transition-colors hover:text-white"
          aria-label="TikTok"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
          </svg>
        </a>
        <a
          href="#"
          className="text-white/50 transition-colors hover:text-white"
          aria-label="Instagram"
        >
          <Instagram className="h-5 w-5" />
        </a>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          {/* Logo Section */}
          <div className="md:col-span-1">
            <h2 className="mb-4 text-2xl font-bold">ALEC</h2>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="mb-4 text-xs font-medium uppercase tracking-widest text-white/60">
              About
            </h3>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-medium uppercase tracking-widest text-white/60">
              Blogs
            </h3>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-medium uppercase tracking-widest text-white/60">
              Vlogs
            </h3>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-medium uppercase tracking-widest text-white/60">
              Contact
            </h3>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-white/10 pt-8 md:flex-row">
          <div className="mb-4 text-sm text-white/40 md:mb-0">
            © {currentYear} Flouix Template. All right reserved.
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm">
            <a href="#" className="text-white/40 hover:text-white">
              STYLE GUIDE
            </a>
            <a href="#" className="text-white/40 hover:text-white">
              INSTRUCTIONS
            </a>
            <a href="#" className="text-white/40 hover:text-white">
              COMPONENTS
            </a>
            <a href="#" className="text-white/40 hover:text-white">
              CHANGELOG
            </a>
            <a href="#" className="text-white/40 hover:text-white">
              LICENSES
            </a>
          </div>

          <div className="mt-4 flex items-center gap-6 text-xs text-white/30 md:mt-0">
            <span>PRIVACY POLICY</span>
            <span>TERMS OF SERVICE</span>
            <span>404</span>
            <span>PASSWORD</span>
          </div>
        </div>

        {/* Credits */}
        <div className="mt-8 flex flex-col items-center justify-between text-xs text-white/30 md:flex-row">
          <div>CREATED BY FLOUIX</div>
          <div>POWERED BY WEBFLOW</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;