// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

use sysinfo::System;

#[tauri::command]
fn get_system_info() -> (String, String, String) {
    let os = System::name().unwrap_or_else(|| "Unknown".into());
    let arch = std::env::consts::ARCH.to_string();
    let host = System::host_name().unwrap_or_else(|| "Unknown".into());

    (os, arch, host)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, get_system_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
