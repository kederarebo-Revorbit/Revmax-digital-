import React from 'react';

interface RevMaxLogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'mark-only';
  showTagline?: boolean;
}

export default function RevMaxLogo({
  className = 'h-10',
  variant = 'full',
  showTagline = true,
}: RevMaxLogoProps) {
  if (variant === 'mark-only') {
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="RevMax Logo Mark"
      >
        {/* Stylized 'R' with dynamic cyan growth arrow */}
        <rect width="100" height="100" rx="20" fill="#0A142D" />
        <path
          d="M28 26V74M28 26H52C59.7 26 66 32.3 66 40C66 47.7 59.7 54 52 54H28M48 54L68 74"
          stroke="#1E6BFF"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M50 42L62 30L68 36L82 22"
          stroke="#00D2FF"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M72 22H82V32"
          stroke="#00D2FF"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <div className={`inline-flex flex-col justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 320 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-auto h-full"
        aria-label="RevMax Digital Hospitality"
      >
        <defs>
          <filter id="glow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#00D2FF" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Wordmark "RevMax" */}
        <g>
          <text
            x="8"
            y="56"
            fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
            fontWeight="800"
            fontSize="54"
            letterSpacing="-0.03em"
            fill="#1E6BFF"
          >
            RevMax
          </text>

          {/* Growth Zigzag Arrow shooting up-right from above 'x' */}
          <g filter="url(#glow)">
            {/* The zigzag path */}
            <path
              d="M208 42 L232 26 L242 34 L266 12"
              stroke="#00D2FF"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* The Arrowhead */}
            <path
              d="M248 10 H268 V30"
              stroke="#00D2FF"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Filled arrowhead triangle for sharp precision */}
            <polygon
              points="268,10 248,15 263,30"
              fill="#00D2FF"
            />
          </g>
        </g>

        {/* Tagline: DIGITAL HOSPITALITY in electric cyan */}
        {showTagline && (
          <text
            x="10"
            y="84"
            fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
            fontWeight="800"
            fontSize="17"
            letterSpacing="0.22em"
            fill="#00D2FF"
          >
            DIGITAL HOSPITALITY
          </text>
        )}
      </svg>
    </div>
  );
}
