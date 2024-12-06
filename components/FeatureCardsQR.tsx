'use client'

import { motion } from "framer-motion"
import { QrCode, Palette, Download, Share2 } from 'lucide-react'

const features = [
  {
    title: "Make It Your Own",
    description: "Add some pizzazz to your QR codes! Change colors, toss in your logo, or play with patterns. Stand out from the crowd!",
    icon: <QrCode className="w-8 h-8 text-blue-600" />
  },
  {
    title: "QR Codes for Everything",
    description: "Websites, plain text, your contact info - you name it, we QR code it. One tool for all your QR needs!",
    icon: <Palette className="w-8 h-8 text-blue-600" />
  },
  {
    title: "Crystal Clear Codes",
    description: "Our QR codes look sharp whether they're on a business card or a billboard. High-quality images that won't let you down.",
    icon: <Download className="w-8 h-8 text-blue-600" />
  },
  {
    title: "Share in a Snap",
    description: "Email it, post it on social media, or stick it on your website. Sharing your QR code is as easy as pie!",
    icon: <Share2 className="w-8 h-8 text-blue-600" />
  }
]

export function FeatureCardsQR() {
  return (
    <section className="my-16 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Why Our QR Code Maker Rocks</h2>
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-start space-x-4"
          >
            <div className="flex-shrink-0 mt-1">
              {feature.icon}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

