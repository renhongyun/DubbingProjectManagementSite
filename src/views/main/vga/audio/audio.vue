<template>
  <div class="audio">
    <search></search>
    <div class="content1">
      <div class="content">
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

            <el-table-column prop="url" label="地址" />
            <el-table-column prop="isRecommend" label="是否推荐">
              <template #default="scope"> {{ scope.row.isRecommend ? '是 ' : '否' }} </template>
            </el-table-column>
            <el-table-column prop="dubbingActorId" label="配音老师" />
            <el-table-column prop="emotionTagId" label="情绪标签" />
            <el-table-column prop="categoryTagId" label="类型标签" />
            <el-table-column prop="categoryId" label="一级分类">
              <template #default="scope">
                {{ scope.row.categoryId ? '外语配音 ' : '中文配音' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
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
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="pagination">
        <div class="demo-pagination-block">
          <div class="demonstration">Change page size</div>
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[100, 200, 300, 400]"
            layout="sizes, prev, pager, next"
            :total="totalListCount"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useAudioStore from '@/store/main/vga/audio'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'
import search from './cpns/search.vue'

const audioStore = useAudioStore()
audioStore.fetchAllAudioAction({})

const { audioList } = storeToRefs(audioStore)
console.log('xx', audioList)
const totalListCount = ref(audioList.value.length)
const currentPage = ref(1)
const pageSize = ref(1)
console.log('ll', totalListCount)
</script>
<style lang="less" scoped>
.audio {
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
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
