<template>
    <el-tabs class="tab-archives inner-tab" tab-position="top" v-model="activeTab">
        <el-tab-pane class="tab-archives-pane" label="作品" name="work">
            <WorkManagement :mod-name="props.modName"></WorkManagement>
        </el-tab-pane>
        <el-tab-pane class="tab-archives-pane" label="内容" name="content">
            <ContentManagement :mod-name="props.modName"></ContentManagement>
        </el-tab-pane>
        <el-tab-pane class="tab-archives-pane" label="标签类型" name="tag">
            <TagTypeManagement :mod-name="props.modName"></TagTypeManagement>
        </el-tab-pane>
        <el-tab-pane class="tab-archives-pane" label="标签" name="series">
            <TagManagement :mod-name="props.modName"></TagManagement>
        </el-tab-pane>
    </el-tabs>
</template>
<script setup>
import { ref, defineAsyncComponent } from 'vue'
const WorkManagement = defineAsyncComponent(() => import("@/components/Management/WorkManagement.vue"))
const ContentManagement = defineAsyncComponent(() => import("@/components/Management/ContentManagement.vue"))
const TagTypeManagement = defineAsyncComponent(() => import("@/components/Management/TagTypeManagement.vue"))
const TagManagement = defineAsyncComponent(() => import("@/components/Management/TagManagement.vue"))

const activeTab = ref('work')

const props = defineProps({
    modName:{
        type:String,
        require:true
    }
})
</script>
<style>
@import url('../../assets/css/common.css');
</style>

<style scoped>
.tab-archives {
    height: 100%;
}

.tab-archives.inner-tab :deep(.el-tabs__item) {
    margin: 5px !important;
    padding: 25px !important;
    color: var(--font-color-1st);
    font-size: 1.2rem;
    border-radius: var(--radius-l);
    transition: 0.2s ease-in-out;
    justify-self: center;
}

.tab-archives.inner-tab :deep(.el-tabs__item):hover {
    background-color: var(--bg-color-3rd);
}

.tab-archives.inner-tab :deep(.el-tabs__item).is-active {
    color: var(--font-color-cur);
}

.tab-archives-pane {
    height: 100%;
}

</style>