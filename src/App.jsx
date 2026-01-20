import { useState, useEffect, useRef } from 'react'
import { Motion, spring } from 'react-motion'
import './App.css'

function App() {
  const [activeApp, setActiveApp] = useState(null)
  const [glowIntensity, setGlowIntensity] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [ageAnswer, setAgeAnswer] = useState(null)
  const [hoursAnswer, setHoursAnswer] = useState(null)
  const [showFollowUp, setShowFollowUp] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)

  const app = { id: 1, name: 'Tu Vida', color: '#34C759' }

  const scenarios = [
    {
      hoursSavedPerDay: 1,
      timeframes: [
        { label: '1 semana', hoursGained: 7, message: 'Eso es lo que tardó J.K. Rowling en escribir el primer capítulo de Harry Potter.' },
        { label: '1 mes', hoursGained: 30, message: 'Eso es lo que tardó Mozart en componer una sinfonía completa.' },
        { label: '1 año', hoursGained: 365, message: 'Eso es lo que tardó Van Gogh en pintar "La noche estrellada".' },
        { label: '5 años', hoursGained: 1825, message: 'Eso es lo que tardó Darwin en desarrollar la teoría de la evolución.' },
      ],
    },
    {
      hoursSavedPerDay: 2,
      timeframes: [
        { label: '1 semana', hoursGained: 14, message: 'Eso es lo que tardaron los hermanos Wright en lograr el primer vuelo exitoso.' },
        { label: '1 mes', hoursGained: 60, message: 'Eso es lo que tardó Hemingway en escribir "El viejo y el mar".' },
        { label: '1 año', hoursGained: 730, message: 'Eso es lo que tardaron los Beatles en grabar "Sgt. Pepper\'s".' },
        { label: '5 años', hoursGained: 3650, message: 'Eso es lo que tardó Miguel Ángel en pintar la Capilla Sixtina.' },
      ],
    },
    {
      hoursSavedPerDay: 3,
      timeframes: [
        { label: '1 semana', hoursGained: 21, message: 'Eso es lo que tardó Steve Jobs en preparar la presentación del iPhone.' },
        { label: '1 mes', hoursGained: 90, message: 'Eso es lo que tardaron los Beatles en grabar "Please Please Me".' },
        { label: '1 año', hoursGained: 1095, message: 'Eso es lo que tardó J.K. Rowling en escribir el primer Harry Potter.' },
        { label: '5 años', hoursGained: 5475, message: 'Eso es lo que tardó Beethoven en componer sus 9 sinfonías.' },
      ],
    },
    {
      hoursSavedPerDay: 4,
      timeframes: [
        { label: '1 semana', hoursGained: 28, message: 'Eso es lo que tardó Lin-Manuel Miranda en escribir "My Shot" de Hamilton.' },
        { label: '1 mes', hoursGained: 120, message: 'Eso es lo que tardó Frida Kahlo en pintar "Las dos Fridas".' },
        { label: '1 año', hoursGained: 1460, message: 'Eso es lo que tardó Picasso en crear su Período Azul.' },
        { label: '5 años', hoursGained: 7300, message: 'Eso es lo que tardó Leonardo da Vinci en perfeccionar "La Mona Lisa".' },
      ],
    },
    {
      hoursSavedPerDay: 5,
      timeframes: [
        { label: '1 semana', hoursGained: 35, message: 'Eso es lo que tardó Jack Dorsey en crear el primer prototipo de Twitter.' },
        { label: '1 mes', hoursGained: 150, message: 'Eso es lo que tardó Spielberg en filmar "E.T.".' },
        { label: '1 año', hoursGained: 1825, message: 'Eso es lo que tardó Cervantes en escribir "Don Quijote".' },
        { label: '5 años', hoursGained: 9125, message: 'Eso es lo que tardó Tolkien en escribir "El Señor de los Anillos".' },
      ],
    },
  ]

  const getScenario = () => {
    const hours = Math.min(5, Math.max(1, Math.round(parseFloat(hoursAnswer) || 1)))
    return scenarios.find((s) => s.hoursSavedPerDay === hours) || scenarios[0]
  }

  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  ]

  const timeLabels = ['semana', 'mes', 'año', '5 años']
  const timeEmojis = ['📅', '⏳', '👴', '🌟']

  const getCards = () => {
    const scenario = getScenario()
    const hours = parseFloat(hoursAnswer) || 0
    const age = parseFloat(ageAnswer) || 0
    const yearsRemaining = Math.max(0, 80 - age)
    const totalHoursOnPhone = yearsRemaining * 365 * hours
    const yearsLost = (totalHoursOnPhone / (24 * 365)).toFixed(1)

    return [
      {
        id: 1,
        title: 'Tu Vida',
        gradient: gradients[0],
        content: 'stats',
      },
      ...scenario.timeframes.map((tf, index) => ({
        id: index + 2,
        title: tf.label,
        gradient: gradients[index + 1] || gradients[index % gradients.length],
        content: 'timeframe',
        hoursGained: tf.hoursGained,
        message: tf.message,
        timeLabel: timeLabels[index],
        emoji: timeEmojis[index],
      })),
      {
        id: 7,
        title: 'Tu Futuro',
        gradient: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
        content: 'final',
        yearsRemaining,
        yearsLost,
      },
    ]
  }

  const cards = getCards()

  const handleNextCard = () => {
    setCurrentCardIndex((prev) => prev + 1)
  }

  const handleSend = () => {
    if (inputValue.trim()) {
      if (!ageAnswer) {
        setAgeAnswer(inputValue.trim())
        setInputValue('')
        setTimeout(() => setShowFollowUp(true), 800)
      } else if (!hoursAnswer) {
        setHoursAnswer(inputValue.trim())
        setInputValue('')
        setTimeout(() => setShowCard(true), 800)
      }
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity((prev) => (prev === 0 ? 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="app">
      <div className="phone">
        <div className="phone-notch"></div>
        <div className="phone-screen">
          {showCard && currentCardIndex < cards.length ? (
            <SwipeableCard
              key={currentCardIndex}
              card={cards[currentCardIndex]}
              ageAnswer={ageAnswer}
              hoursAnswer={hoursAnswer}
              onDismiss={handleNextCard}
            />
          ) : activeApp ? (
            <Motion
              defaultStyle={{ opacity: 0, y: 20 }}
              style={{
                opacity: spring(1),
                y: spring(0, { stiffness: 300, damping: 20 }),
              }}
            >
              {({ opacity, y }) => (
                <div className="chat-view">
                  <div className="chat-header">
                    <button className="back-arrow" onClick={() => setActiveApp(null)}>
                      ‹
                    </button>
                    <span className="chat-title">Tu Vida</span>
                  </div>
                  <div className="chat-messages">
                    <div
                      className="message received"
                      style={{
                        opacity,
                        transform: `translateY(${y}px)`,
                      }}
                    >
                      <p>¿Cuántos años tienes?</p>
                    </div>
                    {ageAnswer && (
                      <>
                        <Motion
                          defaultStyle={{ scale: 0.3, opacity: 0 }}
                          style={{
                            scale: spring(1, { stiffness: 400, damping: 10 }),
                            opacity: spring(1),
                          }}
                        >
                          {(style) => (
                            <div
                              className="message sent"
                              style={{
                                transform: `scale(${style.scale})`,
                                opacity: style.opacity,
                              }}
                            >
                              <p>{ageAnswer}</p>
                            </div>
                          )}
                        </Motion>
                        {showFollowUp && (
                          <Motion
                            defaultStyle={{ scale: 0.3, opacity: 0 }}
                            style={{
                              scale: spring(1, { stiffness: 400, damping: 10 }),
                              opacity: spring(1),
                            }}
                          >
                            {(style) => (
                              <div
                                className="message received"
                                style={{
                                  transform: `scale(${style.scale})`,
                                  opacity: style.opacity,
                                  marginTop: '12px',
                                }}
                              >
                                <p>¿Y cuántas horas estás por tu móvil por día? (Sea honesto, todos somos amigos aquí.)</p>
                              </div>
                            )}
                          </Motion>
                        )}
                        {hoursAnswer && (
                          <Motion
                            defaultStyle={{ scale: 0.3, opacity: 0 }}
                            style={{
                              scale: spring(1, { stiffness: 400, damping: 10 }),
                              opacity: spring(1),
                            }}
                          >
                            {(style) => (
                              <div
                                className="message sent"
                                style={{
                                  transform: `scale(${style.scale})`,
                                  opacity: style.opacity,
                                  marginTop: '12px',
                                }}
                              >
                                <p>{hoursAnswer}</p>
                              </div>
                            )}
                          </Motion>
                        )}
                      </>
                    )}
                  </div>
                  <div className="chat-input">
                    <input
                      type="text"
                      placeholder="Mensaje"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button className="send-btn" onClick={handleSend}>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </Motion>
          ) : (
            <div className="home-screen">
              <div className="time">9:41</div>
              <div className="app-container">
                <Motion
                  style={{
                    glow: spring(glowIntensity, { stiffness: 120, damping: 14 }),
                  }}
                >
                  {({ glow }) => (
                    <button
                      className="app-icon"
                      style={{
                        background: app.color,
                        boxShadow: `0 0 ${20 + glow * 25}px ${5 + glow * 10}px rgba(52, 199, 89, ${0.3 + glow * 0.4})`,
                      }}
                      onClick={() => setActiveApp(app)}
                    >
                      <span>{app.name}</span>
                    </button>
                  )}
                </Motion>
              </div>
              <div className="home-indicator"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function SwipeableCard({ card, ageAnswer, hoursAnswer, onDismiss }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const [dismissed, setDismissed] = useState(false)
  const [dismissDirection, setDismissDirection] = useState(null)
  const dragStartTime = useRef(0)

  const hours = parseFloat(hoursAnswer) || 0
  const age = parseFloat(ageAnswer) || 0
  const daysPerYear = Math.round((hours * 365) / 24)
  const lifeExpectancy = 80
  const yearsOnPhone = Math.round(((lifeExpectancy - age) * hours) / 24)

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y })
    dragStartTime.current = Date.now()
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    setPosition({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y,
    })
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    setIsDragging(false)

    const dragDuration = Date.now() - dragStartTime.current
    const distance = Math.sqrt(position.x ** 2 + position.y ** 2)

    // Quick click - slide away vertically
    if (dragDuration < 200 && distance < 10) {
      setDismissDirection('up')
      setDismissed(true)
      setTimeout(onDismiss, 300)
      return
    }

    // Flick away if moved far enough
    if (Math.abs(position.x) > 100 || Math.abs(position.y) > 150) {
      setDismissDirection(position.y < 0 ? 'up' : position.x > 0 ? 'right' : 'left')
      setDismissed(true)
      setTimeout(onDismiss, 300)
    } else {
      setPosition({ x: 0, y: 0 })
    }
  }

  const handleTouchStart = (e) => {
    const touch = e.touches[0]
    setIsDragging(true)
    setStartPos({ x: touch.clientX - position.x, y: touch.clientY - position.y })
    dragStartTime.current = Date.now()
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    const touch = e.touches[0]
    setPosition({
      x: touch.clientX - startPos.x,
      y: touch.clientY - startPos.y,
    })
  }

  const handleTouchEnd = handleMouseUp

  const getDismissTarget = () => {
    switch (dismissDirection) {
      case 'up': return { x: 0, y: -800 }
      case 'right': return { x: 500, y: position.y }
      case 'left': return { x: -500, y: position.y }
      default: return { x: 0, y: -800 }
    }
  }

  const target = dismissed ? getDismissTarget() : position

  const formatMessage = (msg) => {
    return msg
      .replace('{hours}', daysPerYear)
      .replace('{years}', yearsOnPhone)
  }

  const renderCardContent = () => {
    switch (card.content) {
      case 'stats':
        return (
          <div className="card-stats">
            <div className="stat">
              <span className="stat-value">{ageAnswer}</span>
              <span className="stat-label">años</span>
            </div>
            <div className="stat">
              <span className="stat-value">{hoursAnswer}</span>
              <span className="stat-label">horas/día</span>
            </div>
          </div>
        )
      case 'timeframe':
        return (
          <div className="card-timeframe">
            <span className="card-emoji">{card.emoji}</span>
            <p className="card-time">
              {hoursAnswer} horas al día, eso es <strong>{card.hoursGained} horas por {card.timeLabel}</strong>
            </p>
            <p className="card-action">{card.message}</p>
          </div>
        )
      case 'final':
        return (
          <div className="card-final">
            <span className="card-emoji">💀</span>
            <p className="card-final-intro">Si vives hasta los 80 años, te quedan {card.yearsRemaining} años.</p>
            <p className="card-final-stat">
              <span className="years-lost">{card.yearsLost}</span>
              <span className="years-label">años</span>
            </p>
            <p className="card-final-message">Es el tiempo que perderás mirando tu móvil si no cambias este hábito.</p>
          </div>
        )
      default:
        return (
          <p className="card-message">{formatMessage(card.message)}</p>
        )
    }
  }

  return (
    <Motion
      defaultStyle={{ x: 0, y: 0, scale: 0.8, opacity: 0 }}
      style={{
        x: isDragging ? position.x : spring(target.x, { stiffness: 300, damping: 25 }),
        y: isDragging ? position.y : spring(target.y, { stiffness: 300, damping: 25 }),
        scale: spring(dismissed ? 0.8 : 1, { stiffness: 300, damping: 20 }),
        opacity: spring(dismissed ? 0 : 1),
      }}
    >
      {({ x, y, scale, opacity }) => (
        <div
          className="swipeable-card"
          style={{
            transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${x * 0.05}deg)`,
            opacity,
            cursor: isDragging ? 'grabbing' : 'grab',
            background: card.gradient,
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {card.content !== 'timeframe' && <h2>{card.title}</h2>}
          {renderCardContent()}
          <p className="card-hint">Toca o desliza para continuar</p>
        </div>
      )}
    </Motion>
  )
}

export default App
