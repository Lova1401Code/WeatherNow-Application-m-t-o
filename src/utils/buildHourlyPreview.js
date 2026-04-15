/** @param {any} payload */
export function buildHourlyPreview(payload) {
  const hours = payload?.forecast?.forecastday?.[0]?.hour
  if (!hours?.length) return []

  const local = payload?.location?.localtime
  const base = local ? new Date(String(local).replace(' ', 'T')) : new Date()
  if (Number.isNaN(base.getTime())) return []

  const cutoff = base.getTime() - 30 * 60 * 1000

  return hours
    .filter((h) => typeof h.time_epoch === 'number' && h.time_epoch * 1000 >= cutoff)
    .slice(0, 8)
    .map((h) => ({
      time: new Date(h.time_epoch * 1000).toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
      icon: h.condition?.icon,
      code: h.condition?.code,
      isDay: Number(h.is_day) === 1,
      text: h.condition?.text,
      temp: h.temp_c,
    }))
}
