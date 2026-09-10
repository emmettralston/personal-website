import { ImageResponse } from 'next/og'
import { site } from '@/content/site'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          background: '#0A0D12',
          color: '#ECEEF1',
          padding: 80,
          fontFamily: 'serif',
        }}
      >
        <div style={{ fontSize: 28, color: '#6B7480', letterSpacing: 4, marginBottom: 16 }}>
          Physics · Computer Engineering · NYU &rsquo;28
        </div>
        <div style={{ fontSize: 92 }}>{site.name}</div>
        <div style={{ fontSize: 30, color: '#9AA3B2', marginTop: 16 }}>
          AI systems for regulated industries · semiconductor research
        </div>
      </div>
    ),
    size
  )
}
