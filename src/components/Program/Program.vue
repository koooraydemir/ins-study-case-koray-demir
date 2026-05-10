<script setup lang="ts">
import { useRaceStore } from '@/stores/race'

const raceStore = useRaceStore()
</script>

<template>
  <div class="program">
    <div class="program__header">Program</div>

    <div class="program__body">
      <div v-if="raceStore.schedule.length === 0" class="program__empty">
        Henüz program oluşturulmadı
      </div>

      <div
        v-for="round in raceStore.schedule"
        :key="round.roundNumber"
        class="program__round"
        :class="{
          'program__round--active': round.roundNumber === (raceStore.currentRound?.roundNumber ?? 0),
          'program__round--done': round.results !== null,
        }"
      >
        <div class="program__round-title">
          Round {{ round.roundNumber }} &mdash; {{ round.distance }}m
        </div>
        <table class="program__table">
          <thead>
            <tr>
              <th>Pos.</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(horse, i) in round.horses" :key="horse.id">
              <td>{{ i + 1 }}</td>
              <td>
                <span class="dot" :style="{ backgroundColor: horse.color }" />
                {{ horse.name }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.program {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-right: 1px solid #ddd;
}

.program__header {
  padding: 8px 12px;
  background: #f0f0f0;
  font-weight: 600;
  font-size: 13px;
  border-bottom: 1px solid #ddd;
}

.program__body {
  overflow-y: auto;
  flex: 1;
}

.program__empty {
  padding: 16px 12px;
  color: #bbb;
  font-size: 12px;
}

.program__round {
  padding: 6px 0;
  border-bottom: 1px solid #eee;
}

.program__round--active .program__round-title {
  background: #fff3e0;
  color: #e65100;
}

.program__round--done .program__round-title {
  color: #888;
}

.program__round-title {
  padding: 4px 12px;
  font-size: 11px;
  font-weight: 600;
  color: #555;
  background: #f9f9f9;
}

.program__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 11px;
}

.program__table th {
  padding: 3px 8px;
  text-align: left;
  color: #999;
  font-weight: 600;
}

.program__table td {
  padding: 2px 8px;
  color: #444;
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
