<template>
  <div class="wxLogin">
    <span class="title">微信扫一扫登录</span>
    <div class="main_wx">
      <wxlogin
        v-if="appid && redirect_uri"
        :appid="appid"
        scope="snsapi_login"
        :redirect_uri="redirect_uri"
        :href="href"
        :state="state"
      ></wxlogin>
    </div>
    <p>
      请使用微信扫描二维码登录
    </p>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped></style>