import { NextResponse } from 'next/server'

// This should be the same database used in the shorten API
let urlDatabase = new Map<string, { originalUrl: string, clicks: number }>()

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id

  if (urlDatabase.has(id)) {
    const { originalUrl, clicks } = urlDatabase.get(id)!
    urlDatabase.set(id, { originalUrl, clicks: clicks + 1 }) // Increment click count
    return NextResponse.redirect(originalUrl)
  } else {
    return NextResponse.redirect('/') // Redirect to homepage if URL not found
  }
}

