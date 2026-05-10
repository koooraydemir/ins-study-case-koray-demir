import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useHorsesStore } from '../horses'
import { TOTAL_HORSES, HORSE_COLORS } from '@/constants/game'

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('useHorsesStore', () => {
  describe('generateHorses', () => {
    it('generates exactly TOTAL_HORSES horses', () => {
      const store = useHorsesStore()
      store.generateHorses()
      expect(store.horses).toHaveLength(TOTAL_HORSES)
    })

    it('each horse has a condition between 1 and 100', () => {
      const store = useHorsesStore()
      store.generateHorses()
      store.horses.forEach((h) => {
        expect(h.condition).toBeGreaterThanOrEqual(1)
        expect(h.condition).toBeLessThanOrEqual(100)
      })
    })

    it('each horse has a unique id', () => {
      const store = useHorsesStore()
      store.generateHorses()
      const ids = store.horses.map((h) => h.id)
      expect(new Set(ids).size).toBe(TOTAL_HORSES)
    })

    it('each horse has a unique color from HORSE_COLORS', () => {
      const store = useHorsesStore()
      store.generateHorses()
      const colors = store.horses.map((h) => h.color)
      expect(new Set(colors).size).toBe(TOTAL_HORSES)
      colors.forEach((c) => expect(HORSE_COLORS).toContain(c))
    })

    it('regenerating replaces previous horses', () => {
      const store = useHorsesStore()
      store.generateHorses()
      const firstConditions = store.horses.map((h) => h.condition)
      store.generateHorses()
      expect(store.horses).toHaveLength(TOTAL_HORSES)
      const secondConditions = store.horses.map((h) => h.condition)
      expect(secondConditions).toHaveLength(firstConditions.length)
    })
  })

  describe('pickRandom', () => {
    it('returns the requested number of horses', () => {
      const store = useHorsesStore()
      store.generateHorses()
      expect(store.pickRandom(10)).toHaveLength(10)
    })

    it('returns horses that exist in the main list', () => {
      const store = useHorsesStore()
      store.generateHorses()
      const picked = store.pickRandom(10)
      const allIds = new Set(store.horses.map((h) => h.id))
      picked.forEach((h) => expect(allIds.has(h.id)).toBe(true))
    })

    it('returns no duplicates', () => {
      const store = useHorsesStore()
      store.generateHorses()
      const picked = store.pickRandom(10)
      const ids = picked.map((h) => h.id)
      expect(new Set(ids).size).toBe(10)
    })
  })
})
