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
			`${folder}/frame_${index.toString().padStart(4, '0')}.avif`

		const images: (HTMLImageElement | null)[] = new Array(frames).fill(null)
		const imageSeq = { frame: 0 }
		const context = canvasRef.current!.getContext('2d')!

		const render = () => {
			const frameIndex = Math.floor(imageSeq.frame)
			const nextIndex = Math.min(frameIndex + 1, frames - 1)
			const progress = imageSeq.frame - frameIndex

			const img1 = images[frameIndex]
			const img2 = images[nextIndex]

			if (!img1) return

			context.clearRect(0, 0, context.canvas.width, context.canvas.height)

			// Рисуем текущий кадр с уменьшающейся прозрачностью
			context.drawImage(img1, 0, 0, context.canvas.width, context.canvas.height)

			// Рисуем следующий кадр поверх с нарастающей прозрачностью
			if (img2) {
				context.globalAlpha = progress
				context.drawImage(
					img2,
					0,
					0,
					context.canvas.width,
					context.canvas.height
				)
			}

			// Сбрасываем прозрачность
			context.globalAlpha = 1
		}

		// Загружаем первый кадр сразу
		const firstImg = new Image()
		firstImg.src = currentFrame(0)
		firstImg.onload = () => {
			images[0] = firstImg
			render()
		}

		// Ленивая подгрузка при входе в viewport
		const preloadFrames = () => {
			// Сначала загружаем каждый 5-й кадр
			const step1 = () => {
				for (let i = 5; i < frames; i += 5) {
					const img = new Image()
					img.src = currentFrame(i)
					img.onload = () => {
						images[i] = img
						render()
					}
				}
			}

			// Потом оставшиеся
			const step2 = () => {
				const loadNext = (i: number) => {
					if (i >= frames) return
					if (images[i]) return loadNext(i + 1) // уже загружен
					const img = new Image()
					img.src = currentFrame(i)
					img.onload = () => {
						images[i] = img
						render()
						requestIdleCallback(() => loadNext(i + 1))
					}
				}
				requestIdleCallback(() => loadNext(1))
			}

			step1()
			step2()
		}

		// Запускаем подгрузку только при попадании секции в viewport
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						preloadFrames()
						observer.disconnect()
					}
				})
			},
			{ rootMargin: '500px' }
		)

		if (root.current) observer.observe(root.current)

		gsap.to(imageSeq, {
			frame: frames - 1,
			// snap: 'frame',
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
			observer.disconnect()
		}
	}, [folder, frames, start, end, pin])

	return (
		<section
			ref={root}
			id={id}
			className='w-full relative flex-center flex-col sm:py-40 py-25'
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
