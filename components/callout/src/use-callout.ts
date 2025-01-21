import type { CalloutVariantProps } from "@/core/theme/src";
import type { ReactNode } from "react";

import { callout } from "@/core/theme/src";
import { ReactRef } from "@heroui/react-utils";
import { clsx, objectToDeps } from "@heroui/shared-utils";
import {
  HTMLNextUIProps,
  mapPropsVariants,
  PropGetter,
} from "@heroui/system";

import { cloneElement, isValidElement, useMemo } from "react";

export interface UseCalloutProps
  extends HTMLNextUIProps<"div">,
    CalloutVariantProps {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLDivElement | null>;

  /**
   * Element to be rendered in the left side of callout
   */
  startContent?: ReactNode;
}

export function useCallout(originalProps: UseCalloutProps) {
  const [props, VariantProps] = mapPropsVariants(
    originalProps,
    callout.variantKeys,
  );

  const { as, children, className, startContent, ...otherProps } = props;

  const Component = as || "div";

  const hasStartContent = useMemo(() => !!startContent, [startContent]);

  const classNames = useMemo(
    () =>
      callout({
        ...VariantProps,
        className,
      }),
    [objectToDeps(VariantProps), className],
  );

  const getContentClone = (content: ReactNode) =>
    isValidElement(content)
      ? cloneElement(content, {
          // @ts-ignore
          className: clsx("max-h-[80%]", content.props.className),
        })
      : null;

  const getCalloutProps: PropGetter = () => {
    return {
      className: classNames,
      ...otherProps,
    };
  };

  return {
    Component,
    children,
    getCalloutProps,
    startContent: getContentClone(startContent),
  };
}

export type UseCalloutReturn = ReturnType<typeof useCallout>;
