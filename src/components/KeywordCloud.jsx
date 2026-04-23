import { motion } from 'framer-motion'

export default function KeywordCloud({ keywords }) {
  if (!keywords?.length) return null

  return (
    <div className="card" style={{ padding: '1.5rem' }}>
      <h3 style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        🏷️ Detected Keywords
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {keywords.map((kw, i) => (
          <motion.span
            key={kw}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
            className="keyword-tag"
            style={{ fontSize: `${0.75 + Math.random() * 0.3}rem` }}
          >
            {kw}
          </motion.span>
        ))}
      </div>
    </div>
  )
}
