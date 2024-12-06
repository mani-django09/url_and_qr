import type { Metadata } from 'next'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'

export const metadata: Metadata = {
  title: 'About Us - URL Shortener & QR Code Generator',
  description: 'Learn about our mission to simplify link sharing and QR code generation. Discover the team behind our powerful and user-friendly tools.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">About Us</h1>
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <p className="mb-4">
            Welcome to our URL Shortener and QR Code Generator service. We are dedicated to providing simple, efficient, and powerful tools for managing and sharing links in the digital age.
          </p>
          <p className="mb-4">
            Our team of passionate developers and designers work tirelessly to ensure that our platform remains at the cutting edge of technology, offering you the best possible experience in link shortening and QR code generation.
          </p>
          <p className="mb-4">
            We believe in the power of concise, shareable links and the versatility of QR codes in bridging the gap between physical and digital worlds. Our mission is to empower individuals and businesses alike with tools that enhance their online presence and streamline their marketing efforts.
          </p>
          <p>
            Thank you for choosing our service. We're committed to continually improving and expanding our offerings to meet your needs in an ever-evolving digital landscape.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

