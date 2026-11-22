import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';

// Measure text with the rendered letterSpacing. Pill widths include
// +2px per character for letterSpacing, or spaces collapse.
export function pillWidth(text: string, letterSpacing: number): number {
  return text.length * 2 + text.length * 18 + 48;
}

export const Chip: React.FC<{label: string}> = ({label}) => {
  const ls = 2;
  return (
    <div
      style={{
        backgroundColor: '#BC5227',
        borderRadius: 999,
        padding: '14px 28px',
        color: '#FFFFFF',
        fontFamily: 'Arial, sans-serif',
        fontSize: 28,
        fontWeight: 700,
        letterSpacing: ls,
        width: pillWidth(label, ls),
        textAlign: 'center',
      }}
    >
      {label}
    </div>
  );
};

export const FactCard: React.FC<{title: string; body: string}> = ({title, body}) => {
  return (
    <div
      style={{
        backgroundColor: '#FFF8EC',
        borderRadius: 24,
        padding: 32,
        color: '#222222',
        fontFamily: 'Arial, sans-serif',
        width: 900,
      }}
    >
      <div style={{fontSize: 30, fontWeight: 800, marginBottom: 12}}>{title}</div>
      <div style={{fontSize: 26, lineHeight: 1.4}}>{body}</div>
    </div>
  );
};

// WordLine pop-in: clamp the pop overshoot to 1.0, a backOut overshoot
// (~1.10) collides adjacent words.
export const WordLine: React.FC<{words: string[]; startFrame: number}> = ({
  words,
  startFrame,
}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{display: 'flex', gap: 18, fontFamily: 'Arial, sans-serif'}}>
      {words.map((w, i) => {
        const pop = interpolate(
          frame - (startFrame + i * 18),
          [0, 8],
          [0.6, 1],
          {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
        );
        const opacity = interpolate(
          frame - (startFrame + i * 18),
          [0, 4],
          [0, 1],
          {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
        );
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              transform: `scale(${pop})`,
              opacity,
              fontSize: 64,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: 2,
              textShadow: '0 4px 24px rgba(0,0,0,0.45)',
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};
