<script setup>
defineProps({
  skill: { type: Object, required: true },
})
</script>

<template>
  <article class="skill-card" tabindex="0" :aria-label="`技能：${skill.title}`">
    <div class="skill-icon" aria-hidden="true">
      <i :class="skill.icon"></i>
    </div>
    <h3 class="skill-title">{{ skill.title }}</h3>
    <p class="skill-desc">{{ skill.description }}</p>
    <ul class="skill-tags" aria-label="相關標籤">
      <li v-for="tag in skill.tags" :key="tag" class="skill-tag">{{ tag }}</li>
    </ul>
  </article>
</template>

<style scoped>
.skill-card {
  background: #fffef9;
  border: 1.5px solid #e8e4d9;
  border-radius: 16px;
  padding: clamp(1rem, 2vw, 1.6rem) clamp(0.8rem, 1.5vw, 1.4rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.6rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: default;
  box-sizing: border-box;
  min-width: 0; /* 防止 grid 炸開 */
}

.skill-card:hover,
.skill-card:focus-within {
  transform: translateY(-5px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.1);
}

.skill-card:focus-visible {
  outline: 3px solid #6db56d;
  outline-offset: 3px;
}

.skill-icon {
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  color: #6db56d;
  line-height: 1;
}

.skill-title {
  font-size: clamp(0.875rem, 1.2vw, 1.25rem);
  font-weight: 700;
  color: #2d3748;
  margin: 0;
}

.skill-desc {
  font-size: clamp(0.875rem, 1vw, 1.25rem);
  color: #718096;
  line-height: 1.6;
  margin: 0;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.3rem;
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: auto;
}

.skill-tag {
  font-size: clamp(0.8rem, 0.9vw, 1.25rem);
  background: #f0f4e8;
  color: #4a6741;
  border: 1px solid #c8d8b8;
  border-radius: 20px;
  padding: 2px 10px;
}
</style>