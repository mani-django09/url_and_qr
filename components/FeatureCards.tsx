'use client'

import { motion } from "framer-motion"
import { BarChart3, Link, Globe, Zap } from 'lucide-react'

const features = [
  {
    icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
    title: "Detailed Link Analytics",
    description: "Track link analytics, use branded domains for fully custom links, and manage your links with our paid plans."
  },
  {
    icon: <Link className="w-6 h-6 text-blue-600" />,
    title: "Bulk Short URLs",
    description: "Create multiple short URLs at once with our bulk link shortener tool."
  },
  {
    icon: <Globe className="w-6 h-6 text-blue-600" />,
    title: "Fully Branded Domains",
    description: "Use your own domain name for your short links to increase brand recognition and customer trust."
  },
  {
    icon: <Zap className="w-6 h-6 text-blue-600" />,
    title: "Link Management Features",
    description: "Manage, track, and optimize your links with our comprehensive link management features."
  }
]

export function FeatureCards() {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-center mb-8">URL Shortener Features</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-start gap-4 bg-white rounded-lg p-6 shadow-sm"
          >
            <div className="flex-shrink-0">
              {feature.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-blue-600">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

