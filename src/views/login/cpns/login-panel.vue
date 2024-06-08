<template>
  <div class="login-panel">
    <h2 class="title">后台管理系统</h2>

    <el-form
      label-width="auto"
      :model="loginInfo"
      style="max-width: 600px"
      :rules="loginRules"
      ref="formRef"
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="loginInfo.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginInfo.password" show-password />
      </el-form-item>
    </el-form>

    <div class="controls">
      <span>
        <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      </span>
    </div>
    <div class="login-btn">
      <el-button type="primary" class="login-btn" size="large" @click="loginAction">
        登录
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import useLoginStore from '@/store/login/login'

import type { FormRules, ElForm } from 'element-plus'

const isRemPwd = ref(false)

const loginInfo = reactive({
  name: '',
  password: ''
})

const loginRules: FormRules = {
  name: [
    { required: true, message: '请输入帐号信息', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6~20数字或字母组成~',
      trigger: 'change'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上数字或字母组成',
      trigger: 'blur'
    }
  ]
}

const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()

const loginAction = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      console.log('1')

      const userAccount = loginInfo.name
      const userPassword = loginInfo.password
      loginStore.loginAccountAction({ userAccount, userPassword })

      // const name = loginInfo.name
      // const password = loginInfo.password
      // // 2.向服务器发送网络请求(携带账号和密码)
      // loginStore.loginAccountAction({ name, password })
    } else {
      ElMessage.error('请输入正确的格式后再操作')
      console.log('2')
    }
  })
}
</script>
<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 30px;
  }

  .controls {
    // margin-top: 8px;
    margin-bottom: 3px;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
    // --el-button-size: 50px !important;
  }
}
</style>
