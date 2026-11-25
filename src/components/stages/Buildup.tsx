import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { ProposalData } from '../../types'

const BUILDUP_MESSAGES = [
  { text: 'Kabhi kabhi sochta hoon...', delay: 0 },
  { text: 'Ki agar tumne haan nahi kiya, toh main kya karunga?', delay: 900 },
  { text: 'Mera sabse khaas din wahi hoga, jab tum meri hogi.', delay: 1700 },
  { text: 'Sabse sweet, sabse mad, sabse perfect — tum ho.', delay: 2500 },
  { text: 'Isliye maine yeh saara arcade banaya.', delay: 3200 },
  { text: 'Bas ek baat poochni hai tumse...', delay: 4000 },
]

export function Buildup({ onDone }: { onDone: () => void }) {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => {
      setVisibleCount(1)
    }, 400)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (visibleCount >= BUILDUP_MESSAGES.length) {
      const t = setTimeout(onDone, 900)
      return () => clearTimeout(t)
    }
  }, [visibleCount, onDone])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="stage buildup-stage"
    >
      <div className="buildup-body">
        <div className="buildup-messages">
          {BUILDUP_MESSAGES.slice(0, visibleCount).map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="buildup-msg"
              style={{ animationDelay: `${m.delay}ms` }}
            >
              <span className="buildup-text">{m.text}</span>
              {i === BUILDUP_MESSAGES.length - 1 && (
                <span className="buildup-cursor">_</span>
              )}
            </motion.div>
          ))}
        </div>
        {visibleCount >= BUILDUP_MESSAGES.length && (
          <div className="buildup-hint">
            Tap karein aage badhne ke liye ➤
          </div>
        )}
      </div>
    </motion.div>
  )
}
