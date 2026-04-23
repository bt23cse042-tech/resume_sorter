import { motion } from 'framer-motion'

const SECTION_LABELS = {
  contact: { label: 'Contact Info', icon: '📧' },
  summary: { label: 'Summary', icon: '📝' },
  experience: { label: 'Experience', icon: '💼' },
  skills: { label: 'Skills', icon: '🛠️' },
  education: { label: 'Education', icon: '🎓' },
  projects: { label: 'Projects', icon: '🚀' },
}

const getBadge = (score) => {
  if (score >= 80) return { text: 'Good', cls: 'badge-success' }
  if (score >= 50) return { text: 'Needs Work', cls: 'badge-warning' }
  return { text: 'Missing', cls: 'badge-danger' }
}

export default function SectionBreakdown({ sections }) {
  if (!sections) return null

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '1rem',
    }}>
      {Object.entries(sections).map(([key, data], i) => {
        const sec = SECTION_LABELS[key] || { label: key, icon: '📄' }
        const badge = getBadge(data.score)
        return (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="card"
            style={{ padding: '1.25rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.95rem' }}>
                <span>{sec.icon}</span> {sec.label}
              </span>
              <span className={`badge ${badge.cls}`}>{badge.text}</span>
            </div>
            {/* Score bar */}
            <div style={{
              height: '6px',
              borderRadius: '3px',
              background: 'var(--bg-tertiary)',
              marginBottom: '0.75rem',
              overflow: 'hidden',
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${data.score}%` }}
                transition={{ duration: 0.8, delay: i * 0.08 }}
                style={{
                  height: '100%',
                  borderRadius: '3px',
                  background: data.score >= 80
                    ? 'var(--color-success-500)'
                    : data.score >= 50
                      ? 'var(--color-warning-500)'
                      : 'var(--color-danger-500)',
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{data.score}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>/100</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {data.feedback}
            </p>
          </motion.div>
        )
      })}
    </div>
  )
}
