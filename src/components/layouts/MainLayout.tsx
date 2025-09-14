import { PropsWithChildren } from 'react'
import { Header } from './header/Header'

export function MainLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<div className='min-h-screen flex flex-col'>
			<Header />
			{children}
		</div>
	)
}
