import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {useCurrentFrame} from 'remotion';
import {PipDark, PipHead} from '../../engine/pip-dark';
import {CatDark, DogTan, BorderCollie} from '../../engine/animals';
import {RichBedroom, BlurredBedroom, ClassroomSet} from '../../engine/bedroom-rich';

// WHAT IF YOU COULD TALK TO ANIMALS? — 20s sample, rebuilt to match the
// user's uploaded reference video frame by frame.
// Voice 17.16s, speech span 0.145-16.708s, 55 words, no digits in
// narration. On-screen text is reference-style ONLY: TALK pill, "..."
// bubbles, title, data graphic, clock. NO floating word-by-word text.
// Shots (hard cuts, like the reference):
//   0-119   bedroom, Pip laser pointer, cat stares
//   120-209 cat close-up, blurred bg, TALK pill, "..." bubble
//   210-269 classroom dog close-up, TALK pill, "..." bubble
//   270-329 title card, Pip arms up, cat + dog
//   330-449 data graphic, Chaser, count up to 1,022
//   450-509 clock close-up, 11:59 -> 12:00
//   510-599 Pip close-up, blurred bg, smile, sparkle, cat eyes
// SFX in sfx.wav: laser click f45, cat blip f150, pop f360, tick f480.

function shotIndex(frame: number): number {
  if (frame < 120) return 0;
  if (frame < 210) return 1;
  if (frame < 270) return 2;
  if (frame < 330) return 3;
  if (frame < 450) return 4;
  if (frame < 510) return 5;
  return 6;
}

const TalkPill: React.FC = () => (
  <div style={{position: 'absolute', left: 64, top: 56, backgroundColor: 'rgba(10,10,20,0.72)', borderRadius: 999, padding: '14px 30px', display: 'flex', alignItems: 'center', gap: 16}}>
    <span style={{width: 18, height: 18, borderRadius: '50%', backgroundColor: '#FF3B30', display: 'inline-block'}} />
    <span style={{color: '#F5F2E8', fontSize: 34, fontWeight: 700, letterSpacing: 6}}>TALK</span>
  </div>
);

const DotsBubble: React.FC<{x: number; y: number; opacity?: number}> = ({x, y, opacity = 1}) => (
  <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{position: 'absolute', left: 0, top: 0, opacity}}>
    <g transform={`translate(${x} ${y})`}>
      <rect x={-110} y={-70} width={220} height={130} rx={60} fill="#F5F2E8" stroke="#1E2436" strokeWidth={6} />
      <path d="M -20 58 L 10 100 L 40 58 Z" fill="#F5F2E8" stroke="#1E2436" strokeWidth={6} strokeLinejoin="round" />
      <circle cx={-60} cy={-5} r={17} fill="#1E2436" />
      <circle cx={0} cy={-5} r={17} fill="#1E2436" />
      <circle cx={60} cy={-5} r={17} fill="#1E2436" />
    </g>
  </svg>
);

export const TalkToAnimalsSampleS01Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const shot = shotIndex(frame);
  // Shot 0: laser dot drifts across the rug; Pip surprised when she talks (f96).
  const dotX = 1150 + Math.sin(frame / 22) * 90;
  const dotY = 960 + Math.cos(frame / 30) * 18;
  const surprised = frame >= 96;
  const catBlink = interpolate(frame, [30, 36, 42], [1, 0.06, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  // Shot 1: cat blink + tail up, bubble pops in.
  const bubbleIn = interpolate(frame, [130, 145], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const catBlink2 = interpolate(frame, [170, 176, 182], [1, 0.06, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  // Shot 2: dog tail wag.
  const wag = Math.sin(frame / 6) * 14;
  const dogBubble = interpolate(frame, [220, 235], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  // Shot 3: title glow pulse.
  const titleGlow = 0.75 + Math.sin(frame / 12) * 0.25;
  // Shot 4: count up 0 -> 1,022 across f340-440; "THAT'S REAL." f430+.
  const count = Math.round(interpolate(frame, [340, 440], [0, 1022], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  const countText = count.toLocaleString('en-US');
  const realOpacity = interpolate(frame, [430, 445], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  // Shot 5: clock flips 11:59 -> 12:00 at f495.
  const clockText = frame < 495 ? '11:59' : '12:00';
  // Shot 6: Pip blink + sparkles.
  const pipBlink = interpolate(frame, [540, 546, 552], [1, 0.06, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const sparkle = interpolate(frame, [520, 540, 560, 580], [0, 1, 0.4, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const catEyesIn = interpolate(frame, [570, 590], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{backgroundColor: '#141126', fontFamily: 'Arial, sans-serif'}}>
      {shot === 0 && (
        <>
          <RichBedroom clock="07:42" />
          <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{position: 'absolute', left: 0, top: 0}}>
            {/* laser beam + red dot on the rug */}
            <line x1={868} y1={742} x2={dotX} y2={dotY} stroke="#FF3B30" strokeWidth={4} opacity={0.85} />
            <circle cx={dotX} cy={dotY} r={26} fill="#FF3B30" opacity={0.25} />
            <circle cx={dotX} cy={dotY} r={13} fill="#FF3B30" />
            <PipDark x={700} y={1000} scale={1.0} laser={1} surprised={surprised} blink={1} rim={1} />
            <CatDark x={1470} y={920} scale={0.85} blink={catBlink} tailUp={1} lookX={-8} />
          </svg>
        </>
      )}
      {shot === 1 && (
        <>
          <BlurredBedroom />
          <TalkPill />
          <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{position: 'absolute', left: 0, top: 0}}>
            <ellipse cx={960} cy={880} rx={420} ry={36} fill="#000000" opacity={0.35} />
            <CatDark x={960} y={880} scale={1.9} blink={catBlink2} tailUp={1} lookX={0} />
          </svg>
          <DotsBubble x={1330} y={330} opacity={bubbleIn} />
        </>
      )}
      {shot === 2 && (
        <>
          <ClassroomSet />
          <TalkPill />
          <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{position: 'absolute', left: 0, top: 0}}>
            <circle cx={1150} cy={330} r={150} fill="none" stroke="#F5F2E8" strokeWidth={5} opacity={0.5} />
            <ellipse cx={900} cy={920} rx={460} ry={34} fill="#000000" opacity={0.35} />
            <DogTan x={900} y={920} scale={1.9} blink={1} tailWag={wag} happy />
          </svg>
          <DotsBubble x={1150} y={330} opacity={dogBubble} />
        </>
      )}
      {shot === 3 && (
        <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{position: 'absolute', left: 0, top: 0}}>
          <defs>
            <radialGradient id="ttGlow" cx="0.5" cy="0.45" r="0.6">
              <stop offset="0%" stopColor="#FF8A3D" stopOpacity={0.35 * titleGlow} />
              <stop offset="100%" stopColor="#FF8A3D" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect x={0} y={0} width={1920} height={1080} fill="#141126" />
          <circle cx={960} cy={480} r={620} fill="url(#ttGlow)" />
          <text x={960} y={300} textAnchor="middle" fontSize={92} fontWeight={900} fill="#F5F2E8" fontFamily="Arial, sans-serif">
            WHAT IF YOU COULD
          </text>
          <text x={960} y={430} textAnchor="middle" fontSize={110} fontWeight={900} fill="#FF8A3D" fontFamily="Arial, sans-serif">
            TALK TO ANIMALS?
          </text>
          <PipDark x={960} y={1010} scale={0.95} armUp={1} laser={0} blink={1} smile={0} rim={1} />
          <CatDark x={520} y={1010} scale={0.72} blink={1} tailUp={1} />
          <DogTan x={1420} y={1010} scale={0.72} blink={1} tailWag={Math.sin(frame / 8) * 12} happy />
        </svg>
      )}
      {shot === 4 && (
        <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{position: 'absolute', left: 0, top: 0}}>
          <defs>
            <pattern id="ttGrid" width={90} height={90} patternUnits="userSpaceOnUse">
              <path d="M 90 0 L 0 0 0 90" fill="none" stroke="#2E3A5C" strokeWidth={2} />
            </pattern>
          </defs>
          <rect x={0} y={0} width={1920} height={1080} fill="#16223E" />
          <rect x={0} y={0} width={1920} height={1080} fill="url(#ttGrid)" />
          {/* corner brackets */}
          <path d="M 90 150 L 90 90 L 150 90" fill="none" stroke="#F5F2E8" strokeWidth={5} />
          <path d="M 1830 150 L 1830 90 L 1770 90" fill="none" stroke="#F5F2E8" strokeWidth={5} />
          <path d="M 90 930 L 90 990 L 150 990" fill="none" stroke="#F5F2E8" strokeWidth={5} />
          <path d="M 1830 930 L 1830 990 L 1770 990" fill="none" stroke="#F5F2E8" strokeWidth={5} />
          <text x={150} y={210} fontSize={56} fontWeight={700} fill="#F5F2E8" letterSpacing={4} fontFamily="Arial, sans-serif">
            A BORDER COLLIE
          </text>
          <BorderCollie x={420} y={760} scale={1.15} />
          <text x={420} y={850} textAnchor="middle" fontSize={44} fontWeight={700} fill="#8A94B8" letterSpacing={6} fontFamily="Arial, sans-serif">
            CHASER
          </text>
          <text x={1150} y={300} textAnchor="middle" fontSize={44} fontWeight={700} fill="#8A94B8" letterSpacing={4} fontFamily="Arial, sans-serif">
            EVERY TOY HAD A NAME
          </text>
          {/* toy icons row */}
          <g stroke="#F5F2E8" strokeWidth={5} fill="none" opacity={0.9}>
            <circle cx={820} cy={400} r={26} />
            <rect x={900} y={380} width={70} height={40} rx={8} />
            <circle cx={1030} cy={400} r={26} />
            <path d="M 1100 385 Q 1130 415 1160 385 Q 1190 415 1220 385" />
            <rect x={1280} y={380} width={70} height={40} rx={8} transform="rotate(20 1315 400)" />
            <circle cx={1440} cy={400} r={26} />
          </g>
          <path d="M 700 520 Q 800 560 860 520" fill="none" stroke="#F5F2E8" strokeWidth={5} />
          <path d="M 860 520 L 830 500 M 860 520 L 830 540" fill="none" stroke="#F5F2E8" strokeWidth={5} />
          <text x={1150} y={700} textAnchor="middle" fontSize={130} fontWeight={900} fill="#FF8A3D" fontFamily="Arial, sans-serif">
            {countText}
          </text>
          <text x={1150} y={790} textAnchor="middle" fontSize={48} fontWeight={700} fill="#8A94B8" letterSpacing={6} fontFamily="Arial, sans-serif">
            WORDS LEARNED
          </text>
          <text x={1150} y={920} textAnchor="middle" fontSize={56} fontWeight={900} fill="#F5F2E8" opacity={realOpacity} fontFamily="Arial, sans-serif">
            THAT'S REAL.
          </text>
        </svg>
      )}
      {shot === 5 && (
        <>
          <BlurredBedroom />
          <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{position: 'absolute', left: 0, top: 0}}>
            <rect x={560} y={380} width={800} height={320} rx={36} fill="#1A1626" stroke="#3A3A4A" strokeWidth={8} />
            <rect x={600} y={420} width={720} height={240} rx={20} fill="#120E1E" />
            <text x={960} y={600} textAnchor="middle" fontSize={170} fontWeight={800} fill="#FF5A3D" fontFamily="monospace">
              {clockText}
            </text>
          </svg>
        </>
      )}
      {shot === 6 && (
        <>
          <BlurredBedroom />
          <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{position: 'absolute', left: 0, top: 0}}>
            <PipHead x={960} y={620} scale={1.0} blink={pipBlink} smile={0} />
            {/* sparkles */}
            <g opacity={sparkle} fill="#FFE9B8">
              <path d="M 520 300 L 530 330 L 560 340 L 530 350 L 520 380 L 510 350 L 480 340 L 510 330 Z" />
              <path d="M 1400 260 L 1408 282 L 1430 290 L 1408 298 L 1400 320 L 1392 298 L 1370 290 L 1392 282 Z" />
              <circle cx={620} cy={700} r={8} />
              <circle cx={1320} cy={700} r={8} />
            </g>
            {/* cat eyes in the dark, bottom right */}
            <g opacity={catEyesIn}>
              <circle cx={1620} cy={980} r={22} fill="#F2C94C" stroke="#141824" strokeWidth={4} />
              <circle cx={1690} cy={980} r={22} fill="#F2C94C" stroke="#141824" strokeWidth={4} />
              <circle cx={1620} cy={980} r={9} fill="#141824" />
              <circle cx={1690} cy={980} r={9} fill="#141824" />
            </g>
          </svg>
        </>
      )}
    </AbsoluteFill>
  );
};
