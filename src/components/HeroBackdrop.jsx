/**
 * Fond photo : calque dédié (relative + absolute) pour éviter
 * - hauteur % / flex mal résolue sur certains navigateurs
 * - empilement du bg de la section par-dessus l’image (z-0)
 */
export default function HeroBackdrop({ imageUrl, reactKey }) {
  return (
    <div key={reactKey} className="relative z-0 col-span-full row-span-full min-h-0 min-w-0">
      <div className="absolute inset-0 bg-slate-900" aria-hidden />
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <img
          src={imageUrl}
          alt=""
          loading="eager"
          decoding="sync"
          draggable={false}
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
      </div>
    </div>
  )
}
