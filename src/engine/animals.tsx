import React from 'react';

// Animals as in the uploaded reference: proper shaped bodies with
// shading and thick outlines — never stick figures.
// Cat: dark blue-grey loaf, yellow eyes, tail up (reference frames 2-3s).
// Dog: tan body, cream belly, floppy ears, black nose (frame 5s).
// Border Collie: black body, white belly + face stripe (data graphic).
const OUT = '#1E2436';

export const CatDark: React.FC<{
  x?: number;
  y?: number;
  scale?: number;
  blink?: number;
  tailUp?: number; // 0..1 tail raise
  lookX?: number;
}> = ({x = 0, y = 0, scale = 1, blink = 1, tailUp = 1, lookX = 0}) => {
  const eyeH = Math.max(0.08, blink);
  const tailAngle = -tailUp * 18;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {/* tail, thick, curving up */}
      <g transform={`rotate(${tailAngle} 150 -40)`}>
        <path d="M 150 -50 Q 230 -60 225 -170 Q 222 -200 200 -195" fill="none" stroke={OUT} strokeWidth={34} strokeLinecap="round" />
        <path d="M 150 -50 Q 230 -60 225 -170 Q 222 -200 200 -195" fill="none" stroke="#4A5568" strokeWidth={22} strokeLinecap="round" />
      </g>
      {/* loaf body */}
      <ellipse cx={0} cy={-70} rx={175} ry={95} fill="#4A5568" stroke={OUT} strokeWidth={7} />
      <ellipse cx={-20} cy={-30} rx={130} ry={55} fill="#5A6A85" opacity={0.8} />
      {/* head */}
      <circle cx={-95} cy={-140} r={72} fill="#4A5568" stroke={OUT} strokeWidth={7} />
      <path d="M -150 -185 L -158 -245 L -105 -205 Z" fill="#4A5568" stroke={OUT} strokeWidth={6} strokeLinejoin="round" />
      <path d="M -48 -185 L -38 -245 L -90 -205 Z" fill="#4A5568" stroke={OUT} strokeWidth={6} strokeLinejoin="round" />
      <path d="M -148 -198 L -152 -228 L -118 -208 Z" fill="#F2A0A0" />
      <path d="M -52 -198 L -46 -228 L -80 -208 Z" fill="#F2A0A0" />
      {/* yellow eyes */}
      <g transform={`translate(${-122 + lookX} -150) scale(1 ${eyeH})`}>
        <circle r={22} fill="#F2C94C" stroke={OUT} strokeWidth={4} />
        <circle r={9} fill="#141824" />
        <circle cx={6} cy={-6} r={4} fill="#FFFFFF" />
      </g>
      <g transform={`translate(${-68 + lookX} -150) scale(1 ${eyeH})`}>
        <circle r={22} fill="#F2C94C" stroke={OUT} strokeWidth={4} />
        <circle r={9} fill="#141824" />
        <circle cx={6} cy={-6} r={4} fill="#FFFFFF" />
      </g>
      {/* small mouth */}
      <path d="M -108 -118 Q -95 -106 -82 -118" stroke="#F5F2E8" strokeWidth={5} fill="none" strokeLinecap="round" />
      {/* front paws tucked */}
      <ellipse cx={-140} cy={-8} rx={26} ry={12} fill="#3E4A63" stroke={OUT} strokeWidth={4} />
      <ellipse cx={-50} cy={-8} rx={26} ry={12} fill="#3E4A63" stroke={OUT} strokeWidth={4} />
    </g>
  );
};

export const DogTan: React.FC<{
  x?: number;
  y?: number;
  scale?: number;
  blink?: number;
  tailWag?: number; // degrees
  happy?: boolean;
}> = ({x = 0, y = 0, scale = 1, blink = 1, tailWag = 0, happy = true}) => {
  const eyeH = Math.max(0.08, blink);
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {/* tail wagging */}
      <g transform={`rotate(${tailWag} -190 -120)`}>
        <path d="M -190 -120 Q -260 -160 -250 -240" fill="none" stroke={OUT} strokeWidth={26} strokeLinecap="round" />
        <path d="M -190 -120 Q -260 -160 -250 -240" fill="none" stroke="#D9A066" strokeWidth={16} strokeLinecap="round" />
      </g>
      {/* body — big rounded tan shape */}
      <ellipse cx={0} cy={-110} rx={200} ry={105} fill="#D9A066" stroke={OUT} strokeWidth={7} />
      <ellipse cx={10} cy={-55} rx={130} ry={62} fill="#F5E0B8" />
      {/* legs + paws */}
      <rect x={-150} y={-70} width={34} height={70} rx={14} fill="#D9A066" stroke={OUT} strokeWidth={5} />
      <rect x={-40} y={-70} width={34} height={70} rx={14} fill="#D9A066" stroke={OUT} strokeWidth={5} />
      <rect x={80} y={-70} width={34} height={70} rx={14} fill="#C98F52" stroke={OUT} strokeWidth={5} />
      <ellipse cx={-133} cy={0} rx={28} ry={12} fill="#F5E0B8" stroke={OUT} strokeWidth={4} />
      <ellipse cx={-23} cy={0} rx={28} ry={12} fill="#F5E0B8" stroke={OUT} strokeWidth={4} />
      <ellipse cx={97} cy={0} rx={28} ry={12} fill="#F5E0B8" stroke={OUT} strokeWidth={4} />
      {/* head */}
      <circle cx={150} cy={-190} r={82} fill="#D9A066" stroke={OUT} strokeWidth={7} />
      {/* floppy ears */}
      <path d="M 92 -240 Q 60 -160 95 -130 Q 120 -170 128 -220 Z" fill="#B87F4A" stroke={OUT} strokeWidth={5} />
      <path d="M 208 -240 Q 240 -160 205 -130 Q 180 -170 172 -220 Z" fill="#B87F4A" stroke={OUT} strokeWidth={5} />
      {/* muzzle */}
      <ellipse cx={185} cy={-155} rx={62} ry={42} fill="#F5E0B8" stroke={OUT} strokeWidth={5} />
      <ellipse cx={238} cy={-172} rx={18} ry={14} fill="#141824" />
      {/* eye — closed happy arc, or open */}
      {happy ? (
        <path d="M 118 -215 Q 138 -232 158 -215" stroke="#141824" strokeWidth={7} fill="none" strokeLinecap="round" />
      ) : (
        <g transform={`translate(138 -218) scale(1 ${eyeH})`}>
          <circle r={12} fill="#141824" />
        </g>
      )}
      {/* smile */}
      <path d="M 168 -138 Q 190 -122 212 -138" stroke="#141824" strokeWidth={6} fill="none" strokeLinecap="round" />
      {/* tongue */}
      <path d="M 178 -128 Q 190 -100 202 -128 Q 190 -118 178 -128 Z" fill="#F28A8A" stroke={OUT} strokeWidth={3} />
    </g>
  );
};

export const BorderCollie: React.FC<{x?: number; y?: number; scale?: number}> = ({x = 0, y = 0, scale = 1}) => {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M -190 -120 Q -250 -150 -240 -220" fill="none" stroke={OUT} strokeWidth={24} strokeLinecap="round" />
      <path d="M -190 -120 Q -250 -150 -240 -220" fill="none" stroke="#23232E" strokeWidth={15} strokeLinecap="round" />
      <ellipse cx={0} cy={-110} rx={195} ry={100} fill="#23232E" stroke={OUT} strokeWidth={7} />
      <ellipse cx={10} cy={-55} rx={125} ry={60} fill="#F5F2E8" />
      <rect x={-150} y={-70} width={32} height={70} rx={14} fill="#23232E" stroke={OUT} strokeWidth={5} />
      <rect x={-40} y={-70} width={32} height={70} rx={14} fill="#23232E" stroke={OUT} strokeWidth={5} />
      <rect x={80} y={-70} width={32} height={70} rx={14} fill="#23232E" stroke={OUT} strokeWidth={5} />
      <ellipse cx={-134} cy={0} rx={26} ry={11} fill="#F5F2E8" stroke={OUT} strokeWidth={4} />
      <ellipse cx={-24} cy={0} rx={26} ry={11} fill="#F5F2E8" stroke={OUT} strokeWidth={4} />
      <ellipse cx={96} cy={0} rx={26} ry={11} fill="#F5F2E8" stroke={OUT} strokeWidth={4} />
      <circle cx={150} cy={-190} r={80} fill="#23232E" stroke={OUT} strokeWidth={7} />
      <path d="M 150 -260 L 128 -210 L 172 -210 Z" fill="#F5F2E8" stroke={OUT} strokeWidth={4} strokeLinejoin="round" />
      <path d="M 96 -238 Q 66 -170 96 -138 Q 118 -175 124 -218 Z" fill="#23232E" stroke={OUT} strokeWidth={5} />
      <ellipse cx={185} cy={-155} rx={58} ry={40} fill="#F5F2E8" stroke={OUT} strokeWidth={5} />
      <ellipse cx={236} cy={-172} rx={17} ry={13} fill="#141824" />
      <path d="M 118 -215 Q 138 -230 156 -215" stroke="#F5F2E8" strokeWidth={6} fill="none" strokeLinecap="round" />
      <path d="M 168 -138 Q 190 -122 212 -138" stroke="#141824" strokeWidth={6} fill="none" strokeLinecap="round" />
    </g>
  );
};
