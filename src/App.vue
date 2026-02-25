<template>
  <!-- Màn hình Loading khởi động -->
  <AppLoading v-if="initializing" />
  
  <div v-else>
    <!-- Banner cảnh báo Offline -->
    <Transition name="slide-down">
      <div v-if="!isOnline" class="offline-banner">
        <span class="offline-icon">⚠️</span>
        Bạn đang ngoại tuyến. Dữ liệu có thể không được đồng bộ.
      </div>
    </Transition>

    <!-- Nội dung chính của App -->
    <div class="container mt-10">
      <AppUpdater 
        :update-available="updateAvailable && isOnline"
        :is-updating="isUpdating"
        :download-progress="downloadProgress"
        :new-version="newVersion"
        @update="installAndRestart"
      />

      <NameInput 
        v-if="!nameStored"
        :initial-name="name"
        @saved="handleNameSaved"
      />

      <QrSection 
        v-else
        :name="name"
        :qr-code="qrCode"
        :is-generating="isGeneratingQR"
        :is-online="isOnline"
        @reset="resetName"
        @generate="generateQr"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useAppUpdater } from './composables/useUpdater';
import { useAttendance } from './composables/useAttendance';

// Components
import AppLoading from './components/AppLoading.vue';
import AppUpdater from './components/AppUpdater.vue';
import NameInput from './components/NameInput.vue';
import QrSection from './components/QrSection.vue';

// Logic từ Composable
const {
  updateAvailable,
  isUpdating,
  downloadProgress,
  newVersion,
  checkForUpdates,
  installAndRestart
} = useAppUpdater();

const {
  name,
  nameStored,
  initializing,
  isOnline,
  qrCode,
  isGeneratingQR,
  handleNameSaved,
  resetName,
  generateQr,
  init
} = useAttendance();

onMounted(async () => {
  if (isOnline.value) {
    await checkForUpdates();
  }
  await init();
});
</script>

<style scoped>
.offline-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #ef4444;
  color: white;
  text-align: center;
  padding: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 10px rgba(239, 68, 68, 0.3);
}

.offline-icon {
  font-size: 1rem;
}

/* Slide down animation */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-100%);
}
</style>