import type { APIContext } from 'astro'
import { createRssResponse } from '@/utils/rss'

export async function GET(context: APIContext) {
  return createRssResponse(context, 'en')
}
