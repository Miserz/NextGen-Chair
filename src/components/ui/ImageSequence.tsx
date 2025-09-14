'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

type ImageSequenceProps = {
	id?: string
	folder: string // путь до папки с кадрами (например: /images/wheels)
	frames: number // количество кадров
	width?: number // ширина канваса
	height?: number // высота канваса
	start?: string // где стартует анимация
	end?: string // где заканчивается
	pin?: boolean // закреплять секцию или нет
	title?: string
	heading?: string
	subheading?: string
}

export function ImageSequence({
	id,
	folder,
	frames,
	width = 1000,
	height = 1000,
	start = 'top top',
	end = '+=100%',
	pin = true,
	title,
	heading,
	subheading,
}: ImageSequenceProps) {
	const root = useRef<HTMLElement | null>(null)
	const canvasRef = useRef<HTMLCanvasElement | null>(null)

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.section-title, .section-heading, .section-subheading',
				{ opacity: 0, y: 40 },
				{
					opacity: 1,
					y: 0,
					duration: 0.5,
					stagger: 0.15,
					scrollTrigger: {
						trigger: root.current,
						start: 'top 80%',
						toggleActions: 'play none none none',
					},
				}
			)
		}, root)

		return () => ctx.revert()
	}, [])

	useEffect(() => {
		const currentFrame = (index: number) =>
			`${folder}/frame_${index.toString().padStart(4, '0')}.jpg`

		const images: (HTMLImageElement | null)[] = new Array(frames).fill(null)
		const imageSeq = { frame: 0 }
		const context = canvasRef.current!.getContext('2d')!

		const render = () => {
			let img = images[imageSeq.frame]
			// если кадр ещё не загрузился, ищем ближайший загруженный
			if (!img) {
				for (let i = imageSeq.frame; i >= 0; i--) {
					if (images[i]) {
						img = images[i]
						break
					}
				}
			}
			if (!img) return
			context.clearRect(0, 0, context.canvas.width, context.canvas.height)
			context.drawImage(img, 0, 0, context.canvas.width, context.canvas.height)
		}

		// Загружаем первый кадр сразу
		const firstImg = new Image()
		firstImg.src = currentFrame(0)
		firstImg.onload = () => {
			images[0] = firstImg
			render()
		}

		// Лениво подгружаем остальные кадры
		let i = 1
		const preloadNext = () => {
			if (i >= frames) return
			const img = new Image()
			img.src = currentFrame(i)
			img.onload = () => {
				images[i] = img
				i++
				// подгружаем следующий кадр асинхронно
				requestIdleCallback(preloadNext)
			}
		}
		requestIdleCallback(preloadNext)

		gsap.to(imageSeq, {
			frame: frames - 1,
			snap: 'frame',
			ease: 'none',
			scrollTrigger: {
				trigger: root.current,
				start,
				end,
				scrub: true,
				pin,
			},
			onUpdate: render,
		})

		return () => {
			ScrollTrigger.getAll().forEach(t => t.kill())
		}
	}, [folder, frames, start, end, pin])

	return (
		<section
			ref={root}
			id={id}
			className='w-full relative flex-center flex-col py-40'
		>
			{(title || heading || subheading) && (
				<div className='section-text'>
					{title && <h2 className='section-title'>{title}</h2>}
					{heading && <p className='section-heading'>{heading}</p>}
					{subheading && <p className='section-subheading'>{subheading}</p>}
				</div>
			)}

			<canvas
				ref={canvasRef}
				width={width}
				height={height}
				className='pointer-events-none video-width'
			/>
		</section>
	)
}
