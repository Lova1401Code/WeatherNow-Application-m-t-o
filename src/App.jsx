import { useCallback, useEffect, useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import SearchBar from './components/SearchBar.jsx'
import WeatherCard from './components/WeatherCard.jsx'
import WeatherDetails from './components/WeatherDetails.jsx'
import Loading from './components/Loading.jsx'
import WeatherSkeleton from './components/WeatherSkeleton.jsx'
import Footer from './components/Footer.jsx'
import HeroBackdrop from './components/HeroBackdrop.jsx'
import { useWeather } from './hooks/useWeather.js'
import { buildHourlyPreview } from './utils/buildHourlyPreview.js'
import { getHeroBackdropMeta, getHeroOverlayStyle } from './utils/weatherTheme.js'
import { loadRecentSearches, saveRecentSearch, removeRecentSearch, clearRecentSearches } from './utils/recentSearches.js'

const THEME_KEY = 'weathernow_theme'

function readInitialDark() {
  if (typeof window === 'undefined') return true
  const stored = localStorage.getItem(THEME_KEY)
  if (stored === 'light') return false
  if (stored === 'dark') return true
  return true
}

export default function App() {
  const { data, loading, error, notFound, fetchWeather } = useWeather()
  const [dark, setDark] = useState(readInitialDark)
  const [geoMessage, setGeoMessage] = useState(null)
  const [recents, setRecents] = useState(() => loadRecentSearches())

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem(THEME_KEY, 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem(THEME_KEY, 'light')
    }
  }, [dark])

  useEffect(() => {
    if (data?.location?.name) {
      const label = data.location.region
        ? `${data.location.name}, ${data.location.country}`
        : `${data.location.name}, ${data.location.country}`
      saveRecentSearch(label)
      setRecents(loadRecentSearches())
    }
  }, [data])

  const onSearch = useCallback(
    (q) => {
      setGeoMessage(null)
      fetchWeather(q)
    },
    [fetchWeather],
  )

  const onUseLocation = useCallback(() => {
    setGeoMessage(null)
    if (!navigator.geolocation) {
      setGeoMessage('La géolocalisation n’est pas disponible sur ce navigateur.')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const q = `${pos.coords.latitude},${pos.coords.longitude}`
        fetchWeather(q)
      },
      () => setGeoMessage('Impossible d’obtenir votre position (permission refusée ou erreur).'),
      { enableHighAccuracy: false, timeout: 12_000, maximumAge: 60_000 },
    )
  }, [fetchWeather])

  const toggleTheme = useCallback(() => setDark((d) => !d), [])

  const onRemoveRecent = useCallback((city) => {
    const updated = removeRecentSearch(city)
    setRecents(updated)
  }, [])

  const onClearRecents = useCallback(() => {
    const updated = clearRecentSearches()
    setRecents(updated)
  }, [])

  const current = data?.current
  const location = data?.location
  const forecastday = data?.forecast?.forecastday

  const hoursPreview = useMemo(() => buildHourlyPreview(data), [data])

  const heroBackdrop = useMemo(() => {
    const code = current?.condition?.code
    const isDay = data?.current ? Number(data.current.is_day) === 1 : true
    return getHeroBackdropMeta(code, isDay)
  }, [current, data])

  const heroOverlayStyle = useMemo(() => getHeroOverlayStyle(dark), [dark])

  return (
    <div className="h-screen overflow-hidden bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto flex h-full w-full max-w-[1680px] flex-col lg:flex-row">
        <section className="relative grid w-full flex-1 grid-cols-1 overflow-hidden lg:min-h-screen">
          <HeroBackdrop
            imageUrl={heroBackdrop.imageUrl}
            fallbackUrl={heroBackdrop.fallbackUrl}
            reactKey={heroBackdrop.reactKey}
          />
          <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
            <div className="float-slow absolute -left-20 top-[10%] h-64 w-64 rounded-full bg-sky-300/20 blur-3xl" />
            <div className="float-delayed absolute -right-16 bottom-[12%] h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />
          </div>
          <div
            className="pointer-events-none col-span-full row-span-full z-[2]"
            style={heroOverlayStyle}
            aria-hidden
          />

          <div className="col-span-full row-span-full z-10 flex min-h-0 flex-col p-4 sm:p-6 lg:p-10">
            <div className="flex items-center justify-between gap-3 lg:max-w-xl">
              <Header dark={dark} onToggleTheme={toggleTheme} />
            </div>

            <div className="mt-5 lg:hidden">
              <SearchBar
                onSearch={onSearch}
                onUseLocation={onUseLocation}
                disabled={loading}
              />
            </div>

            <div className="mt-auto flex flex-1 flex-col justify-end pt-10 lg:mt-0 lg:flex-1 lg:justify-end lg:pt-16">
              {loading && !data ? (
                <Loading />
              ) : data ? (
                <WeatherCard location={location} current={current} />
              ) : (
                <div className="glass-surface max-w-lg rounded-3xl p-6 text-slate-900 dark:text-white">
                  <p className="text-lg font-semibold">Bienvenue sur WeatherNow</p>
                  <p className="mt-2 text-sm text-slate-700 dark:text-white/85">
                    Recherchez une ville, ou utilisez votre position pour afficher la météo en temps réel,
                    les prévisions sur trois jours et les détails du vent et de l’humidité.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <aside className="premium-scroll relative flex w-full flex-col overflow-y-auto border-t border-slate-200/80 bg-white/75 p-5 shadow-[0_-12px_40px_rgba(0,0,0,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-black/40 dark:shadow-none lg:max-w-md lg:border-l lg:border-t-0 lg:bg-black/35">
          <div className="mb-4 h-2 w-full" aria-hidden />
          <div className="hidden lg:block">
            <SearchBar
              onSearch={onSearch}
              onUseLocation={onUseLocation}
              disabled={loading}
            />
          </div>

          {recents.length ? (
            <div className="mt-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-white/50">
                  Recent searches
                </p>
                <button
                  type="button"
                  onClick={onClearRecents}
                  className="text-xs text-slate-500 hover:text-slate-700 dark:text-white/50 dark:hover:text-white/80"
                >
                  Clear all
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recents.map((city) => (
                  <div
                    key={city}
                    className="group flex items-center gap-1 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm transition hover:border-slate-300 dark:border-white/15 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
                  >
                    <button
                      type="button"
                      onClick={() => onSearch(city)}
                      className="flex-1 text-left"
                    >
                      {city}
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveRecent(city)}
                      className="ml-1 flex h-4 w-4 items-center justify-center rounded-full text-slate-400 opacity-0 transition-opacity hover:bg-slate-200 hover:text-slate-600 dark:hover:bg-slate-600 dark:hover:text-slate-200 group-hover:opacity-100"
                      aria-label={`Remove ${city}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {geoMessage ? (
            <p className="mt-4 rounded-xl border border-amber-200/80 bg-amber-50 px-3 py-2 text-xs text-amber-900 dark:border-amber-400/40 dark:bg-amber-500/10 dark:text-amber-100">
              {geoMessage}
            </p>
          ) : null}

          {notFound ? (
            <div
              className="mt-6 rounded-2xl border border-red-200/80 bg-red-50 px-4 py-3 text-sm text-red-900 dark:border-red-400/30 dark:bg-red-500/10 dark:text-red-50"
              role="alert"
            >
              <p className="font-semibold">City not found</p>
              <p className="mt-1 text-red-800/90 dark:text-red-100/90">Please try another city</p>
            </div>
          ) : null}

          {error ? (
            <div
              className="mt-6 rounded-2xl border border-red-200/80 bg-red-50 px-4 py-3 text-sm text-red-900 dark:border-red-400/30 dark:bg-red-500/10 dark:text-red-50"
              role="alert"
            >
              {error}
            </div>
          ) : null}

          {loading && data ? <WeatherSkeleton /> : null}

          <div className="mt-6 flex-1">
            {data ? (
              <WeatherDetails
                current={current}
                forecastday={forecastday}
                hoursPreview={hoursPreview}
              />
            ) : null}
          </div>

          <Footer />
        </aside>
      </div>
    </div>
  )
}
