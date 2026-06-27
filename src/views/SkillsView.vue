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
    if (i === current) {
      items.push(`<span class="pg-number">${i}</span>`);
    } else if (diff > -NEIGHBORS - 1 && diff < NEIGHBORS + 1) {
      items.push(`<span class="pg-dot"></span>`);
    }
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

function onResize() {
  isMobile.value = window.innerWidth <= 640;
}

onMounted(() => window.addEventListener('resize', onResize));
onBeforeUnmount(() => window.removeEventListener('resize', onResize));
</script>

<template>
  <div class="skills-page">
    <header class="skills-header">
      <h1>技能樹</h1>
      <p>〔探索我在森林中習得的各種能力〕</p>
    </header>

    <!-- 桌機 + 平板：grid -->
    <main v-if="!isMobile" class="skills-grid">
      <SkillCard v-for="item in skills" :key="item.title" :skill="item" />
    </main>

    <!-- 手機：swiper -->
    <div v-else class="swiper-wrapper-outer">
      <Swiper
        :slides-per-view="1.08"
        :space-between="12"
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
</template>

<style scoped>
.skills-page {
  min-height: 100vh;
  padding: 80px 5%;
  position: relative;
  background-color: #fdf3e3;
  background-image:
    url('/images/dogImg.jpg'),
    radial-gradient(#e6d5b8 1px, transparent 1px);
  background-size: cover, 40px 40px;
  background-position: center, center;
  background-repeat: no-repeat, repeat;
  overflow: hidden;
  box-sizing: border-box;
}

.skills-page::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(240, 240, 239, 0.6);
  z-index: 0;
}

.skills-header,
.skills-grid {
  position: relative;
  z-index: 1;
}

.skills-header {
  text-align: center;
  margin-bottom: 60px;
}

.skills-header h1 {
  color: #5d734a;
  font-size: 3rem;
  margin-bottom: 10px;
}

.skills-header p {
  color: #29470b;
  font-size: 1.5rem;
}

/* ── 桌機 grid ── */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

@media (max-width: 1024px) {
  .skills-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* ── 手機 swiper ── */
.swiper-wrapper-outer {
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
}

.skills-swiper {
  width: 100%;
  padding-bottom: 16px;
}

.skills-swiper :deep(.swiper-slide) {
  width: 80vw;
  max-width: 300px;
  height: auto;
  box-sizing: border-box;
}

/* ── 分頁器 ── */
.custom-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 20px 0 32px;
  position: relative;
  z-index: 1;
}

.custom-pagination :deep(.pg-dot) {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #e8a020;
  flex-shrink: 0;
}

.custom-pagination :deep(.pg-number) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 700;
  font-family: 'Noto Sans TC', sans-serif;
  color: #b87800;
  min-width: 20px;
  line-height: 1;
}

/* ── 手機 header ── */
@media (max-width: 640px) {
  .skills-page {
    padding: 80px 0 0;
  }
  .skills-header {
    padding: 0 20px;
    position: relative;
    z-index: 1;
  }
  .skills-header h1 {
    font-size: 2.2rem;
  }
  .skills-header p {
    font-size: 0.95rem;
  }
}
</style>