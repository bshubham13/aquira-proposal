import { useState } from 'react'
import { motion } from 'framer-motion'
import { ScanFace } from 'lucide-react'
import type { ProposalData } from '../../types'

const excuses = ['nice try 😭', 'camera says that is cap', 'button bhi trust nahi kar raha', 'bas karo yaar, parcel thanda ho raha hai']

export function RunawayNo({ data, onYes }: { data: ProposalData; onYes: () => void }) {
  const [escapes, setEscapes] = useState(0)
  const positions = [{ x: 0, y: 0 }, { x: 105, y: -42 }, { x: -88, y: 48 }, { x: 75, y: 55 }, { x: -58, y: -48 }]
  const dodge = () => setEscapes((value) => value + 1)
  return (
    <motion.section className="stage identity-stage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="scanner-card">
        <div className="scanner-top"><span>RECIPIENT VERIFICATION</span><b>SECURE-ish</b></div>
        <div className="face-scan"><div className="scan-line" /><ScanFace size={132} strokeWidth={.8} /><span>scanning cuteness… 100%</span></div>
        <h2>Are you really {data.recipientName}?</h2>
        <p>Legal note: sirf wahi person aage jaa sakta hai jiske liye {data.senderName} ne itna overthink kiya.</p>
        <div className="identity-actions"><button className="confirm-btn" onClick={onYes}>Yes, main hi hoon <span>→</span></button><motion.button className="deny-btn" animate={positions[escapes % positions.length]} transition={{ type: 'spring', stiffness: 380, damping: 18 }} onMouseEnter={dodge} onTouchStart={dodge} onClick={dodge}>Nope</motion.button></div>
        {escapes > 0 && <motion.div className="scanner-toast" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Momo: {excuses[Math.min(escapes - 1, excuses.length - 1)]}</motion.div>}
      </div>
    </motion.section>
  )
}
