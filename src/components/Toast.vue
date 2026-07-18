<script setup lang="ts">
defineProps<{
  show: boolean
  message: string
  type: 'success' | 'info' | 'error'
}>()
</script>

<template>
  <transition name="toast">
    <div
      v-if="show"
      class="toast"
      :class="type"
    >
      {{ message }}
    </div>
  </transition>
</template>
<style scoped>
.toast {
  position: fixed;
  top: 24px;
  right: 24px;

  min-width: 300px;
  max-width: 400px;

  padding: 16px 20px;
  border-radius: 10px;

  color: white;
  font-weight: 600;

  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);

  z-index: 9999;
}

.success {
  background: #16a34a;
}

.info {
  background: #16a34a;
}

.error {
  background: #dc2626;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.toast-enter-to,
.toast-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>