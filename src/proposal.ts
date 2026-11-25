import type { ProposalData } from './types'

export const DEFAULT_DATA: ProposalData = {
  recipientName: 'Aashi',
  senderName: 'Kabir',
  nickname: 'sunshine',
  memory: 'Woh chai wali evening, jab 20 minute ki coffee 3 ghante chali thi.',
  message: 'Tumhare saath normal days bhi highlight reel jaise lagte hain.',
  promise: 'Main tumhare fries bina pooche nahi khaunga. Mostly.',
  tone: 'peach',
  createdAt: Date.now(),
}

export function normalizeProposal(value: Partial<ProposalData>): ProposalData {
  return {
    ...DEFAULT_DATA,
    ...value,
    recipientName: value.recipientName?.trim() || DEFAULT_DATA.recipientName,
    senderName: value.senderName?.trim() || DEFAULT_DATA.senderName,
    nickname: value.nickname?.trim() || DEFAULT_DATA.nickname,
    memory: value.memory?.trim() || DEFAULT_DATA.memory,
    message: value.message?.trim() || DEFAULT_DATA.message,
    promise: value.promise?.trim() || DEFAULT_DATA.promise,
  }
}

export function encodeProposal(data: ProposalData) {
  const bytes = new TextEncoder().encode(JSON.stringify(data))
  let binary = ''
  bytes.forEach((byte) => (binary += String.fromCharCode(byte)))
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

export function decodeProposal(hash: string): ProposalData | null {
  const raw = hash.replace(/^#p=/, '').replace(/^#/, '')
  if (!raw) return null
  try {
    const base64 = raw.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')
    const binary = atob(padded)
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
    return normalizeProposal(JSON.parse(new TextDecoder().decode(bytes)))
  } catch {
    return null
  }
}

export function proposalUrl(data: ProposalData) {
  return `${window.location.origin}${window.location.pathname}#p=${encodeProposal(data)}`
}
