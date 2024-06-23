<template>
  <div class="content">
    <div class="header">
      <h2 class="title">音频列表</h2>
      <el-button type="primary" @click="handleMoreClick">批量添加</el-button>
      <el-button type="primary" @click="handleNewClick" class="newBtn">添加音频</el-button>
    </div>
    <div class="table">
      <el-table :data="audioList" border stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="createTime" label="创建时间">
          <template #default="scope">
            {{ scope.row.createTime }}
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" />
        <el-table-column prop="sex" label="性别">
          <template #default="scope"> {{ scope.row.sex ? '男' : '女' }} </template>
        </el-table-column>

        <el-table-column prop="url" label="地址">
          <template #default="scope">
            <a :href="scope.row.url" target="_blank" class="url">{{ scope.row.url }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="isRecommend" label="是否推荐">
          <template #default="scope"> {{ scope.row.isRecommend ? '是 ' : '否' }} </template>
        </el-table-column>
        <el-table-column prop="dubbingActorId" label="配音老师">
          <template #default="scope">
            <span>{{ getAuthorName(scope.row.dubbingActorId) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="emotionTagId" label="情绪标签">
          <template #default="scope">
            {{ getTagName(scope.row.emotionTagId, tagsByType[0]) }}
          </template>
        </el-table-column>
        <el-table-column prop="languageTagId" label="语言标签">
          <template #default="scope">
            {{ getTagName(scope.row.languageTagId, tagsByType[2]) }}
          </template>
        </el-table-column>
        <el-table-column prop="categoryTagId" label="类型标签">
          <template #default="scope">
            {{ getTagName(scope.row.categoryTagId, tagsByType[1]) }}
          </template>
        </el-table-column>
        <el-table-column prop="categoryId" label="一级分类">
          <template #default="scope">
            {{
              scope.row.categoryId === 1
                ? '中文配音'
                : scope.row.categoryId === 2
                  ? '外语配音'
                  : '未知'
            }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="180">
          <template #default="scope">
            <el-button
              size="small"
              icon="Edit"
              type="primary"
              text
              @click="handleEditBtnClick(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              icon="Delete"
              type="danger"
              text
              @click="handleDeleteBtnClick(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script setup lang="ts">
import useAudioStore from '@/store/main/vga/audio'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'
import IUploadAudio from '@/types/audio.ts'
import useTagStore from '@/store/tag/tag'

import useAuthorStore from '@/store/author/author'

const emit = defineEmits(['newClick', 'editClick', 'moreClick'])

const audioStore = useAudioStore()
const { audioList } = storeToRefs(audioStore)

const fetchListData = (formData: any = {}) => {
  audioStore.fetchAllAudioAction(formData)
}
fetchListData()

// 删除
const handleDeleteBtnClick = (id: number) => {
  audioStore.deleteAudioAction(id)
}

//新建
const handleNewClick = () => {
  console.log('新建')
  emit('newClick')
}
//新建
const handleMoreClick = () => {
  console.log('新建')
  emit('moreClick')
}
//修改
const handleEditBtnClick = (itemData: any) => {
  emit('editClick', itemData)
}

//添加数据
const newData = (formData: IUploadAudio) => {
  audioStore.addAudioAction(formData)
}

//捆绑tagid和内容
const tagStore = useTagStore()
const { tagsByType } = storeToRefs(tagStore)

const getTagName = (id: number, tags) => {
  const tag = tags.find((tag) => tag.id === id)
  return tag ? tag.name : '未知'
}

//捆绑authorid和内容
const authorStore = useAuthorStore()
const { authorList } = storeToRefs(authorStore)
authorStore.fetchAllAuthorAction()
const getAuthorName = (id: number) => {
  const author = authorList.value.find((author) => author.id === id)
  return author ? author.name : ''
}
defineExpose({
  fetchListData,
  newData
})
</script>
<style lang="less" scoped>
.content {
  background-color: #fff;
  padding: 20px;
  margin-top: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  // font-size: 22px;
  align-items: flex-end;
  margin-bottom: 20px;
}
.url {
  color: #409eff;
}
</style>
@/store/main/author/author@/store/main/tag/tag
