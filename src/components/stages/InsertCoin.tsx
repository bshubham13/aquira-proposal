import { motion, AnimatePresence } from 'framer-motion'
import { ProposalData } from '../../types'

export function InsertCoin({
  data,
  onInsert,
}: {
  data: ProposalData
  onInsert: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="stage"
    >
      <div className="attract-mode">
        <div className="coin-slot"></div>
        <h1 className="attract-title glitch" data-text="CONFESSION ARCADE">
          CONFESSION ARCADE
        </h1>
        <motion.div
          className={`attract-prompt blink ${data.senderName ? '' : ''}`}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        >
          INSERT COIN
        </motion.div>
        <div className="attract-hint">
          Tap below to drop your coin & unlock {data.recipientName}&apos;s feelings
        </div>
        <button className="btn-insert" onClick={onInsert}>
          🪙 Drop Coin
        </button>
      </div>
    </motion.div>
  )
}
