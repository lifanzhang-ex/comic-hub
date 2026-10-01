import request from '@/utils/request'

/* ===================== 前台：漫画相关 ===================== */
export const comicApi = {
    /** 首页随机推荐（count 默认 15） */
    getRandomWorks(count = 15) {
        return request.get('/api/Comic/works/random', { params: { count } })
    },

    /** 漫画列表（分页 / 分类） */
    getWorksList(params = {}) {
        return request.get('/api/Comic/works/list', { params })
    },

    /** 作品详情 */
    getWorkDetail(workCode) {
        return request.get(`/api/Comic/works/detail/${workCode}`)
    },

    /** 章节内容（含上一话/下一话） */
    getContent(contentCode) {
        return request.get(`/api/Comic/contents/${contentCode}`)
    },
}

/* ===================== 后台：管理模块 ===================== */
export const adminApi = {
    /* ---------- 作品 ---------- */
    getWorkList(modName, params = {}) {
        return request.get(`/api/${modName}Management/works/list`, { params })
    },
    createWork(modName, data) {
        return request.post(`/api/${modName}Management/works`, data)
    },
    updateWork(modName, workCode, data) {
        return request.put(`/api/${modName}Management/works/${workCode}`, data)
    },
    deleteWork(modName, workCode) {
        return request.delete(`/api/${modName}Management/works/${workCode}`)
    },

    /* ---------- 章节 ---------- */
    getChapterList(modName, workCode) {
        return request.get(`/api/${modName}Management/works/${workCode}/contents`)
    },
    createChapter(modName, workCode, formData) {
        return request.post(
            `/api/${modName}Management/works/${workCode}/contents/create`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } },
        )
    },
    updateChapter(modName, workCode, contentCode, data) {
        return request.put(
            `/api/${modName}Management/works/${workCode}/contents/${contentCode}`,
            data,
        )
    },
    deleteChapter(modName, workCode, contentCode) {
        return request.delete(
            `/api/${modName}Management/works/${workCode}/contents/${contentCode}`,
        )
    },

    /* ---------- 标签类型 ---------- */
    getTagTypeList(modName) {
        return request.get(`/api/${modName}Management/tagtypes`)
    },
    createTagType(modName, data) {
        return request.post(`/api/${modName}Management/tagtypes`, data)
    },
    updateTagType(modName, tagTypeCode, data) {
        return request.put(`/api/${modName}Management/tagtypes/${tagTypeCode}`, data)
    },
    deleteTagType(modName, tagTypeCode) {
        return request.delete(`/api/${modName}Management/tagtypes/${tagTypeCode}`)
    },

    /* ---------- 标签 ---------- */
    getTagList(modName, params = {}) {
        return request.get(`/api/${modName}Management/tags`, { params })
    },
    createTag(modName, data) {
        return request.post(`/api/${modName}Management/tags`, data)
    },
    updateTag(modName, tagCode, data) {
        return request.put(`/api/${modName}Management/tags/${tagCode}`, data)
    },
    deleteTag(modName, tagCode) {
        return request.delete(`/api/${modName}Management/tags/${tagCode}`)
    },
}