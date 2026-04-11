import {
  Cloud,
  CloudRain,
  Droplets,
  Thermometer,
  ThermometerSun,
  Wind,
} from 'lucide-react'
import { formatTemperature } from '../utils/formatTemperature'

function Row({ label, value, icon: Icon, iconClass }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-200 py-3 last:border-0 dark:border-white/10">
      <span className="text-sm font-medium text-slate-600 dark:text-white/70">{label}</span>
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
        <span>{value}</span>
        {Icon ? <Icon className={`h-5 w-5 shrink-0 ${iconClass || ''}`} strokeWidth={1.5} /> : null}
      </div>
    </div>
  )
}

function HourRow({ time, iconUrl, text, temp }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5 text-sm text-slate-800 dark:text-white/90">
      <span className="w-14 shrink-0 font-medium tabular-nums">{time}</span>
      <div className="flex min-w-0 flex-1 items-center gap-2">
        {iconUrl ? (
          <img src={iconUrl} alt="" className="h-8 w-8 object-contain dark:brightness-0 dark:invert" />
        ) : (
          <CloudRain className="h-6 w-6 shrink-0 text-slate-500 dark:text-white/80" strokeWidth={1.25} />
        )}
        <span className="truncate text-slate-600 dark:text-white/75">{text}</span>
      </div>
      <span className="shrink-0 font-semibold tabular-nums">{temp}</span>
    </div>
  )
}

function formatShortDay(dateStr) {
  if (!dateStr) return ''
  const d = new Date(`${dateStr}T12:00:00`)
  if (Number.isNaN(d.getTime())) return String(dateStr)
  return d.toLocaleDateString(undefined, { weekday: 'short' })
}

export default function WeatherDetails({ current, forecastday, hoursPreview }) {
  if (!current) return null

  const today = forecastday?.[0]?.day
  const conditionText = String(current.condition?.text || '—').toUpperCase()

  const iconFor = (path) =>
    path ? String(path).replace(/^\/\//, 'https://') : null

  const days = Array.isArray(forecastday) ? forecastday.slice(0, 3) : []

  return (
    <div className="flex flex-col gap-2">
      <p className="text-center text-xs font-medium tracking-wide text-slate-500 dark:text-white/55">
        Weather Details...
      </p>
      <p className="text-center text-sm font-semibold leading-snug text-slate-900 dark:text-white sm:text-base">
        {conditionText}
      </p>

      {days.length ? (
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
          {days.map((fd) => {
            const ic = iconFor(fd.day?.condition?.icon)
            return (
              <div
                key={fd.date}
                className="flex min-w-[92px] flex-1 flex-col items-center rounded-2xl border border-slate-200/80 bg-white/40 px-2 py-2 text-center dark:border-white/10 dark:bg-white/5"
              >
                <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-white/55">
                  {formatShortDay(fd.date)}
                </span>
                {ic ? (
                  <img src={ic} alt="" className="my-1 h-9 w-9 object-contain dark:brightness-0 dark:invert" />
                ) : null}
                <span className="text-sm font-semibold text-slate-900 dark:text-white">
                  {fd.day?.maxtemp_c != null ? `${Math.round(fd.day.maxtemp_c)}°` : '—'}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-white/55">
                  {fd.day?.mintemp_c != null ? `${Math.round(fd.day.mintemp_c)}°` : ''}
                </span>
              </div>
            )
          })}
        </div>
      ) : null}

      <div className="mt-2">
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
      </div>

      {hoursPreview?.length ? (
        <>
          <div className="my-3 h-px w-full bg-slate-200 dark:bg-white/15" />
          <p className="text-center text-xs font-medium tracking-wide text-slate-500 dark:text-white/55">
            Today&apos;s Weather Forecast...
          </p>
          <div className="max-h-64 overflow-y-auto pr-1">
            {hoursPreview.map((h) => (
              <HourRow
                key={h.time}
                time={h.time}
                iconUrl={iconFor(h.icon)}
                text={h.text}
                temp={formatTemperature(h.temp)}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}
