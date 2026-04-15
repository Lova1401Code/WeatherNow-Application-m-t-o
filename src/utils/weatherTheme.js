/** @param {number | string | undefined | null} conditionCode */
function resolveBackdropKey(conditionCode, isDay) {
  const code = Number(conditionCode)
  const c = Number.isFinite(code) ? code : 1000

  let mood = 'cloud'
  if (c === 1000) mood = isDay ? 'clearDay' : 'clearNight'
  else if ([1003, 1006, 1009].includes(c)) mood = 'cloud'
  else if ([1030, 1135, 1147].includes(c)) mood = 'mist'
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
      'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=2400&q=85',
    rain: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=2400&q=85',
    snow: 'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=2400&q=85',
    clearDay:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2400&q=85',
    clearNight:
      'https://images.unsplash.com/photo-1505322022379-7c3353ee6291?auto=format&fit=crop&w=2400&q=85',
    cloud:
      'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=2400&q=85',
    mist: 'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?auto=format&fit=crop&w=2400&q=85',
  }

  const fallbackUrls = {
    storm:
      'https://images.pexels.com/photos/53459/lightning-storm-weather-sky-53459.jpeg?auto=compress&cs=tinysrgb&w=2400',
    rain:
      'https://images.pexels.com/photos/110874/pexels-photo-110874.jpeg?auto=compress&cs=tinysrgb&w=2400',
    snow:
      'https://images.pexels.com/photos/688660/pexels-photo-688660.jpeg?auto=compress&cs=tinysrgb&w=2400',
    clearDay:
      'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=2400',
    clearNight:
      'https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg?auto=compress&cs=tinysrgb&w=2400',
    cloud:
      'https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?auto=compress&cs=tinysrgb&w=2400',
    mist:
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=2400',
  }

  return {
    /** Pour forcer le rechargement visuel quand la météo change */
    reactKey: `${c}-${isDay ? 'd' : 'n'}-${mood}`,
    mood,
    imageUrl: urls[mood],
    fallbackUrl: fallbackUrls[mood] || fallbackUrls.cloud,
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
