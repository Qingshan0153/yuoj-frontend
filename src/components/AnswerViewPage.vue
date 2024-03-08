
<template>
  <AiEditorView :value="props.question.answer" />
</template>

<script setup lang="ts">
import { withDefaults, defineProps, ref } from "vue";
import AiEditorView from "@/components/AiEditorView.vue";

interface Props {
  question?: any;
}

const props = withDefaults(defineProps<Props>(), {
  question: () => [],
});
</script>

<style scoped></style>
