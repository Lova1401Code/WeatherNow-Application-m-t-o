import { useEffect, useState } from 'react'

/**
 * Fond photo : calque dédié (relative + absolute) pour éviter
 * - hauteur % / flex mal résolue sur certains navigateurs
 * - empilement du bg de la section par-dessus l’image (z-0)
 */
export default function HeroBackdrop({ imageUrl, fallbackUrl, reactKey, className = '' }) {
  const [src, setSrc] = useState(imageUrl)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setSrc(imageUrl)
    setFailed(false)
  }, [imageUrl, reactKey])

  const handleError = () => {
    if (!failed && fallbackUrl && src !== fallbackUrl) {
      setSrc(fallbackUrl)
      setFailed(true)
      return
    }
    setSrc('')
  }

  return (
    <div key={reactKey} className={`relative z-0 min-h-0 min-w-0 ${className}`}>
      <div className="absolute inset-0 bg-slate-900" aria-hidden />
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        {src ? (
          <img
            src={src}
            alt=""
            loading="eager"
            decoding="sync"
            draggable={false}
            onError={handleError}
            className="pointer-events-none block max-h-none max-w-none select-none"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 'auto',
              height: 'auto',
              minWidth: '100%',
              minHeight: '100%',
              transform: 'translate(-50%, -50%)',
              objectFit: 'cover',
            }}
          />
        ) : null}
        {!src ? (
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.35), transparent 45%), radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.35), transparent 45%), linear-gradient(135deg, #0f172a, #1e293b 45%, #0b1120)',
            }}
          />
        ) : null}
      </div>
    </div>
  )
}
