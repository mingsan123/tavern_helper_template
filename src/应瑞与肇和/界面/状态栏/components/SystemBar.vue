<template>
  <div class="system-bar">
    <!-- 场景 -->
    <div class="sys-slot">
      <span class="sys-icon">{{ sceneIcon }}</span>
      <div class="sys-body">
        <span class="sys-label">场景</span>
        <span class="sys-value">{{ store.stat_data.系统.当前场景 }}</span>
      </div>
    </div>

    <!-- 分隔 -->
    <div class="sys-divider" />

    <!-- 状态 -->
    <div class="sys-slot">
      <span class="sys-icon">{{ collarIcon }}</span>
      <div class="sys-body">
        <span class="sys-label">状态</span>
        <span
          class="sys-value"
          :class="{ 'is-eternal': isEternal }"
        >
          {{ isEternal ? '✦ 永恒之心' : '指挥官' }}
        </span>
      </div>
    </div>

    <!-- 时间指示 -->
    <div class="sys-slot sys-time">
      <span class="sys-clock">{{ timeString }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

const store = useDataStore();

const sceneIcons: Record<string, string> = {
  '港区办公室': '🏢',
  '东煌宿舍': '🏮',
  '海滨': '🏖️',
  '训练场': '🎯',
  '永恒之心舰内': '🚢',
};

const sceneIcon = computed(() => {
  return sceneIcons[store.stat_data.系统.当前场景] || '📍';
});

const isEternal = computed(() => store.stat_data.系统.项圈状态 === '永恒之心');

const collarIcon = computed(() => (isEternal.value ? '💎' : '🧑‍✈️'));

const timeString = computed(() => {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, '0');
  const m = now.getMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
});
</script>

<style lang="scss" scoped>
.system-bar {
  display: flex;
  align-items: center;
  padding: 7px 14px;
  background: linear-gradient(135deg, var(--c-ink) 0%, #3a3228 100%);
  color: #e5dcc8;
  font-size: var(--font-size-sm);
  gap: 0;
}

.sys-slot {
  display: flex;
  align-items: center;
  gap: 7px;
  flex: 1;
  min-width: 0;
}

.sys-icon {
  font-size: 15px;
  flex-shrink: 0;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.3));
}

.sys-body {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.sys-label {
  font-size: var(--font-size-xs);
  color: #8a8070;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  line-height: 1.2;
}

.sys-value {
  font-size: var(--font-size-md);
  font-weight: 600;
  color: #e5dcc8;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sys-value.is-eternal {
  color: #c8b0e0;
  text-shadow: 0 0 8px rgba(180, 150, 210, 0.4);
}

.sys-divider {
  width: 1px;
  height: 28px;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(255, 255, 255, 0.15) 30%,
    rgba(255, 255, 255, 0.15) 70%,
    transparent 100%
  );
  margin: 0 14px;
  flex-shrink: 0;
}

.sys-time {
  flex: 0 0 auto;
  margin-left: auto;
  padding-left: 12px;
  border-left: 1px solid rgba(255, 255, 255, 0.08);
}

.sys-clock {
  font-family: var(--font-mono);
  font-size: var(--font-size-md);
  color: #8a8070;
  letter-spacing: 0.04em;
}
</style>
