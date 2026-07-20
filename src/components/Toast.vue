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
  width: calc(100% - 48px);

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
  background: #2563eb;
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

/* Tablet */
@media (max-width: 768px) {
  .toast {
    top: 20px;
    right: 20px;
    left: 20px;

    width: auto;
    min-width: auto;
    max-width: none;
  }
}

/* Small phones */
@media (max-width: 480px) {
  .toast {
    top: 16px;
    left: 16px;
    right: 16px;

    padding: 14px 16px;
    font-size: 0.9rem;
    border-radius: 8px;
  }
}
</style>