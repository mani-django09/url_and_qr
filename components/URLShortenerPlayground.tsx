'use client'

import { useState, useRef } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Slider } from "../components/ui/slider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Wand2, Copy, Share2, Download } from 'lucide-react'
import { toast } from "../components/ui/use-toast"
import { QRCodeSVG } from 'qrcode.react'
import { motion, AnimatePresence } from 'framer-motion'

export function URLShortenerPlayground() {
  const [longUrl, setLongUrl] = useState('')
  const [customDomain, setCustomDomain] = useState('short.url')
  const [customAlias, setCustomAlias] = useState('')
  const [urlLength, setUrlLength] = useState(6)
  const [shortenedUrl, setShortenedUrl] = useState('')
  const [isShortening, setIsShortening] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const qrRef = useRef<SVGSVGElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsShortening(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)) // 1.5 second delay
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          urls: [longUrl], 
          customAlias, 
          customDomain 
        }),
      })

      if (!response.ok) throw new Error('Failed to shorten URL')
      
      const data = await response.json()
      setShortenedUrl(data.shortenedUrls[0])
      toast({
        title: "Success!",
        description: "Your URL has been shortened.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to shorten URL. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsShortening(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortenedUrl).then(() => {
      setIsCopied(true)
      toast({
        title: "Copied!",
        description: "URL copied to clipboard.",
      })
      setTimeout(() => setIsCopied(false), 2000)
    }).catch(() => {
      toast({
        title: "Error",
        description: "Failed to copy URL. Please try again.",
        variant: "destructive",
      })
    })
  }

  const shareUrl = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Shortened URL',
        text: 'Check out this shortened URL!',
        url: shortenedUrl,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      toast({
        title: "Share not supported",
        description: "Your browser doesn't support sharing. Please copy the URL manually.",
      })
    }
  }

  const downloadQR = () => {
    if (!qrRef.current) return
    const canvas = document.createElement("canvas")
    const svg = qrRef.current
    const svgData = new XMLSerializer().serializeToString(svg)
    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")
      ctx?.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL("image/png")
      const downloadLink = document.createElement("a")
      downloadLink.download = "qr-code.png"
      downloadLink.href = pngFile
      downloadLink.click()
    }
    img.src = "data:image/svg+xml;base64," + btoa(svgData)
  }

  return (
    <Card className="shadow-sm max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-purple-500" />
          Custom Domain URL Shortener
        </CardTitle>
        <CardDescription>
          Create short links using your own domain
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="longUrl">Enter a long URL</Label>
            <Input
              id="longUrl"
              placeholder="https://example.com/very-long-url"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customDomain">Custom domain</Label>
            <Input
              id="customDomain"
              placeholder="your-domain.com"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customAlias">Custom alias (optional)</Label>
            <Input
              id="customAlias"
              placeholder="my-custom-alias"
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Short URL length (if no custom alias)</Label>
            <Slider
              min={4}
              max={10}
              step={1}
              value={[urlLength]}
              onValueChange={(value) => setUrlLength(value[0])}
              className="my-4"
            />
            <div className="text-sm text-gray-500">{urlLength} characters</div>
          </div>

          <motion.div className="w-full">
            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800"
              disabled={isShortening}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isShortening ? (
                  <motion.div
                    key="shortening"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center"
                  >
                    <motion.div
                      className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full mr-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Generating...
                  </motion.div>
                ) : (
                  <motion.div
                    key="generate"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Generate Short URL
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </form>

        <AnimatePresence>
          {shortenedUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-6 p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Shortened URL:</span>
                <div className="flex gap-2">
                  <Button onClick={copyToClipboard} size="sm" variant="outline">
                    <Copy className="h-4 w-4 mr-2" />
                    {isCopied ? 'Copied!' : 'Copy'}
                  </Button>
                  <Button onClick={shareUrl} size="sm" variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
              <a href={shortenedUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                {shortenedUrl}
              </a>
              <div className="mt-4">
                <h4 className="font-medium mb-2">QR Code:</h4>
                <div className="flex justify-center">
                  <QRCodeSVG ref={qrRef} value={shortenedUrl} size={128} />
                </div>
                <div className="mt-2 flex justify-center">
                  <Button onClick={downloadQR} size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download QR Code
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

