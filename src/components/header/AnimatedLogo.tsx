import { AnimatePresence, motion } from 'framer-motion'
import { useShouldHeaderMetaShow, useIsMobile } from './hooks'
import { author } from '@/config.json'
import { localePath, t, type Locale } from '@/i18n'

export function AnimatedLogo({ locale }: { locale: Locale }) {
  const isMobile = useIsMobile()
  const shouldHeaderMetaShow = useShouldHeaderMetaShow()

  if (!isMobile) {
    return <Logo locale={locale} />
  }

  return (
    <AnimatePresence>
      {!shouldHeaderMetaShow && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Logo locale={locale} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Logo({ locale }: { locale: Locale }) {
  return (
    <a className="block" href={localePath(locale, '/')} title={t(locale, 'homeLink')}>
      <img
        className="size-[40px] select-none object-cover rounded-2xl"
        src={author.avatar}
        alt="Site owner avatar"
      />
    </a>
  )
}
