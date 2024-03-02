<template>
  <div class="home">
    <CodeEditor :handle-change="onCodeChange" :value="codeValue" />
    <MdEditor :handle-change="onMdChange" :value="mdValue" />
  </div>
</template>

<script lang="ts" setup>
import MdEditor from "@/components/MdEditor.vue";
import { ref } from "vue";
import CodeEditor from "@/components/CodeEditor.vue";

const mdValue = ref();
const codeValue = ref();
const onMdChange = (v: string) => {
  mdValue.value = v;
};
const onCodeChange = (v: string) => {
  codeValue.value = v;
};
</script>