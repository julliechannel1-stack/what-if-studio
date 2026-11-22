import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {OpalV2, DresserSet, CloseUpBg, SpeechBubble, FactCard} from '../../engine/opal2';
import words from './words.json';

// What If Your Cat Turned Into a Girl? — 20-second sample v2 (professional
// rebuild). Voice 20.160s, speech span 0.166-19.790s, 65 words, no digits
// in narration. On-screen text is reference-style ONLY: timestamp
// "3:12 AM", comic "SPLASH", one speech bubble, one fact card.
// NO title card, NO word-by-word floating text anywhere.
// Shots (hard cuts, like the reference):
//   1) 0-209   nightstand hero, phone/glass/keys knocked off
//   2) 210-419 lamp on, Opal revealed big on the dresser, watch pushed
//   3) 420-599 close-up Opal, slow blink on "meow", fact card
// SFX (in sfx.wav, timed to words.json): knock f104 (phone), knock f171
// (glass), lamp click f210.
// words.json timings are proportional fallback (Whisper not installed),
// remapped onto the measured speech span.
type Word = {w: string; s: number; e: number; p: boolean};
const WORDS = words as unknown as Word[];
const wordStart = (w: string): number => {
  const hit = WORDS.find((x) => x.w.toLowerCase() === w.toLowerCase());
  return hit ? Math.round(hit.s * 30) : 0;
};

function shotIndex(frame: number): number {
  if (frame < 210) return 0;
  if (frame < 420) return 1;
  return 2;
}

// Slow blink timed to "meow" (f509): close 509-527, hold, open 533-551.
function blinkAt(frame: number): number {
  return interpolate(frame, [509, 527, 533, 551], [1, 0.06, 0.06, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
}

export const CatGirlSampleV2S01Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const shot = shotIndex(frame);
  const tailSway = Math.sin(frame / 18) * 5;
  // Lamp flickers on across frames 210-225, then steady.
  const lampGlow =
    shot === 0
      ? 0
      : interpolate(frame, [210, 216, 221, 226], [0, 0.7, 0.3, 0.9], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
  // Shot 1 falls: phone at "knocks your phone" (f104), glass at f171,
  // keys slide with the glass (f180-205).
  const phoneFall = interpolate(frame, [104, 138], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const phoneY = phoneFall * 330;
  const phoneRot = phoneFall * 95;
  const glassFall = interpolate(frame, [171, 198], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const glassRot = glassFall * 82;
  const glassY = glassFall * 300;
  const keysSlide = interpolate(frame, [180, 205], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const keysX = keysSlide * 260;
  const keysY = keysSlide * 300;
  // Shot 2: Opal pushes the watch off the dresser edge (f330-385).
  const push = interpolate(frame, [330, 362], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const watchFall = interpolate(frame, [362, 392], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const watchY = watchFall * 260;
  const watchRot = watchFall * 120;
  const watchX = push * 60 + watchFall * 90;
  // Opal says hi at f470 (shot 2): mouth opens f460-485.
  const mouthOpen = interpolate(frame, [460, 468, 480, 488], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // Speech bubble fades in after the reveal (f270-300), out at the cut.
  const bubbleOpacity = interpolate(frame, [270, 300, 400, 419], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // Fact card fades in during the close-up (f480-505).
  const factOpacity = interpolate(frame, [480, 505], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: '#141126', fontFamily: 'Arial, sans-serif'}}>
      {shot === 0 && (
        <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{position: 'absolute', left: 0, top: 0}}>
          <defs>
            <linearGradient id="v2s1Wall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#191634" />
              <stop offset="100%" stopColor="#33294F" />
            </linearGradient>
            <radialGradient id="v2s1Moon" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#F5EED6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#F5EED6" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* wall, floor, window with moon */}
          <rect x={0} y={0} width={1920} height={880} fill="url(#v2s1Wall)" />
          <rect x={0} y={880} width={1920} height={200} fill="#241F33" />
          <rect x={1560} y={90} width={300} height={260} rx={18} fill="#0E0C24" stroke="#5A4A80" strokeWidth={10} />
          <circle cx={1740} cy={190} r={52} fill="#F5EED6" />
          <circle cx={1740} cy={190} r={110} fill="url(#v2s1Moon)" />
          <circle cx={1620} cy={130} r={4} fill="#FFFFFF" />
          <circle cx={1810} cy={300} r={4} fill="#FFFFFF" />
          {/* picture frame, left wall */}
          <rect x={90} y={110} width={220} height={170} rx={12} fill="#2E2547" stroke="#8A7A5A" strokeWidth={8} />
          <circle cx={200} cy={195} r={42} fill="#F5EED6" opacity={0.9} />
          {/* NIGHTSTAND — the hero of the shot, fills the lower frame */}
          <rect x={360} y={640} width={1200} height={440} rx={16} fill="#5A3A2A" stroke="#241E33" strokeWidth={7} />
          <rect x={400} y={680} width={1120} height={130} rx={10} fill="#6E4636" stroke="#241E33" strokeWidth={5} />
          <rect x={400} y={840} width={1120} height={130} rx={10} fill="#6E4636" stroke="#241E33" strokeWidth={5} />
          <circle cx={960} cy={745} r={13} fill="#FFD9A0" stroke="#241E33" strokeWidth={4} />
          <circle cx={960} cy={905} r={13} fill="#FFD9A0" stroke="#241E33" strokeWidth={4} />
          {/* wood shading on the top edge */}
          <rect x={360} y={640} width={1200} height={26} rx={12} fill="#7A5238" />
          {/* lamp, left — off, shade dark: round base, stem, trapezoid shade */}
          <ellipse cx={515} cy={636} rx={52} ry={12} fill="#2E2133" stroke="#241E33" strokeWidth={5} />
          <rect x={508} y={540} width={14} height={100} fill="#8A7A5A" stroke="#241E33" strokeWidth={4} />
          <path d="M 465 540 L 485 460 L 545 460 L 565 540 Z" fill="#5A4A6E" stroke="#241E33" strokeWidth={5} strokeLinejoin="round" />
          {/* red digital clock — "3:12", centre */}
          <rect x={830} y={540} width={260} height={100} rx={14} fill="#120E1E" stroke="#241E33" strokeWidth={6} />
          <text x={960} y={615} textAnchor="middle" fontSize={72} fontWeight={800} fill="#FF3B30" fontFamily="monospace">
            3:12
          </text>
          {/* keys — slide off with the glass */}
          <g transform={`translate(${keysX} ${keysY})`}>
            <circle cx={1150} cy={620} r={16} fill="#C9C9C9" stroke="#241E33" strokeWidth={5} />
            <circle cx={1185} cy={625} r={13} fill="#A9A9A9" stroke="#241E33" strokeWidth={5} />
            <circle cx={1150} cy={620} r={5} fill="#241E33" />
            <circle cx={1185} cy={625} r={4} fill="#241E33" />
          </g>
          {/* phone — standing, then knocked off the edge: falls straight
              down in screen space, rotating about its own centre */}
          <g transform={`translate(1300 ${560 + phoneY})`}>
            <g transform={`rotate(${phoneRot} 0 -35)`}>
              <rect x={-32} y={-90} width={64} height={110} rx={12} fill="#1A1626" stroke="#241E33" strokeWidth={6} />
              <rect x={-22} y={-78} width={44} height={78} rx={6} fill="#3A4A7A" />
              <circle cx={0} cy={8} r={6} fill="#8A8D94" />
            </g>
          </g>
          {/* glass of water — tips over and falls straight down */}
          <g transform={`translate(1450 ${580 + glassY})`}>
            <g transform={`rotate(${glassRot})`}>
              <path d="M -28 -70 L -20 10 Q 0 20 20 10 L 28 -70 Z" fill="#BFE3F0" opacity={0.85} stroke="#241E33" strokeWidth={5} />
              <path d="M -24 -40 L -19 4 Q 0 12 19 4 L 24 -40 Z" fill="#4A90B8" opacity={0.9} />
            </g>
          </g>
          {/* watch on the right edge of the nightstand */}
          <g transform="translate(1520 622)">
            <circle cx={0} cy={0} r={24} fill="#F5F5F0" stroke="#241E33" strokeWidth={5} />
            <line x1={0} y1={0} x2={0} y2={-14} stroke="#241E33" strokeWidth={4} strokeLinecap="round" />
            <line x1={0} y1={0} x2={10} y2={6} stroke="#241E33" strokeWidth={4} strokeLinecap="round" />
            <rect x={-30} y={-6} width={14} height={12} rx={4} fill="#8A8D94" stroke="#241E33" strokeWidth={3} />
            <rect x={16} y={-6} width={14} height={12} rx={4} fill="#8A8D94" stroke="#241E33" strokeWidth={3} />
          </g>
          {/* timestamp, top left — the only text in shot 1 besides the clock */}
          <text x={70} y={80} fontSize={46} fontWeight={800} fill="#FFFFFF" fontFamily="Arial, sans-serif">
            <tspan fill="#FF3B30">●</tspan> 3:12 AM
          </text>
          {/* comic SPLASH right above the falling glass */}
          {frame >= 176 && frame < 208 && (
            <text
              x={1300}
              y={640}
              textAnchor="middle"
              fontSize={96}
              fontWeight={900}
              fill="#FFFFFF"
              stroke="#241E33"
              strokeWidth={2}
              fontFamily="Arial, sans-serif"
            >
              SPLASH
            </text>
          )}
        </svg>
      )}
      {shot === 1 && (
        <>
          <DresserSet glow={lampGlow} />
          <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{position: 'absolute', left: 0, top: 0}}>
            <defs>
              <radialGradient id="v2LampGlow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#FFD9A0" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#FFD9A0" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* lamp on the dresser, lit — the light that reveals her */}
            <circle cx={520} cy={600} r={300} fill="url(#v2LampGlow)" opacity={lampGlow} />
            <ellipse cx={520} cy={696} rx={44} ry={10} fill="#2E2133" stroke="#241E33" strokeWidth={5} />
            <rect x={514} y={610} width={12} height={88} fill="#8A7A5A" stroke="#241E33" strokeWidth={4} />
            <path d="M 478 610 L 494 540 L 546 540 L 562 610 Z" fill="#FFD9A0" stroke="#241E33" strokeWidth={5} strokeLinejoin="round" />
            <OpalV2
              x={960}
              y={700}
              scale={1.6}
              blink={1}
              mouthOpen={mouthOpen}
              push={push}
              tailSway={tailSway}
              headTilt={3}
            />
            {/* watch on the dresser top, beside her hand, pushed off the edge */}
            <g transform={`translate(${1150 + watchX} ${678 + watchY}) rotate(${watchRot})`}>
              <circle cx={0} cy={0} r={22} fill="#F5F5F0" stroke="#241E33" strokeWidth={5} />
              <line x1={0} y1={0} x2={0} y2={-13} stroke="#241E33" strokeWidth={4} strokeLinecap="round" />
              <line x1={0} y1={0} x2={9} y2={5} stroke="#241E33" strokeWidth={4} strokeLinecap="round" />
            </g>
            <SpeechBubble x={1240} y={360} lines={['You were asleep.', 'I was hungry.']} opacity={bubbleOpacity} />
          </svg>
        </>
      )}
      {shot === 2 && (
        <>
          <CloseUpBg />
          <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{position: 'absolute', left: 0, top: 0}}>
            <OpalV2
              x={960}
              y={1050}
              scale={2.6}
              blink={blinkAt(frame)}
              mouthOpen={0}
              push={0}
              tailSway={tailSway}
              headTilt={2}
            />
          </svg>
          <FactCard opacity={factOpacity} />
        </>
      )}
    </AbsoluteFill>
  );
};

// Referenced for SFX timing; kept to avoid an unused-import lint issue
// in editors that flag the words import otherwise.
export const _v2WordStart = wordStart;
