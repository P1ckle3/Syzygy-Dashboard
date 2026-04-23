'use client'
import { useEffect, useRef } from 'react'
import Widget from '@/components/dashboard/Widget'
import { ICpu } from '@/lib/icons'

export default function CpuWidget({ cpu, history }: { cpu: number; history: number[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    const w = c.width, h = c.height
    ctx.clearRect(0, 0, w, h)
    if (history.length < 2) return
    const color = cpu > 80 ? '#F87171' : cpu > 60 ? '#F59E0B' : '#34D399'
    ctx.strokeStyle = color
    ctx.lineWidth = 1.5
    ctx.beginPath()
    history.forEach((v, i) => {
      const x = (i / (history.length - 1)) * w
      const y = h - (v / 100) * h
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    })
    ctx.stroke()
    const grad = ctx.createLinearGradient(0, 0, 0, h)
    grad.addColorStop(0, color + '33')
    grad.addColorStop(1, 'transparent')
    ctx.fillStyle = grad
    ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath(); ctx.fill()
  }, [history, cpu])

  const color = cpu > 80 ? '#F87171' : cpu > 60 ? '#F59E0B' : '#34D399'

  return (
    <Widget id="cpu" icon={ICpu} label="cpu" live>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 28, fontWeight: 700, color, letterSpacing: '-0.03em' }}>{cpu.toFixed(0)}</span>
          <span style={{ fontSize: 12, color: '#3F3D62' }}>%</span>
        </div>
        <canvas ref={canvasRef} width={160} height={36} style={{ width: '100%', height: 36 }} />
        <div style={{ height: 3, background: '#1E1F38', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${cpu}%`, background: color, borderRadius: 2, transition: 'width 600ms' }} />
        </div>
      </div>
    </Widget>
  )
}
