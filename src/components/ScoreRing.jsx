import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function ScoreRing({ score, size = 160, strokeWidth = 10, label = 'Overall Score' }) {
  const [animatedScore, setAnimatedScore] = useState(0)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const progress = (animatedScore / 100) * circumference

  useEffect(() => {
    let frame
    const duration = 1500
    const start = performance.now()
    const animate = (now) => {
      const elapsed = now - start
      const pct = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - pct, 3) // easeOutCubic
      setAnimatedScore(Math.round(score * eased))
      if (pct < 1) frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [score])

  const getColor = (s) => {
    if (s >= 80) return 'var(--color-success-500)'
    if (s >= 60) return 'var(--color-warning-500)'
    return 'var(--color-danger-500)'
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}
    >
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* Background circle */}
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none"
            stroke="var(--border-color)"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none"
            stroke={getColor(animatedScore)}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            style={{ transition: 'stroke 0.3s ease' }}
          />
        </svg>
        {/* Center text */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{
            fontSize: size * 0.25,
            fontWeight: 800,
            color: getColor(animatedScore),
            lineHeight: 1,
          }}>
            {animatedScore}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 500 }}>/ 100</span>
        </div>
      </div>
      <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{label}</span>
    </motion.div>
  )
}
