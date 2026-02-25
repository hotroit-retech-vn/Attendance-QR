<template>
  <div class="loading-viewport">
    <div class="blob-portal"></div>
    <div class="blob-portal-2"></div>
    
    <div class="main-stage">
      <div class="logo-stack">
        <div class="ring-outer"></div>
        <div class="ring-middle"></div>
        <div class="logo-core">
          <span class="logo-letter">R</span>
        </div>
      </div>

      <div class="brand-content">
        <h1 class="brand-title">RETECH <span class="accent">VN</span></h1>
        <div class="loader-line">
          <div class="loader-line-fill"></div>
        </div>
        <div class="status-container">
          <span class="status-dot"></span>
          <p class="status-text">Đang tải tài nguyên hệ thống</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Reset & Căn giữa tuyệt đối */
.loading-viewport {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center; /* Căn giữa hoàn hảo ngang dọc */
  background: #0f172a; /* Nền tối sâu để tôn màu Logo Blue */
  z-index: 999999;
  overflow: hidden;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* Hiệu ứng ánh sáng nền (Blobs) */
.blob-portal, .blob-portal-2 {
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(30, 58, 138, 0.2) 0%, transparent 70%);
  filter: blur(80px);
  z-index: 1;
}
.blob-portal { top: -10%; left: -10%; animation: float 15s infinite alternate; }
.blob-portal-2 { bottom: -10%; right: -10%; animation: float 15s infinite reverse; }

/* Cấu trúc Logo 3 lớp */
.main-stage {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
}

.logo-stack {
  position: relative;
  width: 120px;
  height: 120px;
  display: grid;
  place-items: center;
}

.logo-core {
  width: 90px;
  height: 90px;
  background: #1e3a8a; /* Màu Logo gốc */
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 15px 35px rgba(30, 58, 138, 0.5);
  z-index: 5;
}

.logo-letter {
  color: white;
  font-size: 3.5rem;
  font-weight: 900;
  text-shadow: 0 2px 10px rgba(0,0,0,0.2);
}

/* Các vòng xoay xung quanh */
.ring-outer, .ring-middle {
  position: absolute;
  border-radius: 40%;
  border: 2px solid transparent;
}

.ring-outer {
  inset: 0;
  border-top-color: #fbbf24; /* Màu vàng nhấn */
  animation: spin 3s linear infinite;
  opacity: 0.6;
}

.ring-middle {
  inset: 10px;
  border-bottom-color: #3b82f6;
  animation: spin 2s linear infinite reverse;
  opacity: 0.4;
}

/* Brand Text & Loading Bar */
.brand-content {
  text-align: center;
}

.brand-title {
  color: #f8fafc;
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: 5px;
  margin-bottom: 1rem;
  background: linear-gradient(to bottom, #ffffff 50%, #94a3b8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.accent {
  color: #1e3a8a;
  -webkit-text-fill-color: #3b82f6; /* Tạo sáng hơn một chút trên nền tối */
}

/* Thanh Loading mới - Mỏng và Xịn */
.loader-line {
  width: 220px;
  height: 3px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  margin: 1.5rem auto;
  overflow: hidden;
  position: relative;
}

.loader-line-fill {
  position: absolute;
  height: 100%;
  width: 50%;
  background: linear-gradient(90deg, transparent, #fbbf24, transparent);
  animation: flow 1.5s ease-in-out infinite;
}

/* Status Text */
.status-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  opacity: 0.7;
}

.status-dot {
  width: 6px;
  height: 6px;
  background: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 10px #10b981;
  animation: pulse 1s infinite;
}

.status-text {
  color: #94a3b8;
  font-size: 0.8rem;
  font-weight: 500;
  margin: 0;
  letter-spacing: 1px;
}

/* Animations */
@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes flow {
  0% { transform: translateX(-150%); }
  100% { transform: translateX(250%); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.8); }
}

@keyframes float {
  from { transform: translate(0, 0); }
  to { transform: translate(10%, 10%); }
}

/* Responsive cho mobile */
@media (max-width: 480px) {
  .logo-core { width: 70px; height: 70px; }
  .logo-letter { font-size: 2.5rem; }
  .brand-title { font-size: 1.5rem; }
}
</style>