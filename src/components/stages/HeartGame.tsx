import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'
import type { ProposalData } from '../../types'

const SPOTS = [
  { left: '12%', top: '24%' }, { left: '67%', top: '17%' }, { left: '40%', top: '48%' },
  { left: '77%', top: '63%' }, { left: '18%', top: '72%' }, { left: '52%', top: '81%' },
]

export function HeartGame({ data, onWin }: { data: ProposalData; onWin: () => void }) {
  const [caught, setCaught] = useState<number[]>([])
  const completed = caught.length === SPOTS.length
  const labels = useMemo(() => ['kindness', 'banter', 'comfort', 'chemistry', 'pagalpanti', 'home'], [])
  return (
    <motion.section className="stage catch-stage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="catch-copy">
        <span className="eyebrow"><Sparkles size={14} /> fragile cargo escaped</span>
        <h2>Catch the tiny feelings!</h2>
        <p>Parcel khulte hi {data.senderName} ke emotions ud gaye. Typical. Tap karke sab wapas collect karo.</p>
        <div className="feeling-list">{labels.map((label, index) => <span key={label} className={caught.includes(index) ? 'caught' : ''}><i>{caught.includes(index) ? '♥' : '○'}</i>{label}</span>)}</div>
        <div className="catch-count"><strong>{caught.length}</strong><span>/ 6 feelings secured</span></div>
      </div>
      <div className={`catch-zone ${completed ? 'complete' : ''}`}>
        <div className="catch-moon">☾</div>
        {SPOTS.map((spot, index) => !caught.includes(index) && <motion.button key={index} className="floating-heart" style={spot} onClick={() => setCaught((items) => [...items, index])} animate={{ y: [0, -10, 2], rotate: [-6, 8, -6] }} transition={{ repeat: Infinity, duration: 2 + index * .18 }} whileTap={{ scale: 1.7 }}><Heart fill="currentColor" /></motion.button>)}
        {Array.from({ length: 12 }, (_, index) => <i className="catch-star" key={index} style={{ left: `${(index * 37) % 94}%`, top: `${(index * 53) % 88}%` }}>·</i>)}
        {completed && <motion.div className="catch-complete" initial={{ scale: .6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}><div>♥</div><strong>ALL FEELINGS<br />SECURED</strong><span>No emotions were harmed.<br />Bas thoda drama hua.</span><button onClick={onWin}>seal the box →</button></motion.div>}
      </div>
    </motion.section>
  )
}
