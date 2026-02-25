<template>
  <nav class="navbar">
    <div class="navbar-content">
      <div class="navbar-left">
        <div class="logo-circle-mini">
          <span class="r-text-mini">R</span>
        </div>
        <span class="brand-name-nav">RETECH VN</span>
      </div>
      <div class="navbar-right">
        <div class="status-badge" :class="{ 'is-loading': isInitialLoading }">
          <div v-if="isInitialLoading" class="dot-spin"></div>
          <div v-else class="dot-online"></div>
          <span>{{ isInitialLoading ? 'Đang khởi tạo' : 'Đã sẵn sàng' }}</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  isInitialLoading: boolean;
}>();
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(30, 58, 138, 0.1);
  display: flex;
  align-items: center;
  z-index: 1000;
  padding: 0 1.5rem;
}

.navbar-content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-circle-mini {
  width: 32px;
  height: 32px;
  background: #1e3a8a;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(30, 58, 138, 0.2);
}

.r-text-mini {
  color: white;
  font-weight: 800;
  font-size: 1.1rem;
}

.brand-name-nav {
  font-weight: 800;
  color: #1e3a8a;
  letter-spacing: 1px;
}

.navbar-right {
  display: flex;
  align-items: center;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f1f5f9;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #475569;
  border: 1px solid #e2e8f0;
}

.status-badge.is-loading {
  background: #fffbeb;
  color: #92400e;
  border-color: #fef3c7;
}

.dot-online {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.dot-spin {
  width: 8px;
  height: 8px;
  border: 2px solid #f59e0b;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
