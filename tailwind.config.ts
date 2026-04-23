import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'bg-base':     '#07080F',
        'bg-surface':  '#0D0E1A',
        'bg-elevated': '#131425',
        'bg-overlay':  '#1C1D35',
        'border-dim':  '#1E1F38',
        'border-act':  '#3B3572',
        'text-pri':    '#E4E2F8',
        'text-sec':    '#8A89B0',
        'text-muted':  '#3F3D62',
        violet:        '#7B6CF6',
        cyan:          '#22D3EE',
        green:         '#34D399',
        amber:         '#F59E0B',
        red:           '#F87171',
        orange:        '#FB923C',
      },
      fontFamily: {
        ui:   ['var(--font-grotesk)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
