'use client'

import type { CircleChartProps } from '@/components/rechart/CircleCharCard'

import React from 'react'
import { Card, CardBody } from '@heroui/card'

import { CircleChartCard } from '@/components/rechart/CircleCharCard'
import ScrollElement from '@/components/scroll/scroll-element'
import { Image } from '@heroui/image'

export default function Home() {
  return (
    <section className="ml-0 flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="flex w-full flex-row justify-center space-x-6 ">
        <ScrollElement direction="left" className="text-5xl text-right py-44">
          adfadfasdf
        </ScrollElement>
      </div>
    </section>
  )
}
