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
    <div className="mt-auto flex max-w-2xl flex-col gap-2 pb-2">
      <div className="flex flex-wrap items-end gap-3 sm:gap-4">
        <p className="text-7xl font-semibold leading-none tracking-tight text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.45)] sm:text-8xl lg:text-9xl">
          {formatTemperature(current.temp_c)}
        </p>
        <div className="flex min-w-0 flex-1 items-end justify-between gap-3">
          <div className="min-w-0">
            <h1 className="truncate text-4xl font-semibold text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.45)] sm:text-5xl">
              {location.name}
            </h1>
            <p className="mt-1 text-sm font-medium text-white/95 sm:text-xl">
              {formatLocalDateTime(location.localtime)}
            </p>
          </div>
          {iconUrl ? (
            <img
              src={iconUrl}
              alt=""
              className="h-14 w-14 shrink-0 object-contain drop-shadow-[0_8px_22px_rgba(0,0,0,0.45)] sm:h-16 sm:w-16 lg:h-20 lg:w-20"
              width={80}
              height={80}
            />
          ) : null}
        </div>
      </div>
      <p className="max-w-xl text-sm font-medium text-white/90 sm:text-base">
        {location.country ? `${location.country} · ` : ''}
        {current.condition?.text}
      </p>
    </div>
  )
}
