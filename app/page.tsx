import type { Metadata } from 'next'
import { URLShortenerForm } from '../components/URLShortenerForm'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { HowTo } from '../components/HowTo'
import { FeatureCards } from '../components/FeatureCards'
import { About } from '../components/About'
import { FAQ } from '../components/FAQ'
import { BarChart2, Globe, Link, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: 'URL Shortener - Create Short Links Instantly',
  description: 'Shorten your long URLs quickly and easily. Track clicks, customize your links, and boost your online presence with our powerful URL shortener.',
  keywords: 'URL shortener, link shortener, short URL, custom links, link tracking, SEO improvement',
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
          URL Shortener
        </h1>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div>
            <URLShortenerForm />
          </div>
          <div className="bg-gradient-to-br from-teal-900 to-blue-900 rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">The Original URL Shortener</h2>
            <p className="text-base mb-12">Want more out of your link shortener? Track link analytics, use branded domains for fully custom links, and manage your links with our Free plans.</p>

            <h3 className="text-xl font-semibold mb-4">TinyURL plans include:</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <BarChart2 className="h-6 w-6" />
                <span className="text-base">Detailed Link Analytics</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-6 w-6" />
                <span className="text-base">Fully Branded Domains</span>
              </div>
              <div className="flex items-center gap-3">
                <Link className="h-6 w-6" />
                <span className="text-base">Bulk Short URLs</span>
              </div>
              <div className="flex items-center gap-3">
                <Settings className="h-6 w-6" />
                <span className="text-base">Link Management Features</span>
              </div>
            </div>
          </div>
        </div>

        <HowTo />
        <FeatureCards />
        <About />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

