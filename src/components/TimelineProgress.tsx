import { useEffect, useRef, useState } from 'react'
import { animate } from 'framer-motion'
import { getDaysInYear, getDiffInDays, getStartOfDay, getStartOfYear } from '@/utils/date'
import { t, type Locale } from '@/i18n'

export function TimelineProgress({ locale = 'zh-cn' }: { locale?: Locale }) {
  const [currentYear, setCurrentYear] = useState(0)
  const [dayOfYear, setDayOfYear] = useState(0)
  const [percentOfYear, setPercentOfYear] = useState(0)
  const [percentOfToday, setPercentOfToday] = useState(0)

  const updateInfo = () => {
    const now = new Date()
    setCurrentYear(now.getFullYear())

    const pastDays = getDiffInDays(getStartOfYear(now), now)
    setDayOfYear(pastDays)
    setPercentOfYear((pastDays / getDaysInYear(now)) * 100)

    const pastTime = now.getTime() - getStartOfDay(now).getTime()
    setPercentOfToday((pastTime / 86400 / 1000) * 100)
  }

  useEffect(() => {
    updateInfo()
    const interval = setInterval(updateInfo, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <p className="mt-4">
        {t(locale, 'timelineDayPrefix', { year: currentYear })}{' '}
        <CountUp to={dayOfYear} decimals={0} /> {t(locale, 'timelineDaySuffix', { year: currentYear })}
      </p>
      <p className="mt-4">
        {t(locale, 'timelineYearProgress', { year: currentYear })}{' '}
        <CountUp to={percentOfYear} decimals={5} />%
      </p>
      <p className="mt-4">
        {t(locale, 'timelineTodayProgress')} <CountUp to={percentOfToday} decimals={5} />%
      </p>
    </>
  )
}

function CountUp({
  to,
  decimals,
  duration = 1,
}: {
  to: number
  decimals: number
  duration?: number
}) {
  const node = useRef<HTMLSpanElement>(null)
  const prev = useRef(0)

  useEffect(() => {
    if (!node.current) return

    const control = animate(prev.current, to, {
      duration,
      onUpdate: (value) => {
        node.current!.textContent = value.toFixed(decimals)
      },
    })
    prev.current = to

    return () => {
      control.stop()
    }
  }, [to, decimals, duration])

  return <span ref={node}></span>
}
