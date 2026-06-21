<template>
  <div class="stage-section">
    <div class="stage-header">
      <span class="stage-badge" :class="stage_class">
        <span class="stage-star">★</span>
        {{ store.data.永恒之心.当前阶段 }}
      </span>
    </div>
    <div class="bars">
      <div class="stat-bar-row">
        <span class="stat-label">淫乱度</span>
        <div class="stat-track">
          <div
            class="stat-fill"
            :class="stage_class"
            :style="{ width: store.data.永恒之心.淫乱度 + '%' }"
          ></div>
        </div>
        <span class="stat-value">{{ store.data.永恒之心.淫乱度 }}</span>
      </div>
      <div class="stat-bar-row">
        <span class="stat-label">兴奋度</span>
        <div class="stat-track">
          <div
            class="stat-fill"
            :class="arousal_class"
            :style="{ width: store.data.永恒之心.兴奋度 + '%' }"
          ></div>
        </div>
        <span class="stat-value">{{ store.data.永恒之心.兴奋度 }}</span>
      </div>
      <div class="stat-bar-row">
        <span class="stat-label">攻守值</span>
        <div class="stat-track">
          <div
            class="stat-fill"
            :class="dom_sub_class"
            :style="{ width: store.data.永恒之心.攻守值 + '%' }"
          ></div>
          <div class="dom-sub-center"></div>
        </div>
        <span class="stat-value">{{ store.data.永恒之心.攻守值 }}</span>
      </div>
      <div class="stat-bar-row">
        <span class="stat-label">适应度</span>
        <div class="stat-track">
          <div
            class="stat-fill"
            :class="stage_class"
            :style="{ width: store.data.永恒之心.身体适应度 + '%' }"
          ></div>
        </div>
        <span class="stat-value">{{ store.data.永恒之心.身体适应度 }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

const stage_class = computed(() => {
  const stage = store.data.永恒之心.当前阶段;
  if (stage === '清纯期') return 'stage-low';
  if (stage === '觉醒期') return 'stage-mid';
  return 'stage-high';
});

const arousal_class = computed(() => {
  const val = store.data.永恒之心.兴奋度;
  if (val >= 90) return 'fill-danger';
  if (val >= 60) return 'stage-high';
  return 'stage-mid';
});

const dom_sub_class = computed(() => {
  const val = store.data.永恒之心.攻守值;
  if (val >= 70) return 'stage-high';
  if (val <= 30) return 'stage-low';
  return 'stage-mid';
});
</script>

<style lang="scss" scoped>
.stage-section {
  padding: 8px 12px 10px;
  border-bottom: 1.5px solid var(--c-border);
}

.stage-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.stage-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 12px;
  border-radius: 4px;
  font-size: 0.88rem;
  font-weight: bold;
  color: #fff;

  &.stage-low {
    background: var(--c-indicator-low);
  }

  &.stage-mid {
    background: var(--c-indicator-mid);
  }

  &.stage-high {
    background: var(--c-indicator-high);
  }
}

.stage-star {
  font-size: 0.78rem;
}

.bars {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.stat-bar-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-label {
  width: 42px;
  flex-shrink: 0;
  font-size: 0.76rem;
  color: var(--c-text-muted);
  text-align: right;
}

.stat-track {
  flex: 1;
  height: 8px;
  border-radius: 4px;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  position: relative;
  overflow: hidden;
}

.stat-fill {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  border-radius: 3px;
  transition: width 0.4s ease, background 0.4s ease;

  &.stage-low {
    background: var(--c-indicator-low);
  }

  &.stage-mid {
    background: var(--c-indicator-mid);
  }

  &.stage-high {
    background: var(--c-indicator-high);
  }

  &.fill-danger {
    background: var(--c-danger);
  }
}

.dom-sub-center {
  position: absolute;
  top: -1px;
  bottom: -1px;
  left: 50%;
  width: 2px;
  background: var(--c-text-muted);
  opacity: 0.4;
  transform: translateX(-50%);
  z-index: 1;
}

.stat-value {
  width: 26px;
  flex-shrink: 0;
  font-size: 0.76rem;
  font-weight: bold;
  text-align: right;
  color: var(--c-text);
}
</style>
