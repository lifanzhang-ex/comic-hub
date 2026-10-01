<template>
    <div class="panel-body">
        <div class="toolbar">
            <el-button class="add-new-btn" @click="clickAddBtn">+ 新增类型</el-button>
        </div>
        <table>
            <thead>
                <tr>
                    <th>类型编码</th>
                    <th>类型名称</th>
                    <th>上级类型编码</th>
                    <th>上级类型名称</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody id="tagTypeTbody">
                <tr v-for="tagType in tagTypes" :key="tagType.tagTypeCode">
                    <td>{{ tagType.tagTypeCode }}</td>
                    <td>{{ tagType.tagTypeName }}</td>
                    <td>{{ tagType.tagTypeUpperCode }}</td>
                    <td>{{ tagType.tagTypeUpperName }}</td>
                    <td>
                        <el-button class="edit-btn" @click="clickEditBtn(tagType)">编辑</el-button>
                        <el-button class="edit-btn" @click="clickDeleteBtn(tagType)">删除</el-button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <el-dialog v-model="dialogEditVisible">
        <el-form :model="form">
            <el-form-item label="类型编码">
                <el-input v-model="form.tagTypeCode" autocomplete="off" disabled />
            </el-form-item>
            <el-form-item label="类型名称">
                <el-input v-model="form.tagTypeName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="上级类型">
                <el-select v-model="form.tagTypeUpperCode" placeholder="请选择类型">
                    <el-option v-for="tagType in tagTypeOptions" :key="tagType.tagTypeCode" :label="tagType.tagTypeName"
                        :value="tagType.tagTypeCode" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogEditVisible = false">Cancel</el-button>
                <el-button type="primary" @click="isEdit ? updateTagType(form) : createTagType(form)">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>

    <el-dialog v-model="dialogDeleteVisible">
        确认删除标签类别【{{ form.tagTypeName }}】吗？
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogDeleteVisible = false">Cancel</el-button>
                <el-button type="primary" @click="deleteTagType(form)">Confirm</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { adminApi } from '@/api'

const props = defineProps({
    modName: { type: String, required: true },
})

const isEdit = ref(false)
const dialogEditVisible = ref(false)
const dialogDeleteVisible = ref(false)
const tagTypes = ref([])
const form = ref({
    tagTypeCode: null,
    tagTypeName: '',
    tagTypeUpperCode: null,
    tagTypeUpperName: '',
})

const tagTypeOptions = computed(() => {
    const emptyOption = {
        tagTypeCode: null,
        tagTypeName: '无',
        tagTypeUpperCode: '',
        tagTypeUpperName: '',
    }
    return [emptyOption, ...tagTypes.value]
})

async function getTagTypeList() {
    try {
        const data = await adminApi.getTagTypeList(props.modName)
        tagTypes.value = Array.isArray(data) ? data : []
    } catch (e) {
        console.error('获取标签类型失败:', e)
    }
}

function clickAddBtn() {
    form.value = {
        tagTypeCode: '',
        tagTypeName: '',
        tagTypeUpperCode: null,
        tagTypeUpperName: '',
    }
    isEdit.value = false
    dialogEditVisible.value = true
}

async function clickEditBtn(tagType) {
    await getTagTypeList()
    const latest = tagTypes.value.find((tt) => tt.tagTypeCode === tagType.tagTypeCode)
    if (latest) form.value = { ...latest }
    isEdit.value = true
    dialogEditVisible.value = true
}

function clickDeleteBtn(tagType) {
    const latest = tagTypes.value.find((tt) => tt.tagTypeCode === tagType.tagTypeCode)
    if (latest) form.value = { ...latest }
    dialogDeleteVisible.value = true
}

async function updateTagType(tagType) {
    try {
        await adminApi.updateTagType(props.modName, tagType.tagTypeCode, tagType)
        dialogEditVisible.value = false
        await getTagTypeList()
    } catch (e) {
        console.error('更新失败:', e)
        ElMessage.error('更新失败')
    }
}

async function createTagType(tagType) {
    try {
        await adminApi.createTagType(props.modName, tagType)
        dialogEditVisible.value = false
        await getTagTypeList()
    } catch (e) {
        console.error('新增失败:', e)
        ElMessage.error('新增失败')
    }
}

async function deleteTagType(tagType) {
    try {
        await adminApi.deleteTagType(props.modName, tagType.tagTypeCode)
        dialogDeleteVisible.value = false
        await getTagTypeList()
    } catch (e) {
        console.error('删除失败:', e)
        ElMessage.error('删除失败')
    }
}

onMounted(getTagTypeList)
</script>

<style scoped>
.panel-body {
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.add-new-btn {
    color: var(--font-color-1st);
    padding: 5px 10px;
    background-color: var(--bg-color-btn);
    border: none;
}

table {
    padding: 20px;
    border-collapse: collapse;
}

thead {
    background-color: var(--bg-color-btn);
}

th {
    color: var(--font-color-1st);
}

tr {
    border-bottom: 1px solid var(--bg-color-3rd);
}

td {
    color: var(--font-color-1st);
    padding: 5px;
    text-align: center;
}
</style>