interface GeometricSculptureProps {
  id?: string;
  className?: string;
}

const LEFT_LAYERS: { x: number; y: number; op: number }[] = [
  { x: 110, y: 275, op: 0.45 },
  { x: 125, y: 263, op: 0.505 },
  { x: 140, y: 251, op: 0.56 },
  { x: 155, y: 239, op: 0.615 },
  { x: 170, y: 227, op: 0.67 },
  { x: 185, y: 215, op: 0.725 },
  { x: 200, y: 203, op: 0.78 },
  { x: 215, y: 191, op: 0.835 },
  { x: 230, y: 179, op: 0.89 },
  { x: 245, y: 167, op: 0.945 },
];

const RIGHT_LAYERS: { x: number; y: number }[] = [
  { x: 650, y: 320 },
  { x: 662, y: 298 },
  { x: 674, y: 276 },
  { x: 686, y: 254 },
  { x: 698, y: 232 },
  { x: 710, y: 210 },
  { x: 722, y: 188 },
  { x: 734, y: 166 },
];

export function GeometricSculpture({
  id = "geo",
  className,
}: GeometricSculptureProps) {
  const a = `${id}-a`;
  const b = `${id}-b`;
  const g = `${id}-g`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 470"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={a} x2="1" y2="1">
          <stop stopColor="#C7C1FF" />
          <stop offset=".48" stopColor="#5046E5" />
          <stop offset="1" stopColor="#1E1B4B" />
        </linearGradient>
        <linearGradient id={b} x1="0" y1="1" x2="1" y2="0">
          <stop stopColor="#0B0F1A" />
          <stop offset="1" stopColor="#8B7CF6" />
        </linearGradient>
        <radialGradient id={g}>
          <stop stopColor="#5046E5" stopOpacity=".26" />
          <stop offset="1" stopColor="#0B0F1A" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="500" cy="260" rx="480" ry="210" fill={`url(#${g})`} />

      {LEFT_LAYERS.map(({ x, y, op }) => (
        <g key={`l-${x}-${y}`} opacity={op}>
          <path
            d={`M${x} ${y} l130 -75 130 75 -130 75z M${x + 45} ${y} l85 -49 85 49 -85 49z`}
            fill={`url(#${a})`}
            fillRule="evenodd"
            stroke="#C7C1FF"
            strokeOpacity=".36"
          />
          <path
            d={`M${x} ${y} l130 75 130 -75 v13 l-130 75 -130 -75z`}
            fill={`url(#${b})`}
          />
        </g>
      ))}

      {RIGHT_LAYERS.map(({ x, y }) => (
        <g key={`r-${x}-${y}`}>
          <path
            d={`M${x} ${y} l95 -55 95 55 -95 55z M${x + 32} ${y} l63 -36 63 36 -63 36z`}
            fill={`url(#${a})`}
            fillRule="evenodd"
            stroke="#C7C1FF"
            strokeOpacity=".4"
          />
          <path
            d={`M${x} ${y} l95 55 95 -55 v16 l-95 55 -95 -55z`}
            fill={`url(#${b})`}
          />
        </g>
      ))}

      <g transform="translate(500 230)">
        <circle
          r="142"
          fill="none"
          stroke="#8B7CF6"
          strokeOpacity=".3"
          strokeDasharray="2 8"
        />
        <circle r="172" fill="none" stroke="#8B7CF6" strokeOpacity=".2" />
        <path
          d="M0 -125 125 -53 125 90 0 162 -125 90 -125 -53Z"
          fill="#121726"
          stroke="#8B7CF6"
        />
        <path d="M0 -125 125 -53 0 19 -125 -53Z" fill={`url(#${a})`} />
        <path d="M0 19 125 -53 125 90 0 162Z" fill={`url(#${b})`} />
        <path d="M-125 -53 0 19 0 162 -125 90Z" fill="#1E1B4B" />
        <path d="M0 -82 74 -40 0 2 -74 -40Z" fill="#0B0F1A" stroke="#C7C1FF" />
        <path d="M0 -62 40 -39 0 -16 -40 -39Z" fill="#8B7CF6" />
        <g fill="none" stroke="#8B7CF6" opacity=".6">
          <path d="M-100 -16 -25 28 -25 109M-75 -1 -50 14 -50 92M25 29 100 -14 100 72 25 115Z" />
          <path d="M42 38 83 14V62L42 86Z" />
        </g>
      </g>
    </svg>
  );
}
