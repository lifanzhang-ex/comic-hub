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