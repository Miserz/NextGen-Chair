export const PUBLIC_URL = {
	root: (url = '') => `${url ? url : ''}`,

	home: () => PUBLIC_URL.root('/'),
	termsOfUse: () => PUBLIC_URL.root('/terms-of-use'),
}
