import type { MetadataRoute } from 'next'
import { site } from '@/content/site'
import { getProjects } from '@/lib/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url
  const staticRoutes = ['', '/work', '/outside'].map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
  }))
  const projectRoutes = getProjects().map((p) => ({
    url: `${base}/work/${p.slug}`,
    lastModified: new Date(),
  }))
  return [...staticRoutes, ...projectRoutes]
}
