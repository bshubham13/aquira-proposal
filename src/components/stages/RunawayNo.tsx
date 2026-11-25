import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ProposalData } from '../../types'

const NO_LINE_REPLIES = [
  "Haanji, balki mujhe tumse zyada pyar hai apne phone se 😤",
  "Nahi milne wala 'No', tum mere liye banaye gaye ho 💖",
  "Itna rulaogi? Thik hai, main yeh button chhupaa lunga 😭",
  "Button bhaag gaya, lekin tum nahi bhaag sakti 😏",
  "Haha, 'No' button darr gaya! Ab tum do.",
]

export function RunawayNo({
  data,
  onYes,
}: {
  data: ProposalData
  onYes: () => void
}) {
  const [noPosition, setNoPosition] = useState({ x: 70, y: 50 })
  const [clickCount, setClickCount] = useState(0)
  const noBtnRef = useRef<HTMLButtonElement>(null)

  const moveNoButton = useCallback(() => {
    const btn = noBtnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const parent = btn.parentElement!
    const pr = parent.getBoundingClientRect()
    const maxX = pr.width - rect.width - 20
    const maxY = pr.height - rect.height - 20
    const x = Math.max(10, Math.random() * maxX)
    const y = Math.max(10, Math.random() * maxY)
    setNoPosition({ x, y })
  }, [])

  const handleNoMouseEnter = () => {
    moveNoButton()
    setClickCount((c) => c + 1)
  }

  const handleYesClick = () => onYes()

  const replyIndex = Math.min(clickCount - 1, NO_LINE_REPLIES.length - 1)
  const showingReply = clickCount > 0

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="stage runaway-stage"
    >
      <div className="runaway-body">
        <h2 className="question">
          Kya tum {data.senderName} ko pasand karte ho?
        </h2>
        <p className="question-sub">
          (Sach-sach batana, main sab dekh raha hoon 👀)
        </p>

        <div className="runaway-options">
          <button className="btn-yes" onClick={handleYesClick}>
            Haan, 100% ✅
          </button>
          <button
            ref={noBtnRef}
            className="btn-no"
            style={{ left: noPosition.x, top: noPosition.y }}
            onMouseEnter={handleNoMouseEnter}
            onClick={(e) => {
              e.stopPropagation()
              moveNoButton()
              setClickCount((c) => c + 1)
            }}
          >
            Na🚫
          </button>
        </div>

        {showingReply && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="no-reply"
          >
            <span className="reply-badge">Chiku kehti hai:</span>
            {NO_LINE_REPLIES[replyIndex]}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
