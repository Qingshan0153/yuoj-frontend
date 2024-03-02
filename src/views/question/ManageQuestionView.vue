<template>
  <div id="manageQuestionView">
    <a-table
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.pageNum,
        total,
      }"
    >
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doUpdate(record)">修改</a-button>
          <a-button status="danger" @click="doDelete(record)">删除</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Question, QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";

const total = ref(0);
const dataList = ref([]);

const searchParams = ref({
  pageSize: 10,
  pageNum: 1,
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载数据失败" + res.message);
  }
};

/**
 * 页面初始化完成后加载数据
 */
onMounted(() => {
  loadData();
});

const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "内容",
    dataIndex: "content",
  },
  {
    title: "标签",
    dataIndex: "tags",
  },
  {
    title: "答案",
    slotName: "answer",
  },
  {
    title: "提交数",
    slotName: "submitNum",
  },
  {
    title: "题目通过数",
    slotName: "acceptedNum",
  },
  {
    title: "判题用例",
    slotName: "judgeCase",
  },
  {
    title: "判题配置",
    slotName: "judgeConfig",
  },
  {
    title: "点赞数",
    slotName: "thumbNum",
  },
  {
    title: "收藏数",
    slotName: "favourNum",
  },
  {
    title: "点赞数",
    slotName: "thumbNum",
  },
  {
    title: "用户ID",
    slotName: "userId",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
  {
    title: "修改时间",
    slotName: "updateTime",
  },
  {
    title: "Optional",
    slotName: "optional",
  },
];

const doDelete = async (question: Question) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: question.id,
  });
  if (res.code === 0) {
    message.success("删除成功:" + question.title);
    //   更新数据
    await loadData();
  } else {
    message.error("删除错误:" + question.title);
  }
};

const router = useRouter();

const doUpdate = (question: Question) => {
  router.push({
    path: "/update/question",
    query: {
      id: question.id,
    },
  });
};
</script>
