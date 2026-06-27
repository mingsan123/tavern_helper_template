<template>
  <div class="clothing-panel">
    <div class="section-label">着装详情</div>
    <div class="clothing-grid">
      <div
        v-for="(value, slot) in store.data.冥灵.衣着"
        :key="slot"
        class="clothing-item"
        :class="{ empty: value === '无' }"
      >
        <span class="clothing-slot">{{ slot }}</span>
        <span class="clothing-value">{{ value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();
</script>

<style lang="scss" scoped>
.clothing-panel {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.section-label {
  font-size: 0.82rem;
  font-weight: bold;
  color: var(--c-primary);
  padding-bottom: 4px;
  border-bottom: 1px solid var(--c-border);
}

.clothing-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
}

.clothing-item {
  padding: 5px 8px;
  border-radius: 6px;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  transition: all 0.2s;

  &.empty {
    opacity: 0.5;
    background: transparent;
    border-style: dashed;
  }
}

.clothing-slot {
  display: block;
  font-size: 0.68rem;
  color: var(--c-text-muted);
  margin-bottom: 1px;
}

.clothing-value {
  font-size: 0.78rem;
  line-height: 1.3;
  word-break: break-all;
}

@media (max-width: 500px) {
  .clothing-grid {
    grid-template-columns: 1fr;
  }
}
</style>
