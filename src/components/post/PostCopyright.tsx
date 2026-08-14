import { author, site } from '@/config.json'
import { getFormattedDateTime } from '@/utils/date'
import { AnimatedSignature } from '../AnimatedSignature'
import { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import { t, type Locale } from '@/i18n'

function getPostUrl(slug: string) {
  return new URL(slug, site.url).href
}

export function PostCopyright({
  title,
  slug,
  lastMod,
  locale,
}: {
  title: string
  slug: string
  lastMod: Date
  locale: Locale
}) {
  const [lastModStr, setLastModStr] = useState('')
  const url = getPostUrl(slug)

  function handleCopyUrl() {
    navigator.clipboard.writeText(url)
    toast.success(t(locale, 'copiedPostLink'))
  }

  useEffect(() => {
    setLastModStr(getFormattedDateTime(lastMod, locale))
  }, [lastMod, locale])

  return (
    <section className="text-xs leading-loose text-secondary">
      <p>{t(locale, 'postTitle', { value: title })}</p>
      <p>{t(locale, 'postAuthor', { value: author.name })}</p>
      <p>
        <span>{t(locale, 'postLink', { value: url })}</span>
        <span role="button" className="cursor-pointer select-none" onClick={handleCopyUrl}>
          [{t(locale, 'copy')}]
        </span>
      </p>
      <p>{t(locale, 'lastUpdated', { value: lastModStr })}</p>
      <hr className="my-3 border-primary" />
      <div>
        <div className="float-right ml-4 my-2">
          <AnimatedSignature />
        </div>
        <p>
          {t(locale, 'commercialNotice')}
          <br />
          {t(locale, 'licenseIntro')}{' '}
          <a
            className="hover:underline hover:text-accent underline-offset-2"
            href={
              locale === 'en'
                ? 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en'
                : 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh'
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            CC BY-NC-SA 4.0
          </a>
          {t(locale, 'licenseSuffix')}
        </p>
      </div>
    </section>
  )
}
