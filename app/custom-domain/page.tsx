import type { Metadata } from 'next'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { URLShortenerPlayground } from '../../components/URLShortenerPlayground'
import { About } from '../../components/About'
import { FAQ } from '../../components/FAQ'
import { HowTo } from '../../components/HowTo'

export const metadata: Metadata = {
  title: 'Custom Domain URL Shortener - Create Branded Short Links',
  description: 'Create short links using your own custom domains. Experiment with our URL shortener to create branded, memorable links for your content.',
  keywords: 'custom domain, URL shortener, branded links, short URL generator',
}

export default function CustomDomainPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
          Custom Domain URL Shortener
        </h1>
        <div className="mb-12">
          <URLShortenerPlayground />
        </div>
        <HowTo />
        <About />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

