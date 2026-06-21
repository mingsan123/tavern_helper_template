<template>
  <div class="system-bar">
    <div class="status-row">
      <div class="identity-badge" :class="is_heart ? 'active' : 'inactive'">
        <span class="badge-icon">{{ is_heart ? '✦' : '⬡' }}</span>
        <span class="badge-text">{{ store.data.系统.当前身份 }}</span>
      </div>
      <div class="meta-items">
        <span class="meta-item" :title="store.data.系统.当前时间">
          <i class="fa-regular fa-clock"></i>
          {{ formatted_time }}
        </span>
        <span class="meta-item" :title="store.data.系统.当前地点">
          <i class="fa-solid fa-location-dot"></i>
          {{ store.data.系统.当前地点 }}
        </span>
      </div>
    </div>
    <div v-if="!_.isEmpty(store.data.系统.在场舰娘)" class="shipgirl-row">
      <span class="shipgirl-label"><i class="fa-solid fa-ship"></i></span>
      <div class="shipgirl-list">
        <span v-for="name in store.data.系统.在场舰娘" :key="name" class="shipgirl-tag">{{ name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

const is_heart = computed(() => store.data.系统.当前身份 === '永恒之心');

const formatted_time = computed(() => {
  const raw = store.data.系统.当前时间;
  const match = raw.match(/(\d{2}:\d{2})/);
  return match ? match[1] : raw;
});
</script>

<style lang="scss" scoped>
.system-bar {
  padding: 8px 12px;
  background: linear-gradient(135deg, var(--c-surface) 0%, #e8eff7 100%);
  border-bottom: 1.5px solid var(--c-border);
}

.status-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.identity-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 0.82rem;
  font-weight: bold;
  transition: all 0.3s ease;

  &.active {
    background: linear-gradient(135deg, var(--c-primary), var(--c-accent));
    color: #fff;
    box-shadow: 0 1px 6px rgba(74, 127, 181, 0.3);
  }

  &.inactive {
    background: var(--c-border);
    color: var(--c-text-muted);
  }
}

.badge-icon {
  font-size: 0.9rem;
}

.meta-items {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.8rem;
  color: var(--c-text-muted);
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 3px;
}

.shipgirl-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
  padding-top: 5px;
  border-top: 1px dashed var(--c-border);
}

.shipgirl-label {
  color: var(--c-text-muted);
  font-size: 0.78rem;
  flex-shrink: 0;
}

.shipgirl-list {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.shipgirl-tag {
  font-size: 0.72rem;
  padding: 1px 8px;
  border-radius: 10px;
  background: rgba(74, 127, 181, 0.1);
  color: var(--c-primary);
  border: 1px solid rgba(74, 127, 181, 0.2);
}
</style>
