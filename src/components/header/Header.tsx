import { BluredBackground } from './BluredBackground'
import { HeaderContent } from './HeaderContent'
import { SearchButton } from './SearchButton'
import { AnimatedLogo } from './AnimatedLogo'
import { HeaderMeta } from './HeaderMeta'
import { HeaderDrawer } from './HeaderDrawer'
import { LanguageSwitch } from './LanguageSwitch'
import { useIsMobile } from './hooks'
import type { Locale } from '@/i18n'
import { useAtomValue } from 'jotai'
import { languagePathAtom } from '@/store/metaInfo'

export function Header({ locale, languagePath }: { locale: Locale; languagePath: string }) {
  const isMobile = useIsMobile()
  const currentLanguagePath = useAtomValue(languagePathAtom)
  const resolvedLanguagePath = currentLanguagePath || languagePath

  return (
    <header className="fixed top-0 inset-x-0 h-[64px] z-10 overflow-hidden">
      <BluredBackground />
      <div className="max-w-[1100px] h-full md:px-4 mx-auto grid grid-cols-[64px_auto_120px]">
        <div className="flex items-center justify-center">
          {isMobile ? <HeaderDrawer locale={locale} /> : <AnimatedLogo locale={locale} />}
        </div>
        <div className="relative flex items-center justify-center">
          {isMobile ? <AnimatedLogo locale={locale} /> : <HeaderContent locale={locale} />}
          <HeaderMeta />
        </div>
        <div className="flex items-center justify-center gap-2">
          <LanguageSwitch locale={locale} href={resolvedLanguagePath} />
          <SearchButton locale={locale} />
        </div>
      </div>
    </header>
  )
}
