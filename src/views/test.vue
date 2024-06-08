<template>
  <div id="app">
    <h1>音频管理</h1>
    <div class="forms">
      <form @submit.prevent="fetchAudioList">
        <h2>获取音频列表</h2>
        <div>
          <label for="list-categoryId">一级分类 ID:</label>
          <input type="number" v-model="listForm.categoryId" id="list-categoryId" />
        </div>
        <div>
          <label for="list-categoryTagId">类型标签 ID:</label>
          <input type="number" v-model="listForm.categoryTagId" id="list-categoryTagId" />
        </div>
        <div>
          <label for="list-dubbingActorId">配音老师 ID:</label>
          <input type="number" v-model="listForm.dubbingActorId" id="list-dubbingActorId" />
        </div>
        <div>
          <label for="list-emotionTagId">情绪标签 ID:</label>
          <input type="number" v-model="listForm.emotionTagId" id="list-emotionTagId" />
        </div>
        <div>
          <label for="list-name">名字:</label>
          <input type="text" v-model="listForm.name" id="list-name" />
        </div>
        <div>
          <label for="list-sex">性别:</label>
          <input type="number" v-model="listForm.sex" id="list-sex" />
        </div>
        <button type="submit">获取音频列表</button>
      </form>

      <form @submit.prevent="addAudio">
        <h2>添加音频</h2>
        <div>
          <label for="add-categoryId">一级分类 ID:</label>
          <input type="number" v-model="addForm.categoryId" id="add-categoryId" />
        </div>
        <div>
          <label for="add-categoryTagId">类型标签 ID:</label>
          <input type="number" v-model="addForm.categoryTagId" id="add-categoryTagId" />
        </div>
        <div>
          <label for="add-emotionTagId">情绪标签 ID:</label>
          <input type="number" v-model="addForm.emotionTagId" id="add-emotionTagId" />
        </div>
        <div>
          <label for="add-name">名字:</label>
          <input type="text" v-model="addForm.files[0].name" id="add-name" />
        </div>
        <div>
          <label for="add-url">URL:</label>
          <input type="text" v-model="addForm.files[0].url" id="add-url" />
        </div>
        <div>
          <label for="add-isRecommend">是否推荐:</label>
          <input type="number" v-model="addForm.isRecommend" id="add-isRecommend" />
        </div>
        <div>
          <label for="add-sex">性别:</label>
          <input type="number" v-model="addForm.sex" id="add-sex" />
        </div>
        <button type="submit">添加音频</button>
      </form>
    </div>

    <div v-if="audioList.length">
      <h2>音频列表</h2>
      <ul>
        <li v-for="audio in audioList" :key="audio.id">{{ audio.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
      listForm: {
        categoryId: null,
        categoryTagId: null,
        dubbingActorId: null,
        emotionTagId: null,
        name: '',
        sex: null
      },
      addForm: {
        categoryId: null,
        categoryTagId: null,
        emotionTagId: null,
        files: [
          {
            name: null,
            url: null
          }
        ],
        isRecommend: null,
        sex: null
      },
      audioList: []
    }
  },
  methods: {
    async fetchAudioList() {
      try {
        const response = await axios.post('http://demo.kbws.xyz/api/audio/list', this.listForm)
        this.audioList = response.data
      } catch (error) {
        console.error('Error fetching audio list:', error)
      }
    },
    async addAudio() {
      try {
        const response = await axios.post('http://demo.kbws.xyz/api/audio/add', this.addForm)
        console.log('Audio added successfully:', response.data)
        // Optionally, you can refresh the audio list after adding a new audio
        this.fetchAudioList()
      } catch (error) {
        console.error('Error adding audio:', error)
      }
    }
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.forms {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

form {
  width: 45%;
}

form div {
  margin-bottom: 10px;
}
</style>
