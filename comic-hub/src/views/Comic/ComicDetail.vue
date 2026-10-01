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