import { defineStore } from 'pinia'
import { uploadFile } from '@/service/file/file'

interface IFileUploadState {
  uploadStatus: string
  uploadedFileUrl: string | null
}

const useFileUploadStore = defineStore('fileUploadStore', {
  state: (): IFileUploadState => ({
    uploadStatus: 'idle', // 'idle', 'uploading', 'success', 'error'
    uploadedFileUrl: null
  }),
  actions: {
    async uploadFileAction(file: any, biz: any) {
      this.uploadStatus = 'uploading'
      try {
        const response = await uploadFile(file, biz)
        this.uploadStatus = 'success'
        this.uploadedFileUrl = response.data.url // 假设响应中包含文件 URL
      } catch (error) {
        this.uploadStatus = 'error'
        console.error('文件上传失败:', error)
      }
    }
  }
})

export default useFileUploadStore
