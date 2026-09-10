import { getProjects } from '@/lib/content'
import { MyWork } from './MyWork'

// Server wrapper: loads the featured projects and hands them to the client
// MyWork section (which owns the scroll-in animation).
export function SelectedWork() {
  const projects = getProjects().filter((p) => p.featured)
  return <MyWork projects={projects} />
}
