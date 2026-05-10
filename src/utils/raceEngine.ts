import type { Horse, RaceResult } from '@/types'
import { RACE_ANIMATION_MS } from '@/constants/game'

export function simulateRound(horses: Horse[], distance: number): RaceResult[] {
  const conditionWeight = 0.35 + (distance - 1200) / 5000

  const ranked = horses
    .map((horse) => ({
      horse,
      speed: 0.45 + (horse.condition / 100) * conditionWeight + Math.random() * 0.1,
    }))
    .sort((a, b) => b.speed - a.speed)

  const best = ranked[0]!.speed

  return ranked.map((item, idx) => ({
    position: idx + 1,
    horse: item.horse,
    animationDuration: Math.round(RACE_ANIMATION_MS * (best / item.speed)),
  }))
}

export function getMaxAnimationDuration(results: RaceResult[]): number {
  return Math.max(...results.map((r) => r.animationDuration))
}
