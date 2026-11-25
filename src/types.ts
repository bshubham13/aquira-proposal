export interface ProposalData {
  recipientName: string
  senderName: string
  message: string
  createdAt: number
}

export interface StageContext {
  data: ProposalData
  onComplete: () => void
}

export type RecipientStage =
  | 'insert-coin'
  | 'boot'
  | 'mascot'
  | 'runaway-no'
  | 'heart-game'
  | 'buildup'
  | 'proposal'
  | 'celebration'
  | 'share'

export type AppMode = 'creator' | 'recipient'
