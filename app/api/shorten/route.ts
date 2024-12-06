import { NextResponse } from 'next/server'
import { nanoid } from 'nanoid'

// This is a mock database. In a real application, you'd use a proper database.
let urlDatabase = new Map<string, { originalUrl: string, clicks: number }>()

export async function POST(req: Request) {
  const { urls, customAlias, customDomain } = await req.json()

  if (!Array.isArray(urls) || urls.length === 0) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  const shortenedUrls = urls.map((url: string) => {
    const id = customAlias || nanoid(7) // Use custom alias if provided, otherwise generate a short code
    const domain = customDomain || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const shortUrl = `${domain}/s/${id}`
    
    // Store the mapping in our mock database
    urlDatabase.set(id, { originalUrl: url, clicks: 0 })

    return shortUrl
  })

  return NextResponse.json({ shortenedUrls })
}

