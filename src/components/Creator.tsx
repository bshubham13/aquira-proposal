import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Clipboard, Eye, Heart, PackageCheck, Sparkles } from 'lucide-react'
import { normalizeProposal, proposalUrl } from '../proposal'
import type { ProposalData } from '../types'

export function Creator({ initialData, onPreview }: { initialData: ProposalData; onPreview: (data: ProposalData) => void }) {
  const [draft, setDraft] = useState(initialData)
  const [packed, setPacked] = useState(false)
  const [copied, setCopied] = useState(false)
  const data = useMemo(() => normalizeProposal(draft), [draft])
  const link = packed ? proposalUrl(data) : ''

  const update = (key: keyof ProposalData, value: string) => {
    setPacked(false)
    setDraft((current) => ({ ...current, [key]: value }))
  }

  const copy = async () => {
    await navigator.clipboard.writeText(link)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2200)
  }

  const pack = () => {
    setDraft((current) => ({ ...current, createdAt: Date.now() }))
    setPacked(true)
  }

  return (
    <div className="creator-layout">
      <section className="creator-intro">
        <div className="brand-lockup"><span className="brand-orbit">✦</span><span>AQUIRACRAFT / 001</span></div>
        <div className="creator-kicker">after-hours feelings department</div>
        <h1>Pack a little <em>chaos.</em><br />Deliver a big <em>feeling.</em></h1>
        <p>Ek personal midnight delivery banao—inside jokes, soft moments aur ek sawaal jo ordinary link jaisa bilkul feel nahi hoga.</p>
        <div className="creator-proof">
          <span><Heart size={15} fill="currentColor" /> emotionally fragile</span>
          <span><Sparkles size={15} /> internet-approved</span>
        </div>
        <div className="parcel-preview" data-tone={draft.tone}>
          <div className="parcel-tape">DO NOT BEND THE FEELINGS</div>
          <small>EXPRESS DILIVERY · 11:11 PM</small>
          <strong>TO: {data.recipientName}</strong>
          <span>aka “{data.nickname}”</span>
          <div className="parcel-route"><i /> DEL → DIL <i /></div>
          <small>FROM: {data.senderName} · handle with pyaar</small>
        </div>
      </section>

      <section className="creator-card">
        <div className="creator-card-head">
          <div><span>CREATOR STUDIO</span><h2>Fill the parcel details</h2></div>
          <span className="step-chip">01 / 01</span>
        </div>
        <div className="creator-form">
          <div className="form-row">
            <label>Unka naam<input value={draft.recipientName} maxLength={24} onChange={(e) => update('recipientName', e.target.value)} placeholder="Aashi" /></label>
            <label>Aapka naam<input value={draft.senderName} maxLength={24} onChange={(e) => update('senderName', e.target.value)} placeholder="Kabir" /></label>
          </div>
          <label>Secret nickname <span>sirf cute logon ke liye</span><input value={draft.nickname} maxLength={28} onChange={(e) => update('nickname', e.target.value)} placeholder="sunshine" /></label>
          <label>Ek core memory <span>specific = extra dil points</span><textarea value={draft.memory} maxLength={150} onChange={(e) => update('memory', e.target.value)} /></label>
          <label>Dil ki main baat<textarea value={draft.message} maxLength={180} onChange={(e) => update('message', e.target.value)} /></label>
          <label>Ek tiny promise<input value={draft.promise} maxLength={110} onChange={(e) => update('promise', e.target.value)} /></label>
          <fieldset className="tone-picker">
            <legend>Parcel mood</legend>
            {(['peach', 'lilac', 'mint'] as const).map((tone) => (
              <button key={tone} type="button" className={draft.tone === tone ? 'selected' : ''} onClick={() => update('tone', tone)}><i className={`swatch ${tone}`} />{tone}</button>
            ))}
          </fieldset>
          <button className="primary-action" onClick={pack}><PackageCheck size={19} /> Seal & generate delivery</button>
        </div>

        <AnimatePresence>
          {packed && (
            <motion.div className="packed-panel" initial={{ opacity: 0, y: 18, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }}>
              <div className="packed-burst"><Check size={22} strokeWidth={3} /></div>
              <div><strong>Parcel sealed for {data.recipientName}!</strong><span>Tracking ID: DIL-{String(data.createdAt).slice(-6)}</span></div>
              <div className="generated-link"><span>{link}</span><button onClick={copy}>{copied ? <Check size={17} /> : <Clipboard size={17} />}{copied ? 'Copied' : 'Copy'}</button></div>
              <button className="preview-action" onClick={() => onPreview(data)}><Eye size={17} /> Preview their journey</button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  )
}
