import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Stars } from 'lucide-react'
import type { ProposalData } from '../../types'

const noLabels = ['thoda sochungi', 'are you sure? 👀', 'Momo is watching', 'okay button, calm down']

export function Proposal({ data, onYes }: { data: ProposalData; onYes: () => void; onNo: () => void }) {
  const [noCount, setNoCount] = useState(0)
  return (
    <motion.section className="stage proposal-stage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.15, filter: 'blur(8px)' }}>
      <div className="proposal-stars"><span>✦</span><span>✧</span><span>✦</span><span>·</span></div>
      <div className="proposal-orbit"><div><Heart fill="currentColor" /></div></div>
      <span className="eyebrow"><Stars size={14} /> final delivery attempt</span>
      <h1>{data.recipientName},<br /><em>will you be mine?</em></h1>
      <p>Not just for the highlight reel. Normal Tuesdays, bad moods, stolen hoodies aur saari random kahaniyon ke liye.</p>
      <div className="proposal-actions">
        <motion.button className="big-yes" onClick={onYes} animate={{ scale: 1 + noCount * .07 }}>Haan. Obviously. <Heart fill="currentColor" /></motion.button>
        <motion.button className="soft-no" onClick={() => setNoCount((count) => Math.min(count + 1, noLabels.length - 1))} animate={{ opacity: 1 - noCount * .18, scale: 1 - noCount * .08 }}>{noLabels[noCount]}</motion.button>
      </div>
      {noCount > 0 && <motion.span className="proposal-nudge" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>No pressure. Bas yes button ka confidence dekh rahe ho? 😭</motion.span>}
    </motion.section>
  )
}
