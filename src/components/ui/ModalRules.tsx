import {
	Button,
	ButtonProps,
	Divider,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	useDisclosure,
} from '@heroui/react'

interface ModalRulesProps {
	size: ButtonProps['size']
}

export function ModalRules({ size }: ModalRulesProps) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	return (
		<>
			<Button radius='full' color='primary' size={size} onPress={onOpen}>
				Правила
			</Button>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				backdrop='blur'
				className='dark bg-[#121212] border border-[#2A2A2A] backdrop-blur-xl'
				scrollBehavior='inside'
			>
				<ModalContent>
					<ModalHeader className='flex flex-col gap-2'>
						<h2 className='font-bold text-xl'>
							Правила и условия использования «Стул на колесиках 4.0»
						</h2>
					</ModalHeader>
					<ModalBody className='text-sm flex gap-6'>
						<section className='space-y-2'>
							<h2 className='font-semibold text-lg'>Гарантия</h2>
							<p>
								Стул будет ремонтироваться и улучшаться в течение 70 дней с
								момента изготовления (исключение: необратимые поломки, например
								поломка каркаса стула). По истечении гарантийного срока при
								следующей поломке стул может быть изъят на неопределённый срок —
								либо для модернизации, либо для утилизации (решение принимает
								главный по стулу).
							</p>
						</section>

						<Divider />

						<section className='space-y-2'>
							<h2 className='font-semibold text-lg'>Правила использования</h2>
							<div className='space-y-2'>
								<h3 className='font-semibold text-base'>Строго запрещено:</h3>
								<ul className='list-disc list-inside text-sm space-y-1'>
									<li>кататься на стуле со скоростью более 5 км/ч;</li>
									<li>кататься на стуле вдвоём или более человек;</li>
									<li>
										эксплуатировать стул без предварительного прочтения
										инструкции по использованию (инструкция размещена на
										спинке);
									</li>
									<li>каким-либо образом вмешиваться в конструкцию стула;</li>
									<li>осуществлять опасное вождение стула;</li>
									<li>
										передвигаться на стуле без пристёгнутого ремня безопасности;
									</li>
									<li>управлять стулом в состоянии опьянения;</li>
									<li>передвигаться на стуле, если он неисправен.</li>
								</ul>
							</div>

							<div className='space-y-2'>
								<h3 className='font-semibold text-base'>Разрешено:</h3>
								<ul className='list-disc list-inside text-sm space-y-1'>
									<li>
										спокойно и аккуратно перемещаться на стуле во время
										перемены, не создавая препятствий для окружающих.
									</li>
								</ul>
							</div>
						</section>

						<Divider />

						<section className='space-y-2'>
							<h2 className='font-semibold text-lg'>Статус собственности</h2>
							<p>
								Стул никак не относится к школьному имуществу или собственности
								школы; все запчасти и сам стул приобретались отдельно физическим
								лицом.
							</p>
						</section>

						<Divider />

						<section className='space-y-2'>
							<h2 className='font-semibold text-lg'>
								О принадлежности к школьным вещам
							</h2>
							<p>
								Изобретение «Стул на колесиках 4.0» является школьным пеналом,
								так как имеет место для хранения школьных принадлежностей (ручек
								и т. п.), и в настоящий момент используется для их хранения.
							</p>
						</section>

						<Divider />

						<section className='space-y-2'>
							<h2 className='font-semibold text-lg'>Просьба о возврате</h2>
							<p>
								Просьба не забирать стул! Любое изъятие стула без передачи его
								создателю является хищением и подпадает под статью 158 УК РФ.
							</p>
						</section>

						<Divider />

						<section className='space-y-2'>
							<h2 className='font-semibold text-lg'>Запрет на порчу</h2>
							<p>
								Запрещено портить стул: отрывать надписи и ломать конструкцию. В
								случае умышленной порчи стула действия подпадают под статью 167
								УК РФ.
							</p>
						</section>

						<Divider />

						<section className='space-y-2'>
							<h2 className='font-semibold text-lg'>
								Полномочия ответственного
							</h2>
							<p>
								Главный по стулу оставляет за собой право изъять стул у водителя
								без объяснения причины.
							</p>
						</section>

						<Divider />

						<section className='space-y-2'>
							<h2 className='font-semibold text-lg'>Изменение правил</h2>
							<p>
								Правила могут изменяться со временем; просим ознакомляться с
								правилами перед каждой поездкой.
							</p>
						</section>

						<Divider />

						<section className='space-y-2'>
							<h2 className='font-semibold text-lg'>
								Отказ от ответственности
							</h2>
							<p>
								Создатели «Стул на колесиках 4.0» не несут ответственности за
								травмы и увечья, полученные водителем стула или третьими лицами
								во время эксплуатации стула.
							</p>
						</section>

						<Divider />

						<h2 className='font-semibold text-lg text-center py-4'>
							Приятного вождения «Стул на колесиках 4.0»!
						</h2>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}
