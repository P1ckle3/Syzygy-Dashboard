'use client'
import React, { useState } from 'react'
import { IGrid, ICal, IActivity, IMoney, IBook, ISettings, ISpark, IDatabase } from '@/lib/icons'

const NAV = [
  { id: 'dashboard', label: 'dashboard', Icon: IGrid },
  { id: 'schedule',  label: 'schedule',  Icon: ICal },
  { id: 'habits',    label: 'habits',    Icon: IActivity },
  { id: 'finance',   label: 'finance',   Icon: IMoney },
  { id: 'storage',   label: 'storage',   Icon: IDatabase },
  { id: 'reading',   label: 'reading',   Icon: IBook },
]

function NavItem({ id, label, Icon, active, onClick }: { id: string; label: string; Icon: React.ComponentType<{size?:number}>; active: boolean; onClick: () => void }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '7px 16px',
        fontSize: 12, cursor: 'pointer', userSelect: 'none', transition: 'all 120ms',
        color: active || hover ? '#E4E2F8' : '#8A89B0',
        borderLeft: `3px solid ${active ? '#7B6CF6' : hover ? '#3B3572' : 'transparent'}`,
        background: active || hover ? '#131425' : 'transparent',
      }}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Icon size={14} /><span>{label}</span>
    </div>
  )
}

type Props = { active: string; onNav: (id: string) => void; onAI: () => void }

export default function Sidebar({ active, onNav, onAI }: Props) {
  return (
    <div style={{ width: 196, background: '#0D0E1A', borderRight: '1px solid #1E1F38', display: 'flex', flexDirection: 'column', flexShrink: 0, height: '100%', zIndex: 10 }}>
      {/* Logo */}
      <div style={{ padding: '14px 16px 12px', borderBottom: '1px solid #141529', display: 'flex', alignItems: 'center', gap: 8 }}>
        <svg width="22" height="22" viewBox="0 0 120 120" fill="none">
          <defs>
            <filter id="sf" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <clipPath id="sc"><circle cx="60" cy="60" r="53"/></clipPath>
          </defs>
          <circle cx="60" cy="60" r="50" stroke="#7B6CF6" strokeWidth="1.5" filter="url(#sf)"/>
          <circle cx="36" cy="36" r="38" stroke="#7B6CF6" strokeWidth="1.2" opacity="0.45" clipPath="url(#sc)"/>
          <circle cx="72" cy="50" r="15" stroke="#22D3EE" strokeWidth="1.5" filter="url(#sf)"/>
          <circle cx="72" cy="50" r="3" fill="#22D3EE"/>
          <circle cx="60" cy="10" r="2.5" fill="#7B6CF6" opacity="0.75"/>
        </svg>
        <span style={{ fontSize: 15, fontWeight: 600, color: '#E4E2F8', letterSpacing: '-0.02em' }}>
          sy<span style={{ color: '#7B6CF6' }}>z</span>ygy
        </span>
      </div>

      {/* Nav */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1, padding: '8px 0', flex: 1 }}>
        {NAV.map(item => (
          <NavItem key={item.id} {...item} active={active === item.id} onClick={() => onNav(item.id)} />
        ))}
      </div>

      {/* AI button */}
      <AiBtn onClick={onAI} />

      <div style={{ borderTop: '1px solid #141529', margin: '8px 0' }} />
      <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#3F3D62', padding: '0 16px 4px', fontFamily: 'JetBrains Mono, monospace' }}>system</div>
      <NavItem id="settings" label="settings" Icon={ISettings} active={active === 'settings'} onClick={() => onNav('settings')} />

      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 6, borderTop: '1px solid #141529' }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34D399', animation: 'pulse 3s infinite' }} />
        <span style={{ fontSize: 10, color: '#3F3D62', fontFamily: 'JetBrains Mono, monospace' }}>all systems nominal</span>
      </div>
    </div>
  )
}

function AiBtn({ onClick }: { onClick: () => void }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      style={{ margin: '4px 10px', padding: '8px 12px', background: hover ? 'rgba(123,108,246,0.15)' : 'rgba(123,108,246,0.08)', border: '1px solid rgba(123,108,246,0.2)', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer', color: '#7B6CF6', fontSize: 12, fontWeight: 500, transition: 'background 120ms' }}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <ISpark size={14} /><span>ask ai</span>
      <div style={{ marginLeft: 'auto', fontSize: 9, fontFamily: 'JetBrains Mono, monospace', background: 'rgba(123,108,246,0.2)', color: '#7B6CF6', borderRadius: 2, padding: '1px 4px' }}>β</div>
    </div>
  )
}
