'use client'

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const steps = [
  {
    title: "Enter Your Content",
    description: "Paste in your website link, type some text, or add your contact details. Whatever you want to share, pop it in!"
  },
  {
    title: "Customize Your Code",
    description: "Make it pop! Choose colors, adjust the size, or add a logo. Your QR code, your style."
  },
  {
    title: "Preview Your Creation",
    description: "Take a look at your masterpiece. Scan it with your phone to make sure it works perfectly."
  },
  {
    title: "Save and Share",
    description: "Happy with it? Great! Download your QR code and share it with the world. Print it, post it, or send it to friends."
  }
]

export function HowToQR() {
  return (
    <section className="my-16">
      <h2 className="text-3xl font-bold text-center mb-8">How to Make Your QR Code in 4 Easy Steps</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-center">
                  <span className="text-4xl font-bold text-blue-500">{index + 1}</span>
                  <br />
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">{step.description}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

