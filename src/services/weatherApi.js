import axios from 'axios'

const BASE = 'https://api.weatherapi.com/v1'

function getKey() {
  const key = import.meta.env.VITE_WEATHER_API_KEY
  if (!key) {
    throw new Error(
      'Clé API manquante. Ajoutez VITE_WEATHER_API_KEY dans un fichier .env à la racine du projet.',
    )
  }
  return key
}

/**
 * @param {string} query - city name or "lat,lon"
 * @param {number} [days=3]
 * @param {AbortSignal} [signal]
 */
export async function fetchForecast(query, days = 3, signal) {
  const key = getKey()
  const { data } = await axios.get(`${BASE}/forecast.json`, {
    params: {
      key,
      q: query,
      days,
      aqi: 'no',
      alerts: 'no',
    },
    signal,
  })
  return data
}

export function isLocationNotFoundError(err) {
  if (!axios.isAxiosError(err)) return false
  const status = err.response?.status
  const msg = String(err.response?.data?.error?.message || '').toLowerCase()
  return status === 400 || msg.includes('no matching location')
}
