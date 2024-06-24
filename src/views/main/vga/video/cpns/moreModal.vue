<!-- <template>
  <div>
    <el-dialog v-model="centerDialogVisible" title="添加" width="500" center class="modal">
      <div class="form">
        <el-form :model="formData" label-width="80px" ref="formRef">
          <el-row :gutter="15">
            <el-col :span="6">
              <el-form-item label="性别" prop="sex">
                <el-select placeholder="请选择性别" v-model="formData.sex">
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="name" label="名称">
                <el-input placeholder="请输入姓名" v-model="formData.name"> </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="语言标签" prop="languageId">
                <el-select placeholder="请选择语言标签" v-model="formData.languageId">
                  <template v-for="item in tagsByType[2]" :key="item.id">
                    <el-option :value="item.id" :label="item.name" />
                  </template>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="封面上传" prop="cover">
                <el-upload
                  :http-request="customUploadRequest('image')"
                  :on-success="handleUploadSuccess('cover')"
                  :file-list="coverFileList"
                  :limit="1"
                  action=""
                >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将封面文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="视频上传" prop="url">
                <el-upload
                  :http-request="customUploadRequest('video')"
                  :on-success="handleUploadSuccess('url')"
                  :file-list="videoFileList"
                  :limit="1"
                  action=""
                >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将视频文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { ElForm } from 'element-plus'
import useFileUploadStore from '@/store/file/file'
import useVideoStore from '@/store/main/vga/video'
import useTagStore from '@/store/tag/tag'

const fileUploadStore = useFileUploadStore()
const { uploadStatus, uploadedFileUrl } = storeToRefs(fileUploadStore)

const videoStore = useVideoStore()
const tagStore = useTagStore()
const { tagsByType } = storeToRefs(tagStore)

const centerDialogVisible = ref(false)
const formData = reactive({
  name: '',
  sex: '',
  cover: '',
  languageId: '',
  url: ''
})

const formRef = ref<InstanceType<typeof ElForm>>()
const coverFileList = ref([])
const videoFileList = ref([])

const setModalVisible = () => {
  centerDialogVisible.value = true
}

const handleUploadSuccess = (type) => (response, file) => {
  if (type === 'cover') {
    formData.cover = response.url
  } else if (type === 'url') {
    formData.url = response.url
  }
}

const customUploadRequest = (biz) => async (option) => {
  await fileUploadStore.uploadFileAction(option.file, biz)
  if (fileUploadStore.uploadStatus === 'success') {
    option.onSuccess({ url: fileUploadStore.uploadedFileUrl })
  } else {
    option.onError(new Error('上传失败'))
  }
}

const cancelClick = () => {
  centerDialogVisible.value = false
  formRef.value?.resetFields()
  coverFileList.value = []
  videoFileList.value = []
}

const confirmClick = async () => {
  if (!formData.cover || !formData.url) {
    alert('请先上传封面和视频')
    return
  }

  try {
    await videoStore.addVideoAction({
      name: formData.name,
      sex: formData.sex,
      cover: formData.cover,
      languageId: formData.languageId,
      url: formData.url
    })
    cancelClick()
  } catch (error) {
    console.error('视频上传失败:', error)
  }
}

defineExpose({
  setModalVisible
})
</script>

<style lang="less" scoped>
.modal {
  // width: 50vw !important;
}
.form {
  padding: 0 20px;
  padding-right: 60px;
}

:deep(.el-dialog) {
  --el-dialog-width: 70vw !important;
  --el-dialog-height: 100vh !important;
}
</style> -->

<template>
  <div>
    <el-dialog v-model="centerDialogVisible" title="添加" width="500" center class="modal">
      <div class="form">
        <el-form :model="formData" label-width="80px" ref="formRef">
          <el-row :gutter="15">
            <el-col :span="6">
              <el-form-item label="性别" prop="sex">
                <el-select placeholder="请选择性别" v-model="formData.sex">
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="name" label="名称">
                <el-input placeholder="请输入姓名" v-model="formData.name"> </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="语言标签" prop="languageId">
                <el-select placeholder="请选择作品语言标签" v-model="formData.languageId">
                  <template v-for="item in tagsByType[2]" :key="item.id">
                    <el-option :value="item.id" :label="item.name" />
                  </template>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="封面上传" prop="cover">
                <el-upload
                  :http-request="uploadCover"
                  :on-success="handleCoverUploadSuccess"
                  :file-list="coverFileList"
                  drag
                  action=""
                >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将封面文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="视频上传" prop="url">
                <el-upload
                  :http-request="uploadVideo"
                  :on-success="handleVideoUploadSuccess"
                  :file-list="videoFileList"
                  drag
                  action=""
                >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将视频文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { ElForm } from 'element-plus'
import useFileUploadStore from '@/store/file/file'
import useVideoStore from '@/store/main/vga/video'
import useTagStore from '@/store/tag/tag'

const fileUploadStore = useFileUploadStore()
const { uploadStatus, uploadedFileUrl } = storeToRefs(fileUploadStore)

const videoStore = useVideoStore()
const tagStore = useTagStore()
const { tagsByType } = storeToRefs(tagStore)

const centerDialogVisible = ref(false)
const formData = reactive({
  name: '',
  sex: '',
  cover: '',
  languageId: '',
  url: ''
})

const formRef = ref<InstanceType<typeof ElForm>>()
const coverFileList = ref([])
const videoFileList = ref([])

const setModalVisible = () => {
  centerDialogVisible.value = true
}

const handleCoverUploadSuccess = (response, file) => {
  formData.cover = response.url
  coverFileList.value = [{ name: file.name, url: response.url }]
}

const handleVideoUploadSuccess = (response, file) => {
  formData.url = response.url
  videoFileList.value = [{ name: file.name, url: response.url }]
}

const uploadCover = async (options) => {
  const { file } = options
  await fileUploadStore.uploadFileAction(file, 'video')
  if (fileUploadStore.uploadStatus === 'success') {
    handleCoverUploadSuccess({ url: fileUploadStore.uploadedFileUrl }, file)
  } else {
    console.error('封面上传失败:', file.name)
  }
}

const uploadVideo = async (options) => {
  const { file } = options
  await fileUploadStore.uploadFileAction(file, 'video')
  if (fileUploadStore.uploadStatus === 'success') {
    handleVideoUploadSuccess({ url: fileUploadStore.uploadedFileUrl }, file)
  } else {
    console.error('视频上传失败:', file.name)
  }
}

const cancelClick = () => {
  centerDialogVisible.value = false
  formRef.value?.resetFields()
  coverFileList.value = []
  videoFileList.value = []
}

const confirmClick = async () => {
  if (!formData.cover || !formData.url) {
    alert('请上传封面和视频文件')
    return
  }
  formData.sex = Number(formData.sex)
  try {
    await videoStore.addVideoAction(formData)
    centerDialogVisible.value = false
    formRef.value?.resetFields()
    coverFileList.value = []
    videoFileList.value = []
  } catch (error) {
    console.error('添加失败:', error)
    alert('添加失败，请重试。')
  }
}

defineExpose({
  setModalVisible
})
</script>
<style lang="less" scoped>
.modal {
  // width: 50vw !important;
}
.form {
  padding: 0 20px;
  padding-right: 60px;
}

:deep(.el-dialog) {
  --el-dialog-width: 70vw !important;
  --el-dialog-height: 100vh !important;
}
.box {
  height: 38vh;
  background-color: #f0f8ff;
  border: 2px dashed #409eff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
