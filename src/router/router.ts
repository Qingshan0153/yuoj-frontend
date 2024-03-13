import { RouteRecordRaw } from "vue-router";
import ACCESS_ENUM from "@/access/accessEnum";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";
import MenageQuestionView from "@/views/question/MenageQuestionView.vue";
import QuestionsView from "@/views/question/QuestionsView.vue";
import ViewQuestionsView from "@/views/question/ViewQuestionsView.vue";
import QuestionSubmitView from "@/views/question/QuestionSubmitView.vue";
import PersonalCenterView from "@/views/user/PersonalCenterView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "主页",
    component: QuestionsView,
  },
  {
    path: "/questions",
    name: "题库",
    component: QuestionsView,
  },
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/add/question",
    name: "创建题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/menage/question",
    name: "管理题目",
    component: MenageQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/personal/center",
    name: "用户中心",
    component: PersonalCenterView,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/update/question",
    name: "更新题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
      hideInMenu: true,
    },
  },

  {
    path: "/questions/:category",
    component: QuestionsView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/question_submit",
    name: "提交记录",
    component: QuestionSubmitView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/view/question/:id/:category?/:questionSubmitId?",
    name: "在线做题",
    component: ViewQuestionsView,
    props: true,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
];
