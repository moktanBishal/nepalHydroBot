import { NextRequest } from 'next/server'
import projectsData from '@/data/projects.json'

const API_KEY = process.env.GROQ_API_KEY

const systemPrompt = `You are a helpful AI assistant for Nepal Hydro Timeline.
Use ONLY the data below. Never make up dates.

Data (as of Dec 2025):
${JSON.stringify(projectsData, null, 2)}

Rules:
- Answer in Nepali if question is in Nepali, English otherwise.
- Say which dates are confirmed vs estimated.
- Explain delays clearly (politics, funding, disasters).
- For future predictions: Be realistic, mention typical Nepal delays.
- If unsure: Say "Data limited to Dec 2025. Check NEA for latest."`

export async function POST(req: NextRequest) {
  if (!API_KEY) return Response.json({ response: 'API key missing' })

  const { message } = await req.json()

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama-3.1-70b-instant',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      temperature: 0.6,
      max_tokens: 1000
    })
  })

  const data = await res.json()
  const reply = data.choices?.[0]?.message?.content || 'Sorry, no reply.'

  return Response.json({ response: reply })
}
