<template>
  <div class="container mt-10">
    <Transition name="fade">
      <div v-if="updateAvailable" class="update-overlay">
        <div class="update-card">
          <h2>🚀 Cập nhật hệ thống</h2>
          {{ newVersion }}
          <p>Phiên bản mới <strong>v{{ newVersion }}</strong> đã sẵn sàng.</p>
          
          <div v-if="isUpdating" class="progress-container">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: downloadProgress + '%' }"></div>
            </div>
            <span>Đang tải: {{ downloadProgress }}%</span>
          </div>

          <div v-else class="update-actions">
            <button @click="installAndRestart" class="btn-update">Cập nhật ngay</button>
            <p class="update-note">Ứng dụng sẽ tự khởi động lại sau khi xong.</p>
          </div>
        </div>
      </div>
    </Transition>

    <div v-if="!nameStored" class="card name-input">
      <h2>Nhập tên bạn</h2>
      <input v-model="name" placeholder="Ví dụ: Nguyễn Văn A" />
      <button @click="saveName">Xác nhận</button>
    </div>

    <div v-else class="card qr-section">
      <h2>QR điểm danh hôm nay</h2>
      <div v-if="qrCode" class="qr-display">
        <img :src="qrCode" alt="QR code" />
        <p class="user-name" >Xin chào, <span @click="resetName">{{ name }}</span>!</p>
      </div>
      <div v-else>
        <button @click="generateQr">Tạo QR</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import QRCode from 'qrcode';
import { useAppUpdater } from './composables/useUpdater';
import { invoke } from '@tauri-apps/api/core';

// Khởi tạo Updater
const {
  updateAvailable,
  isUpdating,
  downloadProgress,
  newVersion,
  checkForUpdates,
  installAndRestart
} = useAppUpdater();

// Logic QR cũ của bạn
const systemInfo = ref({
  os: '',
  arch: '',
  host: '',
});
const name = ref('');
const qrCode = ref('');
const url = ref('');
const nameStored = ref(false);

async function loadSystemInfo() {
  const [os, arch, host] = await invoke<[string, string, string]>('get_system_info');
  systemInfo.value = { os, arch, host };
}

function resetName() {
  localStorage.removeItem('userName');
  name.value = '';
  nameStored.value = false;
  qrCode.value = '';
}

function saveName() {
  if (!name.value) return alert('Nhập tên đi bro!');
  localStorage.setItem('userName', name.value);
  nameStored.value = true;
  generateQr();
}

async function generateQr() {
  const storedName = localStorage.getItem('userName');
  if (!storedName) return;

  const now = new Date();
  const today = new Date(
    now.getTime() + 7 * 60 * 60 * 1000
  ).toISOString().split("T")[0];

  const payload = {
    name: storedName,
    date: today,
    os: systemInfo.value.os,
    arch: systemInfo.value.arch,
    host: systemInfo.value.host,
  };

  const encodedPayload = encodeURIComponent(
    btoa(encodeURIComponent(JSON.stringify(payload)))
  );


  url.value = `https://script.google.com/macros/s/AKfycbxLyuC4YC2619EAII_yFbvp3Mhe_V7cAAJXbsUzON0MCFFGTrI_P0bmnaPiLKsMfjIF/exec?data=${encodedPayload}`;
  qrCode.value = await QRCode.toDataURL(url.value);
}

onMounted(async () => {
  await checkForUpdates();
  await loadSystemInfo();
  const stored = localStorage.getItem('userName');
  if (stored) {
    nameStored.value = true;
    name.value = stored;
    generateQr();
    setInterval(generateQr, 60 * 1000);
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

/* Style cho Updater */
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
  background: #4f46e5;
  transition: width 0.3s ease;
}

.btn-update {
  background: #10b981;
  width: 100%;
  margin-top: 1rem;
}

.update-note {
  font-size: 0.8rem;
  color: #666;
  margin-top: 1rem;
}

/* Style cũ của bạn */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Inter', sans-serif;
}

.card {
  background: #ffffff;
  border-radius: 16px;
  padding: 2.5rem;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

input {
  width: 100%;
  padding: 0.8rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
  box-sizing: border-box;
}

button {
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  background: #4f46e5;
  color: #fff;
  border: none;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
}

.qr-display img {
  width: 220px;
  height: 220px;
  margin-bottom: 1rem;
}

.user-name {
  font-weight: 600;
  color: #4f46e5;
}

/* Hiệu ứng mờ dần */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.mt-10 {
  margin-top: 2.5rem;
}
</style>