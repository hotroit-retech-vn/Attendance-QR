import { ref, onMounted, onUnmounted } from 'vue';
import QRCode from 'qrcode';
import { invoke } from '@tauri-apps/api/core';

export function useAttendance() {
    // State
    const systemInfo = ref({ os: '', arch: '', host: '' });
    const storedName = localStorage.getItem('userName');
    const name = ref(storedName || '');
    const nameStored = ref(!!storedName);
    const initializing = ref(true);
    const qrCode = ref('');
    const url = ref('');
    const isGeneratingQR = ref(false);
    const isOnline = ref(navigator.onLine);
    let qrInterval: number | null = null;

    // Logic
    function updateOnlineStatus() {
        isOnline.value = navigator.onLine;
        if (isOnline.value && nameStored.value) {
            generateQr();
        }
    }

    async function loadSystemInfo() {
        try {
            const [os, arch, host] = await invoke<[string, string, string]>('get_system_info');
            systemInfo.value = { os, arch, host };
        } catch (error) {
            console.error('Failed to load system info:', error);
        }
    }

    function handleNameSaved(newName: string) {
        name.value = newName;
        localStorage.setItem('userName', newName);
        nameStored.value = true;
        generateQr();
        startQrRotation();
    }

    function resetName() {
        localStorage.removeItem('userName');
        name.value = '';
        nameStored.value = false;
        qrCode.value = '';
        stopQrRotation();
    }

    async function generateQr() {
        if (!name.value || !isOnline.value) return;
        isGeneratingQR.value = true;

        const now = new Date();
        // UTC+7 for Vietnam
        const today = new Date(now.getTime() + 7 * 60 * 60 * 1000).toISOString().split("T")[0];

        const payload = {
            name: name.value,
            date: today,
            os: systemInfo.value.os,
            arch: systemInfo.value.arch,
            host: systemInfo.value.host,
        };

        const encodedPayload = encodeURIComponent(
            btoa(encodeURIComponent(JSON.stringify(payload)))
        );

        const scriptUrl = import.meta.env.VITE_APP_SCRIPT_URL || '';
        url.value = `${scriptUrl}?data=${encodedPayload}`;
        try {
            qrCode.value = await QRCode.toDataURL(url.value);
        } catch (error) {
            console.error('Failed to generate QR code:', error);
        } finally {
            // Thêm độ trễ nhỏ để hiệu ứng loading mượt mà hơn
            setTimeout(() => {
                isGeneratingQR.value = false;
            }, 500);
        }
    }

    function startQrRotation() {
        stopQrRotation();
        qrInterval = window.setInterval(() => {
            if (isOnline.value) generateQr();
        }, 60 * 1000);
    }

    function stopQrRotation() {
        if (qrInterval) {
            clearInterval(qrInterval);
            qrInterval = null;
        }
    }

    async function init() {
        await loadSystemInfo();

        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        if (nameStored.value) {
            await generateQr();
            startQrRotation();
        }

        initializing.value = false;
    }

    onMounted(() => {
        // Init logic
    });

    onUnmounted(() => {
        stopQrRotation();
        window.removeEventListener('online', updateOnlineStatus);
        window.removeEventListener('offline', updateOnlineStatus);
    });

    return {
        systemInfo,
        name,
        nameStored,
        initializing,
        isOnline,
        qrCode,
        url,
        isGeneratingQR,
        handleNameSaved,
        resetName,
        generateQr,
        init
    };
}
