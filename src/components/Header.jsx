import { Moon, Sun } from 'lucide-react'

export default function Header({ dark, onToggleTheme }) {
  return (
    <header className="flex items-center justify-between gap-4">
      <a href="/" className="flex shrink-0 items-center" aria-label="WeatherNow home">
        <img src="/logo.svg" alt="WeatherNow" className="h-9 w-auto invert dark:invert-0" />
      </a>
      <button
        type="button"
        onClick={onToggleTheme}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300/80 bg-white/80 text-slate-900 shadow-sm backdrop-blur-md transition hover:bg-white dark:border-white/25 dark:bg-white/10 dark:text-white dark:shadow-none dark:hover:bg-white/15"
        aria-label={dark ? 'Activer le mode clair' : 'Activer le mode sombre'}
      >
        {dark ? <Sun className="h-5 w-5" strokeWidth={1.5} /> : <Moon className="h-5 w-5" strokeWidth={1.5} />}
      </button>
    </header>
  )
}
