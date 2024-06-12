<!-- <template>
  <div class="upload-container">
    <h2>上传文件</h2>
    <form @submit.prevent="uploadFile">
      <label for="biz">业务类型：</label>
      <select id="biz" v-model="biz" required @change="updateAcceptType">
        <option value="audio">音频</option>
        <option value="video">视频</option>
      </select>
      <br /><br />
      <label for="file">选择文件：</label>
      <input type="file" id="file" @change="onFileChange" :accept="fileAcceptType" required />
      <br /><br />
      <button type="submit">上传</button>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  setup() {
    const biz = ref<string>('audio')
    const file = ref<File | null>(null)
    const fileAcceptType = ref<string>('audio/*') // 默认允许音频文件

    const onFileChange = (event: Event) => {
      const target = event.target as HTMLInputElement
      if (target.files && target.files.length > 0) {
        file.value = target.files[0]
      }
    }

    const updateAcceptType = () => {
      if (biz.value === 'audio') {
        fileAcceptType.value = 'audio/*'
      } else if (biz.value === 'video') {
        fileAcceptType.value = 'video/* ' // 允许视频文件
      }
    }

    const uploadFile = async () => {
      if (!file.value) {
        alert('请选择一个文件')
        return
      }

      const formData = new FormData()
      formData.append('file', file.value)
      formData.append('biz', biz.value)

      try {
        const response = await fetch('http://demo.kbws.xyz/api/file/upload', {
          method: 'POST',
          body: formData
        })

        if (!response.ok) {
          throw new Error('上传失败')
        }

        const data = await response.json()
        console.log('上传成功:', data)
        alert('上传成功')
      } catch (error) {
        console.error('上传出错:', error)
        alert('上传失败')
      }
    }

    return {
      biz,
      fileAcceptType,
      onFileChange,
      updateAcceptType,
      uploadFile
    }
  }
}
</script>

<style scoped>
.upload-container {
  margin: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
select,
button {
  margin-bottom: 10px;
}
</style> -->
<template>
  <div class="upload-carousel">
    <h2>添加轮播图</h2>
    <form @submit.prevent="handleSubmit">
      <label for="file">选择文件：</label>
      <input type="file" id="file" @change="handleFileChange" required />
      <br /><br />
      <label for="name">名字：</label>
      <input type="text" id="name" v-model="carouselName" />
      <br /><br />
      <button type="submit">上传并添加轮播图</button>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  setup() {
    

    const file = ref<File | null>(null)
    const carouselName = ref<string>('')

    const handleFileChange = (event: Event) => {
      const target = event.target as HTMLInputElement
      if (target.files && target.files.length > 0) {
        file.value = target.files[0]
      }
    }

    const handleSubmit = async () => {
      if (!file.value) {
        alert('请选择一个文件')
        return
      }

      try {
        // Step 1: Upload the file
        const formData = new FormData()
        formData.append('file', file.value)
        formData.append('biz', 'audio') // 或者 'audio' 视情况而定

        const uploadResponse = await fetch('http://demo.kbws.xyz/api/file/upload', {
          method: 'POST',
          body: formData
        })

        if (!uploadResponse.ok) {
          throw new Error('文件上传失败')
        }

        const uploadData = await uploadResponse.json()
        const fileUrl = uploadData.url

        // Step 2: Add to carousel using the URL
        const payload = {
          name: carouselName.value,
          url: fileUrl
        }

        const addResponse = await fetch('http://demo.kbws.xyz/api/carousel/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })

        if (!addResponse.ok) {
          throw new Error('添加轮播图失败')
        }

        const addData = await addResponse.json()
        console.log('添加成功:', addData)
        alert('添加轮播图成功')
      } catch (error) {
        console.error('出错:', error)
        alert('操作失败')
      }
    }

    return {
      file,
      carouselName,
      handleFileChange,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.upload-carousel {
  margin: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
button {
  margin-bottom: 10px;
}
</style>
