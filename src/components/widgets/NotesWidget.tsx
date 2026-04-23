'use client'
import React, { useState } from 'react'
import Widget from '@/components/dashboard/Widget'
import { INote } from '@/lib/icons'

export default function NotesWidget() {
  const [notes, setNotes] = useState<string[]>([
    'check ML paper on diffusion models',
    'ask supervisor about thesis timeline',
  ])
  const [input, setInput] = useState('')

  const add = () => {
    if (!input.trim()) return
    setNotes(n => [input.trim(), ...n])
    setInput('')
  }

  return (
    <Widget id="notes" icon={INote} label="quick capture">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && add()}
            placeholder="capture a thought…"
            style={{ flex: 1, background: '#090916', border: '1px solid #1E1F38', borderRadius: 4, padding: '6px 8px', fontFamily: 'Space Grotesk, sans-serif', fontSize: 11, color: '#E4E2F8', outline: 'none' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {notes.map((n, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, padding: '5px 6px', borderRadius: 3, background: '#131425' }}>
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#3F3D62', flexShrink: 0, marginTop: 5 }} />
              <span style={{ fontSize: 11, color: '#8A89B0', lineHeight: 1.5 }}>{n}</span>
            </div>
          ))}
        </div>
      </div>
    </Widget>
  )
}
