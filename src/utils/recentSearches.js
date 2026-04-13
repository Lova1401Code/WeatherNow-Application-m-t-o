const KEY = 'weathernow_recent'
const MAX = 8

export function loadRecentSearches() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : []
  } catch {
    return []
  }
}

export function saveRecentSearch(cityLabel) {
  const label = String(cityLabel || '').trim()
  if (!label) return
  const prev = loadRecentSearches().filter((x) => x.toLowerCase() !== label.toLowerCase())
  const next = [label, ...prev].slice(0, MAX)
  localStorage.setItem(KEY, JSON.stringify(next))
}

export function removeRecentSearch(cityLabel) {
  const label = String(cityLabel || '').trim()
  if (!label) return
  const prev = loadRecentSearches().filter((x) => x.toLowerCase() !== label.toLowerCase())
  localStorage.setItem(KEY, JSON.stringify(prev))
  return prev
}

export function clearRecentSearches() {
  localStorage.setItem(KEY, JSON.stringify([]))
  return []
}
