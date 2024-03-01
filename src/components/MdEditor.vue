<template>
  <Editor :value="value" :plugins="plugins" @change="handleChange" />
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { Editor } from "@bytemd/vue-next";
import { defineProps, withDefaults } from "vue";

/**
 * 定义组件属性
 */
interface Prop {
  value: string;
  handleChange: (v: string) => void;
}

const props = withDefaults(defineProps<Prop>(), {
  value: () => "",
  handleChange: (v: string) => {
    console.log(v);
  },
});

const plugins = [gfm(), highlight()];
</script>

<style scoped></style>
