import React from 'react';

// Opal — the cat turned into a girl, drawn in code (SVG, no images).
// Gray hoodie (#8A8D94) with a white patch on the chest, cat ears in her
// hair, a tail, white sneakers. She sits on the dresser; the anchor (x, y)
// is the seat — the bottom of her torso where it meets the dresser top.
// Local layout: head centre y -260, torso -190..0, legs dangle 0..+120.
export const OpalGirl: React.FC<{
  x?: number;
  y?: number;
  scale?: number;
  blink?: number; // 1 = eyes open, 0 = eyes shut
  wave?: number; // 0 = arm down, 1 = arm raised waving
  tailSway?: number; // degrees
  headTilt?: number; // degrees
}> = ({x = 0, y = 0, scale = 1, blink = 1, wave = 0, tailSway = 0, headTilt = 0}) => {
  const hoodie = '#8A8D94';
  const hoodieDark = '#74777E';
  const patch = '#F5F5F0';
  const skin = '#F2C9A0';
  const hair = '#3A2A1E';
  const pants = '#5A5C66';
  const eyeH = Math.max(0.08, blink);
  const waveAngle = 135 - wave * 165;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {/* tail, behind the dresser edge, swaying */}
      <g transform={`rotate(${tailSway} 40 20)`}>
        <path
          d="M 38 10 Q 120 30 110 110 Q 104 150 78 138"
          stroke="#6E7076"
          strokeWidth={16}
          fill="none"
          strokeLinecap="round"
        />
        <circle cx={76} cy={136} r={9} fill={patch} />
      </g>
      {/* dangling legs over the dresser front */}
      <line x1={-16} y1={0} x2={-22} y2={92} stroke={pants} strokeWidth={20} strokeLinecap="round" />
      <line x1={16} y1={0} x2={24} y2={92} stroke={pants} strokeWidth={20} strokeLinecap="round" />
      <ellipse cx={-24} cy={104} rx={18} ry={9} fill="#FFFFFF" stroke="#CCCCCC" strokeWidth={2} />
      <ellipse cx={26} cy={104} rx={18} ry={9} fill="#FFFFFF" stroke="#CCCCCC" strokeWidth={2} />
      {/* torso — gray hoodie, long enough to sit on */}
      <rect x={-52} y={-190} width={104} height={196} rx={30} fill={hoodie} />
      {/* white patch on the chest, exactly where Opal the cat has one */}
      <rect x={-26} y={-150} width={52} height={62} rx={18} fill={patch} />
      {/* hood bunched behind the neck */}
      <path d="M -44 -186 Q 0 -214 44 -186 Q 30 -168 0 -168 Q -30 -168 -44 -186 Z" fill={hoodieDark} />
      {/* drawstrings */}
      <line x1={-14} y1={-168} x2={-18} y2={-128} stroke={patch} strokeWidth={5} strokeLinecap="round" />
      <line x1={14} y1={-168} x2={18} y2={-128} stroke={patch} strokeWidth={5} strokeLinecap="round" />
      {/* resting arm on her knee */}
      <line x1={-50} y1={-160} x2={-66} y2={-60} stroke={hoodie} strokeWidth={16} strokeLinecap="round" />
      <circle cx={-68} cy={-52} r={11} fill={skin} />
      {/* waving arm — rises when she says hi */}
      <g transform={`rotate(${waveAngle} 50 -160)`}>
        <line x1={50} y1={-160} x2={96} y2={-210} stroke={hoodie} strokeWidth={16} strokeLinecap="round" />
        <circle cx={98} cy={-214} r={11} fill={skin} />
      </g>
      {/* head, tilted a little */}
      <g transform={`rotate(${headTilt} 0 -260)`}>
        <circle cx={0} cy={-260} r={42} fill={skin} />
        {/* hair with bangs */}
        <path
          d="M -42 -262 Q -44 -308 0 -306 Q 44 -308 42 -262 Q 28 -284 0 -282 Q -28 -284 -42 -262 Z"
          fill={hair}
        />
        {/* cat ears in her hair */}
        <path d="M -34 -296 L -44 -336 L -12 -312 Z" fill={hair} />
        <path d="M -32 -302 L -37 -324 L -18 -310 Z" fill="#F2A0A0" />
        <path d="M 34 -296 L 44 -336 L 12 -312 Z" fill={hair} />
        <path d="M 32 -302 L 37 -324 L 18 -310 Z" fill="#F2A0A0" />
        {/* eyes — scaleY closes them for the slow blink */}
        <g transform={`translate(-16 -258) scale(1 ${eyeH})`}>
          <circle r={7} fill="#222222" />
          <circle cx={2} cy={-2} r={2.2} fill="#FFFFFF" />
        </g>
        <g transform={`translate(16 -258) scale(1 ${eyeH})`}>
          <circle r={7} fill="#222222" />
          <circle cx={2} cy={-2} r={2.2} fill="#FFFFFF" />
        </g>
        {/* blush + smile */}
        <ellipse cx={-28} cy={-240} rx={8} ry={5} fill="#F2A0A0" opacity={0.55} />
        <ellipse cx={28} cy={-240} rx={8} ry={5} fill="#F2A0A0" opacity={0.55} />
        <path d="M -10 -238 Q 0 -230 10 -238" stroke="#222222" strokeWidth={3.5} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
};

// Pip in bed, sitting up against the pillow in his burnt-orange crewneck.
export const PipInBed: React.FC<{
  x?: number;
  y?: number;
  scale?: number;
  reach?: number; // 0 = arm down, 1 = arm reaching for the lamp
}> = ({x = 0, y = 0, scale = 1, reach = 0}) => {
  const look = {shirt: '#BC5227', skin: '#F2C9A0', hair: '#3A2A1E'};
  const reachAngle = -10 - reach * 55;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {/* torso above the blanket */}
      <rect x={-46} y={-110} width={92} height={116} rx={26} fill={look.shirt} />
      {/* arm reaching toward the lamp */}
      <g transform={`rotate(${reachAngle} 46 -90)`}>
        <line x1={46} y1={-90} x2={92} y2={-120} stroke={look.shirt} strokeWidth={15} strokeLinecap="round" />
        <circle cx={96} cy={-124} r={11} fill={look.skin} />
      </g>
      <line x1={-46} y1={-90} x2={-70} y2={-20} stroke={look.shirt} strokeWidth={15} strokeLinecap="round" />
      <circle cx={-72} cy={-14} r={11} fill={look.skin} />
      {/* head */}
      <circle cx={0} cy={-158} r={38} fill={look.skin} />
      <path d="M -38 -164 Q -36 -196 0 -194 Q 36 -196 38 -164 Q 18 -180 -2 -178 Q -20 -180 -38 -164 Z" fill={look.hair} />
      <path d="M 4 -194 Q 14 -212 26 -206 Q 16 -200 10 -190 Z" fill={look.hair} />
      <circle cx={-14} cy={-158} r={4.5} fill="#222222" />
      <circle cx={14} cy={-158} r={4.5} fill="#222222" />
      <path d="M -10 -142 Q 0 -136 10 -142" stroke="#222222" strokeWidth={3.5} fill="none" strokeLinecap="round" />
    </g>
  );
};

// Night bedroom set, screen coordinates 1920x1080. The wall rect runs
// down to the floor line and the floor covers the bottom, so no black
// band or bar appears at any shot used here (wide shots are scale 1;
// the close-up uses its own full-bleed background).
export const NightBedroom: React.FC<{lampOn?: boolean; glow?: number}> = ({
  lampOn = false,
  glow = 0,
}) => {
  return (
    <svg
      width={1920}
      height={1080}
      viewBox="0 0 1920 1080"
      style={{position: 'absolute', left: 0, top: 0}}
    >
      <defs>
        <linearGradient id="nightWall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#191634" />
          <stop offset="100%" stopColor="#33294F" />
        </linearGradient>
        <radialGradient id="lampGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FFD9A0" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FFD9A0" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* wall down to the floor line, floor below it */}
      <rect x={0} y={0} width={1920} height={960} fill="url(#nightWall)" />
      <rect x={0} y={960} width={1920} height={120} fill="#241F33" />
      {/* window with moon and stars, top right */}
      <rect x={1500} y={80} width={360} height={300} rx={18} fill="#0E0C24" stroke="#4A3F6E" strokeWidth={10} />
      <line x1={1680} y1={80} x2={1680} y2={380} stroke="#4A3F6E" strokeWidth={8} />
      <line x1={1500} y1={230} x2={1860} y2={230} stroke="#4A3F6E" strokeWidth={8} />
      <circle cx={1780} cy={150} r={48} fill="#F5EED6" />
      <circle cx={1560} cy={130} r={4} fill="#FFFFFF" />
      <circle cx={1620} cy={330} r={3} fill="#FFFFFF" />
      <circle cx={1830} cy={330} r={4} fill="#FFFFFF" />
      {/* picture frame, centre wall — clear of the title card */}
      <rect x={980} y={110} width={200} height={150} rx={10} fill="#2E2547" stroke="#8A7A5A" strokeWidth={8} />
      <circle cx={1080} cy={185} r={38} fill="#F5EED6" opacity={0.9} />
      {/* rug */}
      <ellipse cx={960} cy={1010} rx={560} ry={70} fill="#3A2F52" />
      {/* bed, left */}
      <rect x={60} y={760} width={540} height={220} rx={18} fill="#4A3350" />
      <rect x={60} y={700} width={540} height={80} rx={18} fill="#E8E0D0" />
      <rect x={80} y={640} width={160} height={80} rx={20} fill="#FFFFFF" />
      <path d="M 60 860 L 600 860 L 600 980 L 60 980 Z" fill="#BC5227" opacity={0.9} />
      {/* nightstand, centre left, with lamp */}
      <rect x={660} y={760} width={200} height={220} rx={12} fill="#5A3A2A" />
      <rect x={680} y={790} width={160} height={70} rx={8} fill="#6E4636" />
      <circle cx={760} cy={825} r={10} fill="#FFD9A0" />
      <rect x={730} y={680} width={80} height={80} rx={8} fill="#2E2133" />
      <path d="M 740 680 L 770 620 L 830 680 Z" fill={lampOn ? '#FFD9A0' : '#5A4A6E'} />
      <rect x={762} y={620} width={16} height={70} fill="#8A7A5A" />
      {/* lamp glow when on */}
      {glow > 0.02 && <circle cx={785} cy={650} r={320} fill="url(#lampGlow)" opacity={glow} />}
      {/* dresser, right — Opal sits on top of it */}
      <rect x={1080} y={680} width={760} height={300} rx={14} fill="#5A3A2A" />
      <rect x={1110} y={710} width={700} height={80} rx={8} fill="#6E4636" />
      <rect x={1110} y={810} width={700} height={80} rx={8} fill="#6E4636" />
      <rect x={1110} y={910} width={700} height={70} rx={8} fill="#6E4636" />
      <circle cx={1460} cy={750} r={11} fill="#FFD9A0" />
      <circle cx={1460} cy={850} r={11} fill="#FFD9A0" />
      <circle cx={1460} cy={945} r={11} fill="#FFD9A0" />
      {/* books and a tiny plant on the dresser */}
      <rect x={1140} y={636} width={90} height={44} rx={4} fill="#7A4A6E" />
      <rect x={1140} y={602} width={70} height={34} rx={4} fill="#4A7A6E" />
      <rect x={1740} y={620} width={60} height={60} rx={8} fill="#B08A5A" />
      <circle cx={1770} cy={600} r={34} fill="#4A7A3A" />
    </svg>
  );
};
