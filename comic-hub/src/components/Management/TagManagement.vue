<template>
    <div class="pane-archive">
        <div class="pane-toolbar">
            <el-button class="add-new-btn" @click="clickAddBtn">+ 新建标签</el-button>
            <el-select v-model="tagTypeCode" id="tagTypeFilter" placeholder="全部类型">
                <el-option v-for="tagType in tagTypeOptions" :key="tagType.tagTypeCode" :label="tagType.tagTypeName"
                    :value="tagType.tagTypeCode" />
            </el-select>
            <el-input type="text" placeholder="输入关键词" v-model="keyword" />
            <el-button id="tagFilterBtn" @click="getTagList">🔍 筛选</el-button>
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
                <el-select v-model="form.tagTypeCode" id="tagTypeFilter" placeholder="全部类型">
                    <el-option v-for="tagType in tagTypes" :key="tagType.tagTypeCode" :label="tagType.tagTypeName"
                        :value="tagType.tagTypeCode" />
                </el-select>
            </el-form-item>
            <el-form-item label="标签编码">
                <el-input v-model="form.tagCode" disabled="true" />
            </el-form-item>
            <el-form-item label="标签名称">
                <el-input v-model="form.tagName" />
            </el-form-item>
            <el-form-item label="上级标签">
                <div class="form-block">
                    <el-input v-model="form.tagUpperName" disabled="true" />
                    <el-button :disabled="haveUpperType" @click="clickUpperBtn(form)">选择上级标签</el-button>
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
            <el-input v-model="upperKeyword"/>
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
import instance from '@/utils/request.js'
const props = defineProps({
    modName: {
        type: String,
        require: true
    }
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
    tagTypeUpperName: ''
})

const haveUpperType = computed(() => {
    if (!form.value.tagTypeCode) {
        return true   // 禁用
    }
    const tagType = tagTypes.value.find(t => t.tagTypeCode === form.value.tagTypeCode)
    return !(tagType && tagType.tagTypeUpperCode)
})

watch(() => form.value.tagTypeCode, (newVal) => {
    const tagType = tagTypes.value.find(t => t.tagTypeCode === newVal)
    if (tagType && tagType.tagTypeUpperCode) {
        form.value.tagTypeUpperCode = tagType.tagTypeUpperCode
        form.value.tagTypeUpperName = tagType.tagTypeUpperName
    }
})

const tagTypeOptions = computed(() => {
    const allTagType = {
        tagTypeCode: '',
        tagTypeName: '全部类型',
        tagTypeUpperCode: null,
        tagTypeUpperName: ''
    }
    return [allTagType, ...tagTypes.value]
})

const getTagList = async () => {
    try {
        // 构建查询参数对象
        const params = new URLSearchParams()

        // 如果有类型编码，添加参数
        if (tagTypeCode.value && tagTypeCode.value.trim() !== '') {
            params.append('tagTypeCode', tagTypeCode.value.trim())
        }

        // 有关键字，添加参数
        if (keyword.value && keyword.value.trim() !== '') {
            params.append('keyword', keyword.value.trim())
        }

        // 拼接 URL
        const url = `api/${props.modName}Management/tags${params.toString() ? '?' + params.toString() : ''}`
        console.log('请求URL:', url)

        // 发送请求
        const res = await instance.get(url)
        console.log('响应:', res)

        if (res.status === 200 && res.data) {
            tags.value = res.data
        }
    } catch (error) {
        console.error('获取标签列表失败:', error)
    }
}


const getTagTypeList = async () => {
    try {
        const res = await instance.get(`api/${props.modName}Management/tagtypes`)
        console.log(res)
        if (res.status === 200 && res.data) {
            tagTypes.value = res.data
        }
    }
    catch (error) {
        console.error('发生错误', error)
    }
}

const getUpperTagList = async (tag) => {
    try {
        const params = new URLSearchParams()

        if (tag.tagTypeUpperCode && tag.tagTypeUpperCode.trim() !== '') {
            params.append('tagTypeCode', tag.tagTypeUpperCode.trim())
        }
        // 如果有类型编码，添加参数

        // 有关键字，添加参数
        if (upperKeyword.value && upperKeyword.value.trim() !== '') {
            params.append('keyword', upperKeyword.value.trim())
        }

        // 拼接 URL
        const url = `api/${props.modName}Management/tags${params.toString() ? '?' + params.toString() : ''}`
        console.log('请求URL:', url)

        // 发送请求
        const res = await instance.get(url)
        console.log('响应:', res)

        if (res.status === 200 && res.data) {
            upperTags.value = res.data
        }
    }
    catch (error) {
        console.error("发生错误", error)
    }
}

const clickUpperBtn = async (tag) => {
    try {
        console.log(tag)
        await getUpperTagList(tag)
        upperDialogVisible.value = true
    }
    catch (error) {
        console.error("发生错误", error)
    }
}

const clickPickBtn = async (tag) => {
    try {
        form.value.tagUpperCode = tag.tagCode
        form.value.tagUpperName = tag.tagName
        upperDialogVisible.value = false
    }
    catch (error) {
        console.error("发生错误", error)
    }
}

const clickEditBtn = async (tag) => {
    try {
        await getTagList()
        await getTagTypeList()
        const latest = tags.value.find(t => t.tagCode === tag.tagCode)
        form.value = { ...latest }
        isEdit.value = true
        editDialogVisible.value = true
    }
    catch (error) {
        console.error("发生错误", error)
    }
}

const editTag = async (tag) => {
    try {
        const res = await instance.put(`api/${props.modName}Management/tags/${tag.tagCode}`, tag)
        if (res.status === 200) {
            editDialogVisible.value = false
            await getTagList()
            await getTagTypeList()
        }
    }
    catch (error) {
        console.error("发生错误", error)
    }
}

const clickAddBtn = async () => {
    try {
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
            tagTypeUpperName: ''
        }
        isEdit.value = false
        editDialogVisible.value = true
    }
    catch (error) {
        console.error("发生错误", error)
    }
}

const addTag = async (tag) => {
    try {
        const res = await instance.post(`api/${props.modName}Management/tags`, tag)
        if (res.status === 201) {
            editDialogVisible.value = false
            await getTagList()
            await getTagTypeList()
        }
    }
    catch (error) {
        console.error("发生错误", error)
    }
}

const clickDeleteBtn = async (tag) => {
    try {
        await getTagList()
        await getTagTypeList()
        const latest = tags.value.find(t => t.tagCode === tag.tagCode)
        form.value = { ...latest }
        deleteDialogVisible.value = true
    }
    catch (error) {
        console.error("发生错误", error)
    }
}

const deleteTag = async (tag) => {
    try {
        const res = await instance.delete(`api/${props.modName}Management/tags/${tag.tagCode}`)
        if (res.status === 200) {
            deleteDialogVisible.value = false
            await getTagList()
            await getTagTypeList()
        }
    }
    catch (error) {
        console.error("发生错误", error)
    }
}

onMounted(() => getTagTypeList())
onMounted(() => getTagList())


</script>
<style>
@import url("../../assets/css/common.css");
</style>
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
    /* border-radius: var(--radius-s); */
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

.el-dialog.upper-dialog{
    background-color: var(--bg-color-3rd) !important;
}
</style>