export default function Loading({ message = 'Loading weather...' }) {
  return (
    <div
      className="glass-surface mt-auto flex max-w-2xl flex-col gap-4 rounded-3xl p-4 lg:mt-0 lg:p-5"
      role="status"
      aria-live="polite"
    >
      <p className="text-sm font-medium tracking-wide text-slate-500 dark:text-white/60">{message}</p>

      <div className="flex flex-wrap items-end gap-4 sm:gap-6">
        <div className="h-14 w-16 rounded bg-slate-200 animate-pulse dark:bg-slate-700 sm:h-16 sm:w-20 lg:h-20 lg:w-24" />
        <div className="flex min-w-0 flex-1 items-end justify-between gap-3">
          <div className="min-w-0">
            <div className="h-8 w-28 rounded bg-slate-200 animate-pulse dark:bg-slate-700 sm:h-9 sm:w-36 lg:h-10 lg:w-40" />
            <div className="mt-1 h-3 w-32 rounded bg-slate-200 animate-pulse dark:bg-slate-700 sm:w-36" />
          </div>
          <div className="h-14 w-14 rounded-full bg-slate-200 animate-pulse dark:bg-slate-700 sm:h-16 sm:w-16 lg:h-20 lg:w-20" />
        </div>
      </div>

      <div className="h-3 w-44 rounded bg-slate-200 animate-pulse dark:bg-slate-700 sm:w-56 lg:w-72" />
    </div>
  )
}
