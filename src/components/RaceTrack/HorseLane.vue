<script setup lang="ts">
import type { Horse } from '@/types'

defineProps<{
  horse: Horse
  laneNumber: number
  animationDuration: number
  active: boolean
}>()
</script>

<template>
  <div class="lane">
    <div class="lane__number">{{ laneNumber }}</div>
    <div class="lane__track">
      <div
        class="lane__horse"
        :class="{ 'lane__horse--racing': active }"
        :style="{ '--anim-duration': `${animationDuration}ms` }"
      >
        <span class="lane__color-dot" :style="{ background: horse.color }" />
        <span class="lane__emoji">🏇</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lane {
  display: flex;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid #e9e9e9;
}

.lane__number {
  width: 28px;
  text-align: center;
  font-size: 11px;
  color: #999;
  flex-shrink: 0;
}

.lane__track {
  flex: 1;
  position: relative;
  height: 100%;
  overflow: hidden;
  background: #f7f7f7;
}

.lane__track::after {
  content: '';
  position: absolute;
  right: 12px;
  top: 6px;
  bottom: 6px;
  border-right: 3px dashed #555;
  opacity: 0.5;
}

.lane__horse {
  position: absolute;
  left: 4px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 3px;
}

.lane__horse--racing {
  animation: horse-run var(--anim-duration, 5000ms) linear forwards;
}

@keyframes horse-run {
  from { left: 4px; }
  to   { left: calc(100% - 52px); }
}

.lane__color-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.lane__emoji {
  font-size: 26px;
  line-height: 1;
  display: block;
  transform: scaleX(-1);
}
</style>
