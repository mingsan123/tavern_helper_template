<template>
  <div class="system-bar">
    <div class="system-item">
      <span class="label">场景</span>
      <span class="value">{{ store.stat_data.系统.当前场景 }}</span>
    </div>
    <div class="divider" />
    <div class="system-item">
      <span class="label">状态</span>
      <span class="value" :class="{ 'eternal-heart': store.stat_data.系统.项圈状态 === '永恒之心' }">
        {{ store.stat_data.系统.项圈状态 === '永恒之心' ? '✦ 永恒之心' : '指挥官' }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';
const store = useDataStore();
</script>

<style lang="scss" scoped>
.system-bar {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  background: var(--c-ink);
  color: #e8dcc8;
  font-size: 11px;
  gap: 10px;
}

.system-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.label {
  color: #9b9080;
  font-size: 10px;
  text-transform: uppercase;
}

.value {
  color: #e8dcc8;
  font-weight: 500;
}

.eternal-heart {
  color: #c9a8e0;
}

.divider {
  width: 1px;
  height: 12px;
  background: #4a4a4a;
}
</style>
