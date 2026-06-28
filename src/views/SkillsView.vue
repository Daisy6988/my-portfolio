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

@media (max-width: 640px) {
  .skills-inner { padding: 60px 0 40px; }
  .skills-header { padding: 0 16px; }
}
</style>