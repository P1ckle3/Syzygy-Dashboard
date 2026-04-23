'use client'
import Widget from '@/components/dashboard/Widget'
import { IMoney } from '@/lib/icons'

const CATEGORIES = [
  { label: 'rent',      spent: 800, budget: 800, color: '#7B6CF6' },
  { label: 'food',      spent: 280, budget: 350, color: '#34D399' },
  { label: 'transport', spent: 95,  budget: 120, color: '#22D3EE' },
  { label: 'misc',      spent: 184, budget: 150, color: '#F87171' },
  { label: 'savings',   spent: 70,  budget: 90,  color: '#F59E0B' },
]

const totalSpent  = CATEGORIES.reduce((a, c) => a + c.spent, 0)
const totalBudget = CATEGORIES.reduce((a, c) => a + c.budget, 0)

export default function FinanceWidget() {
  return (
    <Widget id="finance" icon={IMoney} label="budget · april">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 22, fontWeight: 700, color: '#E4E2F8' }}>${totalSpent}</span>
          <span style={{ fontSize: 10, color: '#3F3D62', fontFamily: 'JetBrains Mono, monospace' }}>/ ${totalBudget}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {CATEGORIES.map(c => {
            const pct = Math.min((c.spent / c.budget) * 100, 100)
            const over = c.spent > c.budget
            return (
              <div key={c.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span style={{ fontSize: 10, color: '#8A89B0', fontFamily: 'JetBrains Mono, monospace' }}>{c.label}</span>
                  <span style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: over ? '#F87171' : '#3F3D62' }}>
                    ${c.spent}{over && ` +${c.spent - c.budget}`}
                  </span>
                </div>
                <div style={{ height: 3, background: '#1E1F38', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: over ? '#F87171' : c.color, borderRadius: 2 }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Widget>
  )
}
