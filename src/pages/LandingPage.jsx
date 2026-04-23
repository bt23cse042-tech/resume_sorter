import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
}

const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
    title: 'AI Resume Scoring',
    desc: 'Get a comprehensive score out of 100 with detailed section-by-section analysis powered by Gemini AI.',
    color: '#06b6d4',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    title: 'ATS Compatibility Check',
    desc: 'Ensure your resume passes Applicant Tracking Systems with keyword analysis and format checks.',
    color: '#8b5cf6',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 7V5a4 4 0 0 0-8 0v2"/>
      </svg>
    ),
    title: 'Smart Job Matching',
    desc: 'Auto-extract your target role and find the most relevant job listings with AI-calculated match scores.',
    color: '#22c55e',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    title: 'Privacy First',
    desc: 'All file parsing happens in your browser. Your resume is never uploaded or stored on any server.',
    color: '#f59e0b',
  },
]

const STEPS = [
  {
    num: '01',
    title: 'Upload',
    desc: 'Drag & drop your resume (PDF or DOCX) or paste it directly.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Analyze',
    desc: 'Gemini AI scores your resume across 6 sections with detailed feedback.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Get Matched',
    desc: 'Discover relevant jobs, improve your resume with AI chat, and export reports.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
]

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    role: 'Software Engineer',
    text: 'ResumeAI helped me identify gaps in my resume I never noticed. My callback rate improved by 40% after implementing the suggestions!',
    avatar: '👩‍💻',
    rating: 5,
  },
  {
    name: 'Alex Johnson',
    role: 'Product Manager',
    text: 'The ATS compatibility check was a game-changer. I was using formats that ATS systems couldn\'t parse properly. Fixed them and landed interviews!',
    avatar: '👨‍💼',
    rating: 5,
  },
  {
    name: 'Maria Garcia',
    role: 'Data Scientist',
    text: 'Love the job matching feature! It found positions I hadn\'t considered. The AI chatbot even rewrote my summary section — it was spot on.',
    avatar: '👩‍🔬',
    rating: 5,
  },
]

export default function LandingPage() {
  return (
    <div style={{ paddingTop: '64px' }}>
      {/* ===== HERO ===== */}
      <section className="hero-gradient" style={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1.5rem',
        position: 'relative',
      }}>
        {/* Background orbs */}
        <div className="hero-orb" style={{
          width: '500px', height: '500px',
          background: 'var(--color-brand-500)',
          top: '-100px', left: '-100px',
        }} />
        <div className="hero-orb" style={{
          width: '400px', height: '400px',
          background: 'var(--color-accent-500)',
          bottom: '-50px', right: '-50px',
        }} />

        <div style={{
          maxWidth: '800px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <span className="badge badge-brand" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
              ✨ Powered by Gemini AI — 100% Free
            </span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              letterSpacing: '-0.03em',
            }}
          >
            Your resume, scored by{' '}
            <span className="gradient-text">AI in seconds</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUp}
            style={{
              fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)',
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.7,
            }}
          >
            Upload your resume and get an instant AI analysis with detailed scores,
            actionable suggestions, ATS checks, and matched job listings.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeUp}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link to="/upload" className="btn-primary" style={{ fontSize: '1.05rem', padding: '0.9rem 2rem' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              Analyze My Resume
            </Link>
            <button
              className="btn-secondary"
              style={{ fontSize: '1.05rem', padding: '0.9rem 2rem' }}
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={4}
            variants={fadeUp}
            style={{
              display: 'flex',
              gap: '2rem',
              justifyContent: 'center',
              marginTop: '3rem',
              color: 'var(--text-tertiary)',
              fontSize: '0.85rem',
              flexWrap: 'wrap',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              🔒 No data stored
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              ⚡ Instant results
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              🆓 Completely free
            </span>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" style={{
        padding: '6rem 1.5rem',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <span className="badge badge-brand" style={{ marginBottom: '1rem', display: 'inline-flex' }}>Features</span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Everything you need to <span className="gradient-text">land interviews</span>
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
        }}>
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              custom={i}
              variants={fadeUp}
              className="card"
              style={{ textAlign: 'center' }}
            >
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: `${f.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                color: f.color,
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{f.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" style={{
        padding: '6rem 1.5rem',
        background: 'var(--bg-tertiary)',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          >
            <span className="badge badge-brand" style={{ marginBottom: '1rem', display: 'inline-flex' }}>How It Works</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Three simple steps to a <span className="gradient-text">better resume</span>
            </h2>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2rem',
          }}>
            {STEPS.map((s, i) => (
              <motion.div
                key={s.num}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                custom={i}
                variants={fadeUp}
                style={{ textAlign: 'center', position: 'relative' }}
              >
                <div style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, var(--color-brand-500), var(--color-accent-500))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                  color: 'white',
                  boxShadow: '0 8px 30px rgba(6, 182, 212, 0.3)',
                }}>
                  {s.icon}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--color-brand-500)',
                  letterSpacing: '0.1em',
                  marginBottom: '0.5rem',
                  fontFamily: 'var(--font-mono)',
                }}>
                  STEP {s.num}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1.15rem', marginBottom: '0.5rem' }}>{s.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section id="testimonials" style={{
        padding: '6rem 1.5rem',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <span className="badge badge-brand" style={{ marginBottom: '1rem', display: 'inline-flex' }}>Testimonials</span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Loved by <span className="gradient-text">job seekers</span>
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              custom={i}
              variants={fadeUp}
              className="card"
            >
              <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '1rem' }}>
                {Array(t.rating).fill(0).map((_, j) => (
                  <span key={j} style={{ color: '#fbbf24', fontSize: '1.1rem' }}>★</span>
                ))}
              </div>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.95rem',
                lineHeight: 1.7,
                marginBottom: '1.25rem',
                fontStyle: 'italic',
              }}>
                "{t.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--bg-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{t.name}</div>
                  <div style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{
        padding: '6rem 1.5rem',
        textAlign: 'center',
        background: 'var(--bg-tertiary)',
      }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          style={{ maxWidth: '600px', margin: '0 auto' }}
        >
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: 800,
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
          }}>
            Ready to <span className="gradient-text">level up</span> your resume?
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.05rem',
            marginBottom: '2rem',
            lineHeight: 1.7,
          }}>
            It's free, takes less than a minute, and your data never leaves your browser.
          </p>
          <Link to="/upload" className="btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
            Analyze My Resume Now →
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
