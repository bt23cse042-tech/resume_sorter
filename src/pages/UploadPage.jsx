import { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useResume } from '../contexts/ResumeContext'
import { useToast } from '../components/Toast'
import { extractTextFromPDF } from '../utils/pdfParser'
import { extractTextFromDOCX } from '../utils/docxParser'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_TYPES = {
  'application/pdf': 'PDF',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
}

export default function UploadPage() {
  const { resumeText, setResumeText, setFileName } = useResume()
  const navigate = useNavigate()
  const toast = useToast()
  const fileInputRef = useRef(null)

  const [dragOver, setDragOver] = useState(false)
  const [isParsing, setIsParsing] = useState(false)
  const [parsedText, setParsedText] = useState(resumeText || '')
  const [showPaste, setShowPaste] = useState(false)
  const [pasteText, setPasteText] = useState('')
  const [currentFileName, setCurrentFileName] = useState('')

  const handleFile = useCallback(async (file) => {
    // Validate type
    if (!ACCEPTED_TYPES[file.type]) {
      toast.error('Please upload a PDF or DOCX file.')
      return
    }
    // Validate size
    if (file.size > MAX_FILE_SIZE) {
      toast.error('File size exceeds 5MB limit.')
      return
    }

    setIsParsing(true)
    setCurrentFileName(file.name)

    try {
      let text = ''
      if (file.type === 'application/pdf') {
        text = await extractTextFromPDF(file)
      } else {
        text = await extractTextFromDOCX(file)
      }

      if (!text || text.trim().length < 50) {
        toast.warning('Very little text was extracted. The file might be image-based or mostly empty.')
      }

      setParsedText(text)
      setResumeText(text)
      setFileName(file.name)
      toast.success(`Successfully parsed "${file.name}"`)
    } catch (error) {
      toast.error(error.message)
      setParsedText('')
    } finally {
      setIsParsing(false)
    }
  }, [toast, setResumeText, setFileName])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback(() => setDragOver(false), [])

  const handleBrowse = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileInput = useCallback((e) => {
    const file = e.target.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  const handlePasteSubmit = useCallback(() => {
    if (pasteText.trim().length < 50) {
      toast.error('Please paste at least 50 characters of resume text.')
      return
    }
    setParsedText(pasteText)
    setResumeText(pasteText)
    setFileName('pasted-resume.txt')
    setCurrentFileName('Pasted Text')
    toast.success('Resume text saved!')
    setShowPaste(false)
  }, [pasteText, toast, setResumeText, setFileName])

  const handleAnalyze = useCallback(() => {
    if (!parsedText || parsedText.trim().length < 50) {
      toast.error('Please upload or paste a resume first.')
      return
    }
    setResumeText(parsedText)
    navigate('/results')
  }, [parsedText, setResumeText, navigate, toast])

  return (
    <div style={{
      paddingTop: '64px',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 1.5rem 3rem',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ maxWidth: '700px', width: '100%' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: 800,
            marginBottom: '0.75rem',
            letterSpacing: '-0.02em',
          }}>
            Upload your <span className="gradient-text">resume</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Drop your file below or paste your resume text to get started.
          </p>
        </div>

        {/* Drop Zone */}
        <div
          className={`drop-zone ${dragOver ? 'drag-over' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleBrowse}
          role="button"
          tabIndex={0}
          aria-label="Upload resume file"
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleBrowse() }}
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileInput}
            style={{ display: 'none' }}
            id="file-upload-input"
          />

          {isParsing ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '56px',
                height: '56px',
                border: '3px solid var(--border-color)',
                borderTopColor: 'var(--color-brand-500)',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }} />
              <p style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Parsing {currentFileName}...</p>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          ) : (
            <>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(139, 92, 246, 0.1))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                color: 'var(--color-brand-500)',
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
              </div>
              <p style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                {dragOver ? 'Drop it here!' : 'Drag & drop your resume'}
              </p>
              <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Supports PDF and DOCX • Max 5MB
              </p>
              <button className="btn-secondary" style={{ pointerEvents: 'none', fontSize: '0.85rem', padding: '0.5rem 1.25rem' }}>
                Browse Files
              </button>
            </>
          )}
        </div>

        {/* Paste option */}
        <div style={{ textAlign: 'center', margin: '1.25rem 0' }}>
          <button
            onClick={() => setShowPaste(!showPaste)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-brand-500)',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 500,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
            }}
          >
            {showPaste ? '▲ Hide paste option' : '▼ Or paste your resume text'}
          </button>
        </div>

        {showPaste && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <textarea
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              placeholder="Paste your resume text here..."
              style={{
                width: '100%',
                minHeight: '200px',
                padding: '1rem',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                resize: 'vertical',
                outline: 'none',
                lineHeight: 1.6,
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-brand-500)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
              aria-label="Paste resume text"
            />
            <button
              className="btn-primary"
              onClick={handlePasteSubmit}
              style={{ marginTop: '0.75rem', width: '100%' }}
            >
              Use This Text
            </button>
          </motion.div>
        )}

        {/* Parsed Preview */}
        {parsedText && !isParsing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: '1.5rem' }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.75rem',
            }}>
              <h3 style={{ fontWeight: 600, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--color-success-500)' }}>✓</span>
                Extracted Text Preview
                {currentFileName && (
                  <span style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-tertiary)',
                    fontWeight: 400,
                  }}>
                    ({currentFileName})
                  </span>
                )}
              </h3>
              <span style={{
                fontSize: '0.8rem',
                color: 'var(--text-tertiary)',
                fontFamily: 'var(--font-mono)',
              }}>
                {parsedText.length.toLocaleString()} chars
              </span>
            </div>

            <div style={{
              maxHeight: '250px',
              overflowY: 'auto',
              padding: '1rem',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              background: 'var(--bg-secondary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              lineHeight: 1.7,
              color: 'var(--text-secondary)',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}>
              {parsedText}
            </div>

            <button
              className="btn-primary"
              onClick={handleAnalyze}
              style={{
                marginTop: '1.25rem',
                width: '100%',
                fontSize: '1.05rem',
                padding: '0.9rem',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
              Analyze My Resume
            </button>
          </motion.div>
        )}

        {/* Trust badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          marginTop: '2rem',
          color: 'var(--text-tertiary)',
          fontSize: '0.8rem',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          Your data stays in your browser — nothing is uploaded or stored
        </div>
      </motion.div>
    </div>
  )
}
