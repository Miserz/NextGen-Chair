'use client'
import { ModalRules } from '@/components/ui/ModalRules'
import { PUBLIC_URL } from '@/config/url.config'
import { cn } from '@/utils/utils'
import { Button, Link as LinkHeroUi } from '@heroui/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

export function Header() {
	const [open, setOpen] = useState(false)
	const [activeTab, setActiveTab] = useState<string>('hero')
	const headerRef = useRef<HTMLDivElement | null>(null)

	const tabs = [
		{ name: 'Главная', id: 'hero' },
		{ name: 'Колеса', id: 'wheels' },
		{ name: 'Подлокотники', id: 'armrests' },
		{ name: 'Безопасность', id: 'seatbelt' },
		{ name: 'Эргономика', id: 'ergonomics' },
		{ name: 'Революция', id: 'general' },
	]

	useEffect(() => {
		const sections = tabs.map(tab => document.getElementById(tab.id!))

		sections.forEach((section, i) => {
			if (!section) return

			ScrollTrigger.create({
				trigger: section,
				start: 'top center',
				end: 'bottom center',
				onEnter: () => setActiveTab(tabs[i].id!),
				onEnterBack: () => setActiveTab(tabs[i].id!),
			})
		})

		return () => {
			ScrollTrigger.getAll().forEach(t => t.kill())
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (!headerRef.current) return

		if (open) {
			gsap.to(headerRef.current, {
				height: 'auto',
				opacity: 1,
				duration: 0.4,
				ease: 'power2.out',
			})
		} else {
			gsap.to(headerRef.current, {
				height: 0,
				opacity: 0,
				duration: 0.3,
				ease: 'power2.in',
			})
		}
	}, [open])

	return (
		<header className='fixed top-0 z-50 w-full min-[400px]:pt-3 min-[400px]:px-2 flex justify-between items-center'>
			<div
				className={cn(
					'fixed inset-0 bg-black/50 backdrop-blur-sm z-40 opacity-0 pointer-events-none transition-all duration-300 ease-in-out',
					{ 'opacity-100 pointer-events-auto': open }
				)}
				onClick={() => setOpen(false)}
			/>
			<div className='z-50 flex flex-col w-full screen-max-width bg-[#121212]/80 backdrop-blur-xl py-3 sm:px-5 px-3 min-[400px]:rounded-[20px] border border-[#2A2A2A]'>
				<nav className='flex w-full items-center'>
					<Link className='flex flex-1 font-bold sm:text-xl text-lg' href='/'>
						<h1>Racing Chair Pro</h1>
					</Link>
					<div className='flex items-baseline gap-3 justify-end flex-1'>
						<Button
							size='sm'
							radius='full'
							variant='bordered'
							className='border'
							onPress={() => setOpen(!open)}
						>
							Больше
						</Button>
						<ModalRules size='sm' />
					</div>
				</nav>

				<div ref={headerRef} className='overflow-hidden h-0 opacity-0'>
					<div className='flex gap-2 pt-8 md:flex-row flex-col'>
						{tabs.map(tab => (
							<Button
								radius='full'
								variant={activeTab === tab.id ? 'solid' : 'light'}
								key={tab.id}
								className={
									activeTab === tab.id
										? 'bg-white text-black font-medium'
										: 'font-medium'
								}
								onPress={() => {
									document
										.getElementById(tab.id)
										?.scrollIntoView({ behavior: 'smooth' })
									setOpen(false)
								}}
							>
								{tab.name}
							</Button>
						))}
					</div>

					<div className='flex gap-2 pt-8'>
						<LinkHeroUi
							href={PUBLIC_URL.termsOfUse()}
							underline='hover'
							className='cursor-pointer font-medium'
							isExternal
							showAnchorIcon
						>
							Пользовательское соглашение
						</LinkHeroUi>
					</div>
				</div>
			</div>
		</header>
	)
}
