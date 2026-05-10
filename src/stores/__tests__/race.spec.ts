import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useRaceStore } from '../race'
import { TOTAL_ROUNDS, ROUND_DISTANCES, HORSES_PER_ROUND } from '@/constants/game'

beforeEach(() => {
  setActivePinia(createPinia())
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('useRaceStore', () => {
  describe('generateSchedule', () => {
    it('sets status to scheduled', () => {
      const store = useRaceStore()
      store.generateSchedule()
      expect(store.status).toBe('scheduled')
    })

    it('creates exactly TOTAL_ROUNDS rounds', () => {
      const store = useRaceStore()
      store.generateSchedule()
      expect(store.schedule).toHaveLength(TOTAL_ROUNDS)
    })

    it('rounds have correct distances in sequence', () => {
      const store = useRaceStore()
      store.generateSchedule()
      const distances = store.schedule.map((r) => r.distance)
      expect(distances).toEqual([...ROUND_DISTANCES])
    })

    it('each round has HORSES_PER_ROUND horses', () => {
      const store = useRaceStore()
      store.generateSchedule()
      store.schedule.forEach((r) => {
        expect(r.horses).toHaveLength(HORSES_PER_ROUND)
      })
    })

    it('all rounds start with results null', () => {
      const store = useRaceStore()
      store.generateSchedule()
      store.schedule.forEach((r) => expect(r.results).toBeNull())
    })

    it('resets currentRoundIndex to -1', () => {
      const store = useRaceStore()
      store.generateSchedule()
      expect(store.currentRoundIndex).toBe(-1)
    })

    it('currentRound is null before race starts', () => {
      const store = useRaceStore()
      store.generateSchedule()
      expect(store.currentRound).toBeNull()
    })
  })

  describe('pauseRace / resumeRace', () => {
    it('pauseRace sets status to paused only when running', () => {
      const store = useRaceStore()
      store.generateSchedule()
      store.pauseRace()
      expect(store.status).toBe('scheduled')

      store.startRace()
      store.pauseRace()
      expect(store.status).toBe('paused')
    })

    it('resumeRace sets status to running only when paused', () => {
      const store = useRaceStore()
      store.generateSchedule()
      store.startRace()
      store.pauseRace()
      expect(store.status).toBe('paused')
      store.resumeRace()
      expect(store.status).toBe('running')
    })

    it('resumeRace is a no-op when not paused', () => {
      const store = useRaceStore()
      store.generateSchedule()
      store.resumeRace()
      expect(store.status).toBe('scheduled')
    })
  })

  describe('completedRounds', () => {
    it('returns empty array before any round finishes', () => {
      const store = useRaceStore()
      store.generateSchedule()
      expect(store.completedRounds).toHaveLength(0)
    })
  })

  describe('startRace', () => {
    it('sets status to running', () => {
      const store = useRaceStore()
      store.generateSchedule()
      store.startRace()
      expect(store.status).toBe('running')
    })

    it('is a no-op when status is idle', () => {
      const store = useRaceStore()
      store.startRace()
      expect(store.status).toBe('idle')
    })
  })
})
