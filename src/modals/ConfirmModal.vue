<script setup lang="ts">
defineProps<{
  show: boolean
  title: string
  message: string
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()
</script>

<template>
  <div
    v-if="show"
    class="modal-overlay"
  >
    <div class="modal">
      <h2>{{ title }}</h2>

      <p>{{ message }}</p>

      <div class="modal-actions">
        <button
          class="cancel-btn"
          @click="emit('cancel')"
        >
          Cancel
        </button>

        <button
          class="delete-btn"
          @click="emit('confirm')"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(17, 24, 39, 0.55);
  backdrop-filter: blur(4px);

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 20px;

  z-index: 1000;
}

.modal {
  width: 420px;
  max-width: 100%;
  background: #ffffff;

  border-radius: 18px;
  padding: 28px;

  box-shadow: 0 20px 50px rgba(0,0,0,.18);

  animation: popup .25s ease;

  box-sizing: border-box;
}

.modal h2 {
  margin: 0;
  color: #111827;
  font-size: 1.4rem;
  font-weight: 700;
}

.modal p {
  margin: 16px 0 28px;
  color: #6b7280;
  line-height: 1.6;
  font-size: .95rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.cancel-btn,
.delete-btn {
  min-width: 110px;
  min-height: 44px;

  padding: 12px 20px;

  border-radius: 10px;
  border: none;

  font-size: .95rem;
  font-weight: 600;

  cursor: pointer;
  transition: all .2s ease;
}

.cancel-btn {
  background: #f3f4f6;
  color: #374151;
}

.cancel-btn:hover {
  background: #e5e7eb;
}

.delete-btn {
  background: #dc2626;
  color: white;
}

.delete-btn:hover {
  background: #b91c1c;
  transform: translateY(-2px);
}

.delete-btn:active,
.cancel-btn:active {
  transform: translateY(0);
}

@keyframes popup {
  from {
    opacity: 0;
    transform: scale(.95) translateY(-12px);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@media (max-width:768px) {

  .modal {
    width: 100%;
    max-width: 500px;
    padding: 24px;
  }

  .modal h2 {
    font-size: 1.25rem;
  }

  .modal p {
    font-size: .92rem;
  }
}


@media (max-width:500px) {

  .modal {
    width: 100%;
    padding: 20px;
    border-radius: 14px;
  }

  .modal h2 {
    font-size: 1.15rem;
  }

  .modal p {
    margin: 14px 0 22px;
    font-size: .9rem;
  }

  .modal-actions {
    flex-direction: column-reverse;
  }

  .cancel-btn,
  .delete-btn {
    width: 100%;
  }
}
</style>