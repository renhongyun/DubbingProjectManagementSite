<template>
  <div class="search">
    <el-form label-width="50px" :model="searchForm" ref="formRef">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="作者" prop="author">
            <el-input placeholder="请输入作者姓名" v-model="searchForm.author"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="一级分类" label-width="80px" prop="category">
            <el-input placeholder="请输入一级标签" v-model="searchForm.category"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="标签" prop="tag">
            <el-input placeholder="请添加标签" v-model="searchForm.tag"></el-input>
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

    <!-- 重置和搜索 -->
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
const searchForm = reactive({})

const formRef = ref<InstanceType<typeof ElForm>>()
function handleResetClick() {
  // 1.form中的数据全部重置
  formRef.value?.resetFields()
  // 2.将事件出去, content内部重新发送网络请求
  //   emit('resetClick')
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
</style>
