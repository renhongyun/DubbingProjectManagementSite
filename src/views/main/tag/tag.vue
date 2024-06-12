<template>
  <div class="tag">
    <tableContent
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    ></tableContent>
    <modal ref="modalRef"></modal>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import tableContent from './cpns/tableContent.vue'
import modal from './cpns/modal.vue'
const contentRef = ref<InstanceType<typeof tableContent>>()
const modalRef = ref<InstanceType<typeof modal>>()

const handleNewClick = () => {
  modalRef.value?.setModalVisible(true)
}

const handleEditClick = (itemData: any) => {
  modalRef.value?.setModalVisible(false, itemData)
}
</script>
<style lang="less" scoped>
.author {
}
</style>
