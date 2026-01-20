import { useState, useEffect } from 'react'
import { Motion, spring } from 'react-motion'
import './App.css'

function App() {
  const [activeApp, setActiveApp] = useState(null)
  const [glowIntensity, setGlowIntensity] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [sentMessage, setSentMessage] = useState(null)
  const [showFollowUp, setShowFollowUp] = useState(false)

  const app = { id: 1, name: 'Tu Vida', color: '#34C759' }

  const handleSend = () => {
    if (inputValue.trim() && !sentMessage) {
      setSentMessage(inputValue.trim())
      setInputValue('')
      setTimeout(() => setShowFollowUp(true), 800)
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
          {activeApp ? (
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
                    {sentMessage && (
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
                              <p>{sentMessage}</p>
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

export default App
