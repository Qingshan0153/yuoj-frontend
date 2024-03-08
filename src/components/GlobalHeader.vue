
<template>
  <a-row id="global-header" align="center" justify="center" :wrap="false">
    <a-col flex="6">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img
              class="logo"
              :src="require('@/assets/我家哥哥的蛋.png')"
              alt="Geek OJ"
              @click="goToHomePage"
            />
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="1"></a-col>
    <a-col flex="2"></a-col>
    <a-col flex="3">
      <div style="display: flex; justify-content: center; margin-left: 120px">
        <a-space size="middle">
          <div
            v-if="store.state.user?.loginUser?.id"
            class="icon-css-small"
            @mouseover="smallColor = 'black'"
            @mouseout="smallColor = '#737373'"
          >
          </div>
          <div
            v-if="store.state.user?.loginUser?.id"
            class="icon-css"
            @mouseover="color = 'black'"
            @mouseout="color = '#737373'"
          >
            <icon-flame
              size="20"
              :color="color"
              style="stroke: currentColor; stroke-width: 15px"
            />
            <span
              style="
                font-weight: bold;
                margin-left: 5px;
                margin-right: 5px;
                font-size: 16px;
              "
              >{{ submitNumber }}</span
            >
          </div>
          <div v-if="!store.state.user?.loginUser?.id" style="height: 20px">
            <span class="registration-text" @click="doRegister">注册</span>
            <a-divider direction="vertical" size="0" :margin="5" />
            <span style="color: #0000008c; font-size: 14px">或</span>
            <a-divider direction="vertical" size="0" :margin="5" />
            <span class="registration-text" @click="doLogin">登录</span>
          </div>
          <a-trigger v-else :popup-translate="[-130, 20]" :popup-visible="show">
            <a-avatar
              :imageUrl="store.state.user?.loginUser?.userAvatar"
              :size="27"
              style="cursor: pointer"
              @click="show = !show"
            >
              <img
                alt="avatar"
                src="https://himg.bdimg.com/sys/portraitn/item/03cde88aa5e69cabe59682e58fa3e59abce7b396df8f"
              />
            </a-avatar>
            <template #content>
              <SetCenter @click="show = !show" />
            </template>
          </a-trigger>
        </a-space>
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "@/router/router";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import SetCenter from "@/components/SetCenter.vue";
import IconFlame from "@/views/calendar/icon/icon-flame.vue";
import IconSmallBell from "@/views/calendar/icon/icon-small-bell.vue";

const store = useStore();
const router = useRouter();


const show = ref(false);

const color = ref("#737373");
const smallColor = ref("#737373");

const submitNumber = ref(0);
// 默认主页
const selectedKeys = ref(["/"]);

// 路由跳转后，更新选中的莱单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

// 展示在菜单的路由数组
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据权限过滤菜单
    return checkAccess(
      store.state.user.loginUser,
      item?.meta?.access as string
    );
  });
});

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
/*
LOGO返回主页
 */
const goToHomePage = () => {
  router.push("/");
};

// 切换到登录页
const doLogin = () => {
  router.push({
    path: "/user/login",
  });
};
// 切换到注册页goCenter
const doRegister = () => {
  router.push({
    path: "/user/register",
  });
};

</script>

<style scoped>
#global-header {
  background-clip: padding-box;
}

.title-bar {
  display: flex;
  align-items: center;
}

.logo {
  height: 36px;
  cursor: pointer;
}

.searchBar {
  width: 250px;
  height: 25px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  border-radius: 60px;
  position: relative;
  overflow: hidden;
  transition: 0.5s;
  margin-top: -3px;
}

.icon {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
}

.textInput {
  width: 220px;
  height: 25px;
  position: absolute;
  top: 0;
  left: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.textInput input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 18px;
}

.clear {
  width: 15px;
  height: 15px;
  position: absolute;
  right: 12%;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.goBtn {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 0;
  border-radius: 5px;
  outline: none;
  border: none;
  color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  background: #3491fa;
  cursor: pointer;
  font-size: 12px;
  padding-left: 3px; /* 调整此属性来改变文本的左移程度 */
  padding-bottom: 3px;
}

.searchBar {
  width: 25px;
}

.changeWidth {
  width: 250px;
}

.registration-text {
  color: #0000008c;
  cursor: pointer;
  white-space: nowrap;
  font-size: 14px;
}

.registration-text:hover {
  color: black;
}

.icon-css {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 32px;
  border-radius: 5px;
  color: #0000008c;
}

.icon-css:hover {
  background-color: #f2f3f4;
  color: black;
}

.icon-css-small {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 5px;
  color: #0000008c;
}

.icon-css-small:hover {
  background-color: #f2f3f4;
  color: black;
}
</style>
