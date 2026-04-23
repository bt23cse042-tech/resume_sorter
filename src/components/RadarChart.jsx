import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts'
import { useTheme } from '../contexts/ThemeContext'

const LABELS = {
  contact: 'Contact', summary: 'Summary', experience: 'Experience',
  skills: 'Skills', education: 'Education', projects: 'Projects',
}

export default function ResumeRadarChart({ sections }) {
  const { isDark } = useTheme()
  if (!sections) return null

  const data = Object.entries(sections).map(([key, val]) => ({
    subject: LABELS[key] || key,
    score: val.score,
  }))

  return (
    <div className="card" style={{ padding: '1.5rem' }}>
      <h3 style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '1rem', textAlign: 'center' }}>
        Skills Radar
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
          <PolarGrid stroke={isDark ? '#334155' : '#e2e8f0'} />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }}
          />
          <PolarRadiusAxis
            domain={[0, 100]}
            tick={{ fill: isDark ? '#64748b' : '#94a3b8', fontSize: 10 }}
          />
          <Radar
            dataKey="score"
            stroke="#06b6d4"
            fill="#06b6d4"
            fillOpacity={0.2}
            strokeWidth={2}
          />
          <Tooltip
            contentStyle={{
              background: isDark ? '#1e293b' : '#ffffff',
              border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
              borderRadius: '8px',
              fontSize: '0.85rem',
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
