import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '80px',
          background: '#080808',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: '#e8e2d4',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            marginBottom: 24,
          }}
        >
          Gui Trindade
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 400,
            color: '#cbff57',
            letterSpacing: '-0.01em',
          }}
        >
          Bioinformatics PhD &middot; AI Builder
        </div>
        {/* Accent bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: 6,
            background: '#cbff57',
          }}
        />
      </div>
    ),
    { ...size },
  );
}
