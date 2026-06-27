<template>
  <div class="card">
    <SystemBar />

    <template v-if="is_mingling">
      <StageIndicator />

      <TabNav v-model="active_tab" :tabs="tabs" />

      <div v-if="active_tab" class="content-area">
        <div v-if="active_tab === 'clothing'" class="tab-pane active">
          <ClothingPanel />
        </div>
        <div v-else-if="active_tab === 'body'" class="tab-pane active">
          <BodyPanel />
        </div>
      </div>
    </template>

    <div v-else class="inactive-notice">
      <span class="notice-icon">⬡</span>
      <span class="notice-text">项圈未佩戴</span>
      <span class="notice-sub">冥灵数据暂不可见</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import ClothingPanel from './components/ClothingPanel.vue';
import BodyPanel from './components/BodyPanel.vue';
import StageIndicator from './components/StageIndicator.vue';
import SystemBar from './components/SystemBar.vue';
import TabNav from './components/TabNav.vue';
import { useDataStore } from './store';

const store = useDataStore();

const is_mingling = computed(() => store.data.系统.当前身份 === '冥灵');

const tabs = [
  { id: 'clothing', label: '着装状态' },
  { id: 'body', label: '身体状态' },
];

const active_tab = useLocalStorage<string | null>('status_bar:active_tab', null);
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  max-width: 720px;
  background-color: var(--c-card);
  border: 2px solid var(--c-primary);
  border-radius: 10px;
  box-shadow:
    0 2px 12px rgba(74, 127, 181, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  display: flex;
  flex-direction: column;
  font-family: var(--font-main);
  color: var(--c-text);
  font-size: 13px;
  line-height: 1.4;
  margin: 0 auto;
  overflow: hidden;
}

.content-area {
  padding: 10px 12px;
}

.tab-pane {
  display: none;
  animation: fadeEffect 0.3s ease;
}

.tab-pane.active {
  display: block;
}

@keyframes fadeEffect {
  from {
    opacity: 0;
    transform: translateY(4px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.inactive-notice {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 16px;
  gap: 4px;
}

.notice-icon {
  font-size: 1.6rem;
  color: var(--c-text-muted);
  opacity: 0.5;
}

.notice-text {
  font-size: 0.92rem;
  font-weight: bold;
  color: var(--c-text-muted);
}

.notice-sub {
  font-size: 0.76rem;
  color: var(--c-text-muted);
  opacity: 0.7;
}
</style>
