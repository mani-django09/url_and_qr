'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          URLShortener
        </Link>
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <li><Button variant="ghost" asChild><Link href="/">Home</Link></Button></li>
            <li><Button variant="ghost" asChild><Link href="/qr-generator">QR Generator</Link></Button></li>
            <li><Button variant="ghost" asChild><Link href="/custom-domain">Custom Domain</Link></Button></li>
          </ul>
        </nav>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <ul className="flex flex-col items-center space-y-2 py-4">
              <li><Button variant="ghost" asChild><Link href="/">Home</Link></Button></li>
              <li><Button variant="ghost" asChild><Link href="/about">About</Link></Button></li>
              <li><Button variant="ghost" asChild><Link href="/qr-generator">QR Generator</Link></Button></li>
              <li><Button variant="ghost" asChild><Link href="/custom-domain">Custom Domain</Link></Button></li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

