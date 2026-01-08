import { check } from '@tauri-apps/plugin-updater';
import { relaunch } from '@tauri-apps/plugin-process';
import { ref } from 'vue';

export function useAppUpdater() {
    const updateAvailable = ref(false);
    const isUpdating = ref(false);
    const downloadProgress = ref(0);
    const newVersion = ref('');

    // KHÔNG dùng ref cho cái này để tránh lỗi "Private member"
    let updateInstance: any = null;

    const checkForUpdates = async () => {
        try {
            const update = await check();
            if (update?.available) {
                updateAvailable.value = true;
                newVersion.value = update.version;
                updateInstance = update;
            }
        } catch (error) {
            alert("Lỗi khi kiểm tra cập nhật: " + error);
        }
    };

    const installAndRestart = async () => {
        if (!updateInstance) {
            alert("Lỗi: Không tìm thấy thực thể updateInstance!");
            return;
        }

        try {
            isUpdating.value = true;
            let totalDownloaded = 0;
            let contentLength = 0;

            await updateInstance.downloadAndInstall((event: any) => {
                switch (event.event) {
                    case 'Started':
                        contentLength = event.data.contentLength;
                        break;
                    case 'Progress':
                        totalDownloaded += event.data.chunkLength;
                        if (contentLength) {
                            downloadProgress.value = Math.round((totalDownloaded / contentLength) * 100);
                        }
                        break;
                    case 'Finished':
                        break;
                }
            });
            await relaunch();

        } catch (error) {
            isUpdating.value = false;
            alert("LỖI NGHIÊM TRỌNG: " + error);
        }
    };

    return {
        updateAvailable,
        isUpdating,
        downloadProgress,
        newVersion,
        checkForUpdates,
        installAndRestart
    };
}