import { motion } from 'framer-motion'
import ScoreRing from './ScoreRing'

export default function ATSScore({ atsScore, atsFlags }) {
  return (
    <div className="card" style={{ padding: '1.5rem' }}>
      <h3 style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        🤖 ATS Compatibility
      </h3>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <ScoreRing score={atsScore || 0} size={100} strokeWidth={8} label="ATS Score" />
        <div style={{ flex: 1, minWidth: '200px' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
            {atsScore >= 80 ? 'Your resume is well-optimized for ATS systems.' :
             atsScore >= 60 ? 'Your resume needs some improvements for ATS.' :
             'Your resume may have issues with ATS systems.'}
          </p>
          {atsFlags?.length > 0 && (
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {atsFlags.map((flag, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    display: 'flex', gap: '0.5rem', fontSize: '0.8rem',
                    color: 'var(--text-secondary)', lineHeight: 1.5,
                  }}
                >
                  <span style={{ color: 'var(--color-warning-500)', flexShrink: 0 }}>⚡</span>
                  {flag}
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
