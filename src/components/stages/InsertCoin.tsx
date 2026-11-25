import { motion } from 'framer-motion'
import { BellRing, MapPin } from 'lucide-react'
import type { ProposalData } from '../../types'

export function InsertCoin({ data, onInsert }: { data: ProposalData; onInsert: () => void }) {
  return (
    <motion.section className="stage doorstep-stage" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .96 }}>
      <div className="night-pill"><i /> LIVE · 11:11 PM</div>
      <div className="door-scene">
        <div className="door-number">11:11</div>
        <div className="door-note">please knock softly<br />feelings inside</div>
        <motion.button className="doorbell" onClick={onInsert} whileTap={{ scale: .88 }} aria-label="Ring the doorbell">
          <BellRing size={24} /><span>PRESS</span>
        </motion.button>
        <div className="parcel-box"><span>FRAGILE</span><strong>TO: {data.recipientName}</strong><small>midnight dilivery™</small></div>
      </div>
      <div className="door-copy">
        <span className="eyebrow"><MapPin size={14} /> destination: {data.recipientName}</span>
        <h1>Someone sent you<br />a <em>very suspicious</em> parcel.</h1>
        <p>Sender bol raha tha “normal delivery hai.” Sender was clearly lying.</p>
        <button className="stage-action" onClick={onInsert}><BellRing size={18} /> Ring & receive</button>
      </div>
    </motion.section>
  )
}
