/** Lightweight SVG charts — no chart library, fully responsive. */

export function ProgressRing({ value = 0, size = 132, stroke = 11, from = '#A78BFA', to = '#22D3EE', track = 'rgba(255,255,255,0.14)', label, sub }) {
  const safe = Math.max(0, Math.min(100, value))
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c - (safe / 100) * c
  const gid = `ring-${from.replace('#', '')}-${to.replace('#', '')}-${size}`

  return (
    <div className="score-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} aria-hidden="true">
        <defs>
          <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#${gid})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.9s cubic-bezier(0.22,1,0.36,1)' }}
        />
      </svg>
      <div className="ring-label">
        <div>
          <strong>{label ?? `${safe}%`}</strong>
          {sub && <span>{sub}</span>}
        </div>
      </div>
    </div>
  )
}

export function RadarChart({ data = [], size = 340 }) {
  if (!data.length) return null
  const cx = size / 2
  const cy = size / 2
  const radius = size * 0.33
  const n = data.length
  const angle = (i) => (Math.PI * 2 * i) / n - Math.PI / 2
  const point = (i, v) => [cx + Math.cos(angle(i)) * radius * v, cy + Math.sin(angle(i)) * radius * v]
  const polygon = (values) => values.map((v, i) => point(i, v).join(',')).join(' ')

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width="100%" style={{ maxHeight: 360 }} role="img" aria-label="Skill coverage radar chart">
      {[0.25, 0.5, 0.75, 1].map((ring) => (
        <polygon
          key={ring}
          points={polygon(Array(n).fill(ring))}
          fill="none"
          stroke="#E4E7F0"
          strokeWidth={ring === 1 ? 1.4 : 1}
        />
      ))}
      {data.map((_, i) => {
        const [x, y] = point(i, 1)
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#EDEFF6" strokeWidth="1" />
      })}

      <polygon points={polygon(Array(n).fill(1))} fill="rgba(124,58,237,0.05)" stroke="#C4B5FD" strokeWidth="1.5" strokeDasharray="4 3" />
      <polygon points={polygon(data.map((d) => Math.max(0.04, d.have)))} fill="rgba(124,58,237,0.22)" stroke="#7C3AED" strokeWidth="2" />

      {data.map((d, i) => {
        const [x, y] = point(i, Math.max(0.04, d.have))
        return <circle key={i} cx={x} cy={y} r="3.4" fill="#7C3AED" stroke="#fff" strokeWidth="1.6" />
      })}

      {data.map((d, i) => {
        const [x, y] = point(i, 1.2)
        const anchor = Math.abs(x - cx) < 12 ? 'middle' : x > cx ? 'start' : 'end'
        const words = d.label.split(' ')
        const lines = words.length > 2 ? [words.slice(0, Math.ceil(words.length / 2)).join(' '), words.slice(Math.ceil(words.length / 2)).join(' ')] : [d.label]
        return (
          <text key={i} x={x} y={y} textAnchor={anchor} dominantBaseline="middle" fontSize="10.5" fill="#667089" fontWeight="500">
            {lines.map((line, li) => (
              <tspan key={li} x={x} dy={li === 0 ? (lines.length > 1 ? -5 : 0) : 12}>
                {line}
              </tspan>
            ))}
          </text>
        )
      })}
    </svg>
  )
}

export function SparkBars({ values = [], labels = [], height = 64, color = 'var(--purple-500)' }) {
  const max = Math.max(...values, 1)
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height }}>
      {values.map((v, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div
            style={{
              width: '100%',
              height: Math.max(4, (v / max) * (height - 18)),
              borderRadius: 5,
              background: i === values.length - 1 ? color : 'rgba(124,58,237,0.18)',
              transition: 'height 0.5s cubic-bezier(0.22,1,0.36,1)',
            }}
            title={`${labels[i] || ''}: ${v}`}
          />
          {labels[i] && <span style={{ fontSize: '0.65rem', color: 'var(--text-soft)' }}>{labels[i]}</span>}
        </div>
      ))}
    </div>
  )
}
