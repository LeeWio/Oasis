import { debounce } from 'lodash-es'

/**
 * Creates a debounced version of the provided function.
 *
 * @param fn - The function to debounce.
 * @param wait - The number of milliseconds to delay.
 * @param immediate - If true, trigger the function on the leading edge instead of the trailing.
 * @returns A debounced version of the original function.
 */
export function createDebouncedFunction<T extends (...args: any[]) => any>(
  fn: T,
  wait: number,
  immediate = false
): (...args: Parameters<T>) => void {
  return debounce(fn, wait, { leading: immediate, trailing: true })
}
