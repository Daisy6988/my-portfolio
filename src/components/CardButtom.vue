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
  border-radius: 5px;
  background: #183153;
  font-family: 'Montserrat', 'Noto Sans TC', sans-serif;
  box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  cursor: pointer;
  border: none;
  text-decoration: none;
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
  gap: 0.4em;
  text-align: center;
  text-decoration: none;
  padding: 12px 22px;
  color: #fff;
  font-size: 0.9em;
  font-weight: 700;
  letter-spacing: 0.2em;
  z-index: 20;
  transition: all 0.3s ease-in-out;
  position: relative;
}
.app-btn:hover span {
  color: #183153;
  animation: btnScaleUp 0.3s ease-in-out;
}
.app-btn:focus-visible {
  outline: 3px solid #ffd401;
  outline-offset: 3px;
}
@keyframes btnScaleUp {
  0%   { transform: scale(1); }
  50%  { transform: scale(0.95); }
  100% { transform: scale(1); }
}
</style>