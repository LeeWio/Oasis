import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import React, { cloneElement, isValidElement, useMemo } from "react";
import { Button, type ButtonProps } from "@nextui-org/button";
import { isEmpty } from "@nextui-org/shared-utils";
import {
  CloseIcon,
  DangerIcon,
  InfoCircleIcon,
  SuccessIcon,
  WarningIcon,
} from "@nextui-org/shared-icons";
import { useAlert } from "@nextui-org/alert";

const iconMap = {
  primary: InfoCircleIcon,
  secondary: InfoCircleIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  danger: DangerIcon,
} as const;

export const AlertView: React.FC<NodeViewProps> = ({ node, editor }) => {
  const { color, radius, variant, title } = node.attrs;

  const isReadOnly = !editor.isEditable;
  const props = useMemo(
    () => ({
      title,
      description: "",
      color,
      radius,
      variant,
      isReadOnly,
    }),
    [color, radius, variant, isReadOnly],
  );
  const {
    icon,
    children,
    endContent,
    startContent,
    isClosable,
    domRef,
    description,
    handleClose,
    getBaseProps,
    getMainWrapperProps,
    getDescriptionProps,
    getTitleProps,
    getCloseButtonProps,
    isVisible,
    onClose,
    getAlertIconProps,
    getIconWrapperProps,
  } = useAlert(props);

  if (!isVisible) return null;

  const customIcon =
    icon && isValidElement(icon)
      ? cloneElement(icon, getAlertIconProps())
      : null;
  // @ts-ignore
  const IconComponent = iconMap[color] || iconMap.primary;

  return (
    <NodeViewWrapper>
      <div ref={domRef} role="alert" {...getBaseProps()}>
        {startContent}
        <div {...getIconWrapperProps()}>
          {customIcon || <IconComponent {...getAlertIconProps()} />}
        </div>
        <div {...getMainWrapperProps()}>
          <NodeViewContent {...getTitleProps()} />
          {!isEmpty(description) && (
            <div {...getDescriptionProps()}>{description}</div>
          )}
          {children}
        </div>
        {endContent}
        {(isClosable || onClose) && (
          <Button
            isIconOnly
            aria-label="Close"
            radius="full"
            variant="light"
            onClick={handleClose}
            {...(getCloseButtonProps() as ButtonProps)}
          >
            <CloseIcon height={20} width={20} />
          </Button>
        )}
      </div>
    </NodeViewWrapper>
  );
};
