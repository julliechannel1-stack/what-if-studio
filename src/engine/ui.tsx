import React from 'react';

// Title cards and on-screen text go in screen coordinates, never inside a
// camera transform. layoutWords measures with the rendered letterSpacing.
export function layoutWords(text: string, letterSpacing: number): {width: number} {
  return {width: text.length * (20 + letterSpacing) + letterSpacing * 2};
}

export const TitleCard: React.FC<{title: string; subtitle: string}> = ({
  title,
  subtitle,
}) => {
  return (
    <div
      style={{
        backgroundColor: 'rgba(20, 16, 40, 0.72)',
        borderRadius: 24,
        padding: '36px 48px',
        color: '#FFFFFF',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
      }}
    >
      <div style={{fontSize: 72, fontWeight: 900, letterSpacing: 2}}>{title}</div>
      <div style={{fontSize: 32, marginTop: 12, opacity: 0.9}}>{subtitle}</div>
    </div>
  );
};
