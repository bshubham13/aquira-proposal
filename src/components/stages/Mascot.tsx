import { useState } from 'react'
import { motion } from 'framer-motion'
import type { ProposalData } from '../../types'

const replies = [
  ['Obviously cute', 'Correct. Eyes working. ✅'],
  ['Thoda sus', 'Fair. Itna effort usually suspicious hota hai.'],
  ['Who is asking?', 'Me: Momo, certified dilivery pigeon. Please respect authority.'],
]

export function Mascot({ data, onDone }: { data: ProposalData; onDone: () => void }) {
  const [picked, setPicked] = useState<number | null>(null)
  return (
    <motion.section className="stage mascot-stage" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
      <div className="chat-window">
        <div className="chat-head"><div className="momo-avatar">M</div><div><strong>Momo from Dilivery</strong><span><i /> online & unnecessarily invested</span></div><b>•••</b></div>
        <div className="chat-date">TODAY 11:12 PM</div>
        <div className="bubble incoming">Hii {data.nickname} 👋 Parcel mein feelings hain. Customs ne rok diya because “too much pyaar, not enough paperwork.”</div>
        <div className="bubble incoming">Quick vibe check: {data.senderName} ko 1–10 mein kitna cute consider kiya jaata hai?</div>
        {picked !== null && <motion.div className="bubble outgoing" initial={{ scale: .8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>{replies[picked][0]}</motion.div>}
        {picked !== null && <motion.div className="bubble incoming momo-reply" initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>{replies[picked][1]}</motion.div>}
        {picked === null ? <div className="quick-replies">{replies.map((reply, index) => <button key={reply[0]} onClick={() => setPicked(index)}>{reply[0]}</button>)}</div> : <button className="chat-continue" onClick={onDone}>release the parcel →</button>}
      </div>
      <aside className="mascot-card"><div className="momo-bird"><span>◕</span><span>◕</span><i>◆</i></div><small>YOUR DILIVERY AGENT</small><h2>Momo has one job.</h2><p>Parcel safely deliver karna. Gossip collect karna is a passion project.</p><div className="rating">★★★★★ <span>4.9 · emotionally available</span></div></aside>
    </motion.section>
  )
}
