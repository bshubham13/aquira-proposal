import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import type { ProposalData } from '../../types'

export function Celebration({
  data,
  onDone,
}: {
  data: ProposalData
  onDone: () => void
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    resize()

    const colors = ['#ff007f', '#00d9ff', '#fdfd00', '#bc13fe', '#0aff00']
    const pieces = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 6 + 2,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * 360,
      vrot: (Math.random() - 0.5) * 10,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pieces.forEach((p) => {
        p.y += p.vy
        p.x += p.vx
        p.rot += p.vrot
        if (p.y > canvas.height) p.y = -20
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rot * Math.PI) / 180)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
        ctx.restore()
      })
      animRef.current = requestAnimationFrame(draw)
    }
    animRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="stage celebration-stage"
    >
      <canvas ref={canvasRef} className="confetti-canvas" />
      <div className="celebration-body">
        <div className="celebration-badge neon-green">IT'S A YES! 🎉</div>
        <h1 className="celebration-title">
          {data.recipientName} ❤️ {data.senderName}
        </h1>
        <p className="celebration-sub">
          Sabse best decision. Ab officially couples ho! 🥂
        </p>
        <div className="mascot-dance">💃 Chiku is dancing! ✨</div>
        <button className="btn-next" onClick={onDone}>
          Share karo experience 💌
        </button>
      </div>
    </motion.div>
  )
}
