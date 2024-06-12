export interface IAudio {
  categoryId?: number
  categoryTagId?: number
  dubbingActorId?: number
  emotionTagId?: number
  languageTagId?: number
  name?: string
  sex?: number
}

export interface IUploadAudio {
  categoryId: number
  categoryTagId: number
  emotionTagId: number
  files: [
    {
      name: string
      url: string
    }
  ]
  isRecommend: number
  sex: number
}
export interface IModifiedAudio {
  categoryId: number
  categoryTagId: number
  dubbingActorId: number
  emotionTagId: number
  id: number
  isRecommend: number
  name: string
  sex: number
  url: string
}
