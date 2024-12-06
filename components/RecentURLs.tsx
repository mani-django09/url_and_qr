'use client'

import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ExternalLink, BarChart2, Copy, RefreshCw } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"
import { motion, AnimatePresence } from "framer-motion"

interface ShortenedURL {
  id: string
  originalUrl: string
  shortUrl: string
  clicks: number
}

export function RecentURLs() {
  const [recentUrls, setRecentUrls] = useState<ShortenedURL[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchRecentUrls = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/recent-urls')
      if (!response.ok) {
        throw new Error('Failed to fetch recent URLs')
      }
      const data = await response.json()
      setRecentUrls(data.urls)
    } catch (error) {
      console.error('Error fetching recent URLs:', error)
      toast({
        title: "Error",
        description: "Failed to load recent URLs.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchRecentUrls()
  }, [])

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Copied!",
        description: "URL copied to clipboard.",
      })
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
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold">Recent URLs</h2>
        <Button variant="outline" size="sm" onClick={fetchRecentUrls} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Original URL</TableHead>
              <TableHead>Short URL</TableHead>
              <TableHead>Clicks</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {recentUrls.map((url) => (
                <motion.tr
                  key={url.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <TableCell className="font-medium truncate max-w-xs">{url.originalUrl}</TableCell>
                  <TableCell>
                    <a
                      href={url.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {url.shortUrl}
                    </a>
                  </TableCell>
                  <TableCell>{url.clicks}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => copyToClipboard(url.shortUrl)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => window.open(url.shortUrl, '_blank', 'noopener,noreferrer')}>
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => window.open(`/analytics/${url.id}`, '_blank', 'noopener,noreferrer')}>
                        <BarChart2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

