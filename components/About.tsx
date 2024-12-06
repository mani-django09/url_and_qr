'use client'

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function About() {
  return (
    <section className="mb-16">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">About Our URL Shortener</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-center mb-8">
            Our URL Shortener is a powerful tool designed to make long, complex URLs more manageable and shareable. By creating concise, customizable short links, we help you streamline your online communication and track engagement with your content.
          </CardDescription>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To simplify link sharing and enhance digital marketing efforts by providing a reliable, feature-rich URL shortening service that meets the needs of individuals and businesses alike.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Why Choose Our URL Shortener</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Lightning-fast link creation</li>
                <li>• Custom alias options</li>
                <li>• Comprehensive click analytics</li>
                <li>• Secure and reliable service</li>
                <li>• User-friendly interface</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

