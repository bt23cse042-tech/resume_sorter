import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import { useResume } from '../contexts/ResumeContext'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const { analysisResults } = useResume()
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isLanding = location.pathname === '/'

  const scrollTo = (id) => {
    setMobileOpen(false)
    if (!isLanding) {
      navigate('/')
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="glass-strong" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: '0 1.5rem',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      {/* Logo */}
      <Link to="/" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        textDecoration: 'none',
        color: 'var(--text-primary)',
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, var(--color-brand-500), var(--color-accent-500))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="9" y1="15" x2="15" y2="15"/>
            <line x1="9" y1="11" x2="15" y2="11"/>
          </svg>
        </div>
        <span style={{ fontWeight: 800, fontSize: '1.15rem' }}>
          Resume<span className="gradient-text">AI</span>
        </span>
      </Link>

      {/* Desktop Nav */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
      }} className="nav-links-desktop">
        {isLanding && (
          <>
            <NavBtn onClick={() => scrollTo('features')}>Features</NavBtn>
            <NavBtn onClick={() => scrollTo('how-it-works')}>How It Works</NavBtn>
            <NavBtn onClick={() => scrollTo('testimonials')}>Reviews</NavBtn>
          </>
        )}
        {analysisResults && (
          <NavBtn onClick={() => navigate('/results')}>Results</NavBtn>
        )}
        <NavBtn onClick={() => navigate('/privacy')}>Privacy</NavBtn>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{
            background: 'none',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-secondary)',
            transition: 'all 0.2s ease',
            marginLeft: '0.5rem',
          }}
        >
          <motion.div
            key={isDark ? 'moon' : 'sun'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isDark ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </motion.div>
        </button>

        <Link to="/upload" className="btn-primary" style={{ marginLeft: '0.75rem', padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
          Get Started
        </Link>
      </div>

      {/* Mobile Hamburger */}
      <div className="nav-mobile-toggle" style={{ display: 'none' }}>
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          style={{
            background: 'none',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-secondary)',
            marginRight: '0.5rem',
          }}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          style={{
            background: 'none',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-primary)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-strong"
            style={{
              position: 'absolute',
              top: '64px',
              left: 0,
              right: 0,
              padding: '1rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              borderTop: '1px solid var(--border-color)',
            }}
          >
            {isLanding && (
              <>
                <NavBtn onClick={() => scrollTo('features')} mobile>Features</NavBtn>
                <NavBtn onClick={() => scrollTo('how-it-works')} mobile>How It Works</NavBtn>
                <NavBtn onClick={() => scrollTo('testimonials')} mobile>Reviews</NavBtn>
              </>
            )}
            <NavBtn onClick={() => { navigate('/privacy'); setMobileOpen(false) }} mobile>Privacy</NavBtn>
            <Link
              to="/upload"
              className="btn-primary"
              style={{ marginTop: '0.5rem', textAlign: 'center' }}
              onClick={() => setMobileOpen(false)}
            >
              Get Started
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}

function NavBtn({ onClick, children, mobile }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        color: 'var(--text-secondary)',
        fontSize: '0.9rem',
        fontWeight: 500,
        cursor: 'pointer',
        padding: mobile ? '0.75rem 0' : '0.5rem 0.75rem',
        borderRadius: '8px',
        transition: 'color 0.2s',
        textAlign: mobile ? 'left' : 'center',
      }}
      onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
      onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
    >
      {children}
    </button>
  )
}
