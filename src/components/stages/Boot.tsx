import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Bike, Check, Navigation } from 'lucide-react'
import type { ProposalData } from '../../types'

export function Boot({ data, onDone }: { data: ProposalData; onDone: () => void }) {
  const [progress, setProgress] = useState(8)
  useEffect(() => {
    const id = window.setInterval(() => setProgress((p) => Math.min(100, p + 4 + Math.round(Math.random() * 8))), 130)
    return () => window.clearInterval(id)
  }, [])
  useEffect(() => {
    if (progress < 100) return
    const id = window.setTimeout(onDone, 900)
    return () => window.clearTimeout(id)
  }, [progress, onDone])

  return (
    <motion.section className="stage route-stage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="route-map">
        <div className="map-grid" />
        <div className="route-path"><i /><i /><i /><i /></div>
        <motion.div className="courier-bike" animate={{ offsetDistance: `${progress}%` }}><Bike size={30} /></motion.div>
        <span className="map-label sender-pin"><i />{data.senderName}</span>
        <span className="map-label receiver-pin"><i />{data.recipientName}</span>
      </div>
      <div className="route-console">
        <span className="eyebrow"><Navigation size={14} /> finding shortest route to your dil</span>
        <h2>{progress < 100 ? 'Emotional GPS recalculating…' : 'Dil mil gaya. Obviously.'}</h2>
        <div className="route-track"><motion.i animate={{ width: `${progress}%` }} /></div>
        <div className="route-stats"><span>{Math.round(progress * .07)} km of overthinking</span><strong>{progress}%</strong></div>
        <ul><li className={progress > 24 ? 'done' : ''}><Check /> sender intention verified</li><li className={progress > 55 ? 'done' : ''}><Check /> cringe levels: cute, not illegal</li><li className={progress >= 100 ? 'done' : ''}><Check /> recipient aura detected</li></ul>
      </div>
    </motion.section>
  )
}
