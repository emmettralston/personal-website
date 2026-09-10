// Add entries here and the "Projects" section appears on /work
// automatically; while this is empty the section hides itself.
export const sideProjects: {
  title: string
  description: string
  href?: string
  year?: string
  stack?: string[]
}[] = [
  {
    title: 'Cadence',
    description:
      'A latency profiler for voice agents. It breaks each response into its stages: speech detection, transcription, LLM response, and speech synthesis, so you can see exactly where the latency comes from.',
    href: 'https://emmettralston.github.io/Voice-Agent-Latency-Profiler/',
    year: '2026',
    stack: ['React', 'TypeScript', 'Vite'],
  },
]
