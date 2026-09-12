import { ImageResponse } from 'next/og'
import { site } from '@/content/site'
import { buildContours, defaultConfig } from '@/lib/contours'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Mirrors the dark-theme tokens in app/globals.css so the card matches the
// live site's default look.
const COLORS = {
  canvas: '#0A0D12',
  primary: '#ECEEF1',
  secondary: '#9AA3B2',
  dot: '#6E7C8B',
  accent: '#BE3A2B',
}

export default function OgImage() {
  const { width, height } = size
  // Same field math as the hero's ContourField, just a coarser grid — a
  // static echo of the animated dot field, sized to stay legible when the
  // card is shrunk down in a link preview.
  const cfg = { ...defaultConfig(width, height), cell: 10 }
  const rings = buildContours(cfg)

  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          background: COLORS.canvas,
          color: COLORS.primary,
          padding: 80,
          fontFamily: 'serif',
        }}
      >
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          {rings.map((ring, i) =>
            ring.points.map((pt, j) => (
              <circle
                key={`${i}-${j}`}
                cx={pt.x}
                cy={pt.y}
                r={ring.accent ? 2.3 : 1.6}
                fill={ring.accent ? COLORS.accent : COLORS.dot}
                opacity={ring.accent ? 0.9 : 0.42}
              />
            ))
          )}
        </svg>

        <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 26,
              color: COLORS.secondary,
              letterSpacing: 4,
              marginBottom: 16,
            }}
          >
            Physics · Computer Engineering · NYU &rsquo;28
          </div>
          <div style={{ fontSize: 96, lineHeight: 1 }}>{site.name}</div>
          <div
            style={{
              fontFamily: 'sans-serif',
              fontSize: 30,
              color: COLORS.secondary,
              marginTop: 18,
              maxWidth: 760,
            }}
          >
            Trying to lean into my curiosity. Here&apos;s what I&apos;ve been up to.
          </div>
        </div>
      </div>
    ),
    size
  )
}
