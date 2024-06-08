<template>
  <div class="login">
    <login-panel></login-panel>
  </div>
</template>
<script setup lang="ts">
import LoginPanel from './cpns/login-panel.vue'
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
