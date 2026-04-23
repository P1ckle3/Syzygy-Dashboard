'use client'
import Widget from '@/components/dashboard/Widget'
import { IDatabase } from '@/lib/icons'

const SERVICES = [
  { name: 'nginx',   status: 'online'   },
  { name: 'sqlite',  status: 'online'   },
  { name: 'redis',   status: 'degraded' },
  { name: 'n8n',     status: 'online'   },
]

const STATUS_COLOR: Record<string, string> = { online: '#34D399', degraded: '#FB923C', offline: '#F87171' }

export default function SystemWidget({ cpu, mem, net }: { cpu: number; mem: number; net: number }) {
  return (
    <Widget id="system" icon={IDatabase} label="services" live>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4 }}>
          {[
            { label: 'cpu', val: `${cpu.toFixed(0)}%`, color: cpu > 80 ? '#F87171' : cpu > 60 ? '#F59E0B' : '#34D399' },
            { label: 'mem', val: `${mem.toFixed(1)}G`, color: '#7B6CF6' },
            { label: 'net', val: `${net.toFixed(0)}M`, color: '#22D3EE' },
          ].map(s => (
            <div key={s.label} style={{ background: '#131425', borderRadius: 4, padding: '5px 6px', textAlign: 'center' }}>
              <div style={{ fontSize: 9, fontFamily: 'JetBrains Mono, monospace', color: '#3F3D62', marginBottom: 2 }}>{s.label}</div>
              <div style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, color: s.color }}>{s.val}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {SERVICES.map(s => (
            <div key={s.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 6px', borderRadius: 3, background: '#131425' }}>
              <span style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: '#8A89B0' }}>{s.name}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: STATUS_COLOR[s.status], animation: s.status === 'online' ? 'pulse 3s infinite' : 'none' }} />
                <span style={{ fontSize: 9, fontFamily: 'JetBrains Mono, monospace', color: STATUS_COLOR[s.status] }}>{s.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Widget>
  )
}
