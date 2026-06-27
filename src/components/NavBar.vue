<template>
  <nav class="navbar">
    <div class="logo" @click="$router.push('/')">Daisy's Portfolio</div>
    <div class="nav-links">
      <span class="nav-item" @click="$router.push('/')">首頁</span>
      <span class="nav-item" @click="$router.push('/skills')">技能</span>
      <span class="nav-item" @click="$router.push('/projects')">作品</span>
    </div>
  </nav>

  <!-- 跑馬燈 -->
  <div class="marquee-bar">
    <div class="marquee-track">
      <span v-for="(skill, i) in marqueeItems" :key="i" class="marquee-item">
        <i :class="skill.icon" aria-hidden="true"></i>
        {{ skill.title }}
        <span class="marquee-dot">✦</span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { skills } from '@/data/portfolioData.js';

// 複製兩份讓跑馬燈無縫銜接
const marqueeItems = [...skills, ...skills];
</script>

<style scoped>
/* ── Navbar ── */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 5%;
  background: #e8f5e9;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid #c8e6c9;
}

.logo {
  font-family: 'Times New Roman', cursive;
  font-size: 2rem;
  color: #5d734a;
  cursor: pointer;
  white-space: nowrap;
  font-weight: 700;
}

.nav-links {
  display: flex;
  gap: 32px;
  align-items: center;
}

.nav-item {
  position: relative;
  color: #5d734a;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Noto Sans TC', sans-serif;
  cursor: pointer;
  padding-bottom: 4px;
  letter-spacing: 0.05em;
  transition: color 0.2s ease;
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 2px;
  background-color: #4caf7d;
  border-radius: 2px;
  transition: width 0.3s ease;
}

.nav-item:hover { color: #3e5c35; }
.nav-item:hover::after { width: 100%; }

/* ── 跑馬燈 ── */
.marquee-bar {
  background: #ffffff;
  border-bottom: 1px solid #e0f0e4;
  overflow: hidden;
  white-space: nowrap;
  padding: 10px 0;
  position: sticky;
  top: 65px;   /* navbar 高度，讓跑馬燈跟著吸頂 */
  z-index: 999;
}

.marquee-track {
  display: inline-flex;
  gap: 0;
  animation: marquee-scroll 30s linear infinite;
}

.marquee-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #5d734a;
  font-size: 0.88rem;
  font-weight: 600;
  font-family: 'Noto Sans TC', sans-serif;
  padding: 0 20px;
  white-space: nowrap;
}

.marquee-item i {
  font-size: 1rem;
  color: #87a96b;
}

.marquee-dot {
  color: #4caf7d;
  font-size: 0.6rem;
  margin-left: 12px;
}

@keyframes marquee-scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* 平板 */
@media (max-width: 768px) {
  .logo { font-size: 1.4rem; }
  .nav-links { gap: 20px; }
  .marquee-bar { top: 57px; }
}

/* 手機 */
@media (max-width: 480px) {
  .navbar { padding: 12px 4%; }
  .logo { font-size: 1.1rem; }
  .nav-links { gap: 14px; }
  .nav-item { font-size: 0.85rem; }
  .marquee-bar { top: 49px; }
  .marquee-item { font-size: 0.78rem; padding: 0 14px; }
}
</style>