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
                <el-input v-model="form.tagTypeCode" autocomplete="off" disabled="true" />
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
                <el-button type="primary" @click="deleteTagType(form)">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup>
import { onMounted, ref, computed } from 'vue'
import instance from '@/utils/request.js';
const props = defineProps({
    modName: {
        type: String,
        require: true
    }
})

const isEdit = ref(false)
const dialogEditVisible = ref(false)
const dialogDeleteVisible = ref(false)
const tagTypes = ref([])
const form = ref({
    tagTypeCode: null,
    tagTypeName: '',
    tagTypeUpperCode: null,
    tagTypeUpperName: ''
})

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

const clickAddBtn = async () => {
    form.value = {
        tagTypeCode: '',
        tagTypeName: '',
        tagTypeUpperCode: null,
        tagTypeUpperName: ''
    }
    isEdit.value = false
    dialogEditVisible.value = true
}

const clickEditBtn = async (tagType) => {
    try {
        await getTagTypeList()
        const latest = tagTypes.value.find(tt => tt.tagTypeCode === tagType.tagTypeCode)
        form.value = { ...latest }
        isEdit.value = true
        dialogEditVisible.value = true
    }
    catch (error) {
        console.error('发生错误', error)
    }
}

const updateTagType = async (tagType) => {
    try {
        const res = await instance.put(`api/${props.modName}Management/tagtypes/${tagType.tagTypeCode}`, tagType)
        console.log(res)
        if (res.status === 200 && res.data) {
            dialogEditVisible.value = false
        }
        else {
            alert(res)
        }
        await getTagTypeList()
    }
    catch (error) {
        console.error('发生错误', error)
    }
}

const createTagType = async (tagType) => {
    try {
        const res = await instance.post(`api/${props.modName}Management/tagtypes`, tagType)
        console.log(res)
        if (res.status === 201 && res.data) {
            dialogEditVisible.value = false
        }
        else {
            alert(res)
        }
        await getTagTypeList()
    }
    catch (error) {
        console.error('发生错误', error)
    }
}

const deleteTagType = async (tagType) => {
    try {
        const res = await instance.delete(`api/${props.modName}Management/tagtypes/${tagType.tagTypeCode}`)
        console.log(res)
        dialogDeleteVisible.value = false
        await getTagTypeList()
    }
    catch (error) {
        console.error('发生错误', error)
    }

}

const clickDeleteBtn = async (tagType) => {
    try {
        await getTagTypeList()
        const latest = tagTypes.value.find(tt => tt.tagTypeCode === tagType.tagTypeCode)
        form.value = { ...latest }
        dialogDeleteVisible.value = true
    }
    catch (error) {
        console.error('发生错误', error)
    }
}

const tagTypeOptions = computed(() => {
    // 头部插入一个“无”选项，tagTypeCode 为空字符串（或 null，根据需求）
    const emptyOption = {
        tagTypeCode: null,        // 前端用空字符串，提交时转为 null
        tagTypeName: '无',
        tagTypeUpperCode: '',
        tagTypeUpperName: ''
    }
    return [emptyOption, ...tagTypes.value]
})

onMounted(() => getTagTypeList())
</script>
<style>
@import url("../../assets/css/common.css");
</style>
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
    /* border-radius: var(--radius-s); */
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