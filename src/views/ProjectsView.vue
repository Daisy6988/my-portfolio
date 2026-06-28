<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import { projects } from '@/data/portfolioData.js';
import ProjectCard from '@/components/ProjectCard.vue';
import AppButton from '@/components/AppButton.vue';

const modules = [Pagination];
const currentFilter = ref('ALL');
const isMobile = ref(window.innerWidth <= 640);
const projectsPagination = ref(null);
let projectsSwiper = null;

const filteredProjects = computed(() => {
  if (currentFilter.value === 'ALL') return projects;
  return projects.filter(p => p.category === currentFilter.value);
});

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

function onProjectsSwiper(swiper) {
  projectsSwiper = swiper;
  renderPagination(projectsPagination.value, 1, swiper.slides.length);
}
function onProjectsSlideChange(swiper) {
  renderPagination(projectsPagination.value, swiper.activeIndex + 1, swiper.slides.length);
}
function setFilter(val) {
  currentFilter.value = val;
  setTimeout(() => {
    if (projectsSwiper) renderPagination(projectsPagination.value, 1, projectsSwiper.slides.length);
  }, 50);
}
function onResize() { isMobile.value = window.innerWidth <= 640; }

onMounted(() => window.addEventListener('resize', onResize));
onBeforeUnmount(() => window.removeEventListener('resize', onResize));
</script>

<template>
  <div class="projects-page">
    <div class="projects-inner">
      <header class="projects-header">
        <h1>作品集</h1>
        <p>在數位森林裡所創造的每一個小實驗</p>
        <div class="filter-btns">
          <AppButton label="全部" :variant="currentFilter === 'ALL' ? 'primary' : 'secondary'" @click="setFilter('ALL')" />
          <AppButton label="前端開發" :variant="currentFilter === 'FRONTEND' ? 'primary' : 'secondary'" @click="setFilter('FRONTEND')" />
          <AppButton label="UI/UX 設計" :variant="currentFilter === 'DESIGN' ? 'primary' : 'secondary'" @click="setFilter('DESIGN')" />
        </div>
      </header>

      <main v-if="!isMobile" class="projects-grid">
        <ProjectCard v-for="item in filteredProjects" :key="item.id" :project="item" />
      </main>

      <div v-else class="swiper-wrapper-outer">
        <Swiper
          :slides-per-view="1"
          :space-between="0"
          :centered-slides="true"
          :modules="modules"
          class="projects-swiper"
          @swiper="onProjectsSwiper"
          @slideChange="onProjectsSlideChange"
        >
          <SwiperSlide v-for="item in filteredProjects" :key="item.id">
            <ProjectCard :project="item" />
          </SwiperSlide>
        </Swiper>
        <div ref="projectsPagination" class="custom-pagination"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.projects-page {
  background-color: #fdfaf6;
  background-image: radial-gradient(#e6e3da 1px, transparent 1px);
  background-size: 40px 40px;
  min-height: 100vh;
  overflow-x: hidden;
  box-sizing: border-box;
  width: 100%;
}

.projects-inner {
  max-width: 1360px; margin: 0 auto;
  padding: clamp(60px,8vw,100px) clamp(1rem,5%,3rem) clamp(40px,5vw,60px);
  box-sizing: border-box; width: 100%;
}

.projects-header { text-align: center; margin-bottom: clamp(30px,4vw,50px); }
.projects-header h1 { color: #5d734a; font-size: clamp(2rem,4vw,3rem); margin-bottom: 10px; }
.projects-header p  { color: #29470b; font-size: clamp(0.9rem,1.5vw,1.2rem); }

.filter-btns {
  margin-top: 24px; display: flex;
  justify-content: center; gap: 10px; flex-wrap: wrap;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: clamp(16px,2vw,30px);
  width: 100%; box-sizing: border-box;
}
@media (max-width: 1024px) { .projects-grid { grid-template-columns: repeat(2,1fr); } }

/* ── Swiper 手機 ── */
.swiper-wrapper-outer {
  width: 100%; overflow: hidden;
  box-sizing: border-box;
  padding: 0 24px;
}

.projects-swiper { width: 100%; padding-bottom: 16px; overflow: hidden; }

.projects-swiper :deep(.swiper-slide) {
  width: 100%; height: auto;
  box-sizing: border-box;
  display: flex; justify-content: center;
}

.projects-swiper :deep(.project-card) {
  width: 100%;
  max-width: 360px;
}

.custom-pagination {
  display: flex; align-items: center;
  justify-content: center; gap: 8px;
  padding: 20px 0 32px;
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
  .projects-inner { padding: 60px 0 40px; }
  .projects-header { padding: 0 16px; }
}
</style>