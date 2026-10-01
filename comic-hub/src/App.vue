<template>
  <div class="app-root">
    <header class="top-nav">
      <nav class="app-nav">
        <router-link class="nav-link" to="/">首页</router-link>
        <router-link class="nav-link" to="/comic">漫画</router-link>
        <router-link class="nav-link" to="/management">管理</router-link>
        <router-link class="nav-link nav-avatar" to="/" aria-label="个人中心">
          <img class="avatar" :src="defaultAvatar" alt="用户头像" />
        </router-link>
      </nav>
    </header>

    <main class="main-container">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import defaultAvatar from '@/assets/img/default-avatar.jpg'

defineOptions({ name: 'App' })
</script>

<style scoped>
.app-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-height);
  display: flex;
  justify-content: center;
  background: var(--bg-color-1st);
  border-bottom: 1px solid var(--bg-color-2nd);
  z-index: 100;
}

.app-nav {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.nav-link {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  color: var(--font-color-1st);
  text-decoration: none;
  transition: color 0.2s ease-in-out, transform 0.2s ease-in-out;
}

.nav-link.router-link-active {
  color: var(--font-color-cur);
  transform: scale(1.1);
}

.nav-avatar {
  flex: 0 0 auto;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.main-container {
  flex: 1;
  width: 100%;
  margin: 0 auto;
  padding: calc(var(--nav-height) + 20px) 20px 40px;
}

@media (min-width: 768px) {
  .app-nav {
    width: var(--content-pc-width);
    padding: 0;
  }

  .main-container {
    width: var(--content-pc-width);
    padding-left: 0;
    padding-right: 0;
  }
}
</style>