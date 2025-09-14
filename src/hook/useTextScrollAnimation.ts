'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)

type TextAnimationOptions = {
	targets: string | string[] // селекторы для текста
	rootRef: React.RefObject<HTMLElement | null>
	start?: string
	y?: number
	duration?: number
	stagger?: number
}

export function useTextScrollAnimation({
	targets,
	rootRef,
	start = 'top 80%',
	y = 20,
	duration = 0.5,
	stagger = 0.15,
}: TextAnimationOptions) {
	useEffect(() => {
		if (!rootRef.current) return

		const ctx = gsap.context(() => {
			gsap.fromTo(
				targets,
				{ opacity: 0, y },
				{
					opacity: 1,
					y: 0,
					duration,
					stagger,
					scrollTrigger: {
						trigger: rootRef.current,
						start,
						toggleActions: 'play none none none',
					},
				}
			)
		}, rootRef)

		return () => ctx.revert()
	}, [targets, rootRef, start, y, duration, stagger])
}
