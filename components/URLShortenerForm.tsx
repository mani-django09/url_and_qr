'use client'

import { useState, useRef } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { toast } from "../components/ui/use-toast"
import { Share2, Download, Copy, X, Plus } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { motion, AnimatePresence } from 'framer-motion'

interface ShortenedUrl {
  original: string;
  shortened: string;
}

export function URLShortenerForm() {
  const [singleUrl, setSingleUrl] = useState('')
  const [bulkUrls, setBulkUrls] = useState<string[]>([''])
  const [customAlias, setCustomAlias] = useState('')
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([])
  const [isShortening, setIsShortening] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const qrRefs = useRef<(SVGSVGElement | null)[]>([])

  const handleSubmit = async (e: React.FormEvent, isBulk: boolean) => {
    e.preventDefault()
    setIsShortening(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)) // 1.5 second delay
      const urls = isBulk ? bulkUrls.filter(url => url.trim() !== '') : [singleUrl]
      if (urls.length === 0) {
        throw new Error('No valid URLs provided')
      }
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls, customAlias: isBulk ? undefined : customAlias }),
      })

      if (!response.ok) throw new Error('Failed to shorten URLs')
      
      const data = await response.json()
      setShortenedUrls(urls.map((original: string, index: number) => ({
        original,
        shortened: data.shortenedUrls[index]
      })))
      toast({
        title: "Success!",
        description: `${urls.length} URL${urls.length > 1 ? 's' : ''} have been shortened.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to shorten URLs. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsShortening(false)
    }
  }

  const copyToClipboard = (url: string, index: number) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedIndex(index)
      toast({
        title: "Copied!",
        description: "URL copied to clipboard.",
      })
      setTimeout(() => setCopiedIndex(null), 2000)
    }).catch(() => {
      toast({
        title: "Error",
        description: "Failed to copy URL. Please try again.",
        variant: "destructive",
      })
    })
  }

  const shareUrl = (url: string) => {
    if (navigator.share) {
      navigator.share({
        title: 'Shortened URL',
        text: 'Check out this shortened URL!',
        url: url,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      toast({
        title: "Share not supported",
        description: "Your browser doesn't support sharing. Please copy the URL manually.",
      })
    }
  }

  const downloadQR = (index: number) => {
    const svg = qrRefs.current[index]
    if (!svg) return
    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL("image/png")
      const downloadLink = document.createElement("a")
      downloadLink.download = `qr-code-${index + 1}.png`
      downloadLink.href = pngFile
      downloadLink.click()
    }
    img.src = "data:image/svg+xml;base64," + btoa(svgData)
  }

  const addBulkUrl = () => {
    setBulkUrls([...bulkUrls, ''])
  }

  const removeBulkUrl = (index: number) => {
    setBulkUrls(bulkUrls.filter((_, i) => i !== index))
  }

  const updateBulkUrl = (index: number, value: string) => {
    const newBulkUrls = [...bulkUrls]
    newBulkUrls[index] = value
    setBulkUrls(newBulkUrls)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-8 min-h-[400px]">
      <Tabs defaultValue="single" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="single">Single URL</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Process</TabsTrigger>
        </TabsList>
        
        <TabsContent value="single">
          <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="singleUrl" className="text-base">Enter a URL to process</Label>
              <Input
                id="singleUrl"
                type="url"
                value={singleUrl}
                onChange={(e) => setSingleUrl(e.target.value)}
                placeholder="https://example.com"
                required
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customAlias">Custom alias (optional)</Label>
              <Input
                id="customAlias"
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
                placeholder="my-custom-alias"
                className="h-12 text-base"
              />
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
                      Shortening...
                    </motion.div>
                  ) : (
                    <motion.div
                      key="shorten"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Shorten URL
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </form>
        </TabsContent>
        
        <TabsContent value="bulk">
          <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-4">
            <div className="space-y-2">
              <Label>Enter URLs to process</Label>
              <AnimatePresence>
                {bulkUrls.map((url, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center space-x-2 mb-2"
                  >
                    <Input
                      type="url"
                      value={url}
                      onChange={(e) => updateBulkUrl(index, e.target.value)}
                      placeholder={`https://example${index + 1}.com`}
                      className="h-12 text-base"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeBulkUrl(index)}
                      disabled={bulkUrls.length === 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
              <Button type="button" variant="outline" onClick={addBulkUrl} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add URL
              </Button>
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
                      Shortening...
                    </motion.div>
                  ) : (
                    <motion.div
                      key="shorten"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Shorten URLs
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </form>
        </TabsContent>
      </Tabs>

      {shortenedUrls.length > 0 && (
        <motion.div
          className="mt-6 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold">Processed URLs:</h3>
          {shortenedUrls.map((url, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-gray-50 p-4 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium break-all">{url.shortened}</span>
                <div className="flex gap-2">
                  <Button onClick={() => copyToClipboard(url.shortened, index)} size="sm">
                    <Copy className="h-4 w-4 mr-2" />
                    {copiedIndex === index ? 'Copied!' : 'Copy'}
                  </Button>
                  <Button onClick={() => shareUrl(url.shortened)} size="sm" variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-2">Original: {url.original}</p>
              <div className="flex flex-col items-center">
                <QRCodeSVG ref={el => qrRefs.current[index] = el} value={url.shortened} size={128} />
                <Button onClick={() => downloadQR(index)} size="sm" className="mt-2">
                  <Download className="h-4 w-4 mr-2" />
                  Download QR Code
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

