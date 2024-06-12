<template>
  <div class="search">
    <el-form label-width="50px" :model="searchForm" ref="formRef">
      <el-row :gutter="10" class="flex">
        <el-col :span="6">
          <el-form-item label="配音老师id" prop="id" label-width="100">
            <el-input v-model="searchForm.id"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <div class="btns">
            <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
            <el-button icon="Search" type="primary" @click="handleQueryClick">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
import { storeToRefs } from 'pinia'

const emit = defineEmits(['queryClick', 'resetClick'])

const formRef = ref<InstanceType<typeof ElForm>>()
const searchForm = reactive({
  id: ''
})

function handleResetClick() {
  // 1.form中的数据全部重置
  formRef.value?.resetFields()
  // 2.将事件出去, content内部重新发送网络请求
  emit('resetClick')
}

const handleQueryClick = () => {
  if (searchForm.id) {
    emit('queryClick', searchForm)
  }
}
</script>

<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 20px;
  //   text-align: center;
  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }

  .btns {
    line-height: 72px;
    margin-left: 50px;
    .el-button {
      height: 36px;
    }
  }
}
.flex {
  display: flex;
  justify-content: space-between;
}
</style>
