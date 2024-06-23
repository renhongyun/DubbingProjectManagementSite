// export interface IVideo {
//   categoryId?: number
//   categoryTagId?: number
//   dubbingActorId?: number
//   emotionTagId?: number
//   languageTagId?: number
//   name?: string
//   sex?: number
// }

export interface IUploadVideo {
  cover?: string
  languageId?: number
  name?: string
  sex?: number
  url?: string
}
export interface IModifiedVideo {
  cover?: string
  languageId?: number
  name?: string
  sex?: number
  url?: string
  id?: number
}
