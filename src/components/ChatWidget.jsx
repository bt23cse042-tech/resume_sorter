import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useResume } from '../contexts/ResumeContext'
import { chatWithAI } from '../utils/geminiClient'

const SUGGESTIONS = [
  'Rewrite my summary section',
  'Give me better bullet points for my experience',
  'What skills should I add?',
  'How can I improve my ATS score?',
]

export default function ChatWidget() {
  const { resumeText, analysisResults, chatHistory, addChatMessage } = useResume()
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [displayedResponse, setDisplayedResponse] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatHistory, displayedResponse])

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus()
  }, [isOpen])

  const typeResponse = (text) => {
    setIsTyping(true)
    let i = 0
    setDisplayedResponse('')
    const interval = setInterval(() => {
      setDisplayedResponse(text.slice(0, i + 1))
      i++
      if (i >= text.length) {
        clearInterval(interval)
        setIsTyping(false)
        addChatMessage({ role: 'assistant', content: text })
        setDisplayedResponse('')
      }
    }, 15)
  }

  const sendMessage = async (msg) => {
    const text = msg || input.trim()
    if (!text || isLoading) return
    setInput('')
    addChatMessage({ role: 'user', content: text })
    setIsLoading(true)

    try {
      const response = await chatWithAI(resumeText, analysisResults, chatHistory, text)
      typeResponse(response)
    } catch (err) {
      addChatMessage({ role: 'assistant', content: `Error: ${err.message}` })
    } finally {
      setIsLoading(false)
    }
  }

  if (!resumeText) return null

  return (
    <>
      {/* Floating button */}
      <button
        className="chat-bubble-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open resume assistant'}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass-strong"
            style={{
              position: 'fixed', bottom: '92px', right: '24px',
              width: '380px', maxWidth: 'calc(100vw - 48px)',
              height: '500px', maxHeight: 'calc(100vh - 140px)',
              borderRadius: '16px', display: 'flex', flexDirection: 'column',
              zIndex: 999, overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1rem 1.25rem', borderBottom: '1px solid var(--border-color)',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: 'linear-gradient(135deg, var(--color-brand-500), var(--color-accent-500))',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.9rem',
              }}>🤖</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Resume Assistant</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-success-500)' }}>● Online</div>
              </div>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1, overflowY: 'auto', padding: '1rem',
              display: 'flex', flexDirection: 'column', gap: '0.75rem',
            }}>
              {chatHistory.length === 0 && !displayedResponse && (
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    Ask me anything about improving your resume!
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {SUGGESTIONS.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => sendMessage(s)}
                        style={{
                          padding: '0.5rem 0.75rem', border: '1px solid var(--border-color)',
                          borderRadius: '8px', background: 'var(--bg-secondary)', color: 'var(--text-secondary)',
                          cursor: 'pointer', fontSize: '0.8rem', textAlign: 'left', transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => { e.target.style.borderColor = 'var(--color-brand-500)'; e.target.style.color = 'var(--color-brand-500)' }}
                        onMouseLeave={e => { e.target.style.borderColor = 'var(--border-color)'; e.target.style.color = 'var(--text-secondary)' }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {chatHistory.map((msg, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}>
                  <div style={{
                    maxWidth: '85%', padding: '0.6rem 0.85rem', borderRadius: '12px',
                    fontSize: '0.85rem', lineHeight: 1.5, whiteSpace: 'pre-wrap',
                    background: msg.role === 'user'
                      ? 'linear-gradient(135deg, var(--color-brand-500), var(--color-accent-500))'
                      : 'var(--bg-tertiary)',
                    color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
                  }}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {(isLoading || isTyping) && displayedResponse && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div style={{
                    maxWidth: '85%', padding: '0.6rem 0.85rem', borderRadius: '12px',
                    fontSize: '0.85rem', lineHeight: 1.5, whiteSpace: 'pre-wrap',
                    background: 'var(--bg-tertiary)', color: 'var(--text-primary)',
                  }}>
                    {displayedResponse}
                    <span style={{ opacity: 0.5, animation: 'blink 1s infinite' }}>▊</span>
                  </div>
                </div>
              )}

              {isLoading && !displayedResponse && (
                <div style={{ display: 'flex', gap: '0.3rem', padding: '0.5rem' }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{
                      width: '8px', height: '8px', borderRadius: '50%',
                      background: 'var(--color-brand-500)', opacity: 0.5,
                      animation: `bounce 1.2s ${i * 0.2}s infinite`,
                    }} />
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{
              padding: '0.75rem 1rem', borderTop: '1px solid var(--border-color)',
              display: 'flex', gap: '0.5rem',
            }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') sendMessage() }}
                placeholder="Ask about your resume..."
                disabled={isLoading || isTyping}
                style={{
                  flex: 1, padding: '0.5rem 0.75rem', border: '1px solid var(--border-color)',
                  borderRadius: '8px', background: 'var(--bg-secondary)', color: 'var(--text-primary)',
                  fontSize: '0.85rem', outline: 'none',
                }}
                aria-label="Chat message input"
              />
              <button
                onClick={() => sendMessage()}
                disabled={isLoading || isTyping || !input.trim()}
                className="btn-primary"
                style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem', opacity: (isLoading || !input.trim()) ? 0.5 : 1 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </>
  )
}
