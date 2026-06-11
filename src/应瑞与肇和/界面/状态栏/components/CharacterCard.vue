<template>
  <div class="char-card" :class="`theme-${theme}`">
    <!-- 头部：姓名 + 誓约 -->
    <div class="card-head">
      <span class="char-name">{{ character }}</span>
      <span v-if="data.誓约" class="oath-ring" title="已缔结誓约">💍</span>
    </div>

    <!-- 关系阶段 -->
    <div class="stage-block">
      <span class="meta-label">关系</span>
      <span class="stage-badge" :class="`stage-${stageKey}`">
        {{ data.关系阶段 }}
      </span>
    </div>

    <!-- 好感度 -->
    <div class="affection-block">
      <div class="affection-head">
        <span class="meta-label">好感度</span>
        <span class="affection-num" :class="`num-${theme}`">
          {{ data.好感度 }}
        </span>
      </div>

      <!-- 进度条 -->
      <div class="affection-track">
        <div
          class="affection-fill"
          :class="`fill-${theme}`"
          :style="{ width: affectionPct + '%' }"
        />
        <!-- 里程碑光点 -->
        <span
          v-for="m in milestones"
          :key="m.value"
          class="milestone-dot"
          :class="{ reached: data.好感度 >= m.value }"
          :style="{ left: m.percent + '%' }"
          :title="m.label"
        />
      </div>

      <!-- 刻度 -->
      <div class="affection-scale">
        <span
          v-for="m in milestones"
          :key="m.value"
          class="scale-tick"
          :class="{ active: data.好感度 >= m.value }"
        >
          {{ m.value }}
        </span>
      </div>
    </div>

    <!-- 衣着 -->
    <div v-if="data.当前衣着" class="outfit-block">
      <span class="meta-label">衣着</span>
      <span class="outfit-text" :title="data.当前衣着">{{ data.当前衣着 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

const props = defineProps<{
  character: string;
  theme: string;
}>();

const store = useDataStore();

const data = computed(() => {
  return props.character === '应瑞' ? store.stat_data.应瑞 : store.stat_data.肇和;
});

const milestones = computed(() => {
  if (data.value.誓约) {
    return [
      { value: 50, label: '初识', percent: 25 },
      { value: 60, label: '熟悉', percent: 30 },
      { value: 80, label: '暧昧', percent: 40 },
      { value: 100, label: '恋人', percent: 50 },
      { value: 200, label: '誓约', percent: 100 },
    ];
  }
  return [
    { value: 50, label: '初识', percent: 50 },
    { value: 60, label: '熟悉', percent: 60 },
    { value: 80, label: '暧昧', percent: 80 },
    { value: 100, label: '恋人', percent: 100 },
  ];
});

const affectionPct = computed(() => {
  const max = data.value.誓约 ? 200 : 100;
  return Math.min((data.value.好感度 / max) * 100, 100);
});

const stageKey = computed(() => {
  const map: Record<string, string> = {
    '初识': 'stranger',
    '熟悉': 'familiar',
    '暧昧': 'crush',
    '恋人': 'lover',
    '誓约': 'oath',
  };
  return map[data.value.关系阶段] || 'stranger';
});
</script>

<style lang="scss" scoped>
/* === 卡片容器 === */
.char-card {
  flex: 1;
  min-width: 0;
  padding: 10px 12px 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: var(--c-surface);
  transition:
    background var(--duration-normal) var(--ease-smooth);
}

.char-card:first-child {
  border-right: 1px solid var(--c-border-light);
}

/* === 头部 === */
.card-head {
  display: flex;
  align-items: center;
  gap: 5px;
}

.char-name {
  font-family: var(--font-display);
  font-size: var(--font-size-xl);
  font-weight: 700;
  letter-spacing: 0.06em;
  line-height: 1.1;
}

.theme-yingrui .char-name {
  color: var(--c-yingrui);
  text-shadow: 0 1px 2px var(--c-yingrui-glow);
}

.theme-zhaohe .char-name {
  color: var(--c-zhaohe);
  text-shadow: 0 1px 2px var(--c-zhaohe-glow);
}

/* === 誓约戒指 === */
.oath-ring {
  font-size: 15px;
  animation: oathPulse 2.4s ease-in-out infinite;
  filter: drop-shadow(0 0 3px rgba(200, 160, 60, 0.5));
}

@keyframes oathPulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  25% { transform: scale(1.18); opacity: 0.85; }
  50% { transform: scale(1); opacity: 1; }
  75% { transform: scale(1.08); opacity: 0.9; }
}

/* === 关系阶段 === */
.stage-block {
  display: flex;
  align-items: center;
  gap: 6px;
}

.meta-label {
  font-size: var(--font-size-xs);
  color: var(--c-ink-muted);
  letter-spacing: 0.04em;
  flex-shrink: 0;
}

.stage-badge {
  font-size: var(--font-size-sm);
  font-weight: 600;
  padding: 1px 9px;
  border-radius: 10px;
  letter-spacing: 0.03em;
  transition: all var(--duration-normal) var(--ease-smooth);
}

.stage-stranger {
  background: #ecebe7;
  color: var(--c-stage-stranger);
}

.stage-familiar {
  background: #e2efe2;
  color: var(--c-stage-familiar);
}

.stage-crush {
  background: #fde8e8;
  color: var(--c-stage-crush);
}

.stage-lover {
  background: #fef0e6;
  color: var(--c-stage-lover);
}

.stage-oath {
  background: var(--c-gold-surface);
  color: var(--c-gold-deep);
}

/* === 好感度区域 === */
.affection-block {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.affection-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.affection-num {
  font-size: var(--font-size-lg);
  font-weight: 800;
  font-family: var(--font-display);
  transition: color var(--duration-normal) var(--ease-smooth);
}

.num-yingrui {
  color: var(--c-yingrui);
}

.num-zhaohe {
  color: var(--c-zhaohe);
}

/* === 进度条 === */
.affection-track {
  position: relative;
  width: 100%;
  height: 7px;
  background: var(--c-paper-dark);
  border-radius: 4px;
  overflow: visible;
}

.affection-fill {
  height: 100%;
  border-radius: 4px;
  transition: width var(--duration-slow) var(--ease-spring);
  position: relative;

  /* 光泽覆盖 */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 4px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.25) 0%,
      transparent 50%,
      rgba(0, 0, 0, 0.08) 100%
    );
  }
}

.fill-yingrui {
  background: var(--c-yingrui-gradient);
  box-shadow: 0 0 6px var(--c-yingrui-glow);
}

.fill-zhaohe {
  background: var(--c-zhaohe-gradient);
  box-shadow: 0 0 6px var(--c-zhaohe-glow);
}

/* === 里程碑节点 === */
.milestone-dot {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--c-paper-dark);
  border: 1.5px solid var(--c-border);
  transition: all var(--duration-normal) var(--ease-smooth);
  z-index: 2;
}

.milestone-dot.reached {
  background: #fff;
  border-color: var(--c-gold);
  box-shadow: 0 0 4px rgba(180, 150, 56, 0.5);
  width: 8px;
  height: 8px;
}

/* === 刻度线 === */
.affection-scale {
  display: flex;
  justify-content: space-between;
  padding: 0 1px;
}

.scale-tick {
  font-size: 7px;
  color: #d0c9ba;
  transition: color var(--duration-normal) var(--ease-smooth);
  font-family: var(--font-mono);
}

.scale-tick.active {
  color: var(--c-ink-muted);
  font-weight: 600;
}

/* === 衣着行 === */
.outfit-block {
  display: flex;
  gap: 6px;
  align-items: flex-start;
  padding-top: 6px;
  margin-top: 2px;
  border-top: 1px dotted var(--c-border);
}

.outfit-text {
  font-size: var(--font-size-sm);
  color: var(--c-ink-soft);
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  min-width: 0;
}
</style>
