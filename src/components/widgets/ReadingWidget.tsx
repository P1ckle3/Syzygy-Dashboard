'use client'
import Widget from '@/components/dashboard/Widget'
import { IBook } from '@/lib/icons'

const BOOKS = [
  { title: 'Dune', author: 'Herbert', page: 312, total: 412, color: '#7B6CF6' },
  { title: 'The Dispossessed', author: 'Le Guin', page: 89, total: 387, color: '#22D3EE' },
]

export default function ReadingWidget() {
  return (
    <Widget id="reading" icon={IBook} label="reading">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {BOOKS.map(b => {
          const pct = (b.page / b.total) * 100
          return (
            <div key={b.title}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <div>
                  <div style={{ fontSize: 12, color: '#E4E2F8', fontWeight: 500 }}>{b.title}</div>
                  <div style={{ fontSize: 10, color: '#3F3D62', fontFamily: 'JetBrains Mono, monospace' }}>{b.author}</div>
                </div>
                <span style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: b.color }}>{pct.toFixed(0)}%</span>
              </div>
              <div style={{ height: 3, background: '#1E1F38', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, background: b.color, borderRadius: 2 }} />
              </div>
              <div style={{ fontSize: 9, fontFamily: 'JetBrains Mono, monospace', color: '#3F3D62', marginTop: 3 }}>p.{b.page} / {b.total}</div>
            </div>
          )
        })}
      </div>
    </Widget>
  )
}
