import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {NightBedroom, OpalGirl, PipInBed} from '../../engine/opal';
import {Chip, WordLine} from '../../engine/kit';
import {TitleCard} from '../../engine/ui';
import words from './words.json';

// What If Your Cat Turned Into a Girl? — 20-second sample, one segment.
// Voice 19.152s (575 frames) + 25 frames hold = 600 frames, 20.0s exactly.
// Script: 60 words, no digits. Fact: adult cats almost never meow at
// each other — the meow is mostly for humans (Nicastro & Owren, Cornell,
// Journal of Comparative Psychology, 2003; feral vs house cats,
// Behavioural Processes, 2011).
// Shots: 1) dark room, knocking, Pip reaches for the lamp (0-169)
//        2) lamp on, Opal revealed on the dresser (170-359)
//        3) close-up Opal, slow blink, wave, fact chip (360-599)
// SFX: real spot effects in sfx.wav — knock at the word "knocks"
// (frame 71), second knock frame 85, lamp click at "lamp" (frame 163).
// words.json timings are proportional fallback (Whisper not installed),
// same caveat as the Moon episode, but remapped onto the measured
// speech span (first speech 0.168s, last 18.833s) so the first word
// lands at 0.17s, not 0.0s.
// On-screen text audit (spelling, no digits, no overlap, in frame):
// "Pip Explain Why" / "What if your cat turned into a girl?"
// "Cats almost never meow at each other" (chip, shot 3 only)
// WordLine words come from words.json (script words only, no digits).
type Word = {w: string; s: number; e: number; p: boolean};
const WORDS = words as unknown as Word[];
const SHOTS = [
  {first: 0, len: 170},
  {first: 170, len: 190},
  {first: 360, len: 240},
];
const FACT_CHIP = 'Cats almost never meow at each other';

function currentPhrase(frame: number): {words: string[]; startFrame: number} {
  const t = frame / 30;
  let idx = 0;
  for (let i = 0; i < WORDS.length; i++) {
    if (WORDS[i].s <= t) {
      idx = i;
    } else {
      break;
    }
  }
  const start = Math.max(0, idx - 1);
  const slice = WORDS.slice(start, start + 3);
  return {words: slice.map((w) => w.w), startFrame: Math.round(slice[0].s * 30)};
}

function shotIndex(frame: number): number {
  for (let i = SHOTS.length - 1; i >= 0; i--) {
    if (frame >= SHOTS[i].first) {
      return i;
    }
  }
  return 0;
}

// Slow blink timed to the word "blinks" (frame 388): eyes shut 393-403,
// open again by 420; a second softer blink near the end (533-551).
function blinkAt(frame: number): number {
  const blink = (f0: number, f1: number, f2: number) =>
    interpolate(frame, [f0, f1, f2], [1, 0.08, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  return Math.min(blink(388, 398, 420), blink(533, 541, 551));
}

export const CatGirlSampleS01Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const shot = shotIndex(frame);
  const phrase = currentPhrase(frame);
  const lampOn = shot >= 1;
  // Lamp flickers on across frames 170-185, then steady warm glow.
  const glow =
    shot === 0
      ? 0
      : interpolate(frame, [170, 176, 182, 188], [0, 0.7, 0.25, 0.8], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
  const tailSway = Math.sin(frame / 18) * 6;
  // She waves while she says "hi" (frames 427-467).
  const wave = interpolate(frame, [427, 437, 455, 467], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // Book knocked off the nightstand in shot 1, falling frame 71-113.
  const bookY = interpolate(frame, [71, 113], [700, 985], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const bookRot = interpolate(frame, [71, 113], [0, 130], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: '#141126', fontFamily: 'Arial, sans-serif'}}>
      {shot < 2 ? (
        <>
          <NightBedroom lampOn={lampOn} glow={glow} />
          <svg
            width={1920}
            height={1080}
            viewBox="0 0 1920 1080"
            style={{position: 'absolute', left: 0, top: 0}}
          >
            <PipInBed x={330} y={720} scale={1} reach={shot === 0 ? 1 : 0.25} />
            {shot === 1 && (
              <OpalGirl x={1460} y={680} scale={1} blink={1} wave={0} tailSway={tailSway} headTilt={4} />
            )}
            {shot === 0 && (
              <g transform={`translate(880 ${bookY}) rotate(${bookRot})`}>
                <rect x={-35} y={-14} width={70} height={28} rx={4} fill="#7A4A6E" />
              </g>
            )}
          </svg>
          {shot === 0 && (
            <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, backgroundColor: '#000000', opacity: 0.5}} />
          )}
        </>
      ) : (
        <>
          <svg
            width={1920}
            height={1080}
            viewBox="0 0 1920 1080"
            style={{position: 'absolute', left: 0, top: 0}}
          >
            <defs>
              <linearGradient id="closeWall" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#241D3E" />
                <stop offset="100%" stopColor="#4A3350" />
              </linearGradient>
              <radialGradient id="closeGlow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#FFD9A0" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#FFD9A0" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect x={0} y={0} width={1920} height={1080} fill="url(#closeWall)" />
            <circle cx={960} cy={420} r={520} fill="url(#closeGlow)" />
            {/* dresser top edge along the bottom */}
            <rect x={0} y={980} width={1920} height={100} fill="#5A3A2A" />
            <OpalGirl
              x={960}
              y={850}
              scale={1.9}
              blink={blinkAt(frame)}
              wave={wave}
              tailSway={tailSway}
              headTilt={4}
            />
          </svg>
        </>
      )}
      {frame < 90 && (
        <div style={{position: 'absolute', left: 120, top: 70}}>
          <TitleCard title="Pip Explain Why" subtitle="What if your cat turned into a girl?" />
        </div>
      )}
      {frame >= 90 && (
        <div style={{position: 'absolute', left: 120, top: 300}}>
          <WordLine words={phrase.words} startFrame={phrase.startFrame} />
        </div>
      )}
      {shot === 2 && (
        <div style={{position: 'absolute', left: 120, top: 890}}>
          <Chip label={FACT_CHIP} />
        </div>
      )}
    </AbsoluteFill>
  );
};
