<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "ResolveImageUrlMixin",
})
export default class ResolveImageUrlMixin extends Vue {
  resolveImageUrlMixin(imageName: string): string {
    const images = require.context("../images/", false, /\.jpg$/);
    return images(`./${imageName}.jpg`);
  }
}
</script>

<style scoped></style>
