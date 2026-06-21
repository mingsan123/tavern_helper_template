<template>
  <nav class="tabs">
    <button
      v-for="tab in props.tabs"
      :key="tab.id"
      class="tab-button"
      :class="{ active: model === tab.id }"
      :aria-expanded="model === tab.id"
      @click="toggleTab(tab.id)"
    >
      {{ tab.label }}
    </button>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps<{
  tabs: { id: string; label: string }[];
}>();

const model = defineModel<string | null>({ required: true });

function toggleTab(id: string) {
  model.value = model.value === id ? null : id;
}
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  background-color: var(--c-surface);
  border-bottom: 1.5px solid var(--c-border);
}

.tab-button {
  flex: 1;
  padding: 7px;
  border: none;
  background: transparent;
  color: var(--c-text-muted);
  font-size: 0.82rem;
  font-weight: bold;
  font-family: var(--font-main);
  cursor: pointer;
  transition: all 0.2s;
  border-right: 1px solid var(--c-border);

  &:last-child {
    border-right: none;
  }

  &:hover {
    background-color: rgba(74, 127, 181, 0.06);
    color: var(--c-primary);
  }

  &.active {
    background-color: var(--c-card);
    color: var(--c-primary);
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--c-primary);
    }
  }
}
</style>
