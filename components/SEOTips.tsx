'use client'

import { motion } from "framer-motion"
import { Search, BarChart2, Link, Globe } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

const tips = [
  {
    title: "Optimize Anchor Text",
    description: "Use descriptive, keyword-rich anchor text for your shortened URLs to improve relevance and click-through rates.",
    icon: Search,
    color: "bg-blue-500"
  },
  {
    title: "Track and Analyze",
    description: "Utilize our built-in analytics to monitor click-through rates and adjust your strategy for better SEO performance.",
    icon: BarChart2,
    color: "bg-green-500"
  },
  {
    title: "Consistent Branding",
    description: "Use custom domains for your short links to reinforce your brand and build trust with search engines and users.",
    icon: Link,
    color: "bg-purple-500"
  },
  {
    title: "Geo-Targeting",
    description: "Create location-specific short links to improve local SEO and provide a better user experience for regional audiences.",
    icon: Globe,
    color: "bg-amber-500"
  }
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
}

export function SEOTips() {
  return (
    <section className="my-16">
      <h2 className="text-3xl font-bold text-center mb-4">Boost Your SEO with Smart URL Shortening</h2>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
        Harness the power of shortened URLs to enhance your search engine optimization strategy. Follow these tips to improve your online visibility and drive more organic traffic.
      </p>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {tips.map((tip, index) => {
          const Icon = tip.icon
          return (
            <motion.div key={index} variants={cardVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className={`${tip.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
                  <p className="text-gray-600">{tip.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}

