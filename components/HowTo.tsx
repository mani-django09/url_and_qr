'use client'

import { motion } from "framer-motion"
import { Link2, Wand2, Zap, Share2 } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

const steps = [
  {
    number: "1",
    title: "Enter Your Long URL",
    description: "Paste the long URL you want to shorten into the input field.",
    icon: Link2,
    color: "bg-blue-500"
  },
  {
    number: "2",
    title: "Customize (Optional)",
    description: "Add a custom alias to create a memorable short link.",
    icon: Wand2,
    color: "bg-purple-500"
  },
  {
    number: "3",
    title: "Generate Short URL",
    description: "Click the 'Shorten URL' button to create your shortened link.",
    icon: Zap,
    color: "bg-amber-500"
  },
  {
    number: "4",
    title: "Copy and Share",
    description: "Copy your new short URL and share it across platforms.",
    icon: Share2,
    color: "bg-green-500"
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

export function HowTo() {
  return (
    <section className="my-16">
      <h2 className="text-3xl font-bold text-center mb-8">How to Use Our URL Shortener</h2>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <motion.div key={index} variants={cardVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className={`${step.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}

