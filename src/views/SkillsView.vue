<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import { skills } from '@/data/portfolioData.js';
import SkillCard from '@/components/SkillCard.vue';

const modules = [Pagination];
const isMobile = ref(window.innerWidth <= 640);
const skillsPagination = ref(null);
let skillsSwiper = null;

const base = import.meta.env.BASE_URL;

// 波浪下方的小香菇裝飾
function rnd(min, max) {
  return Math.random() * (max - min) + min;
}
const waveMushrooms = Array.from({ length: 9 }, (_, i) => ({
  id: i,
  size: rnd(36, 64),
  op: rnd(0.55, 0.85),
}));

function renderPagination(el, current, total) {
  if (!el) return;
  const NEIGHBORS = 3;
  let items = [];
  for (let i = 1; i <= total; i++) {
    const diff = i - current;
    if (i === current) items.push(`<span class="pg-number">${i}</span>`);
    else if (diff > -NEIGHBORS - 1 && diff < NEIGHBORS + 1) items.push(`<span class="pg-dot"></span>`);
  }
  el.innerHTML = items.join('');
}

function onSkillsSwiper(swiper) {
  skillsSwiper = swiper;
  renderPagination(skillsPagination.value, 1, swiper.slides.length);
}
function onSkillsSlideChange(swiper) {
  renderPagination(skillsPagination.value, swiper.activeIndex + 1, swiper.slides.length);
}
function onResize() { isMobile.value = window.innerWidth <= 640; }

onMounted(() => window.addEventListener('resize', onResize));
onBeforeUnmount(() => window.removeEventListener('resize', onResize));
</script>

<template>
  <div class="skills-page">
    <div class="dog-bg" aria-hidden="true"></div>
    <div class="dot-bg" aria-hidden="true"></div>
    <div class="overlay" aria-hidden="true"></div>

    <div class="skills-inner">
      <header class="skills-header">
        <h1>技能樹</h1>
        <p>探索我在森林中獲得的各種能力</p>
      </header>

      <main v-if="!isMobile" class="skills-grid">
        <SkillCard v-for="item in skills" :key="item.title" :skill="item" />
      </main>

      <div v-else class="swiper-wrapper-outer">
        <Swiper
          :slides-per-view="1"
          :space-between="0"
          :centered-slides="true"
          :modules="modules"
          class="skills-swiper"
          @swiper="onSkillsSwiper"
          @slideChange="onSkillsSlideChange"
        >
          <SwiperSlide v-for="item in skills" :key="item.title">
            <SkillCard :skill="item" />
          </SwiperSlide>
        </Swiper>
        <div ref="skillsPagination" class="custom-pagination"></div>
      </div>
    </div>
    <div class="below-cards"></div>

    <!-- 波浪轉場：狗狗底圖 → 香菇區 -->
    <div class="wave-divider" aria-hidden="true">
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none" class="wave-svg">
        <path
          d="M0,40 C120,90 240,90 360,55 C480,20 600,20 720,50 C840,80 960,80 1080,45 C1200,10 1320,10 1440,40 L1440,100 L0,100 Z"
        />
      </svg>
    </div>

    <!-- 香菇區 -->
    <div class="mushroom-band">
      <img
        v-for="m in waveMushrooms"
        :key="m.id"
        :src="`${base}images/mushroomImg.png`"
        :style="{ width: m.size + 'px', opacity: m.op }"
        class="wave-mushroom-img"
        alt=""
        aria-hidden="true"
      />
    </div>
  </div>
</template>

<style scoped>
.skills-page {
  position: relative;
  background-color: #fdf3e3;
  overflow-x: hidden;
  box-sizing: border-box;
  width: 100%;
}

.dog-bg {
  position: absolute; top: 0; left: 0;
  width: 100%; height: 100%;
  background-image: url('/images/dogImg.jpg');
  background-size: cover;
  background-position: center center;
  z-index: 0; opacity: 0.55;
}
.dot-bg {
  position: absolute; inset: 0;
  background-image: radial-gradient(#e6d5b8 1px, transparent 1px);
  background-size: 40px 40px; z-index: 1;
}
.overlay {
  position: absolute; inset: 0;
  background: rgba(240,240,239,0.55); z-index: 2;
}

.skills-inner {
  position: relative; z-index: 3;
  width: 100%; max-width: 1360px;
  margin: 0 auto;
  padding: clamp(60px,8vw,100px) clamp(1rem,5%,3rem) clamp(40px,5vw,60px);
  box-sizing: border-box;
}

.below-cards { position: relative; z-index: 3; height: clamp(60px,8vw,100px); }

.skills-header { text-align: center; margin-bottom: clamp(30px,5vw,60px); }
.skills-header h1 { color: #5d734a; font-size: clamp(2rem,4vw,3rem); margin-bottom: 10px; }
.skills-header p  { color: #29470b; font-size: clamp(0.9rem,1.5vw,1.2rem); }

.skills-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(14px,2vw,25px);
  width: 100%; box-sizing: border-box;
}
@media (max-width: 1024px) { .skills-grid { grid-template-columns: repeat(3,1fr); } }
@media (max-width: 768px)  { .skills-grid { grid-template-columns: repeat(2,1fr); } }

/* ── Swiper 手機：每次只顯示一張，完全置中 ── */
.swiper-wrapper-outer {
  position: relative; z-index: 1;
  width: 100%; overflow: hidden;
  box-sizing: border-box;
  padding: 0 24px;
}

.skills-swiper { width: 100%; padding-bottom: 16px; overflow: hidden; }

.skills-swiper :deep(.swiper-slide) {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}

/* 讓 SkillCard 在 swiper 裡有固定寬度 */
.skills-swiper :deep(.skill-card) {
  width: 100%;
  max-width: 320px;
}

.custom-pagination {
  display: flex; align-items: center;
  justify-content: center; gap: 8px;
  padding: 20px 0 32px; position: relative; z-index: 1;
}
.custom-pagination :deep(.pg-dot) {
  display: inline-block; width: 14px; height: 14px;
  border-radius: 50%; background: #e8a020; flex-shrink: 0;
}
.custom-pagination :deep(.pg-number) {
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 0.9rem; font-weight: 700;
  font-family: 'Noto Sans TC', sans-serif;
  color: #b87800; min-width: 20px; line-height: 1;
}

/* ── 波浪轉場 ── */
.wave-divider {
  position: relative;
  z-index: 3;
  width: 100%;
  line-height: 0;
  margin-top: -1px; /* 避免接縫出現細線 */
}

.wave-svg {
  display: block;
  width: 100%;
  height: clamp(50px, 8vw, 100px);
}

.wave-svg path {
  fill: #fdfaf6; /* 與下方香菇區背景同色，形成轉場 */
}

/* ── 香菇區 ── */
.mushroom-band {
  position: relative;
  z-index: 3;
  background: #fdfaf6;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  flex-wrap: nowrap;
  gap: 4px;
  padding: 0 16px 16px;
  box-sizing: border-box;
}

.wave-mushroom-img {
  display: block;
  min-width: 18px;
  max-width: 64px;
  object-fit: contain;
  filter:
    grayscale(1)
    sepia(1)
    saturate(2.5)
    hue-rotate(-20deg)
    brightness(1.05);
}

@media (max-width: 640px) {
  .skills-inner { padding: 60px 0 40px; }
  .skills-header { padding: 0 16px; }
  .wave-mushroom-img { min-width: 14px; }
}
</style>