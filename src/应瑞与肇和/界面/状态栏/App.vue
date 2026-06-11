<template>
  <div class="donghuang-scroll">
    <!-- 标题栏 -->
    <div class="scroll-header">
      <span class="scroll-title">东煌・应瑞与肇和</span>
      <span class="scroll-subtitle">—— 碧蓝航线 ——</span>
    </div>

    <!-- 系统状态 -->
    <SystemBar />

    <!-- 角色双栏 -->
    <div class="characters-row">
      <CharacterCard character="应瑞" theme="yingrui" />
      <CharacterCard character="肇和" theme="zhaohe" />
    </div>

    <!-- 底纹 -->
    <div class="scroll-footer">
      <span class="footer-mark">⚓</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import SystemBar from './components/SystemBar.vue';
import CharacterCard from './components/CharacterCard.vue';
</script>

<style lang="scss" scoped>
.donghuang-scroll {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  background:
    linear-gradient(175deg, var(--c-paper) 0%, var(--c-paper-deep) 40%, var(--c-paper) 100%);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  overflow: hidden;
  position: relative;

  /* 纸纹理伪元素 */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(180, 160, 130, 0.03) 2px,
        rgba(180, 160, 130, 0.03) 3px
      );
    pointer-events: none;
    z-index: 0;
    border-radius: var(--radius-lg);
  }

  > * {
    position: relative;
    z-index: 1;
  }
}

.scroll-header {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 8px;
  padding: 10px 12px 6px;
}

.scroll-title {
  font-family: var(--font-display);
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--c-ink);
  letter-spacing: 0.08em;
}

.scroll-subtitle {
  font-size: var(--font-size-xs);
  color: var(--c-ink-muted);
  letter-spacing: 0.12em;
}

.characters-row {
  display: flex;
  gap: 0;
  border-top: 1px solid var(--c-border-light);
  border-bottom: 1px solid var(--c-border-light);
}

.scroll-footer {
  display: flex;
  justify-content: center;
  padding: 4px;
}

.footer-mark {
  font-size: 10px;
  color: var(--c-border);
  opacity: 0.6;
}
</style>
