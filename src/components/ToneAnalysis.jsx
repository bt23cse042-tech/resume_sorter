import { motion } from 'framer-motion'

export default function ToneAnalysis({ toneAnalysis }) {
  if (!toneAnalysis) return null
  const { passiveVoicePercent, weakVerbs, strongVerbSuggestions, fillerWordCount, fillerWords } = toneAnalysis

  return (
    <div className="card" style={{ padding: '1.5rem' }}>
      <h3 style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        ✍️ Tone & Language
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
        {/* Passive voice */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Passive Voice</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: passiveVoicePercent > 30 ? 'var(--color-danger-500)' : 'var(--color-success-500)' }}>
              {passiveVoicePercent}%
            </span>
          </div>
          <div style={{ height: '6px', borderRadius: '3px', background: 'var(--bg-tertiary)', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${passiveVoicePercent}%` }}
              transition={{ duration: 0.8 }}
              style={{
                height: '100%', borderRadius: '3px',
                background: passiveVoicePercent > 30 ? 'var(--color-danger-500)' : 'var(--color-success-500)',
              }}
            />
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.3rem' }}>
            {passiveVoicePercent > 30 ? 'Too much passive voice — use active voice' : 'Good use of active voice'}
          </p>
        </div>

        {/* Filler words */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Filler Words</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: fillerWordCount > 5 ? 'var(--color-warning-500)' : 'var(--color-success-500)' }}>
              {fillerWordCount} found
            </span>
          </div>
          {fillerWords?.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.3rem' }}>
              {fillerWords.map((w, i) => (
                <span key={i} className="badge badge-warning" style={{ fontSize: '0.7rem' }}>{w}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Verb comparison */}
      <div style={{ marginTop: '1.25rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-danger-500)', marginBottom: '0.4rem' }}>
            ✗ Weak Verbs Found
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
            {(weakVerbs || []).map((v, i) => (
              <span key={i} className="badge badge-danger" style={{ fontSize: '0.7rem' }}>{v}</span>
            ))}
          </div>
        </div>
        <div>
          <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-success-500)', marginBottom: '0.4rem' }}>
            ✓ Use These Instead
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
            {(strongVerbSuggestions || []).map((v, i) => (
              <span key={i} className="badge badge-success" style={{ fontSize: '0.7rem' }}>{v}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
