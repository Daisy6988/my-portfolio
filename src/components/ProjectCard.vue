<template>
  <article class="project-card" :style="{ '--anim-color': project.animColor || '#6db56d' }" tabindex="0"
    :aria-label="`作品：${project.title}`">
    <!-- 圖片區 / 無圖顯示 Cubes 動畫 -->
    <div class="card-media" aria-hidden="true">
      <template v-if="project.imageUrl">
        <img 
        :src="project.imageUrl" 
        :alt="project.title + ' 作品截圖'" 
        class="card-img" 
        loading="lazy" />
      </template>
      <template v-else>
        <div class="card-placeholder">
          <CubesLoader />
        </div>
      </template>

      <!-- hover 展開角落遮罩 -->
      <div class="card-overlay" aria-hidden="true">
        <p class="overlay-desc">{{ project.description }}</p>
      </div>
    </div>

    <!-- 內容區 -->
    <div class="card-body">
      <div class="card-header">
        <h3 class="card-title">{{ project.title }}</h3>
        <span class="card-status" :class="project.status === '完成' ? 'status-done' : 'status-wip'">{{ project.status
          }}</span>
      </div>

      <p class="card-desc">{{ project.description }}</p>

      <!-- 技術標籤 -->
      <ul class="card-techs" aria-label="使用技術">
        <li v-for="tech in project.techs" :key="tech" class="tech-tag">{{ tech }}</li>
      </ul>

      <!-- 連結按鈕 -->
      <div class="card-links">
        <a v-if="project.githubUrl" :href="project.githubUrl" target="_blank" rel="noopener noreferrer" class="app-btn"
          :aria-label="`${project.title} GitHub 原始碼`">
          <span><i class="fa-brands fa-github" aria-hidden="true"></i> GitHub</span>
        </a>
        <span v-else class="btn-disabled" aria-label="GitHub 連結暫無提供">
          <span><i class="fa-brands fa-github" aria-hidden="true"></i> GitHub</span>
        </span>

        <a v-if="project.demoUrl" :href="project.demoUrl" target="_blank" rel="noopener noreferrer"
          class="app-btn btn-demo" :aria-label="`${project.title} 線上展示`">
          <span><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> Demo</span>
        </a>
        <span v-else class="btn-disabled" aria-label="Demo 連結暫無提供">
          <span><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> Demo</span>
        </span>
      </div>
    </div>
  </article>
</template>

<script setup>
import CubesLoader from './CubesLoader.vue'
defineProps({
  project: { type: Object, required: true },
})
</script>

<style scoped>
.project-card {
  position: relative;
  border-radius: 16px;
  background: #fffef9;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1.5px solid #e8e4d9;
}

.project-card:hover,
.project-card:focus-within {
  transform: translateY(-6px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.13);
}

/* ---- 媒體區 ---- */
.card-media {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #f0f0e8;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.project-card:hover .card-img {
  transform: scale(1.05);
}

.card-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f0f4e8 0%, #e8f0f4 100%);
}

/* ---- hover 展開角落 ---- */
.card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(24, 49, 83, 0.88);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.card-overlay::before,
.card-overlay::after {
  position: absolute;
  content: '';
  width: 20%;
  height: 20%;
  background: var(--anim-color);
  transition: all 0.5s ease;
}

.card-overlay::before {
  top: 0;
  right: 0;
  border-radius: 0 16px 0 100%;
}

.card-overlay::after {
  bottom: 0;
  left: 0;
  border-radius: 0 100% 0 16px;
}

.project-card:hover .card-overlay,
.project-card:focus-within .card-overlay {
  opacity: 1;
}

.project-card:hover .card-overlay::before,
.project-card:focus-within .card-overlay::before,
.project-card:hover .card-overlay::after,
.project-card:focus-within .card-overlay::after {
  width: 100%;
  height: 100%;
  border-radius: 0;
}

.overlay-desc {
  color: #fff;
  font-size: 0.9rem;
  line-height: 1.7;
  text-align: center;
  z-index: 2;
  position: relative;
}

/* ---- 內容區 ---- */
.card-body {
  padding: 1.2rem 1.4rem 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  flex: 1;
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
}

.card-title {
  font-size: 1rem;
  font-weight: 700;
  color: #2d3748;
  line-height: 1.4;
  margin: 0;
}

.card-status {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 20px;
  white-space: nowrap;
  flex-shrink: 0;
}

.status-done {
  background: #d1fae5;
  color: #065f46;
}

.status-wip {
  background: #fef3c7;
  color: #92400e;
}

.card-desc {
  font-size: 0.82rem;
  color: #718096;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 技術標籤 */
.card-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.tech-tag {
  font-size: 0.7rem;
  background: #f0f4e8;
  color: #4a6741;
  border: 1px solid #c8d8b8;
  border-radius: 4px;
  padding: 2px 8px;
  font-weight: 500;
}

/* 連結按鈕 */
.card-links {
  display: flex;
  gap: 0.6rem;
  margin-top: auto;
  padding-top: 0.4rem;
  flex-wrap: wrap;
}

.app-btn {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: #183153;
  font-family: 'Montserrat', 'Noto Sans TC', sans-serif;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  cursor: pointer;
  border: none;
  text-decoration: none;
  flex: 1;
}

.app-btn::after {
  content: '';
  width: 0%;
  height: 100%;
  background: #ffd401;
  position: absolute;
  transition: all 0.4s ease-in-out;
  right: 0;
}

.app-btn:hover::after {
  right: auto;
  left: 0;
  width: 100%;
}

.app-btn span {
  display: flex;
  align-items: center;
  gap: 0.35em;
  padding: 8px 14px;
  color: #fff;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  z-index: 20;
  transition: color 0.3s ease-in-out;
  position: relative;
}

.app-btn:hover span {
  color: #183153;
}

.app-btn:focus-visible {
  outline: 3px solid #ffd401;
  outline-offset: 2px;
}

.btn-demo {
  background: #4a6741;
}

.btn-demo::after {
  background: #ffd401;
}

.btn-demo:hover span {
  color: #2d3748;
}

.btn-disabled {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: #d1d5db;
  flex: 1;
  cursor: not-allowed;
}

.btn-disabled span {
  display: flex;
  align-items: center;
  gap: 0.35em;
  padding: 8px 14px;
  color: #9ca3af;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.1em;
}
</style>