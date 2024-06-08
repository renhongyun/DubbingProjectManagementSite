import { getAudioList, addAudio, deleteAudio, updateAudio } from '@/service/main/vga/audio'
import { defineStore } from 'pinia'
import type { IAudio, IUploadAudio, IModifiedAudio } from '@/types'

interface IAudioState {
  audioList: any[]
}

const useAudioStore = defineStore('audioStore', {
  state: (): IAudioState => ({
    audioList: []
  }),
  actions: {
    async fetchAllAudioAction(audioList: IAudio) {
      const response = await getAudioList(audioList)
      this.audioList = response.data
    },
    async addAudioAction(newAudio: IUploadAudio) {
      const response = await addAudio(newAudio)
      if (response.code === 200) {
        this.fetchAllAudioAction(newAudio)
      }
    },
    async updateAudioAction(modifiedAudio: IModifiedAudio) {
      const response = await updateAudio(modifiedAudio)
      if (response.code === 200) {
        this.fetchAllAudioAction(modifiedAudio)
      }
    },
    async deleteAudioAction(id: number) {
      const response = await deleteAudio(id)
      if (response.code === 200) {
        this.fetchAllAudioAction(response.data)
      }
    }
  }
})

export default useAudioStore
