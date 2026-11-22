import React from 'react';

// Locked cast looks. Pip: burnt-orange crewneck, charcoal jeans, white
// sneakers, tousled hair with a cowlick. No hood, no hat. Never pipHood.
export const LOOKS = {
  pipCrew: {shirt: '#BC5227', jeans: '#33313B', skin: '#F2C9A0', shoe: '#FFFFFF', hair: '#3A2A1E'},
  sis: {shirt: '#F5C518', jeans: '#33313B', skin: '#F2C9A0', shoe: '#FFFFFF', hair: '#3A2A1E'},
  mo: {shirt: '#6B7F3A', jeans: '#33313B', skin: '#E8B98A', shoe: '#FFFFFF', hair: '#222222'},
  mom: {shirt: '#B08A9E', jeans: '#33313B', skin: '#F2C9A0', shoe: '#FFFFFF', hair: '#5A3A2A'},
  suit: {shirt: '#2B2B3A', jeans: '#22222E', skin: '#F2C9A0', shoe: '#111111', hair: '#222222'},
} as const;

// A standing hero's shoe bottoms sit ~157 local units below the pose
// anchor (LEG_LEN 140 + shoe). Cameras must put the visible bottom below
// that or feet crop. At scale 0.95 that is world y ~1129.
export const LEG_LEN = 140;

export const Pip: React.FC<{
  x?: number;
  y?: number;
  scale?: number;
  wave?: number;
}> = ({x = 0, y = 0, scale = 1, wave = 0}) => {
  const look = LOOKS.pipCrew;
  const armAngle = -35 + wave * 12;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {/* legs - charcoal jeans */}
      <line x1={-12} y1={70} x2={-16} y2={140} stroke={look.jeans} strokeWidth={14} strokeLinecap="round" />
      <line x1={12} y1={70} x2={16} y2={140} stroke={look.jeans} strokeWidth={14} strokeLinecap="round" />
      {/* shoes - white sneakers, bottoms at y 157 */}
      <ellipse cx={-18} cy={152} rx={20} ry={8} fill={look.shoe} stroke="#CCCCCC" strokeWidth={2} />
      <ellipse cx={18} cy={152} rx={20} ry={8} fill={look.shoe} stroke="#CCCCCC" strokeWidth={2} />
      {/* torso - burnt-orange crewneck */}
      <rect x={-32} y={-10} width={64} height={86} rx={18} fill={look.shirt} />
      {/* raised arm, finger up */}
      <g transform={`rotate(${armAngle} 32 -2)`}>
        <line x1={32} y1={0} x2={78} y2={-52} stroke={look.shirt} strokeWidth={13} strokeLinecap="round" />
        <circle cx={80} cy={-56} r={10} fill={look.skin} />
        <line x1={80} y1={-56} x2={80} y2={-76} stroke={look.skin} strokeWidth={6} strokeLinecap="round" />
      </g>
      {/* other arm */}
      <line x1={-32} y1={0} x2={-58} y2={48} stroke={look.shirt} strokeWidth={13} strokeLinecap="round" />
      <circle cx={-60} cy={52} r={10} fill={look.skin} />
      {/* head */}
      <circle cx={0} cy={-52} r={30} fill={look.skin} />
      {/* tousled hair with cowlick */}
      <path d="M -30 -58 Q -28 -88 0 -86 Q 28 -88 30 -58 Q 14 -72 -2 -70 Q -18 -72 -30 -58 Z" fill={look.hair} />
      <path d="M 4 -86 Q 14 -104 26 -98 Q 16 -92 10 -82 Z" fill={look.hair} />
      {/* eyes */}
      <circle cx={-11} cy={-52} r={3.5} fill="#222222" />
      <circle cx={11} cy={-52} r={3.5} fill="#222222" />
      <path d="M -8 -38 Q 0 -32 8 -38" stroke="#222222" strokeWidth={3} fill="none" strokeLinecap="round" />
      {/* question mark above head */}
      <text x={42} y={-92} fontSize={44} fontWeight={800} fill="#FFFFFF" fontFamily="Arial, sans-serif">?</text>
    </g>
  );
};
