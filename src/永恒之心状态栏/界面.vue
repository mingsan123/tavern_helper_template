<template>
  <div class="status-panel">
    <!-- ===== 指挥官面板 ===== -->
    <div v-if="!isEternalHeart" class="panel commander-panel">
      <div class="panel-header">
        <i class="fas fa-crown"></i>
        <span>指挥官状态</span>
      </div>
      <div class="info-row">
        <span class="info-icon">📍</span>
        <span class="info-value">{{ stat.当前地点 }}</span>
      </div>
      <div class="info-row">
        <span class="info-icon">🕐</span>
        <span class="info-value">{{ stat.当前时间 }}</span>
      </div>
      <div class="info-row">
        <span class="info-icon">👥</span>
        <span class="info-value">{{ presentList }}</span>
      </div>
      <div class="info-row collar-off">
        <span class="info-icon">📿</span>
        <span class="info-value">项圈：已摘下</span>
      </div>
    </div>

    <!-- ===== 永恒之心面板 ===== -->
    <div v-else class="panel eternal-panel">
      <div class="panel-header star-header">
        <i class="fas fa-star"></i>
        <span>永恒之心</span>
        <span class="stage-badge" :class="stageClass">{{ stat.当前阶段 }}</span>
      </div>

      <!-- 基础信息 -->
      <div class="info-compact">
        <span>📍 {{ stat.当前地点 }}</span>
        <span>🕐 {{ stat.当前时间 }}</span>
      </div>
      <div class="info-compact" v-if="presentList">
        <span>👥 {{ presentList }}</span>
      </div>

      <!-- 淫乱度 -->
      <div class="stat-item">
        <div class="stat-head">
          <i class="fas fa-heart stat-icon lewd"></i>
          <span class="stat-label">淫乱度</span>
          <span class="stat-num">{{ stat.淫乱度 }}/100</span>
        </div>
        <div class="stat-bar">
          <div class="stat-fill lewd-fill" :style="{ width: stat.淫乱度 + '%' }"></div>
        </div>
      </div>

      <!-- 兴奋度 -->
      <div class="stat-item">
        <div class="stat-head">
          <i class="fas fa-bolt stat-icon arousal"></i>
          <span class="stat-label">兴奋度</span>
          <span class="stat-num">{{ stat.兴奋度 }}/100</span>
        </div>
        <div class="stat-bar">
          <div class="stat-fill arousal-fill" :style="{ width: stat.兴奋度 + '%' }"></div>
        </div>
      </div>

      <!-- 身体适应度 -->
      <div class="stat-item">
        <div class="stat-head">
          <i class="fas fa-sync-alt stat-icon adapt"></i>
          <span class="stat-label">身体适应</span>
          <span class="stat-num">{{ stat.身体适应度 }}/100</span>
        </div>
        <div class="stat-bar">
          <div class="stat-fill adapt-fill" :style="{ width: stat.身体适应度 + '%' }"></div>
        </div>
      </div>

      <!-- 攻守仪表盘 -->
      <div class="gauge-section">
        <div class="gauge-title">
          <i class="fas fa-tachometer-alt"></i>
          <span>攻守倾向</span>
        </div>
        <svg viewBox="0 0 200 120" class="gauge-svg">
          <!-- 背景弧 -->
          <path d="M 30 110 A 80 80 0 0 1 170 110"
                fill="none" stroke="#2d2d44" stroke-width="18" stroke-linecap="round" />
          <!-- 渐变弧 -->
          <defs>
            <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#9b59b6" />
              <stop offset="50%" stop-color="#f1c40f" />
              <stop offset="100%" stop-color="#e74c3c" />
            </linearGradient>
          </defs>
          <path :d="activeArc"
                fill="none" stroke="url(#gaugeGrad)" stroke-width="18"
                stroke-linecap="round" class="gauge-active" />
          <!-- 刻度线 -->
          <line v-for="tick in ticks" :key="tick.value"
                :x1="tick.x1" :y1="tick.y1" :x2="tick.x2" :y2="tick.y2"
                stroke="#8899aa" stroke-width="1.5" />
          <!-- 指针 -->
          <line :x1="100" :y1="110" :x2="needle.x" :y2="needle.y"
                stroke="#fff" stroke-width="2.5" stroke-linecap="round"
                class="gauge-needle" />
          <circle cx="100" cy="110" r="5" fill="#fff" />
          <!-- 标签 -->
          <text x="20" y="90" fill="#9b59b6" font-size="10" text-anchor="middle">受</text>
          <text x="100" y="45" fill="#f1c40f" font-size="9" text-anchor="middle">50</text>
          <text x="180" y="90" fill="#e74c3c" font-size="10" text-anchor="middle">攻</text>
        </svg>
        <div class="gauge-value">{{ stat.攻守值 }}</div>
        <div class="gauge-label">{{ domLabel }}</div>
      </div>

      <!-- 身体状态 -->
      <div class="body-state">
        <div class="body-state-title">
          <i class="fas fa-notes-medical"></i>
          <span>身体状态</span>
        </div>
        <div class="body-tags">
          <span class="body-tag chest">
            <i class="fas fa-female"></i> 胸部：{{ stat.身体状态.胸部 }}
          </span>
          <span class="body-tag pussy">
            <i class="fas fa-venus"></i> 小穴：{{ stat.身体状态.小穴 }}
          </span>
          <span class="body-tag anal">
            <i class="fas fa-dot-circle"></i> 肛门：{{ stat.身体状态.肛门 }}
          </span>
          <span class="body-tag hip">
            <i class="fas fa-child"></i> 臀部：{{ stat.身体状态.臀部 }}
          </span>
        </div>
      </div>

      <!-- 心理想法 -->
      <div v-if="stat.心理想法" class="thought-bubble">
        <i class="fas fa-quote-left"></i>
        <span>{{ stat.心理想法 }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
await waitGlobalInitialized('Mvu');
await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));

interface BodyState {
  胸部: string;
  小穴: string;
  肛门: string;
  臀部: string;
}

interface EternalHeart {
  淫乱度: number;
  兴奋度: number;
  攻守值: number;
  身体适应度: number;
  当前阶段: string;
  身体状态: BodyState;
  心理想法: string;
}

const stat = reactive({
  当前地点: '',
  当前时间: '',
  在场舰娘: [] as string[],
  淫乱度: 0,
  兴奋度: 0,
  攻守值: 50,
  身体适应度: 0,
  当前阶段: '清纯期' as string,
  身体状态: { 胸部: '正常', 小穴: '未开发', 肛门: '未开发', 臀部: '正常' } as BodyState,
  心理想法: '',
});

const isEternalHeart = ref(false);

async function refresh() {
  const raw = Mvu.getMvuData({ type: 'message', message_id: getCurrentMessageId() });
  const data = Schema.parse(_.get(raw, 'stat_data'));
  if (!data) return;

  isEternalHeart.value = data.系统.当前身份 === '永恒之心';
  stat.当前地点 = data.系统.当前地点;
  stat.当前时间 = data.系统.当前时间;
  stat.在场舰娘 = data.系统.在场舰娘;

  if (data.永恒之心) {
    const eh = data.永恒之心;
    stat.淫乱度 = eh.淫乱度;
    stat.兴奋度 = eh.兴奋度;
    stat.攻守值 = eh.攻守值;
    stat.身体适应度 = eh.身体适应度;
    stat.当前阶段 = eh.当前阶段;
    stat.身体状态 = eh.身体状态;
    stat.心理想法 = eh.心理想法;
  }
}

const presentList = computed(() =>
  stat.在场舰娘.length > 0 ? stat.在场舰娘.join('、') : '无舰娘在场'
);

const stageClass = computed(() => {
  const map: Record<string, string> = {
    清纯期: 'stage-pure',
    觉醒期: 'stage-awake',
    纵欲期: 'stage-indulge',
  };
  return map[stat.当前阶段] || '';
});

const domLabel = computed(() => {
  const v = stat.攻守值;
  if (v < 30) return '完全受方';
  if (v < 45) return '偏受';
  if (v <= 55) return '平衡';
  if (v < 70) return '偏攻';
  return '完全攻方';
});

// SVG 攻守仪表盘计算
const gaugeCenterX = 100;
const gaugeCenterY = 110;
const gaugeRadius = 80;
const startAngle = Math.PI;
const endAngle = 0;

function angleForValue(val: number) {
  return startAngle + (val / 100) * (endAngle - startAngle);
}

const needle = computed(() => {
  const angle = angleForValue(stat.攻守值);
  const length = gaugeRadius - 15;
  return {
    x: gaugeCenterX + Math.cos(angle) * length,
    y: gaugeCenterY + Math.sin(angle) * length,
  };
});

const activeArc = computed(() => {
  const val = Math.max(0, Math.min(100, stat.攻守值));
  const angle = angleForValue(val);
  const r = gaugeRadius;
  const cx = gaugeCenterX;
  const cy = gaugeCenterY;
  const x = cx + Math.cos(angle) * r;
  const y = cy + Math.sin(angle) * r;
  const largeArc = val > 50 ? 1 : 0;
  return `M 30 110 A ${r} ${r} 0 ${largeArc} 1 ${x} ${y}`;
});

const ticks = computed(() => {
  const result = [];
  for (let v = 0; v <= 100; v += 10) {
    const angle = angleForValue(v);
    const innerR = gaugeRadius - 10;
    const outerR = gaugeRadius + 2;
    result.push({
      value: v,
      x1: gaugeCenterX + Math.cos(angle) * innerR,
      y1: gaugeCenterY + Math.sin(angle) * innerR,
      x2: gaugeCenterX + Math.cos(angle) * outerR,
      y2: gaugeCenterY + Math.sin(angle) * outerR,
    });
  }
  return result;
});

// 监听 MVU 变量更新事件
eventOn(Mvu.events.VARIABLE_UPDATE_ENDED, () => {
  refresh();
});

onMounted(() => {
  refresh();
});
</script>

<style lang="scss" scoped>
body {
  margin: 0;
  padding: 0;
  font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
}

.status-panel {
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
}

.panel {
  background: linear-gradient(160deg, rgba(30, 35, 50, 0.92), rgba(20, 25, 40, 0.95));
  border-radius: 14px;
  padding: 14px 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  color: #d0d8e8;
  font-size: 13px;
}

.commander-panel {
  .panel-header {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 15px;
    font-weight: 700;
    color: #c9a96e;
    padding-bottom: 10px;
    margin-bottom: 8px;
    border-bottom: 1px solid rgba(201, 169, 110, 0.2);
  }
}

.eternal-panel {
  border-color: rgba(120, 160, 220, 0.2);
  box-shadow: 0 6px 24px rgba(80, 120, 200, 0.12);

  .star-header {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 15px;
    font-weight: 700;
    color: #8ab4f8;
    padding-bottom: 10px;
    margin-bottom: 8px;
    border-bottom: 1px solid rgba(138, 180, 248, 0.2);

    .fa-star { color: #f1c40f; }
    .stage-badge {
      margin-left: auto;
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 8px;
      font-weight: 600;
    }
    .stage-pure { background: rgba(155, 200, 255, 0.2); color: #9bc8ff; }
    .stage-awake { background: rgba(241, 196, 15, 0.2); color: #f1c40f; }
    .stage-indulge { background: rgba(231, 76, 60, 0.2); color: #e74c3c; }
  }
}

.info-row {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 3px 0;
  font-size: 12px;
  color: #99aabb;

  .info-icon { flex-shrink: 0; }
}

.collar-off { color: #889999; }

.info-compact {
  display: flex;
  gap: 12px;
  font-size: 11px;
  color: #8899aa;
  padding: 1px 0;
  flex-wrap: wrap;
}

.stat-item {
  margin-top: 8px;
}

.stat-head {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 3px;

  .stat-icon { width: 14px; font-size: 11px; }
  .stat-label { flex: 1; font-size: 12px; color: #aabbcc; }
  .stat-num { font-size: 12px; font-weight: 600; color: #ccddee; font-variant-numeric: tabular-nums; }

  .lewd { color: #e74c3c; }
  .arousal { color: #f39c12; }
  .adapt { color: #2ecc71; }
}

.stat-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 3px;
  overflow: hidden;

  .stat-fill {
    height: 100%;
    border-radius: 3px;
    transition: width 0.5s ease;
  }
  .lewd-fill { background: linear-gradient(90deg, #e74c3c, #ff6b6b); }
  .arousal-fill { background: linear-gradient(90deg, #f39c12, #f7dc6f); }
  .adapt-fill { background: linear-gradient(90deg, #2ecc71, #58d68d); }
}

/* ===== 攻守仪表盘 ===== */
.gauge-section {
  margin-top: 14px;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.gauge-title {
  font-size: 12px;
  color: #aabbcc;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 5px;

  .fa-tachometer-alt { color: #8ab4f8; }
}

.gauge-svg {
  width: 180px;
  height: auto;
  display: block;
}

.gauge-active {
  transition: d 0.5s ease;
}

.gauge-needle {
  transition: all 0.5s ease;
}

.gauge-value {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin-top: -14px;
  font-variant-numeric: tabular-nums;
}

.gauge-label {
  font-size: 11px;
  color: #8899aa;
  margin-top: -2px;
}

/* ===== 身体状态 ===== */
.body-state {
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.body-state-title {
  font-size: 12px;
  color: #aabbcc;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.body-tags {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
}

.body-tag {
  font-size: 11px;
  padding: 4px 7px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.04);
  color: #99aabb;
  white-space: nowrap;
}

/* ===== 心理想法 ===== */
.thought-bubble {
  margin-top: 10px;
  padding: 8px 10px;
  background: rgba(138, 180, 248, 0.08);
  border-left: 2px solid rgba(138, 180, 248, 0.4);
  border-radius: 0 6px 6px 0;
  font-size: 11px;
  color: #99aacc;
  font-style: italic;
  line-height: 1.5;

  .fa-quote-left {
    color: rgba(138, 180, 248, 0.3);
    margin-right: 4px;
    font-size: 10px;
  }
}
</style>
