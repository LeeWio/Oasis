import type { CircleChartProps } from '@/components/rechart/CircleCharCard'

import React from 'react'
import { Card, CardBody } from '@heroui/card'

import { CircleChartCard } from '@/components/rechart/CircleCharCard'

const data: CircleChartProps[] = [
  {
    title: 'Activity',
    color: 'primary',
    total: 1358,
    chartData: [
      { name: 'Active Users', value: 780, fill: 'hsl(var(--heroui-primary))' },
    ],
  },
  {
    title: 'Revenue',
    color: 'default',
    total: 2450,
    chartData: [
      { name: 'Monthly', value: 1840, fill: 'hsl(var(--heroui-primary))' },
    ],
  },
]

export default function Home() {
  return (
    <section className="ml-0 flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="flex w-full flex-row justify-center space-x-6">
        <CircleChartCard {...data[0]} className="w-64" />

        <Card className="flex-[2]">
          <CardBody>
            <p>Make beautiful websites regardless of your design experience.</p>
          </CardBody>
        </Card>

        <CircleChartCard {...data[1]} className="w-64" />
      </div>
    </section>
  )
}
