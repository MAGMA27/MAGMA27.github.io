import { t, type Locale } from '@/i18n'

export function LanguageSwitch({ locale, href }: { locale: Locale; href: string }) {
  const targetLocale = locale === 'en' ? 'zh-cn' : 'en'
  const targetLabel = t(targetLocale, 'languageName')

  return (
    <a
      className="rounded-full border border-primary px-2.5 py-1 text-xs text-secondary transition hover:border-accent hover:text-accent"
      href={href}
      data-no-swup
      aria-label={t(locale, 'switchTo')}
      title={t(locale, 'switchTo')}
    >
      {targetLabel}
    </a>
  )
}
