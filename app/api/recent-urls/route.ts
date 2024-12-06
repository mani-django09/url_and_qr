import { NextResponse } from 'next/server'

// This should be the same database used in the shorten API
declare global {
  var urlDatabase: Map<string, { originalUrl: string, clicks: number }>
}

if (!global.urlDatabase) {
  global.urlDatabase = new Map()
}

export async function GET() {
  const recentUrls = Array.from(global.urlDatabase.entries())
    .map(([id, data]) => ({
      id,
      originalUrl: data.originalUrl,
      shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/s/${id}`,
      clicks: data.clicks
    }))
    .slice(-10)
    .reverse() // Get last 10 entries, most recent first

  return NextResponse.json({ urls: recentUrls })
}

