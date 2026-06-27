<template>
  <nav class="navbar">
    <div class="logo" @click="navTo('/')">Daisy's Portfolio</div>

    <!-- 桌機選單 -->
    <div class="nav-links" :class="{ open: menuOpen }">
      <!-- 手機時的關閉按鈕 -->
      <button class="close-btn" @click="menuOpen = false" aria-label="關閉選單">✕</button>
      <span class="nav-item" @click="navTo('/')">首頁</span>
      <span class="nav-item" @click="navTo('/skills')">技能</span>
      <span class="nav-item" @click="navTo('/projects')">作品</span>
      <span class="nav-item" @click="openContact">聯絡我</span>
    </div>

    <!-- 漢堡按鈕（手機才顯示） -->
    <button class="hamburger" @click="menuOpen = !menuOpen" aria-label="開啟選單">
      <span></span>
      <span></span>
      <span></span>
    </button>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { skills } from '@/data/portfolioData.js';
import Swal from 'sweetalert2';

const router = useRouter();
const marqueeItems = [...skills, ...skills];
const menuOpen = ref(false);

function navTo(path) {
  router.push(path);
  menuOpen.value = false;
}

async function openContact() {
  menuOpen.value = false;
  const { value: formValues, isConfirmed } = await Swal.fire({
    title: '聯絡 Daisy',
    html: `
      <div style="text-align:left; display:flex; flex-direction:column; gap:12px;">
        <div>
          <label style="font-size:0.85rem; color:#5d734a; font-weight:600; display:block; margin-bottom:4px;">您的姓名</label>
          <input id="swal-name" class="swal2-input" placeholder="請輸入您的姓名" style="margin:0; width:100%; box-sizing:border-box;">
        </div>
        <div>
          <label style="font-size:0.85rem; color:#5d734a; font-weight:600; display:block; margin-bottom:4px;">您的 Email</label>
          <input id="swal-email" type="email" class="swal2-input" placeholder="請輸入您的 Email" style="margin:0; width:100%; box-sizing:border-box;">
        </div>
        <div>
          <label style="font-size:0.85rem; color:#5d734a; font-weight:600; display:block; margin-bottom:4px;">訊息內容</label>
          <textarea id="swal-msg" class="swal2-textarea" placeholder="請輸入您想說的話…" style="margin:0; width:100%; box-sizing:border-box; height:120px; resize:vertical;"></textarea>
        </div>
      </div>
    `,
    confirmButtonText: '送出 ✉️',
    confirmButtonColor: '#5d734a',
    cancelButtonText: '取消',
    showCancelButton: true,
    focusConfirm: false,
    preConfirm: () => {
      const name = document.getElementById('swal-name').value.trim();
      const email = document.getElementById('swal-email').value.trim();
      const msg = document.getElementById('swal-msg').value.trim();
      if (!name) { Swal.showValidationMessage('請填寫姓名'); return false; }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { Swal.showValidationMessage('請填寫有效的 Email'); return false; }
      if (!msg) { Swal.showValidationMessage('請填寫訊息內容'); return false; }
      return { name, email, msg };
    },
  });

  if (isConfirmed && formValues) {
    const { name, email, msg } = formValues;
    const subject = encodeURIComponent(`【作品集聯絡】來自 ${name}`);
    const body = encodeURIComponent(`姓名：${name}\nEmail：${email}\n\n訊息內容：\n${msg}`);
    window.location.href = `mailto:umiminee@gmail.com?subject=${subject}&body=${body}`;
    await Swal.fire({
      icon: 'success',
      title: '即將開啟郵件程式',
      text: '感謝您的聯絡，期待與您交流！🌿',
      confirmButtonColor: '#5d734a',
      timer: 3000,
      timerProgressBar: true,
    });
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px clamp(1rem, 4%, 3rem);
  background: #e8f5e9;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid #c8e6c9;
}

.logo {
  font-family: 'Times New Roman', cursive;
  font-size: clamp(1.2rem, 3vw, 2rem);
  color: #5d734a;
  cursor: pointer;
  white-space: nowrap;
  font-weight: 700;
  margin-left: clamp(0.5rem, 2%, 2rem);
}

/* ── 桌機選單 ── */
.nav-links {
  display: flex;
  gap: 32px;
  align-items: center;
  margin-right: clamp(0.5rem, 2%, 2rem);
}

.close-btn {
  display: none;
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
  white-space: nowrap;
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

/* ── 漢堡按鈕 ── */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  margin-right: 4px;
}

.hamburger span {
  display: block;
  width: 24px;
  height: 2.5px;
  background: #5d734a;
  border-radius: 2px;
  transition: all 0.3s ease;
}

/* ── 跑馬燈 ── */
.marquee-bar {
  background: #ffffff;
  border-bottom: 1px solid #e0f0e4;
  overflow: hidden;
  white-space: nowrap;
  padding: 10px 0;
  position: sticky;
  top: 57px;
  z-index: 999;
}

.marquee-track {
  display: inline-flex;
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

.marquee-item i { font-size: 1rem; color: #87a96b; }
.marquee-dot { color: #4caf7d; font-size: 0.6rem; margin-left: 12px; }

@keyframes marquee-scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* ── 手機：漢堡選單 ── */
@media (max-width: 640px) {
  .hamburger {
    display: flex;
  }

  .nav-links {
    /* 預設隱藏，open 時展開 */
    position: fixed;
    top: 0;
    right: -100%;
    width: 70vw;
    max-width: 260px;
    height: 100vh;
    background: #e8f5e9;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 24px 28px;
    gap: 28px;
    box-shadow: -4px 0 20px rgba(0,0,0,0.1);
    transition: right 0.3s ease;
    z-index: 1100;
  }

  .nav-links.open {
    right: 0;
  }

  .close-btn {
    display: block;
    align-self: flex-end;
    background: none;
    border: none;
    font-size: 1.4rem;
    color: #5d734a;
    cursor: pointer;
    padding: 0;
    margin-bottom: 8px;
  }

  .nav-item {
    font-size: 1.1rem;
  }

  .marquee-bar { top: 52px; }
  .marquee-item { font-size: 0.78rem; padding: 0 14px; }
}
</style>