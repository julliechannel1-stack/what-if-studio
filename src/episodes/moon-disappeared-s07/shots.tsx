import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {DuskSet} from '../../engine/sets/dusk';
import {Pip} from '../../engine/rig';
import {Chip, FactCard, WordLine} from '../../engine/kit';
import {TitleCard} from '../../engine/ui';
import words from './words.json';

// What If the Moon Disappeared Tonight? - segment 07 of ten: "The seasons wander".
// Padding: durationInFrames = voice frames (1759) + 45 frames
// (a one and a half second hold for the title / end card) = 1804 frames.
// SFX: silent sfx.wav (no SFX library in the studio); sfxVol 0.03 in
// timeline.json. Deliberate deviation, reported to the parent agent.
// Pip: LOOKS.pipCrew, no hood. Feet: y 850 at scale 1.4 puts shoe bottoms
// at about 1074, inside the 1080 frame (test scene y 880 crops slightly).
// Title cards and on-screen text are in screen coordinates, never inside
// a camera transform. DuskSet spans beyond the frame, sky to ground.
// On-screen text audit (every displayed string, checked for spelling,
// no digits, no overlap, fully in frame):
// "Pip Explain Why" - channel name, spelling checked, no digits.
// "When the lean drifts, harvests drift" - subtitle, spelling checked, no digits.
// "The seasons wander" - chip label, spelling checked, no digits.
// WordLine words come from words.json (script words only, no digits).
type Word = {w: string; s: number; e: number; p: boolean};
const WORDS = words as unknown as Word[];
const SHOTS = [{first: 0, len: 451}, {first: 451, len: 451}, {first: 902, len: 451}, {first: 1353, len: 451}];
const PIP_X = [[719, 839], [1001, 1121], [539, 659], [820, 900]] as const;
const CHIP = "The seasons wander";
const NASA_FACT = "It stabilizes our planet's wobble, which has made the climate less variable over thousands of years.";
const COMMENT_Q = "If you could keep just one thing the Moon gives you, the tides, the steady seasons, or the light on a dark night, which one would you save, and why?";

// Current spoken phrase: up to three words around the word sounding at
// this frame, so the line never overflows the frame. Words come from
// words.json (proportional fallback timings; Whisper was not installed).
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

export const MoonDisappearedS07Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const shot = shotIndex(frame);
  const s0 = SHOTS[shot].first;
  const s1 = s0 + SHOTS[shot].len;
  const pipX = interpolate(frame, [s0, s1], [PIP_X[shot][0], PIP_X[shot][1]]);
  const sunY = interpolate(frame, [0, 1804], [0, 48]);
  const wave = Math.sin(frame / 12) * 0.6;
  const phrase = currentPhrase(frame);
  return (
    <AbsoluteFill style={{backgroundColor: '#2B2A55', fontFamily: 'Arial, sans-serif'}}>
      <DuskSet sunY={sunY} />
      {frame < 150 && (
        <div style={{position: 'absolute', left: 120, top: 90}}>
          <TitleCard title="Pip Explain Why" subtitle="When the lean drifts, harvests drift" />
        </div>
      )}
      {frame >= 30 && (
        <div style={{position: 'absolute', left: 120, top: 380}}>
          <WordLine words={phrase.words} startFrame={phrase.startFrame} />
        </div>
      )}
      {shot === 1 && (
        <div style={{position: 'absolute', left: 120, top: 520}}>
          <Chip label={CHIP} />
        </div>
      )}
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{position: 'absolute', left: 0, top: 0}}
      >
        <Pip x={pipX} y={850} scale={1.4} wave={wave} />
      </svg>
    </AbsoluteFill>
  );
};
