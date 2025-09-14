/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

const w = window as any

// requestIdleCallback / cancelIdleCallback
if (!w.requestIdleCallback) {
	w.requestIdleCallback = function (cb: any, options?: { timeout?: number }) {
		const opts = options || {}
		const relaxation = 1
		const timeout = opts.timeout || relaxation
		const start = performance.now()

		return setTimeout(() => {
			cb({
				get didTimeout() {
					return opts.timeout
						? false
						: performance.now() - start - relaxation > timeout
				},
				timeRemaining: function () {
					return Math.max(0, relaxation + (performance.now() - start))
				},
			})
		}, relaxation)
	}

	w.cancelIdleCallback = function (id: number) {
		clearTimeout(id)
	}
}

// requestAnimationFrame / cancelAnimationFrame
if (!w.requestAnimationFrame) {
	w.requestAnimationFrame = function (callback: (timestamp: number) => void) {
		return setTimeout(() => callback(Date.now()), 1000 / 60)
	}
}

if (!w.cancelAnimationFrame) {
	w.cancelAnimationFrame = function (id: number) {
		clearTimeout(id)
	}
}
