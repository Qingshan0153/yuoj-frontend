<template>
  <div class="centered-content">
    <a-form :model="form">
      <div class="avatar-container">
        <a-avatar
          :imageUrl="form.userAvatar"
          :style="{
            transform: 'scale(2.8)',
          }"
        >
        </a-avatar>
        <a-trigger>
          <a-avatar
            style="
              transform: translateY(40px) translateX(-2px) scale(0.9);
              border: 3px solid #fff;
              cursor: pointer;
            "
            :style="{ backgroundColor: '#E0F4E7' }"
          >
            <IconEdit style="color: #2db55d" />
          </a-avatar>
          <template #content>
            <div
              style="
                box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
                padding: 8px;
                border-radius: 5px;
                background-color: white;
              "
            >
              <a-space direction="vertical" fill>
                <a-upload
                  action="/"
                  :show-file-list="false"
                  @change="handleFileUpload"
                  :limit="1"
                >
                  <template #upload-button>
                    <a-button style="border-radius: 3px">上传头像</a-button>
                  </template>
                </a-upload>
                <a-button
                  @click="
                    form.userAvatar =
                      'https://himg.bdimg.com/sys/portraitn/item/03cde88aa5e69cabe59682e58fa3e59abce7b396df8f'
                  "
                  style="border-radius: 3px"
                  >删除头像
                </a-button>
              </a-space>
            </div>
          </template>
        </a-trigger>
      </div>
      <a-divider size="0" />
      <a-row class="grid-name-layout" :gutter="28">
        <a-col :span="12">
          <span style="color: #262626bf">昵称</span>
        </a-col>
        <a-col :span="12">
          <span style="color: #262626bf">性别</span>
        </a-col>
      </a-row>
      <a-row class="grid-layout" :gutter="28">
        <a-col :span="12">
          <a-form-item field="昵称" :no-style="true">
            <a-input
              v-model="form.userName"
              placeholder="昵称 (必填项)"
              style="border-radius: 5px; height: 44px; color: #0000008c"
              allow-clear
            />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item field="性别" :no-style="true">
            <a-button
              @click="form.gender = 1"
              v-model="form.gender"
              :class="{
                'btn-gender': true,
                'btn-gender-man': form.gender === 1,
              }"
              ><span style="margin-right: auto; color: #0000008c">男性</span>
              <template #icon>
                <icon-man :size="16" />
              </template>
            </a-button>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item field="性别" :no-style="true">
            <a-button
              @click="form.gender = 2"
              v-model="form.gender"
              :class="{
                'btn-gender': true,
                'btn-gender-woman': form.gender == 2,
              }"
              ><span style="margin-right: auto">女性</span>
              <template #icon>
                <icon-woman :size="16" />
              </template>
            </a-button>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="grid-name-layout" :gutter="28">
        <a-col :span="12">
          <span style="color: #262626bf">生日</span>
        </a-col>
        <a-col :span="12">
          <span style="color: #262626bf">现居地</span>
        </a-col>
      </a-row>
      <a-row class="grid-layout" :gutter="28">
        <a-col :span="12">
          <a-form-item field="生日" :no-style="true">
            <a-date-picker
              v-model="form.birthday"
              placeholder="请选择日期"
              style="
                border-radius: 5px;
                height: 44px;
                width: 100%;
                color: #0000008c;
              "
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item field="现居地" :no-style="true">
            <a-cascader
              v-model="form.address"
              :options="options"
              placeholder="输入或选择居住地"
              allow-clear
              style="border-radius: 5px; height: 44px; color: #0000008c"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="grid-name-layout">
        <a-col :span="24">
          <span style="color: #262626bf">个人介绍</span>
        </a-col>
      </a-row>
      <a-row class="grid-layout">
        <a-col :span="24">
          <a-form-item field="个人介绍" :no-style="true">
            <a-textarea
              v-model="form.userProfile"
              placeholder="关于你的个性、兴趣或经验..."
              allow-clear
              :max-length="10"
              show-word-limit
              style="border-radius: 5px; height: 100px; color: #0000008c"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="grid-name-layout">
        <a-col :span="24">
          <span style="color: #262626bf">个人网站</span>
        </a-col>
      </a-row>
      <a-row class="grid-layout">
        <a-col :span="24">
          <a-form-item
            field="个人网站"
            :no-style="true"
            v-for="(website, index) of form.websites"
            :key="index"
          >
            <a-input
              v-model="website.value"
              placeholder="你的个人网站、博客或者作品集等"
              style="
                border-radius: 5px;
                height: 44px;
                color: #0000008c;
                margin-bottom: 15px;
              "
            >
              <template #suffix>
                <icon-delete @click="handleDelete(index)" />
              </template>
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <div
        @click="handleAdd"
        style="
          display: flex;
          align-items: center;
          color: #262626;
          margin-bottom: 35px;
          margin-top: -20px;
        "
      >
        <icon-plus :stroke-width="5" style="margin-right: 5px" />
        添加
      </div>
      <a-row class="grid-name-layout">
        <a-col :span="24">
          <span style="color: #262626bf">GitHub</span>
        </a-col>
      </a-row>
      <a-row class="grid-layout">
        <a-col :span="24">
          <a-form-item field="GitHub" :no-style="true">
            <a-input
              v-model="form.gitHubName"
              placeholder="用户名"
              style="border-radius: 5px; height: 44px; color: #0000008c"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="grid-name-layout">
        <a-col :span="24">
          <span style="color: #262626bf">就读学校</span>
        </a-col>
      </a-row>
      <a-row class="grid-layout">
        <a-col :span="24">
          <a-form-item field="就读学校" :no-style="true">
            <a-input
              v-model="form.school"
              placeholder="最高学历学校"
              style="border-radius: 5px; height: 44px; color: #0000008c"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="grid-name-layout" :gutter="28">
        <a-col :span="12">
          <span style="color: #262626bf">所在公司</span>
        </a-col>
        <a-col :span="12">
          <span style="color: #262626bf">职位</span>
        </a-col>
      </a-row>
      <a-row class="grid-layout" :gutter="28">
        <a-col :span="12">
          <a-form-item field="所在公司" :no-style="true">
            <a-input
              v-model="form.company"
              placeholder="最近工作公司"
              style="border-radius: 5px; height: 44px; color: #0000008c"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item field="职位" :no-style="true">
            <a-input
              v-model="form.position"
              placeholder="你的职位"
              style="border-radius: 5px; height: 44px; color: #0000008c"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="grid-name-layout">
        <a-col :span="24">
          <span style="color: #262626bf">技能标签</span>
        </a-col>
      </a-row>
      <a-row class="grid-layout">
        <a-col :span="24">
          <a-form-item field="技能标签" :no-style="true">
            <a-input-tag
              v-model="form.tags"
              style="
                border-radius: 5px;
                height: 44px;
                display: flex;
                align-items: center;
              "
              placeholder="你的技能标签"
              allow-clear
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="grid-name-layout">
        <a-col :span="24">
          <span style="color: #262626bf">常用标签</span>
        </a-col>
      </a-row>
      <a-row class="grid-layout">
        <a-col :span="24">
          <a-space size="medium">
            <a-tag
              :checked="true"
              :checkable="true"
              @check="
                () => {
                  form.tags.push('Java');
                }
              "
              color="gray"
              :style="{
                borderRadius: '15px',
              }"
              >Java
            </a-tag>
            <a-tag
              :checked="true"
              :checkable="true"
              @check="
                () => {
                  form.tags.push('Python');
                }
              "
              color="gray"
              :style="{
                borderRadius: '15px',
              }"
              >Python
            </a-tag>
            <a-tag
              :checked="true"
              :checkable="true"
              @check="
                () => {
                  form.tags.push('C++');
                }
              "
              color="gray"
              :style="{
                borderRadius: '15px',
              }"
              >C++
            </a-tag>
            <a-tag
              :checked="true"
              :checkable="true"
              @check="
                () => {
                  form.tags.push('JavaScript');
                }
              "
              color="gray"
              :style="{
                borderRadius: '15px',
              }"
              >JavaScript
            </a-tag>
            <a-tag
              :checked="true"
              :checkable="true"
              @check="
                () => {
                  form.tags.push('C');
                }
              "
              color="gray"
              :style="{
                borderRadius: '15px',
              }"
              >C
            </a-tag>
            <a-tag
              :checked="true"
              :checkable="true"
              @check="
                () => {
                  form.tags.push('MySQL');
                }
              "
              color="gray"
              :style="{
                borderRadius: '15px',
              }"
              >MySQL
            </a-tag>
            <a-tag
              :checked="true"
              :checkable="true"
              @check="
                () => {
                  form.tags.push('PHP');
                }
              "
              color="gray"
              :style="{
                borderRadius: '15px',
              }"
              >PHP
            </a-tag>
            <a-tag
              :checked="true"
              :checkable="true"
              @check="
                () => {
                  form.tags.push('HTML');
                }
              "
              color="gray"
              :style="{
                borderRadius: '15px',
              }"
              >HTML
            </a-tag>
            <a-tag
              :checked="true"
              :checkable="true"
              @check="
                () => {
                  form.tags.push('Android');
                }
              "
              color="gray"
              :style="{
                borderRadius: '15px',
              }"
              >Android
            </a-tag>
            <a-tag
              :checked="true"
              :checkable="true"
              @check="
                () => {
                  form.tags.push('CSS');
                }
              "
              color="gray"
              :style="{
                borderRadius: '15px',
              }"
              >CSS
            </a-tag>
          </a-space>
        </a-col>
      </a-row>
      <a-row class="grid-layout">
        <a-col :span="24">
          <a-form-item :no-style="true">
            <div style="width: 100%; display: flex; justify-content: flex-end">
              <a-button
                @click="handleSubmit"
                style="
                  background-color: #2db55d;
                  color: white;
                  width: 70px;
                  height: 35px;
                  border-radius: 5px;
                "
                >保存
              </a-button>
            </div>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { FileControllerService, UserControllerService } from "../../generated";
import message from "@arco-design/web-vue/es/message";
import { ref } from "vue";
import { FileItem } from "@arco-design/web-vue";

const store = useStore();

const form = ref({
  userAvatar:
    store.state.user.loginUser.userAvatar ||
    "https://himg.bdimg.com/sys/portraitn/item/03cde88aa5e69cabe59682e58fa3e59abce7b396df8f",
  userName: store.state.user.loginUser.userName,
  gender: store.state.user.loginUser.gender,
  birthday: store.state.user.loginUser.birthday,
  address: store.state.user.loginUser.address,
  userProfile: store.state.user.loginUser.userProfile,
  school: store.state.user.loginUser.school,
  company: store.state.user.loginUser.company,
  position: store.state.user.loginUser.position,
  tags: JSON.parse(store.state.user.loginUser.tags) || [],
  websites: JSON.parse(store.state.user.loginUser.websites) || [{ value: "" }],
  gitHubName: store.state.user.loginUser.gitHubName,
});

const handleAdd = () => {
  form.value.websites.push({
    value: "",
  });
};

const handleDelete = (index: any) => {
  form.value.websites.splice(index, 1);
};

// 处理文件上传
const handleFileUpload = async (fileList: FileItem[]) => {
  const file = fileList[0].file;
  if (file) {
    const response = await FileControllerService.uploadFileUsingPost(
      "user_avatar",
      file as any
    );
    if (response.code == 0) {
      // 上传成功
      form.value.userAvatar = response.data;
    } else {
      // 上传失败
      message.error("上传失败：" + response.message);
    }
  }
};

const handleSubmit = async () => {
  if (form.value.userName) {
    const res = await UserControllerService.updateMyUserUsingPost(form.value);
    if (res.code === 0) {
      await store.dispatch("user/getLoginUser");
      message.success("更新成功");
    } else {
      message.error("更新失败，" + res.message);
    }
  } else {
    message.error("昵称信息不能为空！");
  }
};

const options = [
  {
    value: "beijing",
    label: "Beijing",
    children: [
      {
        value: "chaoyang",
        label: "ChaoYang",
        children: [
          {
            value: "datunli",
            label: "Datunli",
          },
        ],
      },
      {
        value: "haidian",
        label: "Haidian",
      },
      {
        value: "dongcheng",
        label: "Dongcheng",
      },
      {
        value: "xicheng",
        label: "XiCheng",
      },
    ],
  },
  {
    value: "shanghai",
    label: "Shanghai",
    children: [
      {
        value: "shanghaishi",
        label: "Shanghai",
        children: [
          {
            value: "huangpu",
            label: "Huangpu",
          },
        ],
      },
    ],
  },
];
</script>

<style scoped>
.centered-content {
  box-shadow: 0 4px 10px -10px rgba(0, 0, 0, 0.5);
  width: 900px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 24px;
}

.avatar-container {
  display: flex;
  justify-content: center; /* 横向居中 */
  align-items: center; /* 垂直居中 */
  width: 920px;
  height: 120px;
}

.grid-layout {
  margin-bottom: 32px;
}

.grid-name-layout {
  margin-bottom: 10px;
}

.btn-gender {
  border-radius: 5px;
  height: 44px;
  background-color: #f2f3f5;
  width: 100%;
  color: #0000008c;
}

.btn-gender-man {
  background-color: #ebf5ff !important;
  color: #007aff !important;
}

.btn-gender-woman {
  background-color: #ffeef9 !important;
  color: #ff74d0 !important;
}
</style>
