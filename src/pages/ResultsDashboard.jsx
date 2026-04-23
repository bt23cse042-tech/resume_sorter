import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { useResume } from '../contexts/ResumeContext'
import { useToast } from '../components/Toast'
import { analyzeResume } from '../utils/geminiClient'
import SkeletonLoader from '../components/SkeletonLoader'
import ScoreRing from '../components/ScoreRing'
import SectionBreakdown from '../components/SectionBreakdown'
import ResumeRadarChart from '../components/RadarChart'
import StrengthsWeaknesses from '../components/StrengthsWeaknesses'
import SuggestionsList from '../components/SuggestionsList'
import ATSScore from '../components/ATSScore'
import KeywordCloud from '../components/KeywordCloud'
import ToneAnalysis from '../components/ToneAnalysis'
import JobMatchesTab from '../components/JobMatchesTab'
import ExportButtons from '../components/ExportButtons'
import SettingsPanel from '../components/SettingsPanel'

export default function ResultsDashboard() {
  const navigate = useNavigate()
  const toast = useToast()
  const {
    resumeText, analysisResults, setAnalysisResults,
    isAnalyzing, setIsAnalyzing, settings,
  } = useResume()

  const [activeTab, setActiveTab] = useState('analysis')
  const [settingsOpen, setSettingsOpen] = useState(false)

  const runAnalysis = useCallback(async () => {
    if (!resumeText) return
    setIsAnalyzing(true)
    try {
      const results = await analyzeResume(resumeText, settings)
      setAnalysisResults(results)
      if (results.overallScore >= 80) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
        toast.success('🎉 Great resume! Score above 80!')
      }
    } catch (err) {
      toast.error(err.message || 'Analysis failed. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }, [resumeText, settings, setAnalysisResults, setIsAnalyzing, toast])

  useEffect(() => {
    if (!resumeText) {
      navigate('/upload')
      return
    }
    if (!analysisResults && !isAnalyzing) {
      runAnalysis()
    }
  }, []) // eslint-disable-line

  const TABS = [
    { id: 'analysis', label: '📊 Analysis' },
    { id: 'jobs', label: '💼 Job Matches' },
    { id: 'suggestions', label: '💡 Suggestions' },
  ]

  return (
    <div style={{ paddingTop: '64px', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem',
          }}
        >
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Your <span className="gradient-text">Results</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {analysisResults?.extractedRole && `Detected role: ${analysisResults.extractedRole}`}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setSettingsOpen(true)}
              className="btn-secondary"
              style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
            >
              ⚙️ Settings
            </button>
            <button
              onClick={runAnalysis}
              className="btn-secondary"
              disabled={isAnalyzing}
              style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', opacity: isAnalyzing ? 0.5 : 1 }}
            >
              🔄 Re-analyze
            </button>
          </div>
        </motion.div>

        {isAnalyzing ? (
          <SkeletonLoader />
        ) : analysisResults ? (
          <>
            {/* Tabs */}
            <div style={{
              display: 'flex', borderBottom: '1px solid var(--border-color)',
              marginBottom: '2rem', overflowX: 'auto',
            }}>
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Analysis Tab */}
            {activeTab === 'analysis' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
              >
                {/* Score + Radar */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1.5rem',
                  alignItems: 'start',
                }}>
                  <div className="card" style={{
                    padding: '2rem', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: '1.5rem',
                  }}>
                    <ScoreRing score={analysisResults.overallScore} />
                    <ExportButtons />
                  </div>
                  <ResumeRadarChart sections={analysisResults.sections} />
                </div>

                <SectionBreakdown sections={analysisResults.sections} />
                <StrengthsWeaknesses
                  strengths={analysisResults.strengths}
                  weaknesses={analysisResults.weaknesses}
                />
                <ATSScore
                  atsScore={analysisResults.atsScore}
                  atsFlags={analysisResults.atsFlags}
                />
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1.5rem',
                }}>
                  <KeywordCloud keywords={analysisResults.keywords} />
                  <ToneAnalysis toneAnalysis={analysisResults.toneAnalysis} />
                </div>
              </motion.div>
            )}

            {/* Jobs Tab */}
            {activeTab === 'jobs' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <JobMatchesTab />
              </motion.div>
            )}

            {/* Suggestions Tab */}
            {activeTab === 'suggestions' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <SuggestionsList suggestions={analysisResults.suggestions} />
              </motion.div>
            )}
          </>
        ) : null}
      </div>

      <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  )
}
