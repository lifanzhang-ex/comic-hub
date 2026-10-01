<template>
    <section class="comic-detail">
        <div v-if="loading" class="state">加载中...</div>
        <div v-else-if="!detail.workCode" class="state">未找到作品</div>

        <template v-else>
            <div class="work-header">
                <img class="cover" :src="detail.coverUrl" :alt="detail.workName" />
                <div class="info">
                    <h1 class="work-name">{{ detail.workName }}</h1>
                    <p class="meta">首次上传：{{ detail.uploadTime || '-' }}</p>
                    <p class="meta">最后更新：{{ detail.updateTime || '-' }}</p>

                    <div v-for="group in tagGroups" :key="group.tagTypeCode" class="tag-group">
                        <h3 class="tag-group-title">{{ group.tagTypeName }}</h3>
                        <div class="tag-list">
                            <span v-for="tag in group.tags" :key="tag.tagCode" class="tag">
                                {{ tag.tagName }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <h2 class="section-title">目录</h2>
            <div class="content-list">
                <router-link v-for="content in contents" :key="content.contentCode" class="content-item"
                    :to="'/comic/page/' + content.contentCode">
                    {{ content.contentName }}
                </router-link>
            </div>
        </template>
    </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { comicApi } from '@/api'

defineOptions({ name: 'ComicDetailView' })

const route = useRoute()

const loading = ref(false)
const detail = ref(createEmptyDetail())
const contents = ref([])

/* 标签按类型分组（computed 派生） */
const tagGroups = computed(() => {
    const tags = detail.value.tags || []
    const map = new Map()

    for (const tag of tags) {
        if (!map.has(tag.tagTypeCode)) {
            map.set(tag.tagTypeCode, {
                tagTypeCode: tag.tagTypeCode,
                tagTypeName: tag.tagTypeName,
                tags: [],
            })
        }
        map.get(tag.tagTypeCode).tags.push({
            tagCode: tag.tagCode,
            tagName: tag.tagName,
        })
    }

    const groups = [...map.values()]
    groups.sort((a, b) => a.tagTypeCode.localeCompare(b.tagTypeCode))
    groups.forEach((g) => g.tags.sort((a, b) => a.tagName.localeCompare(b.tagName)))
    return groups
})

function createEmptyDetail() {
    return {
        workCode: '',
        workName: '',
        uploadTime: '',
        updateTime: '',
        coverUrl: '',
        tags: [],
    }
}

async function fetchDetail(workCode) {
    loading.value = true
    try {
        const data = await comicApi.getWorkDetail(workCode)

        if (data?.work) {
            detail.value = { ...createEmptyDetail(), ...data.work }
        }

        contents.value = (data?.contents || [])
            .slice()
            .sort((a, b) => a.contentCode.localeCompare(b.contentCode))
    } catch (e) {
        console.error('加载作品详情失败:', e)
    } finally {
        loading.value = false
    }
}

watch(
    () => route.params.workCode,
    (workCode) => {
        if (workCode) fetchDetail(workCode)
    },
    { immediate: true },
)
</script>

<style scoped>
.comic-detail {
    width: 100%;
}

.work-header {
    display: flex;
    gap: 40px;
    padding: 40px 0;
    border-bottom: 1px solid var(--bg-color-3rd);
}

.cover {
    width: 25%;
    min-width: 160px;
    max-width: 260px;
    aspect-ratio: 3 / 4;
    object-fit: cover;
    border-radius: var(--radius-l);
    align-self: flex-start;
    background-color: var(--bg-color-3rd);
}

.info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.work-name {
    color: var(--font-color-1st);
    font-size: 2.4rem;
    line-height: 1.2;
}

.meta {
    color: var(--font-color-3rd);
    font-size: 0.85rem;
}

.tag-group {
    margin-top: 10px;
}

.tag-group-title {
    color: var(--font-color-2nd);
    font-size: 1.1rem;
    margin-bottom: 6px;
}

.tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.tag {
    padding: 4px 10px;
    background-color: var(--bg-color-tag);
    color: var(--font-color-1st);
    border-radius: var(--radius-s);
    font-size: 0.85rem;
}

.section-title {
    color: var(--font-color-1st);
    font-size: 1.6rem;
    margin: 24px 0 12px;
}

.content-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.content-item {
    padding: 6px 12px;
    background-color: var(--bg-color-tag-type);
    color: var(--font-color-1st);
    text-decoration: none;
    border-radius: var(--radius-s);
    font-size: 0.9rem;
    transition: filter 0.2s;
}

.content-item:hover {
    filter: brightness(1.15);
}

@media (max-width: 768px) {
    .work-header {
        flex-direction: column;
        align-items: center;
        gap: 20px;
        padding: 20px 0;
    }

    .info {
        width: 100%;
    }

    .work-name {
        font-size: 1.8rem;
    }
}
</style>