import type { APIContext } from 'astro'
import rss from '@astrojs/rss'
import { site } from '@/config.json'
import { getSortedPosts } from '@/utils/content'
import { getContentSlug, localeHtmlLang, localePath, t, type Locale } from '@/i18n'

export async function createRssResponse(context: APIContext, locale: Locale) {
  const sortedPosts = await getSortedPosts(locale)

  return rss({
    title: `${site.title} · ${t(locale, 'languageName')}`,
    description: site.description,
    site: context.site!,
    items: sortedPosts.map((post) => ({
      link: localePath(locale, `/posts/${getContentSlug(post)}`),
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.summary,
    })),
    customData: `<language>${localeHtmlLang[locale]}</language>`,
  })
}
