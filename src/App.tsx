import { useState, useCallback, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Background } from './components/Background'
import type { ProposalData, RecipientStage } from './types'
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
import './App.css'

const DEFAULT_DATA: ProposalData = {
  recipientName: 'Priya',
  senderName: 'Rohan',
  message:
    'Tum mere saath hotaaiye... actually tum pehle se ho, bas officially announce karna baaki hai 😘',
  createdAt: Date.now(),
}

function parseDataFromHash(): ProposalData | null {
  if (typeof window === 'undefined') return null
  const hash = window.location.hash.slice(1)
  if (!hash) return null
  try {
    const json = atob(hash)
    const data = JSON.parse(json)
    if (data.recipientName && data.senderName) return data
  } catch {
    // ignore malformed hash
  }
  return null
}

export default function App() {
  const [mode, setMode] = useState<AppMode>('creator')
  const [data, setData] = useState<ProposalData>(DEFAULT_DATA)
  const [stage, setStage] = useState<RecipientStage>('insert-coin')

  const hashData = useMemo(() => parseDataFromHash(), [])

  // If a recipient link is loaded, switch to recipient mode with that data
  useEffect(() => {
    if (hashData) {
      setData(hashData)
      setMode('recipient')
      setStage('insert-coin')
    }
  }, [hashData])

  const goNext = useCallback((next: RecipientStage) => {
    setStage(next)
  }, [])

  const restart = useCallback(() => {
    setMode('creator')
    setStage('insert-coin')
  }, [])

  const recipient = (
    <div className="recipient-wrap">
      <Background />
      <div className="cabinet">
        <div className="crt-screen">
          <div className="screen-inner">
            {stage === 'insert-coin' && (
              <InsertCoin data={data} onInsert={() => goNext('boot')} />
            )}
            {stage === 'boot' && <Boot onDone={() => goNext('mascot')} />}
            {stage === 'mascot' && (
              <Mascot data={data} onDone={() => goNext('runaway-no')} />
            )}
            {stage === 'runaway-no' && (
              <RunawayNo data={data} onYes={() => goNext('heart-game')} />
            )}
            {stage === 'heart-game' && (
              <HeartGame data={data} onWin={() => goNext('buildup')} />
            )}
            {stage === 'buildup' && (
              <Buildup data={data} onDone={() => goNext('proposal')} />
            )}
            {stage === 'proposal' && (
              <Proposal
                data={data}
                onYes={() => goNext('celebration')}
                onNo={() => goNext('runaway-no')}
              />
            )}
            {stage === 'celebration' && (
              <Celebration data={data} onDone={() => goNext('share')} />
            )}
            {stage === 'share' && <Share data={data} onRestart={restart} />}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="app">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="mode-panel"
      >
        {mode === 'creator' ? <Creator data={data} onGenerate={setData} /> : recipient}
      </motion.div>
    </div>
  )
}
