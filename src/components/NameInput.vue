<template>
  <div class="card name-input">
    <div class="brand-header">
      <h1 class="brand-name">RETECH VN</h1>
    </div>
    <h2>Đăng ký định danh</h2>
    <p class="subtitle">Vui lòng nhập tên để tạo mã điểm danh</p>
    
    <input 
      v-model="internalName" 
      placeholder="Ví dụ: Nguyễn Văn A" 
      @keyup.enter="handleSave"
    />
    <button 
      @click="handleSave" 
      class="btn-primary" 
      :disabled="isSaving"
    >
      <div v-if="isSaving" class="spinner-small"></div>
      {{ isSaving ? 'Đang xử lý...' : 'Xác nhận' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  initialName: string;
}>();

const emit = defineEmits(['saved']);
const internalName = ref(props.initialName);
const isSaving = ref(false);

function handleSave() {
  if (!internalName.value.trim()) {
    return alert('Nhập tên đi bro!');
  }
  isSaving.value = true;
  // Giả lập độ trễ để người dùng thấy feedback
  setTimeout(() => {
    emit('saved', internalName.value.trim());
    isSaving.value = false;
  }, 1000);
}
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

.brand-header {
  margin-bottom: 1.5rem;
}

.brand-name {
  color: #1e3a8a;
  font-weight: 800;
  letter-spacing: 1px;
  margin: 0;
}

.subtitle {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

input {
  width: 100%;
  padding: 0.9rem;
  border-radius: 10px;
  border: 2px solid #eee;
  margin-bottom: 1.2rem;
  box-sizing: border-box;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #1e3a8a;
}

.btn-primary {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 1.5rem;
  border-radius: 10px;
  background: #1e3a8a;
  color: #fff;
  border: none;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  font-size: 1rem;
  transition: all 0.3s;
}

.btn-primary:hover:not(:disabled) {
  background: #152c6a;
}

.btn-primary:disabled {
  background: #64748b;
  cursor: not-allowed;
}

.spinner-small {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
