/** @param {number | string | undefined | null} conditionCode */
function resolveBackdropKey(conditionCode, isDay) {
  const code = Number(conditionCode)
  const c = Number.isFinite(code) ? code : 1000

  let mood = 'cloud'
  if (c === 1000) mood = isDay ? 'clearDay' : 'clearNight'
  else if ([1003, 1006, 1009].includes(c)) mood = 'cloud'
  else if (
    [1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246].includes(c)
  )
    mood = 'rain'
  else if ([1087, 1273, 1276, 1279, 1282].includes(c) || (c >= 1273 && c <= 1282))
    mood = 'storm'
  else if (
    [1066, 1069, 1072, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225].includes(c)
  )
    mood = 'snow'

  const urls = {
    storm:
      'https://images.unsplash.com/photo-1605727216801-e27d1c2900c2?auto=format&fit=crop&w=2400&q=85',
    rain: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=2400&q=85',
    snow: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=2400&q=85',
    clearDay:
      'https://images.unsplash.com/photo-1504384308090-c54be3855833?auto=format&fit=crop&w=2400&q=85',
    clearNight:
      'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=2400&q=85',
    cloud:
      'https://images.unsplash.com/photo-1527482797697-8795d1a29acb?auto=format&fit=crop&w=2400&q=85',
  }

  return {
    /** Pour forcer le rechargement visuel quand la météo change */
    reactKey: `${c}-${isDay ? 'd' : 'n'}-${mood}`,
    mood,
    imageUrl: urls[mood],
  }
}

/**
 * @param {number | string | undefined | null} conditionCode — ex. current.condition.code
 * @param {boolean} isDay — ex. Number(current.is_day) === 1
 */
export function getHeroBackdropMeta(conditionCode, isDay) {
  return resolveBackdropKey(conditionCode, isDay)
}

export function getHeroOverlayStyle(darkMode = true) {
  const diagonal = darkMode
    ? 'linear-gradient(120deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0.45) 100%)'
    : 'linear-gradient(120deg, rgba(255,255,255,0.48) 0%, rgba(255,255,255,0.12) 45%, rgba(255,255,255,0.4) 100%)'
  const vertical = darkMode
    ? 'linear-gradient(to bottom, rgba(0,0,0,0.35), transparent 42%, rgba(0,0,0,0.55))'
    : 'linear-gradient(to bottom, rgba(255,255,255,0.25), transparent 40%, rgba(15,23,42,0.12))'
  return {
    backgroundImage: `${vertical}, ${diagonal}`,
  }
}
