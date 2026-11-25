import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, Mail, ArrowLeft, Heart } from 'lucide-react'
import { ProposalData } from '../../types'

export function Share({
  data,
  onRestart,
}: {
  data: ProposalData
  onRestart: () => void
}) {
  const [copied, setCopied] = useState(false)

  const link = `${window.location.origin}${window.location.pathname}#${btoa(
    JSON.stringify(data)
  )}`

  const copyLink = () => {
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="stage share-stage"
    >
      <div className="share-body">
        <div className="share-badge neon-cyan">YOUR EXPERIENCE IS READY</div>
        <h2 className="share-title">
          <Heart size={24} /> {data.recipientName} ke liye ek surprise
        </h2>
        <p className="share-sub">
          Is link ko bhejo {data.recipientName} ko — unhe yeh poora experience milega.
        </p>

        <div className="share-card">
          <div className="share-link-wrap">
            <div className="share-link">{link}</div>
            <button className="btn-copy" onClick={copyLink}>
              {copied ? (
                <>
                  <Mail size={16} style={{ marginRight: 6 }} /> Copied!
                </>
              ) : (
                <>
                  <Link size={16} style={{ marginRight: 6 }} /> Copy Link
                </>
              )}
            </button>
          </div>
        </div>

        <div className="share-hint">
          Agar unne haan kaha, toh celebration screen dikhegi agar unne haan nahi kaha,
          toh 'No' button bhaagega. Bas itna simple hai. 😉
        </div>

        <div className="share-actions">
          <button className="btn-restart" onClick={onRestart}>
            <ArrowLeft size={16} /> Start over
          </button>
          <button className="btn-open" onClick={() => window.open(link, '_blank')}>
            Open in new tab ↗
          </button>
        </div>
      </div>
    </motion.div>
  )
}
