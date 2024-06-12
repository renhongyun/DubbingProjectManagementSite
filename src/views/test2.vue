<!-- <template>
  <div class="h">hh</div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      audioList: [], // 用于存储音频列表数据
      // 请求参数
      requestParams: {
        categoryId: undefined,
        categoryTagId: undefined,
        dubbingActorId: undefined,
        emotionTagId: undefined,
        languageTagId: undefined,
        name: undefined,
        sex: undefined
      }
    }
  },
  methods: {
    fetchAudioList() {
      axios
        .post('http://demo.kbws.xyz/api/audio/list', this.requestParams)
        .then((response) => {
          // 处理正常响应
          if (response.data.code === 50000) {
            this.errorMessage = response.data.message
            console.error(this.errorMessage)
          } else {
            this.audioList = response.data.data
            console.log(this.audioList)
          }
        })
        .catch((error) => {
          // 处理请求错误
          this.errorMessage = '请求失败，请稍后重试'
          console.error('Error fetching audio list:', error)
        })
    }
  },
  created() {
    // 在组件创建后调用fetchAudioList方法
    this.fetchAudioList()
  }
}
</script>

<style>
/* 你的样式内容 */
</style> -->

<template>
  <div>
    <el-form :model="formData" label-width="80px" @submit.native.prevent="handleSubmit">
      <el-form-item label="名字" prop="name">
        <el-input v-model="formData.name" placeholder="请输入名字"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="formData.sex" placeholder="请选择性别">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const formData = ref({
  name: '',
  sex: ''
})

const handleSubmit = async () => {
  try {
    const response = await axios.post('http://demo.kbws.xyz/api/dubbingActor/add', {
      name: formData.value.name,
      sex: formData.value.sex
    })
    console.log('响应数据:', response.data)
    // 可以根据响应数据进行后续处理
  } catch (error) {
    console.error('请求失败:', error)
  }
}
</script>

<style scoped>
/* 添加一些简单的样式 */
</style>
