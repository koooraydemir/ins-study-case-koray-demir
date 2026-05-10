export interface Horse {
  id: number
  name: string
  color: string
  condition: number
}

export interface RaceResult {
  position: number
  horse: Horse
  animationDuration: number
}

export interface Round {
  roundNumber: number
  distance: number
  horses: Horse[]
  results: RaceResult[] | null
}

export type GameStatus = 'idle' | 'scheduled' | 'running' | 'paused' | 'finished'
