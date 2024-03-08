<template>
  <div id="personal-center-container">
    <a-row class="grid-demo">
      <a-col :span="8">
        <div class="custom-div">
          <div
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 24px 0;
              margin-right: 25px;
            "
          >
            <a-space direction="vertical" style="text-align: center" :size="10">
              <a-avatar
                :size="64"
                shape="square"
                :imageUrl="
                  store.state.user?.loginUser?.userAvatar ||
                  'https://himg.bdimg.com/sys/portraitn/item/03cde88aa5e69cabe59682e58fa3e59abce7b396df8f'
                "
                :auto-fix-font-size="false"
              />
              <span
                v-if="store.state.user?.loginUser?.userName"
                style="font-size: 18px"
                >{{ store.state.user?.loginUser?.userName }}</span
              >
              <span v-else style="font-size: 18px">{{
                store.state.user?.loginUser?.userAccount
              }}</span>
              <a-progress
                :percent="0.2"
                :show-text="false"
                style="width: 180px; margin-bottom: 20px"
              />
              <div
                style="
                  width: 270px;
                  height: 1px;
                  background-color: #d4d6dc;
                  margin: auto;
                "
              />
              <div
                style="
                  width: calc(270px - 36px);
                  height: 1px;
                  background-color: #e5e5e5;
                  margin: 10px auto;
                "
              />
              <div class="container" style="background-color: #edeef0">
                <icon-idcard
                  size="24"
                  class="icon-layout"
                  style="color: #0a84ff !important"
                />
                <span style="color: #0a84ff">个人资料</span>
              </div>
            </a-space>
          </div>
        </div>
      </a-col>
      <a-col :span="16">
        <div style="margin-top: 30px; margin-bottom: 12vh">
          <personal-data-page />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import PersonalDataPage from "@/components/PersonalDataPage.vue";

const store = useStore();
console.log(store.state.user)
// 打开文件选择对话框
</script>

<style scoped>
#personal-center-container {
  background-color: #f7f8fa;
  width: 100%;
  height: 100%;
  background-clip: padding-box;
}

.custom-div {
  margin-top: 50px;
  display: flex;
  justify-content: flex-end;
}

.container {
  height: 45px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.container:hover {
  background-color: #edeef0;
}

.icon-layout {
  margin-left: 24px;
  margin-right: 8px;
  color: #969696;
}
</style>
