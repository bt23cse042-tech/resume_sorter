import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFoundPage() {
  return (
    <div style={{
      paddingTop: '64px', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem 1.5rem', textAlign: 'center',
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ fontSize: '6rem', marginBottom: '1rem' }} className="animate-float">
          🔍
        </div>
        <h1 style={{
          fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 900,
          lineHeight: 1, marginBottom: '1rem',
        }}>
          <span className="gradient-text">404</span>
        </h1>
        <p style={{
          fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem',
        }}>
          This page ghosted you
        </p>
        <p style={{
          color: 'var(--text-secondary)', fontSize: '1rem',
          marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem',
        }}>
          Just like that recruiter who said they'd "get back to you."
          Let's get you back on track.
        </p>
        <Link to="/" className="btn-primary" style={{ fontSize: '1rem', padding: '0.75rem 2rem' }}>
          ← Back to Home
        </Link>
      </motion.div>
    </div>
  )
}
