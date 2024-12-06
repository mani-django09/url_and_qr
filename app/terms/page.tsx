import type { Metadata } from 'next'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service - URL Shortener & QR Code Generator',
  description: 'Read our Terms of Service to understand the rules and regulations governing the use of our URL shortening and QR code generation services.',
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">Terms of Service</h1>
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <p className="mb-4">
            By using our URL Shortener and QR Code Generator service, you are agreeing to be bound by the following terms and conditions.
          </p>
          <h2 className="text-2xl font-semibold mb-2">Use of Service</h2>
          <p className="mb-4">
            You agree to use our service for lawful purposes only. You must not use this service to distribute spam, malware, or any form of illegal content.
          </p>
          <h2 className="text-2xl font-semibold mb-2">Content Responsibility</h2>
          <p className="mb-4">
            You are solely responsible for the content of the original URLs you shorten and the QR codes you generate. We reserve the right to disable any links or QR codes that we determine to be in violation of these terms.
          </p>
          <h2 className="text-2xl font-semibold mb-2">Service Availability</h2>
          <p className="mb-4">
            We strive to provide a reliable service, but we do not guarantee that our service will be available at all times. We reserve the right to modify, suspend, or discontinue the service at any time without notice.
          </p>
          <h2 className="text-2xl font-semibold mb-2">Limitation of Liability</h2>
          <p className="mb-4">
            We shall not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
          </p>
          <h2 className="text-2xl font-semibold mb-2">Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will always post the most current version on our site. By continuing to use our service after those revisions become effective, you agree to be bound by the revised terms.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

