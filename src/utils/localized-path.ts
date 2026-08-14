import { getCollection } from 'astro:content'
import appConfig from '@/config.json'
import { defaultLocale, getContentSlug, localePath, normalizeLocale, type Locale } from '@/i18n'
import { getAllCategories, getAllTags, getSortedPosts } from './content'

const sharedPaths = new Set([
  '/',
  '/archives',
  '/tags',
  '/about',
  '/projects',
  '/friends',
  '/rss.xml',
])

function withoutLocale(pathname: string) {
  try {
    return decodeURIComponent(localePath(defaultLocale, pathname)).replace(/\/$/, '') || '/'
  } catch {
    return localePath(defaultLocale, pathname).replace(/\/$/, '') || '/'
  }
}

function isPublishedPost(entry: { data: { draft?: boolean } }) {
  return !import.meta.env.PROD || entry.data.draft !== true
}

export async function getLocalizedPath(
  pathname: string,
  currentLocale: Locale | string,
  targetLocale: Locale | string,
) {
  const current = normalizeLocale(currentLocale)
  const target = normalizeLocale(targetLocale)
  const path = withoutLocale(pathname)

  if (sharedPaths.has(path)) {
    return localePath(target, path)
  }

  const pageMatch = path.match(/^\/page\/(\d+)$/)
  if (pageMatch) {
    const page = Number(pageMatch[1])
    const targetPosts = await getSortedPosts(target)
    const targetTotal = Math.ceil(targetPosts.length / appConfig.posts.perPage)
    return page <= targetTotal ? localePath(target, path) : localePath(target, '/')
  }

  const postMatch = path.match(/^\/posts\/(.+)$/)
  if (postMatch) {
    const posts = await getCollection(
      'posts',
      ({ data }) => data.locale === current && isPublishedPost({ data }),
    )
    const currentPost = posts.find((post) => getContentSlug(post) === postMatch[1])
    const translationKey = currentPost?.data.translationKey

    if (translationKey) {
      const translatedPosts = await getCollection('posts', ({ data }) => {
        return (
          data.locale === target &&
          data.translationKey === translationKey &&
          isPublishedPost({ data })
        )
      })
      const translatedPost = translatedPosts[0]
      if (translatedPost) {
        return localePath(target, `/posts/${getContentSlug(translatedPost)}`)
      }
    }

    return localePath(target, '/')
  }

  const specMatch = path.match(/^\/(about|friends|projects)$/)
  if (specMatch) {
    const specs = await getCollection('spec', ({ data }) => data.locale === current)
    const currentSpec = specs.find((spec) => getContentSlug(spec) === specMatch[1])
    const translationKey = currentSpec?.data.translationKey

    if (translationKey) {
      const translatedSpecs = await getCollection('spec', ({ data }) => {
        return data.locale === target && data.translationKey === translationKey
      })
      const translatedSpec = translatedSpecs[0]
      if (translatedSpec) {
        return localePath(target, `/${getContentSlug(translatedSpec)}`)
      }
    }

    return localePath(target, '/')
  }

  const categoryMatch = path.match(/^\/categories\/(.+)$/)
  if (categoryMatch) {
    const categories = await getAllCategories(target)
    return categories.some((category) => category.slug === categoryMatch[1])
      ? localePath(target, path)
      : localePath(target, '/')
  }

  const tagMatch = path.match(/^\/tags\/(.+)$/)
  if (tagMatch) {
    const tags = await getAllTags(target)
    return tags.some((tag) => tag.slug === tagMatch[1])
      ? localePath(target, path)
      : localePath(target, '/')
  }

  return localePath(target, '/')
}
