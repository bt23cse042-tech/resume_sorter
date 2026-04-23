import { useState } from 'react'
import { motion } from 'framer-motion'
import { useResume } from '../contexts/ResumeContext'
import { useToast } from './Toast'

const EXP_LEVELS = ['fresher', 'mid-level', 'senior']
const INDUSTRIES = ['tech', 'finance', 'marketing', 'healthcare', 'education', 'design', 'consulting', 'other']

export default function SettingsPanel({ isOpen, onClose }) {
  const { settings, updateSettings } = useResume()
  const toast = useToast()
  const [local, setLocal] = useState({ ...settings })

  const handleSave = () => {
    updateSettings(local)
    toast.success('Settings saved!')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      display: 'flex', justifyContent: 'flex-end',
    }}>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />

      {/* Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25 }}
        style={{
          position: 'relative', width: '380px', maxWidth: '90vw',
          background: 'var(--bg-secondary)', borderLeft: '1px solid var(--border-color)',
          padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1.2rem' }}>⚙️ Settings</h2>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text-tertiary)', fontSize: '1.5rem', lineHeight: 1,
          }} aria-label="Close settings">×</button>
        </div>

        {/* Target Role */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
            Target Role
          </label>
          <input
            type="text"
            value={local.targetRole}
            onChange={e => setLocal(p => ({ ...p, targetRole: e.target.value }))}
            placeholder="e.g., Software Engineer"
            style={{
              width: '100%', padding: '0.6rem 0.75rem', border: '1px solid var(--border-color)',
              borderRadius: '10px', background: 'var(--bg-primary)', color: 'var(--text-primary)',
              fontSize: '0.9rem', outline: 'none',
            }}
          />
        </div>

        {/* Target Location */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
            Target Location
          </label>
          <input
            type="text"
            value={local.targetLocation}
            onChange={e => setLocal(p => ({ ...p, targetLocation: e.target.value }))}
            placeholder="e.g., San Francisco, Remote"
            style={{
              width: '100%', padding: '0.6rem 0.75rem', border: '1px solid var(--border-color)',
              borderRadius: '10px', background: 'var(--bg-primary)', color: 'var(--text-primary)',
              fontSize: '0.9rem', outline: 'none',
            }}
          />
        </div>

        {/* Experience Level */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
            Experience Level
          </label>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {EXP_LEVELS.map(lvl => (
              <button
                key={lvl}
                onClick={() => setLocal(p => ({ ...p, experienceLevel: lvl }))}
                style={{
                  padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 500,
                  border: `1.5px solid ${local.experienceLevel === lvl ? 'var(--color-brand-500)' : 'var(--border-color)'}`,
                  background: local.experienceLevel === lvl ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
                  color: local.experienceLevel === lvl ? 'var(--color-brand-500)' : 'var(--text-secondary)',
                  cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.2s',
                }}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Industry */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
            Industry
          </label>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {INDUSTRIES.map(ind => (
              <button
                key={ind}
                onClick={() => setLocal(p => ({ ...p, industry: ind }))}
                style={{
                  padding: '0.4rem 0.75rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 500,
                  border: `1.5px solid ${local.industry === ind ? 'var(--color-accent-500)' : 'var(--border-color)'}`,
                  background: local.industry === ind ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                  color: local.industry === ind ? 'var(--color-accent-500)' : 'var(--text-secondary)',
                  cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.2s',
                }}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
          <button onClick={handleSave} className="btn-primary" style={{ width: '100%' }}>
            Save Settings
          </button>
        </div>
      </motion.div>
    </div>
  )
}
