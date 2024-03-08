<template>
  <div id="userLoginView">
    <div style="display: flex; justify-content: flex-end">
      <icon-qr-code class="icon-qr-code" />
    </div>
    <img
      class="logo"
      :src="require('@/assets/我家哥哥的蛋.png')"
      alt="KUN OJ"
    />
    <a-form
      style="width: 100%; margin: 0 auto"
      label-align="left"
      auto-label-width
      :model="form"
    >
      <a-form-item field="userAccount" :rules="rulesUserAccount">
        <input
          class="input-login"
          v-model="form.userAccount"
          placeholder="请输入账号"
        />
      </a-form-item>
      <a-form-item field="userPassword" :rules="rulesUserPassword">
        <input
          class="input-login"
          v-model="form.userPassword"
          placeholder="请输入密码"
          type="password"
        />
      </a-form-item>
      <a-form-item field="userPassword">
        <input class="input-login" v-model="form.code" placeholder="验证码" />
        <div class="login-code" style="width: 100%; margin: 0 auto">
          <img
            :src="codeUrl"
            @click="getCode"
            class="login-code-img"
            style="max-width: 500px"
          />
        </div>
      </a-form-item>
      <a-form-item style="display: flex">
        <a-button
          size="large"
          type="dashed"
          style="width: 168px; border-radius: 10px 0 0 10px"
          @click="doRegister"
        >
          注册
        </a-button>
        <a-button
          @click="handleSubmit"
          size="large"
          type="primary"
          html-type="submit"
          style="width: 168px; border-radius: 0 10px 10px 0"
        >
          登录
        </a-button>
      </a-form-item>
    </a-form>
    <span
      style="
        display: flex;
        align-items: flex-start;
        color: #262626bf;
        margin-left: 18px;
        margin-bottom: 30px;
      "
      >账号密码登录</span
    >
    <div style="margin-top: 30px">
      <span style="font-size: 13px; color: #3c3c4399; display: inline-block"
        >注册或登录即代表您同意</span
      >
      <span
        style="
          font-size: 13px;
          color: #262626bf;
          display: inline-block;
          cursor: pointer;
        "
        >《用户协议》</span
      >
      <span style="font-size: 13px; color: #3c3c4399; display: inline-block"
        >和</span
      >
      <span
        style="
          font-size: 13px;
          color: #262626bf;
          display: inline-block;
          cursor: pointer;
        "
      >
        《隐私协议》</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import {
  CaptchaControllerService,
  UserControllerService,
  UserLoginRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import IconQrCode from "@/views/calendar/icon/icon-qr-code.vue";

/**
 * 表单信息
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
  code: "",
  uuid: "",
} as UserLoginRequest);

const codeUrl = ref();

const router = useRouter();
const store = useStore();

const Account_Verification = ref(false);
const Password_Verification = ref(false);

onMounted(() => {
  getCode();
});

const getCode = async () => {
  const res = await CaptchaControllerService.getCodeUsingGet();
  if (res.code === 0) {
    codeUrl.value = "data:image/gif;base64," + res.data;
    form.uuid = res.message;
  } else {
    message.error("验证码输入错误");
  }
};

const rulesUserAccount = [
  {
    validator: (value: string, cb: (arg0: string) => void) => {
      return new Promise<void>((resolve) => {
        window.setTimeout(() => {
          if (value == null) {
            cb("账号不可以为空！");
          } else if (value.trim() == "") {
            cb("不能包含空格！");
          } else if (
            !/(?=.*\d)(?=.*[^a-zA-Z\d])/.test(value) &&
            !/(?=.*[a-zA-Z])(?=.*\d)/.test(value) &&
            !/(?=.*[a-zA-Z])(?=.*[^a-zA-Z\d])/.test(value)
          ) {
            cb("账号必须包含字母、数字、符号中至少两种类型！");
          } else if (value.length < 5 || value.length > 16) {
            cb("账号长度应为5-16个字符！");
          } else if (/([a-zA-Z0-9])\1{5,}/.test(value)) {
            cb("账号不可以包含连续重复的6位及以上的字母或数字！");
          } else {
            Account_Verification.value = true;
          }
          resolve();
        }, 1000);
      });
    },
  },
];

const rulesUserPassword = [
  {
    validator: (value: string, cb: (arg0: string) => void) => {
      return new Promise<void>((resolve) => {
        window.setTimeout(() => {
          if (value == null) {
            cb("密码不可以为空！");
          } else if (value.trim() == "") {
            cb("不能包含空格！");
          } else if (value.length < 8 || value.length > 16) {
            cb("密码长度应为8-16个字符！");
          } else if (
            !/(?=.*\d)(?=.*[^a-zA-Z\d])/.test(value) &&
            !/(?=.*[a-zA-Z])(?=.*\d)/.test(value) &&
            !/(?=.*[a-zA-Z])(?=.*[^a-zA-Z\d])/.test(value)
          ) {
            cb("密码必须包含字母、数字、符号中至少两种类型！");
          } else if (/([a-zA-Z0-9])\1{5,}/.test(value)) {
            cb("密码不可以包含连续重复的6位及以上的字母或数字！");
          } else {
            Password_Verification.value = true;
          }
          resolve();
        }, 1000);
      });
    },
  },
];
const handleSubmit = async () => {
  if (
    Password_Verification.value == false &&
    Account_Verification.value == false
  ) {
    return; // 如果验证错误，禁止提交表单
  }
  const res = await UserControllerService.userLoginUsingPost(form);
  // 登录成功跳转页面
  if (res.code === 0) {
    message.success("登录成功！");
    await store.dispatch("user/getLoginUser");
    window.location.href = "/questions"; // 跳转到另一个页面
  } else {
    message.error("登录失败:" + res.message);
  }
};

// 跳转到注册页面
const doRegister = () => {
  router.push({
    path: "/user/register",
  });
};
</script>

<style scoped>
#userLoginView {
  width: 370px;
  height: 560px;
  border-radius: 20px;
  box-shadow: 0 1px 25px rgba(0, 0, 0, 0.1);
  padding: 24px 32px;
  background-color: #ffffff;
}

.input-login {
  width: 330px;
  height: 40px;
  text-indent: 10px; /* 将文本和光标向右移动 5px */
  border-radius: 10px;
  border: 1px solid #e5e5e5; /* 设置边框颜色为灰色 */
}

.input-login:focus,
.input-login:active {
  border-color: #165dff; /* 输入框获取焦点时的边框颜色为蓝色 */
  outline: none; /* 去掉获取焦点时的外边框 */
}

.logo {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 24px;
  max-width: 55%; /* 图片的最大宽度为父元素的100%，这样可以实现等比缩放 */
  height: auto;
}

.icon-qr-code {
  transform: scale(1.2);
  color: #4d535d;
  cursor: pointer;
}

.icon-qr-code:hover {
  color: black;
}
</style>