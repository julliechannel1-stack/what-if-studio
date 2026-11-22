import React from 'react';

// Pip as in the uploaded reference "WHAT IF YOU COULD TALK TO ANIMALS?"
// (frame 0-1s, 19s): dark navy hoodie, yellow drawstrings, WHITE round
// face (no skin, no hair), two black oval eyes, small smile, white glove
// hands, dark pants, TEAL sneakers, thin orange rim light around his
// silhouette. Anchor (x, y) is the ground — bottom of the shoes.
// Local layout: head centre y -330, hoodie -260..-60, legs -60..0.
const OUT = '#141824';
const NAVY = '#1E2436';
const NAVY_DARK = '#161B2B';
const NAVY_LIGHT = '#2E3A5C';
const FACE = '#F5F2E8';
const YELLOW = '#F2C94C';
const TEAL = '#2BB3A3';
const RIM = '#FF8A3D';

export const PipDark: React.FC<{
  x?: number;
  y?: number;
  scale?: number;
  armUp?: number; // 0 = laser arm out, 1 = both arms up (title card)
  laser?: number; // 0 = arm down, 1 = arm extended with laser pointer
  blink?: number; // 1 = open, 0 = shut
  smile?: number; // 0 = small smile, 1 = big open smile
  surprised?: boolean;
  rim?: number; // rim-light opacity 0..1
}> = ({x = 0, y = 0, scale = 1, armUp = 0, laser = 1, blink = 1, smile = 0, surprised = false, rim = 1}) => {
  const eyeH = Math.max(0.08, blink);
  const mouthH = 6 + smile * 14;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <defs>
        <filter id="pipRimBlur" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>
      {/* orange rim-light halo behind the silhouette */}
      <g opacity={rim * 0.55} filter="url(#pipRimBlur)">
        <circle cx={0} cy={-330} r={118} fill={RIM} />
        <rect x={-92} y={-270} width={184} height={220} rx={44} fill={RIM} />
      </g>
      {/* legs — thin dark pants */}
      <line x1={-26} y1={-70} x2={-32} y2={-8} stroke={NAVY} strokeWidth={26} strokeLinecap="round" />
      <line x1={26} y1={-70} x2={32} y2={-8} stroke={NAVY} strokeWidth={26} strokeLinecap="round" />
      {/* teal sneakers */}
      <ellipse cx={-38} cy={-4} rx={30} ry={13} fill={TEAL} stroke={OUT} strokeWidth={4} />
      <ellipse cx={38} cy={-4} rx={30} ry={13} fill={TEAL} stroke={OUT} strokeWidth={4} />
      <rect x={-66} y={-10} width={56} height={8} rx={4} fill="#F5F2E8" />
      <rect x={10} y={-10} width={56} height={8} rx={4} fill="#F5F2E8" />
      {/* hoodie torso — shaped, thick outline, shading + highlight */}
      <path
        d="M -78 -250 Q -88 -90 -70 -58 L 70 -58 Q 88 -90 78 -250 Q 40 -272 0 -272 Q -40 -272 -78 -250 Z"
        fill={NAVY}
        stroke={OUT}
        strokeWidth={6}
      />
      <path d="M -62 -240 Q -70 -100 -56 -70 L -30 -70 Q -48 -160 -44 -240 Z" fill={NAVY_LIGHT} opacity={0.7} />
      <path d="M 62 -240 Q 70 -100 56 -70 L 30 -70 Q 48 -160 44 -240 Z" fill={NAVY_DARK} opacity={0.7} />
      {/* kangaroo pocket */}
      <path d="M -52 -120 L 52 -120 L 44 -66 L -44 -66 Z" fill={NAVY_DARK} stroke={OUT} strokeWidth={4} />
      {/* yellow drawstrings */}
      <line x1={-16} y1={-252} x2={-20} y2={-196} stroke={YELLOW} strokeWidth={7} strokeLinecap="round" />
      <line x1={16} y1={-252} x2={20} y2={-196} stroke={YELLOW} strokeWidth={7} strokeLinecap="round" />
      <circle cx={-21} cy={-190} r={7} fill={YELLOW} stroke={OUT} strokeWidth={3} />
      <circle cx={21} cy={-190} r={7} fill={YELLOW} stroke={OUT} strokeWidth={3} />
      {/* left arm — down, or raised when armUp */}
      {armUp > 0.5 ? (
        <g>
          <line x1={-72} y1={-220} x2={-150} y2={-360} stroke={NAVY} strokeWidth={24} strokeLinecap="round" />
          <circle cx={-154} cy={-368} r={15} fill={FACE} stroke={OUT} strokeWidth={4} />
        </g>
      ) : (
        <g>
          <line x1={-72} y1={-220} x2={-104} y2={-130} stroke={NAVY} strokeWidth={24} strokeLinecap="round" />
          <circle cx={-106} cy={-122} r={15} fill={FACE} stroke={OUT} strokeWidth={4} />
        </g>
      )}
      {/* right arm — extended with laser pointer, or raised when armUp */}
      {armUp > 0.5 ? (
        <g>
          <line x1={72} y1={-220} x2={150} y2={-360} stroke={NAVY} strokeWidth={24} strokeLinecap="round" />
          <circle cx={154} cy={-368} r={15} fill={FACE} stroke={OUT} strokeWidth={4} />
        </g>
      ) : (
        <g transform={`rotate(${laser ? 0 : 20} 72 -220)`}>
          <line x1={72} y1={-220} x2={laser ? 158 : 108} y2={laser ? -238 : -150} stroke={NAVY} strokeWidth={24} strokeLinecap="round" />
          <circle cx={laser ? 162 : 110} cy={laser ? -240 : -144} r={15} fill={FACE} stroke={OUT} strokeWidth={4} />
          {laser > 0 && (
            <g>
              <rect x={158} y={-252} width={46} height={18} rx={8} fill="#23283A" stroke={OUT} strokeWidth={4} transform="rotate(-8 158 -243)" />
              <circle cx={206} cy={-247} r={7} fill="#FF3B30" />
            </g>
          )}
        </g>
      )}
      {/* hood + white face */}
      <path
        d="M -118 -330 Q -118 -452 0 -452 Q 118 -452 118 -330 Q 118 -268 0 -268 Q -118 -268 -118 -330 Z"
        fill={NAVY}
        stroke={OUT}
        strokeWidth={7}
      />
      <circle cx={0} cy={-348} r={96} fill={FACE} stroke={OUT} strokeWidth={5} />
      {/* orange rim on the hood edge */}
      <path d="M -112 -360 Q -118 -452 0 -452 Q 118 -452 112 -360" fill="none" stroke={RIM} strokeWidth={6} opacity={rim} strokeLinecap="round" />
      {/* eyes */}
      <g transform={`translate(-38 -352) scale(1 ${eyeH})`}>
        <ellipse rx={15} ry={22} fill="#141824" />
        <circle cx={5} cy={-7} r={5} fill="#FFFFFF" />
      </g>
      <g transform={`translate(38 -352) scale(1 ${eyeH})`}>
        <ellipse rx={15} ry={22} fill="#141824" />
        <circle cx={5} cy={-7} r={5} fill="#FFFFFF" />
      </g>
      {surprised && (
        <>
          <path d="M -56 -398 Q -38 -410 -20 -398" stroke="#141824" strokeWidth={6} fill="none" strokeLinecap="round" />
          <path d="M 20 -398 Q 38 -410 56 -398" stroke="#141824" strokeWidth={6} fill="none" strokeLinecap="round" />
        </>
      )}
      {/* mouth — small smile, opens when smiling big */}
      {smile > 0.5 ? (
        <ellipse cx={0} cy={-300} rx={18} ry={mouthH} fill="#141824" />
      ) : (
        <path d="M -22 -302 Q 0 -286 22 -302" stroke="#141824" strokeWidth={6} fill="none" strokeLinecap="round" />
      )}
    </g>
  );
};

// Pip head only, for the blurred-background close-up (reference frame 19s).
export const PipHead: React.FC<{x?: number; y?: number; scale?: number; blink?: number; smile?: number}> = ({
  x = 0,
  y = 0,
  scale = 1,
  blink = 1,
  smile = 1,
}) => {
  const eyeH = Math.max(0.08, blink);
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <defs>
        <filter id="pipHeadRim" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>
      <circle cx={0} cy={0} r={330} fill={RIM} opacity={0.35} filter="url(#pipHeadRim)" />
      <path d="M -330 -40 Q -330 -360 0 -360 Q 330 -360 330 -40 Q 330 180 0 180 Q -330 180 -330 -40 Z" fill={NAVY} stroke={OUT} strokeWidth={14} />
      <circle cx={0} cy={-30} r={268} fill={FACE} stroke={OUT} strokeWidth={10} />
      <path d="M -310 -80 Q -320 -360 0 -360 Q 320 -360 310 -80" fill="none" stroke={RIM} strokeWidth={10} opacity={0.9} strokeLinecap="round" />
      <g transform={`translate(-105 -45) scale(1 ${eyeH})`}>
        <ellipse rx={42} ry={62} fill="#141824" />
        <circle cx={14} cy={-20} r={14} fill="#FFFFFF" />
      </g>
      <g transform={`translate(105 -45) scale(1 ${eyeH})`}>
        <ellipse rx={42} ry={62} fill="#141824" />
        <circle cx={14} cy={-20} r={14} fill="#FFFFFF" />
      </g>
      {smile > 0.5 ? (
        <ellipse cx={0} cy={95} rx={50} ry={26} fill="#141824" />
      ) : (
        <path d="M -60 70 Q 0 110 60 70" stroke="#141824" strokeWidth={16} fill="none" strokeLinecap="round" />
      )}
      {/* yellow drawstrings at the bottom of frame */}
      <line x1={-45} y1={180} x2={-55} y2={300} stroke={YELLOW} strokeWidth={18} strokeLinecap="round" />
      <line x1={45} y1={180} x2={55} y2={300} stroke={YELLOW} strokeWidth={18} strokeLinecap="round" />
    </g>
  );
};
