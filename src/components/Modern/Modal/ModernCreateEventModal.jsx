import { motion } from "framer-motion";
import ModernBackdrop from "./ModernBackdrop";
import { ReactComponent as Event } from '../../../assets/modal/event.svg';
import { ReactComponent as Palmer } from '../../../assets/modal/holiday.svg';
import { ReactComponent as Evenement } from '../../../assets/modal/evenement.svg';
import { ReactComponent as Work } from '../../../assets/modal/work.svg';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {initializeCalendarApi} from "../../../common/GoogleCalendarFacade";
import StepVisual from "./StepVisual";
import DatePicker from "../DatePicker";

const scalingCenter = {
	hidden: {
		opacity: 0,
		transform: "scale(0)",
	},
	visible: {
		opacity: 1,
		transform: "scale(1)",
		transition: {
			duration: 1,
			type: "spring",
			damping: 25,
			stiffness: 500,
		},
	},
	exit: {
		opacity: 0,
		transform: "scale(0)",
	},
};

const Modal = ({ handleClose }) => {
	const dispatch = useDispatch();
	const [apiCalendar, setApiCalendar] = useState(null);
	useEffect(() => {
		const api = initializeCalendarApi(dispatch);
		setApiCalendar(api);
	}, []);

	const [step, setStep] = useState(1);
	const [activity, setActivity] = useState(null);
	const [selectedColor, setSelectedColor] = useState('Jasmine');

	const [lundi, setLundi] = useState(false);
	const [mardi, setMardi] = useState(false);
	const [mercredi, setMercredi] = useState(false);
	const [jeudi, setJeudi] = useState(false);
	const [vendredi, setVendredi] = useState(false);
	const [samedi, setSamedi] = useState(false);
	const [dimanche, setDimanche] = useState(false);

	const nextStep = () => {
		setStep(step + 1);
		console.log(step);
	};

	const previousStep = () => {
		setStep(step - 1);
	}

	useEffect(() => {
		console.log(step);
	}, [step]);

	useEffect(() => {
		console.log(selectedColor);
	}, [selectedColor]);

	const [selectedDate, setSelectedDate] = useState(new Date());
	const [selectedPeriod, setSelectedPeriod] = useState({
		startDate: null,
		endDate: null,
	});
	const handleDateChange = (date) => {
		setSelectedDate(date);
		console.log("Selected date:", date);
	};

	const handlePeriodChange = (newStartDate, newEndDate) => {
		if (
			!selectedPeriod.startDate ||
			!selectedPeriod.endDate ||
			newStartDate.getTime() !== selectedPeriod.startDate.getTime() ||
			newEndDate.getTime() !== selectedPeriod.endDate.getTime()
		) {
			setSelectedPeriod({ startDate: newStartDate, endDate: newEndDate });
		}
	};

	const formatDateToDDMMYY = (date) => {
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = String(date.getFullYear()).slice(-2);
		return `${day}/${month}/${year}`;
	};

	const createHoliday = () => {
		if (selectedPeriod.startDate && selectedPeriod.endDate) {
			const holiday = {
				user: selectedColor,
				startDate: selectedPeriod.startDate,
				endDate: selectedPeriod.endDate,
			};

			let holidays = JSON.parse(localStorage.getItem('holidays')) || [];

			holidays.push(holiday);

			localStorage.setItem('holidays', JSON.stringify(holidays));

			handleClose();
			window.location.reload();
		}
	};

	const saveWorkdays = () => {

			const workday = {
				from: new Date(),
				monday: lundi,
				tuesday: mardi,
				wednesday: mercredi,
				thursday: jeudi,
				friday: vendredi,
				saturday: samedi,
				sunday: dimanche,
			};

			let workdays = JSON.parse(localStorage.getItem('workdays')) || [];

			workdays.push(workday);

			localStorage.setItem('workdays', JSON.stringify(workdays));

			handleClose();
			window.location.reload();
	};


		return (<ModernBackdrop onClick={handleClose}>
			<motion.div
				onClick={(e) => e.stopPropagation()}
				className="w-[60%] h-[40%] bg-primary bg-opacity-20 backdrop-blur-md shadow-date-card rounded-[100px]"
				variants={scalingCenter}
				initial="hidden"
				animate="visible"
				exit="exit"
			>

				<motion.div className={'h-full w-full flex flex-col items-center justify-between gap-6'}>
					<StepVisual step={step} setStep={setStep} />
					{ step === 1 &&
						<motion.div className={'h-[90%] w-full flex flex-col items-center justify-between gap-8'}>
							<Event className={"h-[18%] fill-primary"}/>
							<div className={"w-full h-auto font-poppins flex flex-col items-center px-16 gap-4"}>
								<div className={"text-text text-4xl font-semibold"}>Centre de Planification</div>
								<div className={'text-text-modern text-2xl font-medium text-center'}>Créez de nouveaux événements et rendez-vous, ajoutez vos vacances et régler vos jours de travail.</div>
							</div>
							<div className={'w-full h-[50%] flex flex-col gap-6 items-center pt-6'}>
								<motion.div className={"bg-primary h-[35%] w-[90%] rounded-[100px] flex items-center justify-center"} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => {nextStep();}}>
									<div className={"text-text font-poppins font-semibold text-4xl"}>Continuez</div>
								</motion.div>
								<motion.div className={"bg-modern-grey bg-opacity-40 h-[35%] w-[90%] rounded-[100px] flex items-center justify-center"} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleClose}>
									<div className={"text-text-modern font-poppins font-medium text-4xl"}>Retour</div>
								</motion.div>
							</div>
						</motion.div>
					}
				{ step === 2 &&
					<motion.div className={'h-[90%] w-full flex flex-col items-center justify-between'}>
						<div className={"w-full h-auto font-poppins flex flex-col items-center px-16 gap-4"}>
							<div className={"text-text text-4xl font-semibold"}>Activité à Planifier</div>
							<div className={'text-text-modern text-2xl font-medium text-center'}>Sélectionnez l'activité que vous souhaitez ajouter au calendrier</div>
						</div>
						<div className={'w-full h-[60%] mb-8 flex flex-col gap-6 items-center'}>
							<motion.div className={"bg-modern-grey bg-opacity-40 h-[30%] w-[90%] rounded-[100px] flex items-center gap-8 px-8"}>
								<Evenement className={"w-[18%] h-full fill-text opacity-25"}/>
								<div className={" text-text opacity-40 font-poppins font-semibold text-4xl"}>Événement</div>
							</motion.div>
							<motion.div className={"bg-primary h-[30%] w-[90%] rounded-[100px] flex items-center gap-8 px-8"} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => {nextStep(); setActivity('vacation');}}>
								<Palmer className={"w-[18%] h-[90%] fill-secondary opacity-25"}/>
								<div className={" text-text font-poppins font-semibold text-4xl"}>Vacances</div>
							</motion.div>
							<motion.div className={"bg-primary h-[30%] w-[90%] rounded-[100px] flex items-center gap-8 px-8"} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => {nextStep(); setActivity('workday');}}>
								<Work className={"w-[18%] h-[70%] fill-secondary opacity-25"}/>
								<div className={" text-text font-poppins font-semibold text-4xl"}>Jour de Travail</div>
							</motion.div>
						</div>

					</motion.div>
				}
						{step === 3 && activity === 'event' && (
									<motion.div className={'h-[90%] w-full flex flex-col items-center justify-between'}>
										<div className={"w-full h-auto font-poppins flex flex-col items-center px-16 gap-4"}>
											<div className={"text-text text-4xl font-semibold"}>Événement</div>
											<div className={'text-text-modern text-2xl font-medium text-center'}>Créer votre évenement</div>
										</div>
									</motion.div>
								)}
						{step === 3 && activity === 'vacation' && (
							<motion.div className={'h-[90%] w-full flex flex-col items-center justify-between'}>
								<div className={"w-full h-auto font-poppins flex flex-col items-center gap-2"}>
									<div className={"text-text text-4xl font-semibold"}>Vacances</div>
									<div className={'text-text-modern text-2xl font-medium text-center'}>Notez vos vacances</div>

								<div className={"flex flex-col h-[60%] w-full px-8 mt-2"}>
									<div>
										<div className={"text-xl text-text-modern font-inter font-bold uppercase self-start"}>Utilisateur <span className={"text-primary"}>{selectedColor}</span></div>
										<div className="flex gap-4 p-6 rounded-xl">
											<div className={`color-circle rose ${selectedColor === 'Jasmine' ? 'border-4 border-rose' : ''}`} onClick={() => setSelectedColor('Jasmine')}></div>
											<div className={`color-circle yellow ${selectedColor === 'Thierry' ? 'border-4 border-yellow' : ''}`} onClick={() => setSelectedColor('Thierry')}></div>
											<div className={`color-circle blue ${selectedColor === 'Quentin' ? 'border-4 border-blue' : ''}`} onClick={() => setSelectedColor('Quentin')}></div>
											<div className={`color-circle green ${selectedColor === 'Jordan' ? 'border-4 border-green' : ''}`} onClick={() => setSelectedColor('Jordan')}></div>
										</div>
									</div>
									<div>
										<div className={"text-xl text-text-modern font-inter font-bold uppercase self-start"}>Période {selectedPeriod.endDate && <span className={"text-primary"}>Du {formatDateToDDMMYY(selectedPeriod.startDate)} Au {formatDateToDDMMYY(selectedPeriod.endDate)}</span>}</div>
										<div className={"flex justify-around w-full mt-2"}>
											<DatePicker
												mode={"period"}
												onDateChange={handleDateChange}
												onPeriodChange={handlePeriodChange}
											/>
										</div>
									</div>
								</div>
								</div>
								<div className={'w-full h-[10%] flex gap-6 items-center justify-center mb-4'}>
									<motion.div className={"bg-modern-grey bg-opacity-40 h-[100%] w-[40%] rounded-[100px] flex items-center justify-center"} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => {setStep(step-1);}}>
										<div className={"text-text-modern font-poppins font-medium text-2xl"}>Retour</div>
									</motion.div>
									<motion.div className={`${selectedPeriod.endDate !== null ? 'bg-primary' : 'bg-modern-grey  bg-opacity-40'} h-[100%] w-[40%] rounded-[100px] flex items-center justify-center`} whileHover={{ scale: selectedPeriod.endDate !== null ? 1.1 : 1}} whileTap={{ scale: selectedPeriod.endDate !== null ? 0.9 : 1 }} onClick={() => {createHoliday();}}>
										<div className={"text-text font-poppins font-semibold text-2xl"}>Créer</div>
									</motion.div>
								</div>
							</motion.div>
						)}
						{step === 3 && activity === 'workday' && (
							<motion.div className={'h-[90%] w-full flex flex-col items-center justify-between'}>
								<div className={"w-full h-auto font-poppins flex flex-col items-center gap-2"}>
									<div className={"text-text text-4xl font-semibold"}>Jour de Travail</div>
									<div className={'text-text-modern text-2xl font-medium text-center'}>Définissez vos jours de travail</div>
									<div className={"flex flex-col h-[60%] w-full px-8 mt-2 gap-6"}>
										<div className={"grid grid-cols-2 items-center place-items-center p-6"}>
												<div className={"text-text w-[60%] text-center font-inter font-bold uppercase border-primary border-2 rounded-xl px-4 py-2"}>Pas travail</div>
												<div className={"text-text w-[60%] text-center font-inter font-bold uppercase bg-primary border-primary border-2 rounded-xl px-4 py-2"}>Travail</div>
										</div>
										<div className="grid grid-cols-2 items-center place-items-center gap-4 p-6 rounded-xl">
											<div className={`text-text w-[60%] text-center font-inter font-bold uppercase ${lundi ? 'bg-primary' : ''} border-primary border-2 rounded-xl px-4 py-2`} onClick={() => setLundi(!lundi)}>Lundi</div>
											<div className={`text-text w-[60%] text-center font-inter font-bold uppercase ${mardi ? 'bg-primary' : ''} border-primary border-2 rounded-xl px-4 py-2`} onClick={() => setMardi(!mardi)}>Mardi</div>
											<div className={`text-text w-[60%] text-center font-inter font-bold uppercase ${mercredi ? 'bg-primary' : ''} border-primary border-2 rounded-xl px-4 py-2`} onClick={() => setMercredi(!mercredi)}>Mecredi</div>
											<div className={`text-text w-[60%] text-center font-inter font-bold uppercase ${jeudi ? 'bg-primary' : ''} border-primary border-2 rounded-xl px-4 py-2`} onClick={() => setJeudi(!jeudi)}>Jeudi</div>
											<div className={`text-text w-[60%] text-center font-inter font-bold uppercase ${vendredi ? 'bg-primary' : ''} border-primary border-2 rounded-xl px-4 py-2`} onClick={() => setVendredi(!vendredi)}>Vendredi</div>
											<div className={`text-text w-[60%] text-center font-inter font-bold uppercase ${samedi ? 'bg-primary' : ''} border-primary border-2 rounded-xl px-4 py-2`} onClick={() => setSamedi(!samedi)}>Samedi</div>
											<div className={`text-text w-[60%] text-center font-inter font-bold uppercase ${dimanche ? 'bg-primary' : ''} border-primary border-2 rounded-xl px-4 py-2`} onClick={() => setDimanche(!dimanche)}>Dimanche</div>
										</div>
									</div>
								</div>
								<div className={'w-full h-[10%] flex gap-6 items-center justify-center mb-4'}>
									<motion.div className={"bg-modern-grey bg-opacity-40 h-[100%] w-[40%] rounded-[100px] flex items-center justify-center"} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => {setStep(step-1);}}>
										<div className={"text-text-modern font-poppins font-medium text-2xl"}>Retour</div>
									</motion.div>
									<motion.div className={`bg-primary h-[100%] w-[40%] rounded-[100px] flex items-center justify-center`} whileHover={{ scale: 1.1}} whileTap={{ scale: 0.9 }} onClick={() => {saveWorkdays();}}>
										<div className={"text-text font-poppins font-semibold text-2xl"}>Sauvegarder</div>
									</motion.div>
								</div>
							</motion.div>
						)}
				</motion.div>
			</motion.div>
		</ModernBackdrop>);
};

export default Modal;
