import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ProjectGallery } from '@/components/project-gallery'
import { projectsPage } from './data'

export const metadata = {
  title: projectsPage.title || 'Projects',
  description: projectsPage.description,
}

export default function ProjectsPage() {
  return (
    <section aria-label={projectsPage.title || 'Projects'} className="min-w-0">
      {projectsPage.projects.length === 0 ? (
        <p className="text-muted-foreground">Projects will be shared here soon.</p>
      ) : (
        <div className="space-y-10">
          {projectsPage.projects.map((project) => (
            <article
              key={project.id}
              id={project.id}
              aria-labelledby={`${project.id}-title`}
              className="min-w-0 scroll-mt-8 space-y-4 border-t border-border pt-6 first:border-t-0"
            >
              <header className="space-y-2">
                {project.date && (
                  <p className="font-mono text-xs text-muted-foreground">{project.date}</p>
                )}
                <h2 id={`${project.id}-title`} className="break-words text-xl font-medium tracking-tight">
                  {project.title}
                </h2>
              </header>
              <p className="whitespace-pre-line break-words leading-relaxed">{project.description}</p>

              {!!project.details?.length && (
                <dl className="grid gap-3 font-mono text-xs sm:grid-cols-2">
                  {project.details.map((detail) => (
                    <div key={detail.label} className="min-w-0 space-y-1 break-words">
                      <dt className="font-medium">{detail.label}</dt>
                      <dd className="text-muted-foreground">{detail.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {!!project.tags?.length && (
                <ul aria-label="Project topics and tools" className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li key={tag} className="max-w-full break-words rounded-sm bg-muted px-2 py-1 font-mono text-xs text-muted-foreground">
                      {tag}
                    </li>
                  ))}
                </ul>
              )}

              <ProjectGallery photos={project.photos} title={project.title} />

              {!!project.links?.length && (
                <ul aria-label="Project links" className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-sm">
                  {project.links.map((link) => (
                    <li key={link.href} className="min-w-0 max-w-full">
                      <Link
                        href={link.href}
                        className="inline-flex max-w-full items-center gap-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                      >
                        <span className="min-w-0 break-words underline decoration-border underline-offset-4">{link.label}</span>
                        <ArrowUpRight className="size-3 shrink-0" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
