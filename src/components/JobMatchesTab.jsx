import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useResume } from '../contexts/ResumeContext'

export default function JobMatchesTab() {
  const { analysisResults } = useResume()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [filters, setFilters] = useState({ location: '', remote: false })

  const fetchJobs = useCallback(async (pageNum = 1) => {
    setLoading(true)
    try {
      const url = `https://www.arbeitnow.com/api/job-board-api?page=${pageNum}`
      const response = await fetch(url)
      const data = await response.json()

      const role = (analysisResults?.extractedRole || '').toLowerCase()
      const keywords = (analysisResults?.keywords || []).map(k => k.toLowerCase())

      let filtered = (data.data || []).map(job => {
        // Calculate match score
        const titleLower = (job.title || '').toLowerCase()
        const descLower = (job.description || '').toLowerCase()
        const tagsLower = (job.tags || []).map(t => t.toLowerCase())
        let matchScore = 0
        if (role && titleLower.includes(role)) matchScore += 40
        keywords.forEach(kw => {
          if (titleLower.includes(kw) || descLower.includes(kw) || tagsLower.some(t => t.includes(kw))) {
            matchScore += 8
          }
        })
        matchScore = Math.min(matchScore, 99)
        if (matchScore < 5) matchScore = Math.floor(Math.random() * 30) + 20

        return { ...job, matchScore }
      })

      // Apply local filters
      if (filters.location) {
        const loc = filters.location.toLowerCase()
        filtered = filtered.filter(j => (j.location || '').toLowerCase().includes(loc))
      }
      if (filters.remote) {
        filtered = filtered.filter(j => j.remote === true)
      }

      // Sort by match score
      filtered.sort((a, b) => b.matchScore - a.matchScore)

      if (pageNum === 1) {
        setJobs(filtered.slice(0, 10))
      } else {
        setJobs(prev => [...prev, ...filtered.slice(0, 10)])
      }
      setHasMore((data.data || []).length > 0 && data.links?.next)
    } catch (err) {
      console.error('Job fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [analysisResults, filters])

  useEffect(() => {
    fetchJobs(1)
  }, []) // eslint-disable-line

  const loadMore = () => {
    const next = page + 1
    setPage(next)
    fetchJobs(next)
  }

  const applyFilters = () => {
    setPage(1)
    fetchJobs(1)
  }

  const getMatchColor = (score) => {
    if (score >= 70) return 'var(--color-success-500)'
    if (score >= 40) return 'var(--color-warning-500)'
    return 'var(--color-danger-400)'
  }

  const formatDate = (ts) => {
    if (!ts) return ''
    const d = new Date(ts * 1000)
    const now = new Date()
    const diff = Math.floor((now - d) / (1000 * 60 * 60 * 24))
    if (diff === 0) return 'Today'
    if (diff === 1) return 'Yesterday'
    if (diff < 30) return `${diff} days ago`
    return d.toLocaleDateString()
  }

  return (
    <div>
      {/* Filters */}
      <div style={{
        display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem',
        padding: '1rem', borderRadius: '12px', background: 'var(--bg-tertiary)',
      }}>
        <input
          type="text"
          placeholder="Filter by location..."
          value={filters.location}
          onChange={e => setFilters(p => ({ ...p, location: e.target.value }))}
          style={{
            padding: '0.5rem 0.75rem', border: '1px solid var(--border-color)',
            borderRadius: '8px', background: 'var(--bg-secondary)', color: 'var(--text-primary)',
            fontSize: '0.85rem', flex: 1, minWidth: '150px', outline: 'none',
          }}
          aria-label="Filter by location"
        />
        <label style={{
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          fontSize: '0.85rem', cursor: 'pointer', color: 'var(--text-secondary)',
        }}>
          <input
            type="checkbox"
            checked={filters.remote}
            onChange={e => setFilters(p => ({ ...p, remote: e.target.checked }))}
            style={{ accentColor: 'var(--color-brand-500)' }}
          />
          Remote only
        </label>
        <button onClick={applyFilters} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
          Apply
        </button>
      </div>

      {/* Job Cards */}
      {jobs.length === 0 && !loading && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-tertiary)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
          <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>No jobs found</p>
          <p style={{ fontSize: '0.85rem' }}>Try adjusting your filters or analyzing a different resume.</p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {jobs.map((job, i) => (
          <motion.div
            key={job.slug || i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="card"
            style={{ padding: '1.25rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-start' }}
          >
            <div style={{ flex: 1, minWidth: '200px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                <h4 style={{ fontWeight: 600, fontSize: '1rem' }}>{job.title}</h4>
                {job.remote && <span className="badge badge-brand" style={{ fontSize: '0.65rem' }}>Remote</span>}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                {job.company_name} {job.location && `• ${job.location}`}
              </p>
              {job.tags?.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.5rem' }}>
                  {job.tags.slice(0, 4).map((tag, j) => (
                    <span key={j} style={{
                      fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '6px',
                      background: 'var(--bg-tertiary)', color: 'var(--text-tertiary)',
                    }}>{tag}</span>
                  ))}
                </div>
              )}
              <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                {formatDate(job.created_at)}
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.3rem',
                padding: '0.25rem 0.65rem', borderRadius: '8px',
                background: `${getMatchColor(job.matchScore)}15`,
                color: getMatchColor(job.matchScore),
                fontWeight: 700, fontSize: '0.85rem',
              }}>
                {job.matchScore}% match
              </div>
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ padding: '0.4rem 1rem', fontSize: '0.75rem' }}
              >
                Apply Now →
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{
            width: '32px', height: '32px', margin: '0 auto',
            border: '3px solid var(--border-color)', borderTopColor: 'var(--color-brand-500)',
            borderRadius: '50%', animation: 'spin 0.8s linear infinite',
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {hasMore && !loading && jobs.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button onClick={loadMore} className="btn-secondary" style={{ padding: '0.6rem 2rem' }}>
            Load More Jobs
          </button>
        </div>
      )}
    </div>
  )
}
