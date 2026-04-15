export default function WeatherSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="mx-auto h-3 w-32 animate-pulse rounded bg-slate-200 dark:bg-white/20" />
      <div className="mx-auto h-5 w-48 animate-pulse rounded bg-slate-200 dark:bg-white/25" />

      <div className="premium-scroll flex gap-2 overflow-x-auto pb-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex min-w-[92px] flex-1 flex-col items-center rounded-2xl border border-white/15 bg-slate-900/70 px-2 py-2 text-center"
          >
            <div className="h-3 w-8 animate-pulse rounded bg-slate-200 dark:bg-white/20" />
            <div className="my-1 h-9 w-9 animate-pulse rounded-full bg-slate-200 dark:bg-white/25" />
            <div className="h-4 w-6 animate-pulse rounded bg-slate-200 dark:bg-white/30" />
            <div className="h-3 w-4 animate-pulse rounded bg-slate-200 dark:bg-white/20" />
          </div>
        ))}
      </div>

      <div className="mt-2 rounded-2xl border border-white/15 bg-slate-900/88 px-3 py-1 shadow-[0_16px_36px_rgba(2,6,23,0.35)]">
        <div className="flex items-center justify-between gap-3 border-b border-white/15 py-3">
          <div className="h-4 w-20 animate-pulse rounded bg-slate-200 dark:bg-white/20" />
          <div className="flex items-center gap-2">
            <div className="h-4 w-12 animate-pulse rounded bg-slate-200 dark:bg-white/30" />
            <div className="h-5 w-5 animate-pulse rounded bg-slate-200 dark:bg-white/20" />
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 border-b border-white/15 py-3">
          <div className="h-4 w-20 animate-pulse rounded bg-slate-200 dark:bg-white/20" />
          <div className="flex items-center gap-2">
            <div className="h-4 w-12 animate-pulse rounded bg-slate-200 dark:bg-white/30" />
            <div className="h-5 w-5 animate-pulse rounded bg-slate-200 dark:bg-white/20" />
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 border-b border-white/15 py-3">
          <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-white/20" />
          <div className="flex items-center gap-2">
            <div className="h-4 w-12 animate-pulse rounded bg-slate-200 dark:bg-white/30" />
            <div className="h-5 w-5 animate-pulse rounded bg-slate-200 dark:bg-white/20" />
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 border-b border-white/15 py-3">
          <div className="h-4 w-16 animate-pulse rounded bg-slate-200 dark:bg-white/20" />
          <div className="flex items-center gap-2">
            <div className="h-4 w-8 animate-pulse rounded bg-slate-200 dark:bg-white/30" />
            <div className="h-5 w-5 animate-pulse rounded bg-slate-200 dark:bg-white/20" />
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 border-b border-white/15 py-3">
          <div className="h-4 w-16 animate-pulse rounded bg-slate-200 dark:bg-white/20" />
          <div className="flex items-center gap-2">
            <div className="h-4 w-8 animate-pulse rounded bg-slate-200 dark:bg-white/30" />
            <div className="h-5 w-5 animate-pulse rounded bg-slate-200 dark:bg-white/20" />
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 py-3">
          <div className="h-4 w-12 animate-pulse rounded bg-slate-200 dark:bg-white/20" />
          <div className="flex items-center gap-2">
            <div className="h-4 w-16 animate-pulse rounded bg-slate-200 dark:bg-white/30" />
            <div className="h-5 w-5 animate-pulse rounded bg-slate-200 dark:bg-white/20" />
          </div>
        </div>

        <div className="my-3 h-px w-full bg-white/20" />
        <div className="mx-auto mt-3 h-3 w-48 animate-pulse rounded bg-slate-200 dark:bg-white/20" />
        <div className="premium-scroll mt-3 max-h-64 overflow-y-auto rounded-xl bg-slate-950/60 p-1 pr-2">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-[52px_minmax(0,1fr)_50px] items-center gap-2 rounded-xl px-2 py-2.5 sm:grid-cols-[58px_minmax(0,1fr)_56px] sm:gap-3"
            >
              <div className="h-4 w-12 animate-pulse rounded bg-slate-200 dark:bg-white/25" />
              <div className="flex min-w-0 items-center gap-2">
                <div className="h-6 w-6 animate-pulse rounded-full bg-slate-200 dark:bg-white/20" />
                <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-white/25" />
              </div>
              <div className="h-4 w-10 animate-pulse rounded bg-slate-200 dark:bg-white/30" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
