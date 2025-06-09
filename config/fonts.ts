import {
  Fira_Code as FontMono,
  Inter as FontSans,
  Share_Tech_Mono as FontShareTechMono,
} from 'next/font/google'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const fontShareTechMono = FontShareTechMono({
  weight: '400',
  variable: '--font-share-tech-mono',
})
