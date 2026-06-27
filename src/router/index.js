// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SkillsView from '../views/SkillsView.vue';
import ProjectsView from '../views/ProjectsView.vue';

const router = createRouter({
  // 傳入 BASE_URL，本地是 '/'，GitHub Pages 是 '/my-portfolio/'
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/skills', name: 'skills', component: SkillsView },
    { path: '/projects', name: 'projects', component: ProjectsView }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
});

export default router;