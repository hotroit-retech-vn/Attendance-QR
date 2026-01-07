<template>
  <div class="container">
    <div v-if="!nameStored" class="card name-input">
      <h2>Nhập tên bạn</h2>
      <input v-model="name" placeholder="Nhập tên bạn" />
      <button @click="saveName">Xác nhận</button>
    </div>

    <div v-else class="card qr-section">
      <h2>QR điểm danh hôm nay</h2>
      <div v-if="qrCode" class="qr-display">
        <img :src="qrCode" alt="QR code" />
        <p class="url">{{ url }}</p>
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

const name = ref('');
const qrCode = ref('');
const url = ref('');
const nameStored = ref(false);
let lastDate = '';

function encodeData(input: string) {
  return btoa(unescape(encodeURIComponent(input)));
}

function saveName() {
  if (!name.value) return alert('Nhập tên đi bro!');
  localStorage.setItem('userName', name.value);
  nameStored.value = true;
  generateQr(); // tạo QR ngay sau khi lưu tên
}

async function generateQr() {
  const storedName = localStorage.getItem('userName');
  if (!storedName) return;

  const today = new Date().toISOString().split('T')[0];
  if (today === lastDate) return;

  const encodedName = encodeData(storedName);
  const encodedDate = encodeData(today);

  url.value = `https://script.google.com/macros/s/AKfycbwizYOmq6oeyXb1GL_dWpOzJ_9hF57zPva-ICPTjEUIljxsJHRt_utkPNajuPG8MNbo/exec?name=${encodedName}&date=${encodedDate}`;
  qrCode.value = await QRCode.toDataURL(url.value);

  lastDate = today;
}

onMounted(() => {
  // const stored = localStorage.getItem('userName');
  // if (stored) {
  //   nameStored.value = true;
  //   name.value = stored;
  //   generateQr();

  //   setInterval(generateQr, 60 * 1000); // auto refresh mỗi 1 phút
  // }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

body, html {
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Inter', sans-serif;
  padding: 1rem;
}

.card {
  background: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.12);
}

h2 {
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
}

input {
  width: 100%;
  padding: 0.8rem 0.2rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 1rem;
  margin-bottom: 1rem;
  transition: border 0.2s;
}

input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 5px rgba(79, 70, 229, 0.3);
}

button {
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  background: #4f46e5;
  color: #fff;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}

button:hover {
  background: #4338ca;
  transform: translateY(-2px);
}

.qr-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;
}

.qr-display img {
  width: 220px;
  height: 220px;
  border-radius: 16px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  margin-bottom: 1rem;
}

.url {
  font-size: 0.85rem;
  color: #555;
  word-break: break-all;
  text-align: center;
}
</style>
