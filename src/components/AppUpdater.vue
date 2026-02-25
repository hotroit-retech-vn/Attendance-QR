<template>
  <Transition name="fade">
    <div v-if="updateAvailable" class="update-overlay">
      <div class="update-card">
        <h2>🚀 Cập nhật hệ thống</h2>
        <p>Phiên bản mới <strong>v{{ newVersion }}</strong> đã sẵn sàng.</p>
        
        <div v-if="isUpdating" class="progress-container">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: downloadProgress + '%' }"></div>
          </div>
          <span>Đang tải: {{ downloadProgress }}%</span>
        </div>

        <div v-else class="update-actions">
          <button @click="$emit('update')" class="btn-update">Cập nhật ngay</button>
          <p class="update-note">Ứng dụng sẽ tự khởi động lại sau khi xong.</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  updateAvailable: boolean;
  isUpdating: boolean;
  downloadProgress: number;
  newVersion: string;
}>();

defineEmits(['update']);
</script>

<style scoped>
.update-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
}

.update-card {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  text-align: center;
  max-width: 350px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.progress-container {
  margin-top: 1.5rem;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background: #eee;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: #1e3a8a;
  transition: width 0.3s ease;
}

.btn-update {
  background: #10b981;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
}

.update-note {
  font-size: 0.8rem;
  color: #666;
  margin-top: 1rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
