<template>
    <div class="panel-body">
        <!-- 左侧：选择图书 + 封面预览 -->
        <aside id="panel-body-left">
            <div class="work-selector">
                <el-select v-model="selectedWorkCode" placeholder="请选择图书" filterable @change="onWorkChange">
                    <el-option v-for="work in works" :key="work.workCode" 
                        :label="work.workName" :value="work.workCode" />
                </el-select>
            </div>
            <div class="cover-preview-container">
                <img v-if="selectedWorkCover" :src="selectedWorkCover" alt="封面" class="cover-preview" />
                <div v-else class="cover-placeholder">请选择图书</div>
            </div>
            <div class="work-info" v-if="selectedWork">
                <p><strong>书码：</strong>{{ selectedWork.workCode }}</p>
                <p><strong>书名：</strong>{{ selectedWork.workName }}</p>
                <p><strong>标签：</strong></p>
                <div>
                    <el-tag v-for="tag in selectedWork.tags" :key="tag.tagCode" size="small" style="margin:2px;">
                        {{ tag.tagName }}
                    </el-tag>
                </div>
            </div>
        </aside>

        <!-- 右侧：章节列表 -->
        <aside id="panel-body-right">
            <div class="toolbar">
                <el-button class="add-new-btn" @click="clickAddBtn" :disabled="!selectedWorkCode">
                    + 新增章节
                </el-button>
                <el-button @click="loadChapters" :disabled="!selectedWorkCode">加载章节</el-button>
            </div>
            <div class="panel-table">
                <table v-if="chapters.length > 0">
                    <thead>
                        <tr>
                            <th>章节编码</th>
                            <th>章节名</th>
                            <th>更新时间</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="chapter in chapters" :key="chapter.contentCode">
                            <td>{{ chapter.contentCode }}</td>
                            <td>{{ chapter.contentName }}</td>
                            <td>{{ formatDate(chapter.updateTime) }}</td>
                            <td>
                                <el-button class="edit-btn" @click="clickEditBtn(chapter)">编辑</el-button>
                                <el-button class="edit-btn" @click="clickDeleteBtn(chapter)">删除</el-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-else class="empty-tip">暂无章节，请选择图书后加载</div>
            </div>
        </aside>
    </div>

    <!-- 新增/编辑章节弹窗 -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑章节' : '新增章节'">
        <el-form :model="form" label-width="80px">
            <el-form-item label="章节编码" v-if="isEdit">
                <el-input v-model="form.contentCode" disabled />
            </el-form-item>
            <el-form-item label="章节名">
                <el-input v-model="form.contentName" placeholder="请输入章节名" />
            </el-form-item>
            <el-form-item label="图片" v-if="!isEdit">
                <el-upload
                    action="#"
                    :auto-upload="false"
                    multiple
                    :on-change="handleImagesChange"
                    :file-list="imageFileList"
                    list-type="picture-card"
                >
                    <el-icon><Plus /></el-icon>
                </el-upload>
                <div class="upload-tip">支持多图上传，按顺序排列</div>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handleConfirm">保存</el-button>
        </template>
    </el-dialog>

    <!-- 删除确认弹窗 -->
    <el-dialog v-model="deleteDialogVisible">
        确认删除章节【{{ form.contentName }}】吗？
        <template #footer>
            <el-button @click="deleteDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="deleteChapter">确认</el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import instance from '@/utils/request.js'

const props = defineProps({
    modName: {
        type: String,
        require: true
    }
})

// ============ 响应式数据 ============
const works = ref([])
const chapters = ref([])
const selectedWorkCode = ref('')
const selectedWork = ref(null)
const selectedWorkCover = ref('')

const isEdit = ref(false)
const dialogVisible = ref(false)
const deleteDialogVisible = ref(false)

const form = ref({
    contentCode: '',
    contentName: '',
    workCode: ''
})

const imageFileList = ref([])

// ============ API 方法 ============
const getWorkList = async () => {
    try {
        const res = await instance.get(`api/${props.modName}Management/works/list`)
        if (res.status === 200 && res.data) {
            works.value = res.data
        }
    } catch (error) {
        console.error('获取作品列表失败:', error)
    }
}

const loadChapters = async () => {
    if (!selectedWorkCode.value) {
        alert('请先选择图书')
        return
    }
    try {
        const res = await instance.get(`api/${props.modName}Management/works/${selectedWorkCode.value}/contents`)
        if (res.status === 200 && res.data) {
            chapters.value = res.data
        }
    } catch (error) {
        console.error('加载章节失败:', error)
    }
}

// ============ 图书选择 ============
const onWorkChange = (workCode) => {
    const found = works.value.find(w => w.workCode === workCode)
    if (found) {
        selectedWork.value = found
        selectedWorkCover.value = found.coverUrl || ''
        loadChapters()
    } else {
        selectedWork.value = null
        selectedWorkCover.value = ''
        chapters.value = []
    }
}

// ============ 章节操作 ============
const resetForm = () => {
    form.value = {
        contentCode: '',
        contentName: '',
        workCode: selectedWorkCode.value || ''
    }
    imageFileList.value = []
}

const clickAddBtn = () => {
    resetForm()
    isEdit.value = false
    dialogVisible.value = true
}

const clickEditBtn = (chapter) => {
    form.value = {
        contentCode: chapter.contentCode,
        contentName: chapter.contentName,
        workCode: chapter.workCode || selectedWorkCode.value
    }
    isEdit.value = true
    dialogVisible.value = true
}

const clickDeleteBtn = (chapter) => {
    form.value = {
        contentCode: chapter.contentCode,
        contentName: chapter.contentName,
        workCode: chapter.workCode || selectedWorkCode.value
    }
    deleteDialogVisible.value = true
}

// ============ 图片上传处理 ============
const handleImagesChange = (file, fileList) => {
    imageFileList.value = fileList
}

// ============ 提交 ============
const handleConfirm = async () => {
    if (!form.value.contentName || form.value.contentName.trim() === '') {
        alert('请输入章节名')
        return
    }

    if (!isEdit.value && imageFileList.value.length === 0) {
        alert('请至少上传一张图片')
        return
    }

    try {
        let res
        if (isEdit.value) {
            // 编辑：只更新章节名
            const payload = { contentName: form.value.contentName.trim() }
            res = await instance.put(
                `api/${props.modName}Management/works/${selectedWorkCode.value}/contents/${form.value.contentCode}`,
                payload
            )
        } else {
            // 新增：使用 FormData
            const formData = new FormData()
            formData.append('contentName', form.value.contentName.trim())
            imageFileList.value.forEach(file => {
                formData.append('images', file.raw)
            })
            res = await instance.post(
                `api/${props.modName}Management/works/${selectedWorkCode.value}/contents/create`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            )
        }
        if (res.status === 200 || res.status === 201) {
            dialogVisible.value = false
            await loadChapters()
        }
    } catch (error) {
        console.error('保存失败:', error)
        alert('保存失败，请检查数据')
    }
}

const deleteChapter = async () => {
    try {
        const res = await instance.delete(
            `api/${props.modName}Management/works/${selectedWorkCode.value}/contents/${form.value.contentCode}`
        )
        if (res.status === 200) {
            deleteDialogVisible.value = false
            await loadChapters()
        }
    } catch (error) {
        console.error('删除失败:', error)
        alert('删除失败，请重试')
    }
}

// ============ 工具方法 ============
const formatDate = (dateStr) => {
    if (!dateStr) return '-'
    const d = new Date(dateStr)
    return d.toLocaleString('zh-CN')
}

// ============ 生命周期 ============
onMounted(async () => {
    await getWorkList()
})
</script>

<style scoped>
.panel-body {
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: row;
    gap: 30px;
}

#panel-body-left {
    width: 280px;
    min-width: 280px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 15px;
    background-color: var(--bg-color-2nd);
    border-radius: 8px;
    height: fit-content;
}

#panel-body-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 15px;
    min-width: 0;
}

.work-selector {
    width: 100%;
}

.cover-preview-container {
    width: 100%;
    aspect-ratio: 5 / 7;
    background-color: var(--bg-color-3rd);
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cover-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.cover-placeholder {
    color: var(--font-color-3rd);
    font-size: 14px;
}

.work-info {
    font-size: 14px;
    color: var(--font-color-1st);
}

.work-info p {
    margin: 4px 0;
}

.toolbar {
    display: flex;
    flex-direction: row;
    gap: 10px;
    flex-wrap: wrap;
}

.panel-table {
    flex: 1;
    overflow-y: auto;
    min-height: 200px;
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

.edit-btn {
    margin: 0 2px;
}

.empty-tip {
    color: var(--font-color-3rd);
    text-align: center;
    padding: 40px 0;
}

.upload-tip {
    font-size: 12px;
    color: var(--font-color-3rd);
    margin-top: 5px;
}
</style>