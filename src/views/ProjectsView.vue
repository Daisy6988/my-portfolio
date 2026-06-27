<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { projects } from '@/data/portfolioData.js';
import ProjectCard from '@/components/ProjectCard.vue';
import AppButton from '@/components/AppButton.vue';

const modules = [Pagination];
const currentFilter = ref('ALL');
const isMobile = ref(window.innerWidth <= 768);

const filteredProjects = computed(() => {
  if (currentFilter.value === 'ALL') return projects;
  return projects.filter(p => p.category === currentFilter.value);
});

function onResize() {
  isMobile.value = window.innerWidth <= 768;
}

onMounted(() => window.addEventListener('resize', onResize));
onBeforeUnmount(() => window.removeEventListener('resize', onResize));
</script>

<template>
  <div class="projects-page">
    <header class="projects-header">
      <h1>作品集</h1>
      <p>在數位森林裡所創造的每一個小實驗</p>

      <div class="filter-btns">
        <AppButton label="全部" :variant="currentFilter === 'ALL' ? 'primary' : 'secondary'"
          @click="currentFilter = 'ALL'" />
        <AppButton label="前端開發" :variant="currentFilter === 'FRONTEND' ? 'primary' : 'secondary'"
          @click="currentFilter = 'FRONTEND'" />
        <AppButton label="UI/UX 設計" :variant="currentFilter === 'DESIGN' ? 'primary' : 'secondary'"
          @click="currentFilter = 'DESIGN'" />
      </div>
    </header>

    <!-- 桌機：grid -->
    <main v-if="!isMobile" class="projects-grid">
      <ProjectCard v-for="item in filteredProjects" :key="item.id" :project="item" />
    </main>

    <!-- 手機：swiper -->
    <div v-else class="swiper-wrapper-outer">
      <Swiper :slides-per-view="'auto'" :space-between="12" :centered-slides="true" :pagination="{ clickable: true }"
        :modules="modules" class="projects-swiper">
        <SwiperSlide v-for="item in filteredProjects" :key="item.id">
          <ProjectCard :project="item" />
        </SwiperSlide>
      </Swiper>
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
}
@media (max-width: 768px) {
  .projects-page {
    padding: 80px 0;
  }

  .projects-header {
    padding: 0 20px;
  }
}

.projects-header {
  text-align: center;
  margin-bottom: 50px;
}

.projects-header h1 {
  color: #5d734a;
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.projects-header p {
  color: #87a96b;
  font-size: 1.1rem;
}

.filter-btns {
  margin-top: 24px;
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
  /* 手機自動換行 */
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.swiper-wrapper-outer {
  padding: 0 16px 40px;
  box-sizing: border-box;
  overflow: hidden;
}

.projects-swiper {
  width: 100%;
 padding: 8px 0 36px;
  overflow: hidden;
}

.projects-swiper :deep(.swiper-slide) {
   width: 85vw;
  max-width: 340px;
  height: auto;
  box-sizing: border-box;
}

.projects-swiper :deep(.swiper-pagination-bullet-active) {
  background: #5d734a;
}
</style>