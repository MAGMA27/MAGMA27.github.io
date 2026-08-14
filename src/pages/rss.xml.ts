import type { APIContext } from 'astro'
import { createRssResponse } from '@/utils/rss'
import { defaultLocale } from '@/i18n'

export async function GET(context: APIContext) {
  return createRssResponse(context, defaultLocale)
}
