<script setup lang="ts">
import { computed } from 'vue'
import { useRaceStore } from '@/stores/race'
import HorseLane from './HorseLane.vue'

const raceStore = useRaceStore()

const round = computed(() => raceStore.currentRound)

const laneData = computed(() => {
  if (!round.value) return []

  const pending = raceStore.pendingResults
  const durationMap = pending ? new Map(pending.map((r) => [r.horse.id, r.animationDuration])) : null

  return round.value.horses.map((horse, i) => ({
    horse,
    laneNumber: i + 1,
    animationDuration: durationMap?.get(horse.id) ?? 5000,
  }))
})
</script>

<template>
  <div class="race-track">
    <div v-if="!round" class="race-track__placeholder">
      <p>Yarışı başlatmak için program oluştur</p>
    </div>

    <template v-else>
      <div class="race-track__header">
        <span class="race-track__label">
          Round {{ round.roundNumber }} &mdash; {{ round.distance }}m
        </span>
        <span class="race-track__finish-label">🏁 FINISH</span>
      </div>

      <div class="race-track__lanes">
        <HorseLane
          v-for="lane in laneData"
          :key="`${raceStore.currentRoundIndex}-${lane.horse.id}`"
          :horse="lane.horse"
          :lane-number="lane.laneNumber"
          :animation-duration="lane.animationDuration"
          :active="raceStore.animationActive"
        />
      </div>
    </template>
  </div>
</template>

<style scoped>
.race-track {
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ddd;
  overflow: hidden;
}

.race-track__placeholder {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #bbb;
  font-size: 13px;
}

.race-track__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 12px 6px 40px;
  background: #f5f5f5;
  border-bottom: 1px solid #ddd;
  font-size: 12px;
  font-weight: 600;
}

.race-track__label {
  color: #333;
}

.race-track__finish-label {
  color: #c0392b;
  font-size: 12px;
  font-weight: 700;
}

.race-track__lanes {
  flex: 1;
  overflow-y: auto;
  padding: 4px 8px 4px 0;
}
</style>
