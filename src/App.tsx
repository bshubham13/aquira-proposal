import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Background } from './components/Background'
import { Creator } from './components/Creator'
import { InsertCoin } from './components/stages/InsertCoin'
import { Boot } from './components/stages/Boot'
import { Mascot } from './components/stages/Mascot'
import { RunawayNo } from './components/stages/RunawayNo'
import { HeartGame } from './components/stages/HeartGame'
import { Buildup } from './components/stages/Buildup'
import { Proposal } from './components/stages/Proposal'
import { Celebration } from './components/stages/Celebration'
import { Share } from './components/stages/Share'
import { decodeProposal, DEFAULT_DATA } from './proposal'
import type { AppMode, ProposalData, RecipientStage } from './types'
import './App.css'

const FLOW: RecipientStage[] = [
  'insert-coin', 'boot', 'mascot', 'runaway-no', 'heart-game',
  'buildup', 'proposal', 'celebration', 'share',
]

export default function App() {
  const initialData = decodeProposal(window.location.hash)
  const [mode, setMode] = useState<AppMode>(initialData ? 'recipient' : 'creator')
  const [data, setData] = useState<ProposalData>(initialData ?? DEFAULT_DATA)
  const [stage, setStage] = useState<RecipientStage>('insert-coin')

  useEffect(() => {
    const syncHash = () => {
      const shared = decodeProposal(window.location.hash)
      if (shared) {
        setData(shared)
        setMode('recipient')
        setStage('insert-coin')
      }
    }
    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [])

  const next = useCallback(() => {
    setStage((current) => FLOW[Math.min(FLOW.indexOf(current) + 1, FLOW.length - 1)])
  }, [])

  const preview = useCallback((proposal: ProposalData) => {
    setData(proposal)
    setStage('insert-coin')
    setMode('recipient')
  }, [])

  const backToStudio = useCallback(() => {
    history.replaceState(null, '', window.location.pathname)
    setMode('creator')
    setStage('insert-coin')
  }, [])

  return (
    <main className={`app tone-${data.tone}`}>
      <Background />
      <AnimatePresence mode="wait">
        {mode === 'creator' ? (
          <motion.div key="creator" className="mode-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Creator initialData={data} onPreview={preview} />
          </motion.div>
        ) : (
          <motion.div key="recipient" className="recipient-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="recipient-topbar">
              <span>MIDNIGHT DILIVERY™</span>
              <button onClick={backToStudio}>← creator studio</button>
            </div>
            <div className="delivery-shell">
              <div className="shell-stamp">FRAGILE FEELINGS</div>
              <div className="journey-progress" aria-label={`Journey step ${FLOW.indexOf(stage) + 1} of ${FLOW.length}`}>
                {FLOW.map((item) => <span key={item} className={FLOW.indexOf(item) <= FLOW.indexOf(stage) ? 'active' : ''} />)}
              </div>
              <div className="experience-window">
                <AnimatePresence mode="wait">
                  {stage === 'insert-coin' && <InsertCoin key={stage} data={data} onInsert={next} />}
                  {stage === 'boot' && <Boot key={stage} data={data} onDone={next} />}
                  {stage === 'mascot' && <Mascot key={stage} data={data} onDone={next} />}
                  {stage === 'runaway-no' && <RunawayNo key={stage} data={data} onYes={next} />}
                  {stage === 'heart-game' && <HeartGame key={stage} data={data} onWin={next} />}
                  {stage === 'buildup' && <Buildup key={stage} data={data} onDone={next} />}
                  {stage === 'proposal' && <Proposal key={stage} data={data} onYes={next} onNo={() => undefined} />}
                  {stage === 'celebration' && <Celebration key={stage} data={data} onDone={next} />}
                  {stage === 'share' && <Share key={stage} data={data} onRestart={() => setStage('insert-coin')} />}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
