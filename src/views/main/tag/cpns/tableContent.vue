<template>
  <div class="content">
    <el-button type="primary" @click="handleNewClick" class="newBtn">添加标签</el-button>
    <template v-for="(item, index) in tagsByType">
      <div class="item">
        <div class="header">
          <h2 class="title">
            {{ index == 0 ? '情绪标签' : index == 1 ? '类型标签' : '语言标签' }}
          </h2>
        </div>
        <div class="table">
          <el-table :data="item" border stripe>
            <el-table-column prop="id" label="ID" width="80" />
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="createTime" label="创建时间" />
            <el-table-column prop="updateTime" label="修改时间" />

            <el-table-column prop="ranking" label="排名" width="200"> </el-table-column>

            <el-table-column align="center" label="操作" width="280">
              <template #default="scope">
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
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import useTagsStore from '@/store/tag/tag'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'

const tagsStore = useTagsStore()
const { tagsByType } = storeToRefs(tagsStore)
tagsStore.fetchAllTagsAction()

// const fetchListData = () => {
//   authorStore.fetchAllAuthorAction()
// }

const emit = defineEmits(['newClick', 'editClick'])

// const searchAuthor = (formData: any) => {
//   tagsStore.searchAuthorAction(formData.id)
// }

// // 删除
const handleDeleteBtnClick = (id: number) => {
  tagsStore.deleteTagsAction(id)
}

// //新建
const handleNewClick = () => {
  emit('newClick')
}

//修改
const handleEditBtnClick = (itemData: any) => {
  emit('editClick', itemData)
}

// defineExpose({
//   fetchListData,
//   searchAuthor
//   // newData
// })
</script>
<style lang="less" scoped>
.content {
  // background-color: #fff;
  // padding: 20px;
  margin-top: 0px;
  background-color: #f0f2f5;
  text-align: right;
  .newBtn {
    margin-bottom: 15px;
  }
}

.item {
  .header {
    display: flex;
    justify-content: space-between;
    // font-size: 22px;
    align-items: flex-end;
    margin-bottom: 20px;
  }
  background-color: #fff;
  width: 100%;
  margin-bottom: 20px;
  padding: 20px;
  box-sizing: border-box;
}
</style>
