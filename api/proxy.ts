import type { VercelRequest, VercelResponse } from '@vercel/node'

const BACKEND_URL = 'http://api.fotiha.uz:8000'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // req.url comes as /api/proxy?path=... or the original path is in the query
  // With rewrite "/api/:path*" -> "/api/proxy", the original path segments
  // are available via req.query.path
  const pathSegments = req.query.path
  const path = Array.isArray(pathSegments)
    ? '/' + pathSegments.join('/')
    : pathSegments
      ? '/' + pathSegments
      : '/'

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  // Forward authorization header
  if (req.headers.authorization) {
    headers['authorization'] = req.headers.authorization
  }

  try {
    const response = await fetch(`${BACKEND_URL}${path}`, {
      method: req.method || 'GET',
      headers,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    })

    const data = await response.text()

    res.status(response.status)
    res.setHeader('Content-Type', response.headers.get('content-type') || 'application/json')
    res.send(data)
  } catch (error) {
    console.error('Proxy error:', error)
    res.status(502).json({ detail: 'Backend unavailable' })
  }
}
