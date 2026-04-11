import { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { fetchForecast, isLocationNotFoundError } from '../services/weatherApi'

const initialState = {
  data: null,
  loading: false,
  error: null,
  notFound: false,
}

const CACHE_MS = 60_000

export function useWeather() {
  const [state, setState] = useState(initialState)
  const requestId = useRef(0)
  const cache = useRef({ key: '', at: 0, data: null })
  const abortRef = useRef(null)

  const run = useCallback(async (query) => {
    const trimmed = String(query || '').trim()
    if (!trimmed) {
      setState((s) => ({ ...s, error: 'Entrez un nom de ville.', notFound: false }))
      return
    }

    const now = Date.now()
    if (
      cache.current.key === trimmed &&
      cache.current.data &&
      now - cache.current.at < CACHE_MS
    ) {
      setState({
        data: cache.current.data,
        loading: false,
        error: null,
        notFound: false,
      })
      return
    }

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    const id = ++requestId.current
    setState((s) => ({ ...s, loading: true, error: null, notFound: false }))

    try {
      const data = await fetchForecast(trimmed, 3, controller.signal)
      if (id !== requestId.current) return
      cache.current = { key: trimmed, at: Date.now(), data }
      setState({ data, loading: false, error: null, notFound: false })
    } catch (e) {
      if (axios.isAxiosError(e) && e.code === 'ERR_CANCELED') {
        return
      }
      if (id !== requestId.current) return
      if (isLocationNotFoundError(e)) {
        setState({
          data: null,
          loading: false,
          error: null,
          notFound: true,
        })
        return
      }
      const message =
        e instanceof Error ? e.message : 'Impossible de récupérer la météo. Réessayez plus tard.'
      setState((s) => ({
        ...s,
        loading: false,
        error: message,
        notFound: false,
      }))
    }
  }, [])

  const reset = useCallback(() => {
    abortRef.current?.abort()
    requestId.current += 1
    setState(initialState)
  }, [])

  useEffect(
    () => () => {
      abortRef.current?.abort()
    },
    [],
  )

  return { ...state, fetchWeather: run, reset }
}
