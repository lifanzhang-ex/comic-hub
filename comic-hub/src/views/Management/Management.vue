<template>
    <el-tabs class="tab-mods" tab-position="left" v-model="activeTab">
        <el-tab-pane class="tab-mods-pane" v-for="mod in mods" :label="mod.label" :name="mod.name">
            <ManagementModule :mod-name="mod.name"></ManagementModule>
        </el-tab-pane>
    </el-tabs>
</template>
<script setup>
import { ref, computed, defineAsyncComponent } from 'vue'



const ManagementModule = defineAsyncComponent(() => import("@/components/Management/ManagementModule.vue"))


const mods = ref([
    {
        label: '漫画',
        name: 'Comic'
    }])
const activeTab = ref('Comic')

</script>
<style></style>

<style scoped>
.tab-mods {
    height: 100%;
}

.tab-mods :deep(.el-tabs__item) {
    margin: 5px;
    padding: 25px;
    color: var(--font-color-1st);
    font-size: 1.2rem;
    border-radius: var(--radius-l);
    transition: 0.2s ease-in-out;
    justify-self: center;
}

.tab-mods :deep(.el-tabs__item):hover {
    background-color: var(--bg-color-3rd);
}

.tab-mods :deep(.el-tabs__item).is-active {
    color: var(--font-color-cur);
}

.tab-mods-pane {
    height: 100%;
}
</style>