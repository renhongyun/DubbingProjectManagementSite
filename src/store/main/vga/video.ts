import { getVideoList, addVideo, deleteVideo, updateVideo } from '@/service/main/vga/video'
import { defineStore } from 'pinia'
import type { IUploadVideo, IModifiedVideo } from '@/types'

interface IVideoState {
  videoList: any[]
}

const useVideoStore = defineStore('videoStore', {
  state: (): IVideoState => ({
    videoList: []
  }),
  actions: {
    async fetchVideoListAction() {
      const response = await getVideoList()
      this.videoList = response.data
      console.log('视频列表', this.videoList)
    },
    async addVideoAction(newVideo: IUploadVideo) {
      const response = await addVideo(newVideo)
      console.log(response)
      this.fetchVideoListAction()
    },
    async updateVideoAction(modifiedVideo: IModifiedVideo) {
      const response = await updateVideo(modifiedVideo)
      console.log(response)

      this.fetchVideoListAction()
    },
    async deleteVideoAction(id: number) {
      const response = await deleteVideo(id)
      console.log(response)

      this.fetchVideoListAction()
    }
  }
})

export default useVideoStore
