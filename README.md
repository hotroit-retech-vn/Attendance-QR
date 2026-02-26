# Tauri + Vue + TypeScript

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

#### Chạy ứng dụng chế độ phát triển
`npm run tauri dev`

#### Build ứng dụng (không có chữ ký - chỉ dùng test local)
`npm run tauri build`

#### Tạo key
`npm run tauri -- signer generate -w private.key`

#### Build bản phát hành có chữ ký
`dotenv -e .env -- npm run tauri build`	