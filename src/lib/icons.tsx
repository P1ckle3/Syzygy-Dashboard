'use client'
import React from 'react'

const Svg = ({ size = 16, children, ...p }: { size?: number; children: React.ReactNode } & React.SVGProps<SVGSVGElement>) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    {children}
  </svg>
)

export const IGrid     = ({size=16}: {size?:number}) => <Svg size={size}><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></Svg>
export const ICheck    = ({size=16}: {size?:number}) => <Svg size={size}><polyline points="2,8 6,12 14,4"/></Svg>
export const ICal      = ({size=16}: {size?:number}) => <Svg size={size}><rect x="1" y="3" width="14" height="12" rx="1.5"/><path d="M1 7h14M5 1v4M11 1v4"/></Svg>
export const ITarget   = ({size=16}: {size?:number}) => <Svg size={size}><circle cx="8" cy="8" r="7"/><circle cx="8" cy="8" r="4"/><circle cx="8" cy="8" r="1" fill="currentColor" stroke="none"/></Svg>
export const ITime     = ({size=16}: {size?:number}) => <Svg size={size}><circle cx="8" cy="8" r="7"/><polyline points="8,4 8,8 11,10"/></Svg>
export const IBook     = ({size=16}: {size?:number}) => <Svg size={size}><path d="M2 3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3z"/><line x1="5" y1="1" x2="5" y2="15"/></Svg>
export const IMoney    = ({size=16}: {size?:number}) => <Svg size={size}><circle cx="8" cy="8" r="7"/><path d="M8 4v1m0 6v1M5.5 6.5C5.5 5.7 6.6 5 8 5s2.5.7 2.5 1.5S9.4 8 8 8s-2.5.7-2.5 1.5S6.6 11 8 11s2.5-.7 2.5-1.5"/></Svg>
export const ISpark    = ({size=16}: {size?:number}) => <Svg size={size}><path d="M8 2l1 3 3 1-3 1-1 3-1-3-3-1 3-1z"/><path d="M13 10l.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5-1.5-.5 1.5-.5z"/></Svg>
export const IPlus     = ({size=16}: {size?:number}) => <Svg size={size}><line x1="8" y1="2" x2="8" y2="14"/><line x1="2" y1="8" x2="14" y2="8"/></Svg>
export const IClose    = ({size=16}: {size?:number}) => <Svg size={size}><line x1="3" y1="3" x2="13" y2="13"/><line x1="13" y1="3" x2="3" y2="13"/></Svg>
export const IMore     = ({size=16}: {size?:number}) => <Svg size={size}><circle cx="4" cy="8" r="1"/><circle cx="8" cy="8" r="1"/><circle cx="12" cy="8" r="1"/></Svg>
export const ISend     = ({size=16}: {size?:number}) => <Svg size={size}><line x1="14" y1="2" x2="7" y2="9"/><polygon points="14,2 9,14 7,9 2,7"/></Svg>
export const ISettings = ({size=16}: {size?:number}) => <Svg size={size}><circle cx="8" cy="8" r="2.5"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.2 3.2l1.4 1.4M11.4 11.4l1.4 1.4M11.4 4.6l1.4-1.4M3.2 12.8l1.4-1.4"/></Svg>
export const IDatabase = ({size=16}: {size?:number}) => <Svg size={size}><ellipse cx="8" cy="4" rx="6" ry="2"/><path d="M2 4v4c0 1.1 2.7 2 6 2s6-.9 6-2V4"/><path d="M2 8v4c0 1.1 2.7 2 6 2s6-.9 6-2V8"/></Svg>
export const IActivity = ({size=16}: {size?:number}) => <Svg size={size}><polyline points="1,8 4,3 7,11 10,5 13,8 15,7"/></Svg>
export const IFlame    = ({size=16}: {size?:number}) => <Svg size={size}><path d="M8 14c-3.3 0-6-2.5-6-5.5 0-2 1-3.5 2.5-4.5 0 1.5.5 2.5 1.5 3 0-2 1-4 3-5.5.5 2 1.5 3 2.5 3.5.5-.5 1-1.5 1-2.5 1.5 1 2.5 3 2.5 6C15 11.5 11.3 14 8 14z"/></Svg>
export const IChevron  = ({size=16, up=false}: {size?:number; up?:boolean}) => <Svg size={size}><polyline points={up ? "3,11 8,5 13,11" : "3,5 8,11 13,5"}/></Svg>
export const ICpu      = ({size=16}: {size?:number}) => <Svg size={size}><rect x="3" y="3" width="10" height="10" rx="1"/><line x1="6" y1="1" x2="6" y2="3"/><line x1="10" y1="1" x2="10" y2="3"/><line x1="6" y1="13" x2="6" y2="15"/><line x1="10" y1="13" x2="10" y2="15"/><line x1="1" y1="6" x2="3" y2="6"/><line x1="1" y1="10" x2="3" y2="10"/><line x1="13" y1="6" x2="15" y2="6"/><line x1="13" y1="10" x2="15" y2="10"/></Svg>
export const INetwork  = ({size=16}: {size?:number}) => <Svg size={size}><circle cx="8" cy="8" r="2"/><path d="M8 2c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6z" strokeDasharray="3 2"/></Svg>
export const INote     = ({size=16}: {size?:number}) => <Svg size={size}><path d="M13 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h7l4-4V3a1 1 0 0 0-1-1z"/><line x1="6" y1="6" x2="10" y2="6"/><line x1="6" y1="9" x2="9" y2="9"/></Svg>
