'use client'

import { useState } from 'react'
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Copy, ExternalLink } from 'lucide-react'

interface FeaturedURL {
  original: string
  shortened: string
  description: string
}

const featuredUrls: FeaturedURL[] = [
  {
    original: "https://www.example.com/very-long-url-that-needs-shortening",
    shortened: "https://short.url/abc123",
    description: "Example of a basic shortened URL"
  },
  {
    original: "https://www.example.com/marketing-campaign-summer-2023",
    shortened: "https://short.url/summer23",
    description: "Custom alias for marketing campaign"
  },
  {
    original: "https://www.example.com/product-page-with-very-long-description",
    shortened: "https://short.url/newproduct",
    description: "Product page with branded short link"
  }
]

export function FeaturedURLs() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyToClipboard = (url: string, index: number) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedIndex(index)
      toast({
        title: "Copied!",
        description: "URL copied to clipboard.",
      })
      setTimeout(() => setCopiedIndex(null), 2000)
    }).catch((err) => {
      console.error('Failed to copy: ', err)
      toast({
        title: "Error",
        description: "Failed to copy URL. Please try again.",
        variant: "destructive",
      })
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Featured URLs</CardTitle>
        <CardDescription>Check out these example shortened URLs</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {featuredUrls.map((url, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-sm text-gray-600">{url.original}</p>
                  <a href={url.shortened} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {url.shortened}
                  </a>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => copyToClipboard(url.shortened, index)}>
                    {copiedIndex === index ? "Copied!" : <Copy className="h-4 w-4" />}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => window.open(url.shortened, '_blank', 'noopener,noreferrer')}>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-500">{url.description}</p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

