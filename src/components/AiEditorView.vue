
<template>
  <div id="aiEditor" style="margin: 20px">
    <div class="aie-container">
      <div class="aie-container-header"></div>
      <div class="aie-container-main"></div>
      <div class="aie-container-footer"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AiEditor } from "aieditor";
import "aieditor/dist/style.css";
import {
  defineProps,
  onMounted,
  onUnmounted,
  toRaw,
  watch,
  withDefaults,
} from "vue";

interface Props {
  mode?: string;
  value?: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  mode: () => "split",
});

let aiEditorView: AiEditor | null = null;

onMounted(() => {
  aiEditorView = new AiEditor({
    element: "#aiEditor",
    editable: false,
    ai: {
      models: {
        ai: {
          models: {
            spark: {
              appId: "bd90343b",
              apiKey: "26e23a2e50e1fbd365b17faa5c81298e",
              apiSecret: "Zjc0YmJkZjM1NGNiNTIwZmQwNTUyMDg2",
            },
          },
        },
      },
    },
  });
});

watch(
  () => props.value,
  (newValue) => {
    if (aiEditorView && toRaw(aiEditorView.getHtml()) !== newValue) {
      toRaw(aiEditorView.insert(newValue));
    }
  }
);

onUnmounted(() => {
  aiEditorView && aiEditorView.destroy();
});
</script>

<style scoped>
.aie-container {
  border: none;
}

.aie-container-header,
.aie-container-footer {
  display: none;
}
</style>
