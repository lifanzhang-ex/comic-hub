<template>
    <div class="panel-body">
        <div class="toolbar">
            <el-button class="add-new-btn" @click="clickAddBtn">+ 新建图书</el-button>
            <el-select v-model="filterTagTypeCode" placeholder="全部类型" clearable>
                <el-option v-for="tagType in tagTypeOptions" :key="tagType.tagTypeCode" :label="tagType.tagTypeName"
                    :value="tagType.tagTypeCode" />
            </el-select>
            <el-input type="text" placeholder="搜索书名或标签..." v-model="keyword" />
            <el-button @click="getWorkList">🔍 筛选</el-button>
        </div>
        <div class="panel-table">
            <table>
                <thead>
                    <tr>
                        <th>书码</th>
                        <th>书名</th>
                        <th>封面</th>
                        <th>标签</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="work in works" :key="work.workCode">
                        <td>{{ work.workCode }}</td>
                        <td>{{ work.workName }}</td>
                        <td>
                            <img :src="work.coverUrl" alt="封面" class="cover-thumb" />
                        </td>
                        <td>
                            <el-tag v-for="tag in work.tags" :key="tag.tagCode" size="small" style="margin: 2px">
                                {{ tag.tagName }}
                            </el-tag>
                        </td>
                        <td>
                            <el-button class="edit-btn" @click="clickEditBtn(work)">编辑</el-button>
                            <el-button class="edit-btn" @click="clickDeleteBtn(work)">删除</el-button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑图书' : '新建图书'">
        <el-form :model="form" label-width="80px">
            <el-form-item label="书码" v-if="isEdit">
                <el-input v-model="form.workCode" disabled />
            </el-form-item>
            <el-form-item label="书名">
                <el-input v-model="form.workName" placeholder="请输入书名" />
            </el-form-item>
            <el-form-item label="封面">
                <div class="cover-upload">
                    <img v-if="form.coverUrl" :src="form.coverUrl" class="cover-preview" />
                    <el-upload class="avatar-uploader" action="#" :auto-upload="false" :show-file-list="false"
                        :on-change="handleCoverChange">
                        <el-button v-if="!form.coverUrl" type="primary">点击上传封面</el-button>
                        <el-button v-else type="warning" @click.stop="removeCover">移除封面</el-button>
                    </el-upload>
                </div>
            </el-form-item>
            <el-form-item label="标签">
                <el-select v-model="selectedTagCodes" multiple filterable placeholder="请选择标签">
                    <el-option v-for="tag in allTags" :key="tag.tagCode" :label="`${tag.tagName} (${tag.tagTypeName})`"
                        :value="tag.tagCode" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handleConfirm">保存</el-button>
        </template>
    </el-dialog>

    <el-dialog v-model="deleteDialogVisible">
        确认删除图书【{{ form.workName }}】吗？
        <template #footer>
            <el-button @click="deleteDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="deleteWork">确认</el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { adminApi } from '@/api'

const props = defineProps({
    modName: { type: String, required: true },
})

const works = ref([])
const allTags = ref([])
const tagTypes = ref([])
const filterTagTypeCode = ref('')
const keyword = ref('')
const isEdit = ref(false)
const dialogVisible = ref(false)
const deleteDialogVisible = ref(false)

const form = ref({
    workCode: '',
    workName: '',
    coverUrl: '',
    coverFile: null,
    tags: [],
})

const selectedTagCodes = ref([])

const tagTypeOptions = computed(() => {
    const all = { tagTypeCode: '', tagTypeName: '全部类型' }
    return [all, ...tagTypes.value]
})

async function getTagTypeList() {
    try {
        const data = await adminApi.getTagTypeList(props.modName)
        tagTypes.value = Array.isArray(data) ? data : []
    } catch (e) {
        console.error('获取标签类型失败:', e)
    }
}

async function getAllTags() {
    try {
        const data = await adminApi.getTagList(props.modName)
        allTags.value = Array.isArray(data) ? data : []
    } catch (e) {
        console.error('获取标签列表失败:', e)
    }
}

async function getWorkList() {
    try {
        const params = {}
        if (filterTagTypeCode.value) params.typeCode = filterTagTypeCode.value.trim()
        if (keyword.value && keyword.value.trim() !== '') params.keyword = keyword.value.trim()
        const data = await adminApi.getWorkList(props.modName, params)
        works.value = Array.isArray(data) ? data : []
    } catch (e) {
        console.error('获取作品列表失败:', e)
    }
}

function handleCoverChange(file) {
    const reader = new FileReader()
    reader.onload = (e) => {
        form.value.coverUrl = e.target.result
        form.value.coverFile = file.raw
    }
    reader.readAsDataURL(file.raw)
}

function removeCover() {
    form.value.coverUrl = ''
    form.value.coverFile = null
}

function resetForm() {
    form.value = {
        workCode: '',
        workName: '',
        coverUrl: '',
        coverFile: null,
        tags: [],
    }
    selectedTagCodes.value = []
}

async function clickAddBtn() {
    await getAllTags()
    resetForm()
    isEdit.value = false
    dialogVisible.value = true
}

async function clickEditBtn(work) {
    await getAllTags()
    const latest = works.value.find((w) => w.workCode === work.workCode)
    if (latest) {
        form.value = {
            workCode: latest.workCode,
            workName: latest.workName,
            coverUrl: latest.coverUrl,
            coverFile: null,
            tags: latest.tags || [],
        }
        selectedTagCodes.value = (latest.tags || []).map((t) => t.tagCode)
        isEdit.value = true
        dialogVisible.value = true
    }
}

function clickDeleteBtn(work) {
    const latest = works.value.find((w) => w.workCode === work.workCode)
    if (latest) {
        form.value = { ...latest }
        deleteDialogVisible.value = true
    }
}

async function handleConfirm() {
    if (!form.value.workName || form.value.workName.trim() === '') {
        ElMessage.warning('请输入书名')
        return
    }
    if (!form.value.coverUrl) {
        ElMessage.warning('请上传封面')
        return
    }

    const payload = {
        workName: form.value.workName.trim(),
        coverUrl: form.value.coverUrl,
        tags: selectedTagCodes.value.map((code) => ({ tagCode: code })),
    }

    try {
        if (isEdit.value) {
            await adminApi.updateWork(props.modName, form.value.workCode, payload)
        } else {
            await adminApi.createWork(props.modName, payload)
        }
        dialogVisible.value = false
        await getWorkList()
        await getTagTypeList()
    } catch (e) {
        console.error('保存失败:', e)
        ElMessage.error('保存失败，请检查数据')
    }
}

async function deleteWork() {
    try {
        await adminApi.deleteWork(props.modName, form.value.workCode)
        deleteDialogVisible.value = false
        await getWorkList()
    } catch (e) {
        console.error('删除失败:', e)
        ElMessage.error('删除失败，请重试')
    }
}

onMounted(async () => {
    await getTagTypeList()
    await getAllTags()
    await getWorkList()
})
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

.toolbar {
    display: flex;
    flex-direction: row;
    gap: 10px;
    flex-wrap: wrap;
}

.panel-table {
    width: 100%;
    overflow-y: auto;
    flex: 1;
}

.add-new-btn {
    color: var(--font-color-1st);
    padding: 5px 10px;
    background-color: var(--bg-color-btn);
    border: none;
}

table {
    width: 100%;
    border-collapse: collapse;
}

thead {
    background-color: var(--bg-color-btn);
}

th {
    color: var(--font-color-1st);
    padding: 10px;
    text-align: center;
}

tr {
    border-bottom: 1px solid var(--bg-color-3rd);
}

td {
    color: var(--font-color-1st);
    padding: 8px 5px;
    text-align: center;
    vertical-align: middle;
}

.cover-thumb {
    width: 50px;
    height: 70px;
    object-fit: cover;
    border-radius: 4px;
}

.cover-upload {
    display: flex;
    align-items: center;
    gap: 15px;
}

.cover-preview {
    width: 80px;
    height: 112px;
    object-fit: cover;
    border-radius: 4px;
    border: 1px solid #ddd;
}

.avatar-uploader {
    display: inline-block;
}

.edit-btn {
    margin: 0 2px;
}
</style>