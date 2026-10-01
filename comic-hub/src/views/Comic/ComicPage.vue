<template>
    <section class="comic-page">
        <h1 class="chapter-title">{{ currentContent.contentName || '加载中...' }}</h1>

        <div v-if="loading" class="state">加载中...</div>

        <div v-else class="image-list">
            <img v-for="(url, index) in currentContent.imgUrlList" :key="`${url}-${index}`" :src="url"
                :alt="`第 ${index + 1} 页`" loading="lazy" />
        </div>

        <nav class="chapter-nav">
            <router-link v-if="previousContent.contentCode" class="nav-btn"
                :to="'/comic/page/' + previousContent.contentCode">
                ← 上一话【{{ previousContent.contentName }}】
            </router-link>
            <span v-else class="nav-btn disabled">已是第一话</span>

            <router-link v-if="nextContent.contentCode" class="nav-btn" :to="'/comic/page/' + nextContent.contentCode">
                下一话【{{ nextContent.contentName }}】 →
            </router-link>
            <span v-else class="nav-btn disabled">已是最后一话</span>
        </nav>
    </section>
</template>

<script setup>
import { ref, reactive, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { comicApi } from '@/api'

defineOptions({ name: 'ComicPageView' })

const route = useRoute()
const router = useRouter()

const loading = ref(false)

const previousContent = reactive({ contentCode: '', contentName: '' })
const currentContent = reactive({ contentCode: '', contentName: '', imgUrlList: [] })
const nextContent = reactive({ contentCode: '', contentName: '' })

function resetContent() {
    Object.assign(previousContent, { contentCode: '', contentName: '' })
    Object.assign(currentContent, { contentCode: '', contentName: '', imgUrlList: [] })
    Object.assign(nextContent, { contentCode: '', contentName: '' })
}

async function fetchContent(contentCode) {
    loading.value = true
    resetContent()
    currentContent.contentCode = contentCode

    try {
        const data = await comicApi.getContent(contentCode)
        const { previous, current, next } = data?.contents || {}

        Object.assign(previousContent, previous || { contentCode: '', contentName: '' })
        Object.assign(currentContent, current || { contentCode: '', contentName: '', imgUrlList: [] })
        Object.assign(nextContent, next || { contentCode: '', contentName: '' })
    } catch (e) {
        console.error('加载章节失败:', e)
    } finally {
        loading.value = false
        await nextTick()
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

watch(
    () => route.params.contentCode,
    (contentCode) => {
        if (contentCode) {
            fetchContent(contentCode)
        } else {
            router.replace('/comic')
        }
    },
    { immediate: true },
)
</script>

<style scoped>
.comic-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    width: 100%;
}

.chapter-title {
    font-size: 2rem;
    color: var(--font-color-1st);
    text-align: center;
}

.image-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.image-list img {
    width: 100%;
    height: auto;
    display: block;
}

.chapter-nav {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    width: 100%;
    padding: 20px 0;
}

.nav-btn {
    color: var(--font-color-1st);
    text-decoration: none;
    font-size: 1rem;
    transition: color 0.2s;
}

.nav-btn:hover:not(.disabled) {
    color: var(--font-color-cur);
}

.nav-btn.disabled {
    color: var(--font-color-3rd);
    cursor: not-allowed;
}

@media (min-width: 768px) {

    .image-list,
    .chapter-nav {
        width: 60%;
    }
}
</style>