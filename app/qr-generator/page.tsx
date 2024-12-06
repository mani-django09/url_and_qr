import type { Metadata } from 'next'
import { QRCodeGenerator } from '../../components/QRCodeGenerator'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { HowToQR } from '../../components/HowToQR'
import { FeatureCardsQR } from '../../components/FeatureCardsQR'
import { AboutQR } from '../../components/AboutQR'
import { FAQ } from '../../components/FAQ'

export const metadata: Metadata = {
  title: 'Create Your Own QR Codes - Quick and Easy',
  description: 'Turn your links, text, or contact info into QR codes in seconds. Perfect for marketing, events, or just for fun!',
  keywords: 'QR code maker, custom QR codes, free QR generator, easy QR codes',
}

export default function QRCodeGeneratorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
          Create Your Own QR Codes
        </h1>
        
        <QRCodeGenerator />
        
        <HowToQR />
        <FeatureCardsQR />
        <AboutQR />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

