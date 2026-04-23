'use client'
import React, { useState, useEffect, useRef } from 'react'
import Sidebar    from '@/components/layout/Sidebar'
import TopBar     from '@/components/layout/TopBar'
import AIPanel    from '@/components/layout/AIPanel'
import TodayWidget    from '@/components/widgets/TodayWidget'
import StreakWidget   from '@/components/widgets/StreakWidget'
import FocusWidget    from '@/components/widgets/FocusWidget'
import CpuWidget      from '@/components/widgets/CpuWidget'
import MemWidget      from '@/components/widgets/MemWidget'
import NetWidget      from '@/components/widgets/NetWidget'
import WeeklyWidget   from '@/components/widgets/WeeklyWidget'
import UpcomingWidget from '@/components/widgets/UpcomingWidget'
import HabitWidget    from '@/components/widgets/HabitWidget'
import TasksWidget    from '@/components/widgets/TasksWidget'
import ReadingWidget  from '@/components/widgets/ReadingWidget'
import FinanceWidget  from '@/components/widgets/FinanceWidget'
import SystemWidget   from '@/components/widgets/SystemWidget'
import NotesWidget    from '@/components/widgets/NotesWidget'

const rand = (a: number, b: number) => Math.random() * (b - a) + a

const HIST_LEN = 30

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState('dashboard')
  const [aiOpen, setAiOpen]       = useState(false)

  const [cpu, setCpu] = useState(47.3)
  const [mem, setMem] = useState(4.7)
  const [net, setNet] = useState(38.4)
  const cpuHistory = useRef<number[]>(Array(HIST_LEN).fill(47.3))
  const netHistory = useRef<number[]>(Array(HIST_LEN).fill(38.4))
  const [, forceRender] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      const newCpu = Math.min(99, Math.max(5, cpu + rand(-4, 4)))
      const newMem = Math.min(15.8, Math.max(2, mem + rand(-0.1, 0.1)))
      const newNet = Math.min(95, Math.max(1, net + rand(-10, 10)))
      cpuHistory.current = [...cpuHistory.current.slice(1), newCpu]
      netHistory.current = [...netHistory.current.slice(1), newNet]
      setCpu(newCpu)
      setMem(newMem)
      setNet(newNet)
      forceRender(n => n + 1)
    }, 2000)
    return () => clearInterval(t)
  })

  const gap = 12

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', zIndex: 1 }}>
      <TopBar cpu={cpu} mem={mem} onAI={() => setAiOpen(o => !o)} />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        <Sidebar active={activeNav} onNav={setActiveNav} onAI={() => setAiOpen(o => !o)} />

        {/* Main scroll area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: gap + 4, background: '#07080F' }}>

          {activeNav === 'dashboard' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap }}>

              {/* Row 1: Life (left half) | System (right half) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap }}>
                {/* Life */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap, padding: '10px 12px', background: 'rgba(123,108,246,0.03)', border: '1px solid rgba(123,108,246,0.08)', borderRadius: 6 }}>
                  <div style={{ gridColumn: '1/-1', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                    <span style={{ fontSize: 9, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#3B3572' }}>life</span>
                    <div style={{ flex: 1, height: 1, background: 'rgba(123,108,246,0.1)' }} />
                  </div>
                  <TodayWidget />
                  <StreakWidget />
                  <FocusWidget />
                </div>
                {/* System */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap, padding: '10px 12px', background: 'rgba(34,211,238,0.02)', border: '1px solid rgba(34,211,238,0.07)', borderRadius: 6 }}>
                  <div style={{ gridColumn: '1/-1', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                    <span style={{ fontSize: 9, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1E4A52' }}>system</span>
                    <div style={{ flex: 1, height: 1, background: 'rgba(34,211,238,0.08)' }} />
                  </div>
                  <CpuWidget cpu={cpu} history={cpuHistory.current} />
                  <MemWidget mem={mem} />
                  <NetWidget net={net} history={netHistory.current} />
                </div>
              </div>

              {/* Row 2: Weekly calendar */}
              <WeeklyWidget />

              {/* Row 3: Upcoming | Habits | Tasks */}
              <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 1fr', gap, alignItems: 'start' }}>
                <UpcomingWidget />
                <HabitWidget />
                <TasksWidget />
              </div>

              {/* Row 4: Reading | Finance | System compact | Notes */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap }}>
                <ReadingWidget />
                <FinanceWidget />
                <SystemWidget cpu={cpu} mem={mem} net={net} />
                <NotesWidget />
              </div>

            </div>
          )}

          {activeNav !== 'dashboard' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: 12, color: '#3F3D62' }}>
              <div style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace' }}>{activeNav} · not yet implemented</div>
              <div style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: '#1E1F38' }}>coming soon</div>
            </div>
          )}
        </div>

        <AIPanel open={aiOpen} onClose={() => setAiOpen(false)} />
      </div>
    </div>
  )
}
