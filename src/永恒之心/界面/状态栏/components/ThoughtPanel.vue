<template>
  <div class="thought-panel">
    <div class="section-label">内心独白</div>
    <div v-if="store.data.永恒之心.心理想法" class="thought-content">
      <span class="thought-quote">"</span>
      <span class="thought-text">{{ store.data.永恒之心.心理想法 }}</span>
      <span class="thought-quote">"</span>
    </div>
    <div v-else class="thought-empty">
      <span class="thought-empty-icon">✦</span>
      <span>此刻内心平静……</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();
</script>

<style lang="scss" scoped>
.thought-panel {
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

.thought-content {
  padding: 10px 12px;
  background: linear-gradient(135deg, var(--c-surface), #e8eff7);
  border-radius: 8px;
  border-left: 3px solid var(--c-accent);
  line-height: 1.5;
}

.thought-quote {
  color: var(--c-accent);
  font-size: 1.1rem;
  font-weight: bold;
  vertical-align: text-top;
  margin: 0 1px;
}

.thought-text {
  font-size: 0.82rem;
  color: var(--c-text);
}

.thought-empty {
  padding: 12px;
  text-align: center;
  color: var(--c-text-muted);
  font-size: 0.82rem;
  background: var(--c-surface);
  border-radius: 8px;
  border: 1px dashed var(--c-border);
}

.thought-empty-icon {
  display: block;
  font-size: 1.2rem;
  color: var(--c-indicator-low);
  margin-bottom: 4px;
}
</style>
