<template>
  <div class="audio">
    <table-content
      ref="contentRef"
      @edit-click="handleEditClick"
      @more-click="handleMoreClick"
    ></table-content>

    <more-modal ref="moreModalRef"></more-modal>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'

import tableContent from './cpns/tableContent.vue'
import modal from './cpns/modal.vue'

import moreModal from './cpns/moreModal.vue'

const contentRef = ref<InstanceType<typeof tableContent>>()
const moreModalRef = ref<InstanceType<typeof moreModal>>()

const handleQueryClick = (formData: any) => {
  contentRef.value?.fetchListData(formData)
}

const handleResetClick = () => {
  contentRef.value?.fetchListData()
}
//对modal的封装
const modalRef = ref<InstanceType<typeof modal>>()
// const handleNewClick = () => {
//   modalRef.value?.setModalVisible(true)
// }

//添加数据
const handleAddClick = (formData: IUploadAudio) => {
  contentRef.value?.newData(formData)
}
const handleEditClick = (itemData: any) => {
  modalRef.value?.setModalVisible(itemData)
}

const handleMoreClick = () => {
  moreModalRef.value?.setModalVisible()
}
</script>
<style lang="less" scoped>
.audio {
  border-radius: 8px;
  overflow: hidden;
}
</style>
