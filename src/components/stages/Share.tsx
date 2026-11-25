import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Copy, RotateCcw } from 'lucide-react'
import type { ProposalData } from '../../types'

export function Share({ data, onRestart }: { data: ProposalData; onRestart: () => void }) {
  const [copied, setCopied] = useState(false)
  const reply = `Official update: ${data.recipientName} said YES 💌 Parcel accepted. ${data.senderName}, ab treat banti hai.`
  const copy = async () => { await navigator.clipboard.writeText(reply); setCopied(true); window.setTimeout(() => setCopied(false), 2000) }
  return (
    <motion.section className="stage receipt-stage" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
      <div className="receipt">
        <div className="receipt-brand">MIDNIGHT <span>DILIVERY</span><small>FEELINGS FULFILMENT CENTER</small></div>
        <div className="receipt-dash" />
        <div className="receipt-row"><span>PARCEL FOR</span><b>{data.recipientName}</b></div><div className="receipt-row"><span>SENT WITH PANIC BY</span><b>{data.senderName}</b></div><div className="receipt-row"><span>DELIVERY STATUS</span><b className="status-delivered">ACCEPTED ♥</b></div><div className="receipt-row"><span>TOTAL FEELINGS</span><b>TOO MANY</b></div>
        <div className="receipt-dash" />
        <div className="receipt-promise"><span>PROMISE ON FILE</span>“{data.promise}”</div>
        <div className="barcode">||| || |||| | ||| || |||||</div><small className="receipt-id">DIL-{String(data.createdAt).slice(-8)} · NO RETURNS, ONLY CUDDLES</small>
      </div>
      <div className="receipt-copy"><span className="eyebrow">delivery complete · memory unlocked</span><h2>Screenshot lo.<br />Evidence sambhal ke rakho.</h2><p>Future argument mein kaam aa sakta hai: “You literally clicked obviously.”</p><button className="stage-action" onClick={copy}>{copied ? <Check size={17} /> : <Copy size={17} />}{copied ? 'Response copied!' : 'Copy cute response'}</button><button className="text-action" onClick={onRestart}><RotateCcw size={15} /> replay the chaos</button></div>
    </motion.section>
  )
}
