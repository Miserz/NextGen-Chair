'use client'

import { useImageSequenceScroll } from '@/hook/useImageSequenceScroll'
import { useTextScrollAnimation } from '@/hook/useTextScrollAnimation'
import { wheelsFolder, wheelsFrames } from '@/utils'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export function Wheels() {
	const root = useRef<HTMLElement | null>(null)
	const canvasRef = useImageSequenceScroll(root, {
		folder: wheelsFolder,
		frames: wheelsFrames,
		start: 'top top',
		end: '+=100%',
		scrub: true,
		pin: true,
		canvasWidth: 1000,
		canvasHeight: 1000,
	})

	useTextScrollAnimation({
		targets: ['.section-title', '.section-heading', '.section-subheading'],
		rootRef: root,
	})

	return (
		<section ref={root} className='w-full relative flex-center flex-col py-40'>
			<div className='section-text'>
				<h1 className='section-title'>Колеса</h1>
				<p className='section-heading'>Колёса для скорости</p>
				<p className='section-subheading'>
					Забудьте про скучное сидение на месте. Наш стул позволяет разгоняться
					до учительского стола быстрее, чем учитель успеет сказать
					&quot;открыли тетради&quot;.
				</p>
			</div>

			<canvas
				ref={canvasRef}
				width={1000}
				height={1000}
				className='pointer-events-none video-width'
			/>
		</section>
	)
}
