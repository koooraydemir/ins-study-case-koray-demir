import { defineStore } from 'pinia'
import { ref, computed, nextTick } from 'vue'
import type { Round, RaceResult, GameStatus } from '@/types'
import { TOTAL_ROUNDS, ROUND_DISTANCES, HORSES_PER_ROUND } from '@/constants/game'
import { simulateRound, getMaxAnimationDuration } from '@/utils/raceEngine'
import { useHorsesStore } from './horses'

export const useRaceStore = defineStore('race', () => {
  const schedule = ref<Round[]>([])
  const currentRoundIndex = ref(-1)
  const status = ref<GameStatus>('idle')
  const animationActive = ref(false)
  const pendingResults = ref<RaceResult[] | null>(null)

  let resolvePause: (() => void) | null = null

  const currentRound = computed<Round | null>(() =>
    currentRoundIndex.value >= 0 ? (schedule.value[currentRoundIndex.value] ?? null) : null,
  )

  const completedRounds = computed<Round[]>(() =>
    schedule.value.filter((r) => r.results !== null),
  )

  function generateSchedule() {
    const horsesStore = useHorsesStore()
    horsesStore.generateHorses()

    schedule.value = ROUND_DISTANCES.map((distance, i) => ({
      roundNumber: i + 1,
      distance,
      horses: horsesStore.pickRandom(HORSES_PER_ROUND),
      results: null,
    }))

    currentRoundIndex.value = -1
    status.value = 'scheduled'
    animationActive.value = false
  }

  async function startRace() {
    if (status.value !== 'scheduled' && status.value !== 'paused') return
    status.value = 'running'
    await runFromCurrentRound()
  }

  function pauseRace() {
    if (status.value !== 'running') return
    status.value = 'paused'
  }

  function resumeRace() {
    if (status.value !== 'paused') return
    status.value = 'running'
    resolvePause?.()
    resolvePause = null
  }

  async function runFromCurrentRound() {
    const startIndex = currentRoundIndex.value < 0 ? 0 : currentRoundIndex.value

    for (let i = startIndex; i < TOTAL_ROUNDS; i++) {
      if (status.value === 'paused') await waitForResume()
      if (status.value !== 'running') break

      currentRoundIndex.value = i
      await runRound(i)

      if (status.value === 'paused') await waitForResume()
    }

    if (status.value === 'running') status.value = 'finished'
  }

  async function runRound(roundIndex: number) {
    const round = schedule.value[roundIndex]
    if (!round) return

    const results = simulateRound(round.horses, round.distance)
    const maxDuration = getMaxAnimationDuration(results)

    pendingResults.value = results
    await nextTick()
    animationActive.value = true

    await new Promise<void>((res) => setTimeout(res, maxDuration + 300))
    animationActive.value = false

    schedule.value[roundIndex] = { ...round, results }
    pendingResults.value = null

    await new Promise<void>((res) => setTimeout(res, 500))
  }

  function waitForResume(): Promise<void> {
    return new Promise((resolve) => {
      resolvePause = resolve
    })
  }

  return {
    schedule,
    currentRoundIndex,
    currentRound,
    completedRounds,
    status,
    animationActive,
    pendingResults,
    generateSchedule,
    startRace,
    pauseRace,
    resumeRace,
  }
})
