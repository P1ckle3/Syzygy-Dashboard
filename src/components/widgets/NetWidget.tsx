'use client'
import Widget from '@/components/dashboard/Widget'
import { INetwork } from '@/lib/icons'

export default function NetWidget({ net, history }: { net: number; history: number[] }) {
  const points = history.length < 2 ? undefined : history.map((v, i) => {
    const x = (i / (history.length - 1)) * 100
    const y = 100 - (v / 100) * 100
    return `${x},${y}`
  }).join(' ')

  return (
    <Widget id="net" icon={INetwork} label="network" live>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 28, fontWeight: 700, color: '#22D3EE', letterSpacing: '-0.03em' }}>{net.toFixed(0)}</span>
          <span style={{ fontSize: 12, color: '#3F3D62' }}>MB/s</span>
        </div>
        <svg viewBox="0 0 100 40" style={{ width: '100%', height: 36 }} preserveAspectRatio="none">
          {points && (
            <>
              <polyline points={points} fill="none" stroke="#22D3EE" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <polygon points={`${points} 100,100 0,100`} fill="rgba(34,211,238,0.1)" />
            </>
          )}
        </svg>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, fontFamily: 'JetBrains Mono, monospace', color: '#3F3D62' }}>
          <span>↑ {(net * 0.4).toFixed(1)}</span>
          <span>↓ {(net * 0.6).toFixed(1)}</span>
        </div>
      </div>
    </Widget>
  )
}
