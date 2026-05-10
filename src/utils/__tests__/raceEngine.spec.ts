import { describe, it, expect } from 'vitest'
import { simulateRound, getMaxAnimationDuration } from '../raceEngine'
import type { Horse } from '@/types'
import { RACE_ANIMATION_MS } from '@/constants/game'

function makeHorses(count: number, condition = 50): Horse[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Horse ${i + 1}`,
    color: '#000',
    condition,
  }))
}

describe('simulateRound', () => {
  it('returns the same number of results as input horses', () => {
    const horses = makeHorses(10)
    const results = simulateRound(horses, 1200)
    expect(results).toHaveLength(10)
  })

  it('assigns positions from 1 to n in order', () => {
    const results = simulateRound(makeHorses(10), 1400)
    results.forEach((r, i) => expect(r.position).toBe(i + 1))
  })

  it('winner has the shortest animationDuration', () => {
    const results = simulateRound(makeHorses(10), 1600)
    const winner = results[0]
    const last = results[results.length - 1]
    expect(winner!.animationDuration).toBeLessThanOrEqual(last!.animationDuration)
  })

  it('winner animationDuration equals RACE_ANIMATION_MS', () => {
    const results = simulateRound(makeHorses(10), 1800)
    expect(results[0]!.animationDuration).toBe(RACE_ANIMATION_MS)
  })

  it('each result references the correct horse object', () => {
    const horses = makeHorses(5)
    const results = simulateRound(horses, 1200)
    const resultIds = results.map((r) => r.horse.id).sort((a, b) => a - b)
    const inputIds = horses.map((h) => h.id).sort((a, b) => a - b)
    expect(resultIds).toEqual(inputIds)
  })

  it('higher condition horse wins more often over many runs', () => {
    const fastHorse: Horse = { id: 1, name: 'Fast', color: '#f00', condition: 100 }
    const slowHorses = Array.from({ length: 9 }, (_, i) => ({
      id: i + 2,
      name: `Slow ${i}`,
      color: '#000',
      condition: 1,
    }))
    const horses = [fastHorse, ...slowHorses]

    let wins = 0
    for (let i = 0; i < 100; i++) {
      const results = simulateRound(horses, 1200)
      if (results[0]!.horse.id === 1) wins++
    }
    expect(wins).toBeGreaterThan(70)
  })
})

describe('getMaxAnimationDuration', () => {
  it('returns the maximum duration from results', () => {
    const results = simulateRound(makeHorses(10), 1200)
    const max = getMaxAnimationDuration(results)
    const expected = Math.max(...results.map((r) => r.animationDuration))
    expect(max).toBe(expected)
  })
})
