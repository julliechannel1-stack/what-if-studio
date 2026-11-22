import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {DuskSet} from '../../engine/sets/dusk';
import {Pip} from '../../engine/rig';
import {Chip, WordLine} from '../../engine/kit';
import {TitleCard} from '../../engine/ui';

// Test scene only. No digits in on-screen text. Title cards are in screen
// coordinates, never inside a camera transform. On-screen text audit:
// "What if time paused" - spelling checked, no digits, no overlap, in frame.
export const TestScene: React.FC = () => {
  const frame = useCurrentFrame();
  const sunY = interpolate(frame, [0, 149], [0, 30]);
  const wave = Math.sin(frame / 12) * 0.6;
  const pipX = interpolate(frame, [0, 149], [760, 840]);
  return (
    <AbsoluteFill style={{backgroundColor: '#2B2A55', fontFamily: 'Arial, sans-serif'}}>
      <DuskSet sunY={sunY} />
      <div style={{position: 'absolute', left: 120, top: 90}}>
        <TitleCard title="Pip Explain Why" subtitle="What if time paused" />
      </div>
      <div style={{position: 'absolute', left: 120, top: 380}}>
        <WordLine words={['What', 'if', 'time', 'paused']} startFrame={15} />
      </div>
      <div style={{position: 'absolute', left: 120, top: 520}}>
        <Chip label="Test scene" />
      </div>
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{position: 'absolute', left: 0, top: 0}}
      >
        <Pip x={pipX} y={880} scale={1.4} wave={wave} />
      </svg>
    </AbsoluteFill>
  );
};
