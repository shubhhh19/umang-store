// src/app/api/revalidate/route.ts
// ──────────────────────────────────────────────────────────────────────────────
// Sanity webhook endpoint – called by Sanity whenever a product is
// created / updated / deleted.  Revalidates all pages tagged 'products' so
// the live site reflects the change without a full redeploy.
//
// Setup in Sanity dashboard:
//   API → Webhooks → Add Webhook
//   URL: https://<your-domain>/api/revalidate
//   Dataset: umang123   Filter: _type == "product"
//   HTTP Method: POST
//   Secret: set a random string → add as SANITY_WEBHOOK_SECRET in env

import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET

export async function POST(request: Request) {
  const secret = request.headers.get('sanity-webhook-secret')

  if (WEBHOOK_SECRET && secret !== WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    revalidateTag('products', '')
    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating', err },
      { status: 500 }
    )
  }
}
