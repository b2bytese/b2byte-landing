interface DiscoverySculptureProps {
  className?: string;
}

const BLOCKS: { tx: number; ty: number; op: number; w: number; h1: number }[] = [
  { tx: 184.6, ty: 174.0, op: 0.92, w: 18.8, h1: 10.3 },
  { tx: 222.4, ty: 82.4, op: 0.78, w: 20.0, h1: 11.0 },
  { tx: 229.7, ty: 170.3, op: 0.84, w: 15.0, h1: 8.2 },
  { tx: 187.2, ty: 75.8, op: 0.63, w: 22.5, h1: 12.4 },
  { tx: 219.9, ty: 194.9, op: 0.52, w: 18.5, h1: 10.2 },
  { tx: 286.8, ty: 166.1, op: 0.78, w: 11.5, h1: 6.3 },
  { tx: 188.3, ty: 99.1, op: 0.55, w: 10.2, h1: 5.6 },
  { tx: 384.9, ty: 112.8, op: 0.67, w: 23.9, h1: 13.1 },
  { tx: 299.7, ty: 208.9, op: 0.51, w: 19.3, h1: 10.6 },
  { tx: 295.5, ty: 159.9, op: 0.50, w: 11.7, h1: 6.4 },
  { tx: 361.2, ty: 135.3, op: 0.68, w: 11.9, h1: 6.5 },
  { tx: 210.2, ty: 193.6, op: 0.50, w: 16.5, h1: 9.1 },
  { tx: 348.2, ty: 48.4, op: 0.46, w: 13.2, h1: 7.3 },
  { tx: 330.3, ty: 53.3, op: 0.50, w: 16.9, h1: 9.3 },
  { tx: 270.5, ty: 170.5, op: 0.68, w: 17.0, h1: 9.4 },
  { tx: 271.5, ty: 119.6, op: 0.50, w: 17.9, h1: 9.9 },
  { tx: 269.1, ty: 78.4, op: 0.92, w: 22.0, h1: 12.1 },
  { tx: 175.3, ty: 59.4, op: 0.74, w: 19.6, h1: 10.8 },
  { tx: 164.4, ty: 174.5, op: 0.66, w: 23.2, h1: 12.7 },
  { tx: 239.9, ty: 146.7, op: 0.58, w: 23.1, h1: 12.7 },
  { tx: 229.5, ty: 68.7, op: 0.68, w: 18.4, h1: 10.1 },
  { tx: 218.9, ty: 109.5, op: 0.61, w: 9.5, h1: 5.2 },
  { tx: 386.1, ty: 150.1, op: 0.92, w: 13.2, h1: 7.3 },
  { tx: 242.4, ty: 81.6, op: 0.52, w: 9.5, h1: 5.2 },
  { tx: 205.8, ty: 77.2, op: 0.58, w: 22.1, h1: 12.2 },
  { tx: 217.2, ty: 153.8, op: 0.60, w: 22.8, h1: 12.5 },
  { tx: 335.2, ty: 105.6, op: 0.75, w: 17.4, h1: 9.6 },
  { tx: 376.7, ty: 185.2, op: 0.87, w: 16.6, h1: 9.1 },
  { tx: 244.3, ty: 108.7, op: 0.72, w: 23.4, h1: 12.9 },
  { tx: 337.9, ty: 94.5, op: 0.76, w: 22.7, h1: 12.5 },
  { tx: 216.9, ty: 221.4, op: 0.62, w: 16.0, h1: 8.8 },
  { tx: 220.4, ty: 51.2, op: 0.80, w: 12.0, h1: 6.6 },
  { tx: 192.3, ty: 83.0, op: 0.72, w: 15.7, h1: 8.6 },
  { tx: 247.5, ty: 190.9, op: 0.63, w: 12.9, h1: 7.1 },
  { tx: 257.8, ty: 56.4, op: 0.52, w: 12.3, h1: 6.8 },
  { tx: 326.8, ty: 60.0, op: 0.56, w: 19.0, h1: 10.5 },
];

function blockPaths(w: number, h1: number) {
  const w2 = 2 * w;
  return {
    top: `M0 0 ${w} ${-h1} ${w2} 0 ${w} ${h1}Z`,
    left: `M0 0 ${w} ${h1} ${w} ${h1 + w} 0 ${w}Z`,
    right: `M${w} ${h1} ${w2} 0 ${w2} ${w} ${w} ${h1 + w}Z`,
  };
}

export function DiscoverySculpture({ className }: DiscoverySculptureProps) {
  return (
    <svg
      viewBox="0 0 420 360"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="ds-metal" x1="0" y1="0" x2=".8" y2="1">
          <stop stopColor="#C7C1FF" />
          <stop offset=".24" stopColor="#8B7CF6" />
          <stop offset=".49" stopColor="#34394F" />
          <stop offset=".76" stopColor="#5046E5" />
          <stop offset="1" stopColor="#121726" />
        </linearGradient>
        <radialGradient id="ds-core" cx=".32" cy=".25" r=".78">
          <stop stopColor="#F5F7FF" />
          <stop offset=".18" stopColor="#C7C1FF" />
          <stop offset=".45" stopColor="#8B7CF6" />
          <stop offset=".72" stopColor="#5046E5" />
          <stop offset="1" stopColor="#1E1B4B" />
        </radialGradient>
        <linearGradient id="ds-glass" x2="1" y2="1">
          <stop stopColor="#C7C1FF" stopOpacity=".55" />
          <stop offset=".5" stopColor="#8B7CF6" stopOpacity=".06" />
          <stop offset="1" stopColor="#5046E5" stopOpacity=".4" />
        </linearGradient>
        <filter id="ds-blur">
          <feGaussianBlur stdDeviation="17" />
        </filter>
      </defs>

      <ellipse
        cx="180" cy="310" rx="135" ry="30"
        fill="#5046E5" opacity=".45"
        filter="url(#ds-blur)"
      />

      <g transform="translate(30 95) rotate(-12 110 120)">
        <rect
          x="24" y="32" width="210" height="230" rx="23"
          fill="url(#ds-glass)" stroke="#8B7CF6" strokeWidth="2"
        />
        <circle cx="124" cy="163" r="67" fill="url(#ds-core)" />
        <rect
          x="14" y="22" width="210" height="230" rx="23"
          fill="url(#ds-glass)" stroke="#C7C1FF" strokeOpacity=".65" strokeWidth="2"
        />
        <path
          d="M37 35H151M27 44V151"
          stroke="#F5F7FF" strokeOpacity=".7" strokeWidth="3" strokeLinecap="round"
        />
      </g>

      {BLOCKS.map(({ tx, ty, op, w, h1 }, i) => {
        const p = blockPaths(w, h1);
        return (
          <g key={i} transform={`translate(${tx} ${ty})`} opacity={op}>
            <path d={p.top} fill="#C7C1FF" fillOpacity=".64" stroke="#C7C1FF" strokeOpacity=".7" />
            <path d={p.left} fill="url(#ds-metal)" />
            <path d={p.right} fill="#5046E5" fillOpacity=".7" />
          </g>
        );
      })}
    </svg>
  );
}
