<template>
  <div class="audio">
    <search @query-click="handleQueryClick" @reset-click="handleResetClick"></search>
    <table-content ref="contentRef" @new-click="handleNewClick"></table-content>
    <modal ref="modalRef" @add-click="handleAddClick"></modal>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// import useAudioStore from '@/store/main/vga/audio'
import search from './cpns/search.vue'
import tableContent from './cpns/tableContent.vue'
import modal from './cpns/modal.vue'
import IUploadAudio from '@/types/audio.ts'

const contentRef = ref<InstanceType<typeof tableContent>>()

const handleQueryClick = (formData: any) => {
  console.log('父组件', formData)
  contentRef.value?.fetchListData(formData)
}

const handleResetClick = () => {
  console.log('父组件重置')

  contentRef.value?.fetchListData()
}
//对modal的封装
const modalRef = ref<InstanceType<typeof modal>>()
const handleNewClick = () => {
  console.log('触发modal')
  modalRef.value?.setModalVisible()
}

//添加数据
const handleAddClick = (formData: IUploadAudio) => {
  console.log('父组件拿到的新数据', formData)
  contentRef.value?.newData(formData)
}
</script>
<style lang="less" scoped>
.audio {
  border-radius: 8px;
  overflow: hidden;
}
</style>
