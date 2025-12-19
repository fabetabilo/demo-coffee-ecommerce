import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../css/RecommendationQuiz.css'
import Button from './Button'
import Sheet from './Sheet'
import RecommendationService from '../../services/recommendation.service'
import { quizQuestions, createInitialAnswers } from '../../data/recommendation-quiz'

function RecommendationQuiz() {
	
	const [isOpen, setIsOpen] = useState(false)
	const [currentStep, setCurrentStep] = useState(0)
	const [answers, setAnswers] = useState(() => createInitialAnswers())
	const [hasStarted, setHasStarted] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [apiError, setApiError] = useState(null)
	const navigate = useNavigate()
	const totalSteps = quizQuestions.length
	const currentQuestion = quizQuestions[currentStep]
	const currentValue = answers[currentQuestion.id]
	const isLastStep = currentStep === totalSteps - 1
    
	const gridQuestionIds = ['brewingMethod', 'flavorPreference']
	const isGridQuestion = gridQuestionIds.includes(currentQuestion.id)

	useEffect(() => {
		if (isOpen) {
			return
		}
		setCurrentStep(0)
		setAnswers(createInitialAnswers())
		setHasStarted(false)
		setApiError(null)
		setIsLoading(false)
	}, [isOpen])

	const openSheet = () => setIsOpen(true)
	const closeSheet = () => setIsOpen(false)

	const handleOptionSelect = (questionId, value) => {
		if (isLoading) return
		setAnswers((prev) => ({
			...prev,
			[questionId]: value
		}))
	}

	const handleStart = () => {
		setHasStarted(true)
		setCurrentStep(0)
		setApiError(null)
	}

	const goBack = () => {
		if (currentStep === 0 || isLoading) return
		setCurrentStep((prev) => Math.max(prev - 1, 0))
	}

	const goNext = async () => {
		if (!currentValue || isLoading) return
		if (isLastStep) {
			await handleSubmit()
			return
		}
		setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1))
	}

	const handleSubmit = async () => {
		try {
			setIsLoading(true)
			setApiError(null)
			const response = await RecommendationService.getRecommendations(answers)
			const normalized = Array.isArray(response) ? response : []
			closeSheet()
			navigate('/recomendacion/resultado', {
				state: {
					products: normalized,
					quizAnswers: answers
				}
			})

		} catch (error) {
			
			console.error('Error al obtener recomendaciones', error)
			setApiError('No pudimos obtener recomendaciones. Intenta nuevamente.')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<>
			<section className="recommendation-quiz" aria-label="Quiz de recomendación">
				<div className="recommendation-quiz-content">
					<h2 className="recommendation-quiz-title">
						¿No estás seguro de qué Café o Blend es ideal para ti?
					</h2>
				</div>
				<Button label="RESPONDER QUIZ" onClick={openSheet} className="button-solid" />
			</section>

			<Sheet
				isOpen={isOpen}
				onClose={closeSheet}
				closeOnBackdrop={!hasStarted}
				className="recommendation-quiz-sheet"
				ariaLabel="Blend Finder"
			>
				<div className="sheet-grip" />
				{!hasStarted ? (
					<div className="recommendation-quiz-intro">
						<p className="recommendation-quiz-intro-label">Blend Finder</p>
						<h2 className="recommendation-quiz-intro-title">
							4 simples pasos<br />
							para llegar a tu Café favorito
						</h2>
						<p className="recommendation-quiz-intro-copy">
							Responde preguntas rápidas y descubre tu nuevo favorito.
						</p>
						<Button
							label="Empezar"
							onClick={handleStart}
							className="button-solid quiz-start-button"
							disabled={isLoading}
						/>
					</div>
				) : (
					<>
						<div className="recommendation-quiz-sheet-header">
							<div className="recommendation-quiz-meta">
									<span className="recommendation-quiz-meta-label">QUIZ</span>
									<span className="recommendation-quiz-meta-counter">
										{currentStep + 1}/{totalSteps}
									</span>
							</div>
							
							<hr className="recommendation-quiz-divider" aria-hidden="true" />
							<div className="quiz-progress" aria-hidden="true">
									{quizQuestions.map((question, index) => (
										<span
											key={question.id}
											className={`quiz-progress-dot ${
												index === currentStep ? 'active' : ''
											} ${index < currentStep ? 'complete' : ''}`.trim()}
										/>
									))}
							</div>
							<div className="quiz-question">
								<h3 className="quiz-question-title">{currentQuestion.title}</h3>
							</div>
						</div>

						<div className="recommendation-quiz-sheet-body">
							<div className="quiz-content">
								<div
									className={`quiz-options ${isGridQuestion ? 'quiz-options-grid' : ''}`.trim()}
									role="radiogroup"
									aria-label={currentQuestion.title}
								>
									{currentQuestion.options.map((option) => {
										const isSelected = currentValue === option.value
										return (
											<button
												key={option.value}
												type="button"
												className={`quiz-option ${option.icon ? 'quiz-option-iconic' : ''} ${
													isSelected ? 'selected' : ''
												}`.trim()}
												onClick={() => handleOptionSelect(currentQuestion.id, option.value)}
												disabled={isLoading}
												role="radio"
												aria-checked={isSelected}
											>
												{option.icon && (
													<span className="quiz-option-icon" aria-hidden="true">
														<img src={option.icon} alt="" />
													</span>
												)}
												<span className="quiz-option-label">{option.label}</span>
											</button>
										)
									})}
								</div>
							</div>
							<div className="quiz-nav">
								<div className="quiz-nav-buttons">
									<button
										type="button"
										className="quiz-nav-button quiz-nav-back"
										onClick={goBack}
										disabled={currentStep === 0 || isLoading}
									>
										Volver
									</button>
									<button
										type="button"
										className="quiz-nav-button quiz-nav-next"
										onClick={goNext}
										disabled={!currentValue || isLoading}
									>
										{isLastStep ? 'Buscar mi café' : 'Siguiente'}
									</button>
								</div>
								{isLoading && (
									<div className="quiz-loading" role="status">
										<span className="quiz-loading-spinner" aria-hidden="true" />
										<span className="quiz-loading-text">Buscando tu café ideal…</span>
									</div>
								)}
								{apiError && <p className="quiz-error">{apiError}</p>}
							</div>
						</div>
					</>
				)}
			</Sheet>
		</>
	)
}

export default RecommendationQuiz
