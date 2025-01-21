import { useMemo } from "react";
import { useCallout, UseCalloutProps } from "./use-callout";
import { forwardRef } from "@heroui/system";

export interface CalloutProps extends UseCalloutProps {}

const Callout = forwardRef<"div", CalloutProps>((props, ref) => {
  const { Component, children, getCalloutProps, startContent } = useCallout({
    ...props,
  });

  return (
    <Component ref={ref} {...getCalloutProps()}>
      <div className="cursor-pointer">{startContent}</div>
      {children}
    </Component>
  );
});

Callout.displayName = "Callout";

export default Callout;
