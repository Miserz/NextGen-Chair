export function applyPolyfills() {
	if (typeof window === 'undefined') return

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const w = window as any

	// requestIdleCallback / cancelIdleCallback
	if (!w.requestIdleCallback) {
		w.requestIdleCallback = function (
			callback: (deadline: {
				didTimeout: boolean
				timeRemaining: () => number
			}) => void,
			options?: { timeout?: number }
		) {
			const opts = options || {}
			const relaxation = 1
			const timeout = opts.timeout || relaxation
			const start = performance.now()

			return setTimeout(() => {
				callback({
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
			return setTimeout(() => {
				callback(Date.now())
			}, 1000 / 60)
		}
	}

	if (!w.cancelAnimationFrame) {
		w.cancelAnimationFrame = function (id: number) {
			clearTimeout(id)
		}
	}
}
