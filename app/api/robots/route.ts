import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'robots.txt')
  const robotsContent = fs.readFileSync(filePath, 'utf8')

  return new NextResponse(robotsContent, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}

