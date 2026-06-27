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
        <h1>Hi, 我是開發者-Daisy</h1>
        <p>【追求簡潔且充滿生命力的程式風格。】</p>
        <p>【目前我持續深化 JavaScript 與 Vue 3 的實作能力，並善用 AI 工具進行 Code Review】</p>
        <div class="action-buttons">
          <AppButton label="查看作品" @click="router.push('projects')" />
          <AppButton label="我的技能" @click="router.push('skills')" />
        </div>
      </div>
    </section>

    <section id="skills" class="section-container">
      <h2>我的技能</h2>
      <div class="grid-skills">
        <SkillCard v-for="skill in skills" :key="skill.title" :skill="skill" />
      </div>
    </section>

    <section id="projects" class="section-container">
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

.home-page {
  background-color: #fdfaf6;
  background-image: radial-gradient(#e0dcd5 1px, transparent 1px);
  background-size: 30px 30px;
  min-height: 100vh;
  padding-bottom: 50px;
  animation: fadeIn 0.5s ease both;
}

/* ── Hero ── */
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
  width: 100%;
  max-width: 800px;
}

.intro-box h1 {
  font-size: clamp(1.8rem, 4vw, 3rem);
  color: #5d734a;
  margin-bottom: 1rem;
}

.intro-box p {
  font-size: clamp(0.95rem, 1.5vw, 1.5rem);
  color: #29470b;
  line-height: 1.8;
  margin: 0 auto 0.5rem;
}

.action-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 30px;
  flex-wrap: wrap;
}

/* ── Section 共用 ── */
.section-container {
  padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 5%, 3rem);
  max-width: 1360px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

h2 {
  text-align: center;
  color: #87a96b;
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  margin-bottom: 0;
}

/* ── 技能 grid ── */
.grid-skills {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: clamp(14px, 2vw, 25px);
  margin-top: 2rem;
}

/* ── 作品 grid ── */
.grid-projects {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: clamp(16px, 2vw, 30px);
  margin-top: 2rem;
}

@media (max-width: 480px) {
  .action-buttons { gap: 12px; }
}
</style>