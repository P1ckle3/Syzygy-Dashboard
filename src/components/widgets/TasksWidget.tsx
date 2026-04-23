'use client'
import React, { useState } from 'react'
import Widget from '@/components/dashboard/Widget'
import { ICheck } from '@/lib/icons'

const INIT_TASKS = [
  { id: 1, done: true,  label: 'review lecture notes — ML ch.4', tag: 'study',    pri: 'high' },
  { id: 2, done: false, label: 'submit assignment 3',             tag: 'study',    pri: 'high' },
  { id: 3, done: false, label: '30 min run',                      tag: 'health',   pri: 'med'  },
  { id: 4, done: true,  label: 'respond to supervisor email',     tag: 'work',     pri: 'med'  },
  { id: 5, done: false, label: 'read — Dune ch.12',               tag: 'personal', pri: 'low'  },
]

const TAG_COLORS: Record<string, string> = { study: '#7B6CF6', health: '#34D399', work: '#22D3EE', personal: '#8A89B0' }

export default function TasksWidget() {
  const [tasks, setTasks] = useState(INIT_TASKS)
  const toggle = (id: number) => setTasks(ts => ts.map(t => t.id === id ? { ...t, done: !t.done } : t))
  const done = tasks.filter(t => t.done).length

  return (
    <Widget id="tasks" icon={ICheck} label="today's tasks" right={<span style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: '#3F3D62' }}>{done}/{tasks.length}</span>}>
      <div style={{ height: 2, background: '#1E1F38', borderRadius: 1, marginBottom: 10, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${(done / tasks.length) * 100}%`, background: '#7B6CF6', borderRadius: 1, transition: 'width 400ms cubic-bezier(0.2,0,0,1)' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {tasks.map(t => (
          <div key={t.id}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 6px', borderRadius: 4, cursor: 'pointer', background: t.done ? 'transparent' : 'rgba(123,108,246,0.03)', transition: 'background 120ms' }}
            onClick={() => toggle(t.id)}
            onMouseEnter={e => { if (!t.done) (e.currentTarget as HTMLElement).style.background = 'rgba(123,108,246,0.07)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = t.done ? 'transparent' : 'rgba(123,108,246,0.03)' }}>
            <div style={{ width: 14, height: 14, borderRadius: 3, flexShrink: 0, border: `1px solid ${t.done ? '#7B6CF6' : '#3B3572'}`, background: t.done ? '#7B6CF6' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 120ms' }}>
              {t.done && <ICheck size={10} />}
            </div>
            <span style={{ flex: 1, fontSize: 12, color: t.done ? '#3F3D62' : '#E4E2F8', textDecoration: t.done ? 'line-through' : 'none', transition: 'color 120ms' }}>{t.label}</span>
            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              {t.pri === 'high' && <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#F87171', flexShrink: 0 }} />}
              <span style={{ fontSize: 9, fontFamily: 'JetBrains Mono, monospace', color: TAG_COLORS[t.tag] || '#8A89B0', background: `${TAG_COLORS[t.tag] || '#8A89B0'}18`, borderRadius: 2, padding: '1px 5px' }}>{t.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </Widget>
  )
}
