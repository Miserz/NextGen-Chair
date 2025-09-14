'use client'

import { applyPolyfills } from '@/utils/polyfills'
import { HeroUIProvider } from '@heroui/react'
import { PropsWithChildren, useEffect } from 'react'

export function Providers({ children }: PropsWithChildren<unknown>) {
	useEffect(() => {
		applyPolyfills()
	}, [])
	return <HeroUIProvider className='dark'>{children}</HeroUIProvider>
}
