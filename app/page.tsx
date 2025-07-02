'use client'

import type { CircleChartProps } from '@/components/rechart/CircleCharCard'

import React from 'react'
import { Card, CardBody } from '@heroui/card'

import { CircleChartCard } from '@/components/rechart/CircleCharCard'
import ScrollElement from '@/components/scroll/scroll-element'
import { Image } from '@heroui/image'
import { ImageMouseTrail } from '@/components/image/image-mouse-trail'

const images = [
  'https://images.unsplash.com/photo-1709949908058-a08659bfa922?q=80&w=1200&auto=format',
  'https://images.unsplash.com/photo-1548192746-dd526f154ed9?q=80&w=1200&auto=format',
  'https://images.unsplash.com/photo-1693581176773-a5f2362209e6?q=80&w=1200&auto=format',
  'https://images.unsplash.com/photo-1584043204475-8cc101d6c77a?q=80&w=1200&auto=format',
  'https://images.unsplash.com/photo-1709949908058-a08659bfa922?q=80&w=1200&auto=format',
  'https://images.unsplash.com/photo-1518599904199-0ca897819ddb?q=80&w=1200&auto=format',
  'https://images.unsplash.com/photo-1706049379414-437ec3a54e93?q=80&w=1200&auto=format',
  'https://images.unsplash.com/photo-1709949908219-fd9046282019?q=80&w=1200&auto=format',
  'https://images.unsplash.com/photo-1508873881324-c92a3fc536ba?q=80&w=1200&auto=format',
]

export default function Home() {
  return (
    <section className="ml-0 flex flex-col items-center justify-center gap-4 ">
      <ImageMouseTrail
        items={images}
        maxNumberOfImages={5}
        distance={25}
        imgClass="sm:w-40 w-28 sm:h-48 h-36"
        fadeAnimation={true}
        className="w-full bg-red-500"
      >
        <article className="relative z-50 mix-blend-difference">
          <h1 className="lg:text-4xl md:text-3xl text-xl text-center font-semibold mix-blend-difference">
            ✨ Experience Interactive Designs with <br />
            Dynamic Mouse Trails
          </h1>
        </article>
      </ImageMouseTrail>
      <ScrollElement direction="left" className="text-5xl text-right py-44">
        adfadfasdf
      </ScrollElement>
    </section>
  )
}
