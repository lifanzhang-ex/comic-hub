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