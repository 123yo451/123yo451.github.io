'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { navigationLinks, name } from '@/config'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const links = navigationLinks.map((link) => (
    <li key={link.href} className="min-w-0 max-w-full">
      <Link
        href={link.href}
        onClick={() => setIsOpen(false)}
        className="block rounded-sm py-3 break-words text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {link.label}
      </Link>
    </li>
  ))

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} asChild>
      <header
        className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 sm:grid-cols-[minmax(0,auto)_minmax(0,1fr)]"
        onKeyDown={(event) => {
          if (event.key === 'Escape' && isOpen) {
            setIsOpen(false)
            triggerRef.current?.focus()
          }
        }}
      >
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="min-w-0 max-w-full justify-self-start rounded-sm py-2 text-3xl font-medium tracking-tight break-words text-foreground transition-colors hover:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          {name}
        </Link>
        <nav aria-label="Main navigation" className="hidden min-w-0 sm:block font-mono">
          <ul className="flex flex-wrap justify-end gap-x-6 gap-y-1 text-sm">
            {links}
          </ul>
        </nav>
        <CollapsibleTrigger asChild>
          <Button
            ref={triggerRef}
            type="button"
            variant="ghost"
            size="icon"
            className="size-11 text-muted-foreground sm:hidden"
          >
            {isOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
            <span className="sr-only">
              {isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            </span>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="col-span-2 min-w-0 sm:hidden">
          <nav
            aria-label="Main navigation"
            className="-mx-1 mt-3 max-h-[60dvh] overflow-y-auto overscroll-contain px-1 pb-2 font-mono"
          >
            <ul className="text-sm">{links}</ul>
          </nav>
        </CollapsibleContent>
      </header>
    </Collapsible>
  )
}
