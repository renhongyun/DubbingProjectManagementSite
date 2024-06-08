<template>
  <div class="content">
    <div class="header">
      <h2 class="title">分类列表</h2>
      <el-button type="primary">添加分类</el-button>
    </div>
    <div class="table">表格</div>
    <div class="pagination">分页</div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="less" scoped>
.content {
  background-color: #fff;
  padding: 20px;
  margin-top: 10px;
}
.header {
  display: flex;
  justify-content: space-between;
  // font-size: 22px;
  align-items: flex-end;
}
</style>
