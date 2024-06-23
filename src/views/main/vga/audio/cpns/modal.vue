<template>
  <div class="modal">
    <el-dialog
      v-model="centerDialogVisible"
      :title="isNewRef ? '新建音频' : '编辑音频'"
      width="500"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" ref="formRef">
          <el-form-item label="一级分类" prop="categoryId">
            <el-select placeholder="请选择一级分类" v-model="formData.categoryId">
              <el-option label="中文配音" value="1"></el-option>
              <el-option label="外文配音" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名字" prop="name">
            <el-input placeholder="请输入作品名" v-model="formData.name"> </el-input>
          </el-form-item>
          <el-form-item label="URL" prop="url">
            <el-input placeholder="请输入作品url" v-model="formData.url"> </el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select placeholder="请选择性别" v-model="formData.sex">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否推荐" prop="isRecommend">
            <el-select placeholder="请选择" v-model="formData.isRecommend">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类标签" prop="categoryTagId">
            <el-select placeholder="请选择作品类型标签" v-model="formData.categoryTagId">
              <template v-for="item in tagsByType[1]" :key="item.id">
                <el-option :value="item.id" :label="item.name" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="情绪标签" prop="emotionTagId">
            <el-select placeholder="请选择作品情绪标签" v-model="formData.emotionTagId">
              <template v-for="item in tagsByType[0]" :key="item.id">
                <el-option :value="item.id" :label="item.name" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="配音老师" prop="dubbingActorId">
            <el-select placeholder="请选择配音老师" v-model="formData.dubbingActorId">
              <template v-for="item in authorList" :key="item.id">
                <el-option :value="item.id" :label="item.name" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="语言标签" prop="languageTagId">
            <el-select
              placeholder="请选择作品语言标签"
              v-model="formData.languageTagId"
              :disabled="isLanguageTagDisabled"
            >
              <template v-for="item in tagsByType[2]" :key="item.id">
                <el-option :value="item.id" :label="item.name" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import IUploadAudio from '@/types/audio.ts'
import useTagStore from '@/store/tag/tag'
import { storeToRefs } from 'pinia'
import { ElForm } from 'element-plus'
import Category from '@/views/main/home/category/category.vue'
import useAudioStore from '@/store/main/vga/audio'
const audioStore = useAudioStore()
// const { audioList } = storeToRefs(audioStore)

import useAuthorStore from '@/store/author/author'

const authorStore = useAuthorStore()
const { authorList } = storeToRefs(authorStore)
authorStore.fetchAllAuthorAction()

const centerDialogVisible = ref(false)
const formData: IUploadAudio = reactive({
  categoryId: '',
  id: '',
  name: '',
  dubbingActorId: '',
  emotionTagId: '',
  categoryTagId: '',
  isRecommend: '',
  languageTagId: '',
  sex: '',
  url: '',
  ranking: ''
})
const isNewRef = ref(true)
const formRef = ref<InstanceType<typeof ElForm>>()

const isLanguageTagDisabled = ref(false)

watch(
  () => formData.categoryId,
  (newValue) => {
    if (newValue === '1') {
      isLanguageTagDisabled.value = true
      formData.languageTagId = ''
    } else {
      isLanguageTagDisabled.value = false
    }
  }
)

const emit = defineEmits(['addClick', 'editClick'])
// 相当于是方法拦截，只能改为true，不能改成其他值
const setModalVisible = (isNew: boolean, itemData?: any) => {
  isNewRef.value = isNew
  centerDialogVisible.value = true
  if (!isNew && itemData) {
    for (const key in formData) {
      formData[key] = itemData[key]
    }
  } else {
    for (const key in formData) {
      formData[key] = ''
    }
  }
}

const cancelClick = () => {
  centerDialogVisible.value = false
  formRef.value?.resetFields()
}
const confirmClick = () => {
  centerDialogVisible.value = false
  if (isNewRef.value) {
    formData.files = [
      {
        name: formData.name,
        url: formData.url
      }
    ]
    // 将字符串类型的值转换为数字类型
    formData.categoryId = Number(formData.categoryId)
    formData.sex = Number(formData.sex)
    formData.isRecommend = Number(formData.isRecommend)

    formData.dubbingActorId = Number(formData.dubbingActorId)
    // dubbingActorId dubbingActorId
    delete formData.name
    delete formData.url

    console.log('111', formData)
    emit('addClick', formData)
    // audioStore.addAudioAction(formData)
  } else {
    //发送编辑数据的网络请求
    audioStore.updateAudioAction(formData)
  }

  formRef.value?.resetFields()
}

// 获取数据
const tagStore = useTagStore()
const { tagsByType } = storeToRefs(tagStore)

defineExpose({
  setModalVisible
})
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
  padding-right: 60px;
}
</style>
