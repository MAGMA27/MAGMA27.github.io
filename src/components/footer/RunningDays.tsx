import { useLayoutEffect, useState } from 'react'
import { footer } from '@/config.json'
import { getDiffInDays } from '@/utils/date'
import { t, type Locale } from '@/i18n'

export function RunningDays({ locale = 'zh-cn' }: { locale?: Locale }) {
  const [days, setDays] = useState(0)

  useLayoutEffect(() => {
    const diffDays = getDiffInDays(new Date(footer.startTime))
    setDays(diffDays)
  }, [])

  if (days < 0) {
    return <span>{t(locale, 'siteNotPublished')}</span>
  }

  return <span>{t(locale, 'runningDays', { count: days })}</span>
}
