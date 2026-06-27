<template>
  <NavBar />
  <router-view />
  <footer class="site-footer">
    <div class="mushroom-row">
      <img
        v-for="m in mushrooms"
        :key="m.id"
        :src="`${base}images/mushroomImg.png`"
        :style="{
          width: m.size + 'px',
          opacity: m.op,
          alignSelf: 'flex-end',
        }"
        class="mushroom-img"
        alt=""
        aria-hidden="true"
      />
    </div>
  </footer>

  <!-- 跟隨滑鼠的狗狗 -->
  <img
    :src="`${base}images/dogImg.png`"
    class="cursor-dog"
    :style="{ left: dogX + 'px', top: dogY + 'px' }"
    alt=""
    aria-hidden="true"
  />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import NavBar from '@/components/NavBar.vue';

const base = import.meta.env.BASE_URL;

// ── 香菇 ──
function rnd(min, max) {
  return Math.random() * (max - min) + min;
}
const mushrooms = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  size: rnd(48, 96),
  op: rnd(0.45, 0.7),
}));

// ── 狗狗跟隨滑鼠 ──
const OFFSET = 80; // 約 5cm（80px）
const dogX = ref(-200);
const dogY = ref(-200);

// 目前實際位置（用於平滑追蹤）
let currentX = -200;
let currentY = -200;
let targetX = -200;
let targetY = -200;
let rafId = null;

function onMouseMove(e) {
  targetX = e.clientX + window.scrollX + OFFSET;
  targetY = e.clientY + window.scrollY + OFFSET;
}

function animate() {
  // lerp 平滑追蹤
  currentX += (targetX - currentX) * 0.12;
  currentY += (targetY - currentY) * 0.12;
  dogX.value = Math.round(currentX);
  dogY.value = Math.round(currentY);
  rafId = requestAnimationFrame(animate);
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove);
  rafId = requestAnimationFrame(animate);
});

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMouseMove);
  cancelAnimationFrame(rafId);
});
</script>

<style scoped>
.site-footer {
  background: #fdfaf6;
  padding: 16px 0 0;
  overflow: hidden;
  width: 100%;
}

.mushroom-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  width: 100%;
  padding: 0 12px;
  box-sizing: border-box;
  gap: 2px;
  flex-wrap: nowrap;
}

.mushroom-img {
  display: block;
  flex-shrink: 1;
  min-width: 32px;
  max-width: 96px;
  object-fit: contain;
  filter:
    grayscale(1)
    sepia(1)
    saturate(2.5)
    hue-rotate(-20deg)
    brightness(1.05);
}

/* ── 狗狗 ── */
.cursor-dog {
  position: absolute;
  top: 0;
  left: 0;
  width: 90px;
  pointer-events: none;  /* 不擋滑鼠點擊 */
  z-index: 9999;
  user-select: none;
  transform: translate(0, -60%); /* 讓狗腳底對齊偏移點 */
}

/* 手機隱藏（沒有滑鼠） */
@media (hover: none) {
  .cursor-dog { display: none; }
}

@media (max-width: 768px) {
  .mushroom-img { min-width: 24px; }
}
@media (max-width: 480px) {
  .mushroom-img { min-width: 18px; }
}
</style>