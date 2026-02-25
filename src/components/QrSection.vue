<template>
  <div class="card qr-section">
    <div class="qr-header">
      <h2>QR điểm danh hôm nay</h2>
      <p class="date-text">{{ today }}</p>
    </div>

    <div v-if="qrCode" class="qr-display" :class="{ 'is-loading': isGenerating }">
      <div class="qr-container">
        <img :src="qrCode" alt="QR code" />
        <div v-if="isGenerating" class="qr-loading-overlay">
           <div class="spinner-small"></div>
        </div>
      </div>
      
      <div v-if="!isOnline" class="offline-warning">
         <span class="warning-icon">🚫</span>
         Hệ thống đang ngoại tuyến
      </div>

      <p class="welcome-text">
        Xin chào, <span @click="$emit('reset')" class="user-name">{{ name }}</span>!
      </p>
      <p class="refresh-note">Mã QR tự động cập nhật mỗi phút</p>
    </div>
    
    <div v-else class="qr-placeholder">
      <button @click="$emit('generate')" class="btn-generate">Tạo mã QR</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

defineProps<{
  name: string;
  qrCode: string;
  isGenerating: boolean;
  isOnline: boolean;
}>();

defineEmits(['reset', 'generate']);

const today = computed(() => {
  const now = new Date();
  return new Date(now.getTime() + 7 * 60 * 60 * 1000)
    .toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
});
</script>

<style scoped>
.card {
  background: #ffffff;
  border-radius: 16px;
  padding: 2.5rem;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.qr-header {
  margin-bottom: 2rem;
}

.date-text {
  color: #666;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

.qr-container {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
  display: inline-block;
  margin-bottom: 1.5rem;
  border: 1px solid #edf2f7;
  position: relative; /* Thêm để chứa overlay */
  overflow: hidden;
}

.qr-loading-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(2px);
}

.spinner-small {
  width: 30px;
  height: 30px;
  border: 3px solid rgba(30, 58, 138, 0.2);
  border-top-color: #1e3a8a;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.qr-display.is-loading .qr-container img {
  filter: blur(1px);
}

.offline-warning {
  background: #fef2f2;
  color: #dc2626;
  padding: 0.6rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  margin-bottom: 1rem;
  border: 1px solid #fecaca;
}

.warning-icon {
  font-size: 0.9rem;
}

.qr-container img {
  width: 220px;
  height: 220px;
  display: block;
}

.welcome-text {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.user-name {
  font-weight: 700;
  color: #1e3a8a;
  cursor: pointer;
  text-decoration: underline;
}

.refresh-note {
  font-size: 0.8rem;
  color: #94a3b8;
}

.btn-generate {
  padding: 0.9rem 1.5rem;
  border-radius: 10px;
  background: #1e3a8a;
  color: #fff;
  border: none;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
}
</style>
