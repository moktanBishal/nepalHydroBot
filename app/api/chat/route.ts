import { NextRequest } from 'next/server'
import projectsData from '../../data/projects.json'

const API_KEY = process.env.GROQ_API_KEY

if (!API_KEY) {
  console.error('GROQ_API_KEY is missing')
}

const systemPrompt = `You are a helpful AI assistant for Nepal Hydro Timeline.
Use ONLY the data below for facts. Never invent information.

Data (Dec 2025):
${JSON.stringify(projectsData, null, 2)}

Rules:
- Answer in Nepali if the question is in Nepali, otherwise English.
- Clearly state which dates are confirmed (exact: true) vs estimated.
- Explain delays (politics, funding, disasters) transparently.
- For future estimates: Be realistic based on Nepal's typical long timelines.
- If data is missing: Say "Data up to Dec 2025. Check NEA/DoED for latest."`

export async function POST(req: NextRequest) {
  if (!API_KEY) {
    return Response.json({ response: 'Server configuration error. Missing API key.' })
  }

  const { message } = await req.json()

  try {
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
    const reply = data.choices?.[0]?.message?.content || 'Sorry, I could not respond.'

    return Response.json({ response: reply })
  } catch (error) {
    return Response.json({ response: 'Sorry, there was an error processing your request.' })
  }
}
