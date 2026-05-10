<script setup lang="ts">
import { useRaceStore } from '@/stores/race'

const raceStore = useRaceStore()
</script>

<template>
  <div class="results">
    <div class="results__header">Results</div>

    <div class="results__body">
      <div v-if="raceStore.completedRounds.length === 0" class="results__empty">
        Turlar tamamlandıkça burada görünür
      </div>

      <div
        v-for="round in raceStore.completedRounds"
        :key="round.roundNumber"
        class="results__round"
      >
        <div class="results__round-title">
          Round {{ round.roundNumber }} &mdash; {{ round.distance }}m
        </div>
        <table class="results__table">
          <thead>
            <tr>
              <th>Pos.</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="result in round.results" :key="result.horse.id">
              <td class="pos-cell">{{ result.position }}</td>
              <td>
                <span class="dot" :style="{ backgroundColor: result.horse.color }" />
                {{ result.horse.name }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.results {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.results__header {
  padding: 8px 12px;
  background: #f0f0f0;
  font-weight: 600;
  font-size: 13px;
  border-bottom: 1px solid #ddd;
}

.results__body {
  overflow-y: auto;
  flex: 1;
}

.results__empty {
  padding: 16px 12px;
  color: #bbb;
  font-size: 12px;
}

.results__round {
  padding: 6px 0;
  border-bottom: 1px solid #eee;
}

.results__round-title {
  padding: 5px 12px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: #666;
  background: #f4f4f4;
}

.results__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 11px;
}

.results__table th {
  padding: 3px 8px;
  text-align: left;
  color: #999;
  font-weight: 600;
}

.results__table td {
  padding: 2px 8px;
  color: #444;
}

.pos-cell {
  font-weight: 700;
  color: #333;
  width: 30px;
}

.dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 4px;
  vertical-align: middle;
}
</style>
