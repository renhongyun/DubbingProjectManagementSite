<template>
  <div class="modal">
    <el-dialog
      v-model="centerDialogVisible"
      :title="isNewRef ? '添加标签' : '修改标签'"
      width="500"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" ref="formRef">
          <el-form-item v-if="!isNewRef" label="排名" prop="ranking">
            <el-input placeholder="请输入排名" v-model="formData.ranking"></el-input>
          </el-form-item>
          <el-form-item v-else label="类别" prop="type">
            <el-select placeholder="请选择类别" v-model="formData.type">
              <el-option label="情绪标签" value="0"></el-option>
              <el-option label="类型标签" value="1"></el-option>
              <el-option label="语言标签" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名字" prop="name">
            <el-input placeholder="请输入名字" v-model="formData.name" />
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
import { storeToRefs } from 'pinia'
import { ElForm } from 'element-plus'

import useTagsStore from '@/store/tag/tag'
const tagStore = useTagsStore()

const centerDialogVisible = ref(false)
const formData: any = reactive({
  ranking: '',
  name: '',
  type: '',
  id: ''
})
const isNewRef = ref(true)
const formRef = ref<InstanceType<typeof ElForm>>()

const emit = defineEmits(['addClick', 'editClick'])

const setModalVisible = (isNew: boolean, itemData: any) => {
  isNewRef.value = isNew
  centerDialogVisible.value = true
  if (!isNew && itemData) {
    for (const key in formData) {
      // if (key === 'sex') {
      //   formData[key] = itemData[key]
      // } else {
      formData[key] = itemData[key]
      // }
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
    formData.type = Number(formData.type)
    delete formData.id
    delete formData.ranking
    tagStore.addTagsAction(formData)
  } else {
    delete formData.type
    formData.ranking = Number(formData.ranking)
    tagStore.updateTagsAction(formData)
  }

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
@/store/main/tag/tag
