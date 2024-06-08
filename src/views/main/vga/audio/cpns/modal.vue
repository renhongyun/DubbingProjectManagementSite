<template>
  <!-- {
  "categoryTagId": 0,
  "emotionTagId": 0,
} -->

  <div class="modal">
    <el-dialog v-model="centerDialogVisible" title="新建音频" width="500" center>
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
            <el-input placeholder="请输入作品分类标签" v-model="formData.categoryTagId"> </el-input>
          </el-form-item>
          <el-form-item label="情绪标签" prop="emotionTagId">
            <el-input placeholder="请输入作品情绪标签" v-model="formData.emotionTagId"> </el-input>
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
import IUploadAudio from '@/types/audio.ts'

const centerDialogVisible = ref(false)
const formData: IUploadAudio = reactive({})
const formRef = ref<InstanceType<typeof ElForm>>()

const emit = defineEmits(['addClick'])
//相当于是方法拦截，只能改为true，不能改成其他值
const setModalVisible = () => {
  centerDialogVisible.value = true
}
const cancelClick = () => {
  centerDialogVisible.value = false
  formRef.value?.resetFields()
}
const confirmClick = () => {
  centerDialogVisible.value = false

  formData.files = [
    {
      name: formData.name,
      url: formData.url
    }
  ]

  delete formData.name
  delete formData.url

  console.log(formData)
  emit('addClick', formData)

  formRef.value?.resetFields()
}

defineExpose({
  setModalVisible
})
//
</script>
<style lang="less" scoped>
.form {
  padding: 0 20px;
  padding-right: 60px;
}
</style>
