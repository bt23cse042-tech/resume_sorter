import { useState } from 'react'
import { motion } from 'framer-motion'
import { useToast } from './Toast'

const CAT_COLORS = {
  Content: '#06b6d4', Format: '#8b5cf6', Keywords: '#22c55e',
  Impact: '#f59e0b', Structure: '#ef4444',
}

export default function SuggestionsList({ suggestions }) {
  const toast = useToast()

  const copyOne = (text) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  const copyAll = () => {
    const all = (suggestions || []).map((s, i) => `${i + 1}. [${s.category}] ${s.text}`).join('\n')
    navigator.clipboard.writeText(all)
    toast.success('All suggestions copied!')
  }

  if (!suggestions?.length) return null

  return (
    <div className="card" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontWeight: 600, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          💡 Actionable Suggestions
        </h3>
        <button onClick={copyAll} className="btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}>
          Copy All
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {suggestions.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            style={{
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'flex-start',
              padding: '0.75rem',
              borderRadius: '10px',
              background: 'var(--bg-tertiary)',
            }}
          >
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 600,
              color: 'var(--text-tertiary)', minWidth: '24px', marginTop: '2px',
            }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <div style={{ flex: 1 }}>
              <span className="badge" style={{
                background: `${CAT_COLORS[s.category] || '#06b6d4'}15`,
                color: CAT_COLORS[s.category] || '#06b6d4',
                border: `1px solid ${CAT_COLORS[s.category] || '#06b6d4'}30`,
                marginBottom: '0.4rem',
              }}>
                {s.category}
              </span>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: '0.3rem' }}>
                {s.text}
              </p>
            </div>
            <button
              onClick={() => copyOne(s.text)}
              style={{
                background: 'none', border: 'none', color: 'var(--text-tertiary)',
                cursor: 'pointer', padding: '4px', flexShrink: 0, marginTop: '2px',
              }}
              title="Copy suggestion"
              aria-label={`Copy suggestion ${i + 1}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
