import React from 'react';

// Opal v2 — professional redraw for the cat-girl sample v2.
// Every shape carries a thick dark outline (#241E33), shading and
// highlights, so nothing reads as a flat rectangle or a stick line.
// Anchor (x, y) is the seat — the bottom of her torso where it meets
// the dresser top. Local layout: head centre y -300, torso -235..0,
// legs dangle 0..+150, sneakers at +150.
const OUT = '#241E33';
const HOODIE = '#8A8D94';
const HOODIE_DARK = '#6E7076';
const HOODIE_LIGHT = '#A9ABB2';
const PATCH = '#F5F5F0';
const SKIN = '#F2C9A0';
const HAIR = '#3A2A1E';
const PANTS = '#5A5C66';

export const OpalV2: React.FC<{
  x?: number;
  y?: number;
  scale?: number;
  blink?: number; // 1 = eyes open, 0 = eyes shut
  mouthOpen?: number; // 0 = smile, 1 = open mouth saying "hi"
  push?: number; // 0 = arm resting, 1 = arm extended pushing the watch
  tailSway?: number; // degrees
  headTilt?: number; // degrees
  eyeLook?: number; // pupil shift, px (looks at viewer when 0)
}> = ({
  x = 0,
  y = 0,
  scale = 1,
  blink = 1,
  mouthOpen = 0,
  push = 0,
  tailSway = 0,
  headTilt = 0,
  eyeLook = 0,
}) => {
  const eyeH = Math.max(0.06, blink);
  const pushAngle = -push * 38;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {/* tail — thick curved path with outline and white tip, swaying */}
      <g transform={`rotate(${tailSway} 60 30)`}>
        <path
          d="M 62 20 Q 150 40 145 130 Q 142 175 108 168"
          stroke={OUT}
          strokeWidth={26}
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 62 20 Q 150 40 145 130 Q 142 175 108 168"
          stroke={HOODIE}
          strokeWidth={16}
          fill="none"
          strokeLinecap="round"
        />
        <circle cx={108} cy={168} r={12} fill={PATCH} stroke={OUT} strokeWidth={4} />
      </g>
      {/* dangling legs — shaped pants with outline, knees, sneakers */}
      <g>
        <path
          d="M -34 -6 L -44 118 Q -44 132 -30 132 L -18 132 Q -6 132 -6 118 L 2 -6 Z"
          fill={PANTS}
          stroke={OUT}
          strokeWidth={6}
          strokeLinejoin="round"
        />
        <path
          d="M 6 -6 L 16 118 Q 16 132 30 132 L 42 132 Q 54 132 54 118 L 44 -6 Z"
          fill={PANTS}
          stroke={OUT}
          strokeWidth={6}
          strokeLinejoin="round"
        />
        <ellipse cx={-22} cy={146} rx={26} ry={13} fill="#FFFFFF" stroke={OUT} strokeWidth={5} />
        <ellipse cx={32} cy={146} rx={26} ry={13} fill="#FFFFFF" stroke={OUT} strokeWidth={5} />
        <line x1={-34} y1={140} x2={-10} y2={140} stroke="#CCCCCC" strokeWidth={3} />
        <line x1={20} y1={140} x2={44} y2={140} stroke="#CCCCCC" strokeWidth={3} />
      </g>
      {/* torso — shaped hoodie, not a rectangle: shoulders, waist, hem */}
      <path
        d="M -78 -215 Q -82 -235 -60 -238 L 60 -238 Q 82 -235 78 -215 L 84 -30 Q 84 0 54 0 L -54 0 Q -84 0 -84 -30 Z"
        fill={HOODIE}
        stroke={OUT}
        strokeWidth={7}
        strokeLinejoin="round"
      />
      {/* shading: darker right side, light left shoulder */}
      <path d="M 52 -236 L 78 -215 L 84 -30 Q 84 0 54 0 L 34 0 L 44 -220 Z" fill={HOODIE_DARK} opacity={0.55} />
      <path d="M -78 -215 Q -82 -235 -60 -238 L -30 -238 L -52 -210 Z" fill={HOODIE_LIGHT} opacity={0.7} />
      {/* kangaroo pocket */}
      <path
        d="M -52 -58 L 52 -58 L 44 6 L -44 6 Z"
        fill={HOODIE_DARK}
        stroke={OUT}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      {/* white chest patch with outline */}
      <rect x={-32} y={-196} width={64} height={76} rx={20} fill={PATCH} stroke={OUT} strokeWidth={5} />
      {/* hood bunched behind the neck */}
      <path
        d="M -58 -232 Q 0 -268 58 -232 Q 40 -206 0 -206 Q -40 -206 -58 -232 Z"
        fill={HOODIE_DARK}
        stroke={OUT}
        strokeWidth={6}
        strokeLinejoin="round"
      />
      {/* drawstrings with aglets */}
      <line x1={-18} y1={-214} x2={-24} y2={-158} stroke={PATCH} strokeWidth={7} strokeLinecap="round" />
      <line x1={18} y1={-214} x2={24} y2={-158} stroke={PATCH} strokeWidth={7} strokeLinecap="round" />
      <circle cx={-25} cy={-152} r={5} fill={PATCH} stroke={OUT} strokeWidth={3} />
      <circle cx={25} cy={-152} r={5} fill={PATCH} stroke={OUT} strokeWidth={3} />
      {/* resting left arm — shaped sleeve with outline, hand on knee */}
      <path
        d="M -76 -200 Q -108 -160 -100 -70 Q -96 -40 -72 -38 Q -58 -38 -56 -60 L -62 -150 Z"
        fill={HOODIE}
        stroke={OUT}
        strokeWidth={6}
        strokeLinejoin="round"
      />
      <circle cx={-78} cy={-30} r={15} fill={SKIN} stroke={OUT} strokeWidth={5} />
      {/* right arm — pushes the watch off the edge as push goes 0 -> 1 */}
      <g transform={`rotate(${pushAngle} 76 -200)`}>
        <path
          d="M 76 -200 Q 104 -160 98 -80 Q 96 -52 74 -50 Q 60 -50 58 -70 L 64 -150 Z"
          fill={HOODIE}
          stroke={OUT}
          strokeWidth={6}
          strokeLinejoin="round"
        />
        <circle cx={82} cy={-42} r={15} fill={SKIN} stroke={OUT} strokeWidth={5} />
        {/* pointing finger when pushing */}
        <circle cx={96} cy={-48} r={7} fill={SKIN} stroke={OUT} strokeWidth={4} />
      </g>
      {/* head */}
      <g transform={`rotate(${headTilt} 0 -300)`}>
        {/* long hair behind the head */}
        <path
          d="M -62 -300 Q -66 -360 -20 -368 L 20 -368 Q 66 -360 62 -300 L 58 -240 Q 40 -258 0 -258 Q -40 -258 -58 -240 Z"
          fill={HAIR}
          stroke={OUT}
          strokeWidth={6}
          strokeLinejoin="round"
        />
        <circle cx={0} cy={-300} r={60} fill={SKIN} stroke={OUT} strokeWidth={7} />
        {/* bangs */}
        <path
          d="M -60 -302 Q -64 -360 0 -362 Q 64 -360 60 -302 Q 44 -332 22 -326 Q 30 -312 0 -318 Q -30 -312 -22 -326 Q -44 -332 -60 -302 Z"
          fill={HAIR}
          stroke={OUT}
          strokeWidth={5}
          strokeLinejoin="round"
        />
        {/* cat ears with pink inner */}
        <path d="M -50 -344 L -64 -398 L -14 -362 Z" fill={HAIR} stroke={OUT} strokeWidth={6} strokeLinejoin="round" />
        <path d="M -48 -352 L -54 -380 L -26 -360 Z" fill="#F2A0A0" />
        <path d="M 50 -344 L 64 -398 L 14 -362 Z" fill={HAIR} stroke={OUT} strokeWidth={6} strokeLinejoin="round" />
        <path d="M 48 -352 L 54 -380 L 26 -360 Z" fill="#F2A0A0" />
        {/* big eyes with highlights — expression lives here */}
        <g transform={`translate(${-24 + eyeLook} -296) scale(1 ${eyeH})`}>
          <ellipse rx={13} ry={16} fill="#222222" />
          <circle cx={4} cy={-5} r={4.5} fill="#FFFFFF" />
          <circle cx={-4} cy={5} r={2} fill="#FFFFFF" opacity={0.8} />
        </g>
        <g transform={`translate(${24 + eyeLook} -296) scale(1 ${eyeH})`}>
          <ellipse rx={13} ry={16} fill="#222222" />
          <circle cx={4} cy={-5} r={4.5} fill="#FFFFFF" />
          <circle cx={-4} cy={5} r={2} fill="#FFFFFF" opacity={0.8} />
        </g>
        {/* lashes */}
        <line x1={-38} y1={-310} x2={-44} y2={-318} stroke={OUT} strokeWidth={4} strokeLinecap="round" />
        <line x1={38} y1={-310} x2={44} y2={-318} stroke={OUT} strokeWidth={4} strokeLinecap="round" />
        {/* blush */}
        <ellipse cx={-42} cy={-272} rx={11} ry={7} fill="#F2A0A0" opacity={0.6} />
        <ellipse cx={42} cy={-272} rx={11} ry={7} fill="#F2A0A0" opacity={0.6} />
        {/* mouth — smile, opens a little when she says hi */}
        {mouthOpen < 0.5 ? (
          <path d="M -14 -264 Q 0 -252 14 -264" stroke={OUT} strokeWidth={5} fill="none" strokeLinecap="round" />
        ) : (
          <ellipse cx={0} cy={-258} rx={10} ry={8 + mouthOpen * 6} fill="#7A2E2E" stroke={OUT} strokeWidth={4} />
        )}
      </g>
    </g>
  );
};

// Dresser set for the reveal shot: wall, window with moon, rug, dresser
// with drawers and knobs, books and a plant. Lamp glow warms the scene.
export const DresserSet: React.FC<{glow?: number}> = ({glow = 0.8}) => {
  return (
    <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{position: 'absolute', left: 0, top: 0}}>
      <defs>
        <linearGradient id="v2Wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1B1840" />
          <stop offset="100%" stopColor="#3A2F55" />
        </linearGradient>
        <radialGradient id="v2Glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FFD9A0" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#FFD9A0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x={0} y={0} width={1920} height={960} fill="url(#v2Wall)" />
      <rect x={0} y={960} width={1920} height={120} fill="#2A2140" />
      {/* window, moon and stars, top left */}
      <rect x={120} y={90} width={380} height={320} rx={20} fill="#0E0C24" stroke="#5A4A80" strokeWidth={10} />
      <line x1={310} y1={90} x2={310} y2={410} stroke="#5A4A80" strokeWidth={8} />
      <line x1={120} y1={250} x2={500} y2={250} stroke="#5A4A80" strokeWidth={8} />
      <circle cx={400} cy={160} r={52} fill="#F5EED6" />
      <circle cx={180} cy={140} r={5} fill="#FFFFFF" />
      <circle cx={240} cy={340} r={4} fill="#FFFFFF" />
      <circle cx={450} cy={350} r={5} fill="#FFFFFF" />
      {/* picture frame */}
      <rect x={1560} y={110} width={220} height={170} rx={12} fill="#2E2547" stroke="#8A7A5A" strokeWidth={8} />
      <circle cx={1670} cy={195} r={42} fill="#F5EED6" opacity={0.9} />
      {/* warm lamp glow behind Opal */}
      <circle cx={960} cy={480} r={560} fill="url(#v2Glow)" opacity={glow} />
      {/* rug */}
      <ellipse cx={960} cy={1010} rx={620} ry={70} fill="#453A63" />
      {/* dresser — wide, fills the lower frame */}
      <rect x={240} y={700} width={1440} height={280} rx={16} fill="#5A3A2A" stroke={OUT} strokeWidth={6} />
      <rect x={280} y={730} width={1360} height={76} rx={10} fill="#6E4636" stroke={OUT} strokeWidth={4} />
      <rect x={280} y={826} width={1360} height={76} rx={10} fill="#6E4636" stroke={OUT} strokeWidth={4} />
      <rect x={280} y={922} width={1360} height={58} rx={10} fill="#6E4636" stroke={OUT} strokeWidth={4} />
      <circle cx={960} cy={768} r={12} fill="#FFD9A0" stroke={OUT} strokeWidth={4} />
      <circle cx={960} cy={864} r={12} fill="#FFD9A0" stroke={OUT} strokeWidth={4} />
      {/* books left, plant right on the dresser top */}
      <rect x={300} y={656} width={110} height={44} rx={5} fill="#7A4A6E" stroke={OUT} strokeWidth={4} />
      <rect x={310} y={620} width={84} height={36} rx={5} fill="#4A7A6E" stroke={OUT} strokeWidth={4} />
      <rect x={1560} y={636} width={70} height={64} rx={9} fill="#B08A5A" stroke={OUT} strokeWidth={4} />
      <circle cx={1595} cy={612} r={38} fill="#4A7A3A" stroke={OUT} strokeWidth={5} />
    </svg>
  );
};

// Close-up background: the same room, softly blurred, warm lamp glow.
export const CloseUpBg: React.FC = () => {
  return (
    <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{position: 'absolute', left: 0, top: 0}}>
      <defs>
        <linearGradient id="v2CloseWall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#241D45" />
          <stop offset="100%" stopColor="#4A3350" />
        </linearGradient>
        <radialGradient id="v2CloseGlow" cx="0.5" cy="0.45" r="0.55">
          <stop offset="0%" stopColor="#FFD9A0" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#FFD9A0" stopOpacity="0" />
        </radialGradient>
        <filter id="v2Blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
      </defs>
      <rect x={0} y={0} width={1920} height={1080} fill="url(#v2CloseWall)" />
      <g filter="url(#v2Blur)" opacity={0.85}>
        <circle cx={330} cy={220} r={90} fill="#F5EED6" opacity={0.5} />
        <rect x={1400} y={120} width={300} height={240} rx={20} fill="#0E0C24" />
        <rect x={200} y={700} width={1520} height={280} rx={16} fill="#5A3A2A" />
      </g>
      <circle cx={960} cy={460} r={620} fill="url(#v2CloseGlow)" />
      <rect x={0} y={980} width={1920} height={100} fill="#5A3A2A" />
    </svg>
  );
};

// White speech bubble, bold black text — the only dialogue text on screen.
export const SpeechBubble: React.FC<{x: number; y: number; lines: string[]; opacity?: number}> = ({
  x,
  y,
  lines,
  opacity = 1,
}) => {
  return (
    <g transform={`translate(${x} ${y})`} opacity={opacity}>
      <rect x={0} y={0} width={560} height={150} rx={28} fill="#FFFFFF" stroke={OUT} strokeWidth={6} />
      <path d="M 90 150 L 60 210 L 150 150 Z" fill="#FFFFFF" stroke={OUT} strokeWidth={6} strokeLinejoin="round" />
      {lines.map((line, i) => (
        <text
          key={i}
          x={280}
          y={62 + i * 52}
          textAnchor="middle"
          fontSize={44}
          fontWeight={800}
          fill="#1A1626"
          fontFamily="Arial, sans-serif"
        >
          {line}
        </text>
      ))}
    </g>
  );
};

// Proper fact card: dark navy, title + source line, centred lower third.
export const FactCard: React.FC<{opacity?: number}> = ({opacity = 1}) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: 360,
        top: 868,
        width: 1200,
        backgroundColor: '#141A33',
        border: '4px solid #FFD9A0',
        borderRadius: 24,
        padding: '22px 36px',
        opacity,
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div style={{color: '#FFFFFF', fontSize: 40, fontWeight: 800, textAlign: 'center'}}>
        Cats almost never meow at each other
      </div>
      <div style={{color: '#B9C4E8', fontSize: 24, textAlign: 'center', marginTop: 8}}>
        The meow is mostly for humans — adult cats rarely meow at each other
      </div>
    </div>
  );
};
