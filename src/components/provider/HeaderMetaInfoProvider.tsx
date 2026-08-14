import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import {
  pathNameAtom,
  metaTitleAtom,
  metaDescriptionAtom,
  metaSlugAtom,
  languagePathAtom,
} from '@/store/metaInfo'

export function HeaderMetaInfoProvider({
  pathName,
  languagePath,
  title = '',
  description = '',
  slug = '',
}: {
  pathName: string
  languagePath: string
  title?: string
  description?: string
  slug?: string
}) {
  const setPathName = useSetAtom(pathNameAtom)
  const setTitle = useSetAtom(metaTitleAtom)
  const setDescription = useSetAtom(metaDescriptionAtom)
  const setSlug = useSetAtom(metaSlugAtom)
  const setLanguagePath = useSetAtom(languagePathAtom)

  useEffect(() => {
    // 去掉 pathName 结尾的 '/'
    if (pathName !== '/') {
      setPathName(pathName.replace(/\/$/, ''))
    } else {
      setPathName(pathName)
    }
    setTitle(title)
    setDescription(description)
    setSlug(slug)
    setLanguagePath(languagePath)
  }, [pathName, title, description, slug, languagePath])

  return null
}
