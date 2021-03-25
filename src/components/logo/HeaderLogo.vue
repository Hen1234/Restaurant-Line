<template>
  <img class="logo-image" src="../../../src/images/logo.jpg" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "HeaderLogo",
})
export default class HeaderLogo extends Vue {}
</script>

<style scoped>
.logo-image {
  height: 90px;
  width: 90px;
}
</style>
