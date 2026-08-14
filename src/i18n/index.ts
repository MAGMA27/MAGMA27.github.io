export const locales = ['zh-cn', 'en'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'zh-cn'

export const localeHtmlLang: Record<Locale, string> = {
  'zh-cn': 'zh-CN',
  en: 'en',
}

const messages = {
  'zh-cn': {
    navHome: '首页',
    navArchives: '归档',
    navProjects: '项目',
    navAbout: '关于',
    navFriends: '友链',
    languageName: '中文',
    switchTo: 'English',
    latestPosts: '最新发布',
    categories: '分类',
    hotTags: '热门标签',
    moreTags: '更多标签',
    tags: '标签',
    tagsCloud: '标签云',
    tagCount: '共有 {count} 个标签。',
    postCount: '共产出 {count} 篇文章，再接再厉。',
    categoryPrefix: '分类：',
    tagPrefix: '标签：',
    directory: '目录',
    continueReading: '继续阅读',
    previousPage: '上一页',
    nextPage: '下一页',
    edited: '已编辑',
    words: '字',
    minutes: '分钟',
    noCategories: '作者懒得分类🤪',
    noTags: '作者没有准备标签😦',
    openMenu: '打开菜单',
    search: '搜索',
    searchPlaceholder: '搜索文章...',
    searchUnavailableTitle: '抱歉',
    searchUnavailable: '该功能基于 Pagefind，请在构建后再次尝试。',
    searchNoResults: '无内容',
    searchResults: '找到以下 {count} 条结果',
    searchBy: '搜索由',
    rss: 'RSS',
    sitemap: '站点地图',
    poweredBy: 'Powered by',
    designedBy: '& Designed by',
    wordCount: '共嘚嘚了 {count} 字',
    updateNotice: '这篇文章最后修改于 {date}，部分内容可能已经不适用，如有疑问可联系作者。',
    postTitle: '文章标题：{value}',
    postAuthor: '文章作者：{value}',
    postLink: '文章链接：{value}',
    copy: '复制',
    lastUpdated: '最后修改时间：{value}',
    copiedPostLink: '已复制文章链接',
    copiedLink: '已复制到剪贴板',
    sharePost: '分享此内容',
    shareTo: '分享到...',
    twitter: 'Twitter',
    copyLink: '复制链接',
    shareButton: '分享此文章',
    donateButton: '赞助作者',
    donateMessage: '感谢您的支持，这将成为我前进的最大动力。',
    wechatDonate: '微信赞赏码',
    commercialNotice:
      '商业转载请联系站长获得授权，非商业转载请注明本文出处及文章链接，您可以自由地在任何媒体以任何形式复制和分发作品，也可以修改和创作，但是分发衍生作品时必须采用相同的许可协议。',
    licenseIntro: '本文采用',
    licenseSuffix: '进行许可。',
    postsCount: '共有 {count} 篇文章。',
    friendAvatar: '友链头像：{value}',
    projectCover: '项目封面：{value}',
    heroQuote: '在坚冰还覆盖着北海的时候，我看到了怒放的梅花。',
    shareMessage: '嘿，我发现了一片宝藏文章「{title}」哩，快来看看吧！',
    shareToItem: '分享到 {value}',
    runningDays: '已经运行了 {count} 天',
    siteNotPublished: 'Ops! 网站还没有发布',
    readingProgress: '进度 {percent}%',
    timelineDayPrefix: '今天是 {year} 年的第',
    timelineDaySuffix: '天',
    timelineYearProgress: '今年已过',
    timelineTodayProgress: '今天已过',
    notFoundDescription:
      '对不起，这个链接坏了。可能有些东西被删除，或者被移动了。无论如何，这里没什么可看的。',
    backHome: '传送回首页',
    backToTop: '回到顶部',
    themeLight: '切换到浅色主题',
    themeSystem: '切换到跟随系统',
    themeDark: '切换到深色主题',
    commentPlaceholder: '发条友善的评论吧（支持 Markdown 语法）…',
    homeLink: '返回首页',
  },
  en: {
    navHome: 'Home',
    navArchives: 'Archives',
    navProjects: 'Projects',
    navAbout: 'About',
    navFriends: 'Links',
    languageName: 'English',
    switchTo: '中文',
    latestPosts: 'Latest posts',
    categories: 'Categories',
    hotTags: 'Hot tags',
    moreTags: 'More tags',
    tags: 'Tags',
    tagsCloud: 'Tag cloud',
    tagCount: '{count} tags in total.',
    postCount: '{count} posts and counting.',
    categoryPrefix: 'Category: ',
    tagPrefix: 'Tag: ',
    directory: 'Contents',
    continueReading: 'Read more',
    previousPage: 'Previous page',
    nextPage: 'Next page',
    edited: 'edited',
    words: 'words',
    minutes: 'minutes',
    noCategories: 'The author skipped categories 🤪',
    noTags: 'The author did not prepare any tags 😦',
    openMenu: 'Open menu',
    search: 'Search',
    searchPlaceholder: 'Search posts...',
    searchUnavailableTitle: 'Sorry',
    searchUnavailable: 'Search is powered by Pagefind. Try again after building the site.',
    searchNoResults: 'No results',
    searchResults: 'Found {count} results',
    searchBy: 'Search by',
    rss: 'RSS',
    sitemap: 'Sitemap',
    poweredBy: 'Powered by',
    designedBy: '& Designed by',
    wordCount: '{count} words written',
    updateNotice:
      'This article was last updated on {date}. Some information may be outdated; please contact the author if you have questions.',
    postTitle: 'Title: {value}',
    postAuthor: 'Author: {value}',
    postLink: 'Link: {value}',
    copy: 'Copy',
    lastUpdated: 'Last updated: {value}',
    copiedPostLink: 'Article link copied',
    copiedLink: 'Link copied to clipboard',
    sharePost: 'Share this post',
    shareTo: 'Share to...',
    twitter: 'Twitter',
    copyLink: 'Copy link',
    shareButton: 'Share this post',
    donateButton: 'Support the author',
    donateMessage: 'Thank you for your support. It keeps me moving forward.',
    wechatDonate: 'WeChat donation QR code',
    commercialNotice:
      'For commercial reuse, please contact the site owner for permission. For non-commercial reuse, please credit the original source and link. You may copy, distribute, remix, and build upon this work in any medium, as long as derivatives are distributed under the same license.',
    licenseIntro: 'This work is licensed under',
    licenseSuffix: '.',
    postsCount: '{count} posts.',
    friendAvatar: 'Friend link avatar: {value}',
    projectCover: 'Project cover: {value}',
    heroQuote: 'While ice still covered the North Sea, I saw plum blossoms in full bloom.',
    shareMessage: 'Hey, I found a great post “{title}”. Take a look!',
    shareToItem: 'Share to {value}',
    runningDays: '{count} days online',
    siteNotPublished: 'The site has not been published yet.',
    readingProgress: '{percent}% read',
    timelineDayPrefix: 'Today is day',
    timelineDaySuffix: 'of {year}',
    timelineYearProgress: '{year} has passed',
    timelineTodayProgress: 'Today is',
    notFoundDescription:
      'Sorry, this link is broken. The page may have been deleted or moved, and there is nothing to see here.',
    backHome: 'Back to home',
    backToTop: 'Back to top',
    themeLight: 'Switch to light theme',
    themeSystem: 'Switch to system theme',
    themeDark: 'Switch to dark theme',
    commentPlaceholder: 'Leave a friendly comment (Markdown supported)…',
    homeLink: 'Back to home',
  },
} as const

export type TranslationKey = keyof (typeof messages)[typeof defaultLocale]

export function normalizeLocale(locale?: string | null): Locale {
  return locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale
}

export function t(
  locale: Locale | string | undefined,
  key: TranslationKey,
  variables: Record<string, string | number> = {},
): string {
  let result: string = messages[normalizeLocale(locale)][key] ?? messages[defaultLocale][key]

  for (const [name, replacement] of Object.entries(variables)) {
    result = result.replaceAll(`{${name}}`, String(replacement))
  }

  return result
}

function stripLocalePrefix(pathname: string) {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`

  for (const locale of locales) {
    if (normalizedPath === `/${locale}`) return '/'
    if (normalizedPath.startsWith(`/${locale}/`)) return normalizedPath.slice(locale.length + 1)
  }

  return normalizedPath || '/'
}

export function localePath(locale: Locale | string | undefined, pathname = '/') {
  const normalizedLocale = normalizeLocale(locale)
  const pathWithoutLocale = stripLocalePrefix(pathname)

  if (normalizedLocale === defaultLocale) return pathWithoutLocale
  return pathWithoutLocale === '/'
    ? `/${normalizedLocale}`
    : `/${normalizedLocale}${pathWithoutLocale}`
}

export function localeFromPath(pathname: string): Locale {
  const firstSegment = pathname.split('/').filter(Boolean)[0]
  return normalizeLocale(firstSegment)
}

export function getContentSlug(entry: { slug: string; data: { locale?: string } }) {
  const locale = normalizeLocale(entry.data.locale)
  const prefix = `${locale}/`
  return entry.slug.startsWith(prefix) ? entry.slug.slice(prefix.length) : entry.slug
}

export function getMenuItems(locale: Locale | string | undefined) {
  return [
    { name: t(locale, 'navHome'), link: localePath(locale, '/'), icon: 'icon-pantone' },
    { name: t(locale, 'navArchives'), link: localePath(locale, '/archives'), icon: 'icon-archive' },
    { name: t(locale, 'navProjects'), link: localePath(locale, '/projects'), icon: 'icon-flask' },
    { name: t(locale, 'navAbout'), link: localePath(locale, '/about'), icon: 'icon-ghost' },
    { name: t(locale, 'navFriends'), link: localePath(locale, '/friends'), icon: 'icon-hearts' },
  ]
}
