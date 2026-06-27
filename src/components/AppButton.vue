<template>
  <button
    :class="['app-btn', variant]"
    :aria-label="ariaLabel || label"
    v-bind="$attrs"
  >
    <span>
      <i v-if="icon" :class="icon" aria-hidden="true"></i>
      {{ label }}
    </span>
  </button>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  icon: { type: String, default: '' },
  ariaLabel: { type: String, default: '' },
  variant: { type: String, default: 'primary' },
})
</script>

<style scoped>
.app-btn {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  
  /* 增加漸層：從較亮的草綠到深森林綠 */
  background: linear-gradient(180deg, #a3c489 0%, #5d734a 100%);
  
  /* 增加內陰影增加立體感 */
  box-shadow: 
    0px 4px 10px rgba(93, 115, 74, 0.3), 
    inset 0px 1px 2px rgba(255, 255, 255, 0.4);
  
  font-family: 'Noto Sans TC', sans-serif;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid #4a5e3a; /* 增加細邊框更有質感 */
  text-decoration: none;
  transition: all 0.3s ease;
  margin: 0;
}

.app-btn::after {
  content: '';
  width: 0%;
  height: 100%;
  /* 滑入時顏色變得更亮 */
  background: linear-gradient(180deg, #d4e3c5 0%, #87a96b 100%);
  position: absolute;
  transition: all 0.4s ease-in-out;
  right: 0;
  z-index: 1;
}

.app-btn:hover::after {
  right: auto;
  left: 0;
  width: 100%;
}

.app-btn span {
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding: 8px 14px;
  color: #fff;
  font-size: 0.95em;
  font-weight: 700;
  letter-spacing: 0.1em;
  z-index: 2; /* 確保文字浮在漸層背景上方 */
  position: relative;
  text-shadow: 0px 1px 2px rgba(243, 237, 237, 0.2); 
  transition: all 0.3s ease-in-out;
  font-family: 'Noto Sans TC', sans-serif;                  
  font-size: 1.1rem;                   
}

@media (max-width: 480px) {
  .app-btn span {
    padding: 6px 10px;
    font-size: 0.8rem;
  }

.app-btn:hover span {
  color: #3e4d31; 
  text-shadow: none;
}

/* 變體：紙張淺色系也加上漸層 */
.app-btn.secondary {
  background: linear-gradient(180deg, #fdfaf6 0%, #e8e4d9 100%);
  border: 1px solid #dcd7ce;
}
.app-btn.secondary span {
  color: #5d734a;
}
.app-btn.secondary::after {
  background: linear-gradient(180deg, #ffffff 0%, #c8d8b8 100%);
}
}
</style>