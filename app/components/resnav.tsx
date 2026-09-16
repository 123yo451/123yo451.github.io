'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react'

const links = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/blog',
    label: 'Blog',
  },
]

export function ResponsiveNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="w-full px-4 text-black mb-6">
        <div className="mx-auto py-0 flex items-center justify-between">
          <button
            className={`${isOpen? "bg-gray-200":""} flex gap-2 hover:bg-gray-200 p-2 mx-[-0.5rem] text-neutral-600 rounded`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu size={24} />
            Menu
          </button>
        </div>
      </nav>

      <div className={`${isOpen? "w-80":"w-0"} fixed top-0 left-0 h-full bg-[var(--theme-main)] text-[var(--theme-contrast)] pt-8 z-40 transition-all duration-300 overflow-hidden`}>
        <div className="px-6 flex flex-col gap-4">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-md hover:text-[var(--theme-main)] hover:bg-[var(--theme-contrast)]/80 rounded px-3 py-2 w-60 transition duration-250"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className={`${isOpen? "w-screen":"w-0"} fixed top-0 left-0 h-screen z-20`} onClick={() => setIsOpen(false)} />
    </>
  );
}
