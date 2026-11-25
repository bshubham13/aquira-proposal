import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ProposalData } from '../../types'

const HEART_COLORS = ['#ff007f', '#ff4da6', '#bc13fe', '#fdfd00', '#00d9ff']

export function HeartGame({
  data,
  onWin,
}: {
  data: ProposalData
  onWin: () => void
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const animRef = useRef<number | null>(null)
  const heartsRef = useRef<Array<{ x: number; y: number; vy: number; size: number; color: string }>>([])
  const basketRef = useRef({ x: 0, width: 90 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.parentElement!.clientWidth
      canvas.height = canvas.parentElement!.clientHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const moveBasket = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      let x = clientX - rect.left - basketRef.current.width / 2
      x = Math.max(0, Math.min(canvas.width - basketRef.current.width, x))
      basketRef.current.x = x
    }
    canvas.addEventListener('mousemove', moveBasket)
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault()
      moveBasket(e)
    }, { passive: false })

    let spawnTimer = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // draw basket
      ctx.fillStyle = '#00d9ff'
      ctx.shadowColor = '#00d9ff'
      ctx.shadowBlur = 15
      ctx.fillRect(basketRef.current.x, canvas.height - 40, basketRef.current.width, 20)
      ctx.shadowBlur = 0

      spawnTimer += 1
      if (spawnTimer > 25) {
        spawnTimer = 0
        heartsRef.current.push({
          x: Math.random() * (canvas.width - 30),
          y: -30,
          vy: 2 + Math.random() * 3,
          size: 14 + Math.random() * 10,
          color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
        })
      }

      for (let i = heartsRef.current.length - 1; i >= 0; i--) {
        const h = heartsRef.current[i]
        h.y += h.vy

        // draw heart
        ctx.fillStyle = h.color
        ctx.beginPath()
        ctx.moveTo(h.x, h.y)
        ctx.bezierCurveTo(h.x - h.size, h.y - h.size, h.x - h.size, h.y + h.size, h.x, h.y + h.size * 0.6)
        ctx.bezierCurveTo(h.x + h.size, h.y + h.size, h.x + h.size, h.y - h.size, h.x, h.y)
        ctx.fill()

        // caught?
        if (
          h.y + h.size > canvas.height - 40 &&
          h.x > basketRef.current.x &&
          h.x < basketRef.current.x + basketRef.current.width
        ) {
          setScore((s) => s + 1)
          heartsRef.current.splice(i, 1)
          if (score + 1 >= 15) {
            setWon(true)
            setGameOver(true)
            if (animRef.current) cancelAnimationFrame(animRef.current)
          }
          continue
        }

        // missed
        if (h.y > canvas.height) {
          heartsRef.current.splice(i, 1)
        }
      }

      if (!gameOver) {
        animRef.current = requestAnimationFrame(draw)
      }
    }

    animRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', moveBasket)
      canvas.removeEventListener('touchmove', moveBasket)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [score, gameOver])

  if (won) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="stage heartgame-stage"
      >
        <div className="heartgame-body">
          <div className="win-banner neon-pink">LEVEL CLEAR! 💖</div>
          <p>Tumne {score} hearts pakde — {data.recipientName} ke paas pahunchne layak ho 🎯</p>
          <button className="btn-next" onClick={onWin}>
            Agle level pe 🚀
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="stage heartgame-stage"
    >
      <div className="heartgame-body">
        <div className="game-header">
          <span className="game-title">CATCH THE HEARTS</span>
          <span className="game-score">Score: {score} / 15</span>
        </div>
        <div className="game-canvas-wrap">
          <canvas ref={canvasRef} className="game-canvas"></canvas>
        </div>
        <div className="game-hint">
          Hilo basket ko {data.recipientName} ke liye hearts pakadne ke liye — 15 chahiye!
        </div>
        {gameOver && (
          <button className="btn-retry" onClick={() => {
            setScore(0)
            setGameOver(false)
            setWon(false)
          }}>
            Try again
          </button>
        )}
      </div>
    </motion.div>
  )
}
