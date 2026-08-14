import { sponsor, site } from '@/config.json'
import { motion } from 'framer-motion'
import * as QR from 'qrcode.react'
import { useAtomValue } from 'jotai'
import { metaSlugAtom, metaTitleAtom } from '@/store/metaInfo'
import clsx from 'clsx'
import { toast } from 'react-toastify'
import { useModal } from '@/components/ui/modal'
import { t, type Locale } from '@/i18n'

interface ShareData {
  url: string
  text: string
}

export function ActionAside({ locale }: { locale: Locale }) {
  return (
    <div
      className="absolute left-0 bottom-0 flex flex-col gap-4"
      style={{
        transform: 'translateY(calc(100% + 24px))',
      }}
    >
      <ShareButton locale={locale} />
      <DonateButton locale={locale} />
    </div>
  )
}

function ShareButton({ locale }: { locale: Locale }) {
  const postSlug = useAtomValue(metaSlugAtom)
  const postTitle = useAtomValue(metaTitleAtom)
  const { present } = useModal()

  const url = new URL(postSlug, site.url).href
  const text = t(locale, 'shareMessage', { title: postTitle })

  const openModal = () => {
    present({
      content: <ShareModal url={url} text={text} locale={locale} />,
    })
  }

  return (
    <button
      type="button"
      aria-label={t(locale, 'shareButton')}
      className="size-6 text-xl leading-none hover:text-accent"
      onClick={() => openModal()}
    >
      <i className="iconfont icon-share"></i>
    </button>
  )
}

function ShareModal({ url, text, locale }: { url: string; text: string; locale: Locale }) {
  const shareList = [
    {
      name: t(locale, 'twitter'),
      icon: 'icon-x',
      onClick: (data: ShareData) => {
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(data.url)}&text=${encodeURIComponent(data.text)}&via=${encodeURIComponent(site.title)}`,
        )
      },
    },
    {
      name: t(locale, 'copyLink'),
      icon: 'icon-link',
      onClick: (data: ShareData) => {
        navigator.clipboard.writeText(data.url)
        toast.success(t(locale, 'copiedLink'))
      },
    },
  ]

  return (
    <motion.div
      className="bg-primary rounded-lg p-2 min-w-[420px] border border-primary flex flex-col"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      <h2 className="px-3 py-1 font-bold">{t(locale, 'sharePost')}</h2>
      <hr className="my-2 border-primary" />
      <div className="px-3 py-2 grid grid-cols-[180px_auto] gap-3">
        <QR.QRCodeSVG value={url} size={180} />
        <div className="flex flex-col gap-2">
          <div className="text-sm">{t(locale, 'shareTo')}</div>
          <ul className="flex flex-col gap-2">
            {shareList.map((item) => (
              <li
                className="px-2 py-1 flex gap-2 cursor-pointer rounded-md hover:bg-secondary"
                key={item.name}
                onClick={() => item.onClick({ url, text })}
                role="button"
                aria-label={t(locale, 'shareToItem', { value: item.name })}
              >
                <i className={clsx('iconfont text-accent', item.icon)}></i>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

function DonateButton({ locale }: { locale: Locale }) {
  const { present } = useModal()

  const openDonate = () => {
    present({
      content: <DonateContent locale={locale} />,
    })
  }

  return (
    <button
      type="button"
      aria-label={t(locale, 'donateButton')}
      className="size-6 text-xl leading-none hover:text-accent"
      onClick={() => openDonate()}
    >
      <i className="iconfont icon-user-heart"></i>
    </button>
  )
}

function DonateContent({ locale }: { locale: Locale }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
    >
      <h2 className="text-center mb-5">{t(locale, 'donateMessage')}</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        <img
          className="object-cover"
          width={300}
          height={300}
          src={sponsor.wechat}
          alt={t(locale, 'wechatDonate')}
          loading="lazy"
          decoding="async"
        />
      </div>
    </motion.div>
  )
}
