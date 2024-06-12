<template>
  <div class="modal">
    <el-dialog
      v-model="centerDialogVisible"
      :title="isNewRef ? '添加配音老师' : '修改配音老师'"
      width="500"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" ref="formRef">
          <el-form-item label="性别" prop="sex">
            <el-select placeholder="请选择性别" v-model="formData.sex">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
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

import useAuthorStore from '@/store/author/author'
const authorStore = useAuthorStore()

const centerDialogVisible = ref(false)
const formData: any = reactive({
  name: '',
  sex: '',
  id: ''
})
const isNewRef = ref(true)
const formRef = ref<InstanceType<typeof ElForm>>()

const emit = defineEmits(['addClick', 'editClick'])

const setModalVisible = (isNew, itemData) => {
  isNewRef.value = isNew
  centerDialogVisible.value = true

  if (!isNew && itemData) {
    for (const key in formData) {
      if (key === 'sex') {
        formData[key] = itemData[key] === 0 ? '女' : '男'
      } else {
        formData[key] = itemData[key]
      }
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
    authorStore.addAuthorAction(formData)
  } else {
    authorStore.updateAuthorAction(formData)
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
