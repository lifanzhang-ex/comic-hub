<template>
    <section class="page">
        <h1 class="error-code">404</h1>
        <p class="page-desc">页面不存在</p>
        <router-link class="back-link" to="/">返回首页</router-link>
    </section>
</template>

<script setup>
defineOptions({ name: 'NotFoundView' })
</script>

<style scoped>
.page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    min-height: 60vh;
    width: 100%;
}

.error-code {
    font-size: 6rem;
    color: var(--font-color-cur);
}

.page-desc {
    color: var(--font-color-3rd);
    font-size: 1.2rem;
}

.back-link {
    color: var(--font-color-1st);
    text-decoration: none;
    padding: 8px 20px;
    border: 1px solid var(--bg-color-btn);
    border-radius: var(--radius-s);
    transition: background-color 0.2s;
}

.back-link:hover {
    background-color: var(--bg-color-btn);
}
</style>