'use client'
import React, { useState, useEffect } from 'react'
import { IChevron } from '@/lib/icons'

const getCollapseState = (): Record<string, boolean> => {
  if (typeof window === 'undefined') return {}
  try { return JSON.parse(localStorage.getItem('sz-collapse') || '{}') } catch { return {} }
}

export function useCollapse(id: string, def = false) {
  const [collapsed, setCollapsed] = useState(def)
  useEffect(() => {
    const s = getCollapseState()
    if (id in s) setCollapsed(s[id])
  }, [id])
  const toggle = () => setCollapsed(v => {
    const n = !v
    const s = getCollapseState()
    s[id] = n
    localStorage.setItem('sz-collapse', JSON.stringify(s))
    return n
  })
  return [collapsed, toggle] as const
}

type Props = {
  id: string
  icon?: React.ComponentType<{ size?: number }>
  label: string
  right?: React.ReactNode
  live?: boolean
  children: React.ReactNode
  style?: React.CSSProperties
  defaultCollapsed?: boolean
}

export default function Widget({ id, icon: Icon, label, right, live, children, style = {}, defaultCollapsed = false }: Props) {
  const [hover, setHover] = useState(false)
  const [collapsed, toggle] = useCollapse(id, defaultCollapsed)

  return (
    <div
      style={{
        background: '#0D0E1A',
        border: `1px solid ${hover ? '#3B3572' : '#1E1F38'}`,
        borderRadius: 6,
        transition: 'border-color 120ms',
        overflow: 'hidden',
        ...style,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '9px 13px', cursor: 'pointer', userSelect: 'none',
          borderBottom: collapsed ? 'none' : '1px solid #141529',
        }}
        onClick={toggle}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {Icon && <span style={{ color: '#3F3D62', display: 'flex' }}><Icon size={12} /></span>}
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8A89B0' }}>
            {label}
          </span>
          {live && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 9, fontFamily: 'JetBrains Mono, monospace', color: '#34D399' }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#34D399', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              live
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {right}
          <span style={{ color: '#3F3D62', display: 'flex', transform: collapsed ? 'rotate(-90deg)' : 'rotate(0deg)', transition: 'transform 150ms cubic-bezier(0.2,0,0,1)' }}>
            <IChevron size={10} />
          </span>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateRows: collapsed ? '0fr' : '1fr', transition: 'grid-template-rows 200ms cubic-bezier(0.2,0,0,1)' }}>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ padding: '10px 13px 13px' }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Badge({ children, color = '#7B6CF6' }: { children: React.ReactNode; color?: string }) {
  const rgbMap: Record<string, string> = {
    '#7B6CF6': '123,108,246',
    '#34D399': '52,211,153',
    '#F87171': '248,113,113',
    '#F59E0B': '245,158,11',
    '#22D3EE': '34,211,238',
  }
  const rgb = rgbMap[color] || '123,108,246'
  return (
    <span style={{ fontSize: 9, fontFamily: 'JetBrains Mono, monospace', background: `rgba(${rgb},0.12)`, color, borderRadius: 2, padding: '2px 5px' }}>
      {children}
    </span>
  )
}

export function Mono({ children, color = '#E4E2F8', size = 11, style = {} }: { children: React.ReactNode; color?: string; size?: number; style?: React.CSSProperties }) {
  return <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: size, color, ...style }}>{children}</span>
}
