import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function Boot({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let t: number
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          setDone(true)
          t = setTimeout(onDone, 400)
          return p
        }
        return p + Math.random() * 12
      })
    }, 150)
    return () => {
      clearInterval(interval)
      if (t) clearTimeout(t)
    }
  }, [onDone])

  const lines = [
    '> BOOTING CONFESSION ARCADE v2.0',
    '> LOADING MEMORY BANK... OK',
    '> SCANNING HEARTBEAT SENSOR... OK',
    '> RETRIEVING FEELINGS DATA...',
    '> DECRYPTING CRUSH FILES...',
    '> ACCESS GRANTED',
  ]
  const [lineIdx, setLineIdx] = useState(0)

  useEffect(() => {
    if (!done) return
    const t = setTimeout(() => setLineIdx(lines.length - 1), 600)
    return () => clearTimeout(t)
  }, [done])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="stage boot-stage"
    >
      <div className="boot-body">
        <div className="boot-header">
          <span className="power">▶</span> SYSTEM BOOT
        </div>
        <div className="boot-lines">
          {lines.slice(0, lineIdx + 1).map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="boot-line"
            >
              {l}
              {i === lineIdx && lineIdx < lines.length - 1 && (
                <span className="cursor">_</span>
              )}
            </motion.div>
          ))}
        </div>
        <div className="boot-progress-wrap">
          <div className="boot-progress-track">
            <div
              className="boot-progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="boot-pct">{progress}%</div>
        </div>
        <div className="boot-status">
          {done ? (
            <span className="status-ok neon-green">READY — PRESS START</span>
          ) : (
            <span className="status-wait neon-yellow">LOADING...</span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
