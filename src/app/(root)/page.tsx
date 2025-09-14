import { Metadata } from 'next'
import RacingChairPro from './RacingChairPro'

export const metadata: Metadata = {
	title: 'Racing Chair Pro',
}

export default function HomePage() {
	return <RacingChairPro />
}
