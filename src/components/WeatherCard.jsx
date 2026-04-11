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
    <div className="mt-auto flex flex-col gap-6 lg:mt-0 lg:flex-1 lg:justify-end">
      <div className="flex flex-wrap items-end gap-4 sm:gap-6">
        <p className="text-7xl font-semibold leading-none tracking-tight text-slate-900 drop-shadow-sm dark:text-white sm:text-8xl lg:text-9xl">
          {formatTemperature(current.temp_c)}
        </p>
        <div className="flex min-w-0 flex-1 items-end justify-between gap-3 pb-1 sm:pb-2">
          <div className="min-w-0">
            <h1 className="truncate text-3xl font-semibold text-slate-900 drop-shadow sm:text-4xl dark:text-white">
              {location.name}
            </h1>
            <p className="mt-1 text-sm font-light text-slate-700 dark:text-white/80 sm:text-base">
              {formatLocalDateTime(location.localtime)}
            </p>
          </div>
          {iconUrl ? (
            <img
              src={iconUrl}
              alt=""
              className="h-20 w-20 shrink-0 object-contain drop-shadow sm:h-24 sm:w-24 lg:h-28 lg:w-28 dark:brightness-0 dark:invert"
              width={112}
              height={112}
            />
          ) : null}
        </div>
      </div>
      <p className="max-w-xl text-sm font-medium text-slate-800 dark:text-white/90 sm:text-base">
        {location.country ? `${location.country} · ` : ''}
        {current.condition?.text}
      </p>
    </div>
  )
}
