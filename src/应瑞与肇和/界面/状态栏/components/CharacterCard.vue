<template>
  <div class="character-card" :class="`theme-${color}`">
    <div class="card-header">
      <span class="char-name">{{ character }}</span>
      <span v-if="data.誓约" class="oath-badge" title="已誓约">💍</span>
    </div>

    <div class="stage-row">
      <span class="stage-label">关系</span>
      <span class="stage-value" :class="`stage-${stageClass}`">{{ data.关系阶段 }}</span>
    </div>

    <div class="affection-section">
      <div class="affection-header">
        <span class="affection-label">好感度</span>
        <span class="affection-value">{{ data.好感度 }}</span>
      </div>
      <div class="affection-bar-track">
        <div
          class="affection-bar-fill"
          :style="{ width: affectionPercent + '%' }"
          :class="`fill-${color}`"
        />
      </div>
      <div class="affection-scale">
        <span class="scale-mark" :class="{ active: data.好感度 >= 50 }">50</span>
        <span class="scale-mark" :class="{ active: data.好感度 >= 60 }">60</span>
        <span class="scale-mark" :class="{ active: data.好感度 >= 80 }">80</span>
        <span class="scale-mark" :class="{ active: data.好感度 >= 100 }">100</span>
        <span v-if="data.誓约" class="scale-mark" :class="{ active: data.好感度 > 100 }">200</span>
      </div>
    </div>

    <div v-if="data.当前衣着" class="outfit-row">
      <span class="outfit-label">衣着</span>
      <span class="outfit-text">{{ data.当前衣着 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

const props = defineProps<{
  character: string;
  color: string;
}>();

const store = useDataStore();

const data = computed(() => {
  return props.character === '应瑞' ? store.stat_data.应瑞 : store.stat_data.肇和;
});

const affectionPercent = computed(() => {
  const max = data.value.誓约 ? 200 : 100;
  return Math.min((data.value.好感度 / max) * 100, 100);
});

const stageClass = computed(() => {
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
.character-card {
  flex: 1;
  padding: 10px 12px;
  background: var(--c-surface);
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 6px;
}

.char-name {
  font-size: 14px;
  font-weight: 700;
}

.theme-yingrui .char-name {
  color: var(--c-yingrui);
}

.theme-zhaohe .char-name {
  color: var(--c-zhaohe);
}

.oath-badge {
  font-size: 14px;
  animation: ringPulse 2s ease-in-out infinite;
}

@keyframes ringPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
}

.stage-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.stage-label {
  font-size: 10px;
  color: var(--c-text-muted);
}

.stage-value {
  font-size: 12px;
  font-weight: 600;
  padding: 1px 8px;
  border-radius: 10px;
}

.stage-stranger {
  background: #f0f0f0;
  color: #888;
}

.stage-familiar {
  background: #e8f0e8;
  color: #5a8a5a;
}

.stage-crush {
  background: #fce4e4;
  color: #c4545a;
}

.stage-lover {
  background: #fce4d6;
  color: #d4744a;
}

.stage-oath {
  background: var(--c-gold-light);
  color: #a08030;
}

.affection-section {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.affection-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.affection-label {
  font-size: 10px;
  color: var(--c-text-muted);
}

.affection-value {
  font-size: 13px;
  font-weight: 700;
}

.theme-yingrui .affection-value {
  color: var(--c-yingrui);
}

.theme-zhaohe .affection-value {
  color: var(--c-zhaohe);
}

.affection-bar-track {
  width: 100%;
  height: 6px;
  background: var(--c-paper-dark);
  border-radius: 3px;
  overflow: hidden;
}

.affection-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.6s ease;
}

.fill-yingrui {
  background: var(--c-yingrui-gradient);
}

.fill-zhaohe {
  background: var(--c-zhaohe-gradient);
}

.affection-scale {
  display: flex;
  justify-content: space-between;
  padding: 0 2px;
}

.scale-mark {
  font-size: 8px;
  color: #ccc;
  transition: color 0.3s;
}

.scale-mark.active {
  color: var(--c-ink-light);
}

.outfit-row {
  display: flex;
  gap: 6px;
  font-size: 10px;
  border-top: 1px dotted var(--c-border);
  padding-top: 6px;
  margin-top: 2px;
}

.outfit-label {
  color: var(--c-text-muted);
  flex-shrink: 0;
}

.outfit-text {
  color: var(--c-ink-light);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
