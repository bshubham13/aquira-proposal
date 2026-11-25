import { motion } from 'framer-motion'
import { PartyPopper } from 'lucide-react'
import type { ProposalData } from '../../types'

export function Celebration({ data, onDone }: { data: ProposalData; onDone: () => void }) {
  return (
    <motion.section className="stage celebration-stage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="confetti-field" aria-hidden="true">{Array.from({ length: 34 }, (_, index) => <motion.i key={index} style={{ left: `${(index * 29) % 100}%`, background: `var(--confetti-${index % 4})` }} initial={{ y: -80, rotate: 0 }} animate={{ y: '110vh', rotate: 540 }} transition={{ duration: 2.8 + (index % 5) * .45, repeat: Infinity, delay: (index % 9) * .12 }} />)}</div>
      <div className="celebration-copy"><motion.div className="yes-badge" initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: -5 }} transition={{ type: 'spring', delay: .15 }}>IT’S A YES!</motion.div><span className="eyebrow"><PartyPopper size={14} /> breaking: local cuties make it official</span><h1>{data.recipientName}<span>♥</span>{data.senderName}</h1><p>Internet ka aaj ka kaam complete. Momo emotional hai. Hum pretend karenge uski aankh mein bas confetti gaya.</p><div className="celebration-ticker"><span>OFFICIAL UPDATE</span><b>{data.recipientName.toUpperCase()} CHOSE {data.senderName.toUpperCase()} · GOOD TASTE CONFIRMED ·</b></div><button className="stage-action" onClick={onDone}>Collect your delivery receipt →</button></div>
    </motion.section>
  )
}
