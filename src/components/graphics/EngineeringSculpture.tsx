interface EngineeringSculptureProps {
  className?: string;
}

export function EngineeringSculpture({ className }: EngineeringSculptureProps) {
  return (
    <svg
      viewBox="0 0 420 360"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="es-metal" x1="0" y1="0" x2=".8" y2="1">
          <stop stopColor="#C7C1FF" />
          <stop offset=".24" stopColor="#8B7CF6" />
          <stop offset=".49" stopColor="#34394F" />
          <stop offset=".76" stopColor="#5046E5" />
          <stop offset="1" stopColor="#121726" />
        </linearGradient>
        <radialGradient id="es-core" cx=".32" cy=".25" r=".78">
          <stop stopColor="#F5F7FF" />
          <stop offset=".18" stopColor="#C7C1FF" />
          <stop offset=".45" stopColor="#8B7CF6" />
          <stop offset=".72" stopColor="#5046E5" />
          <stop offset="1" stopColor="#1E1B4B" />
        </radialGradient>
        <linearGradient id="es-glass" x2="1" y2="1">
          <stop stopColor="#C7C1FF" stopOpacity=".55" />
          <stop offset=".5" stopColor="#8B7CF6" stopOpacity=".06" />
          <stop offset="1" stopColor="#5046E5" stopOpacity=".4" />
        </linearGradient>
        <filter id="es-blur">
          <feGaussianBlur stdDeviation="17" />
        </filter>
      </defs>

      <ellipse
        cx="210" cy="310" rx="130" ry="26"
        fill="#5046E5" opacity=".55"
        filter="url(#es-blur)"
      />

      <circle
        cx="210" cy="176" r="142"
        fill="url(#es-glass)" stroke="#C7C1FF" strokeWidth="2" strokeOpacity=".7"
      />
      <circle cx="210" cy="176" r="94" fill="url(#es-core)" />

      <ellipse
        cx="210" cy="176" rx="151" ry="55"
        transform="rotate(-28 210 176)"
        fill="none" stroke="url(#es-metal)" strokeWidth="16"
      />
      <ellipse
        cx="210" cy="176" rx="151" ry="55"
        transform="rotate(-28 210 176)"
        fill="none" stroke="#C7C1FF" strokeOpacity=".6" strokeWidth="2"
      />

      <path
        d="M101 119 Q144 45 230 41"
        fill="none" stroke="#F5F7FF" strokeOpacity=".5" strokeWidth="5" strokeLinecap="round"
      />
    </svg>
  );
}
