import { getRelativeTime, getFormattedDate } from '@/utils/date'
import { useEffect, useState } from 'react'
import type { Locale } from '@/i18n'

export function RelativeDate({ date, locale = 'zh-cn' }: { date: Date; locale?: Locale }) {
  const [dateStr, setDateStr] = useState(getFormattedDate(date, locale))

  useEffect(() => {
    const relative = getRelativeTime(date, new Date(), locale)
    if (relative) {
      setDateStr(relative)
    }
  }, [date, locale])

  return <span>{dateStr}</span>
}
