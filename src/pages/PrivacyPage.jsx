import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function PrivacyPage() {
  return (
    <div style={{ paddingTop: '64px', minHeight: '100vh' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: '700px', margin: '0 auto', padding: '3rem 1.5rem' }}
      >
        <Link to="/" style={{ color: 'var(--color-brand-500)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>
          ← Back to Home
        </Link>

        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '1.5rem', marginBottom: '0.5rem' }}>
          🔒 Privacy Policy
        </h1>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginBottom: '2rem' }}>
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}>
          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Your Data Never Leaves Your Browser
            </h2>
            <p>
              ResumeAI is designed with privacy as a core principle. All file parsing (PDF and DOCX extraction)
              happens entirely in your browser using client-side JavaScript libraries. Your resume files are
              <strong> never uploaded</strong> to our servers.
            </p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              AI Analysis
            </h2>
            <p>
              When you click "Analyze," the extracted text from your resume is sent to the Gemini API
              (Google's AI service) for analysis. This is the only time your resume data leaves your browser.
              Google processes this data according to their
              {' '}<a href="https://ai.google.dev/terms" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-brand-500)' }}>API terms of service</a>.
            </p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              No Storage, No Cookies, No Tracking
            </h2>
            <ul style={{ paddingLeft: '1.25rem' }}>
              <li>We do not store your resume or analysis results on any server</li>
              <li>We do not use cookies for tracking</li>
              <li>We do not collect personal information</li>
              <li>Your resume data is automatically cleared when you close the tab</li>
              <li>Only your theme preference and settings are saved locally in your browser</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Job Listings
            </h2>
            <p>
              Job matching data is fetched from the Arbeitnow public API. We do not share your resume
              data with job listing providers. Job searches are based on keywords extracted from your
              resume analysis.
            </p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Open Source
            </h2>
            <p>
              This application is fully transparent. You can inspect the source code to verify
              all privacy claims made on this page.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  )
}
