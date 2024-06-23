<template>
  <div class="author">
    <search @query-click="handleQueryClick" @reset-click="handleResetClick"></search>
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
import search from './cpns/search.vue'
import tableContent from './cpns/tableContent.vue'
import modal from './cpns/modal.vue'
const contentRef = ref<InstanceType<typeof tableContent>>()
const modalRef = ref<InstanceType<typeof modal>>()

const handleQueryClick = (formData: any) => {
  contentRef.value?.searchAuthor(formData)
}
const handleResetClick = () => {
  contentRef.value?.fetchListData()
}

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
