<template>
  <nav class="navbar">
    <div class="logo" @click="$router.push('/')">Daisy's Portfolio</div>
    <div class="nav-links">
      <AppButton label="首頁" @click="$router.push('/')" variant="secondary" />
      <AppButton label="技能" @click="$router.push('/skills')" variant="secondary" />
      <AppButton label="作品" @click="$router.push('/projects')" variant="secondary" />
    </div>
  </nav>
</template>

<script setup>
import AppButton from '@/components/AppButton.vue';
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 5%;
  background: rgba(234, 186, 124, 0.85);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 1000;
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
  gap: 10px;
}

/* 覆蓋 Nav 裡的按鈕為正圓形 */
.nav-links :deep(.app-btn) {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  padding: 0;
}

.nav-links :deep(.app-btn span) {
  padding: 0;
  font-size: 0.75rem;
  letter-spacing: 0;
}


/* 平板 */
@media (max-width: 768px) {
  .logo { font-size: 1.4rem; }
}

/* 手機 */
@media (max-width: 480px) {
  .navbar { padding: 12px 4%; }
  .logo { font-size: 1.1rem; }
  .nav-links { gap: 6px; }
}

@media (max-width: 480px) {
  .nav-links :deep(.app-btn) {
    width: 42px;
    height: 42px;
  }
  .nav-links :deep(.app-btn span) {
    font-size: 0.65rem;
  }
}

</style>