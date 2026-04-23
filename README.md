# 🤖 ResumeAI — AI Resume Analyzer & Job Matcher

<div align="center">

![ResumeAI Banner](https://img.shields.io/badge/ResumeAI-Powered%20by%20Gemini-06b6d4?style=for-the-badge&logo=google&logoColor=white)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-000?style=for-the-badge&logo=vercel&logoColor=white)](https://resume-sorter-alpha.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-8b5cf6?style=for-the-badge)](LICENSE)

**Upload your resume → Get AI-powered analysis → Find matching jobs — all for free.**

[🌐 Live Demo](https://resume-sorter-alpha.vercel.app) · [📋 Features](#-features) · [🚀 Quick Start](#-quick-start) · [🛠️ Tech Stack](#️-tech-stack)

</div>

---

## 📸 Screenshots

<table>
  <tr>
    <td><strong>🏠 Landing Page</strong></td>
    <td><strong>📄 Upload & Parse</strong></td>
  </tr>
  <tr>
    <td>Beautiful hero section with animated gradients, feature highlights, and testimonials</td>
    <td>Drag-and-drop file upload with real-time PDF/DOCX parsing</td>
  </tr>
  <tr>
    <td><strong>📊 Analysis Dashboard</strong></td>
    <td><strong>💼 Job Matches</strong></td>
  </tr>
  <tr>
    <td>Animated score ring, radar chart, section breakdown with color-coded badges</td>
    <td>Real job listings from Arbeitnow API with AI-calculated match scores</td>
  </tr>
</table>

---

## ✨ Features

### 🏠 Landing Page
- Hero section with animated gradient background and CTA buttons
- Feature highlight cards (AI Scoring, ATS Check, Job Matching, Privacy)
- 3-step "How It Works" visual flow
- Testimonials section
- Sticky glassmorphism navbar with smooth scroll
- Fully responsive (mobile + tablet + desktop)
- **Dark/Light mode toggle** with localStorage persistence

### 📄 Resume Upload & Parsing
- **Drag-and-drop** file upload zone (PDF & DOCX)
- 5MB file size validation with toast error messages
- **Client-side PDF parsing** using PDF.js (no server upload)
- **Client-side DOCX parsing** using mammoth.js
- Extracted text preview with character count
- **Manual paste fallback** for any text format
- Loading spinner during file parsing

### 🧠 AI Resume Analysis (Gemini API)
- **Overall Score** (0–100) with animated circular progress ring
- **6 Section Scores**: Contact Info, Summary, Experience, Skills, Education, Projects
- Color-coded badges: 🟢 Good (80+) / 🟡 Needs Work (50–79) / 🔴 Missing (0–49)
- **Strengths & Weaknesses** lists with animated bullet points
- **Actionable Suggestions** with category badges (Content, Format, Keywords, Impact, Structure)
- **ATS Compatibility Score** with specific flag list
- **Tone & Language Analysis**: passive voice %, weak verbs, filler words
- **Keyword Cloud** — visual display of detected skills
- **Radar/Spider Chart** (Recharts) for section score visualization
- Skeleton loading UI during analysis
- **Re-analyze** button for iterating after edits
- 🎉 **Confetti animation** when score exceeds 80!

### 💼 Job Matching (Arbeitnow API)
- Auto-extracts target role from resume using AI
- Fetches **real job listings** with calculated match scores
- Filter by **location** and **remote-only** toggle
- Job cards: Title, Company, Location, Tags, Match Score badge
- **"Apply Now"** button linking to original job posting
- Pagination with "Load More"
- Empty state UI when no jobs match

### 📥 Export & Download
- **Download PDF report** (jsPDF)
- **Copy suggestions** to clipboard with one click
- **Download .txt report** with full analysis

### 🔁 AI Chat Assistant
- Floating chat widget (bottom-right corner)
- Pre-loaded with resume context and analysis results
- **Suggested prompts**: "Rewrite my summary", "Better bullet points", etc.
- **Typewriter effect** for AI responses
- Chat history preserved during session

### ⚙️ Settings & Preferences
- Target role input for focused analysis
- Target location for job filtering
- Experience level selector (Fresher / Mid-level / Senior)
- Industry selector (Tech, Finance, Marketing, Healthcare, etc.)
- Settings persist via localStorage

### 🔒 Privacy & Trust
- **All file parsing happens client-side** — files never leave your browser
- Resume data auto-cleared on tab close (`beforeunload` event)
- "Your data is never stored" messaging throughout
- Dedicated Privacy Policy page

### 🎨 UI/UX Polish
- Smooth page transitions (Framer Motion `AnimatePresence`)
- Micro-animations on all interactive elements
- Toast notification system (success, error, warning, info)
- **Glassmorphism** design language
- Witty 404 page ("This page ghosted you")
- Custom SVG favicon
- Open Graph meta tags for link previews
- Google Fonts: **Inter** + **JetBrains Mono**

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 18 + Vite 6 |
| **Styling** | Tailwind CSS v4 + Custom CSS Design System |
| **AI Engine** | Google Gemini 2.0 Flash (REST API) |
| **Job API** | Arbeitnow (free, no auth required) |
| **PDF Parsing** | pdfjs-dist (client-side) |
| **DOCX Parsing** | mammoth.js (client-side) |
| **Charts** | Recharts (RadarChart) |
| **PDF Export** | jsPDF |
| **Animations** | Framer Motion + canvas-confetti |
| **Routing** | React Router v6 |
| **Hosting** | Vercel (free tier) |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- (Optional) Gemini API key for real AI analysis

### Installation

```bash
# Clone the repo
git clone https://github.com/bt23cse042-tech/resume_sorter.git
cd resume_sorter

# Install dependencies
npm install

# Start development server
npm run dev
```

The app opens at **http://localhost:5173/**

### Enable AI Analysis (Optional)

1. Get a free Gemini API key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Create a `.env` file in the project root:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

3. Restart the dev server

> **Note:** Without an API key, the app runs in **demo mode** with mock analysis data so you can preview the full UI.

### Production Build

```bash
npm run build    # Creates optimized build in /dist
npm run preview  # Preview the production build locally
```

---

## 📁 Project Structure

```
resume_sorter/
├── public/
│   └── favicon.svg              # Custom gradient favicon
├── src/
│   ├── index.css                # Tailwind v4 + design system (dark/light mode)
│   ├── main.jsx                 # React entry point
│   ├── App.jsx                  # Router + context providers
│   ├── contexts/
│   │   ├── ThemeContext.jsx      # Dark/light mode state
│   │   └── ResumeContext.jsx     # Global app state (resume, results, chat)
│   ├── pages/
│   │   ├── LandingPage.jsx      # Hero + features + testimonials + CTA
│   │   ├── UploadPage.jsx       # File upload + parsing + preview
│   │   ├── ResultsDashboard.jsx # Tabbed results (Analysis/Jobs/Suggestions)
│   │   ├── PrivacyPage.jsx      # Privacy policy
│   │   └── NotFoundPage.jsx     # Witty 404 page
│   ├── components/
│   │   ├── Navbar.jsx           # Sticky nav with glassmorphism
│   │   ├── Footer.jsx           # Footer with trust badge
│   │   ├── Toast.jsx            # Notification system
│   │   ├── ScoreRing.jsx        # Animated SVG progress ring
│   │   ├── SectionBreakdown.jsx # 6 section score cards
│   │   ├── RadarChart.jsx       # Recharts spider chart
│   │   ├── StrengthsWeaknesses.jsx
│   │   ├── SuggestionsList.jsx  # Numbered tips with copy
│   │   ├── ATSScore.jsx         # ATS compatibility gauge
│   │   ├── KeywordCloud.jsx     # Skills tag cloud
│   │   ├── ToneAnalysis.jsx     # Language analysis panel
│   │   ├── SkeletonLoader.jsx   # Shimmer loading UI
│   │   ├── JobMatchesTab.jsx    # Job listings + filters
│   │   ├── ExportButtons.jsx    # PDF/TXT/clipboard export
│   │   ├── ChatWidget.jsx       # Floating AI chat
│   │   └── SettingsPanel.jsx    # Slide-out preferences
│   └── utils/
│       ├── pdfParser.js         # PDF.js text extraction
│       ├── docxParser.js        # mammoth text extraction
│       └── geminiClient.js      # Gemini API + mock fallback
├── vercel.json                  # SPA routing config
├── .env.example                 # Environment variable template
├── index.html                   # SEO + OG meta tags
├── vite.config.js               # Vite + Tailwind + API proxy
└── package.json
```

---

## 🧪 Demo Mode

The app is fully functional **without any API keys**:

- **Resume Parsing**: Works completely client-side (PDF.js + mammoth.js)
- **AI Analysis**: Returns realistic mock data (score: 72/100, 6 sections, suggestions, etc.)
- **Job Matching**: Fetches real jobs from Arbeitnow (no auth needed)
- **All UI Features**: Charts, animations, export, chat — everything works

This makes it perfect for demos, presentations, and testing.

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) → Import your repo
3. Vercel auto-detects Vite → Click **Deploy**
4. (Optional) Add `VITE_GEMINI_API_KEY` in Environment Variables

The `vercel.json` handles SPA routing automatically.

### Other Platforms

Works on any static hosting (Netlify, GitHub Pages, Cloudflare Pages):

```bash
npm run build
# Deploy the /dist folder
```

---

## 📝 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_GEMINI_API_KEY` | No | Google Gemini API key for real AI analysis. Without it, app uses demo mock data. |

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- [Google Gemini](https://ai.google.dev/) — AI analysis engine
- [Arbeitnow](https://www.arbeitnow.com/api/job-board-api) — Free job listings API
- [PDF.js](https://mozilla.github.io/pdf.js/) — Client-side PDF parsing
- [mammoth.js](https://github.com/mwilliamson/mammoth.js) — DOCX to text conversion
- [Recharts](https://recharts.org/) — React chart library
- [Framer Motion](https://www.framer.com/motion/) — Animation library
- [Vercel](https://vercel.com/) — Hosting platform

---

<div align="center">

**Built with ❤️ using React + Gemini AI**

[⬆ Back to Top](#-resumeai--ai-resume-analyzer--job-matcher)

</div>
