'use client'

import { ModalRules } from '@/components/ui/ModalRules'
import { PUBLIC_URL } from '@/config/url.config'
import { logo } from '@/utils'
import { Link as LinkHeroUi } from '@heroui/react'
import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
	return (
		<footer className='w-full bg-[#121212]/80 mt-20  py-6 sm:px-10 px-5 border-t border-[#2A2A2A]'>
			<div className='max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4'>
				{/* Логотип */}
				<Link
					className='font-bold text-xl text-white flex items-center gap-2'
					href='/'
				>
					<Image src={logo} width={32} height={32} alt='logo' />
					NextGen Chair
				</Link>

				{/* Дополнительно */}
				<div className='flex gap-3 items-center'>
					<LinkHeroUi
						href={PUBLIC_URL.termsOfUse()}
						underline='hover'
						className='cursor-pointer font-medium'
						isExternal
						showAnchorIcon
					>
						Пользовательское соглашение
					</LinkHeroUi>
					<ModalRules size='sm' />
				</div>
			</div>

			{/* Копирайт */}
			<p className='mt-6 text-center text-gray-500 text-sm'>
				&copy; {new Date().getFullYear()} NextGen Chair. Все права защищены.
			</p>
		</footer>
	)
}
