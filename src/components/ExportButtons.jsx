import { useToast } from './Toast'
import { useResume } from '../contexts/ResumeContext'

export default function ExportButtons() {
  const toast = useToast()
  const { analysisResults } = useResume()

  const downloadTxt = () => {
    if (!analysisResults) return
    const lines = [
      `Resume Analysis Report`,
      `======================`,
      `Overall Score: ${analysisResults.overallScore}/100`,
      `ATS Score: ${analysisResults.atsScore}/100`,
      `Extracted Role: ${analysisResults.extractedRole}`,
      ``,
      `--- Section Scores ---`,
      ...Object.entries(analysisResults.sections || {}).map(
        ([k, v]) => `${k}: ${v.score}/100 — ${v.feedback}`
      ),
      ``,
      `--- Strengths ---`,
      ...(analysisResults.strengths || []).map((s, i) => `${i + 1}. ${s}`),
      ``,
      `--- Weaknesses ---`,
      ...(analysisResults.weaknesses || []).map((w, i) => `${i + 1}. ${w}`),
      ``,
      `--- Suggestions ---`,
      ...(analysisResults.suggestions || []).map((s, i) => `${i + 1}. [${s.category}] ${s.text}`),
    ]
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'resume-analysis-report.txt'
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Report downloaded!')
  }

  const copySuggestions = () => {
    if (!analysisResults?.suggestions) return
    const text = analysisResults.suggestions.map((s, i) => `${i + 1}. [${s.category}] ${s.text}`).join('\n')
    navigator.clipboard.writeText(text)
    toast.success('Suggestions copied to clipboard!')
  }

  const downloadPdf = async () => {
    toast.info('Generating PDF report...')
    try {
      const { default: jsPDF } = await import('jspdf')
      const doc = new jsPDF()
      const r = analysisResults
      let y = 20

      doc.setFontSize(20)
      doc.setTextColor(6, 182, 212)
      doc.text('ResumeAI Analysis Report', 20, y)
      y += 15

      doc.setFontSize(12)
      doc.setTextColor(60, 60, 60)
      doc.text(`Overall Score: ${r.overallScore}/100`, 20, y); y += 8
      doc.text(`ATS Score: ${r.atsScore}/100`, 20, y); y += 8
      doc.text(`Target Role: ${r.extractedRole}`, 20, y); y += 12

      doc.setFontSize(14)
      doc.setTextColor(6, 182, 212)
      doc.text('Section Scores', 20, y); y += 8
      doc.setFontSize(10)
      doc.setTextColor(60, 60, 60)
      Object.entries(r.sections || {}).forEach(([k, v]) => {
        if (y > 270) { doc.addPage(); y = 20 }
        doc.text(`${k}: ${v.score}/100 — ${v.feedback}`, 20, y); y += 6
      })
      y += 6

      doc.setFontSize(14)
      doc.setTextColor(6, 182, 212)
      doc.text('Strengths', 20, y); y += 8
      doc.setFontSize(10)
      doc.setTextColor(60, 60, 60);
      (r.strengths || []).forEach(s => {
        if (y > 270) { doc.addPage(); y = 20 }
        const lines = doc.splitTextToSize(`• ${s}`, 170)
        doc.text(lines, 20, y); y += lines.length * 5 + 2
      })
      y += 4

      doc.setFontSize(14)
      doc.setTextColor(6, 182, 212)
      doc.text('Suggestions', 20, y); y += 8
      doc.setFontSize(10)
      doc.setTextColor(60, 60, 60);
      (r.suggestions || []).forEach((s, i) => {
        if (y > 270) { doc.addPage(); y = 20 }
        const lines = doc.splitTextToSize(`${i + 1}. [${s.category}] ${s.text}`, 170)
        doc.text(lines, 20, y); y += lines.length * 5 + 2
      })

      doc.save('resume-analysis-report.pdf')
      toast.success('PDF report downloaded!')
    } catch (err) {
      toast.error('Failed to generate PDF. Please try the text export instead.')
    }
  }

  if (!analysisResults) return null

  return (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <button onClick={downloadPdf} className="btn-primary" style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        PDF Report
      </button>
      <button onClick={copySuggestions} className="btn-secondary" style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}>
        📋 Copy Suggestions
      </button>
      <button onClick={downloadTxt} className="btn-secondary" style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}>
        📄 Download .txt
      </button>
    </div>
  )
}
