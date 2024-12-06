import type { Metadata } from 'next'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy - URL Shortener & QR Code Generator',
  description: 'Our commitment to protecting your privacy. Learn about how we collect, use, and safeguard your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">Privacy Policy</h1>
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <p className="mb-4">
            Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website.
          </p>
          <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
          <p className="mb-4">
            We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we're collecting it and how it will be used.
          </p>
          <h2 className="text-2xl font-semibold mb-2">Use of Information</h2>
          <p className="mb-4">
            We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we'll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.
          </p>
          <h2 className="text-2xl font-semibold mb-2">Sharing of Information</h2>
          <p className="mb-4">
            We don't share any personally identifying information publicly or with third-parties, except when required to by law.
          </p>
          <h2 className="text-2xl font-semibold mb-2">Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

