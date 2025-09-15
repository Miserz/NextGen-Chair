import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Metadata } from 'next'
import TermsOfUse from './TermsOfUse'

export const metadata: Metadata = {
	title: 'Пользовательское соглашение',
	...NO_INDEX_PAGE,
}

export default function Page() {
	return <TermsOfUse />
}
