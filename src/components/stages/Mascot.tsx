import { useState } from 'react'
import { motion } from 'framer-motion'
import { ProposalData } from '../../types'

const MASCOIT_LINES = [
  `Arre wah! Koi naya player aaya hai arcade mein.`,
  `Main hoon Chiku — yeh arcade ka official "feelings checker" mascot.`,
  `Yahan ek hi kaam hai: dekhna ki {recipient} ko {sender} pe kitna crush hai.`,
  `Lekin pehle ek chhota sa test...`,
]

export function Mascot({
  data,
  onDone,
}: {
  data: ProposalData
  onDone: () => void
}) {
  const [lineIdx, setLineIdx] = useState(0)
  const [talking, setTalking] = useState(false)

  const currentLine =
    MASCOIT_LINES[lineIdx].replace('{recipient}', data.recipientName).replace(
      '{sender}',
      data.senderName
    )

  const nextLine = () => {
    setTalking(false)
    setTimeout(() => {
      if (lineIdx >= MASCOIT_LINES.length - 1) {
        onDone()
      } else {
        setLineIdx((i) => i + 1)
      }
    }, 700)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="stage mascot-stage"
    >
      <div className="mascot-body">
        <div className="mascot-machine">
          <div className="mascot-screen">
            <div className="mascot-face">
              <div className="eye left"></div>
              <div className="eye right"></div>
              <div className="mouth">{talking ? '◑' : '◐'}</div>
            </div>
            <div className="mascot-text">
              <span className="speaker">Chiku: </span>
              <span className="dialogue">{currentLine}</span>
            </div>
          </div>
          <div className="mascot-base">
            <div className="mascot-antenna" />
            <div className="mascot-antenna" style={{ left: 'auto', right: 18 }} />
          </div>
        </div>
        <div className="mascot-hint">
          {lineIdx < MASCOIT_LINES.length - 1 ? (
            <button className="btn-next" onClick={() => {
              setTalking(true)
              setTimeout(nextLine, 400)
            }}>
              Next ⏭
            </button>
          ) : (
            <button className="btn-next" onClick={nextLine}>
              Chalo agle level pe 🎮
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
