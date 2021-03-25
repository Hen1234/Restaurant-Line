<template>
  <div class="container">
    <div class="logo">
      <header-logo></header-logo>
    </div>
    <div class="header-text">Restaurant Line</div>
  </div>
</template>

<script lang="ts">
import HeaderLogo from "@/components/logo/HeaderLogo.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "TheHeader",
  components: {
    HeaderLogo,
  },
})
export default class TheHeader extends Vue {}
</script>

<style scoped>
.container {
  border: 2px solid black;
  display: flex;
  align-items: center;
}

.header-text {
  margin-left: 20px;
  font-size: 30px;
}
</style>
