;(function () {
	if (typeof window === 'undefined') return
	var w = window

	if (!w.requestIdleCallback) {
		w.requestIdleCallback = function (cb, options) {
			var opts = options || {}
			var relaxation = 1
			var timeout = opts.timeout || relaxation
			var start = performance.now()
			return setTimeout(function () {
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
		w.cancelIdleCallback = function (id) {
			clearTimeout(id)
		}
	}

	if (!w.requestAnimationFrame) {
		w.requestAnimationFrame = function (cb) {
			return setTimeout(function () {
				cb(Date.now())
			}, 1000 / 60)
		}
	}
	if (!w.cancelAnimationFrame) {
		w.cancelAnimationFrame = function (id) {
			clearTimeout(id)
		}
	}
})()
