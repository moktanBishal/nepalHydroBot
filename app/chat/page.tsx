'use client'

import { useState } from 'react'

export default function Chat() {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const send = async () => {
    if (!input.trim() || loading) return
    const userMessage = input
    setMessages(m => [...m, { role: 'user', content: userMessage }])
    setInput('')
    setLoading(true)

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: userMessage }),
      headers: { 'Content-Type': 'application/json' }
    })

    const data = await res.json()
    setMessages(m => [...m, { role: 'assistant', content: data.response || 'No response' }])
    setLoading(false)
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-white p-5 text-center">
        <h1 className="text-2xl font-bold">Nepal Hydro AI Assistant</h1>
        <p>Ask in English or Nepali</p>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <p className="text-center text-gray-500">Example: "Arun-3 को स्थिति के छ?" or "Upper Tamakoshi delays"</p>
        )}
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <div className={`inline-block max-w-lg px-5 py-3 rounded-2xl ${
              m.role === 'user' ? 'bg-primary text-white' : 'bg-gray-200'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && <p className="text-center text-gray-500">Thinking...</p>}
      </div>

      <div className="p-4 border-t bg-white">
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Ask about any project..."
            className="flex-1 px-5 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
          />
          <button onClick={send} disabled={loading} className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50">
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
