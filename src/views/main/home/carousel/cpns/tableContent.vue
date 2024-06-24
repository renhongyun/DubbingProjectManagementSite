<template>
  <div class="content">
    <div class="header">
      <h2 class="title">轮播图列表</h2>
      <el-button type="primary" @click="handleMoreClick">添加</el-button>
    </div>
    <div class="table">
      <el-table :data="formattedImageList" border stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="名称" width="180" />
        <el-table-column prop="url" label="图片" width="220">
          <template #default="scope">
            <img :src="scope.row.url" alt="carousel image" style="width: 100px; height: auto" />
          </template>
        </el-table-column>
        <el-table-column prop="videoUrl" label="视频地址">
          <template #default="scope">
            <a :href="scope.row.videoUrl" target="_blank">{{ scope.row.videoUrl }}</a>
          </template>
        </el-table-column>
        <el-table-column label="视频名称" width="180">
          <template #default="scope">
            <span>{{ getVideoName(scope.row.videoUrl) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="180px">
          <template #default="scope">
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

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import useCarouselStore from '@/store/main/home/carousel'
import useVideoStore from '@/store/main/vga/video'

const carouselStore = useCarouselStore()
const { imageList } = storeToRefs(carouselStore)

const videoStore = useVideoStore()
const { videoList } = storeToRefs(videoStore)

const emit = defineEmits(['editClick', 'moreClick'])

const fetchListData = async () => {
  await carouselStore.fetchCarouselImageListAction()
  await videoStore.fetchVideoListAction()
}

onMounted(fetchListData)

// 删除
const handleDeleteBtnClick = async (id: number) => {
  await carouselStore.deleteCarouselImageAction(id)
  await fetchListData()
}

const handleMoreClick = () => {
  emit('moreClick')
}

const handleEditBtnClick = (itemData: any) => {
  emit('editClick', itemData)
}

// 获取视频名称
const getVideoName = (videoUrl: string) => {
  const video = videoList.value.find((video) => video.url === videoUrl)
  return video ? video.name : '未知视频'
}

// 将 imageList 格式化，添加视频名称
const formattedImageList = computed(() => {
  return imageList.value.map((image) => ({
    ...image,
    videoName: getVideoName(image.videoUrl)
  }))
})

defineExpose({
  fetchListData
})
</script>

<style lang="less" scoped>
.content {
  background-color: #fff;
  padding: 20px;
  margin-top: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;
}
.url {
  color: #409eff;
}
.table {
  margin-top: 20px;
}
</style>
