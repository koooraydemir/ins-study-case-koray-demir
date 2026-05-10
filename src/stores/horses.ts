import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Horse } from '@/types'
import { HORSE_NAMES, HORSE_COLORS } from '@/constants/game'

export const useHorsesStore = defineStore('horses', () => {
  const horses = ref<Horse[]>([])

  function generateHorses() {
    horses.value = HORSE_NAMES.map((name, i) => ({
      id: i + 1,
      name,
      color: HORSE_COLORS[i]!,
      condition: Math.floor(Math.random() * 100) + 1,
    }))
  }

  function pickRandom(n: number): Horse[] {
    return [...horses.value].sort(() => Math.random() - 0.5).slice(0, n)
  }

  return { horses, generateHorses, pickRandom }
})
