'use client'

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function AboutQR() {
  return (
    <section className="my-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">What's the Deal with Our QR Code Generator?</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center text-lg">
              Hey there! We're all about making QR codes simple, fun, and totally useful. Whether you're a tech whiz or just getting started, our tool is designed to make your life easier. From sharing your website to showcasing your menu, we've got you covered with QR codes that work like a charm.
            </CardDescription>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">What We're All About</h3>
                <p>We're on a mission to make QR codes accessible to everyone. No tech degree required! We believe in giving you the power to connect the physical world with the digital one, one square code at a time.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Why Pick Us for Your QR Needs?</h3>
                <ul className="list-disc list-inside">
                  <li>Super easy to use (seriously, it's a breeze)</li>
                  <li>Tons of customization options</li>
                  <li>Top-notch QR codes that actually work</li>
                  <li>Lightning-fast generation</li>
                  <li>100% free - no hidden costs!</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}

