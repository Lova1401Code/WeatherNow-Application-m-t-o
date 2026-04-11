export default function Loading({ message = 'Loading weather...' }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 py-16 text-slate-700 dark:text-white/90"
      role="status"
      aria-live="polite"
    >
      <span
        className="h-10 w-10 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700 dark:border-white/30 dark:border-t-white"
        aria-hidden
      />
      <p className="text-sm font-medium tracking-wide">{message}</p>
    </div>
  )
}
