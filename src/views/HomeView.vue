<script setup>
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { skills, projects } from '@/data/portfolioData.js';
import AppButton from '@/components/AppButton.vue';
import SkillCard from '@/components/SkillCard.vue';
import ProjectCard from '@/components/ProjectCard.vue';
import qrcode from '@/assets/qrcode.png';

const router = useRouter();
const heroBg = `url(${import.meta.env.BASE_URL}images/forest.jpg)`;

// 作品區：不依賴捲動，頁面載入後就直接滑入
const projectsIn = ref(false);

onMounted(() => {
  // 技能區：維持捲動觸發的從右滑入
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('slide-in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll('.slide-from-right').forEach(el => observer.observe(el));

  // 作品區：載入後立即觸發滑入動畫（稍微延遲讓動畫感更明顯）
  requestAnimationFrame(() => {
    setTimeout(() => {
      projectsIn.value = true;
    }, 150);
  });
});
</script>

<template>
  <div class="home-page">
    <section id="about" class="hero-section" :style="{ backgroundImage: heroBg }">
      <div class="intro-box">
        <h1>Hi, 我是開發者-Daisy</h1>
        <p>追求簡潔且充滿生命力的程式風格。</p>
        <p>目前我持續深化 JavaScript 與 Vue 3 的實作能力，並善用 AI 工具進行 Code Review。</p>
        <div class="action-buttons">
          <AppButton label="查看作品" @click="router.push('projects')" />
          <AppButton label="我的技能" @click="router.push('skills')" />
        </div>
      </div>

      <!-- QR Code 右下角 -->
      <div class="qr-block">
        <img :src="qrcode" alt="手機版 QR Code" class="qr-img" />
        <span class="qr-label">📱 手機版</span>
      </div>
    </section>

    <!-- 技能：捲動到才從右滑入 -->
    <section id="skills" class="section-container slide-from-right">
      <h2>我的技能</h2>
      <div class="grid-skills">
        <SkillCard v-for="skill in skills" :key="skill.title" :skill="skill" />
      </div>
    </section>

    <!-- 作品：頁面載入後立即從左滑入，不等捲動 -->
    <section id="projects" class="section-container slide-from-left" :class="{ 'slide-in': projectsIn }">
      <h2>精選作品</h2>
      <div class="grid-projects">
        <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* 從右滑入（技能區，捲動觸發） */
.slide-from-right {
  opacity: 0;
  transform: translateX(70px);
  transition: opacity 0.75s ease, transform 0.75s ease;
}

/* 從左滑入（作品區，載入後立即觸發） */
.slide-from-left {
  opacity: 0;
  transform: translateX(-70px);
  transition: opacity 0.75s ease, transform 0.75s ease;
}

/* 觸發後 */
.slide-from-right.slide-in,
.slide-from-left.slide-in {
  opacity: 1;
  transform: translateX(0);
}

.home-page {
  background-color: #fdfaf6;
  background-image: radial-gradient(#e0dcd5 1px, transparent 1px);
  background-size: 30px 30px;
  min-height: 100vh;
  padding-bottom: 50px;
  animation: fadeIn 0.5s ease both;
  overflow-x: hidden;
}

.hero-section {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-size: cover;
  background-position: center;
  position: relative;
}

.hero-section::before {
  content: '';
  position: absolute; inset: 0;
  background: rgba(253,250,246,0.72);
  backdrop-filter: blur(1.5px);
}

.intro-box {
  position: relative; z-index: 1;
  padding: 0 20px;
  width: 100%; max-width: 800px;
}

.intro-box h1 {
  font-size: clamp(1.8rem, 4vw, 3rem);
  color: #5d734a; margin-bottom: 1rem;
}

.intro-box p {
  font-size: clamp(0.95rem, 1.5vw, 1.2rem);
  color: #29470b; line-height: 1.8;
  margin: 0 auto 0.5rem;
}

.action-buttons {
  display: flex; gap: 20px;
  justify-content: center;
  margin-top: 30px; flex-wrap: wrap;
}

/* QR Code */
.qr-block {
  position: absolute;
  bottom: 24px; right: 24px;
  z-index: 2;
  display: flex; flex-direction: column;
  align-items: center; gap: 6px;
}

.qr-img {
  width: 90px; height: 90px;
  border-radius: 10px;
  border: 2px solid #c8e6c9;
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
  background: #fff;
}

.qr-label {
  font-size: 0.78rem;
  color: #5d734a; font-weight: 600;
  font-family: 'Noto Sans TC', sans-serif;
  background: rgba(255,255,255,0.85);
  padding: 2px 10px; border-radius: 20px;
}

@media (max-width: 480px) {
  .qr-img { width: 64px; height: 64px; }
  .qr-label { font-size: 0.68rem; }
  .qr-block { bottom: 16px; right: 16px; }
  .action-buttons { gap: 12px; }
}

.section-container {
  padding: clamp(2rem,5vw,4rem) clamp(1rem,5%,3rem);
  max-width: 1360px;
  margin: 0 auto;
  width: 100%; box-sizing: border-box;
}

h2 {
  text-align: center;
  color: #87a96b;
  font-size: clamp(1.4rem,2.5vw,2rem);
  margin-bottom: 0;
}

.grid-skills {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px,1fr));
  gap: clamp(14px,2vw,25px);
  margin-top: 2rem;
}

.grid-projects {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px,1fr));
  gap: clamp(16px,2vw,30px);
  margin-top: 2rem;
}
</style>