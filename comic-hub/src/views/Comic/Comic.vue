<template>
    <section class="comic-list">
        <h1 class="page-title">漫画库</h1>

        <div v-if="loading" class="state">加载中...</div>
        <div v-else-if="error" class="state state-error">{{ error }}</div>
        <div v-else-if="!works.length" class="state">暂无作品</div>

        <div v-else class="works-grid">
            <router-link v-for="item in works" :key="item.workCode" class="work-item"
                :to="'/comic/detail/' + item.workCode">
                <img class="work-cover" :src="item.coverUrl" :alt="item.workName" loading="lazy" />
                <span class="work-title">{{ item.workName }}</span>
            </router-link>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { comicApi } from '@/api'

defineOptions({ name: 'ComicListView' })

const loading = ref(false)
const error = ref('')
const works = ref([])

async function fetchWorks() {
    loading.value = true
    error.value = ''
    try {
        // 方案 A：后端有专门的列表接口
        const data = await comicApi.getWorksList({ count: 100 })

        // 方案 B：后端没有列表接口，用 random 拿大数量（临时）
        // const data = await comicApi.getRandomWorks(100)

        works.value = Array.isArray(data) ? data : data?.list || []
    } catch (e) {
        error.value = '加载失败，请稍后重试'
        console.error(e)
    } finally {
        loading.value = false
    }
}

onMounted(fetchWorks)
</script>

<style scoped>
.comic-list {
    width: 100%;
}

.page-title {
    color: var(--font-color-1st);
    font-size: 1.8rem;
    margin-bottom: 16px;
}
</style>