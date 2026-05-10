<script setup lang="ts">
import { computed } from 'vue'
import { useRaceStore } from '@/stores/race'
import HorseList from '@/components/HorseList/HorseList.vue'
import RaceTrack from '@/components/RaceTrack/RaceTrack.vue'
import Program from '@/components/Program/Program.vue'
import Results from '@/components/Results/Results.vue'

const raceStore = useRaceStore()

const canGenerate = computed(() =>
  raceStore.status === 'idle' || raceStore.status === 'finished',
)

const startPauseLabel = computed(() => {
  if (raceStore.status === 'running') return 'PAUSE'
  if (raceStore.status === 'paused') return 'RESUME'
  return 'START'
})

function handleStartPause() {
  if (raceStore.status === 'running') {
    raceStore.pauseRace()
  } else if (raceStore.status === 'paused') {
    raceStore.resumeRace()
  } else {
    raceStore.startRace()
  }
}
</script>

<template>
  <div class="app">
    <header class="app__header">
      <span class="app__title">Horse Racing</span>
      <div class="app__controls">
        <button
          class="btn btn--secondary"
          :disabled="!canGenerate"
          data-testid="generate-btn"
          @click="raceStore.generateSchedule()"
        >
          GENERATE PROGRAM
        </button>
        <button
          class="btn btn--primary"
          :disabled="raceStore.status === 'idle' || raceStore.status === 'finished'"
          data-testid="start-pause-btn"
          @click="handleStartPause"
        >
          {{ startPauseLabel }}
        </button>
      </div>
    </header>

    <main class="app__main">
      <HorseList />
      <RaceTrack />
      <aside class="app__right-panel">
        <Program />
        <Results />
      </aside>
    </main>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: system-ui, sans-serif;
  background: #fff;
}

.app__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  height: 48px;
  background: #1a237e;
  color: #fff;
  flex-shrink: 0;
  gap: 12px;
}

.app__title {
  font-size: 16px;
  font-weight: 700;
}

.app__controls {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 6px 16px;
  font-size: 12px;
  font-weight: 700;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn--secondary {
  background: #fff;
  color: #1a237e;
}

.btn--primary {
  background: #e53935;
  color: #fff;
}

.btn:not(:disabled):hover {
  opacity: 0.85;
}

.app__main {
  display: grid;
  grid-template-columns: 200px 1fr 500px;
  flex: 1;
  overflow: hidden;
}

.app__right-panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
  border-left: 1px solid #ddd;
}
</style>
