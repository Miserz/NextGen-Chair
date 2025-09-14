'use client'

import { HeroUIProvider } from '@heroui/react'
import { PropsWithChildren } from 'react'

export function Providers({ children }: PropsWithChildren<unknown>) {
	return <HeroUIProvider className='dark'>{children}</HeroUIProvider>
}
