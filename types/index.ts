import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

/**
 * ResultResponse represents the structure of a standardized API response.
 */
export type ResultResponse<T = unknown> = {
  status: number;      // The status code of the response, e.g., 200 for success, 404 for not found, etc.
  data?: T;             // The actual data returned by the API (generic type T for flexibility)
  message: string;     // A message describing the result, such as 'Success' or error details
}
