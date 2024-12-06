'use client'

import { useState, useRef, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"
import { Download, RefreshCw, Wand2, Copy } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"

export function QRCodeGenerator() {
  const [content, setContent] = useState('')
  const [qrSize, setQrSize] = useState(256)
  const [qrColor, setQrColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [qrType, setQrType] = useState('url')
  const [logo, setLogo] = useState<string | null>(null)
  const [isDownloading, setIsDownloading] = useState(false) // Added loading state
  const qrRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    // Generate a random content for demonstration
    const demoContent = {
      url: 'https://example.com/welcome',
      text: 'Welcome to our QR Code Generator!',
      email: 'hello@example.com',
      phone: '+1234567890'
    }
    setContent(demoContent[qrType as keyof typeof demoContent])
  }, [qrType])

  const handleDownload = () => {
    if (!qrRef.current) return
    setIsDownloading(true)
    setTimeout(() => {
      const canvas = document.createElement('canvas')
      canvas.width = qrSize
      canvas.height = qrSize
      const ctx = canvas.getContext('2d')
      const img = new Image()
      img.onload = () => {
        ctx?.drawImage(img, 0, 0)
        const pngFile = canvas.toDataURL('image/png')
        const downloadLink = document.createElement('a')
        downloadLink.download = 'qrcode.png'
        downloadLink.href = pngFile
        downloadLink.click()
        setIsDownloading(false)
      }
      const svgData = new XMLSerializer().serializeToString(qrRef.current)
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
    }, 2000) // 2 second delay
  }

  const regenerateQR = () => {
    const demoContent = {
      url: ['https://example.com/product', 'https://example.com/sale', 'https://example.com/about'],
      text: ['Welcome to our store!', 'Scan for a special offer', 'Join our mailing list'],
      email: ['info@example.com', 'support@example.com', 'sales@example.com'],
      phone: ['+1234567890', '+0987654321', '+1122334455']
    }
    setContent(demoContent[qrType as keyof typeof demoContent][Math.floor(Math.random() * 3)])
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content).then(() => {
      toast({
        title: "Copied!",
        description: "Content copied to clipboard.",
      })
    }).catch(() => {
      toast({
        title: "Error",
        description: "Failed to copy content. Please try again.",
        variant: "destructive",
      })
    })
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setLogo(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto mb-8">
      <CardHeader>
        <CardTitle>Generate Your QR Code</CardTitle>
        <CardDescription>Customize and create your own QR code in seconds!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Tabs defaultValue="url" onValueChange={(value) => setQrType(value)}>
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                <TabsTrigger value="url">URL</TabsTrigger>
                <TabsTrigger value="text">Text</TabsTrigger>
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="phone">Phone</TabsTrigger>
              </TabsList>
              <TabsContent value="url">
                <Input
                  type="url"
                  placeholder="https://example.com"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </TabsContent>
              <TabsContent value="text">
                <Input
                  type="text"
                  placeholder="Enter your text here"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </TabsContent>
              <TabsContent value="email">
                <Input
                  type="email"
                  placeholder="email@example.com"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </TabsContent>
              <TabsContent value="phone">
                <Input
                  type="tel"
                  placeholder="+1234567890"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </TabsContent>
            </Tabs>

            <div className="flex space-x-2">
              <Button onClick={regenerateQR} size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Regenerate
              </Button>
              <Button onClick={copyToClipboard} size="sm">
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="qr-size">QR Code Size</Label>
              <Slider
                id="qr-size"
                min={128}
                max={512}
                step={8}
                value={[qrSize]}
                onValueChange={(value) => setQrSize(value[0])}
              />
              <div className="text-sm text-gray-500">{qrSize}px</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="qr-color">QR Code Color</Label>
                <Input
                  id="qr-color"
                  type="color"
                  value={qrColor}
                  onChange={(e) => setQrColor(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bg-color">Background Color</Label>
                <Input
                  id="bg-color"
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo">Add Logo (optional)</Label>
              <Input
                id="logo"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={content + qrSize + qrColor + bgColor + (logo || '')}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <QRCodeSVG
                  ref={qrRef}
                  value={content}
                  size={qrSize}
                  fgColor={qrColor}
                  bgColor={bgColor}
                  level="M"
                  includeMargin
                  imageSettings={logo ? {
                    src: logo,
                    x: undefined,
                    y: undefined,
                    height: qrSize * 0.25,
                    width: qrSize * 0.25,
                    excavate: true,
                  } : undefined}
                />
              </motion.div>
            </AnimatePresence>
            <motion.div className="w-full">
              <Button
                onClick={handleDownload}
                className="w-full"
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <motion.div
                    className="flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full mr-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Preparing Download...
                  </motion.div>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Download QR Code
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

