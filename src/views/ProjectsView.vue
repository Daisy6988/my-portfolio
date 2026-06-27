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
    if (i === current) {
      items.push(`<span class="pg-number">${i}</span>`);
    } else if (diff > -NEIGHBORS - 1 && diff < NEIGHBORS + 1) {
      items.push(`<span class="pg-dot"></span>`);
    }
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
    if (projectsSwiper) {
      renderPagination(projectsPagination.value, 1, projectsSwiper.slides.length);
    }
  }, 50);
}

function onResize() {
  isMobile.value = window.innerWidth <= 640;
}

onMounted(() => window.addEventListener('resize', onResize));
onBeforeUnmount(() => window.removeEventListener('resize', onResize));
</script>

<template>
  <div class="projects-page">
    <header class="projects-header">
      <h1>作品集</h1>
      <p>〔在數位森林裡所創造的每一個小實驗〕</p>
      <div class="filter-btns">
        <AppButton label="全部" :variant="currentFilter === 'ALL' ? 'primary' : 'secondary'"
          @click="setFilter('ALL')" />
        <AppButton label="前端開發" :variant="currentFilter === 'FRONTEND' ? 'primary' : 'secondary'"
          @click="setFilter('FRONTEND')" />
        <AppButton label="UI/UX 設計" :variant="currentFilter === 'DESIGN' ? 'primary' : 'secondary'"
          @click="setFilter('DESIGN')" />
      </div>
    </header>

    <!-- 桌機 + 平板：grid -->
    <main v-if="!isMobile" class="projects-grid">
      <ProjectCard v-for="item in filteredProjects" :key="item.id" :project="item" />
    </main>

    <!-- 手機：swiper -->
    <div v-else class="swiper-wrapper-outer">
      <Swiper
        :slides-per-view="'auto'"
        :space-between="12"
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
</template>

<style scoped>
.projects-page {
  padding: 80px 5%;
  background-color: #fdfaf6;
  background-image: radial-gradient(#e6e3da 1px, transparent 1px);
  background-size: 40px 40px;
  min-height: 100vh;
  box-sizing: border-box;
}

.projects-header {
  text-align: center;
  margin-bottom: 50px;
}

.projects-header h1 {
  color: #5d734a;
  font-size: 3rem;
  margin-bottom: 10px;
}

.projects-header p {
  color: #29470b;
  font-size: 1.5rem;
}

.filter-btns {
  margin-top: 24px;
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
}

/* ── 桌機 grid ── */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

@media (max-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* ── 手機 swiper ── */
.swiper-wrapper-outer {
  padding: 0 0 0;
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
}

.projects-swiper {
  width: 100%;
  padding-bottom: 16px;
  overflow: hidden;
}

.projects-swiper :deep(.swiper-slide) {
  width: 85vw;
  max-width: 340px;
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

/* ── 手機 header padding ── */
@media (max-width: 640px) {
  .projects-page {
    padding: 80px 0 0;
  }
  .projects-header {
    padding: 0 20px;
  }
  .projects-header h1 {
    font-size: 2.2rem;
  }
  .projects-header p {
    font-size: 0.95rem;
  }
}
</style>