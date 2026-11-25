import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'
import { ProposalData } from '../../types'

export function Proposal({
  data,
  onYes,
  onNo,
}: {
  data: ProposalData
  onYes: () => void
  onNo: () => void
}) {
  const [pressed, setPressed] = useState<'yes' | 'no' | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="stage proposal-stage"
    >
      <div className="proposal-body">
        <div className="proposal-ring"></div>
        <h2 className="proposal-title neon-pink">
          {data.recipientName}, will you be mine?
        </h2>
        <p className="proposal-sub">
          {data.senderName} se. Officially. Forever. 💍
        </p>
        <p className="proposal-message">{data.message}</p>

        <div className="proposal-options">
          <button
            className={`btn-proposal btn-yes ${pressed === 'yes' ? 'pressed' : ''}`}
            onClick={() => {
              setPressed('yes')
              setTimeout(onYes, 300)
            }}
          >
            <Heart size={20} /> Haan, definitely ✅
          </button>
          <button
            className={`btn-proposal btn-no ${pressed === 'no' ? 'pressed' : ''}`}
            onClick={() => {
              setPressed('no')
              setTimeout(onNo, 300)
            }}
          >
            <Sparkles size={18} /> Hmm... let me think
          </button>
        </div>
        <p className="proposal-hint">
          (Dono options cute hain, par ek wala zyada cute hai 😉)
        </p>
      </div>
    </motion.div>
  )
}
