# 项目代码全量转储 (Project Dump)

## FILE: .oxlintrc.json

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["eslint", "unicorn", "oxc", "vue"],
  "env": {
    "browser": true
  },
  "categories": {
    "correctness": "error"
  }
}

```

## FILE: .prettierrc.json

```json
{
  "$schema": "https://json.schemastore.org/prettierrc",
  "semi": false,
  "singleQuote": true,
  "printWidth": 100
}

```

## FILE: .vscode\extensions.json

```json
{
  "recommendations": [
    "Vue.volar",
    "dbaeumer.vscode-eslint",
    "EditorConfig.EditorConfig",
    "oxc.oxc-vscode",
    "esbenp.prettier-vscode"
  ]
}

```

## FILE: .vscode\settings.json

```json
{
  "explorer.fileNesting.enabled": true,
  "explorer.fileNesting.patterns": {
    "tsconfig.json": "tsconfig.*.json, env.d.ts, typed-router.d.ts",
    "vite.config.*": "jsconfig*, vitest.config.*, cypress.config.*, playwright.config.*",
    "package.json": "package-lock.json, pnpm*, .yarnrc*, yarn*, .eslint*, eslint*, .oxlint*, oxlint*, .oxfmt*, .prettier*, prettier*, .editorconfig, bun.lock, nub.lock"
  },
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit"
  },
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}

```

## FILE: dump.js

```js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const exts = new Set([
  '.js', '.jsx', '.ts', '.tsx', '.vue', '.css', '.scss', '.less',
  '.html', '.json', '.md', '.yml', '.yaml'
]);

const ignore = new Set([
  'node_modules', 'dist', 'build', '.git', 'coverage', '.next', '.nuxt'
]);

let out = '# 项目代码全量转储 (Project Dump)\n\n';

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    if (ignore.has(name)) continue;
    const p = path.join(dir, name);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      walk(p);
    } else if (exts.has(path.extname(name))) {
      if (name === 'package-lock.json' || name === 'pnpm-lock.yaml' || name === 'yarn.lock') continue;
      out += `## FILE: ${p}\n\n`;
      out += '```' + path.extname(name).slice(1) + '\n';
      out += fs.readFileSync(p, 'utf8');
      out += '\n```\n\n';
    }
  }
}

walk('.');
fs.writeFileSync('project-dump.md', out);
console.log('✅ 成功！已生成 project-dump.md，请查看项目根目录！');
```

## FILE: eslint.config.js

```js
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from 'eslint-config-prettier/flat'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,js,mjs,jsx}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),

  skipFormatting,
])

```

## FILE: index.html

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="UTF-8">
    <link rel="icon" href="/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comic Hub</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>

```

## FILE: jsconfig.json

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "exclude": ["node_modules", "dist"]
}

```

## FILE: package.json

```json
{
  "name": "comic-hub",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "run-s \"lint:*\"",
    "lint:oxlint": "oxlint . --fix",
    "lint:eslint": "eslint . --fix --cache",
    "format": "prettier --write --experimental-cli src/"
  },
  "dependencies": {
    "axios": "^1.20.0",
    "element-plus": "^2.14.7",
    "pinia": "^4.0.3",
    "vue": "^3.5.42",
    "vue-router": "^5.3.1"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@vitejs/plugin-vue": "^6.0.8",
    "eslint": "^10.10.0",
    "eslint-config-prettier": "^10.1.8",
    "eslint-plugin-oxlint": "~1.82.0",
    "eslint-plugin-vue": "~10.11.0",
    "globals": "^17.12.0",
    "npm-run-all2": "^9.0.3",
    "oxlint": "~1.82.0",
    "prettier": "3.9.6",
    "vite": "^8.3.1",
    "vite-plugin-vue-devtools": "^8.2.1",
    "vue-eslint-parser": "^10.4.1"
  },
  "engines": {
    "node": "^22.18.0 || >=24.12.0"
  }
}

```

## FILE: project-dump.md

```md
# 项目代码全量转储 (Project Dump)

## FILE: .oxlintrc.json

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["eslint", "unicorn", "oxc", "vue"],
  "env": {
    "browser": true
  },
  "categories": {
    "correctness": "error"
  }
}

```

## FILE: .prettierrc.json

```json
{
  "$schema": "https://json.schemastore.org/prettierrc",
  "semi": false,
  "singleQuote": true,
  "printWidth": 100
}

```

## FILE: .vscode\extensions.json

```json
{
  "recommendations": [
    "Vue.volar",
    "dbaeumer.vscode-eslint",
    "EditorConfig.EditorConfig",
    "oxc.oxc-vscode",
    "esbenp.prettier-vscode"
  ]
}

```

## FILE: .vscode\settings.json

```json
{
  "explorer.fileNesting.enabled": true,
  "explorer.fileNesting.patterns": {
    "tsconfig.json": "tsconfig.*.json, env.d.ts, typed-router.d.ts",
    "vite.config.*": "jsconfig*, vitest.config.*, cypress.config.*, playwright.config.*",
    "package.json": "package-lock.json, pnpm*, .yarnrc*, yarn*, .eslint*, eslint*, .oxlint*, oxlint*, .oxfmt*, .prettier*, prettier*, .editorconfig, bun.lock, nub.lock"
  },
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit"
  },
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}

```

## FILE: dump.js

```js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const exts = new Set([
  '.js', '.jsx', '.ts', '.tsx', '.vue', '.css', '.scss', '.less',
  '.html', '.json', '.md', '.yml', '.yaml'
]);

const ignore = new Set([
  'node_modules', 'dist', 'build', '.git', 'coverage', '.next', '.nuxt'
]);

let out = '# 项目代码全量转储 (Project Dump)\n\n';

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    if (ignore.has(name)) continue;
    const p = path.join(dir, name);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      walk(p);
    } else if (exts.has(path.extname(name))) {
      if (name === 'package-lock.json' || name === 'pnpm-lock.yaml' || name === 'yarn.lock') continue;
      out += `## FILE: ${p}\n\n`;
      out += '```' + path.extname(name).slice(1) + '\n';
      out += fs.readFileSync(p, 'utf8');
      out += '\n```\n\n';
    }
  }
}

walk('.');
fs.writeFileSync('project-dump.md', out);
console.log('✅ 成功！已生成 project-dump.md，请查看项目根目录！');
```

## FILE: eslint.config.js

```js
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from 'eslint-config-prettier/flat'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,js,mjs,jsx}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),

  skipFormatting,
])

```

## FILE: index.html

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="UTF-8">
    <link rel="icon" href="/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vite App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>

```

## FILE: jsconfig.json

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "exclude": ["node_modules", "dist"]
}

```

## FILE: package.json

```json
{
  "name": "comic-hub",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "run-s \"lint:*\"",
    "lint:oxlint": "oxlint . --fix",
    "lint:eslint": "eslint . --fix --cache",
    "format": "prettier --write --experimental-cli src/"
  },
  "dependencies": {
    "axios": "^1.20.0",
    "element-plus": "^2.14.7",
    "pinia": "^4.0.3",
    "vue": "^3.5.42",
    "vue-router": "^5.3.1"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@vitejs/plugin-vue": "^6.0.8",
    "eslint": "^10.10.0",
    "eslint-config-prettier": "^10.1.8",
    "eslint-plugin-oxlint": "~1.82.0",
    "eslint-plugin-vue": "~10.11.0",
    "globals": "^17.12.0",
    "npm-run-all2": "^9.0.3",
    "oxlint": "~1.82.0",
    "prettier": "3.9.6",
    "vite": "^8.3.1",
    "vite-plugin-vue-devtools": "^8.2.1",
    "vue-eslint-parser": "^10.4.1"
  },
  "engines": {
    "node": "^22.18.0 || >=24.12.0"
  }
}

```

## FILE: README.md

```md
# comic-hub

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

```

## FILE: src\App.vue

```vue
<template>
  <!-- 导航栏（固定在顶部） -->
  <div class="top-nav">
    <nav class="app-nav">
      <div class="app-nav-link-container">
        <router-link class="app-nav-link" to="/">首页</router-link>
      </div>
      <div class="app-nav-link-container">
        <router-link class="app-nav-link" to="/Comic">漫画</router-link>
      </div>
      <div class="app-nav-link-container">
        <router-link class="app-nav-link" to="/Management">管理</router-link>
      </div>
      <div class="app-nav-link-container">
        <router-link class="app-nav-link" to="/ComicPage/0000000002"><img class="avatar"
            :src="avatar !== '' ? avatar : defaultAvatar"></router-link>
      </div>
    </nav>
  </div>

  <main class="main-container-app">
    <div class="app-nav-space"></div>
    <!-- 内容区域（可滚动） -->
    <router-view class="main-container-view" />
  </main>
</template>
<script>
import defaultAvatar from "@/assets/img/default-avatar.jpg";

export default {
  name: "app",
  data() {
    return {
      avatar: "",
      defaultAvatar: defaultAvatar
    }
  },
  methods: {
    appNavLinkClick(e) {
      e.target.classList.add('cur-page');
    }
  }
}
</script>
<style>
@import url("./assets/css/common.css");

body {
  background-color: var(--bg-color-1st);
}
</style>
<style scoped>
.avatar {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}

.top-nav {
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: fixed;
  background: var(--bg-color-1st);
}

.app-nav {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.app-nav-link-container {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.app-nav-link {
  font-size: 1.2rem;
  color: var(--font-color-1st);
  text-decoration: none;
  transition: 0.2s ease-in-out;
}

.app-nav-space {
  min-height: 100px;
}

/* 直接用默认类名 */
.router-link-active {
  color: var(--font-color-cur) !important;
  scale: 1.2;
}

.main-container-app {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  /* 电脑端覆盖 */
  .app-nav {
  width: 60%;
}

.main-container-app {
  width: 60%;
}
}
</style>
```

## FILE: src\assets\api\base.js

```js
const base = {
    baseUrl: '',
    comicPage: '/api/Comic/comic/'
}

export default base;
```

## FILE: src\assets\api\index.js

```js
import axios from "../../utils/request";
import base from "./base"

const api = {
    getComicPage(chapterCode){
        return axios.get(base.baseUrl+base.comicPage+chapterCode);
    },
    getApiTest(){
        return axios.get("https://jsonplaceholder.typicode.com/posts/1");
    }
}

export default api;
```

## FILE: src\assets\css\common.css

```css
:root {
    --bg-app: rgba(0, 0, 0, 0.5);
    --bg-color-1st: #111;
    --bg-color-2nd: #333;
    --bg-color-3rd: #555;
    --bg-color-btn: #2f7fff;
    --bg-color-tag-type: #2f7fff;
    --bg-color-tag: #3f8fff;
    --bg-color-cur: #2f7fff;
    --font-color-1st: #fff;
    --font-color-2nd: #ddd;
    --font-color-3rd: #bbb;
    --font-color-cur: #2f7fff;
    --radius-s: 5px;
    --radius-m: 10px;
    --radius-l: 15px;
}

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-size: 1rem;
}

body {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
}

#app {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
```

## FILE: src\main.js

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

```

## FILE: src\router\index.js

```js
import { createRouter,createWebHashHistory } from "vue-router";
import Home from "@/views/Home.vue";

const routes =[
    {
        path:"/",
        name:"home",
        component:Home
    },
    {
        path:"/Comic",
        name:"comic",
        component:()=>import("@/views/Comic/Comic.vue") //这是异步加载，不会在顶部全部加载，优化加载，首页以外建议全部异步引入
    },
    {
        path:"/ComicDetail/:workCode",
        name:"comicDetail",
        component:()=>import("@/views/Comic/ComicDetail.vue")
    },
    {
        path:"/ComicPage/:contentCode",
        name:"comicPage",
        component:()=>import("@/views/Comic/ComicPage.vue")
    }
];

const router = createRouter({
    history:createWebHashHistory(),
    routes
});

export default router;
```

## FILE: src\stores\counter.js

```js
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

```

## FILE: src\utils\request.js

```js
import axios from "axios";

// ------------------------------------------------------
// 原生 fetch 封装的 API（未被使用，保留以备后用）
// ------------------------------------------------------
export async function fetchAPI(API_BASE, url, options = {}) {
  // 如果是 FormData，删除 Content-Type 让浏览器自动设置
  const headers = { 'Content-Type': 'application/json' };
  if (options.body instanceof FormData) {
    delete headers['Content-Type'];
  }
  const res = await fetch(API_BASE + url, {
    headers: headers,
    ...options
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return await res.json();
}

// ------------------------------------------------------
// 错误提示处理函数
// ------------------------------------------------------
function errorHandle(status, info) {
  // 如果 info 是对象，转为字符串便于显示
  const msg = typeof info === 'string' ? info : JSON.stringify(info);
  switch (status) {
    case 400:
      console.log("语义有误", msg);
      break;
    case 401:
      console.log("服务器认证失败", msg);
      break;
    case 403:
      console.log("服务器拒绝访问", msg);
      break;
    case 404:
      console.log("地址错误", msg);
      break;
    case 500:
      console.log("服务器遇到意外", msg);
      break;
    case 502:
      console.log("服务器无响应", msg);
      break;
    case 0:   // 网络不通或请求未发出
      console.log("网络请求失败，请检查网络连接", msg);
      break;
    default:
      console.log(info || "未知错误");
      break;
  }
}

// ------------------------------------------------------
// 创建 axios 实例
// ------------------------------------------------------
const instance = axios.create({
  timeout: 30000,
});

// 请求拦截器（目前未做特殊处理，可扩展）
instance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    // 必须返回 Promise.reject，否则错误会被吞掉
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  response => {
    // 只要状态码是 2xx 就会进入这里，直接返回响应
    return response;
  },
  error => {
    // --------------------------------------------------
    // 修复：安全获取 status 和 info，避免 undefined 报错
    // --------------------------------------------------
    let status = -1;       // 默认未知状态
    let info = '';

    if (error.response) {
      // 服务器有响应，但状态码非 2xx
      status = error.response.status;
      info = error.response.data || error.message;
    } else if (error.request) {
      // 请求已发出，但未收到响应（网络问题）
      status = 0;          // 用 0 表示网络不通
      info = '请求超时或网络异常';
    } else {
      // 其他错误（如请求配置错误）
      status = -1;
      info = error.message || '未知错误';
    }

    // 调用错误提示函数
    errorHandle(status, info);

    // 将错误继续抛出，以便业务代码的 catch 能捕获
    return Promise.reject(error);
  }
);

export default instance;
```

## FILE: src\views\Comic\Comic.vue

```vue
<template>
</template>
<script setup></script>
<style scoped></style>
<style></style>
```

## FILE: src\views\Comic\ComicDetail.vue

```vue
<template>
    <div class=" work-detail">
        <img class="cover" :src="detail.coverUrl" alt="">
        <div class="detail">
            <div class="work-name">{{ detail.workName }}</div>
            <div class="upload-time">首次上传于：{{ detail.uploadTime }}</div>
            <div class="update-time">最后更新于：{{ detail.updateTime }}</div>
            <div class="tag-group" v-for="tagType in tagGroups" :key="tagType.tagCode">
                <div class="tag-group-title">{{ tagType.tagTypeName }}</div>
                <div class="tag-list">
                    <router-link class="tag" v-for="tag in tagType.tags" :key="tag.tagCode">
                        {{ tag.tagName }}
                    </router-link>
                </div>
            </div>
        </div>
    </div>
    <div class="content-list-title">目录</div>
    <div class="content-list">
        <router-link class="content" v-for="content in contents" :key="content.contentCode"
            :to="'/ComicPage/' + content.contentCode">
            {{ content.contentName }}
        </router-link>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import instance from '@/utils/request';

defineOptions({
    name: "ComicPage",
    inheritAttrs: false
})

const route = useRoute()
const router = useRouter()

const detail = ref({
    workCode: '',
    workName: '',
    uploadTime: '',
    updateTime: '',
    coverUrl: '',
    tags: []
})

const tagGroups = ref([])

const contents = ref([])

const getWorkDetail = async () => {
    try {

        const res = await instance.get(`api/Comic/works/detail/${detail.workCode}`)
        console.log(res.data)
        if (res.status === 200 && res.data) {
            if (res.data.work) {
                detail.value = res.data.work
                const tagMap = {};
                detail.value.tags.forEach(t => {
                    if (!tagMap[t.tagTypeCode]) {
                        tagMap[t.tagTypeCode] = { tagTypeCode: t.tagTypeCode, tagTypeName: t.tagTypeName, tags: [] };
                    }
                    tagMap[t.tagTypeCode].tags.push({ tagCode: t.tagCode, tagName: t.tagName });
                });
                const groups = Object.values(tagMap);
                groups.sort((a, b) => a.tagTypeCode.localeCompare(b.tagTypeCode));
                groups.forEach(g => g.tags.sort((a, b) => a.tagName.localeCompare(b.tagName)));
                tagGroups.value = groups;
            }
            if (res.data.contents) {
                contents.value = res.data.contents;
                contents.value.sort((a, b) => a.contentCode.localeCompare(b.contentCode));
            }
        }
    }
    catch (error) {
        console.error('发生错误', error)
    }
    console.log(detail.value)
    console.log(tagGroups.value)
    console.log(contents.value)
}

// onMounted(()=>getWorkDetail())

watch(() => route.params.workCode,
    () => {
        try {
            detail.workCode = route.params.workCode
            getWorkDetail()
        }
        catch {

        }
    },
    { immediate: true })
</script>
<style>
@import url(../../assets/css/common.css);
</style>
<style scoped>
.work-detail {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 5%;
    border-bottom: 1px solid var(--font-color-3rd);
    padding: 50px;
}

.cover {
    width: 25%;
    aspect-ratio: 3 / 4;
    object-fit: cover;
    object-position: center;
    border-radius: var(--radius-l);
    align-self: flex-start;
}

.detail {
    display: flex;
    flex-direction: column;
}

.work-name {
    color: var(--font-color-1st);
    font-size: 3rem;
}

.update-time,
.upload-time {
    color: var(--font-color-3rd);
    font-size: 0.8rem;
    padding: 10px;
}

.tag-group {
    margin: 5px;
}

.tag-group-title {
    font-size: 1.2rem;
    color: var(--font-color-1st);
    padding: 5px;
}

.tag-list {
    padding: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
        flex-wrap: wrap;

}

.tag {
    padding: 5px;
    background-color: var(--bg-color-tag-type);
    border-radius: var(--radius-s);
    color: var(--font-color-1st);
    text-decoration: none;
    white-space: nowrap;
}

.content-list {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.content-list-title {
    color: var(--font-color-1st);
    font-size: 2rem;
}

.content {
    padding: 5px;
    color: var(--font-color-1st);
    background-color: var(--bg-color-tag);
    border-radius: var(--radius-s);
    text-decoration: none;
}
</style>
```

## FILE: src\views\Comic\ComicPage.vue

```vue
<template>
    <main class="main-container" ref="mainContainer">
        <h3 id="title" @click="addCounterCommit">
            {{ currentContent.contentName }}
        </h3>
        <div class="image-list">
            <div v-if="loading">加载中...</div>
            <img v-for="url in currentContent.imgUrlList" :key="url" :src="url" alt="漫画页" v-show="!loading" />
        </div>
        <div class="pre-n-next">
            <router-link class="pre" v-if="previousContent.contentCode"
                :to="'/ComicPage/' + previousContent.contentCode">
                上一话【{{ previousContent.contentName }}】
            </router-link>
            <router-link class="next" v-if="nextContent.contentCode" :to="'/ComicPage/' + nextContent.contentCode">
                下一话【{{ nextContent.contentName }}】
            </router-link>
        </div>
    </main>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import instance from '@/utils/request' // 你的 axios 实例

defineOptions({
    name: "ComicPage",
    inheritAttrs: false
})

const router = useRouter()
const route = useRoute()

// ===== 3. 响应式数据 =====
const loading = ref(false)

const previousContent = reactive({
    contentCode: '',
    contentName: ''
})
const nextContent = reactive({
    contentCode: '',
    contentName: ''
})

const currentContent = reactive({
    contentCode: "",
    contentName: "",
    imgUrlList: []
})

// ===== 4. 方法 =====
const loadImageList = async () => {
    loading.value = true
    try {
        const res = await instance.get(`/api/Comic/contents/${currentContent.contentCode}`)
        console.log(res.data)
        Object.assign(previousContent,
            res.data.contents["previous"] || { contentCode: "", contentName: "" })
        Object.assign(currentContent,
            res.data.contents["current"] || { contentCode: "", contentName: "", imgUrlList: [] })
        Object.assign(nextContent,
            res.data.contents["next"] || { contentCode: "", contentName: "" })
        console.log('加载成功', res)
    } catch (error) {
        console.error('请求失败:', error)
    } finally {
        loading.value = false
        await nextTick()
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

// ===== 5. 监听路由参数变化 =====
watch(
    () => route.params.contentCode,
    (newValue) => {
        if (newValue) {
            currentContent.contentCode = newValue
            loadImageList()
        } else {
            router.push('/Comic')
        }
    },
    { immediate: true } // 组件创建时立即执行一次
)

// ===== 6. 暴露数据给模板 =====
</script>

<style>
@import url(../../assets/css/common.css);
</style>

<style scoped>
#title {
    font-size: 3rem;
    color: var(--font-color-1st);
    align-self: center;
}

.main-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px;
    gap: 50px;
}

.image-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0;
    align-self: center;
}

.main-container img {
    width: 100%;
    height: auto;
}

.pre-n-next {
    /* display: flex;
    flex-direction: row;
    justify-content: space-between; */
    position: relative;
}

.pre-n-next a {
    font-size: 1.2rem;
    color: var(--font-color-1st);
    text-decoration: none;
}

.pre {
    position: absolute;
    left: 50px;
}

.next {
    position: absolute;
    right: 50px;
}

/* 手机：默认样式，< 768px */
/* 电脑：>= 768px */
@media (min-width: 768px) {

    /* 电脑端覆盖 */
    .image-list {
        width: 60%;
    }
}
</style>
```

## FILE: src\views\Home.vue

```vue
<template>
    <div class="works-swiper" id="home-comic">
        <router-link class="swiper-item" v-for="item in comicRandomList" :key="item.workCode"
            :to="'/ComicDetail/' + item.workCode">
            <img class="swiper-item-cover" :src="item.coverUrl" alt="">
            <label class="swiper-item-title">{{ item.workName }}</label>
        </router-link>
    </div>
    <!-- <router-view>
    </router-view> -->
</template>
<script setup>
import { ref, reactive, computed, watch, onMounted, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import instance from '@/utils/request.js';

const loading = ref(false)
const comicRandomList = ref([])
const getRandomComic = async () => {
    loading.value = true;
    try {
        const res = await instance.get(`api/Comic/works/random?count=15`)
        console.log(res);
        if (res.status === 200 && res.data.length > 0) {
            comicRandomList.value = []
            for (let i = 0; i < res.data.length; i++) {
                comicRandomList.value.push(res.data[i])
            }
        }
    }
    catch {

    }
}

onMounted(() => getRandomComic())

</script>
<style>
@import url("../assets/css/common.css");
</style>

<style scoped>
router-link {
    color: var(--font-color-1st);
}

.works-swiper {
    width: 100%;
    display: grid;
    grid-template: auto /repeat(5, 1fr);
    grid-gap: 20px;
    padding: 20px;
}

.swiper-item {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: 0.2s ease-in-out;
}

.swiper-item:hover {
    scale: 1.1;
}

.swiper-item-cover {
    width: 100%;
    height: auto;
    border-radius: var(--radius-s);
    object-fit: cover;
    object-position: center;
    aspect-ratio: 3/4;
}

.swiper-item-title {
    color: var(--font-color-1st);
}

@media (max-width: 768px) {

    /* 电脑端覆盖 */
    .works-swiper {
        grid-template: auto /repeat(3, 1fr);
    }
}
</style>
```

## FILE: vite.config.js

```js
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:91',
        changeOrigin: true,
      },
      '/anime/cover': { target: 'http://localhost:91', changeOrigin: true },
      '/anime/content': { target: 'http://localhost:91', changeOrigin: true },
      '/comic/cover': { target: 'http://localhost:91', changeOrigin: true },
      '/comic/content': { target: 'http://localhost:91', changeOrigin: true },
      '/fiction/cover': { target: 'http://localhost:91', changeOrigin: true },
      '/fiction/content': { target: 'http://localhost:91', changeOrigin: true },
      '/movie/cover': { target: 'http://localhost:91', changeOrigin: true },
      '/movie/content': { target: 'http://localhost:91', changeOrigin: true },
      '/series/cover': { target: 'http://localhost:91', changeOrigin: true },
      '/series/content': { target: 'http://localhost:91', changeOrigin: true },
    }
  }
})
```


```

## FILE: README.md

```md
# comic-hub

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

```

## FILE: src\App.vue

```vue
<template>
  <!-- 导航栏（固定在顶部） -->
  <div class="top-nav">
    <nav class="app-nav">
      <div class="app-nav-link-container">
        <router-link class="app-nav-link" to="/">首页</router-link>
      </div>
      <div class="app-nav-link-container">
        <router-link class="app-nav-link" to="/Comic">漫画</router-link>
      </div>
      <div class="app-nav-link-container">
        <router-link class="app-nav-link" to="/Management">管理</router-link>
      </div>
      <div class="app-nav-link-container">
        <router-link class="app-nav-link" to="/ComicPage/0000000002"><img class="avatar"
            :src="avatar !== '' ? avatar : defaultAvatar"></router-link>
      </div>
    </nav>
  </div>

  <main class="main-container-app">
    <div class="app-nav-space"></div>
    <!-- 内容区域（可滚动） -->
    <router-view class="main-container-view" />
  </main>
</template>
<script>
import defaultAvatar from "@/assets/img/default-avatar.jpg";

export default {
  name: "app",
  data() {
    return {
      avatar: "",
      defaultAvatar: defaultAvatar
    }
  },
  methods: {
    appNavLinkClick(e) {
      e.target.classList.add('cur-page');
    }
  }
}
</script>
<style>
@import url("./assets/css/common.css");

body {
  background-color: var(--bg-color-1st);
}
</style>
<style scoped>
.avatar {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}

.top-nav {
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: fixed;
  background: var(--bg-color-1st);
}

.app-nav {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.app-nav-link-container {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.app-nav-link {
  font-size: 1.2rem;
  color: var(--font-color-1st);
  text-decoration: none;
  transition: 0.2s ease-in-out;
}

.app-nav-space {
  min-height: 100px;
}

/* 直接用默认类名 */
.router-link-active {
  color: var(--font-color-cur) !important;
  scale: 1.2;
}

.main-container-app {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  /* 电脑端覆盖 */
  .app-nav {
  width: 60%;
}

.main-container-app {
  width: 60%;
}
}
</style>
```

## FILE: src\assets\api\base.js

```js
const base = {
    baseUrl: '',
    comicPage: '/api/Comic/comic/'
}

export default base;
```

## FILE: src\assets\api\index.js

```js
import axios from "../../utils/request";
import base from "./base"

const api = {
    getComicPage(chapterCode){
        return axios.get(base.baseUrl+base.comicPage+chapterCode);
    },
    getApiTest(){
        return axios.get("https://jsonplaceholder.typicode.com/posts/1");
    }
}

export default api;
```

## FILE: src\assets\css\common.css

```css
:root {
    /* 背景 */
    --bg-app: rgba(0, 0, 0, 0.5);
    --bg-color-1st: #111;
    --bg-color-2nd: #1a1a1a;
    --bg-color-3rd: #333;
    --bg-color-4th: #555;
    --bg-color-btn: #2f7fff;
    --bg-color-tag: #2f7fff;
    --bg-color-tag-type: #3f8fff;
    --bg-color-cur: #2f7fff;

    /* 文字 */
    --font-color-1st: #fff;
    --font-color-2nd: #ddd;
    --font-color-3rd: #bbb;
    --font-color-cur: #2f7fff;

    /* 圆角 */
    --radius-s: 5px;
    --radius-m: 10px;
    --radius-l: 15px;

    /* 布局 */
    --nav-height: 80px;
    --content-width-1st: 60%;
    --content-width-2nd: 60%;
    --content-width-3rd: 60%;

    --aspect-ratio-cover: 3/4;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 1rem;
}

html,
body {
    height: 100%;
    width: 100%;
    background-color: var(--bg-color-1st);
    color: var(--font-color-1st);
    font-family:
        -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
        Arial, 'PingFang SC', 'Microsoft YaHei', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

#app {
    min-height: 100vh;
}

/* ---------- 共享状态 ---------- */
.state {
    padding: 40px 0;
    text-align: center;
    color: var(--font-color-3rd);
}

.state-error {
    color: #e74c3c;
}

/* ---------- 共享作品网格（首页 / 漫画列表复用）---------- */
.works-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    padding: 20px 0;
    width: 100%;
}

.work-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: transform 0.2s ease-in-out;
}

.work-item:hover {
    transform: scale(1.05);
}

.work-cover {
    width: 100%;
    aspect-ratio: var(--aspect-ratio-cover);
    object-fit: cover;
    object-position: center;
    border-radius: var(--radius-s);
    background-color: var(--bg-color-3rd);
}

.work-title {
    color: var(--font-color-1st);
    font-size: 0.9rem;
    text-align: center;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

@media (max-width: 768px) {
    .works-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}
```

## FILE: src\components\form.vue

```vue
<template>
    <div>
        <h1 @click="sendClickHandle">{{ title }}</h1>
    </div>
</template>
<script>
export default {
    name: "formTest",
    props: {
        title: {
            type: String,
            default: "Test"
        },
        chList: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    methods:{
        sendClickHandle(){
            this.$emit("onEvent",this.title)
        }
    }
}
</script>
<style scoped>
div {
    width: 400px;
    height: 400px;
    background-color: white;
    z-index: 200;
}
</style>
```

## FILE: src\components\Management\ContentManagement.vue

```vue
<template>
    <div class="panel-body">
        <!-- 左侧：选择图书 + 封面预览 -->
        <aside id="panel-body-left">
            <div class="work-selector">
                <el-select v-model="selectedWorkCode" placeholder="请选择图书" filterable @change="onWorkChange">
                    <el-option v-for="work in works" :key="work.workCode" 
                        :label="work.workName" :value="work.workCode" />
                </el-select>
            </div>
            <div class="cover-preview-container">
                <img v-if="selectedWorkCover" :src="selectedWorkCover" alt="封面" class="cover-preview" />
                <div v-else class="cover-placeholder">请选择图书</div>
            </div>
            <div class="work-info" v-if="selectedWork">
                <p><strong>书码：</strong>{{ selectedWork.workCode }}</p>
                <p><strong>书名：</strong>{{ selectedWork.workName }}</p>
                <p><strong>标签：</strong></p>
                <div>
                    <el-tag v-for="tag in selectedWork.tags" :key="tag.tagCode" size="small" style="margin:2px;">
                        {{ tag.tagName }}
                    </el-tag>
                </div>
            </div>
        </aside>

        <!-- 右侧：章节列表 -->
        <aside id="panel-body-right">
            <div class="toolbar">
                <el-button class="add-new-btn" @click="clickAddBtn" :disabled="!selectedWorkCode">
                    + 新增章节
                </el-button>
                <el-button @click="loadChapters" :disabled="!selectedWorkCode">加载章节</el-button>
            </div>
            <div class="panel-table">
                <table v-if="chapters.length > 0">
                    <thead>
                        <tr>
                            <th>章节编码</th>
                            <th>章节名</th>
                            <th>更新时间</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="chapter in chapters" :key="chapter.contentCode">
                            <td>{{ chapter.contentCode }}</td>
                            <td>{{ chapter.contentName }}</td>
                            <td>{{ formatDate(chapter.updateTime) }}</td>
                            <td>
                                <el-button class="edit-btn" @click="clickEditBtn(chapter)">编辑</el-button>
                                <el-button class="edit-btn" @click="clickDeleteBtn(chapter)">删除</el-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-else class="empty-tip">暂无章节，请选择图书后加载</div>
            </div>
        </aside>
    </div>

    <!-- 新增/编辑章节弹窗 -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑章节' : '新增章节'">
        <el-form :model="form" label-width="80px">
            <el-form-item label="章节编码" v-if="isEdit">
                <el-input v-model="form.contentCode" disabled />
            </el-form-item>
            <el-form-item label="章节名">
                <el-input v-model="form.contentName" placeholder="请输入章节名" />
            </el-form-item>
            <el-form-item label="图片" v-if="!isEdit">
                <el-upload
                    action="#"
                    :auto-upload="false"
                    multiple
                    :on-change="handleImagesChange"
                    :file-list="imageFileList"
                    list-type="picture-card"
                >
                    <el-icon><Plus /></el-icon>
                </el-upload>
                <div class="upload-tip">支持多图上传，按顺序排列</div>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handleConfirm">保存</el-button>
        </template>
    </el-dialog>

    <!-- 删除确认弹窗 -->
    <el-dialog v-model="deleteDialogVisible">
        确认删除章节【{{ form.contentName }}】吗？
        <template #footer>
            <el-button @click="deleteDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="deleteChapter">确认</el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import instance from '@/utils/request.js'

const props = defineProps({
    modName: {
        type: String,
        require: true
    }
})

// ============ 响应式数据 ============
const works = ref([])
const chapters = ref([])
const selectedWorkCode = ref('')
const selectedWork = ref(null)
const selectedWorkCover = ref('')

const isEdit = ref(false)
const dialogVisible = ref(false)
const deleteDialogVisible = ref(false)

const form = ref({
    contentCode: '',
    contentName: '',
    workCode: ''
})

const imageFileList = ref([])

// ============ API 方法 ============
const getWorkList = async () => {
    try {
        const res = await instance.get(`api/${props.modName}Management/works/list`)
        if (res.status === 200 && res.data) {
            works.value = res.data
        }
    } catch (error) {
        console.error('获取作品列表失败:', error)
    }
}

const loadChapters = async () => {
    if (!selectedWorkCode.value) {
        alert('请先选择图书')
        return
    }
    try {
        const res = await instance.get(`api/${props.modName}Management/works/${selectedWorkCode.value}/contents`)
        if (res.status === 200 && res.data) {
            chapters.value = res.data
        }
    } catch (error) {
        console.error('加载章节失败:', error)
    }
}

// ============ 图书选择 ============
const onWorkChange = (workCode) => {
    const found = works.value.find(w => w.workCode === workCode)
    if (found) {
        selectedWork.value = found
        selectedWorkCover.value = found.coverUrl || ''
        loadChapters()
    } else {
        selectedWork.value = null
        selectedWorkCover.value = ''
        chapters.value = []
    }
}

// ============ 章节操作 ============
const resetForm = () => {
    form.value = {
        contentCode: '',
        contentName: '',
        workCode: selectedWorkCode.value || ''
    }
    imageFileList.value = []
}

const clickAddBtn = () => {
    resetForm()
    isEdit.value = false
    dialogVisible.value = true
}

const clickEditBtn = (chapter) => {
    form.value = {
        contentCode: chapter.contentCode,
        contentName: chapter.contentName,
        workCode: chapter.workCode || selectedWorkCode.value
    }
    isEdit.value = true
    dialogVisible.value = true
}

const clickDeleteBtn = (chapter) => {
    form.value = {
        contentCode: chapter.contentCode,
        contentName: chapter.contentName,
        workCode: chapter.workCode || selectedWorkCode.value
    }
    deleteDialogVisible.value = true
}

// ============ 图片上传处理 ============
const handleImagesChange = (file, fileList) => {
    imageFileList.value = fileList
}

// ============ 提交 ============
const handleConfirm = async () => {
    if (!form.value.contentName || form.value.contentName.trim() === '') {
        alert('请输入章节名')
        return
    }

    if (!isEdit.value && imageFileList.value.length === 0) {
        alert('请至少上传一张图片')
        return
    }

    try {
        let res
        if (isEdit.value) {
            // 编辑：只更新章节名
            const payload = { contentName: form.value.contentName.trim() }
            res = await instance.put(
                `api/${props.modName}Management/works/${selectedWorkCode.value}/contents/${form.value.contentCode}`,
                payload
            )
        } else {
            // 新增：使用 FormData
            const formData = new FormData()
            formData.append('contentName', form.value.contentName.trim())
            imageFileList.value.forEach(file => {
                formData.append('images', file.raw)
            })
            res = await instance.post(
                `api/${props.modName}Management/works/${selectedWorkCode.value}/contents/create`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            )
        }
        if (res.status === 200 || res.status === 201) {
            dialogVisible.value = false
            await loadChapters()
        }
    } catch (error) {
        console.error('保存失败:', error)
        alert('保存失败，请检查数据')
    }
}

const deleteChapter = async () => {
    try {
        const res = await instance.delete(
            `api/${props.modName}Management/works/${selectedWorkCode.value}/contents/${form.value.contentCode}`
        )
        if (res.status === 200) {
            deleteDialogVisible.value = false
            await loadChapters()
        }
    } catch (error) {
        console.error('删除失败:', error)
        alert('删除失败，请重试')
    }
}

// ============ 工具方法 ============
const formatDate = (dateStr) => {
    if (!dateStr) return '-'
    const d = new Date(dateStr)
    return d.toLocaleString('zh-CN')
}

// ============ 生命周期 ============
onMounted(async () => {
    await getWorkList()
})
</script>

<style scoped>
.panel-body {
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: row;
    gap: 30px;
}

#panel-body-left {
    width: 280px;
    min-width: 280px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 15px;
    background-color: var(--bg-color-2nd);
    border-radius: 8px;
    height: fit-content;
}

#panel-body-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 15px;
    min-width: 0;
}

.work-selector {
    width: 100%;
}

.cover-preview-container {
    width: 100%;
    aspect-ratio: 5 / 7;
    background-color: var(--bg-color-3rd);
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cover-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.cover-placeholder {
    color: var(--font-color-3rd);
    font-size: 14px;
}

.work-info {
    font-size: 14px;
    color: var(--font-color-1st);
}

.work-info p {
    margin: 4px 0;
}

.toolbar {
    display: flex;
    flex-direction: row;
    gap: 10px;
    flex-wrap: wrap;
}

.panel-table {
    flex: 1;
    overflow-y: auto;
    min-height: 200px;
}

.add-new-btn {
    color: var(--font-color-1st);
    padding: 5px 10px;
    background-color: var(--bg-color-btn);
    border: none;
}

table {
    width: 100%;
    border-collapse: collapse;
}

thead {
    background-color: var(--bg-color-btn);
}

th {
    color: var(--font-color-1st);
    padding: 10px;
    text-align: center;
}

tr {
    border-bottom: 1px solid var(--bg-color-3rd);
}

td {
    color: var(--font-color-1st);
    padding: 8px 5px;
    text-align: center;
    vertical-align: middle;
}

.edit-btn {
    margin: 0 2px;
}

.empty-tip {
    color: var(--font-color-3rd);
    text-align: center;
    padding: 40px 0;
}

.upload-tip {
    font-size: 12px;
    color: var(--font-color-3rd);
    margin-top: 5px;
}
</style>
```

## FILE: src\components\Management\ManagementModule.vue

```vue
<template>
    <el-tabs class="tab-archives inner-tab" tab-position="top" v-model="activeTab">
        <el-tab-pane class="tab-archives-pane" label="作品" name="work">
            <WorkManagement :mod-name="props.modName"></WorkManagement>
        </el-tab-pane>
        <el-tab-pane class="tab-archives-pane" label="内容" name="content">
            <ContentManagement :mod-name="props.modName"></ContentManagement>
        </el-tab-pane>
        <el-tab-pane class="tab-archives-pane" label="标签类型" name="tag">
            <TagTypeManagement :mod-name="props.modName"></TagTypeManagement>
        </el-tab-pane>
        <el-tab-pane class="tab-archives-pane" label="标签" name="series">
            <TagManagement :mod-name="props.modName"></TagManagement>
        </el-tab-pane>
    </el-tabs>
</template>
<script setup>
import { ref, defineAsyncComponent } from 'vue'
const WorkManagement = defineAsyncComponent(() => import("@/components/Management/WorkManagement.vue"))
const ContentManagement = defineAsyncComponent(() => import("@/components/Management/ContentManagement.vue"))
const TagTypeManagement = defineAsyncComponent(() => import("@/components/Management/TagTypeManagement.vue"))
const TagManagement = defineAsyncComponent(() => import("@/components/Management/TagManagement.vue"))

const activeTab = ref('work')

const props = defineProps({
    modName:{
        type:String,
        require:true
    }
})
</script>
<style>
@import url('../../assets/css/common.css');
</style>

<style scoped>
.tab-archives {
    height: 100%;
}

.tab-archives.inner-tab :deep(.el-tabs__item) {
    margin: 5px !important;
    padding: 25px !important;
    color: var(--font-color-1st);
    font-size: 1.2rem;
    border-radius: var(--radius-l);
    transition: 0.2s ease-in-out;
    justify-self: center;
}

.tab-archives.inner-tab :deep(.el-tabs__item):hover {
    background-color: var(--bg-color-3rd);
}

.tab-archives.inner-tab :deep(.el-tabs__item).is-active {
    color: var(--font-color-cur);
}

.tab-archives-pane {
    height: 100%;
}

</style>
```

## FILE: src\components\Management\TagManagement.vue

```vue
<template>
    <div class="pane-archive">
        <div class="pane-toolbar">
            <el-button class="add-new-btn" @click="clickAddBtn">+ 新建标签</el-button>
            <el-select v-model="tagTypeCode" id="tagTypeFilter" placeholder="全部类型">
                <el-option v-for="tagType in tagTypeOptions" :key="tagType.tagTypeCode" :label="tagType.tagTypeName"
                    :value="tagType.tagTypeCode" />
            </el-select>
            <el-input type="text" placeholder="输入关键词" v-model="keyword" />
            <el-button id="tagFilterBtn" @click="getTagList">🔍 筛选</el-button>
        </div>
        <div class="panel-table">
            <table>
                <thead>
                    <tr>
                        <th>标签编码</th>
                        <th>标签名称</th>
                        <th>类型编码</th>
                        <th>类型名称</th>
                        <th>上级标签编码</th>
                        <th>上级标签名称</th>
                        <th>上级类型编码</th>
                        <th>上级类型名称</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="tagTbody">
                    <tr v-for="tag in tags" :key="tag.tagCode">
                        <td>{{ tag.tagCode }}</td>
                        <td>{{ tag.tagName }}</td>
                        <td>{{ tag.tagTypeCode }}</td>
                        <td>{{ tag.tagTypeName }}</td>
                        <td>{{ tag.tagUpperCode }}</td>
                        <td>{{ tag.tagUpperName }}</td>
                        <td>{{ tag.tagTypeUpperCode }}</td>
                        <td>{{ tag.tagTypeUpperName }}</td>
                        <td>
                            <el-button class="edit-btn" @click="clickEditBtn(tag)">编辑</el-button>
                            <el-button class="edit-btn" @click="clickDeleteBtn(tag)">删除</el-button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <el-dialog v-model="editDialogVisible">
        <el-form :model="form">
            <el-form-item label="标签类型">
                <el-select v-model="form.tagTypeCode" id="tagTypeFilter" placeholder="全部类型">
                    <el-option v-for="tagType in tagTypes" :key="tagType.tagTypeCode" :label="tagType.tagTypeName"
                        :value="tagType.tagTypeCode" />
                </el-select>
            </el-form-item>
            <el-form-item label="标签编码">
                <el-input v-model="form.tagCode" disabled="true" />
            </el-form-item>
            <el-form-item label="标签名称">
                <el-input v-model="form.tagName" />
            </el-form-item>
            <el-form-item label="上级标签">
                <div class="form-block">
                    <el-input v-model="form.tagUpperName" disabled="true" />
                    <el-button :disabled="haveUpperType" @click="clickUpperBtn(form)">选择上级标签</el-button>
                </div>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="editDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="isEdit ? editTag(form) : addTag(form)">保存</el-button>
        </template>
    </el-dialog>

    <el-dialog class="upper-dialog" v-model="upperDialogVisible">
        <div class="form-block">
            <el-input v-model="upperKeyword"/>
            <el-button :disabled="haveUpperType" @click="getUpperTagList(form)">筛选</el-button>
        </div>
        <table>
            <thead>
                <tr>
                    <th>标签编码</th>
                    <th>标签名称</th>
                    <th>类型编码</th>
                    <th>类型名称</th>
                    <th>上级标签编码</th>
                    <th>上级标签名称</th>
                    <th>上级类型编码</th>
                    <th>上级类型名称</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody id="tagTbody">
                <tr v-for="tag in upperTags" :key="tag.tagCode">
                    <td>{{ tag.tagCode }}</td>
                    <td>{{ tag.tagName }}</td>
                    <td>{{ tag.tagTypeCode }}</td>
                    <td>{{ tag.tagTypeName }}</td>
                    <td>{{ tag.tagUpperCode }}</td>
                    <td>{{ tag.tagUpperName }}</td>
                    <td>{{ tag.tagTypeUpperCode }}</td>
                    <td>{{ tag.tagTypeUpperName }}</td>
                    <td>
                        <el-button class="edit-btn" @click="clickPickBtn(tag)">选择</el-button>
                    </td>
                </tr>
            </tbody>
        </table>
    </el-dialog>

    <el-dialog v-model="deleteDialogVisible">
        确认删除标签【{{ form.tagName }}】吗？
        <template #footer>
            <el-button @click="deleteDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="deleteTag(form)">确认</el-button>
        </template>
    </el-dialog>

</template>
<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import instance from '@/utils/request.js'
const props = defineProps({
    modName: {
        type: String,
        require: true
    }
})

const isEdit = ref(false)
const editDialogVisible = ref(false)
const deleteDialogVisible = ref(false)
const upperDialogVisible = ref(false)
const tagTypes = ref([])
const tags = ref([])
const upperTags = ref([])
const tagTypeCode = ref('')
const keyword = ref('')
const upperKeyword = ref('')
const form = ref({
    tagCode: '',
    tagName: '',
    tagTypeCode: '',
    tagTypeName: '',
    tagUpperCode: null,
    tagUpperName: '',
    tagTypeUpperCode: null,
    tagTypeUpperName: ''
})

const haveUpperType = computed(() => {
    if (!form.value.tagTypeCode) {
        return true   // 禁用
    }
    const tagType = tagTypes.value.find(t => t.tagTypeCode === form.value.tagTypeCode)
    return !(tagType && tagType.tagTypeUpperCode)
})

watch(() => form.value.tagTypeCode, (newVal) => {
    const tagType = tagTypes.value.find(t => t.tagTypeCode === newVal)
    if (tagType && tagType.tagTypeUpperCode) {
        form.value.tagTypeUpperCode = tagType.tagTypeUpperCode
        form.value.tagTypeUpperName = tagType.tagTypeUpperName
    }
})

const tagTypeOptions = computed(() => {
    const allTagType = {
        tagTypeCode: '',
        tagTypeName: '全部类型',
        tagTypeUpperCode: null,
        tagTypeUpperName: ''
    }
    return [allTagType, ...tagTypes.value]
})

const getTagList = async () => {
    try {
        // 构建查询参数对象
        const params = new URLSearchParams()

        // 如果有类型编码，添加参数
        if (tagTypeCode.value && tagTypeCode.value.trim() !== '') {
            params.append('tagTypeCode', tagTypeCode.value.trim())
        }

        // 有关键字，添加参数
        if (keyword.value && keyword.value.trim() !== '') {
            params.append('keyword', keyword.value.trim())
        }

        // 拼接 URL
        const url = `api/${props.modName}Management/tags${params.toString() ? '?' + params.toString() : ''}`
        console.log('请求URL:', url)

        // 发送请求
        const res = await instance.get(url)
        console.log('响应:', res)

        if (res.status === 200 && res.data) {
            tags.value = res.data
        }
    } catch (error) {
        console.error('获取标签列表失败:', error)
    }
}


const getTagTypeList = async () => {
    try {
        const res = await instance.get(`api/${props.modName}Management/tagtypes`)
        console.log(res)
        if (res.status === 200 && res.data) {
            tagTypes.value = res.data
        }
    }
    catch (error) {
        console.error('发生错误', error)
    }
}

const getUpperTagList = async (tag) => {
    try {
        const params = new URLSearchParams()

        if (tag.tagTypeUpperCode && tag.tagTypeUpperCode.trim() !== '') {
            params.append('tagTypeCode', tag.tagTypeUpperCode.trim())
        }
        // 如果有类型编码，添加参数

        // 有关键字，添加参数
        if (upperKeyword.value && upperKeyword.value.trim() !== '') {
            params.append('keyword', upperKeyword.value.trim())
        }

        // 拼接 URL
        const url = `api/${props.modName}Management/tags${params.toString() ? '?' + params.toString() : ''}`
        console.log('请求URL:', url)

        // 发送请求
        const res = await instance.get(url)
        console.log('响应:', res)

        if (res.status === 200 && res.data) {
            upperTags.value = res.data
        }
    }
    catch (error) {
        console.error("发生错误", error)
    }
}

const clickUpperBtn = async (tag) => {
    try {
        console.log(tag)
        await getUpperTagList(tag)
        upperDialogVisible.value = true
    }
    catch (error) {
        console.error("发生错误", error)
    }
}

const clickPickBtn = async (tag) => {
    try {
        form.value.tagUpperCode = tag.tagCode
        form.value.tagUpperName = tag.tagName
        upperDialogVisible.value = false
    }
    catch (error) {
        console.error("发生错误", error)
    }
}

const clickEditBtn = async (tag) => {
    try {
        await getTagList()
        await getTagTypeList()
        const latest = tags.value.find(t => t.tagCode === tag.tagCode)
        form.value = { ...latest }
        isEdit.value = true
        editDialogVisible.value = true
    }
    catch (error) {
        console.error("发生错误", error)
    }
}

const editTag = async (tag) => {
    try {
        const res = await instance.put(`api/${props.modName}Management/tags/${tag.tagCode}`, tag)
        if (res.status === 200) {
            editDialogVisible.value = false
            await getTagList()
            await getTagTypeList()
        }
    }
    catch (error) {
        console.error("发生错误", error)
    }
}

const clickAddBtn = async () => {
    try {
        await getTagList()
        await getTagTypeList()
        form.value = {
            tagCode: '',
            tagName: '',
            tagTypeCode: '',
            tagTypeName: '',
            tagUpperCode: null,
            tagUpperName: '',
            tagTypeUpperCode: null,
            tagTypeUpperName: ''
        }
        isEdit.value = false
        editDialogVisible.value = true
    }
    catch (error) {
        console.error("发生错误", error)
    }
}

const addTag = async (tag) => {
    try {
        const res = await instance.post(`api/${props.modName}Management/tags`, tag)
        if (res.status === 201) {
            editDialogVisible.value = false
            await getTagList()
            await getTagTypeList()
        }
    }
    catch (error) {
        console.error("发生错误", error)
    }
}

const clickDeleteBtn = async (tag) => {
    try {
        await getTagList()
        await getTagTypeList()
        const latest = tags.value.find(t => t.tagCode === tag.tagCode)
        form.value = { ...latest }
        deleteDialogVisible.value = true
    }
    catch (error) {
        console.error("发生错误", error)
    }
}

const deleteTag = async (tag) => {
    try {
        const res = await instance.delete(`api/${props.modName}Management/tags/${tag.tagCode}`)
        if (res.status === 200) {
            deleteDialogVisible.value = false
            await getTagList()
            await getTagTypeList()
        }
    }
    catch (error) {
        console.error("发生错误", error)
    }
}

onMounted(() => getTagTypeList())
onMounted(() => getTagList())


</script>
<style>
@import url("../../assets/css/common.css");
</style>
<style scoped>
.pane-archive {
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.pane-toolbar {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.panel-table {
    width: 100%;
    overflow-y: scroll;
}

.add-new-btn {
    color: var(--font-color-1st);
    padding: 5px 10px;
    /* border-radius: var(--radius-s); */
    background-color: var(--bg-color-btn);
    border: none;
}

table {
    width: 100%;
    padding: 20px;
    border-collapse: collapse;
}

thead {
    background-color: var(--bg-color-btn);
}

th {
    color: var(--font-color-1st);
}


tr {

    border-bottom: 1px solid var(--bg-color-3rd);
}

td {
    color: var(--font-color-3rd);
    padding: 5px;
    text-align: center;
}

.form-block {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.el-dialog.upper-dialog{
    background-color: var(--bg-color-3rd) !important;
}
</style>
```

## FILE: src\components\Management\TagTypeManagement.vue

```vue
<template>
    <div class="panel-body">
        <div class="toolbar">
            <el-button class="add-new-btn" @click="clickAddBtn">+ 新增类型</el-button>
        </div>
        <table>
            <thead>
                <tr>
                    <th>类型编码</th>
                    <th>类型名称</th>
                    <th>上级类型编码</th>
                    <th>上级类型名称</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody id="tagTypeTbody">
                <tr v-for="tagType in tagTypes" :key="tagType.tagTypeCode">
                    <td>{{ tagType.tagTypeCode }}</td>
                    <td>{{ tagType.tagTypeName }}</td>
                    <td>{{ tagType.tagTypeUpperCode }}</td>
                    <td>{{ tagType.tagTypeUpperName }}</td>
                    <td>
                        <el-button class="edit-btn" @click="clickEditBtn(tagType)">编辑</el-button>
                        <el-button class="edit-btn" @click="clickDeleteBtn(tagType)">删除</el-button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <el-dialog v-model="dialogEditVisible">
        <el-form :model="form">
            <el-form-item label="类型编码">
                <el-input v-model="form.tagTypeCode" autocomplete="off" disabled="true" />
            </el-form-item>
            <el-form-item label="类型名称">
                <el-input v-model="form.tagTypeName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="上级类型">
                <el-select v-model="form.tagTypeUpperCode" placeholder="请选择类型">
                    <el-option v-for="tagType in tagTypeOptions" :key="tagType.tagTypeCode" :label="tagType.tagTypeName"
                        :value="tagType.tagTypeCode" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogEditVisible = false">Cancel</el-button>
                <el-button type="primary" @click="isEdit ? updateTagType(form) : createTagType(form)">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>

    <el-dialog v-model="dialogDeleteVisible">
        确认删除标签类别【{{ form.tagTypeName }}】吗？
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogDeleteVisible = false">Cancel</el-button>
                <el-button type="primary" @click="deleteTagType(form)">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup>
import { onMounted, ref, computed } from 'vue'
import instance from '@/utils/request.js';
const props = defineProps({
    modName: {
        type: String,
        require: true
    }
})

const isEdit = ref(false)
const dialogEditVisible = ref(false)
const dialogDeleteVisible = ref(false)
const tagTypes = ref([])
const form = ref({
    tagTypeCode: null,
    tagTypeName: '',
    tagTypeUpperCode: null,
    tagTypeUpperName: ''
})

const getTagTypeList = async () => {
    try {
        const res = await instance.get(`api/${props.modName}Management/tagtypes`)
        console.log(res)
        if (res.status === 200 && res.data) {
            tagTypes.value = res.data
        }
    }
    catch (error) {
        console.error('发生错误', error)
    }
}

const clickAddBtn = async () => {
    form.value = {
        tagTypeCode: '',
        tagTypeName: '',
        tagTypeUpperCode: null,
        tagTypeUpperName: ''
    }
    isEdit.value = false
    dialogEditVisible.value = true
}

const clickEditBtn = async (tagType) => {
    try {
        await getTagTypeList()
        const latest = tagTypes.value.find(tt => tt.tagTypeCode === tagType.tagTypeCode)
        form.value = { ...latest }
        isEdit.value = true
        dialogEditVisible.value = true
    }
    catch (error) {
        console.error('发生错误', error)
    }
}

const updateTagType = async (tagType) => {
    try {
        const res = await instance.put(`api/${props.modName}Management/tagtypes/${tagType.tagTypeCode}`, tagType)
        console.log(res)
        if (res.status === 200 && res.data) {
            dialogEditVisible.value = false
        }
        else {
            alert(res)
        }
        await getTagTypeList()
    }
    catch (error) {
        console.error('发生错误', error)
    }
}

const createTagType = async (tagType) => {
    try {
        const res = await instance.post(`api/${props.modName}Management/tagtypes`, tagType)
        console.log(res)
        if (res.status === 201 && res.data) {
            dialogEditVisible.value = false
        }
        else {
            alert(res)
        }
        await getTagTypeList()
    }
    catch (error) {
        console.error('发生错误', error)
    }
}

const deleteTagType = async (tagType) => {
    try {
        const res = await instance.delete(`api/${props.modName}Management/tagtypes/${tagType.tagTypeCode}`)
        console.log(res)
        dialogDeleteVisible.value = false
        await getTagTypeList()
    }
    catch (error) {
        console.error('发生错误', error)
    }

}

const clickDeleteBtn = async (tagType) => {
    try {
        await getTagTypeList()
        const latest = tagTypes.value.find(tt => tt.tagTypeCode === tagType.tagTypeCode)
        form.value = { ...latest }
        dialogDeleteVisible.value = true
    }
    catch (error) {
        console.error('发生错误', error)
    }
}

const tagTypeOptions = computed(() => {
    // 头部插入一个“无”选项，tagTypeCode 为空字符串（或 null，根据需求）
    const emptyOption = {
        tagTypeCode: null,        // 前端用空字符串，提交时转为 null
        tagTypeName: '无',
        tagTypeUpperCode: '',
        tagTypeUpperName: ''
    }
    return [emptyOption, ...tagTypes.value]
})

onMounted(() => getTagTypeList())
</script>
<style>
@import url("../../assets/css/common.css");
</style>
<style scoped>
.panel-body {
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.add-new-btn {
    color: var(--font-color-1st);
    padding: 5px 10px;
    /* border-radius: var(--radius-s); */
    background-color: var(--bg-color-btn);
    border: none;
}

table {
    padding: 20px;
    border-collapse: collapse;
}

thead {
    background-color: var(--bg-color-btn);
}

th {
    color: var(--font-color-1st);
}

tr {

    border-bottom: 1px solid var(--bg-color-3rd);
}

td {
    color: var(--font-color-1st);
    padding: 5px;
    text-align: center;
}
</style>
```

## FILE: src\components\Management\WorkManagement.vue

```vue
<template>
    <div class="panel-body">
        <div class="toolbar">
            <el-button class="add-new-btn" @click="clickAddBtn">+ 新建图书</el-button>
            <el-select v-model="filterTagTypeCode" placeholder="全部类型" clearable>
                <el-option v-for="tagType in tagTypeOptions" :key="tagType.tagTypeCode" 
                    :label="tagType.tagTypeName" :value="tagType.tagTypeCode" />
            </el-select>
            <el-input type="text" placeholder="搜索书名或标签..." v-model="keyword" />
            <el-button @click="getWorkList">🔍 筛选</el-button>
        </div>
        <div class="panel-table">
            <table>
                <thead>
                    <tr>
                        <th>书码</th>
                        <th>书名</th>
                        <th>封面</th>
                        <th>标签</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="work in works" :key="work.workCode">
                        <td>{{ work.workCode }}</td>
                        <td>{{ work.workName }}</td>
                        <td>
                            <img :src="work.coverUrl" alt="封面" class="cover-thumb" />
                        </td>
                        <td>
                            <el-tag v-for="tag in work.tags" :key="tag.tagCode" size="small" style="margin:2px;">
                                {{ tag.tagName }}
                            </el-tag>
                        </td>
                        <td>
                            <el-button class="edit-btn" @click="clickEditBtn(work)">编辑</el-button>
                            <el-button class="edit-btn" @click="clickDeleteBtn(work)">删除</el-button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- 新增/编辑弹窗 -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑图书' : '新建图书'">
        <el-form :model="form" label-width="80px">
            <el-form-item label="书码" v-if="isEdit">
                <el-input v-model="form.workCode" disabled />
            </el-form-item>
            <el-form-item label="书名">
                <el-input v-model="form.workName" placeholder="请输入书名" />
            </el-form-item>
            <el-form-item label="封面">
                <div class="cover-upload">
                    <img v-if="form.coverUrl" :src="form.coverUrl" class="cover-preview" />
                    <el-upload
                        class="avatar-uploader"
                        action="#"
                        :auto-upload="false"
                        :show-file-list="false"
                        :on-change="handleCoverChange"
                    >
                        <el-button v-if="!form.coverUrl" type="primary">点击上传封面</el-button>
                        <el-button v-else type="warning" @click.stop="removeCover">移除封面</el-button>
                    </el-upload>
                </div>
            </el-form-item>
            <el-form-item label="标签">
                <el-select v-model="selectedTagCodes" multiple filterable placeholder="请选择标签">
                    <el-option v-for="tag in allTags" :key="tag.tagCode" 
                        :label="`${tag.tagName} (${tag.tagTypeName})`" :value="tag.tagCode" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handleConfirm">保存</el-button>
        </template>
    </el-dialog>

    <!-- 删除确认弹窗 -->
    <el-dialog v-model="deleteDialogVisible">
        确认删除图书【{{ form.workName }}】吗？
        <template #footer>
            <el-button @click="deleteDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="deleteWork">确认</el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import instance from '@/utils/request.js'

const props = defineProps({
    modName: {
        type: String,
        require: true
    }
})

// ============ 响应式数据 ============
const works = ref([])
const allTags = ref([])
const tagTypes = ref([])
const filterTagTypeCode = ref('')
const keyword = ref('')
const isEdit = ref(false)
const dialogVisible = ref(false)
const deleteDialogVisible = ref(false)

const form = ref({
    workCode: '',
    workName: '',
    coverUrl: '',
    coverFile: null,      // 原始文件对象（用于上传）
    tags: []
})

const selectedTagCodes = ref([])

// ============ 计算属性 ============
const tagTypeOptions = computed(() => {
    const all = { tagTypeCode: '', tagTypeName: '全部类型' }
    return [all, ...tagTypes.value]
})

// ============ API 方法 ============
const getTagTypeList = async () => {
    try {
        const res = await instance.get(`api/${props.modName}Management/tagtypes`)
        if (res.status === 200 && res.data) {
            tagTypes.value = res.data
        }
    } catch (error) {
        console.error('获取标签类型失败:', error)
    }
}

const getAllTags = async () => {
    try {
        const res = await instance.get(`api/${props.modName}Management/tags`)
        if (res.status === 200 && res.data) {
            allTags.value = res.data
        }
    } catch (error) {
        console.error('获取标签列表失败:', error)
    }
}

const getWorkList = async () => {
    try {
        const params = new URLSearchParams()
        if (filterTagTypeCode.value) {
            params.append('typeCode', filterTagTypeCode.value.trim())
        }
        if (keyword.value && keyword.value.trim() !== '') {
            params.append('keyword', keyword.value.trim())
        }
        const url = `api/${props.modName}Management/works/list${params.toString() ? '?' + params.toString() : ''}`
        const res = await instance.get(url)
        if (res.status === 200 && res.data) {
            works.value = res.data
        }
    } catch (error) {
        console.error('获取作品列表失败:', error)
    }
}

// ============ 封面处理 ============
const handleCoverChange = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
        form.value.coverUrl = e.target.result  // Base64
        form.value.coverFile = file.raw
    }
    reader.readAsDataURL(file.raw)
}

const removeCover = () => {
    form.value.coverUrl = ''
    form.value.coverFile = null
}

// ============ 表单操作 ============
const resetForm = () => {
    form.value = {
        workCode: '',
        workName: '',
        coverUrl: '',
        coverFile: null,
        tags: []
    }
    selectedTagCodes.value = []
}

const clickAddBtn = async () => {
    await getAllTags()
    resetForm()
    isEdit.value = false
    dialogVisible.value = true
}

const clickEditBtn = async (work) => {
    try {
        await getAllTags()
        const latest = works.value.find(w => w.workCode === work.workCode)
        if (latest) {
            form.value = {
                workCode: latest.workCode,
                workName: latest.workName,
                coverUrl: latest.coverUrl,
                coverFile: null,
                tags: latest.tags || []
            }
            selectedTagCodes.value = (latest.tags || []).map(t => t.tagCode)
            isEdit.value = true
            dialogVisible.value = true
        }
    } catch (error) {
        console.error('打开编辑弹窗失败:', error)
    }
}

const clickDeleteBtn = async (work) => {
    try {
        const latest = works.value.find(w => w.workCode === work.workCode)
        if (latest) {
            form.value = { ...latest }
            deleteDialogVisible.value = true
        }
    } catch (error) {
        console.error('打开删除弹窗失败:', error)
    }
}

// ============ 提交 ============
const handleConfirm = async () => {
    if (!form.value.workName || form.value.workName.trim() === '') {
        alert('请输入书名')
        return
    }
    if (!form.value.coverUrl) {
        alert('请上传封面')
        return
    }

    // 构建提交数据
    const payload = {
        workName: form.value.workName.trim(),
        coverUrl: form.value.coverUrl,  // Base64
        tags: selectedTagCodes.value.map(code => ({ tagCode: code }))
    }

    try {
        let res
        if (isEdit.value) {
            res = await instance.put(`api/${props.modName}Management/works/${form.value.workCode}`, payload)
        } else {
            res = await instance.post(`api/${props.modName}Management/works`, payload)
        }
        if (res.status === 200 || res.status === 201) {
            dialogVisible.value = false
            await getWorkList()
            await getTagTypeList()
        }
    } catch (error) {
        console.error('保存失败:', error)
        alert('保存失败，请检查数据')
    }
}

const deleteWork = async () => {
    try {
        const res = await instance.delete(`api/${props.modName}Management/works/${form.value.workCode}`)
        if (res.status === 200) {
            deleteDialogVisible.value = false
            await getWorkList()
        }
    } catch (error) {
        console.error('删除失败:', error)
        alert('删除失败，请重试')
    }
}

// ============ 生命周期 ============
onMounted(async () => {
    await getTagTypeList()
    await getAllTags()
    await getWorkList()
})
</script>

<style scoped>
.panel-body {
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.toolbar {
    display: flex;
    flex-direction: row;
    gap: 10px;
    flex-wrap: wrap;
}

.panel-table {
    width: 100%;
    overflow-y: auto;
    flex: 1;
}

.add-new-btn {
    color: var(--font-color-1st);
    padding: 5px 10px;
    background-color: var(--bg-color-btn);
    border: none;
}

table {
    width: 100%;
    border-collapse: collapse;
}

thead {
    background-color: var(--bg-color-btn);
}

th {
    color: var(--font-color-1st);
    padding: 10px;
    text-align: center;
}

tr {
    border-bottom: 1px solid var(--bg-color-3rd);
}

td {
    color: var(--font-color-1st);
    padding: 8px 5px;
    text-align: center;
    vertical-align: middle;
}

.cover-thumb {
    width: 50px;
    height: 70px;
    object-fit: cover;
    border-radius: 4px;
}

.cover-upload {
    display: flex;
    align-items: center;
    gap: 15px;
}

.cover-preview {
    width: 80px;
    height: 112px;
    object-fit: cover;
    border-radius: 4px;
    border: 1px solid #ddd;
}

.avatar-uploader {
    display: inline-block;
}

.edit-btn {
    margin: 0 2px;
}
</style>
```

## FILE: src\main.js

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

import '@/assets/css/common.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
```

## FILE: src\router\index.js

```js
import { createRouter,createWebHashHistory } from "vue-router";
import Home from "@/views/Home.vue";
import component from "element-plus/es/components/tree-select/src/tree-select-option.mjs";

const routes =[
    {
        path:"/",
        name:"home",
        component:Home
    },
    {
        path:"/Comic",
        name:"comic",
        component:()=>import("@/views/Comic/Comic.vue") //这是异步加载，不会在顶部全部加载，优化加载，首页以外建议全部异步引入
    },
    {
        path:"/ComicDetail/:workCode",
        name:"comicDetail",
        component:()=>import("@/views/Comic/ComicDetail.vue")
    },
    {
        path:"/ComicPage/:contentCode",
        name:"comicPage",
        component:()=>import("@/views/Comic/ComicPage.vue")
    },
    {
        path:"/Management",
        name:"management",
        component:()=>import("@/views/Management/Management.vue")
    }
];

const router = createRouter({
    history:createWebHashHistory(),
    routes
});

export default router;
```

## FILE: src\utils\request.js

```js
import axios from "axios";

// ------------------------------------------------------
// 原生 fetch 封装的 API（未被使用，保留以备后用）
// ------------------------------------------------------
export async function fetchAPI(API_BASE, url, options = {}) {
  // 如果是 FormData，删除 Content-Type 让浏览器自动设置
  const headers = { 'Content-Type': 'application/json' };
  if (options.body instanceof FormData) {
    delete headers['Content-Type'];
  }
  const res = await fetch(API_BASE + url, {
    headers: headers,
    ...options
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return await res.json();
}

// ------------------------------------------------------
// 错误提示处理函数
// ------------------------------------------------------
function errorHandle(status, info) {
  // 如果 info 是对象，转为字符串便于显示
  const msg = typeof info === 'string' ? info : JSON.stringify(info);
  switch (status) {
    case 400:
      console.log("语义有误", msg);
      break;
    case 401:
      console.log("服务器认证失败", msg);
      break;
    case 403:
      console.log("服务器拒绝访问", msg);
      break;
    case 404:
      console.log("地址错误", msg);
      break;
    case 500:
      console.log("服务器遇到意外", msg);
      break;
    case 502:
      console.log("服务器无响应", msg);
      break;
    case 0:   // 网络不通或请求未发出
      console.log("网络请求失败，请检查网络连接", msg);
      break;
    default:
      console.log(info || "未知错误");
      break;
  }
}

// ------------------------------------------------------
// 创建 axios 实例
// ------------------------------------------------------
const instance = axios.create({
  timeout: 30000,
});

// 请求拦截器（目前未做特殊处理，可扩展）
instance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    // 必须返回 Promise.reject，否则错误会被吞掉
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  response => {
    // 只要状态码是 2xx 就会进入这里，直接返回响应
    return response;
  },
  error => {
    // --------------------------------------------------
    // 修复：安全获取 status 和 info，避免 undefined 报错
    // --------------------------------------------------
    let status = -1;       // 默认未知状态
    let info = '';

    if (error.response) {
      // 服务器有响应，但状态码非 2xx
      status = error.response.status;
      info = error.response.data || error.message;
    } else if (error.request) {
      // 请求已发出，但未收到响应（网络问题）
      status = 0;          // 用 0 表示网络不通
      info = '请求超时或网络异常';
    } else {
      // 其他错误（如请求配置错误）
      status = -1;
      info = error.message || '未知错误';
    }

    // 调用错误提示函数
    errorHandle(status, info);

    // 将错误继续抛出，以便业务代码的 catch 能捕获
    return Promise.reject(error);
  }
);

export default instance;
```

## FILE: src\views\Comic\Comic.vue

```vue
<template>
</template>
<script setup></script>
<style scoped></style>
<style></style>
```

## FILE: src\views\Comic\ComicDetail.vue

```vue
<template>
    <div class=" work-detail">
        <img class="cover" :src="detail.coverUrl" alt="">
        <div class="detail">
            <div class="work-name">{{ detail.workName }}</div>
            <div class="upload-time">首次上传于：{{ detail.uploadTime }}</div>
            <div class="update-time">最后更新于：{{ detail.updateTime }}</div>
            <div class="tag-group" v-for="tagType in tagGroups" :key="tagType.tagCode">
                <div class="tag-group-title">{{ tagType.tagTypeName }}</div>
                <div class="tag-list">
                    <router-link class="tag" v-for="tag in tagType.tags" :key="tag.tagCode">
                        {{ tag.tagName }}
                    </router-link>
                </div>
            </div>
        </div>
    </div>
    <div class="content-list-title">目录</div>
    <div class="content-list">
        <router-link class="content" v-for="content in contents" :key="content.contentCode"
            :to="'/ComicPage/' + content.contentCode">
            {{ content.contentName }}
        </router-link>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import instance from '@/utils/request';

defineOptions({
    name: "ComicPage",
    inheritAttrs: false
})

const route = useRoute()
const router = useRouter()

const detail = ref({
    workCode: '',
    workName: '',
    uploadTime: '',
    updateTime: '',
    coverUrl: '',
    tags: []
})

const tagGroups = ref([])

const contents = ref([])

const getWorkDetail = async () => {
    try {

        const res = await instance.get(`api/Comic/works/detail/${detail.workCode}`)
        console.log(res.data)
        if (res.status === 200 && res.data) {
            if (res.data.work) {
                detail.value = res.data.work
                const tagMap = {};
                detail.value.tags.forEach(t => {
                    if (!tagMap[t.tagTypeCode]) {
                        tagMap[t.tagTypeCode] = { tagTypeCode: t.tagTypeCode, tagTypeName: t.tagTypeName, tags: [] };
                    }
                    tagMap[t.tagTypeCode].tags.push({ tagCode: t.tagCode, tagName: t.tagName });
                });
                const groups = Object.values(tagMap);
                groups.sort((a, b) => a.tagTypeCode.localeCompare(b.tagTypeCode));
                groups.forEach(g => g.tags.sort((a, b) => a.tagName.localeCompare(b.tagName)));
                tagGroups.value = groups;
            }
            if (res.data.contents) {
                contents.value = res.data.contents;
                contents.value.sort((a, b) => a.contentCode.localeCompare(b.contentCode));
            }
        }
    }
    catch (error) {
        console.error('发生错误', error)
    }
    console.log(detail.value)
    console.log(tagGroups.value)
    console.log(contents.value)
}

// onMounted(()=>getWorkDetail())

watch(() => route.params.workCode,
    () => {
        try {
            detail.workCode = route.params.workCode
            getWorkDetail()
        }
        catch {

        }
    },
    { immediate: true })
</script>
<style>
@import url(../../assets/css/common.css);
</style>
<style scoped>
.work-detail {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 5%;
    border-bottom: 1px solid var(--font-color-3rd);
    padding: 50px;
}

.cover {
    width: 25%;
    aspect-ratio: 3 / 4;
    object-fit: cover;
    object-position: center;
    border-radius: var(--radius-l);
    align-self: flex-start;
}

.detail {
    display: flex;
    flex-direction: column;
}

.work-name {
    color: var(--font-color-1st);
    font-size: 3rem;
}

.update-time,
.upload-time {
    color: var(--font-color-3rd);
    font-size: 0.8rem;
    padding: 10px;
}

.tag-group {
    margin: 5px;
}

.tag-group-title {
    font-size: 1.2rem;
    color: var(--font-color-1st);
    padding: 5px;
}

.tag-list {
    padding: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
        flex-wrap: wrap;

}

.tag {
    padding: 5px;
    background-color: var(--bg-color-tag-type);
    border-radius: var(--radius-s);
    color: var(--font-color-1st);
    text-decoration: none;
    white-space: nowrap;
}

.content-list {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.content-list-title {
    color: var(--font-color-1st);
    font-size: 2rem;
}

.content {
    padding: 5px;
    color: var(--font-color-1st);
    background-color: var(--bg-color-tag);
    border-radius: var(--radius-s);
    text-decoration: none;
}
</style>
```

## FILE: src\views\Comic\ComicPage.vue

```vue
<template>
    <main class="main-container" ref="mainContainer">
        <h3 id="title" @click="addCounterCommit">
            {{ currentContent.contentName }}
        </h3>
        <div class="image-list">
            <div v-if="loading">加载中...</div>
            <img v-for="url in currentContent.imgUrlList" :key="url" :src="url" alt="漫画页" v-show="!loading" />
        </div>
        <div class="pre-n-next">
            <router-link class="pre" v-if="previousContent.contentCode"
                :to="'/ComicPage/' + previousContent.contentCode">
                上一话【{{ previousContent.contentName }}】
            </router-link>
            <router-link class="next" v-if="nextContent.contentCode" :to="'/ComicPage/' + nextContent.contentCode">
                下一话【{{ nextContent.contentName }}】
            </router-link>
        </div>
    </main>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import instance from '@/utils/request' // 你的 axios 实例

defineOptions({
    name: "ComicPage",
    inheritAttrs: false
})

const router = useRouter()
const route = useRoute()

// ===== 3. 响应式数据 =====
const loading = ref(false)

const previousContent = reactive({
    contentCode: '',
    contentName: ''
})
const nextContent = reactive({
    contentCode: '',
    contentName: ''
})

const currentContent = reactive({
    contentCode: "",
    contentName: "",
    imgUrlList: []
})

// ===== 4. 方法 =====
const loadImageList = async () => {
    loading.value = true
    try {
        const res = await instance.get(`/api/Comic/contents/${currentContent.contentCode}`)
        console.log(res.data)
        Object.assign(previousContent,
            res.data.contents["previous"] || { contentCode: "", contentName: "" })
        Object.assign(currentContent,
            res.data.contents["current"] || { contentCode: "", contentName: "", imgUrlList: [] })
        Object.assign(nextContent,
            res.data.contents["next"] || { contentCode: "", contentName: "" })
        console.log('加载成功', res)
    } catch (error) {
        console.error('请求失败:', error)
    } finally {
        loading.value = false
        await nextTick()
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

// ===== 5. 监听路由参数变化 =====
watch(
    () => route.params.contentCode,
    (newValue) => {
        if (newValue) {
            currentContent.contentCode = newValue
            loadImageList()
        } else {
            router.push('/Comic')
        }
    },
    { immediate: true } // 组件创建时立即执行一次
)

// ===== 6. 暴露数据给模板 =====
</script>

<style>
@import url(../../assets/css/common.css);
</style>

<style scoped>
#title {
    font-size: 3rem;
    color: var(--font-color-1st);
    align-self: center;
}

.main-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px;
    gap: 50px;
}

.image-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0;
    align-self: center;
}

.main-container img {
    width: 100%;
    height: auto;
}

.pre-n-next {
    /* display: flex;
    flex-direction: row;
    justify-content: space-between; */
    position: relative;
}

.pre-n-next a {
    font-size: 1.2rem;
    color: var(--font-color-1st);
    text-decoration: none;
}

.pre {
    position: absolute;
    left: 50px;
}

.next {
    position: absolute;
    right: 50px;
}

/* 手机：默认样式，< 768px */
/* 电脑：>= 768px */
@media (min-width: 768px) {

    /* 电脑端覆盖 */
    .image-list {
        width: 60%;
    }
}
</style>
```

## FILE: src\views\Home.vue

```vue
<template>
    <div class="works-swiper" id="home-comic">
        <router-link class="swiper-item" v-for="item in comicRandomList" :key="item.workCode"
            :to="'/ComicDetail/' + item.workCode">
            <img class="swiper-item-cover" :src="item.coverUrl" alt="">
            <label class="swiper-item-title">{{ item.workName }}</label>
        </router-link>
    </div>
    <!-- <router-view>
    </router-view> -->
</template>
<script setup>
import { ref, reactive, computed, watch, onMounted, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import instance from '@/utils/request.js';

const loading = ref(false)
const comicRandomList = ref([])
const getRandomComic = async () => {
    loading.value = true;
    try {
        const res = await instance.get(`api/Comic/works/random?count=15`)
        console.log(res);
        if (res.status === 200 && res.data.length > 0) {
            comicRandomList.value = []
            for (let i = 0; i < res.data.length; i++) {
                comicRandomList.value.push(res.data[i])
            }
        }
    }
    catch {

    }
}

onMounted(() => getRandomComic())

</script>
<style>
@import url("../assets/css/common.css");
</style>

<style scoped>
router-link {
    color: var(--font-color-1st);
}

.works-swiper {
    width: 100%;
    display: grid;
    grid-template: auto /repeat(5, 1fr);
    grid-gap: 20px;
    padding: 20px;
}

.swiper-item {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: 0.2s ease-in-out;
}

.swiper-item:hover {
    scale: 1.1;
}

.swiper-item-cover {
    width: 100%;
    height: auto;
    border-radius: var(--radius-s);
    object-fit: cover;
    object-position: center;
    aspect-ratio: 3/4;
}

.swiper-item-title {
    color: var(--font-color-1st);
}

@media (max-width: 768px) {

    /* 电脑端覆盖 */
    .works-swiper {
        grid-template: auto /repeat(3, 1fr);
    }
}
</style>
```

## FILE: src\views\Management\Management.vue

```vue
<template>
    <el-tabs class="tab-mods" tab-position="left" v-model="activeTab">
        <el-tab-pane class="tab-mods-pane" v-for="mod in mods" :label="mod.label" :name="mod.name">
            <ManagementModule :mod-name="mod.name"></ManagementModule>
        </el-tab-pane>
    </el-tabs>
</template>
<script setup>
import { ref, computed, defineAsyncComponent } from 'vue'



const ManagementModule = defineAsyncComponent(() => import("@/components/Management/ManagementModule.vue"))


const mods = ref([
    {
        label: '漫画',
        name: 'Comic'
    }])
const activeTab = ref('Comic')

</script>
<style></style>

<style scoped>
.tab-mods {
    height: 100%;
}

.tab-mods :deep(.el-tabs__item) {
    margin: 5px;
    padding: 25px;
    color: var(--font-color-1st);
    font-size: 1.2rem;
    border-radius: var(--radius-l);
    transition: 0.2s ease-in-out;
    justify-self: center;
}

.tab-mods :deep(.el-tabs__item):hover {
    background-color: var(--bg-color-3rd);
}

.tab-mods :deep(.el-tabs__item).is-active {
    color: var(--font-color-cur);
}

.tab-mods-pane {
    height: 100%;
}
</style>
```

## FILE: vite.config.js

```js
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:91',
        changeOrigin: true,
      },
      '/anime/cover': { target: 'http://localhost:91', changeOrigin: true },
      '/anime/content': { target: 'http://localhost:91', changeOrigin: true },
      '/comic/cover': { target: 'http://localhost:91', changeOrigin: true },
      '/comic/content': { target: 'http://localhost:91', changeOrigin: true },
      '/fiction/cover': { target: 'http://localhost:91', changeOrigin: true },
      '/fiction/content': { target: 'http://localhost:91', changeOrigin: true },
      '/movie/cover': { target: 'http://localhost:91', changeOrigin: true },
      '/movie/content': { target: 'http://localhost:91', changeOrigin: true },
      '/series/cover': { target: 'http://localhost:91', changeOrigin: true },
      '/series/content': { target: 'http://localhost:91', changeOrigin: true },
    }
  }
})
```

