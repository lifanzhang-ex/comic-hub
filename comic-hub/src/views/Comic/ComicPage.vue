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