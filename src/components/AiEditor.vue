
<template>
  <div ref="divRef" style="height: 800px; width: 1370px" />
</template>

<script setup lang="ts">
import { AiEditor } from "aieditor";
import "aieditor/dist/style.css";
import {
  defineProps,
  onMounted,
  onUnmounted,
  ref,
  toRaw,
  watch,
  withDefaults,
} from "vue";

interface Props {
  value: string;
  handleChange: (v: string) => void;
}

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  handleChange: (v: string) => {
    console.log(v);
  },
});

const divRef = ref();
const content = ref();
let aiEditor: AiEditor | null = null;

onMounted(() => {
  aiEditor = new AiEditor({
    element: divRef.value as Element,
    placeholder: "点击输入内容...",
    ai: {
      models: {
        spark: {
          appId: "bd90343b",
          apiKey: "26e23a2e50e1fbd365b17faa5c81298e",
          apiSecret: "Zjc0YmJkZjM1NGNiNTIwZmQwNTUyMDg2",
        },
      },
    },

    onChange: (aiEditor) => {
      // 监听到用编辑器内容发生变化
      content.value = toRaw(aiEditor.getHtml());
      props.handleChange(content.value);
    },
  });
});

onUnmounted(() => {
  aiEditor && aiEditor.destroy();
});

watch(
  () => props.value,
  (newValue) => {
    if (aiEditor && toRaw(aiEditor.getHtml()) !== newValue) {
      toRaw(aiEditor.insert(newValue));
    }
  }
);
</script>

<style scoped>
:deep(.aie-container .tippy-content) {
  padding: 0 !important;
}

:deep(.tippy-content) {
  padding: 0 !important;
}

:deep(.aie-container) {
  border-radius: 20px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

:deep(.tippy-box) {
  background-color: transparent;
}
</style>
