interface GrowthSculptureProps {
  className?: string;
}

export function GrowthSculpture({ className }: GrowthSculptureProps) {
  return (
    <svg
      viewBox="0 0 420 360"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="gs-metal" x1="0" y1="0" x2=".8" y2="1">
          <stop stopColor="#C7C1FF" />
          <stop offset=".24" stopColor="#8B7CF6" />
          <stop offset=".49" stopColor="#34394F" />
          <stop offset=".76" stopColor="#5046E5" />
          <stop offset="1" stopColor="#121726" />
        </linearGradient>
        <filter id="gs-blur">
          <feGaussianBlur stdDeviation="17" />
        </filter>
      </defs>

      <ellipse
        cx="210" cy="290" rx="140" ry="25"
        fill="#5046E5" opacity=".5"
        filter="url(#gs-blur)"
      />

      <g transform="rotate(-28 210 170)">
        <ellipse
          cx="145" cy="170" rx="100" ry="75"
          fill="none" stroke="#1E1B4B" strokeWidth="45"
        />
        <ellipse
          cx="145" cy="160" rx="100" ry="75"
          fill="none" stroke="url(#gs-metal)" strokeWidth="38"
        />

        <ellipse
          cx="270" cy="195" rx="100" ry="75"
          fill="none" stroke="#1E1B4B" strokeWidth="45"
        />
        <ellipse
          cx="270" cy="185" rx="100" ry="75"
          fill="none" stroke="url(#gs-metal)" strokeWidth="38"
        />

        <path
          d="M47 160A100 75 0 0 1 245 160"
          fill="none" stroke="#C7C1FF" strokeWidth="3" opacity=".7"
        />
        <path
          d="M170 185A100 75 0 0 1 370 185"
          fill="none" stroke="#C7C1FF" strokeWidth="3" opacity=".7"
        />
      </g>
    </svg>
  );
}
