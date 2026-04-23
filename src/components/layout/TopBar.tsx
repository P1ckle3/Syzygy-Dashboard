'use client'
import React, { useState, useEffect } from 'react'
import { ISpark } from '@/lib/icons'

type Props = { cpu: number; mem: number; onAI: () => void }

export default function TopBar({ cpu, mem, onAI }: Props) {
  const [time, setTime] = useState<string | null>(null)
  const [hover, setHover] = useState(false)

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
    tick()
    const t = setInterval(tick, 1000)
    return () => clearInterval(t)
  }, [])

  const pills = [
    { label: 'cpu',    val: `${cpu.toFixed(0)}%`,   color: cpu > 80 ? '#F87171' : cpu > 60 ? '#F59E0B' : '#34D399' },
    { label: 'mem',    val: `${mem.toFixed(1)} GB`,  color: '#7B6CF6' },
    { label: 'uptime', val: '12d 4h',                color: '#8A89B0' },
  ]

  return (
    <div style={{ height: 40, background: '#0D0E1A', borderBottom: '1px solid #1E1F38', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', flexShrink: 0, zIndex: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {pills.map(p => (
          <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '3px 8px', borderRadius: 3, background: '#131425' }}>
            <span style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: '#3F3D62', letterSpacing: '0.06em' }}>{p.label}</span>
            <span style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, color: p.color }}>{p.val}</span>
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '3px 8px', borderRadius: 3, background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.15)' }}>
          <span style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: '#F87171', letterSpacing: '0.04em' }}>2 due today</span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: '#3F3D62', letterSpacing: '0.04em' }}>{time ?? '--:--:--'}</span>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', background: hover ? 'rgba(123,108,246,0.15)' : 'rgba(123,108,246,0.08)', border: '1px solid rgba(123,108,246,0.2)', borderRadius: 4, color: '#7B6CF6', fontSize: 11, cursor: 'pointer', transition: 'background 120ms' }}
          onClick={onAI}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <ISpark size={12} /><span>ask ai</span>
        </div>
      </div>
    </div>
  )
}
