/**
 * The bitter lesson as a chart. Hand-coded knowledge climbs fast and flattens;
 * general methods start slower, cross it, and keep compounding. The hatched
 * wedge is the gap that opens after the crossover. The `.hint` spans in the
 * prose dim the curve they are not talking about, via :has() in globals.css.
 */
export default function BitterLesson() {
  return (
    <svg
      viewBox="0 0 420 206"
      width="100%"
      role="img"
      aria-label="Performance against compute. Hand-coded knowledge rises quickly then flattens. Search and learning starts lower, crosses it, and keeps climbing, opening a widening gap."
      className="diagram"
    >
      <defs>
        <pattern id="bl-hatch" width="5" height="5" patternUnits="userSpaceOnUse">
          <path d="M0 5 L5 0" stroke="#d8be92" strokeWidth="0.85" />
        </pattern>
        <radialGradient id="bl-spark" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff7ec" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#f7b76e" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f7b76e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g stroke="#cec5b8" strokeWidth="1">
        <path d="M42 14 L42 178" />
        <path d="M42 178 L402 178" />
      </g>

      {/* the gap the bitter lesson opens, once general methods pull ahead */}
      <path d="M292.2 74.3 L292.3 74.3 L295.5 72.2 L298.7 70.2 L301.9 68.1 L305.1 66.1 L308.4 64.1 L311.6 62.1 L314.8 60.1 L318.0 58.1 L321.3 56.1 L324.5 54.2 L327.7 52.2 L330.9 50.3 L334.1 48.4 L337.4 46.6 L340.6 44.7 L343.8 42.9 L347.0 41.1 L350.2 39.3 L353.4 37.6 L356.5 35.9 L359.7 34.2 L362.9 32.6 L366.0 31.0 L369.1 29.4 L372.3 27.9 L375.4 26.4 L378.5 25.0 L381.6 23.6 L384.6 22.2 L387.7 20.9 L390.7 19.6 L393.7 18.4 L396.7 17.2 L399.7 16.1 L400.0 16.0 L400.0 73.0 L393.1 73.0 L386.3 73.1 L379.6 73.2 L373.0 73.2 L366.5 73.3 L360.1 73.3 L353.8 73.4 L347.5 73.4 L341.4 73.5 L335.3 73.6 L329.3 73.7 L323.5 73.7 L317.7 73.8 L312.0 73.9 L306.3 74.0 L300.8 74.1 L295.3 74.2 L292.4 74.3 Z" fill="url(#bl-hatch)" opacity="0.75" />

      <g className="bl-curve" data-curve="old">
        <path
          d="M42 178 C 70 176 94 110 132 94 C 178 75 260 74 400 73"
          fill="none"
          stroke="#a79d90"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </g>

      <g className="bl-curve" data-curve="new">
        <path
          d="M42 178 C 108 176 164 156 212 126 C 268 92 340 38 400 16"
          fill="none"
          stroke="#5d5751"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </g>

      <g>
        <circle cx="292" cy="74" r="15" fill="url(#bl-spark)" className="bl-pulse" />
        <circle cx="292" cy="74" r="3" fill="#f7b76e" stroke="#5d5751" strokeWidth="1.1" />
      </g>

      <g fontFamily="var(--system-stack)" fontSize="10.5" dominantBaseline="middle">
        <text x="140" y="58" fill="#a79d90">
          hand-coded knowledge
        </text>
        <text x="252" y="32" fill="#5d5751" fontWeight={500}>
          search + learning
        </text>
        <text x="205" y="192" fill="#b3a99c">
          compute
        </text>
        <text x="14" y="16" fill="#b3a99c">
          perf
        </text>
      </g>
    </svg>
  )
}
