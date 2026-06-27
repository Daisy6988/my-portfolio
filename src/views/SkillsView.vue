<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { skills } from '@/data/portfolioData.js';
import SkillCard from '@/components/SkillCard.vue';

const modules = [Pagination];
const isMobile = ref(window.innerWidth <= 768);

function onResize() {
  isMobile.value = window.innerWidth <= 768;
}

onMounted(() => window.addEventListener('resize', onResize));
onBeforeUnmount(() => window.removeEventListener('resize', onResize));
</script>

<template>
  <div class="skills-page">
    <header class="skills-header">
      <h1>技能樹</h1>
      <p>探索我在森林中習得的各種能力</p>
    </header>

    <!-- 桌機：grid -->
    <main v-if="!isMobile" class="skills-grid">
      <SkillCard v-for="item in skills" :key="item.title" :skill="item" />
    </main>

    <!-- 手機：swiper -->
    <div v-else class="swiper-wrapper-outer">
      <Swiper :slides-per-view="1.08" :space-between="12" :centered-slides="true" :pagination="{ clickable: true }"
        :modules="modules" class="skills-swiper">
        <SwiperSlide v-for="item in skills" :key="item.title">
          <SkillCard :skill="item" />
        </SwiperSlide>
      </Swiper>
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
}


.skills-page::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(240, 240, 239, 0.6);
  z-index: 0;
}

/* 讓內容浮在遮罩上 */
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
  color: #254c05;
  font-size: 1.2rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
  max-width: 1100px;
  margin: 0 auto;
}



.swiper-wrapper-outer {
  padding: 0 20px 40px;
  box-sizing: border-box;
  overflow: hidden;
}

.skills-swiper {
  width: 100%;
   padding: 10px 0 36px;
}

.skills-swiper :deep(.swiper-slide) {
  width: 280px;
  height: auto;
}

.skills-swiper :deep(.swiper-pagination-bullet-active) {
  background: #5d734a;
}
</style>