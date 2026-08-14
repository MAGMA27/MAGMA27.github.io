import { useEffect, useRef } from 'react'
import { init } from '@waline/client'
import '@waline/client/style'
import { t, type Locale } from '@/i18n'

export function Waline({ serverURL, locale }: { serverURL: string; locale: Locale }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const walineInst = init({
      el: ref.current,
      serverURL,
      dark: "[data-theme='dark']",
      login: 'force',
      imageUploader: false,
      search: false,
      locale: {
        placeholder: t(locale, 'commentPlaceholder'),
      },
      emoji: ['//unpkg.com/@waline/emojis@1.1.0/bilibili'],
    })

    return () => {
      if (ref.current) {
        walineInst?.destroy()
      }
    }
  }, [serverURL])

  return <div ref={ref}></div>
}
