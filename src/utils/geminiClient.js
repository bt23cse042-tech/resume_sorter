const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY

const buildAnalysisPrompt = (resumeText, settings) => {
  let prompt = `You are an expert resume analyst. Analyze this resume and return ONLY valid JSON (no markdown, no code fences) with this exact structure:
{"overallScore":<0-100>,"extractedRole":"<job title>","sections":{"contact":{"score":<0-100>,"feedback":"..."},"summary":{"score":<0-100>,"feedback":"..."},"experience":{"score":<0-100>,"feedback":"..."},"skills":{"score":<0-100>,"feedback":"..."},"education":{"score":<0-100>,"feedback":"..."},"projects":{"score":<0-100>,"feedback":"..."}},"strengths":["..."],"weaknesses":["..."],"suggestions":[{"category":"Content|Format|Keywords|Impact|Structure","text":"..."}],"atsScore":<0-100>,"atsFlags":["..."],"toneAnalysis":{"passiveVoicePercent":<0-100>,"weakVerbs":["..."],"strongVerbSuggestions":["..."],"fillerWordCount":<number>,"fillerWords":["..."]},"keywords":["..."]}`
  if (settings.targetRole) prompt += `\nTarget role: "${settings.targetRole}".`
  if (settings.experienceLevel) prompt += ` Level: ${settings.experienceLevel}.`
  if (settings.industry) prompt += ` Industry: ${settings.industry}.`
  prompt += `\nBe critical but constructive. Score missing sections as 0.\n\nRESUME:\n${resumeText}`
  return prompt
}

export async function analyzeResume(resumeText, settings = {}) {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
    return getMockAnalysis()
  }
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: buildAnalysisPrompt(resumeText, settings) }] }],
        generationConfig: { temperature: 0.3, maxOutputTokens: 4096, responseMimeType: 'application/json' }
      })
    }
  )
  if (!response.ok) {
    if (response.status === 429) throw new Error('Rate limit reached. Please wait and try again.')
    const err = await response.json().catch(() => ({}))
    throw new Error(err.error?.message || `API error: ${response.status}`)
  }
  const data = await response.json()
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) throw new Error('No response from Gemini API')
  return JSON.parse(text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim())
}

export async function chatWithAI(resumeText, analysisResults, chatHistory, userMessage) {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
    return "Demo mode — add your Gemini API key to .env (VITE_GEMINI_API_KEY=...). Get one free at https://aistudio.google.com/apikey"
  }
  const prompt = `You are a resume coach. User's resume score: ${analysisResults?.overallScore}/100. Help improve their resume. Be concise and specific.\n\nResume excerpt (first 2000 chars): ${resumeText?.slice(0, 2000)}\n\nChat:\n${chatHistory.map(m => `${m.role}: ${m.content}`).join('\n')}\nUser: ${userMessage}`
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 2048 }
      })
    }
  )
  if (!response.ok) throw new Error(`API error: ${response.status}`)
  const data = await response.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.'
}

function getMockAnalysis() {
  return {
    overallScore: 72, extractedRole: 'Software Engineer',
    sections: {
      contact: { score: 90, feedback: 'Contact information is complete with email and phone.' },
      summary: { score: 55, feedback: 'Summary is generic. Add specific achievements and target role keywords.' },
      experience: { score: 75, feedback: 'Experience present but bullets lack quantifiable metrics.' },
      skills: { score: 80, feedback: 'Good range of skills. Consider organizing by category.' },
      education: { score: 85, feedback: 'Education section is well-structured.' },
      projects: { score: 50, feedback: 'Projects section is thin. Add tech details and outcomes.' },
    },
    strengths: ['Clean formatting', 'Relevant technical skills listed', 'Education details comprehensive', 'Consistent date formatting'],
    weaknesses: ['Generic summary not tailored to role', 'Experience lacks metrics', 'Missing ATS keywords', 'Projects need more detail'],
    suggestions: [
      { category: 'Impact', text: 'Add metrics to experience. E.g., "Improved API response time by 40%"' },
      { category: 'Keywords', text: 'Include keywords like "Agile", "CI/CD", "microservices"' },
      { category: 'Content', text: 'Rewrite summary with 2-3 key achievements and target role' },
      { category: 'Format', text: 'Start each bullet with a strong action verb' },
      { category: 'Structure', text: 'Add a Projects section with 2-3 detailed entries' },
      { category: 'Content', text: 'Include GitHub/portfolio links' },
    ],
    atsScore: 65,
    atsFlags: ['Missing common keywords for this role', 'Formatting may not parse well in ATS', 'Use single-column layout'],
    toneAnalysis: {
      passiveVoicePercent: 25, weakVerbs: ['helped', 'worked on', 'was responsible for'],
      strongVerbSuggestions: ['engineered', 'implemented', 'architected', 'optimized', 'delivered'],
      fillerWordCount: 8, fillerWords: ['various', 'several', 'etc'],
    },
    keywords: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'REST API', 'HTML', 'CSS'],
  }
}
