<template>
    <section class="home">
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
import { comicApi } from '@/api/index.js'

defineOptions({ name: 'HomeView' })

const loading = ref(false)
const error = ref('')
const works = ref([])

async function fetchWorks() {
    loading.value = true
    error.value = ''
    try {
        const data = await comicApi.getRandomWorks(15)
        works.value = Array.isArray(data) ? data : []
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
.home {
    width: 100%;
}
</style>