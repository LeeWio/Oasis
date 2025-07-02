import { cn } from '@heroui/theme'
import {
  motion,
  HTMLMotionProps,
  SVGMotionProps,
  ForwardRefComponent,
  Variant,
  useAnimation,
} from 'framer-motion'
import React from 'react'

type Direction = 'up' | 'down' | 'left' | 'right'

const generateVariants = (
  direction: Direction
): { hidden: Variant; visible: Variant } => {
  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y'
  const value = direction === 'right' || direction === 'down' ? 100 : -100

  return {
    hidden: { filter: 'blur(10px)', opacity: 0, [axis]: value },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      [axis]: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }
}

const defaultViewport = { amount: 0.3, margin: '0px 0px -200px 0px' }
type MotionComponentProps = HTMLMotionProps<any> & SVGMotionProps<any>

interface ScrollElementProps extends Omit<MotionComponentProps, 'children'> {
  children: React.ReactNode
  className?: string
  variants?: {
    hidden?: any
    visible?: any
  }
  viewport?: {
    amount?: number
    margin?: string
    once?: boolean
  }
  delay?: number
  direction?: Direction
}

function ScrollElement({
  children,
  className,
  variants,
  viewport = defaultViewport,
  delay = 0, // Default delay is 0
  direction = 'down',
  ...rest
}: ScrollElementProps) {
  const baseVariants = variants || generateVariants(direction)
  const modifiedVariants = {
    hidden: baseVariants.hidden,
    visible: {
      ...baseVariants.visible,
      transition: {
        ...baseVariants.visible.transition,
        delay, // Apply custom delay here
      },
    },
  }

  return (
    <motion.div
      whileInView="visible"
      initial="hidden"
      variants={modifiedVariants}
      viewport={viewport}
      className={cn(className)}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
export default ScrollElement
