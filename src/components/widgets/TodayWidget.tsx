'use client'
import React, { useState, useEffect } from 'react'
import Widget from '@/components/dashboard/Widget'
import { ITime } from '@/lib/icons'

const DAYS   = ['sun','mon','tue','wed','thu','fri','sat']
const MONTHS = ['january','february','march','april','may','june','july','august','september','october','november','december']

export default function TodayWidget() {
  const [time, setTime] = useState<Date | null>(null)
  useEffect(() => {
    setTime(new Date())
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const h = time?.getHours() ?? 0
  const greeting = h < 12 ? 'good morning' : h < 17 ? 'good afternoon' : 'good evening'

  return (
    <Widget id="today" icon={ITime} label="today" right={<span style={{ fontSize: 9, fontFamily: 'JetBrains Mono, monospace', color: '#3F3D62' }}>{time ? greeting : ''}</span>}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, color: '#E4E2F8' }}>
          {time ? DAYS[time.getDay()] : '···'}<span style={{ color: '#7B6CF6' }}>.</span>
        </div>
        <div style={{ fontSize: 12, color: '#8A89B0' }}>
          {time ? `${MONTHS[time.getMonth()]} ${time.getDate()}` : ''}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 24, fontWeight: 600, color: '#E4E2F8', letterSpacing: '-0.02em' }}>
            {time ? time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) : '--:--'}
          </span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: '#3F3D62' }}>
            {time ? String(time.getSeconds()).padStart(2, '0') : '--'}
          </span>
        </div>
      </div>
    </Widget>
  )
}
