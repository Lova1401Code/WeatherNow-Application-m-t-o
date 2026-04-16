import {
  Cloud,
  CloudFog,
  CloudRain,
  CloudSnow,
  Droplets,
  MoonStar,
  Sun,
  Thermometer,
  ThermometerSun,
  Wind,
} from 'lucide-react'
import { formatTemperature } from '../utils/formatTemperature'

function Row({ label, value, icon: Icon, iconClass }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/15 py-3 last:border-0">
      <span className="text-sm font-medium text-white/85">{label}</span>
      <div className="flex items-center gap-2 text-sm font-semibold text-white">
        <span>{value}</span>
        {Icon ? <Icon className={`h-5 w-5 shrink-0 ${iconClass || ''}`} strokeWidth={1.5} /> : null}
      </div>
    </div>
  )
}

function resolveHourIcon(code, isDay) {
  const c = Number(code)
  if (c === 1000) return isDay ? Sun : MoonStar
  if ([1030, 1135, 1147].includes(c)) return CloudFog
  if ([1066, 1069, 1072, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225].includes(c))
    return CloudSnow
  if ([1087, 1273, 1276, 1279, 1282].includes(c) || (c >= 1273 && c <= 1282)) return CloudRain
  if ([1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246].includes(c))
    return CloudRain
  return Cloud
}

function HourRow({ time, code, isDay, text, temp }) {
  const Icon = resolveHourIcon(code, isDay)
  return (
    <div className="grid grid-cols-[52px_minmax(0,1fr)_50px] items-center gap-2 rounded-xl px-2 py-2.5 text-xs text-white sm:grid-cols-[58px_minmax(0,1fr)_56px] sm:gap-3 sm:text-sm">
      <span className="shrink-0 font-medium tabular-nums">{time}</span>
      <div className="flex min-w-0 items-center gap-2">
        <Icon className="h-5 w-5 shrink-0 text-sky-300 sm:h-6 sm:w-6" strokeWidth={1.75} />
        <span className="truncate text-white/90">{text}</span>
      </div>
      <span className="shrink-0 font-semibold tabular-nums">{temp}</span>
    </div>
  )
}

export default function WeatherDetails({ current, forecastday, hoursPreview }) {
  if (!current) return null

  const today = forecastday?.[0]?.day
  const conditionText = String(current.condition?.text || '—').toUpperCase()
  const upcomingDays = Array.isArray(forecastday) ? forecastday.slice(1, 3) : []
  const iconFor = (path) => (path ? String(path).replace(/^\/\//, 'https://') : null)
  const formatShortDay = (dateStr) => {
    if (!dateStr) return ''
    const d = new Date(`${dateStr}T12:00:00`)
    if (Number.isNaN(d.getTime())) return String(dateStr)
    return d.toLocaleDateString(undefined, { weekday: 'short' })
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-center text-2xl font-medium tracking-wide text-white/95">
        Weather Details...
      </p>
      <p className="text-center text-2xl font-semibold leading-snug text-white">
        {conditionText}
      </p>

      {upcomingDays.length ? (
        <div className="premium-scroll mt-1 flex gap-2 overflow-x-auto pb-1">
          {upcomingDays.map((fd) => (
            <div
              key={fd.date}
              className="flex min-w-[110px] flex-1 flex-col items-center rounded-2xl border border-white/25 bg-black/20 px-2 py-2 text-center backdrop-blur-sm"
            >
              <span className="text-[11px] font-semibold uppercase tracking-wide text-white/75">
                {formatShortDay(fd.date)}
              </span>
              {iconFor(fd.day?.condition?.icon) ? (
                <img
                  src={iconFor(fd.day?.condition?.icon)}
                  alt=""
                  className="my-1 h-9 w-9 object-contain"
                />
              ) : null}
              <span className="text-sm font-semibold text-white">
                {fd.day?.maxtemp_c != null ? `${Math.round(fd.day.maxtemp_c)}°` : '—'}
              </span>
              <span className="text-[11px] text-white/70">
                {fd.day?.mintemp_c != null ? `${Math.round(fd.day.mintemp_c)}°` : ''}
              </span>
            </div>
          ))}
        </div>
      ) : null}

      <div className="mt-1 rounded-2xl border border-white/18 bg-transparent px-3 py-1 backdrop-blur-sm">
        <Row
          label="Temp max"
          value={formatTemperature(today?.maxtemp_c)}
          icon={ThermometerSun}
          iconClass="text-red-400"
        />
        <Row
          label="Temp min"
          value={formatTemperature(today?.mintemp_c)}
          icon={Thermometer}
          iconClass="text-sky-300"
        />
        <Row
          label="Feels like"
          value={formatTemperature(current.feelslike_c)}
          icon={Thermometer}
          iconClass="text-white/80"
        />
        <Row label="Humidity" value={`${current.humidity ?? '—'}%`} icon={Droplets} />
        <Row label="Cloudy" value={`${current.cloud ?? '—'}%`} icon={Cloud} />
        <Row label="Wind" value={`${Math.round(current.wind_kph ?? 0)} km/h`} icon={Wind} />

        {hoursPreview?.length ? (
          <>
            <div className="my-3 h-px w-full bg-white/20" />
            <p className="pb-2 text-center text-2xl font-medium tracking-wide text-white/85">
              Today&apos;s Weather Forecast...
            </p>
            <div className="premium-scroll max-h-64 overflow-y-scroll rounded-xl bg-transparent pr-2">
              {hoursPreview.map((h) => (
                <HourRow
                  key={h.time}
                  time={h.time}
                  code={h.code}
                  isDay={h.isDay}
                  text={h.text}
                  temp={formatTemperature(h.temp)}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}
