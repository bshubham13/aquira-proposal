import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, LockKeyhole, PackageOpen } from 'lucide-react'
import type { ProposalData } from '../../types'

export function Buildup({ data, onDone }: { data: ProposalData; onDone: () => void }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.section className="stage letter-stage" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 1.05 }}>
      {!open ? <div className="sealed-letter">
        <div className="letter-meta"><span>PRIVATE & PERSONAL</span><span>OPEN WHEN READY</span></div>
        <div className="address-block"><small>SPECIAL DILIVERY FOR</small><strong>{data.recipientName}</strong><span>also known as “{data.nickname}”</span></div>
        <button className="wax-seal" onClick={() => setOpen(true)} aria-label="Break the wax seal"><Heart fill="currentColor" /></button>
        <p><LockKeyhole size={14} /> tap the seal to open</p>
        <div className="letter-stamp">AIR<br />MAIL</div>
      </div> : <motion.article className="open-letter" initial={{ rotateX: 70, opacity: 0 }} animate={{ rotateX: 0, opacity: 1 }}>
        <div className="paperclip">⌇</div><span className="handwritten">Dear {data.nickname},</span>
        <p>Remember this?</p><blockquote>“{data.memory}”</blockquote>
        <p>{data.message}</p>
        <div className="tiny-promise"><span>TINY PROMISE, BIG INTENT</span>{data.promise}</div>
        <p className="letter-sign">— yours, nervously<br /><strong>{data.senderName}</strong></p>
        <button className="letter-next" onClick={onDone}><PackageOpen size={17} /> There’s one last thing</button>
      </motion.article>}
    </motion.section>
  )
}
