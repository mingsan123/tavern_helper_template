<template>
  <div class="body-panel">
    <div class="section-label">身体状态</div>
    <div class="body-grid">
      <div
        v-for="(value, part) in store.data.永恒之心.身体状态"
        :key="part"
        class="body-item"
        :class="body_class(value)"
      >
        <span class="body-part">{{ part }}</span>
        <span class="body-value">{{ value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

function body_class(value: string): string {
  if (value === '正常') return 'state-normal';
  if (value === '未开发') return 'state-initial';
  if (['敏感', '湿润'].includes(value)) return 'state-active';
  if (['红肿', '疲劳'].includes(value)) return 'state-intense';
  if (value === '已开发') return 'state-developed';
  return '';
}
</script>

<style lang="scss" scoped>
.body-panel {
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

.body-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
}

.body-item {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid var(--c-border);
  transition: all 0.2s;
}

.body-part {
  display: block;
  font-size: 0.68rem;
  color: var(--c-text-muted);
  margin-bottom: 2px;
}

.body-value {
  font-size: 0.82rem;
  font-weight: 500;
}

.state-normal {
  background: var(--c-surface);
}

.state-initial {
  background: var(--c-body-initial);
  border-color: var(--c-body-initial-border);
}

.state-active {
  background: var(--c-body-active);
  border-color: var(--c-body-active-border);
}

.state-intense {
  background: var(--c-body-intense);
  border-color: var(--c-body-intense-border);
}

.state-developed {
  background: var(--c-body-developed);
  border-color: var(--c-body-developed-border);
}

@media (max-width: 500px) {
  .body-grid {
    grid-template-columns: 1fr;
  }
}
</style>
