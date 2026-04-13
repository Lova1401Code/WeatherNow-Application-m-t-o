export default function Loading({ message = 'Loading weather...' }) {
  return (
    <div className="mt-auto flex flex-col gap-6 lg:mt-0 lg:flex-1 lg:justify-end" role="status" aria-live="polite">
      {/* Message de chargement - placé en haut pour ne pas décaler le contenu */}
      <p className="text-sm font-medium tracking-wide text-slate-500 dark:text-white/60">{message}</p>
      
      {/* Skeleton pour la température - correspond exactement à WeatherCard */}
      <div className="flex flex-wrap items-end gap-4 sm:gap-6">
        <div className="h-16 w-20 sm:h-20 sm:w-24 lg:h-24 lg:w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        <div className="flex min-w-0 flex-1 items-end justify-between gap-3 pb-1 sm:pb-2">
          <div className="min-w-0">
            <div className="h-10 w-32 sm:h-12 sm:w-40 lg:h-14 lg:w-48 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            <div className="mt-1 h-4 w-28 sm:h-5 sm:w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          </div>
          <div className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
        </div>
      </div>
      
      {/* Skeleton pour la description météo - correspond exactement à WeatherCard */}
      <div className="h-4 w-48 sm:w-64 lg:w-80 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
    </div>
  )
}
