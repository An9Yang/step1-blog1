import React, { useState } from 'react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { Facebook, Linkedin, Youtube, Instagram } from 'lucide-react';

type SocialLink = {
  label: string;
  href: string;
  renderIcon: (className: string) => React.ReactNode;
};

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Facebook',
    href: '#',
    renderIcon: (className) => <Facebook className={className} />,
  },
  {
    label: 'LinkedIn',
    href: '#',
    renderIcon: (className) => <Linkedin className={className} />,
  },
  {
    label: 'X',
    href: '#',
    renderIcon: (className) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    renderIcon: (className) => <Youtube className={className} />,
  },
  {
    label: 'TikTok',
    href: '#',
    renderIcon: (className) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    renderIcon: (className) => <Instagram className={className} />,
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="relative bg-black min-h-screen">
      {/* Navigation */}
      <Navigation />

      {/* Contact Section */}
      <section className="relative flex min-h-screen flex-col justify-center bg-gradient-to-b from-white/[0.03] via-black to-black">
        <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-12 px-6 py-24 md:px-12 lg:px-16">
          <div className="flex justify-center text-white/50">
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="transition-colors hover:text-white"
                >
                  {item.renderIcon('h-5 w-5')}
                </a>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <h1 className="text-center text-[60px] font-semibold leading-[1.02] text-white tracking-[-0.02em] md:text-[72px] lg:text-[78px]">
              Follow Me <span className="mx-3 text-white/28">—</span> Get in Touch
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="mx-auto w-full max-w-[650px] space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-3xl border border-white/10 bg-transparent px-6 py-4 text-sm text-white placeholder:text-white/40 transition-colors focus:border-white/25 focus:outline-none"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-3xl border border-white/10 bg-transparent px-6 py-4 text-sm text-white placeholder:text-white/40 transition-colors focus:border-white/25 focus:outline-none"
                required
              />
            </div>

            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className="w-full resize-none rounded-3xl border border-white/10 bg-transparent px-6 py-4 text-sm text-white placeholder:text-white/40 transition-colors focus:border-white/25 focus:outline-none"
              required
            />

            <div className="flex justify-start pt-2">
              <button
                type="submit"
                className="rounded-full bg-white px-8 py-2.5 text-xs font-semibold uppercase tracking-widest text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/95"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
