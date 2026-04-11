/**
 * @param {number | null | undefined} value
 * @param {object} [opts]
 * @param {boolean} [opts.withUnit]
 */
export function formatTemperature(value, { withUnit = true } = {}) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return '—'
  }
  const n = Math.round(Number(value))
  return withUnit ? `${n}°` : String(n)
}
