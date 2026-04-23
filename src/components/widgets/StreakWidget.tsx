'use client'
import Widget from '@/components/dashboard/Widget'
import { IFlame } from '@/lib/icons'

export default function StreakWidget() {
  return (
    <Widget id="streak" icon={IFlame} label="streak">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 36, fontWeight: 700, letterSpacing: '-0.03em', color: '#FB923C' }}>14</span>
          <span style={{ fontSize: 12, color: '#3F3D62' }}>days</span>
        </div>
        <div style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: '#3F3D62' }}>longest · 31 days</div>
        <div style={{ display: 'flex', gap: 3, marginTop: 4 }}>
          {Array.from({ length: 14 }, (_, i) => (
            <div key={i} style={{ flex: 1, height: 4, background: '#FB923C', borderRadius: 1, opacity: 0.4 + (i / 13) * 0.6 }} />
          ))}
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i + 14} style={{ flex: 1, height: 4, background: '#1E1F38', borderRadius: 1 }} />
          ))}
        </div>
      </div>
    </Widget>
  )
}
