<template>
  <div
    id="code-editor"
    ref="codeEditorRef"
    style="min-height: 400px; height: 70vh"
  />
</template>

<script lang="ts" setup>
import * as monaco from "monaco-editor";
import { onMounted, ref, toRaw, watch } from "vue";
import { defineProps, withDefaults } from "vue/dist/vue";

/**
 * 定义组件属性
 */
interface Prop {
  value: string;
  language?: string;
  handleChange: (v: string) => void;
}

const props = withDefaults(defineProps<Prop>(), {
  value: () => "",
  language: () => "java",
  handleChange: (v: string) => {
    console.log(v);
  },
});
const codeEditorRef = ref();
const codeEditor = ref();

watch(
  () => props.language,
  () => {
    if (codeEditor.value) {
      monaco.editor.setModelLanguage(
        toRaw(codeEditor.value).getModel(),
        props.language
      );
    }
  }
);

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: props.language,
    automaticLayout: true,
    colorDecorators: true,
    theme: "vs-dark",
    minimap: {
      enabled: true,
    },
    readOnly: false,
  });

  // 监听内容变化
  codeEditor.value.onDidChangeModelContent(() => {
    console.log("目前内容为：" + toRaw(codeEditor.value).getValue());
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>

<style scoped></style>
