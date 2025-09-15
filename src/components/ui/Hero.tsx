'use client'

import { heroVideo } from '@/utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ModalRules } from './ModalRules'

export function Hero({ id }: { id: string }) {
	useGSAP(() => {
		gsap.to('#cta', { opacity: 1, y: -50, delay: 2 })
	}, [])

	return (
		<section id={id} className='pt-20 w-full relative'>
			<div className='flex-center'>
				<video
					className='pointer-events-none hero-height'
					autoPlay
					muted
					playsInline={true}
					key={heroVideo}
				>
					<source src={heroVideo} type='video/mp4' />
				</video>
			</div>

			<div
				id='cta'
				className='flex flex-col items-center opacity-0 translate-y-20'
			>
				<ModalRules size='lg' />
				<p className='font-normal text-sm pt-5 text-muted text-center p-2'>
					Перед использованием ознакомьтесь с правилами
				</p>
			</div>
		</section>
	)
}
