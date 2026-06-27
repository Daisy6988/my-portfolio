// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SkillsView from '../views/SkillsView.vue';
import ProjectsView from '../views/ProjectsView.vue';

const router = createRouter({
  history: createWebHistory(),
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