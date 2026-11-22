import React from 'react';

// Dusk set. Backgrounds span beyond the frame (x -480..2400, y -400..1480)
// so camera pans show no black bars. Sky rect reaches down to the ground
// line, so no black band appears between sky and ground.
export const DuskSet: React.FC<{sunY?: number}> = ({sunY = 0}) => {
  return (
    <svg
      width={2400}
      height={1480}
      viewBox="0 0 2400 1480"
      style={{position: 'absolute', left: -240, top: -200}}
    >
      <defs>
        <linearGradient id="duskSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2B2A55" />
          <stop offset="55%" stopColor="#7A4A6E" />
          <stop offset="100%" stopColor="#E8824A" />
        </linearGradient>
      </defs>
      <rect x={0} y={0} width={2400} height={1080} fill="url(#duskSky)" />
      <circle cx={1800} cy={760 + sunY} r={110} fill="#FFD9A0" opacity={0.95} />
      <circle cx={300} cy={220} r={4} fill="#FFFFFF" />
      <circle cx={700} cy={140} r={3} fill="#FFFFFF" />
      <circle cx={1100} cy={260} r={4} fill="#FFFFFF" />
      <circle cx={1500} cy={160} r={3} fill="#FFFFFF" />
      <circle cx={2100} cy={300} r={4} fill="#FFFFFF" />
      <path d="M 0 980 Q 600 860 1200 960 T 2400 940 L 2400 1480 L 0 1480 Z" fill="#4A3350" />
      <rect x={0} y={1060} width={2400} height={420} fill="#2E2133" />
    </svg>
  );
};
