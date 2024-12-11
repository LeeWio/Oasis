import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import React, { useMemo } from "react";
import { useInput } from "@nextui-org/input";
import { CloseFilledIcon } from "@nextui-org/shared-icons";

export const CalloutView: React.FC<NodeViewProps> = ({ node, editor }) => {
  const { color, size, radius, variant } = node.attrs;
  const isReadOnly = !editor.isEditable;
  const props = useMemo(
    () => ({
      color,
      size,
      radius,
      variant,
      isReadOnly,
    }),
    [color, size, radius, variant, isReadOnly],
  );
  const {
    Component,
    label,
    description,
    isClearable,
    startContent,
    endContent,
    labelPlacement,
    hasHelper,
    isOutsideLeft,
    shouldLabelBeOutside,
    errorMessage,
    isInvalid,
    getBaseProps,
    getLabelProps,
    getInputProps,
    getInnerWrapperProps,
    getInputWrapperProps,
    getMainWrapperProps,
    getHelperWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
    getClearButtonProps,
  } = useInput(props);

  const labelContent = label ? (
    <label {...getLabelProps()}>{label}</label>
  ) : null;
  const end = useMemo(() => {
    if (isClearable) {
      return (
        <button {...getClearButtonProps()}>
          {endContent || <CloseFilledIcon />}
        </button>
      );
    }

    return endContent;
  }, [isClearable, getClearButtonProps]);

  const helperWrapper = useMemo(() => {
    const shouldShowError = isInvalid && errorMessage;
    const hasContent = shouldShowError || description;

    if (!hasHelper || !hasContent) return null;

    return (
      <div {...getHelperWrapperProps()}>
        {shouldShowError ? (
          <div {...getErrorMessageProps()}>{errorMessage}</div>
        ) : (
          <div {...getDescriptionProps()}>{description}</div>
        )}
      </div>
    );
  }, [
    hasHelper,
    isInvalid,
    errorMessage,
    description,
    getHelperWrapperProps,
    getErrorMessageProps,
    getDescriptionProps,
  ]);

  const innerWrapper = useMemo(() => {
    return (
      <div {...getInnerWrapperProps()}>
        {startContent}
        <NodeViewContent {...getInputProps()} />
        {end}
      </div>
    );
  }, [startContent, end, getInputProps, getInnerWrapperProps]);

  const mainWrapper = useMemo(() => {
    if (shouldLabelBeOutside) {
      return (
        <div {...getMainWrapperProps()}>
          <div {...getInputWrapperProps()}>
            {!isOutsideLeft ? labelContent : null}
            {innerWrapper}
          </div>
          {helperWrapper}
        </div>
      );
    }

    return (
      <>
        <div {...getInputWrapperProps()}>
          {labelContent}
          {innerWrapper}
        </div>
        {helperWrapper}
      </>
    );
  }, [
    labelPlacement,
    helperWrapper,
    shouldLabelBeOutside,
    labelContent,
    innerWrapper,
    errorMessage,
    description,
    getMainWrapperProps,
    getInputWrapperProps,
    getErrorMessageProps,
    getDescriptionProps,
  ]);

  return (
    <NodeViewWrapper>
      <Component {...getBaseProps()}>
        {isOutsideLeft ? labelContent : null}
        {mainWrapper}
      </Component>
    </NodeViewWrapper>
  );
};
