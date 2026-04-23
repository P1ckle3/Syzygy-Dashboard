'use client'
import Widget from '@/components/dashboard/Widget'
import { ITarget } from '@/lib/icons'

const DAYS = ['M','T','W','T','F','S','S']
const HOURS = [3.5, 4.0, 2.5, 4.5, 3.0, 0, 0]
const GOAL = 25
const total = HOURS.reduce((a, b) => a + b, 0)

export default function FocusWidget() {
  return (
    <Widget id="focus" icon={ITarget} label="focus">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', color: '#22D3EE' }}>{total.toFixed(1)}</span>
          <span style={{ fontSize: 10, color: '#3F3D62', fontFamily: 'JetBrains Mono, monospace' }}>/ {GOAL}h</span>
        </div>
        <div style={{ height: 3, background: '#1E1F38', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(total / GOAL) * 100}%`, background: '#22D3EE', borderRadius: 2 }} />
        </div>
        <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
          {DAYS.map((d, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <div style={{ width: '100%', height: Math.max(2, (HOURS[i] / 5) * 32), background: HOURS[i] > 0 ? 'rgba(34,211,238,0.6)' : '#131425', borderRadius: '2px 2px 0 0', transition: 'height 300ms' }} />
              <span style={{ fontSize: 8, color: '#3F3D62', fontFamily: 'JetBrains Mono, monospace' }}>{d}</span>
            </div>
          ))}
        </div>
      </div>
    </Widget>
  )
}
