import { Moon, Sun } from 'lucide-react'

export default function Header({ dark, onToggleTheme }) {
  return (
    <header className="flex items-center justify-between gap-4">
      <a href="/" className="flex shrink-0 items-center" aria-label="WeatherNow home">
        <img src="/logo.svg" alt="WeatherNow" className="h-9 w-auto" />
      </a>
      <button
        type="button"
        onClick={onToggleTheme}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/45 bg-black/20 text-white backdrop-blur-md transition hover:bg-black/35"
        aria-label={dark ? 'Activer le mode clair' : 'Activer le mode sombre'}
      >
        {dark ? <Sun className="h-5 w-5" strokeWidth={1.5} /> : <Moon className="h-5 w-5" strokeWidth={1.5} />}
      </button>
    </header>
  )
}
