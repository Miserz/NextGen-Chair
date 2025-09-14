import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

import { SITE_DESCRIPTION, SITE_NAME } from '@/constants/seo.constants'

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
		<html lang='en'>
			<body className={montserratFont.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
