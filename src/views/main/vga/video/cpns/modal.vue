<template>
  <div>
    <el-dialog v-model="centerDialogVisible" title="修改" width="500" center class="modal">
      <div class="form">
        <el-form :model="formData" label-width="80px" ref="formRef">
          <el-form-item label="性别" prop="sex">
            <el-select placeholder="请选择性别" v-model="formData.sex">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="name" label="名称">
            <el-input placeholder="请输入姓名" v-model="formData.name"> </el-input>
          </el-form-item>

          <el-form-item label="语言标签" prop="languageId">
            <el-select placeholder="请选择作品语言标签" v-model="formData.languageId">
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
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { ElForm } from 'element-plus'

import useVideoStore from '@/store/main/vga/video'
import useTagStore from '@/store/tag/tag'

const videoStore = useVideoStore()
const tagStore = useTagStore()
const { tagsByType } = storeToRefs(tagStore)
const formRef = ref<InstanceType<typeof ElForm>>()

const centerDialogVisible = ref(false)
const formData: any = reactive({
  name: '',
  sex: '',
  cover: '',
  languageId: '',
  url: '',
  id: ''
})

const setModalVisible = (itemData: any) => {
  centerDialogVisible.value = true
  for (const key in formData) {
    if (itemData.hasOwnProperty(key)) {
      formData[key] = itemData[key]
    }
  }
  formData.sex = formData.sex === 1 ? '男' : '女'
}

const confirmClick = async () => {
  formData.sex = Number(formData.sex)

  try {
    await videoStore.updateVideoAction(formData)
    centerDialogVisible.value = false
    formRef.value?.resetFields()
  } catch (error) {
    console.error('添加失败:', error)
    alert('添加失败，请重试。')
  }
}

const cancelClick = () => {
  centerDialogVisible.value = false
  formRef.value?.resetFields()
}

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
