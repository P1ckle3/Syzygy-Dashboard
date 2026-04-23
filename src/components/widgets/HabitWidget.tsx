'use client'
import Widget from '@/components/dashboard/Widget'
import { IActivity } from '@/lib/icons'

const HABITS = [
  { label: 'exercise', color: '#34D399', data: [1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1] },
  { label: 'reading',  color: '#7B6CF6', data: [1,1,0,1,1,1,1,1,0,0,1,1,1,1,1,1,0,1,1,1,1] },
  { label: 'meditate', color: '#22D3EE', data: [0,1,1,1,0,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1] },
  { label: 'no junk',  color: '#FB923C', data: [1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1] },
  { label: '8h sleep', color: '#8A89B0', data: [0,1,0,1,1,1,0,1,0,1,1,0,1,1,1,0,1,1,0,1,1] },
]

export default function HabitWidget() {
  const today = HABITS[0].data.length - 1
  return (
    <Widget id="habits" icon={IActivity} label="habits · 3 weeks" right={<span style={{ fontSize: 9, fontFamily: 'JetBrains Mono, monospace', color: '#3F3D62' }}>mon → today</span>}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {HABITS.map((h) => {
          const streak = (() => { let s = 0; for (let i = h.data.length - 1; i >= 0 && h.data[i]; i--) s++; return s })()
          return (
            <div key={h.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 58, fontSize: 10, color: '#8A89B0', flexShrink: 0, fontFamily: 'JetBrains Mono, monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{h.label}</div>
              <div style={{ display: 'flex', gap: 2, flex: 1 }}>
                {h.data.map((v, di) => (
                  <div key={di} style={{ flex: 1, height: 14, borderRadius: 2, background: v ? h.color : '#131425', opacity: v ? (di === today ? 1 : 0.55) : 1, border: di === today ? `1px solid ${h.color}` : '1px solid transparent' }} />
                ))}
              </div>
              <span style={{ fontSize: 9, fontFamily: 'JetBrains Mono, monospace', color: h.color, width: 14, textAlign: 'right', flexShrink: 0 }}>{streak}</span>
            </div>
          )
        })}
      </div>
    </Widget>
  )
}
