import type { CalloutVariantProps } from "@/core/theme/src";
import type { ReactNode } from "react";

import { TooltipProps } from "@nextui-org/tooltip";
import { callout } from "@/core/theme/src";
import { ReactRef } from "@nextui-org/react-utils";
import {
  HTMLNextUIProps,
  mapPropsVariants,
  PropGetter,
  useProviderContext,
} from "@nextui-org/system";
import { SlotsToClasses } from "@nextui-org/theme";
import { ButtonProps } from "@nextui-org/button";
import { useDOMRef, filterDOMProps } from "@nextui-org/react-utils";
import { useMemo, useCallback, ReactElement } from "react";
import { useClipboard } from "@nextui-org/use-clipboard";
import { useFocusRing } from "@react-aria/focus";
import { clsx, dataAttr, objectToDeps } from "@nextui-org/shared-utils";
import { isValidElement, cloneElement } from "react";
import { start } from "repl";

// export interface UseCalloutProps
//   extends Omit<HTMLNextUIProps, "onCopy">,
//     CalloutVariantProps {
//   /**
//    * Ref to the DOM node.
//    */
//   ref?: ReactRef<HTMLDivElement | null>;
//
//   /**
//    * The content of the callout
//    */
//   children?: React.ReactNode | string;
//
//   /**
//    * The button start content.
//    */
//   startContent?: ReactNode;
// }

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
