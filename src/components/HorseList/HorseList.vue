<script setup lang="ts">
import { useHorsesStore } from '@/stores/horses'

const horsesStore = useHorsesStore()
</script>

<template>
  <div class="horse-list">
    <div class="horse-list__header">
      <span>Horse List (1-20)</span>
    </div>
    <div class="horse-list__table-wrapper">
      <table class="horse-list__table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Condition</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="horse in horsesStore.horses" :key="horse.id">
            <td>{{ horse.name }}</td>
            <td>{{ horse.condition }}</td>
            <td>
              <span class="color-chip" :style="{ backgroundColor: horse.color }" />
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="horsesStore.horses.length === 0" class="horse-list__empty">
        Program oluşturmak için Generate'e bas
      </div>
    </div>
  </div>
</template>

<style scoped>
.horse-list {
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ddd;
  overflow: hidden;
}

.horse-list__header {
  padding: 8px 12px;
  background: #f0f0f0;
  font-weight: 600;
  font-size: 13px;
  border-bottom: 1px solid #ddd;
}

.horse-list__table-wrapper {
  overflow-y: auto;
  flex: 1;
}

.horse-list__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.horse-list__table th {
  position: sticky;
  top: 0;
  background: #fafafa;
  padding: 6px 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-weight: 600;
}

.horse-list__table td {
  padding: 5px 8px;
  border-bottom: 1px solid #f0f0f0;
}

.horse-list__table tr:hover td {
  background: #f9f9f9;
}

.color-chip {
  display: inline-block;
  width: 20px;
  height: 14px;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.15);
}

.horse-list__empty {
  padding: 24px 12px;
  color: #999;
  font-size: 12px;
  text-align: center;
}
</style>
