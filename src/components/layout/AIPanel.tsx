'use client'
import React, { useState, useRef, useEffect } from 'react'
import { ISpark, IClose, ISend } from '@/lib/icons'

const QUICK_PROMPTS = ['tasks due today', 'habit summary', 'focus hours', 'budget status']

function aiReply(msg: string): string {
  const m = msg.toLowerCase()
  if (m.includes('due') || m.includes('deadline'))
    return 'you have 2 items due today: Assignment 3 and your Essay draft. assignment 3 is high priority.'
  if (m.includes('habit'))
    return 'your best streak this week is exercise at 7 days. reading has dropped — missed 3 days.'
  if (m.includes('focus') || m.includes('time'))
    return '17.5 hrs logged this week. you need 7.5 more to hit your 25hr goal. today you\'ve logged 1.5 hrs.'
  if (m.includes('budget') || m.includes('money') || m.includes('spend'))
    return 'april budget: $1429 spent of $1510. misc is over by $34. all other categories on track.'
  if (m.includes('add') && m.includes('widget'))
    return 'i can scaffold a new widget. options: workout tracker, github activity, weather, rss reader. which?'
  if (m.includes('system') || m.includes('server'))
    return 'redis is degraded — ECONNREFUSED 127.0.0.1:6379. all other services nominal. uptime 12d 4h.'
  return 'i can see your tasks, habits, focus time, budget and system status. what would you like to know?'
}

type Msg = { role: 'user' | 'assistant'; text: string }

export default function AIPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', text: 'Dashboard loaded. What would you like to know?' },
  ])
  const [thinking, setThinking] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [messages, thinking])

  const send = (text?: string) => {
    const txt = text || input.trim()
    if (!txt) return
    setInput('')
    setMessages(m => [...m, { role: 'user', text: txt }])
    setThinking(true)
    setTimeout(() => {
      setMessages(m => [...m, { role: 'assistant', text: aiReply(txt) }])
      setThinking(false)
    }, 700 + Math.random() * 500)
  }

  return (
    <div style={{ position: 'absolute', top: 0, right: 0, width: 320, height: '100%', background: '#0D0E1A', borderLeft: '1px solid #1E1F38', display: 'flex', flexDirection: 'column', zIndex: 50, transform: open ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 200ms cubic-bezier(0.2,0,0,1)' }}>
      {/* Header */}
      <div style={{ padding: '12px 14px', borderBottom: '1px solid #1E1F38', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#7B6CF6', fontSize: 13, fontWeight: 600 }}>
          <ISpark size={14} /><span>ai</span>
          <div style={{ fontSize: 9, fontFamily: 'JetBrains Mono, monospace', background: 'rgba(123,108,246,0.15)', color: '#7B6CF6', borderRadius: 2, padding: '1px 5px' }}>claude</div>
        </div>
        <div style={{ cursor: 'pointer', color: '#3F3D62', display: 'flex' }} onClick={onClose}><IClose size={14} /></div>
      </div>

      {/* Messages */}
      <div ref={bodyRef} style={{ flex: 1, overflowY: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', gap: 6, flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
            {m.role === 'assistant' && (
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(123,108,246,0.15)', border: '1px solid rgba(123,108,246,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7B6CF6', flexShrink: 0, marginTop: 2 }}>
                <ISpark size={10} />
              </div>
            )}
            <div style={{ fontSize: 12, lineHeight: 1.6, borderRadius: 6, padding: '8px 10px', maxWidth: '85%', background: m.role === 'assistant' ? '#131425' : 'rgba(123,108,246,0.1)', border: m.role === 'assistant' ? '1px solid #1E1F38' : '1px solid rgba(123,108,246,0.2)', color: '#E4E2F8' }}>
              {m.text}
            </div>
          </div>
        ))}
        {thinking && (
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(123,108,246,0.15)', border: '1px solid rgba(123,108,246,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7B6CF6', flexShrink: 0, marginTop: 2 }}>
              <ISpark size={10} />
            </div>
            <div style={{ fontSize: 16, letterSpacing: 4, color: '#7B6CF6', padding: '8px 10px', background: '#131425', border: '1px solid #1E1F38', borderRadius: 6, animation: 'shimmer 1.2s infinite' }}>···</div>
          </div>
        )}
      </div>

      {/* Quick prompts */}
      <div style={{ padding: '8px 12px', borderTop: '1px solid #1E1F38', display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {QUICK_PROMPTS.map(p => (
          <QuickPrompt key={p} label={p} onClick={() => send(p)} />
        ))}
      </div>

      {/* Input */}
      <div style={{ padding: 10, borderTop: '1px solid #1E1F38', display: 'flex', gap: 6, flexShrink: 0 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="ask anything…"
          style={{ flex: 1, background: '#090916', border: '1px solid #1E1F38', borderRadius: 4, padding: '7px 10px', fontFamily: 'Space Grotesk, sans-serif', fontSize: 12, color: '#E4E2F8', outline: 'none' }}
        />
        <div style={{ width: 32, height: 32, borderRadius: 4, background: 'rgba(123,108,246,0.15)', border: '1px solid rgba(123,108,246,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7B6CF6', cursor: 'pointer', flexShrink: 0 }} onClick={() => send()}>
          <ISend size={14} />
        </div>
      </div>
    </div>
  )
}

function QuickPrompt({ label, onClick }: { label: string; onClick: () => void }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', background: hover ? 'rgba(123,108,246,0.15)' : 'rgba(123,108,246,0.08)', border: '1px solid rgba(123,108,246,0.18)', borderRadius: 2, padding: '3px 7px', color: '#7B6CF6', cursor: 'pointer', transition: 'background 120ms' }}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {label}
    </div>
  )
}
