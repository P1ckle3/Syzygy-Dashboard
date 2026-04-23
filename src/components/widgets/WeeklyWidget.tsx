'use client'
import React, { useState, useEffect } from 'react'
import Widget from '@/components/dashboard/Widget'
import { ICal } from '@/lib/icons'

const EVENTS: Record<number, { time: string; label: string; color: string }[]> = {
  0: [{ time: '09:00', label: 'standup', color: '#22D3EE' }, { time: '14:00', label: 'systems review', color: '#7B6CF6' }],
  1: [{ time: '11:00', label: 'submit assignment', color: '#F87171' }, { time: '16:00', label: 'gym', color: '#34D399' }],
  2: [{ time: '10:30', label: 'supervisor call', color: '#7B6CF6' }, { time: '13:00', label: 'lunch w/ Alex', color: '#8A89B0' }],
  3: [{ time: '09:00', label: 'standup', color: '#22D3EE' }, { time: '15:00', label: 'db maintenance', color: '#F59E0B' }],
  4: [{ time: '11:00', label: 'ML lecture', color: '#7B6CF6' }, { time: '17:00', label: 'run 5k', color: '#34D399' }],
  5: [{ time: '14:00', label: 'deploy v2.4', color: '#34D399' }],
  6: [],
}

export default function WeeklyWidget() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const today = mounted ? new Date() : new Date(0)
  const dow = today.getDay()
  const monday = new Date(today)
  monday.setDate(today.getDate() - ((dow + 6) % 7))
  const week = Array.from({ length: 7 }, (_, i) => { const d = new Date(monday); d.setDate(monday.getDate() + i); return d })
  const weekNum = Math.ceil((today.getDate() + new Date(today.getFullYear(), today.getMonth(), 1).getDay()) / 7)

  const todayIdx = mounted ? (dow + 6) % 7 : 0
  const [sel, setSel] = useState(0)
  useEffect(() => { if (mounted) setSel(todayIdx) }, [mounted, todayIdx])

  return (
    <Widget id="calendar" icon={ICal} label="this week" right={<span style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: '#3F3D62' }}>week {weekNum}</span>}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4, marginBottom: 8 }}>
        {week.map((d, i) => {
          const isToday = d.toDateString() === today.toDateString()
          const isSel = i === sel
          return (
            <div key={i}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '6px 4px', borderRadius: 5, cursor: 'pointer', background: isToday ? 'rgba(123,108,246,0.12)' : isSel ? 'rgba(255,255,255,0.04)' : 'transparent', border: isToday ? '1px solid rgba(123,108,246,0.3)' : '1px solid transparent', transition: 'all 120ms' }}
              onClick={() => setSel(i)}>
              <span style={{ fontSize: 9, fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.06em', color: isToday ? '#7B6CF6' : '#3F3D62' }}>
                {['mon','tue','wed','thu','fri','sat','sun'][i]}
              </span>
              <span style={{ fontSize: 16, fontWeight: 600, color: isToday ? '#E4E2F8' : '#8A89B0' }}>{d.getDate()}</span>
              <div style={{ display: 'flex', gap: 2 }}>
                {(EVENTS[i] || []).slice(0, 3).map((_, ei) => (
                  <div key={ei} style={{ width: 3, height: 3, borderRadius: '50%', background: isToday ? '#7B6CF6' : '#3F3D62' }} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
      <div style={{ borderTop: '1px solid #141529', paddingTop: 8 }}>
        {(EVENTS[sel] || []).length === 0 ? (
          <div style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: '#3F3D62', textAlign: 'center', padding: '4px 0' }}>no events</div>
        ) : (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {(EVENTS[sel] || []).map((ev, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#131425', border: '1px solid #1E1F38', borderRadius: 4, padding: '4px 8px' }}>
                <div style={{ width: 2, height: 20, background: ev.color, borderRadius: 1, opacity: 0.8 }} />
                <div>
                  <div style={{ fontSize: 9, fontFamily: 'JetBrains Mono, monospace', color: '#3F3D62' }}>{ev.time}</div>
                  <div style={{ fontSize: 11, color: '#E4E2F8' }}>{ev.label}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Widget>
  )
}
