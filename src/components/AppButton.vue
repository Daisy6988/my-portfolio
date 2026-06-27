<template>
  <button
    :class="['app-btn', variant]"
    :aria-label="ariaLabel || label"
    v-bind="$attrs"
  >
    <span class="btn-border"></span>
    <span class="btn-label">
      <i v-if="icon" :class="icon" aria-hidden="true"></i>
      {{ label }}
    </span>
  </button>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  icon: { type: String, default: '' },
  ariaLabel: { type: String, default: '' },
  variant: { type: String, default: 'primary' },
})
</script>

<style scoped>
/* ── 基礎 ── */
.app-btn {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 8px;       /* 長方形，小圓角 */
  background: transparent;
  cursor: pointer;
  user-select: none;
  overflow: hidden;
  font-family: 'Noto Sans TC', sans-serif;
  margin: 0;
  padding: 0;

  /* 固定尺寸 */
  width: 130px;
  height: 46px;

  transition: color 0.3s ease;
}

/* ── 邊框層 ── */
.btn-border {
  position: absolute;
  inset: 0;
  border-radius: 8px;
  border: 2px solid #4caf7d;   /* 亮青翠綠 */
  z-index: 1;
  pointer-events: none;
}

/* 掃光偽元素 */
.btn-border::before {
  content: '';
  display: block;
  position: absolute;
  width: 8%;
  height: 500%;
  background: rgba(255, 255, 255, 0.15);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-60deg);
  transition: all 0.35s ease;
}

/* ── 文字層 ── */
.btn-label {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45em;
  width: 100%;
  height: 100%;
  color: #4caf7d;             /* 亮青翠綠文字 */
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  font-family: 'Noto Sans TC', sans-serif;
  white-space: nowrap;
  transition: color 0.3s ease;
}

/* ── Hover：掃光展開填滿 ── */
.app-btn:hover .btn-border::before {
  width: 100%;
  background: #4caf7d;
}

.app-btn:hover .btn-label {
  color: #ffffff;
}

/* ── Active ── */
.app-btn:active .btn-border::before {
  background: #3a9e6c;
}

/* ── Secondary（未選中 filter）── */
.app-btn.secondary .btn-border {
  border-color: #4caf7d;
}

.app-btn.secondary .btn-label {
  color: #4caf7d;
}

.app-btn.secondary:hover .btn-border::before {
  background: #4caf7d;
}

.app-btn.secondary:hover .btn-label {
  color: #ffffff;
}

/* ── 平板 ── */
@media (max-width: 768px) {
  .app-btn {
    width: 110px;
    height: 42px;
  }

  .btn-label {
    font-size: 0.92rem;
  }
}

/* ── 手機 ── */
@media (max-width: 480px) {
  .app-btn {
    width: 90px;
    height: 38px;
  }

  .btn-label {
    font-size: 0.8rem;
    letter-spacing: 0.04em;
  }
}
</style>