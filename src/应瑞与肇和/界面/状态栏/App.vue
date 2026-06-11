<template>
  <div class="status-bar">
    <SystemBar />
    <div class="characters-row">
      <CharacterCard character="应瑞" :color="'yingrui'" />
      <CharacterCard character="肇和" :color="'zhaohe'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SystemBar from './components/SystemBar.vue';
import CharacterCard from './components/CharacterCard.vue';
</script>

<style lang="scss" scoped>
.status-bar {
  width: 100%;
  max-width: 640px;
  background: var(--c-paper);
  border: 1px solid var(--c-border);
  border-radius: 6px;
  font-family: var(--font-main);
  color: var(--c-ink);
  font-size: 12px;
  line-height: 1.4;
  margin: 0 auto;
  overflow: hidden;
}

.characters-row {
  display: flex;
  gap: 1px;
  background: var(--c-border);
}
</style>
