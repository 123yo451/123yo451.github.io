'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import type { Project } from '@/projects/data'

const basePath = (process.env.PAGES_BASE_PATH ?? '').replace(/\/$/, '')

function PhotoViewer({
  photos,
  initialIndex,
  title,
}: {
  photos: NonNullable<Project['photos']>
  initialIndex: number
  title: string
}) {
  const [api, setApi] = useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = useState(initialIndex)

  useEffect(() => {
    if (!api) return
    const updateSelection = () => setSelectedIndex(api.selectedScrollSnap())
    updateSelection()
    api.on('select', updateSelection)
    api.on('reInit', updateSelection)
    return () => {
      api.off('select', updateSelection)
      api.off('reInit', updateSelection)
    }
  }, [api])

  return (
    <>
      <SheetTitle className="shrink-0 break-words p-4 pr-12">{title}</SheetTitle>
      <Carousel
        opts={{ startIndex: initialIndex, align: 'start' }}
        setApi={setApi}
        aria-label={`${title} photo viewer`}
        tabIndex={0}
        className="min-w-0 px-4 pb-4 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
      >
        <CarouselContent>
          {photos.map((photo, index) => (
            <CarouselItem key={photo.filename} aria-label={`Photo ${index + 1} of ${photos.length}`}>
              <Image
                src={`${basePath}/${photo.filename.trim().replace(/^\/+/, '')}`}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                className="h-[50dvh] w-full object-scale-down"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-3 flex items-center justify-between gap-4">
          <p aria-live="polite" aria-atomic="true" className="font-mono text-xs text-muted-foreground">
            Photo {selectedIndex + 1} of {photos.length}
          </p>
          <div className="flex shrink-0 gap-2">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </div>
        {photos[selectedIndex]?.caption && (
          <p className="mt-2 break-words font-mono text-xs text-muted-foreground">
            {photos[selectedIndex].caption}
          </p>
        )}
      </Carousel>
    </>
  )
}

export function ProjectGallery({
  photos = [],
  title,
}: {
  photos?: Project['photos']
  title: string
}) {
  const images = photos.filter((photo) => photo.filename.trim())
  if (!images.length) return null

  return (
    <Carousel
      opts={{ align: 'start' }}
      aria-label={`${title} photo gallery`}
      tabIndex={0}
      className="min-w-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <CarouselContent className="py-1">
      {images.map((photo, index) => {
        const src = `${basePath}/${photo.filename.trim().replace(/^\/+/, '')}`

        return (
          <CarouselItem key={photo.filename} className="basis-64" aria-label={`Photo ${index + 1} of ${images.length}`}>
          <figure className="space-y-2">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label={`View ${photo.alt || `${title} photo ${index + 1}`}`}
                  className="block w-full cursor-zoom-in rounded-sm focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
                >
                  <Image
                    src={src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    className="h-auto w-full rounded-sm bg-muted"
                  />
                </button>
              </SheetTrigger>
              <SheetContent
                side="center"
                aria-describedby={undefined}
                className="max-w-4xl gap-0 overflow-y-auto"
              >
                <PhotoViewer photos={images} initialIndex={index} title={title} />
              </SheetContent>
            </Sheet>
            {photo.caption && (
              <figcaption className="break-words font-mono text-xs text-muted-foreground">
                {photo.caption}
              </figcaption>
            )}
          </figure>
          </CarouselItem>
        )
      })}
      </CarouselContent>
      <div className="mt-3 flex justify-end gap-2">
        <CarouselPrevious className="static translate-y-0" />
        <CarouselNext className="static translate-y-0" />
      </div>
    </Carousel>
  )
}
