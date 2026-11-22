import React from 'react';

// Rich bedroom from the uploaded reference (frames 0-1s, 9s):
// dark blue walls, fairy lights, 4 framed posters, calendar with X,
// moon window with purple curtains, bed with blue bedding, nightstand
// with lamp + red clock, dresser with plant / gold trophy / black
// speaker, green backpack, teal sneakers on a purple rug, brown
// wardrobe, door left, dark wood floorboards, dust/sparkle particles,
// warm lamp glow + cool moonlight. Perspective: back wall inset, side
// walls darker, floor recedes. Drawn 0..1920 x 0..1080, no black bars.
const OUT = '#141824';

function FairyLights() {
  const bulbs: Array<{x: number; y: number; c: string}> = [];
  for (let i = 0; i < 22; i++) {
    const t = i / 21;
    const x = 90 + t * 1150;
    const y = 70 + Math.sin(t * Math.PI) * 55;
    bulbs.push({x, y, c: i % 3 === 0 ? '#FFD9A0' : i % 3 === 1 ? '#F5F2E8' : '#FFB3A0'});
  }
  return (
    <g>
      <path d="M 80 60 Q 660 200 1240 60" fill="none" stroke="#3A3A4A" strokeWidth={4} />
      {bulbs.map((b, i) => (
        <g key={i}>
          <circle cx={b.x} cy={b.y} r={14} fill={b.c} opacity={0.25} />
          <circle cx={b.x} cy={b.y} r={7} fill={b.c} />
        </g>
      ))}
    </g>
  );
}

function Posters() {
  return (
    <g>
      {/* sun / circles */}
      <rect x={180} y={170} width={170} height={220} rx={8} fill="#2E4A7A" stroke="#8A7A5A" strokeWidth={8} />
      <circle cx={250} cy={250} r={42} fill="#F2C94C" />
      <circle cx={290} cy={320} r={26} fill="#E87A4A" />
      {/* sailboat */}
      <rect x={390} y={170} width={170} height={220} rx={8} fill="#BFE3F0" stroke="#8A7A5A" strokeWidth={8} />
      <path d="M 475 210 L 475 330 L 540 330 Z" fill="#F5F2E8" stroke={OUT} strokeWidth={4} />
      <path d="M 440 330 L 510 330 L 475 360 Z" fill="#2E4A7A" />
      <rect x={400} y={330} width={150} height={22} fill="#2E4A7A" />
      {/* red triangle */}
      <rect x={600} y={170} width={150} height={220} rx={8} fill="#E87A4A" stroke="#8A7A5A" strokeWidth={8} />
      <path d="M 675 210 L 725 340 L 625 340 Z" fill="#F5F2E8" stroke={OUT} strokeWidth={4} />
      {/* calendar with X */}
      <rect x={790} y={170} width={170} height={220} rx={8} fill="#F5F2E8" stroke="#8A7A5A" strokeWidth={8} />
      <rect x={790} y={170} width={170} height={44} fill="#E87A4A" />
      <circle cx={840} cy={245} r={10} fill="#2E4A7A" />
      <path d="M 830 235 L 850 255 M 850 235 L 830 255" stroke="#FF3B30" strokeWidth={6} strokeLinecap="round" />
      {[0, 1, 2, 3].map((r) => [0, 1, 2, 3].map((c) => (
        <rect key={`${r}-${c}`} x={815 + c * 36} y={280 + r * 26} width={22} height={14} rx={3} fill="#B9C4D6" />
      )))}
    </g>
  );
}

function Particles() {
  const pts = [
    [300, 420], [520, 300], [700, 520], [980, 260], [1150, 420], [1380, 320],
    [420, 700], [860, 640], [1240, 700], [1560, 520], [180, 560], [1620, 700],
  ];
  return (
    <g>
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 5 : 3} fill="#FFE9B8" opacity={i % 2 === 0 ? 0.85 : 0.45} />
      ))}
    </g>
  );
}

export const RichBedroom: React.FC<{glow?: number; clock?: string}> = ({glow = 1, clock = '07:42'}) => {
  return (
    <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{position: 'absolute', left: 0, top: 0}}>
      <defs>
        <linearGradient id="rbWall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2A3358" />
          <stop offset="100%" stopColor="#1A2140" />
        </linearGradient>
        <radialGradient id="rbLamp" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FFD9A0" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FFD9A0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="rbMoon" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#D6E4FF" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#D6E4FF" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* back wall + side walls (perspective) + floor */}
      <rect x={0} y={0} width={1920} height={760} fill="url(#rbWall)" />
      <polygon points="0,0 150,80 150,760 0,760" fill="#141A33" />
      <polygon points="1920,0 1770,80 1770,760 1920,760" fill="#141A33" />
      <rect x={150} y={760} width={1620} height={320} fill="#2A2118" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line key={i} x1={150 + i * 270} y1={760} x2={60 + i * 360} y2={1080} stroke="#1E1710" strokeWidth={5} />
      ))}
      <line x1={150} y1={840} x2={1770} y2={840} stroke="#1E1710" strokeWidth={4} />
      <line x1={150} y1={950} x2={1770} y2={950} stroke="#1E1710" strokeWidth={4} />
      <FairyLights />
      <Posters />
      {/* moon window, purple curtains */}
      <rect x={1330} y={130} width={360} height={420} rx={10} fill="#0E1430" stroke="#3A3A4A" strokeWidth={8} />
      <circle cx={1560} cy={250} r={58} fill="#F5EED6" />
      <circle cx={1560} cy={250} r={130} fill="url(#rbMoon)" />
      <circle cx={1400} cy={180} r={4} fill="#FFFFFF" />
      <circle cx={1640} cy={420} r={4} fill="#FFFFFF" />
      <circle cx={1450} cy={480} r={3} fill="#FFFFFF" />
      <line x1={1510} y1={130} x2={1510} y2={550} stroke="#3A3A4A" strokeWidth={6} />
      <line x1={1330} y1={340} x2={1690} y2={340} stroke="#3A3A4A" strokeWidth={6} />
      <rect x={1290} y={110} width={60} height={470} rx={12} fill="#6B4A7A" />
      <rect x={1670} y={110} width={60} height={470} rx={12} fill="#6B4A7A" />
      {/* wardrobe, right */}
      <rect x={1760} y={80} width={160} height={680} fill="#3A2A22" stroke={OUT} strokeWidth={6} />
      <rect x={1790} y={330} width={22} height={90} rx={10} fill="#F2C94C" />
      <rect x={1868} y={330} width={22} height={90} rx={10} fill="#F2C94C" />
      {/* door, left */}
      <rect x={0} y={140} width={150} height={620} fill="#232B4A" stroke={OUT} strokeWidth={6} />
      <rect x={118} y={140} width={14} height={620} fill="#F2C94C" opacity={0.8} />
      {/* bed, left */}
      <rect x={150} y={480} width={620} height={120} rx={10} fill="#5A3A2A" stroke={OUT} strokeWidth={6} />
      <rect x={150} y={600} width={620} height={180} rx={10} fill="#2E4A8A" stroke={OUT} strokeWidth={6} />
      <ellipse cx={320} cy={600} rx={120} ry={42} fill="#F5F2E8" stroke={OUT} strokeWidth={5} />
      <ellipse cx={580} cy={600} rx={120} ry={42} fill="#F5F2E8" stroke={OUT} strokeWidth={5} />
      <rect x={150} y={720} width={620} height={60} fill="#24386E" />
      {/* nightstand + lamp + red clock */}
      <rect x={820} y={620} width={210} height={160} rx={8} fill="#5A4632" stroke={OUT} strokeWidth={6} />
      <circle cx={925} cy={700} r={14} fill="#F2C94C" stroke={OUT} strokeWidth={4} />
      <circle cx={925} cy={610} r={260} fill="url(#rbLamp)" opacity={glow} />
      <ellipse cx={880} cy={612} rx={34} ry={8} fill="#2E2133" stroke={OUT} strokeWidth={4} />
      <rect x={874} y={540} width={12} height={74} fill="#8A7A5A" stroke={OUT} strokeWidth={3} />
      <path d="M 848 540 L 862 480 L 898 480 L 912 540 Z" fill="#FFD9A0" stroke={OUT} strokeWidth={4} strokeLinejoin="round" />
      <rect x={950} y={560} width={110} height={52} rx={8} fill="#120E1E" stroke={OUT} strokeWidth={4} />
      <text x={1005} y={598} textAnchor="middle" fontSize={38} fontWeight={800} fill="#FF3B30" fontFamily="monospace">
        {clock}
      </text>
      {/* dresser, right of window */}
      <rect x={1180} y={600} width={420} height={180} rx={8} fill="#4A3A2A" stroke={OUT} strokeWidth={6} />
      <rect x={1200} y={620} width={380} height={60} rx={6} fill="#5A4632" stroke={OUT} strokeWidth={4} />
      <rect x={1200} y={700} width={380} height={60} rx={6} fill="#5A4632" stroke={OUT} strokeWidth={4} />
      <circle cx={1390} cy={650} r={10} fill="#F2C94C" stroke={OUT} strokeWidth={3} />
      <circle cx={1390} cy={730} r={10} fill="#F2C94C" stroke={OUT} strokeWidth={3} />
      {/* plant, gold trophy, black speaker on the dresser */}
      <rect x={1220} y={540} width={56} height={60} rx={6} fill="#C97A4A" stroke={OUT} strokeWidth={4} />
      <path d="M 1248 540 L 1236 480 M 1248 540 L 1248 470 M 1248 540 L 1262 482" stroke="#4A9A5A" strokeWidth={7} strokeLinecap="round" fill="none" />
      <path d="M 1440 540 L 1440 500 L 1470 500 L 1470 540 L 1452 560 L 1472 560 L 1472 572 L 1440 572 L 1440 560 L 1458 560 Z" fill="#F2C94C" stroke={OUT} strokeWidth={4} />
      <rect x={1520} y={520} width={56} height={80} rx={8} fill="#1A1626" stroke={OUT} strokeWidth={4} />
      <circle cx={1548} cy={548} r={14} fill="#3A3A4A" stroke={OUT} strokeWidth={3} />
      <circle cx={1548} cy={580} r={8} fill="#3A3A4A" />
      {/* green backpack on the floor */}
      <path d="M 1080 780 L 1080 680 Q 1080 640 1130 640 L 1180 640 Q 1230 640 1230 680 L 1230 780 Z" fill="#3A9A6A" stroke={OUT} strokeWidth={5} />
      <rect x={1120} y={700} width={70} height={50} rx={8} fill="#2E7A52" stroke={OUT} strokeWidth={4} />
      {/* purple rug + teal sneakers */}
      <rect x={700} y={820} width={900} height={200} rx={12} fill="#5A3A7A" stroke="#3A2450" strokeWidth={5} />
      <rect x={730} y={850} width={840} height={140} rx={8} fill="none" stroke="#7A5A9A" strokeWidth={4} />
      <ellipse cx={900} cy={960} rx={70} ry={26} fill={TEAL} stroke={OUT} strokeWidth={5} />
      <ellipse cx={1080} cy={960} rx={70} ry={26} fill={TEAL} stroke={OUT} strokeWidth={5} />
      <rect x={840} y={950} width={120} height={12} rx={6} fill="#F5F2E8" />
      <rect x={1020} y={950} width={120} height={12} rx={6} fill="#F5F2E8" />
      {/* brown beanbag, bottom right */}
      <ellipse cx={1620} cy={920} rx={220} ry={130} fill="#8A5A3A" stroke={OUT} strokeWidth={6} />
      <path d="M 1440 900 Q 1620 830 1800 900" fill="none" stroke="#6E4630" strokeWidth={6} />
      <Particles />
    </svg>
  );
};

const TEAL = '#2BB3A3';

// Blurred bedroom background for close-ups (reference frames 2-3s, 19s).
export const BlurredBedroom: React.FC = () => {
  return (
    <>
      <div style={{position: 'absolute', inset: 0, filter: 'blur(26px)', transform: 'scale(1.08)'}}>
        <RichBedroom />
      </div>
      <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{position: 'absolute', left: 0, top: 0}}>
        <defs>
          <radialGradient id="rbGlow2" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#FFD9A0" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FFD9A0" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={960} cy={540} r={520} fill="url(#rbGlow2)" />
        <rect x={0} y={0} width={1920} height={1080} fill="#141126" opacity={0.18} />
      </svg>
    </>
  );
};

// Classroom for the dog shot (reference frame 5s): green chalkboard
// with "7 x 8 = ?", desks, blurred.
export const ClassroomSet: React.FC = () => {
  return (
    <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{position: 'absolute', left: 0, top: 0}}>
      <defs>
        <filter id="clsBlur" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>
      <g filter="url(#clsBlur)">
        <rect x={0} y={0} width={1920} height={1080} fill="#2A3358" />
        <rect x={240} y={120} width={1440} height={560} rx={12} fill="#2E5A3A" stroke="#8A7A5A" strokeWidth={10} />
        <text x={960} y={440} textAnchor="middle" fontSize={200} fontWeight={800} fill="#F5F2E8" opacity={0.85} fontFamily="Arial, sans-serif">
          7 x 8 = ?
        </text>
        <rect x={240} y={680} width={1440} height={400} fill="#3A2A22" />
        <rect x={200} y={760} width={420} height={60} rx={8} fill="#5A4632" />
        <rect x={1300} y={760} width={420} height={60} rx={8} fill="#5A4632" />
      </g>
      <rect x={0} y={0} width={1920} height={1080} fill="#141126" opacity={0.12} />
    </svg>
  );
};
