'use client'
import React, { useState } from 'react'
import Widget, { Badge } from '@/components/dashboard/Widget'
import { ITarget } from '@/lib/icons'

const ITEMS = [
  { label: 'Assignment 3 — ML',       due: 'today',    tag: 'study',   pri: 'high' },
  { label: 'Essay draft — Comms 201', due: 'tomorrow', tag: 'study',   pri: 'high' },
  { label: 'Rent payment',            due: 'Apr 25',   tag: 'finance', pri: 'high' },
  { label: 'Project proposal',        due: 'Apr 28',   tag: 'work',    pri: 'med'  },
  { label: 'Library book return',     due: 'Apr 29',   tag: 'personal',pri: 'low'  },
  { label: 'Car insurance renewal',   due: 'May 3',    tag: 'finance', pri: 'med'  },
  { label: 'System backup',           due: 'May 5',    tag: 'system',  pri: 'low'  },
]

const TAG_COLORS: Record<string, string> = { study: '#7B6CF6', finance: '#F59E0B', work: '#22D3EE', personal: '#8A89B0', system: '#34D399' }
const PRI_COLORS: Record<string, string> = { high: '#F87171', med: '#F59E0B', low: '#3F3D62' }
const DUE_COLORS: Record<string, string> = { today: '#F87171', tomorrow: '#F59E0B' }

export default function UpcomingWidget() {
  const [done, setDone] = useState<number[]>([])
  const toggle = (i: number) => setDone(d => d.includes(i) ? d.filter(x => x !== i) : [...d, i])

  return (
    <Widget id="upcoming" icon={ITarget} label="upcoming" right={<Badge color="#F87171">2 today</Badge>} style={{ gridRow: 'span 2' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {ITEMS.map((it, i) => {
          const isDone = done.includes(i)
          return (
            <div key={i}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 4px 6px 8px', borderRadius: 4, borderLeft: `2px solid ${isDone ? 'transparent' : PRI_COLORS[it.pri]}`, opacity: isDone ? 0.35 : 1, transition: 'all 200ms', cursor: 'pointer' }}
              onClick={() => toggle(i)}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, color: isDone ? '#3F3D62' : '#E4E2F8', textDecoration: isDone ? 'line-through' : 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.label}</div>
                <div style={{ display: 'flex', gap: 5, alignItems: 'center', marginTop: 2 }}>
                  <span style={{ fontSize: 9, fontFamily: 'JetBrains Mono, monospace', color: DUE_COLORS[it.due] || '#3F3D62' }}>{it.due}</span>
                  <span style={{ width: 2, height: 2, borderRadius: '50%', background: '#1E1F38' }} />
                  <span style={{ fontSize: 9, fontFamily: 'JetBrains Mono, monospace', color: TAG_COLORS[it.tag] || '#8A89B0', background: `${TAG_COLORS[it.tag] || '#8A89B0'}14`, borderRadius: 2, padding: '0 4px' }}>{it.tag}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Widget>
  )
}
