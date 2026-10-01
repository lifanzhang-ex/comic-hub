<template>
    <div class="pane-archive">
        <div class="pane-toolbar">
            <el-button class="add-new-btn" @click="clickAddBtn">+ 新建标签</el-button>
            <el-select v-model="tagTypeCode" placeholder="全部类型">
                <el-option v-for="tagType in tagTypeOptions" :key="tagType.tagTypeCode" :label="tagType.tagTypeName"
                    :value="tagType.tagTypeCode" />
            </el-select>
            <el-input type="text" placeholder="输入关键词" v-model="keyword" />
            <el-button @click="getTagList">🔍 筛选</el-button>
        </div>
        <div class="panel-table">
            <table>
                <thead>
                    <tr>
                        <th>标签编码</th>
                        <th>标签名称</th>
                        <th>类型编码</th>
                        <th>类型名称</th>
                        <th>上级标签编码</th>
                        <th>上级标签名称</th>
                        <th>上级类型编码</th>
                        <th>上级类型名称</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="tagTbody">
                    <tr v-for="tag in tags" :key="tag.tagCode">
                        <td>{{ tag.tagCode }}</td>
                        <td>{{ tag.tagName }}</td>
                        <td>{{ tag.tagTypeCode }}</td>
                        <td>{{ tag.tagTypeName }}</td>
                        <td>{{ tag.tagUpperCode }}</td>
                        <td>{{ tag.tagUpperName }}</td>
                        <td>{{ tag.tagTypeUpperCode }}</td>
                        <td>{{ tag.tagTypeUpperName }}</td>
                        <td>
                            <el-button class="edit-btn" @click="clickEditBtn(tag)">编辑</el-button>
                            <el-button class="edit-btn" @click="clickDeleteBtn(tag)">删除</el-button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <el-dialog v-model="editDialogVisible">
        <el-form :model="form">
            <el-form-item label="标签类型">
                <el-select v-model="form.tagTypeCode" placeholder="全部类型">
                    <el-option v-for="tagType in tagTypes" :key="tagType.tagTypeCode" :label="tagType.tagTypeName"
                        :value="tagType.tagTypeCode" />
                </el-select>
            </el-form-item>
            <el-form-item label="标签编码">
                <el-input v-model="form.tagCode" disabled />
            </el-form-item>
            <el-form-item label="标签名称">
                <el-input v-model="form.tagName" />
            </el-form-item>
            <el-form-item label="上级标签">
                <div class="form-block">
                    <el-input v-model="form.tagUpperName" disabled />
                    <el-button :disabled="haveUpperType" @click="clickUpperBtn(form)">
                        选择上级标签
                    </el-button>
                </div>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="editDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="isEdit ? editTag(form) : addTag(form)">保存</el-button>
        </template>
    </el-dialog>

    <el-dialog class="upper-dialog" v-model="upperDialogVisible">
        <div class="form-block">
            <el-input v-model="upperKeyword" />
            <el-button :disabled="haveUpperType" @click="getUpperTagList(form)">筛选</el-button>
        </div>
        <table>
            <thead>
                <tr>
                    <th>标签编码</th>
                    <th>标签名称</th>
                    <th>类型编码</th>
                    <th>类型名称</th>
                    <th>上级标签编码</th>
                    <th>上级标签名称</th>
                    <th>上级类型编码</th>
                    <th>上级类型名称</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody id="tagTbody">
                <tr v-for="tag in upperTags" :key="tag.tagCode">
                    <td>{{ tag.tagCode }}</td>
                    <td>{{ tag.tagName }}</td>
                    <td>{{ tag.tagTypeCode }}</td>
                    <td>{{ tag.tagTypeName }}</td>
                    <td>{{ tag.tagUpperCode }}</td>
                    <td>{{ tag.tagUpperName }}</td>
                    <td>{{ tag.tagTypeUpperCode }}</td>
                    <td>{{ tag.tagTypeUpperName }}</td>
                    <td>
                        <el-button class="edit-btn" @click="clickPickBtn(tag)">选择</el-button>
                    </td>
                </tr>
            </tbody>
        </table>
    </el-dialog>

    <el-dialog v-model="deleteDialogVisible">
        确认删除标签【{{ form.tagName }}】吗？
        <template #footer>
            <el-button @click="deleteDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="deleteTag(form)">确认</el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { adminApi } from '@/api'

const props = defineProps({
    modName: { type: String, required: true },
})

const isEdit = ref(false)
const editDialogVisible = ref(false)
const deleteDialogVisible = ref(false)
const upperDialogVisible = ref(false)
const tagTypes = ref([])
const tags = ref([])
const upperTags = ref([])
const tagTypeCode = ref('')
const keyword = ref('')
const upperKeyword = ref('')

const form = ref({
    tagCode: '',
    tagName: '',
    tagTypeCode: '',
    tagTypeName: '',
    tagUpperCode: null,
    tagUpperName: '',
    tagTypeUpperCode: null,
    tagTypeUpperName: '',
})

const tagTypeOptions = computed(() => {
    const allTagType = {
        tagTypeCode: '',
        tagTypeName: '全部类型',
        tagTypeUpperCode: null,
        tagTypeUpperName: '',
    }
    return [allTagType, ...tagTypes.value]
})

const haveUpperType = computed(() => {
    if (!form.value.tagTypeCode) return true
    const tagType = tagTypes.value.find((t) => t.tagTypeCode === form.value.tagTypeCode)
    return !(tagType && tagType.tagTypeUpperCode)
})

watch(
    () => form.value.tagTypeCode,
    (newVal) => {
        const tagType = tagTypes.value.find((t) => t.tagTypeCode === newVal)
        if (tagType && tagType.tagTypeUpperCode) {
            form.value.tagTypeUpperCode = tagType.tagTypeUpperCode
            form.value.tagTypeUpperName = tagType.tagTypeUpperName
        }
    },
)

async function getTagList() {
    try {
        const params = {}
        if (tagTypeCode.value && tagTypeCode.value.trim() !== '') {
            params.tagTypeCode = tagTypeCode.value.trim()
        }
        if (keyword.value && keyword.value.trim() !== '') {
            params.keyword = keyword.value.trim()
        }
        const data = await adminApi.getTagList(props.modName, params)
        tags.value = Array.isArray(data) ? data : []
    } catch (e) {
        console.error('获取标签列表失败:', e)
    }
}

async function getTagTypeList() {
    try {
        const data = await adminApi.getTagTypeList(props.modName)
        tagTypes.value = Array.isArray(data) ? data : []
    } catch (e) {
        console.error('获取标签类型失败:', e)
    }
}

async function getUpperTagList(tag) {
    try {
        const params = {}
        if (tag.tagTypeUpperCode && tag.tagTypeUpperCode.trim() !== '') {
            params.tagTypeCode = tag.tagTypeUpperCode.trim()
        }
        if (upperKeyword.value && upperKeyword.value.trim() !== '') {
            params.keyword = upperKeyword.value.trim()
        }
        const data = await adminApi.getTagList(props.modName, params)
        upperTags.value = Array.isArray(data) ? data : []
    } catch (e) {
        console.error('获取上级标签失败:', e)
    }
}

async function clickUpperBtn(tag) {
    await getUpperTagList(tag)
    upperDialogVisible.value = true
}

function clickPickBtn(tag) {
    form.value.tagUpperCode = tag.tagCode
    form.value.tagUpperName = tag.tagName
    upperDialogVisible.value = false
}

async function clickEditBtn(tag) {
    await getTagList()
    await getTagTypeList()
    const latest = tags.value.find((t) => t.tagCode === tag.tagCode)
    if (latest) form.value = { ...latest }
    isEdit.value = true
    editDialogVisible.value = true
}

async function clickAddBtn() {
    await getTagList()
    await getTagTypeList()
    form.value = {
        tagCode: '',
        tagName: '',
        tagTypeCode: '',
        tagTypeName: '',
        tagUpperCode: null,
        tagUpperName: '',
        tagTypeUpperCode: null,
        tagTypeUpperName: '',
    }
    isEdit.value = false
    editDialogVisible.value = true
}

async function editTag(tag) {
    try {
        await adminApi.updateTag(props.modName, tag.tagCode, tag)
        editDialogVisible.value = false
        await getTagList()
        await getTagTypeList()
    } catch (e) {
        console.error('更新失败:', e)
        ElMessage.error('更新失败')
    }
}

async function addTag(tag) {
    try {
        await adminApi.createTag(props.modName, tag)
        editDialogVisible.value = false
        await getTagList()
        await getTagTypeList()
    } catch (e) {
        console.error('新增失败:', e)
        ElMessage.error('新增失败')
    }
}

async function clickDeleteBtn(tag) {
    await getTagList()
    await getTagTypeList()
    const latest = tags.value.find((t) => t.tagCode === tag.tagCode)
    if (latest) form.value = { ...latest }
    deleteDialogVisible.value = true
}

async function deleteTag(tag) {
    try {
        await adminApi.deleteTag(props.modName, tag.tagCode)
        deleteDialogVisible.value = false
        await getTagList()
        await getTagTypeList()
    } catch (e) {
        console.error('删除失败:', e)
        ElMessage.error('删除失败')
    }
}

onMounted(() => {
    getTagTypeList()
    getTagList()
})
</script>

<style scoped>
.pane-archive {
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.pane-toolbar {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.panel-table {
    width: 100%;
    overflow-y: scroll;
}

.add-new-btn {
    color: var(--font-color-1st);
    padding: 5px 10px;
    background-color: var(--bg-color-btn);
    border: none;
}

table {
    width: 100%;
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
    color: var(--font-color-3rd);
    padding: 5px;
    text-align: center;
}

.form-block {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.el-dialog.upper-dialog {
    background-color: var(--bg-color-3rd) !important;
}
</style>