
<template>
  <a-list
    class="list-demo-action-layout"
    :grid-props="{ gutter: [0, 0], sm: 24, md: 16, lg: 12, xl: 8 }"
    :bordered="false"
    :split="false"
    :data="props.userList"
    :showSizeChanger="true"
  >
    <template #item="{ item }">
      <div
        style="
          background-color: #ffffff;
          width: 400px;
          height: 130px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 10px auto 15px;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        "
      >
        <a-list-item class="list-demo-item" action-layout="vertical">
          <a-list-item-meta>
            <template #avatar>
              <a-avatar
                :size="86"
                style="margin-left: 15px"
                :image-url="item.userAvatar"
              ></a-avatar>
            </template>
            <template #title>
              <div style="display: flex; align-items: center; width: 260px">
                <h2 class="item-title" style="margin-top: -5px">
                  {{ item.userName }}
                </h2>
                <a-button type="primary" style="margin-left: auto">
                  <icon-plus />
                  关注
                </a-button>
              </div>
            </template>
            <template #description>
              <a-space wrap align="start" class="item-tags" v-if="item.tags">
                <a-tag
                  v-for="(tag, index) of JSON.parse(item.tags)"
                  :key="index"
                  color="gray"
                  bordered
                  style="border-radius: 10px"
                >
                  {{ tag }}
                </a-tag>
              </a-space>
              <a-space wrap align="start" class="item-tags" v-else>
                <a-tag color="gray" bordered style="border-radius: 10px"
                  ># 未设置技能
                </a-tag>
              </a-space>
              <span v-if="item.userProfile" class="item-description">
                {{ item.userProfile }}
              </span>
              <span v-else class="item-description">
                这个up懒死了🐔，什么都木有写🏀⚈₃⚈
              </span>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </div>
    </template>
    <template #empty>
      <div style="display: flex" v-for="index in 20" :key="index">
        <div
          v-for="index in 3"
          :key="index"
          style="
            background-color: #ffffff;
            width: 400px;
            height: 130px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 10px auto 15px;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
          "
        >
          <a-skeleton :animation="true">
            <div style="display: flex">
              <a-skeleton-shape
                :shape="'circle'"
                style="margin-right: 20px; width: 85px; height: 85px"
              />
              <a-space
                direction="vertical"
                :style="{ width: '250px' }"
                size="large"
              >
                <a-skeleton-line :rows="3" />
              </a-space>
            </div>
          </a-skeleton>
        </div>
      </div>
    </template>
  </a-list>
  <div
    v-if="props.userTotal == props.userList.length && props.userTotal != 0"
    style="margin-top: 30px; margin-bottom: 700px"
  >
    <span style="color: #76767a">已经到底啦~</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

interface Props {
  userList: any[];
  userTotal: number;
}

// 从搜索页父组件获取数据

const props = withDefaults(defineProps<Props>(), {
  userList: () => [],
  userTotal: () => 0,
});

// const searchParams = ref<UserQueryRequest>({
//   userName: "",
//   pageSize: 20,
//   current: 1,
// });
//
// const dataList = ref([]);
//
// const loading = ref(false);
//
// const loadData = async () => {
//   const res = await UserControllerService.listUserVoByPageUsingPost(
//     searchParams.value
//   );
//   if (res.code === 0) {
//     const newDataList = [...dataList.value, ...res.data.records];
//     const uniqueDataList = Array.from(
//       new Map(newDataList.map((item) => [item.id, item])).values()
//     );
//     dataList.value = uniqueDataList as any;
//     loading.value = false;
//   } else {
//     loading.value = false;
//     message.error("加载失败：" + res.message);
//   }
// };
//
// const handleScroll = () => {
//   if (
//     window.innerHeight + document.documentElement.scrollTop >=
//       document.documentElement.offsetHeight - 150 &&
//     !loading.value
//   ) {
//     loading.value = true;
//     searchParams.value = {
//       ...searchParams.value,
//       current: (searchParams.value.current as never) + 1,
//     };
//   }
// };
//
// onMounted(() => {
//   window.addEventListener("scroll", handleScroll);
// });
//
// onUnmounted(() => {
//   window.removeEventListener("scroll", handleScroll);
// });
//
// /**
//  * 监听 searchParams 变量，改变是触发页面的更新加载
//  */
// watchEffect(() => {
//   searchParams.value = {
//     ...searchParams.value,
//     userName: route.query.searchText,
//   } as any;
//   loadData();
// });
//
// /**
//  * 页面加载时，请求数据
//  */
// onMounted(() => {
//   loadData();
// });

// const customPageSizeOptions = ref([20, 30, 40, 50]);
// const onPageChange = (page: number) => {
//   searchParams.value = {
//     ...searchParams.value,
//     current: page,
//   };
// };
// const onPageSizeChange = (pageSize: number) => {
//   searchParams.value = {
//     ...searchParams.value,
//     pageSize: pageSize,
//   };
// };
</script>

<style scoped>
.list-demo-action-layout .image-area {
  width: 190px;
  height: 150px;
  border-radius: 2px;
  overflow: hidden; /* 限制图片溢出容器 */
  margin-right: 18px;
  margin-top: 10px;
}

.list-demo-action-layout .image-area img {
  width: 100%;
}

.list-demo-action-layout .arco-list-item-action .arco-icon {
  margin: 0 4px;
}

.list-demo-item .item-title {
  text-align: left;
  margin-bottom: 2px; /* 调整标题与描述之间的底部间距 */
}

.list-demo-item .item-description {
  height: 20px;
  text-align: left;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1; /* 最大显示行数 */
  line-clamp: 1; /* 最大显示行数 */
  color: #61666d;
}

.item-tags {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}

.list-demo-action-layout .arco-list-item {
  border-radius: 4px;
}

.action:hover {
  background: var(--color-fill-3);
}
</style>
