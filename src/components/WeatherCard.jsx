import { formatTemperature } from '../utils/formatTemperature'

function formatLocalDateTime(isoLike) {
  if (!isoLike) return ''
  const d = new Date(String(isoLike).replace(' ', 'T'))
  if (Number.isNaN(d.getTime())) return String(isoLike)
  const time = d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false })
  const weekday = d.toLocaleDateString(undefined, { weekday: 'long' })
  const day = d.getDate()
  const month = d.toLocaleDateString(undefined, { month: 'short' })
  const year = d.getFullYear().toString().slice(-2)
  return `${time} - ${weekday}, ${day} ${month} '${year}`
}

export default function WeatherCard({ location, current }) {
  if (!location || !current) return null

  const iconUrl = current.condition?.icon
    ? String(current.condition.icon).replace(/^\/\//, 'https://')
    : null

  return (
    <div className="glass-surface mt-auto flex max-w-2xl flex-col gap-4 rounded-3xl p-4 lg:mt-0 lg:p-5">
      <div className="flex flex-wrap items-end gap-4 sm:gap-6">
        <p className="text-6xl font-semibold leading-none tracking-tight text-slate-900 drop-shadow-sm dark:text-white sm:text-7xl lg:text-8xl">
          {formatTemperature(current.temp_c)}
        </p>
        <div className="flex min-w-0 flex-1 items-end justify-between gap-3">
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-semibold text-slate-900 drop-shadow sm:text-3xl dark:text-white">
              {location.name}
            </h1>
            <p className="mt-1 text-xs font-light text-slate-700 dark:text-white/80 sm:text-sm">
              {formatLocalDateTime(location.localtime)}
            </p>
          </div>
          {iconUrl ? (
            <img
              src={iconUrl}
              alt=""
              className="h-14 w-14 shrink-0 object-contain drop-shadow sm:h-16 sm:w-16 lg:h-20 lg:w-20 dark:brightness-0 dark:invert"
              width={80}
              height={80}
            />
          ) : null}
        </div>
      </div>
      <p className="max-w-xl text-xs font-medium text-slate-800 dark:text-white/90 sm:text-sm">
        {location.country ? `${location.country} · ` : ''}
        {current.condition?.text}
      </p>
    </div>
  )
}
