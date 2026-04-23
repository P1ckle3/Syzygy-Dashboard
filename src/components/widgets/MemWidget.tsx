'use client'
import Widget from '@/components/dashboard/Widget'
import { ICpu } from '@/lib/icons'

const TOTAL = 16

export default function MemWidget({ mem }: { mem: number }) {
  const pct = (mem / TOTAL) * 100
  return (
    <Widget id="mem" icon={ICpu} label="memory" live>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 28, fontWeight: 700, color: '#7B6CF6', letterSpacing: '-0.03em' }}>{mem.toFixed(1)}</span>
          <span style={{ fontSize: 12, color: '#3F3D62' }}>GB</span>
        </div>
        <div style={{ display: 'flex', gap: 1 }}>
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} style={{ flex: 1, height: 20, borderRadius: 2, background: (i / 8) * 100 < pct ? '#7B6CF6' : '#131425', opacity: (i / 8) * 100 < pct ? 0.4 + (i / 7) * 0.6 : 1 }} />
          ))}
        </div>
        <div style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: '#3F3D62' }}>{pct.toFixed(0)}% of {TOTAL} GB</div>
      </div>
    </Widget>
  )
}
