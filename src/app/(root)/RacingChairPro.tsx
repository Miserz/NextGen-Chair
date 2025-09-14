import { ImageSequence } from '@/components/ui/ImageSequence'
import {
	armrestsFolder,
	armrestsFrames,
	ergonomicsFolder,
	ergonomicsFrames,
	generalViewFolder,
	generalViewFrames,
	seatBeltFolder,
	seatBeltFrames,
	wheelsFolder,
	wheelsFrames,
} from '@/utils'
import Head from 'next/head'
import { Hero } from '../../components/ui/Hero'

export default function RacingChairPro() {
	return (
		<>
			<Head>
				<link rel='canonical' href={process.env.APP_URL} />
			</Head>
			<main>
				<Hero id='hero' />
				<ImageSequence
					id='wheels'
					folder={wheelsFolder}
					frames={wheelsFrames}
					title='Колеса'
					heading='Колёса для скорости'
					subheading='Забудьте про скучное сидение на месте. Наш стул позволяет разгоняться до учительского стола быстрее, чем учитель успеет сказать "открыли тетради".'
				/>
				<ImageSequence
					id='armrests'
					folder={armrestsFolder}
					frames={armrestsFrames}
					title='Подлокотники'
					heading='Подлокотники для власти'
					subheading='Ощутите себя директором школы, даже если вы всего лишь ученик 8-Б. Подлокотники создают ауру серьёзности, когда вы отвечаете у доски.'
				/>
				<ImageSequence
					id='seatbelt'
					folder={seatBeltFolder}
					frames={seatBeltFrames}
					title='Ремень безопасности'
					heading='Учёба без риска'
					subheading='Контрольные бывают жёсткими. Мы предусмотрели ремень безопасности, чтобы вы не вылетели со стула при неожиданных вопросах.'
				/>
				<ImageSequence
					id='ergonomics'
					folder={ergonomicsFolder}
					frames={ergonomicsFrames}
					title='Эргономика'
					heading='Эргономика будущего'
					subheading='Создан для 6 часов подряд сидения на уроках. Поддержка позвоночника такая, что даже медсестра в школе одобрила.'
				/>
				<ImageSequence
					id='general'
					folder={generalViewFolder}
					frames={generalViewFrames}
					heading='Это больше, чем стул.'
					subheading='Это свобода. Это комфорт. Это школьная революция.'
				/>
			</main>
		</>
	)
}
