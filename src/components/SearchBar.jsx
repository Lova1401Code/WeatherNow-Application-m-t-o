import { useCallback, useState } from 'react'
import { MapPin, Search } from 'lucide-react'

export default function SearchBar({
  onSearch,
  onUseLocation,
  disabled,
  placeholder = 'Search Location...',
}) {
  const [value, setValue] = useState('')

  const submit = useCallback(() => {
    onSearch(value)
  }, [onSearch, value])

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        submit()
      }
    },
    [submit],
  )

  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-end sm:justify-end sm:gap-4">
      <div className="relative flex min-w-0 flex-1 items-center border-b border-slate-400/70 pb-1 dark:border-white/40">
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full bg-transparent py-1 pr-10 text-sm text-slate-800 placeholder:text-slate-500 outline-none ring-0 dark:text-white dark:placeholder:text-white/50 lg:text-base"
          aria-label="Rechercher une ville"
        />
        <button
          type="button"
          onClick={submit}
          disabled={disabled}
          className="absolute right-0 top-1/2 -translate-y-1/2 rounded p-1 text-slate-700 transition hover:text-slate-900 disabled:opacity-40 dark:text-white/90 dark:hover:text-white"
          aria-label="Lancer la recherche"
        >
          <Search className="h-5 w-5" strokeWidth={1.75} />
        </button>
      </div>
      {onUseLocation ? (
        <button
          type="button"
          onClick={onUseLocation}
          disabled={disabled}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/70 px-3 py-2 text-xs font-medium text-slate-800 shadow-sm backdrop-blur-sm transition hover:bg-white disabled:opacity-40 dark:border-white/30 dark:bg-white/5 dark:text-white/95 dark:shadow-none dark:hover:bg-white/10 sm:text-sm"
        >
          <MapPin className="h-4 w-4" strokeWidth={1.75} />
          Use my location
        </button>
      ) : null}
    </div>
  )
}
