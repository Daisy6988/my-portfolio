<script setup>
import { useRouter } from 'vue-router';
import { skills, projects } from '@/data/portfolioData.js';
import AppButton from '@/components/AppButton.vue';
import SkillCard from '@/components/SkillCard.vue';
import ProjectCard from '@/components/ProjectCard.vue';

const router = useRouter();

const heroBg = `url(${import.meta.env.BASE_URL}images/forest.jpg)`
</script>

<template>
  <div class="home-page">
    <section id="about" class="hero-section" :style="{ backgroundImage: heroBg }">
      <div class="intro-box">
        <h1>Hi, 我是開發者-Daisy&nbsp;怡雯</h1>
        <p>〔追求簡潔且充滿生命力的程式風格。〕</p>
        <p>〔目前我持續深化 JavaScript 與 Vue 3 的實作能力，並善用 AI 工具進行 Code Review。〕</p>
        <div class="action-buttons">
          <AppButton label="查看作品" @click="router.push('projects')" />
          <AppButton label="我的技能" @click="router.push('skills')" />
        </div>
      </div>
    </section>

    <section id="skills" class="section-container">
      <h2>我的技能</h2>
      <div class="grid-layout">
        <SkillCard v-for="skill in skills" :key="skill.title" :skill="skill" />
      </div>
    </section>

    <section id="projects" class="section-container">
      <h2>精選作品</h2>
      <div class="grid-layout">
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

.home-page {
  background-color: #fdfaf6;
  background-image: radial-gradient(#e0dcd5 1px, transparent 1px);
  background-size: 30px 30px;
  min-height: 100vh;
  padding-bottom: 50px;
  animation: fadeIn 0.5s ease both;
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
  position: absolute;
  inset: 0;
  background: rgba(253, 250, 246, 0.72);
  backdrop-filter: blur(1.5px);
}

.intro-box {
  position: relative;
  z-index: 1;
  padding: 0 20px;
}

.intro-box h1 {
  font-size: 3rem;
  color: #5d734a;
  margin-bottom: 1rem;
}

.intro-box p {
  font-size: 1.5rem;
  color: #29470b;
  line-height: 1.8;
  margin: 0 auto 0.5rem;
  max-width: 600px;
}

.action-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 30px;
}

.section-container {
  padding: 4rem 10%;
}

.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 2rem;
}

h2 {
  text-align: center;
  color: #87a96b;
  font-size: 2rem;
}

/* RWD */
@media (max-width: 768px) {
  .intro-box h1 { font-size: 2.2rem; }
  .intro-box p  { font-size: 1rem; }
}

@media (max-width: 480px) {
  .intro-box h1 { font-size: 1.8rem; }
  .intro-box p  { font-size: 0.9rem; }
  .action-buttons { gap: 12px; }
  .section-container { padding: 3rem 5%; }
}
</style>