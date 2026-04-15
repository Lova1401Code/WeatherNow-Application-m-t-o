export default function WeatherSkeleton() {
  return (
    <div className="flex flex-col gap-2 animate-pulse">
      <div className="mx-auto h-3 w-32 rounded bg-slate-200 dark:bg-slate-700" />
      <div className="mx-auto h-5 w-48 rounded bg-slate-200 dark:bg-slate-700" />

      <div className="premium-scroll flex gap-2 overflow-x-auto pb-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="min-w-[92px] flex-1 flex-col items-center rounded-2xl border border-slate-200/80 bg-white/40 px-2 py-2 text-center dark:border-white/10 dark:bg-white/5"
          >
            <div className="h-3 w-8 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="my-1 h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-700" />
            <div className="h-4 w-6 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-3 w-4 rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        ))}
      </div>

      <div className="glass-surface mt-2 rounded-2xl px-3">
        <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 py-3 dark:border-white/10">
          <div className="h-4 w-20 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="flex items-center gap-2">
            <div className="h-4 w-12 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-5 w-5 rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 py-3 dark:border-white/10">
          <div className="h-4 w-20 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="flex items-center gap-2">
            <div className="h-4 w-12 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-5 w-5 rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 py-3 dark:border-white/10">
          <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="flex items-center gap-2">
            <div className="h-4 w-12 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-5 w-5 rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 py-3 dark:border-white/10">
          <div className="h-4 w-16 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="flex items-center gap-2">
            <div className="h-4 w-8 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-5 w-5 rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 py-3 dark:border-white/10">
          <div className="h-4 w-16 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="flex items-center gap-2">
            <div className="h-4 w-8 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-5 w-5 rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 py-3">
          <div className="h-4 w-12 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="flex items-center gap-2">
            <div className="h-4 w-16 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-5 w-5 rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
      </div>

      <div>
        <div className="h-px w-full bg-slate-200 dark:bg-white/15" />
        <div className="mx-auto mt-3 h-3 w-48 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="glass-surface premium-scroll mt-3 max-h-64 overflow-y-auto rounded-2xl p-2 pr-1">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center justify-between gap-3 rounded-xl px-2 py-2.5">
              <div className="h-4 w-14 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <div className="h-8 w-8 rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-700" />
              </div>
              <div className="h-4 w-12 rounded bg-slate-200 dark:bg-slate-700" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
