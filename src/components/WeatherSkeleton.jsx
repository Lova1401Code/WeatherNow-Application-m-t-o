export default function WeatherSkeleton() {
  return (
    <div className="flex flex-col gap-2 animate-pulse">
      {/* Skeleton pour le titre Weather Details - correspond exactement à WeatherDetails */}
      <div className="h-3 w-32 bg-slate-200 dark:bg-slate-700 rounded mx-auto" />
      <div className="h-5 w-48 bg-slate-200 dark:bg-slate-700 rounded mx-auto" />

      {/* Skeleton pour les prévisions journalières (3 jours) - correspond exactement à WeatherDetails */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="min-w-[92px] flex-1 flex-col items-center rounded-2xl border border-slate-200/80 bg-white/40 px-2 py-2 text-center dark:border-white/10 dark:bg-white/5"
          >
            <div className="h-3 w-8 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="my-1 h-9 w-9 bg-slate-200 dark:bg-slate-700 rounded-full" />
            <div className="h-4 w-6 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="h-3 w-4 bg-slate-200 dark:bg-slate-700 rounded" />
          </div>
        ))}
      </div>

      {/* Skeleton pour les détails météo - correspond exactement aux Rows de WeatherDetails */}
      <div>
        {/* Temp max */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 py-3 dark:border-white/10">
          <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="flex items-center gap-2">
            <div className="h-4 w-12 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="h-5 w-5 bg-slate-200 dark:bg-slate-700 rounded" />
          </div>
        </div>
        {/* Temp min */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 py-3 dark:border-white/10">
          <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="flex items-center gap-2">
            <div className="h-4 w-12 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="h-5 w-5 bg-slate-200 dark:bg-slate-700 rounded" />
          </div>
        </div>
        {/* Feels like */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 py-3 dark:border-white/10">
          <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="flex items-center gap-2">
            <div className="h-4 w-12 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="h-5 w-5 bg-slate-200 dark:bg-slate-700 rounded" />
          </div>
        </div>
        {/* Humidity */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 py-3 dark:border-white/10">
          <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="flex items-center gap-2">
            <div className="h-4 w-8 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="h-5 w-5 bg-slate-200 dark:bg-slate-700 rounded" />
          </div>
        </div>
        {/* Cloudy */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 py-3 dark:border-white/10">
          <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="flex items-center gap-2">
            <div className="h-4 w-8 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="h-5 w-5 bg-slate-200 dark:bg-slate-700 rounded" />
          </div>
        </div>
        {/* Wind */}
        <div className="flex items-center justify-between gap-3 py-3">
          <div className="h-4 w-12 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="flex items-center gap-2">
            <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="h-5 w-5 bg-slate-200 dark:bg-slate-700 rounded" />
          </div>
        </div>
      </div>

      {/* Skeleton pour les prévisions horaires - correspond exactement à WeatherDetails */}
      <div>
        <div className="h-px w-full bg-slate-200 dark:bg-white/15" />
        <div className="h-3 w-48 bg-slate-200 dark:bg-slate-700 rounded mx-auto mt-3" />
        <div className="max-h-64 overflow-y-auto pr-1 mt-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center justify-between gap-3 py-2.5">
              <div className="h-4 w-14 bg-slate-200 dark:bg-slate-700 rounded" />
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <div className="h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded" />
                <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
              </div>
              <div className="h-4 w-12 bg-slate-200 dark:bg-slate-700 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
