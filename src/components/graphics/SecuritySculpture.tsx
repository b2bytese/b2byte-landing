interface SecuritySculptureProps {
  className?: string;
}

export function SecuritySculpture({ className }: SecuritySculptureProps) {
  return (
    <svg
      viewBox="0 0 420 360"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="ss-metal" x1="0" y1="0" x2=".8" y2="1">
          <stop stopColor="#C7C1FF" />
          <stop offset=".24" stopColor="#8B7CF6" />
          <stop offset=".49" stopColor="#34394F" />
          <stop offset=".76" stopColor="#5046E5" />
          <stop offset="1" stopColor="#121726" />
        </linearGradient>
        <radialGradient id="ss-core" cx=".32" cy=".25" r=".78">
          <stop stopColor="#F5F7FF" />
          <stop offset=".18" stopColor="#C7C1FF" />
          <stop offset=".45" stopColor="#8B7CF6" />
          <stop offset=".72" stopColor="#5046E5" />
          <stop offset="1" stopColor="#1E1B4B" />
        </radialGradient>
        <linearGradient id="ss-glass" x2="1" y2="1">
          <stop stopColor="#C7C1FF" stopOpacity=".55" />
          <stop offset=".5" stopColor="#8B7CF6" stopOpacity=".06" />
          <stop offset="1" stopColor="#5046E5" stopOpacity=".4" />
        </linearGradient>
        <filter id="ss-blur">
          <feGaussianBlur stdDeviation="17" />
        </filter>
      </defs>

      <ellipse
        cx="210" cy="315" rx="100" ry="24"
        fill="#5046E5" opacity=".5"
        filter="url(#ss-blur)"
      />

      <circle cx="210" cy="180" r="85" fill="url(#ss-core)" />

      <g stroke="#C7C1FF" strokeWidth="2.2" strokeLinejoin="round">
        <path
          d="M210 22 347 100 360 236 210 335 60 236 73 100Z"
          fill="url(#ss-glass)"
        />
        <path
          d="M210 22 147 132 73 100 60 236 147 132 210 245 60 236 210 335 210 245 360 236 273 132 347 100 210 22 273 132 147 132 210 245 273 132 360 236"
          fill="none"
        />
        <path
          d="M210 22 147 132 273 132Z"
          fill="#C7C1FF" fillOpacity=".18"
        />
        <path
          d="M210 245 360 236 210 335Z"
          fill="#5046E5" fillOpacity=".25"
        />
      </g>
    </svg>
  );
}
