const SHEET_ID = "1W4V4KthgjBcr-6c3G6w96vwxGRuNMqUSFw0N3OAboAE";

function doGet(e) {
  const data = e.parameter.data;
  if (!data) return HtmlService.createHtmlOutput("<h3>Thiếu dữ liệu!</h3>");

  const html = `
    <style>
      body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background: #f4f4f9; }
      .loader { border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 30px; height: 30px; animation: spin 1s linear infinite; }
      @keyframes spin { 100% { transform: rotate(360deg); } }
    </style>
    <div id="s"><div class="loader"></div><p>Đang xác thực điểm danh...</p></div>
    <script>
      window.onload = () => {
        fetch('https://api.ipify.org?format=json').then(r => r.json()).then(ip => {
          google.script.run
            .withSuccessHandler(m => document.getElementById('s').innerHTML = "<h2>"+m+"</h2>")
            .saveData("${data}", ip.ip, navigator.userAgent);
        }).catch(() => document.getElementById('s').innerHTML = "<h2>Lỗi kết nối mạng!</h2>");
      };
    </script>`;
  return HtmlService.createHtmlOutput(html).setTitle("Hệ thống điểm danh");
}

function saveData(encodedData, userIP, userAgent) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  
  try {
    // 1. Giải mã Payload
    const step1 = decodeURIComponent(encodedData); // gỡ lớp ngoài
    const raw = Utilities.newBlob(
      Utilities.base64Decode(step1)
    ).getDataAsString();
    const payload = JSON.parse(decodeURIComponent(raw)); // gỡ lớp trong
    const { name, date, os, arch, host } = payload;

    const now = new Date();
    const todayStr = Utilities.formatDate(now, "GMT+7", "yyyy-MM-dd");
    if (date !== todayStr) return "❌ QR đã hết hạn!";

    const ss = SpreadsheetApp.openById(SHEET_ID);
    const monthName = `T${now.getMonth() + 1}/${now.getFullYear()}`;
    const rowData = [name, todayStr, now, userIP, userAgent, os || "", arch || "", host || ""];
    const headers = ["Tên", "Ngày", "Thời gian", "IP", "User Agent", "OS", "Arch", "Host"];

    // 2. Ghi vào Log (Lưu mọi lượt quét)
    let logSheet = ss.getSheetByName("Log") || ss.insertSheet("Log");
    if (logSheet.getLastRow() === 0) logSheet.appendRow(headers);
    logSheet.appendRow(rowData);

    // 3. Xử lý Sheet Tháng (Điểm danh chính thức)
    let monthSheet = ss.getSheetByName(monthName) || ss.insertSheet(monthName);
    if (monthSheet.getLastRow() === 0) {
      monthSheet.appendRow(headers).getRange(1, 1, 1, 8).setFontWeight("bold").setBackground("#f3f3f3");
    }

    // 4. Check trùng trong ngày (Chỉ check ở Sheet Tháng)
    const lastRow = monthSheet.getLastRow();
    if (lastRow > 1) {
      const data = monthSheet.getRange(Math.max(2, lastRow - 100), 1, Math.min(lastRow, 101), 2).getValues();
      const isExisted = data.some(r => r[0] === name && Utilities.formatDate(new Date(r[1]), "GMT+7", "yyyy-MM-dd") === todayStr);
      if (isExisted) return "⚠️ Bạn đã điểm danh hôm nay rồi!";
    }

    monthSheet.appendRow(rowData);
    return "✅ Check-in thành công!";

  } catch (e) {
    return "❌ Lỗi hệ thống: " + e.message;
  } finally {
    lock.releaseLock();
  }
}