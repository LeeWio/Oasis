import { useMemo, type ReactNode } from 'react'
import { ReactRef } from '@heroui/react-utils'
import { HTMLHeroUIProps, mapPropsVariants, PropGetter } from '@heroui/system'
import { tv, type VariantProps } from 'tailwind-variants'
import { colorVariants } from '@/utils/variants'
import { objectToDeps } from '@heroui/shared-utils'

export interface UserCodeBlockProps
  extends HTMLHeroUIProps<'div'>,
    CodeBlockVariantProps {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLDivElement | null>
}

const codeBlock = tv({
  base: [
    'px-2',
    'py-1',
    'h-fit',
    'font-mono',
    'font-normal',
    'inline-flex',
    'whitespace-nowrap',
    'gap-2',
    'items-center',
    'justify-start',
    'w-full',
  ],
  variants: {
    variant: {
      flat: '',
      light: 'bg-transparent',
      faded: 'border-medium',
      solid: '',
      bordered: 'border-medium bg-transparent',
      shadow: '',
    },
    color: {
      default: {},
      primary: {},
      secondary: {},
      success: {},
      warning: {},
      danger: {},
    },
    size: {
      sm: 'text-small',
      md: 'text-medium',
      lg: 'text-large',
    },
    radius: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-medium',
      lg: 'rounded-large',
      full: 'rounded-full',
    },
  },
  compoundVariants: [
    {
      variant: 'solid',
      color: 'default',
      class: colorVariants.solid.default,
    },
    {
      variant: 'solid',
      color: 'primary',
      class: colorVariants.solid.primary,
    },
    {
      variant: 'solid',
      color: 'secondary',
      class: colorVariants.solid.secondary,
    },
    {
      variant: 'solid',
      color: 'success',
      class: colorVariants.solid.success,
    },
    {
      variant: 'solid',
      color: 'warning',
      class: colorVariants.solid.warning,
    },
    {
      variant: 'solid',
      color: 'danger',
      class: colorVariants.solid.danger,
    },
    {
      variant: 'shadow',
      color: 'default',
      class: colorVariants.shadow.default,
    },
    {
      variant: 'shadow',
      color: 'primary',
      class: colorVariants.shadow.primary,
    },
    {
      variant: 'shadow',
      color: 'secondary',
      class: colorVariants.shadow.secondary,
    },
    {
      variant: 'shadow',
      color: 'success',
      class: colorVariants.shadow.success,
    },
    {
      variant: 'shadow',
      color: 'warning',
      class: colorVariants.shadow.warning,
    },
    {
      variant: 'shadow',
      color: 'danger',
      class: colorVariants.shadow.danger,
    },
    // bordered / color
    {
      variant: 'bordered',
      color: 'default',
      class: colorVariants.bordered.default,
    },
    {
      variant: 'bordered',
      color: 'primary',
      class: colorVariants.bordered.primary,
    },
    {
      variant: 'bordered',
      color: 'secondary',
      class: colorVariants.bordered.secondary,
    },
    {
      variant: 'bordered',
      color: 'success',
      class: colorVariants.bordered.success,
    },
    {
      variant: 'bordered',
      color: 'warning',
      class: colorVariants.bordered.warning,
    },
    {
      variant: 'bordered',
      color: 'danger',
      class: colorVariants.bordered.danger,
    },
    // faded / color
    {
      variant: 'faded',
      color: 'default',
      class: colorVariants.faded.default,
    },
    {
      variant: 'faded',
      color: 'primary',
      class: colorVariants.faded.primary,
    },
    {
      variant: 'faded',
      color: 'secondary',
      class: colorVariants.faded.secondary,
    },
    {
      variant: 'faded',
      color: 'success',
      class: colorVariants.faded.success,
    },
    {
      variant: 'faded',
      color: 'warning',
      class: colorVariants.faded.warning,
    },
    {
      variant: 'faded',
      color: 'danger',
      class: colorVariants.faded.danger,
    },
    // flat / color
    {
      variant: 'flat',
      color: 'default',
      class: colorVariants.flat.default,
    },
    {
      variant: 'flat',
      color: 'primary',
      class: colorVariants.flat.primary,
    },
    {
      variant: 'flat',
      color: 'secondary',
      class: colorVariants.flat.secondary,
    },
    {
      variant: 'flat',
      color: 'success',
      class: colorVariants.flat.success,
    },
    {
      variant: 'flat',
      color: 'warning',
      class: colorVariants.flat.warning,
    },
    {
      variant: 'flat',
      color: 'danger',
      class: colorVariants.flat.danger,
    },
  ],
  defaultVariants: {
    color: 'default',
    variant: 'solid',
    size: 'lg',
    radius: 'sm',
  },
})
type CodeBlockVariantProps = VariantProps<typeof codeBlock>

export function useCodeBlock(originalProps: UserCodeBlockProps) {
  const [props, VariantProps] = mapPropsVariants(
    originalProps,
    codeBlock.variantKeys
  )

  const { as, children, className, ...otherProps } = props

  const Component = as || 'div'

  const classNames = useMemo(
    () =>
      codeBlock({
        ...VariantProps,
        className,
      }),
    [objectToDeps(VariantProps), className]
  )

  const getCodeBlockProps: PropGetter = () => {
    return {
      className: classNames,
      contentEditable: true,
      suppressContentEditableWarning: true,
      ...otherProps,
    }
  }

  return {
    Component,
    children,
    getCodeBlockProps,
  }
}

export type UseCodeBlockReturn = ReturnType<typeof useCodeBlock>
