<template>
  <div class="category">
    <search></search>
    <div class="content1">
      <template v-for="item in categoryList" :key="item.id">
        <div class="content">
          <div class="header">
            <h2 class="title">{{ item.name }}</h2>
            <el-button type="primary">添加标签</el-button>
          </div>
          <div class="table">
            <el-table :data="item.tags" border stripe>
              <el-table-column prop="id" label="ID" width="80" />
              <el-table-column prop="name" label="标签" />
              <el-table-column prop="createTime" label="创建时间" />
              <el-table-column prop="updateTime" label="更新时间" />
              <el-table-column prop="ranking" label="顺序" />
              <el-table-column align="center" v-bind="item" label="操作">
                <!-- <template #default="scope"> -->
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
                <!-- </template> -->
              </el-table-column>
            </el-table>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import useCategoryStore from '@/store/main/home/category'
import { storeToRefs } from 'pinia'

import search from './cpns/search.vue'
import content from './cpns/content.vue'

const categoryStore = useCategoryStore()
categoryStore.fetchAllCategoryAction({})

const { categoryList } = storeToRefs(categoryStore)
console.log(categoryList)
</script>
<style lang="less" scoped>
.category {
  border-radius: 8px;
  overflow: hidden;
}
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
.table {
  margin-top: 15px;
}
</style>
