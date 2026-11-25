import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, ArrowRight, Copy, Check } from 'lucide-react'
import type { ProposalData } from '../types'

export function Creator({
  data,
  onGenerate,
}: {
  data: ProposalData
  onGenerate: (d: ProposalData) => void
}) {
  const [recipientName, setRecipientName] = useState(data.recipientName)
  const [senderName, setSenderName] = useState(data.senderName)
  const [message, setMessage] = useState(data.message)
  const [link, setLink] = useState('')
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    const next: ProposalData = {
      recipientName: recipientName.trim() || 'Priya',
      senderName: senderName.trim() || 'Rohan',
      message: message.trim() || 'Tum mere saath hotaaiye... actually tum pehle se ho, bas officially announce karna baaki hai 😘',
      createdAt: Date.now(),
    }
    const hash = btoa(JSON.stringify(next))
    const fullLink = `${window.location.origin}${window.location.pathname}#${hash}`
    setLink(fullLink)
    // Push to URL so the link is real and shareable
    window.location.hash = hash
    onGenerate(next)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="creator-wrap">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="creator-card"
      >
        <div className="creator-header">
          <div className="creator-badge">CREATOR MODE</div>
          <h1 style={{ fontSize: '1.35rem', lineHeight: 1.1, marginBottom: '0.5rem' }}>
            Banalo apna <span className="neon-pink">Confession Arcade</span>
          </h1>
          <p className="creator-sub">
            Ek personal proposal experience banao apne special person ke liye.
            Unhone kya umeed ki hogi? Unhe surprise do. 💌
          </p>
        </div>

        <form className="creator-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-field">
            <label className="form-label">Recipient ka naam</label>
            <input
              className="form-input"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="e.g. Priya"
            />
          </div>
          <div className="form-field">
            <label className="form-label">Aapka naam</label>
            <input
              className="form-input"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="e.g. Rohan"
            />
          </div>
          <div className="form-field">
            <label className="form-label">Personal message</label>
            <textarea
              className="form-input form-textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Kuch khaas likho unke liye..."
            />
          </div>
          <button className="btn-create" onClick={handleGenerate}>
            <Play size={18} />
            Experience generate karo
          </button>
        </form>

        {link && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="creator-share"
          >
            <div className="share-header">
              <span className="share-label">Apna experience link:</span>
              <div className="share-actions">
                <button className="btn-copy" onClick={copyLink}>
                  {copied ? (
                    <>
                      <Check size={16} /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={16} /> Copy Link
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="share-link">{link}</div>
            <p className="share-hint">
              Is link ko unhe bhejo — unhe directly recipient experience milega, creator mode nahi.
            </p>
            <button className="btn-open" onClick={handleGenerate}>
              <ArrowRight size={16} /> Khole experience
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
