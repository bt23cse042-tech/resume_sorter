import { motion } from 'framer-motion'

export default function StrengthsWeaknesses({ strengths, weaknesses }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
      {/* Strengths */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: 'var(--color-success-500)' }}>✦</span> Strengths
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {(strengths || []).map((s, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}
            >
              <span style={{ color: 'var(--color-success-500)', flexShrink: 0, marginTop: '2px' }}>✓</span>
              {s}
            </motion.li>
          ))}
        </ul>
      </div>
      {/* Weaknesses */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: 'var(--color-danger-500)' }}>⚠</span> Areas to Improve
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {(weaknesses || []).map((w, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}
            >
              <span style={{ color: 'var(--color-danger-500)', flexShrink: 0, marginTop: '2px' }}>✗</span>
              {w}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  )
}
