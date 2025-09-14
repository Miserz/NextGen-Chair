import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

import { SITE_DESCRIPTION, SITE_NAME } from '@/constants/seo.constants'

import Head from 'next/head'
import './globals.css'
import { Providers } from './providers'

const montserratFont = Montserrat({
	subsets: ['latin'],
	weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
	title: {
		absolute: SITE_NAME,
		template: `%s - ${SITE_NAME}`,
	},
	description: SITE_DESCRIPTION,
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<Head>
				<link rel='icon' href='/favicon.ico' />
				<link
					rel='icon'
					type='image/png'
					sizes='32x32'
					href='/favicon-32x32.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='16x16'
					href='/favicon-16x16.png'
				/>
				<link
					rel='apple-touch-icon'
					sizes='180x180'
					href='/apple-touch-icon.png'
				/>
				<link
					rel='android-chrome'
					sizes='192x192'
					href='/android-chrome-192x192.png'
				/>
				<link
					rel='android-chrome'
					sizes='512x512'
					href='/android-chrome-512x512.png'
				/>
				<link rel='manifest' href='/site.webmanifest' />
			</Head>
			<html lang='en'>
				<body className={montserratFont.className}>
					<Providers>{children}</Providers>
				</body>
			</html>
		</>
	)
}
