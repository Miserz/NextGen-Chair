'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

type Options = {
	folder: string // путь к папке с кадрами
	frames: number // количество кадров
	start?: string // начало анимации
	end?: string // конец анимации
	scrub?: boolean | number // scrub
	pin?: boolean // закреплять секцию
	canvasWidth?: number
	canvasHeight?: number
}

export function useImageSequenceScroll(
	rootRef: React.RefObject<HTMLElement | null>,
	options: Options
) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)

	useEffect(() => {
		if (!canvasRef.current || !rootRef.current) return

		const {
			folder,
			frames,
			start = 'top top',
			end = '+=2000',
			scrub = true,
			pin = true,
			canvasWidth = 1920,
			canvasHeight = 1080,
		} = options

		const currentFrame = (index: number) =>
			`${folder}/frame_${index.toString().padStart(4, '0')}.jpg`

		const images: HTMLImageElement[] = []
		const imageSeq = { frame: 0 }

		for (let i = 0; i < frames; i++) {
			const img = new Image()
			img.src = currentFrame(i)
			images.push(img)
		}

		const context = canvasRef.current.getContext('2d')!
		canvasRef.current.width = canvasWidth
		canvasRef.current.height = canvasHeight

		const render = () => {
			const img = images[imageSeq.frame]
			if (!img) return
			context.clearRect(0, 0, context.canvas.width, context.canvas.height)
			context.drawImage(img, 0, 0, context.canvas.width, context.canvas.height)
		}

		images[0].onload = render

		const tween = gsap.to(imageSeq, {
			frame: frames - 1,
			snap: 'frame',
			ease: 'none',
			scrollTrigger: {
				trigger: rootRef.current,
				start,
				end,
				scrub,
				pin,
			},
			onUpdate: render,
		})

		return () => {
			tween.kill()
			ScrollTrigger.getAll().forEach(t => t.kill())
		}
	}, [rootRef, options])

	return canvasRef
}
