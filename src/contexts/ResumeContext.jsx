import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const ResumeContext = createContext()

const DEFAULT_SETTINGS = {
  targetRole: '',
  targetLocation: '',
  experienceLevel: 'fresher',
  industry: 'tech',
}

export function ResumeProvider({ children }) {
  const [resumeText, setResumeText] = useState('')
  const [fileName, setFileName] = useState('')
  const [analysisResults, setAnalysisResults] = useState(null)
  const [jobMatches, setJobMatches] = useState([])
  const [chatHistory, setChatHistory] = useState([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isLoadingJobs, setIsLoadingJobs] = useState(false)
  const [settings, setSettings] = useState(() => {
    const stored = localStorage.getItem('resumeai-settings')
    return stored ? JSON.parse(stored) : DEFAULT_SETTINGS
  })

  // Persist settings
  useEffect(() => {
    localStorage.setItem('resumeai-settings', JSON.stringify(settings))
  }, [settings])

  // Clear data on tab close for privacy
  useEffect(() => {
    const handleBeforeUnload = () => {
      setResumeText('')
      setAnalysisResults(null)
      setJobMatches([])
      setChatHistory([])
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  const updateSettings = useCallback((updates) => {
    setSettings(prev => ({ ...prev, ...updates }))
  }, [])

  const clearAll = useCallback(() => {
    setResumeText('')
    setFileName('')
    setAnalysisResults(null)
    setJobMatches([])
    setChatHistory([])
  }, [])

  const addChatMessage = useCallback((message) => {
    setChatHistory(prev => [...prev, message])
  }, [])

  return (
    <ResumeContext.Provider value={{
      resumeText, setResumeText,
      fileName, setFileName,
      analysisResults, setAnalysisResults,
      jobMatches, setJobMatches,
      chatHistory, setChatHistory, addChatMessage,
      isAnalyzing, setIsAnalyzing,
      isLoadingJobs, setIsLoadingJobs,
      settings, updateSettings,
      clearAll,
    }}>
      {children}
    </ResumeContext.Provider>
  )
}

export function useResume() {
  const context = useContext(ResumeContext)
  if (!context) throw new Error('useResume must be used within ResumeProvider')
  return context
}
