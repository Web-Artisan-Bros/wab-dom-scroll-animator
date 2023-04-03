// Debounce timer
const _debounceTimers: Record<string, number> = {}

/**
 * Debounce function to avoid performance issues
 *
 * @param fn
 * @param delay
 * @param id
 */
export function debounce (fn: () => void, delay: number, id: string) {
  if (_debounceTimers[id]) {
    clearTimeout(_debounceTimers[id])
  }
  
  _debounceTimers[id] = setTimeout(() => {
    fn()
  }, delay)
}
