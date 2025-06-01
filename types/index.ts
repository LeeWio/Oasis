import type { ReactNode } from "react";

import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

/**
 * ResultResponse represents the structure of a standardized API response.
 */
export type ResultResponse<T = unknown> = {
  status: number; // The status code of the response, e.g., 200 for success, 404 for not found, etc.
  data?: T; // The actual data returned by the API (generic type T for flexibility)
  message: string; // A message describing the result, such as 'Success' or error details
};

export type ToastProviderProps = {
  placement?:
    | "bottom-right"
    | "bottom-left"
    | "bottom-center"
    | "top-right"
    | "top-left"
    | "top-center";
  maxVisibleToasts?: number;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  toastOffset?: number;
  title?: ReactNode;
  icon?: ReactNode;
  description?: ReactNode;
  variant?: "solid" | "bordered" | "flat";
  endContent?: ReactNode;
  closeIcon?: ReactNode;
  timeout?: number;
  loadingIcon?: ReactNode;
  hideIcon?: boolean;
  hideCloseButton?: boolean;
  shouldShowTimeoutProgress?: boolean;
  severity?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
};
